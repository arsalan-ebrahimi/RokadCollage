import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Enrollment from "../Modules/Enrollment/EnrollmentMd.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../config.env") });

export const SPOTPLAYER_API_URL = "https://panel.spotplayer.ir/license/edit/";
export const SPOTPLAYER_TIMEOUT_MS = 10000;
export const DEFAULT_DOWNLOAD_DOMAIN = "https://dl.spotplayer.ir";

/**
 * Normalizes and converts raw relative SpotPlayer url to a full download URL.
 *
 * @param {String} rawUrl - Relative path from SpotPlayer (e.g. "/5e07.../91d0.../")
 * @returns {String} Complete download URL
 */
export function buildDownloadUrl(rawUrl) {
    if (!rawUrl || typeof rawUrl !== "string") return "";
    const baseDomain = (process.env.SPOTPLAYER_DOWNLOAD_DOMAIN || DEFAULT_DOWNLOAD_DOMAIN).replace(/\/+$/, "");
    const cleanPath = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
    return `${baseDomain}${cleanPath}`;
}

/**
 * Calls SpotPlayer API to generate a dedicated license.
 * Never logs raw error object or exposes $API header.
 *
 * @param {Object} params
 * @param {String} params.spotplayerCourseId - 24-hex SpotPlayer Course ID
 * @param {String} params.name - User full name
 * @param {String} params.watermarkText - Watermark string (user phone number or name)
 * @param {String} [params.payload] - Custom metadata (Enrollment ID)
 * @returns {Promise<{ licenseId: String, key: String, url: String }>}
 */
export async function createLicense({ spotplayerCourseId, name, watermarkText, payload = "" }) {
    const apiKey = process.env.SPOTPLAYER_API_KEY;
    if (!apiKey) {
        console.error("SpotPlayer Error: SPOTPLAYER_API_KEY is not configured in environment");
        throw new Error("تنظیمات کلید وب‌سرویس اسپات‌پلییر در سرور تعریف نشده است");
    }

    const isTestMode = String(process.env.SPOTPLAYER_TEST_MODE).toLowerCase() === "true";

    // In local sandbox/test mode without live API key, generate a valid simulated license
    if (isTestMode && (apiKey === "test_spotplayer_key" || apiKey === "your_spotplayer_api_key_here")) {
        const mockId = "sp_test_" + Date.now().toString(16);
        const mockKey = "0001test" + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + "ROKAD";
        return {
            licenseId: mockId,
            key: mockKey,
            url: `/${mockId}/player_access/`,
        };
    }

    const requestBody = {
        course: [spotplayerCourseId],
        courses: [spotplayerCourseId],
        name: name || "کاربر کالج رکاد",
        watermark: {
            texts: [{ text: watermarkText || name || "کالج رکاد" }],
        },
        payload: String(payload),
        test: isTestMode,
    };

    const headers = {
        "Content-Type": "application/json",
        $API: apiKey,
        $Level: "-1",
        $LEVEL: "-1",
    };

    let responseData = null;

    try {
        const response = await axios.post(SPOTPLAYER_API_URL, requestBody, {
            headers,
            timeout: SPOTPLAYER_TIMEOUT_MS,
        });
        responseData = response.data;
    } catch (err) {
        // Strict Security Rule: Never log raw error or expose $API header
        const status = err.response?.status || err.status || 500;
        const safeMessage = err.response?.data?.message || err.message || "Unknown error";
        console.error(`SpotPlayer API Request failed with status ${status}: ${safeMessage}`);
        throw new Error("خطا در برقراری ارتباط با وب‌سرویس صدور لایسنس اسپات‌پلیر");
    }

    if (!responseData || !responseData._id || !responseData.key || !responseData.url) {
        console.error("SpotPlayer API returned an invalid response structure (missing _id, key, or url)");
        throw new Error("پاسخ دریافتی از وب‌سرویس اسپات‌پلیر نامعتبر است");
    }

    return {
        licenseId: String(responseData._id),
        key: String(responseData.key),
        url: String(responseData.url),
    };
}

/**
 * Atomically claims and issues a SpotPlayer license for a virtual course enrollment.
 * Safe against concurrent duplicate executions (idempotent).
 * Does NOT throw errors to caller; sets status to 'issued' or 'failed' in database.
 *
 * @param {String|mongoose.Types.ObjectId} enrollmentId
 * @param {Boolean} [allowProcessingRetry=false] - If true (admin action), can reclaim stuck 'processing'
 * @returns {Promise<{ success: Boolean, status: String }>}
 */
export async function issueEnrollmentLicense(enrollmentId, allowProcessingRetry = false) {
    if (!enrollmentId) return { success: false, status: "failed" };

    const allowedStatuses = ["pending", "failed"];
    if (allowProcessingRetry) {
        allowedStatuses.push("processing");
    }

    // Step 1: Atomically claim enrollment to prevent concurrent duplicates
    const enrollment = await Enrollment.findOneAndUpdate(
        {
            _id: enrollmentId,
            courseModel: "VirtualCourse",
            $or: [
                { "spotplayer.status": { $in: allowedStatuses } },
                { "spotplayer.status": { $exists: false } },
            ],
            $and: [
                {
                    $or: [
                        { "spotplayer.licenseId": { $exists: false } },
                        { "spotplayer.licenseId": null },
                        { "spotplayer.licenseId": "" },
                    ],
                },
            ],
        },
        {
            $set: {
                "spotplayer.status": "processing",
            },
        },
        { new: true }
    )
        .populate("user", "fullName phoneNumber")
        .populate("course", "title spotplayerCourseId");

    // If not claimed (already issued or currently processing), exit cleanly
    if (!enrollment) {
        const current = await Enrollment.findById(enrollmentId).select("spotplayer.status");
        return {
            success: current?.spotplayer?.status === "issued",
            status: current?.spotplayer?.status || "unknown",
        };
    }

    const user = enrollment.user;
    const course = enrollment.course;
    const spotplayerCourseId = course?.spotplayerCourseId;

    if (!spotplayerCourseId) {
        console.error(`Enrollment ${enrollmentId} cannot issue license: course has no spotplayerCourseId`);
        await Enrollment.findByIdAndUpdate(enrollmentId, {
            $set: { "spotplayer.status": "failed" },
        });
        return { success: false, status: "failed" };
    }

    const fullName = user?.fullName?.trim() || "کاربر کالج رکاد";
    const watermarkText = user?.phoneNumber?.trim() || fullName;

    // Step 2 & 3: Issue license and record status
    try {
        const licenseResult = await createLicense({
            spotplayerCourseId,
            name: fullName,
            watermarkText,
            payload: enrollmentId.toString(),
        });

        await Enrollment.findByIdAndUpdate(enrollmentId, {
            $set: {
                "spotplayer.licenseId": licenseResult.licenseId,
                "spotplayer.key": licenseResult.key,
                "spotplayer.url": licenseResult.url,
                "spotplayer.status": "issued",
            },
        });

        return { success: true, status: "issued" };
    } catch (err) {
        console.error(`Failed to issue license for enrollment ${enrollmentId}`);
        await Enrollment.findByIdAndUpdate(enrollmentId, {
            $set: {
                "spotplayer.status": "failed",
            },
        });

        return { success: false, status: "failed" };
    }
}
