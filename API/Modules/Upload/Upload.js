import express from "express";
import { removeData, uploadMultiple, uploadSingle } from "./UploadCn.js";
import upload from "../../Utils/Upload.js";
import IsAdmin from "../../Middleware/IsAdmin.js";
import IsLogin from "../../Middleware/IsLogin.js";

const uploadRouter = express.Router();

uploadRouter.route("/").post(IsLogin, IsAdmin, upload.single("file"), uploadSingle);
uploadRouter.route("/multi").post(IsLogin, IsAdmin, upload.array("files", 10), uploadMultiple);
uploadRouter.route("/remove").post(IsLogin, IsAdmin, removeData);

export default uploadRouter;

/**
 * @swagger
 * tags:
 *   - name: Upload
 *     description: مدیریت آپلود فایل‌ها و تصاویر
 */
