import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { catchError, HandleERROR } from "vanta-api";
import { exportValidation } from "./Middleware/ExportValidation.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./Utils/Swagger.js";

import authRouter from "./Modules/Auth/Auth.js";
import userRouter from "./Modules/User/User.js";
import uploadRouter from "./Modules/Upload/Upload.js";
import courseRouter from "./Modules/Course/Course.js";
import commentRouter from "./Modules/Comment/Comment.js";
import blogRouter from "./Modules/Blog/Blog.js";
import seoRouter from "./Modules/Seo/Seo.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/Public`));
app.use(exportValidation);

// Core Modules API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/course", courseRouter);
app.use("/api/comment", commentRouter);
app.use("/api/blog", blogRouter);
app.use("/api/seo", seoRouter);

// Swagger Documentation Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 Not Found Handler
app.use((req, res, next) => {
  return next(new HandleERROR("مسیر مورد نظر یافت نشد", 404));
});

// Centralized Error Handling Middleware
app.use(catchError);

export default app;
