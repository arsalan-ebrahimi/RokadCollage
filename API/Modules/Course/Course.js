import { Router } from "express";
import { create, getAll, getOne, remove, update } from "./CourseCn.js";
import IsLogin from "../../Middleware/IsLogin.js";
import IsAdmin from "../../Middleware/IsAdmin.js";
import { validateRequest } from "../../Utils/validateRequest.js";
import { createCourseValidator, updateCourseValidator } from "./CourseValidation.js";

const courseRouter = Router();

courseRouter.route("/")
  .get(getAll)
  .post(IsLogin, IsAdmin, validateRequest(createCourseValidator), create);

courseRouter.route("/:id")
  .get(getOne)
  .patch(IsLogin, IsAdmin, validateRequest(updateCourseValidator), update)
  .delete(IsLogin, IsAdmin, remove);

export default courseRouter;

/**
 * @swagger
 * tags:
 *   - name: Course
 *     description: مدیریت دوره‌های آموزشی کالج رکاد
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - category
 *         - type
 *         - title
 *         - description
 *         - duration
 *         - icon
 *       properties:
 *         _id:
 *           type: string
 *         category:
 *           type: string
 *           enum: [فناوری اطلاعات, گرافیک, زبان, MBA]
 *         type:
 *           type: string
 *           enum: [حضوری, مجازی]
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         duration:
 *           type: string
 *         icon:
 *           type: string
 */
