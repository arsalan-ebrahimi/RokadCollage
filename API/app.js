import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { catchError, HandleERROR } from "vanta-api";
import mongoose from "mongoose";
import { exportValidation } from "./Middleware/ExportValidation.js";
import mongoSanitize from "./Middleware/mongoSanitize.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./Utils/Swagger.js";

import authRouter from "./Modules/Auth/Auth.js";
import userRouter from "./Modules/User/User.js";
import uploadRouter from "./Modules/Upload/Upload.js";
import inPersonCourseRouter from "./Modules/InPersonCourse/InPersonCourse.js";
import virtualCourseRouter from "./Modules/VirtualCourse/VirtualCourse.js";
import teacherRouter from "./Modules/Teacher/Teacher.js";
import walletRouter from "./Modules/Wallet/Wallet.js";
import enrollmentRouter from "./Modules/Enrollment/Enrollment.js";
import commentRouter from "./Modules/Comment/Comment.js";
import blogRouter from "./Modules/Blog/Blog.js";
import seoRouter from "./Modules/Seo/Seo.js";
import paymentRouter from "./Modules/Payment/PaymentRoutes.js";
import courseCommentRouter from "./Modules/CourseComment/CourseComment.js";
import InPersonCourse from "./Modules/InPersonCourse/InPersonCourseMd.js";
import VirtualCourse from "./Modules/VirtualCourse/VirtualCourseMd.js";

const app = express();

// Trust reverse proxy (Docker / Nginx) for accurate client IP detection
app.set("trust proxy", 1);

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// Helmet enterprise security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(morgan("dev"));

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim())
    : ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "2mb" }));
app.use(mongoSanitize({ replaceWith: "_" }));
app.use(
  express.static(`${__dirname}/Public`, {
    dotfiles: "ignore",
    setHeaders: (res) => {
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);
app.use(exportValidation);

// Global API rate limiter (300 requests per 15 minutes per IP window)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "تعداد درخواست‌های ارسالی از سمت شما بیش از حد مجاز است. لطفاً پس از چند دقیقه مجدداً تلاش کنید",
  },
  skip: (req) => req.path === "/health" || req.path.startsWith("/api-docs"),
});

app.use(apiLimiter);

// Deep Health check endpoint for Docker, Kubernetes liveness/readiness probes & monitoring
app.get("/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  // MongoDB ready states: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const isDbConnected = dbState === 1;

  const mem = process.memoryUsage();
  const formatMb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

  const healthData = {
    status: isDbConnected ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      status: isDbConnected ? "connected" : "disconnected",
      readyState: dbState,
      host: mongoose.connection.host || "unknown",
      name: mongoose.connection.name || "unknown",
    },
    memory: {
      rss: formatMb(mem.rss),
      heapTotal: formatMb(mem.heapTotal),
      heapUsed: formatMb(mem.heapUsed),
    },
    environment: process.env.NODE_ENV || "development",
  };

  if (!isDbConnected) {
    return res.status(503).json(healthData);
  }

  return res.status(200).json(healthData);
});

// Core Modules API Routes
app.use(["/api/auth", "/auth"], authRouter);
app.use(["/api/user", "/user"], userRouter);
app.use(["/api/upload", "/upload"], uploadRouter);
app.use(["/api/in-person-courses", "/in-person-courses"], inPersonCourseRouter);
app.use(["/api/virtual-courses", "/virtual-courses"], virtualCourseRouter);
app.use(["/api/teacher", "/teacher", "/api/teachers", "/teachers"], teacherRouter);
app.use(["/api/wallet", "/wallet"], walletRouter);
app.use(["/api/enrollment", "/api/enrollments", "/enrollments", "/enrollment"], enrollmentRouter);
app.use(["/api/comment", "/api/comments", "/comments", "/comment"], commentRouter);
app.use(["/api/blog", "/api/blogs", "/blogs", "/blog"], blogRouter);
app.use(["/api/seo", "/seo"], seoRouter);
app.use(["/api/payment", "/payment"], paymentRouter);

// Virtual Course Comments & Discussions
app.use(["/api/course-comments", "/course-comments"], courseCommentRouter);
app.use(["/api/virtual-courses/:courseId/comments", "/virtual-courses/:courseId/comments"], courseCommentRouter);

/**
 * @swagger
 * tags:
 *   - name: Course
 *     description: فهرست کلی و یکپارچه دوره‌های آموزشی (حضوری و مجازی)
 *
 * /api/course:
 *   get:
 *     summary: دریافت لیست یکپارچه دوره‌های آموزشی (حضوری و مجازی)
 *     description: بازگرداندن مجموعه‌ای از تمام دوره‌ها همراه با نوع تفکیک‌شده (حضوری/مجازی) جهت استفاده در منوها و انتخابگر دیدگاه‌ها
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: فهرست یکپارچه دوره‌ها با موفقیت دریافت شد
 */
app.get(["/api/course", "/course", "/api/courses", "/courses"], async (req, res) => {
  try {
    const [inPerson, virtual] = await Promise.all([
      InPersonCourse.find().select("title category type img duration price").sort({ createdAt: -1 }).limit(100).lean(),
      VirtualCourse.find().select("title category type img duration price").sort({ createdAt: -1 }).limit(100).lean(),
    ]);
    const inPersonMapped = (inPerson || []).map((c) => ({
      ...c,
      courseModel: "InPersonCourse",
      displayType: "حضوری",
    }));
    const virtualMapped = (virtual || []).map((c) => ({
      ...c,
      courseModel: "VirtualCourse",
      displayType: "مجازی",
    }));
    return res.status(200).json([...inPersonMapped, ...virtualMapped]);
  } catch (err) {
    return res.status(200).json([]);
  }
});

// Swagger Documentation Route with persistent auth & search filter
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      docExpansion: "none",
    },
    customSiteTitle: "مستندات وب‌سرویس کالج رکاد | Swagger API",
  })
);

// 404 Not Found Handler
app.use((req, res, next) => {
  return next(new HandleERROR("مسیر مورد نظر یافت نشد", 404));
});

// Map payload limit and multer field/file size errors to 413 with clear Persian message
app.use((err, req, res, next) => {
  if (err.type === "entity.too.large" || err.status === 413 || err.statusCode === 413) {
    err.statusCode = 413;
    err.message = "حجم داده‌های ارسالی بیش از حد مجاز است";
  } else if (err.code === "LIMIT_FIELD_VALUE" || err.code === "LIMIT_FILE_SIZE") {
    err.statusCode = 413;
    err.message = "حجم فیلد یا فایل ارسالی بیش از حد مجاز است";
  }
  next(err);
});

// Centralized Error Handling Middleware
app.use(catchError);

export default app;
