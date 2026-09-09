import { Router } from "express";
import { create, getAll, getOne, remove, update } from "./CommentCn.js";
import IsLogin from "../../Middleware/IsLogin.js";
import IsAdmin from "../../Middleware/IsAdmin.js";
import { validateRequest } from "../../Utils/validateRequest.js";
import { createCommentValidator, updateCommentValidator } from "./CommentValidation.js";

const commentRouter = Router();

commentRouter.route("/")
  .get(getAll)
  .post(IsLogin, IsAdmin, validateRequest(createCommentValidator), create);

commentRouter.route("/:id")
  .get(getOne)
  .patch(IsLogin, IsAdmin, validateRequest(updateCommentValidator), update)
  .delete(IsLogin, IsAdmin, remove);

export default commentRouter;

/**
 * @swagger
 * tags:
 *   - name: Comment
 *     description: مدیریت نظرات دانشجویان و کاربران در دوره‌ها
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - course
 *         - comment
 *         - name
 *         - role
 *       properties:
 *         _id:
 *           type: string
 *         course:
 *           type: string
 *           description: ID دوره مرتبط
 *         comment:
 *           type: string
 *           description: متن نظر
 *         name:
 *           type: string
 *           description: نام فرد کامنت‌گذار
 *         role:
 *           type: string
 *           description: نقش فرد (متن آزاد)
 *         job:
 *           type: string
 *           description: شغل فرد (اختیاری)
 *         img:
 *           type: string
 *           description: تصویر یا آواتار کامنت‌گذار (اختیاری)
 */
