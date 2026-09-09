import { Router } from "express";
import { create, getAll, getOne, remove, update } from "./BlogCn.js";
import IsLogin from "../../Middleware/IsLogin.js";
import IsAdmin from "../../Middleware/IsAdmin.js";
import { validateRequest } from "../../Utils/validateRequest.js";
import { createBlogValidator, updateBlogValidator } from "./BlogValidation.js";

const blogRouter = Router();

blogRouter.route("/")
  .get(getAll)
  .post(IsLogin, IsAdmin, validateRequest(createBlogValidator), create);

blogRouter.route("/:id")
  .get(getOne)
  .patch(IsLogin, IsAdmin, validateRequest(updateBlogValidator), update)
  .delete(IsLogin, IsAdmin, remove);

export default blogRouter;

/**
 * @swagger
 * tags:
 *   - name: Blog
 *     description: مدیریت مقالات و وبلاگ آموزشی کالج رکاد
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - category
 *         - title
 *         - description
 *         - img
 *       properties:
 *         _id:
 *           type: string
 *         category:
 *           type: string
 *           enum: [گرافیک, مسیر شغلی, MBA, زبان, فرانتاند, بکاند]
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         img:
 *           type: string
 */
