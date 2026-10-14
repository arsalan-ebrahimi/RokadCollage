import { Router } from "express";
import { getAll, getOne, update, create, remove } from "./UserCn.js";
import IsAdmin from "../../Middleware/IsAdmin.js";
import IsLogin from "../../Middleware/IsLogin.js";
import { validateRequest, validateParams, objectIdParamValidator } from "../../Utils/validateRequest.js";
import { createUserValidator, updateUserValidator } from "./UserValidation.js";

const userRouter = Router();

userRouter.route("/")
  .get(IsLogin, IsAdmin, getAll)
  .post(IsLogin, IsAdmin, validateRequest(createUserValidator), create);

userRouter.route("/me")
  .get(IsLogin, (req, res, next) => {
    req.params.id = req.userId;
    return getOne(req, res, next);
  })
  .patch(IsLogin, validateRequest(updateUserValidator), (req, res, next) => {
    req.params.id = req.userId;
    return update(req, res, next);
  });

userRouter.route("/:id")
  .get(IsLogin, validateParams(objectIdParamValidator), getOne)
  .patch(IsLogin, validateParams(objectIdParamValidator), validateRequest(updateUserValidator), update)
  .delete(IsLogin, IsAdmin, validateParams(objectIdParamValidator), remove);

export default userRouter;

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: مدیریت کاربران و سطوح دسترسی
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         fullName:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         birthDate:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin, superAdmin]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - phoneNumber
 *       properties:
 *         fullName:
 *           type: string
 *           example: "علی محمدی"
 *         phoneNumber:
 *           type: string
 *           example: "09123456789"
 *         password:
 *           type: string
 *           format: password
 *           example: "12345678"
 *         birthDate:
 *           type: string
 *           example: "1380/01/01"
 *         role:
 *           type: string
 *           enum: [user, admin, superAdmin]
 *           default: "user"
 *     UpdateUserInput:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           example: "علی محمدی"
 *         phoneNumber:
 *           type: string
 *           example: "09123456789"
 *         password:
 *           type: string
 *           format: password
 *           example: "newSecret123"
 *         birthDate:
 *           type: string
 *           example: "1380/01/01"
 *         role:
 *           type: string
 *           enum: [user, admin, superAdmin]
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: دریافت فهرست کاربران سامانه (مدیر سیستم)
 *     description: دریافت لیست کاربران با امکان جستجوی نام و شماره موبایل، صفحه‌بندی، مرتب‌سازی و پیوند مراجع (پشتیبانی استاندارد از populate در vanta-api).
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: جستجوی متنی در نام یا شماره موبایل
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: شماره صفحه
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: تعداد در هر صفحه
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: فیلد مرتب‌سازی (مثلاً -createdAt)
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: فیلدهای انتخابی (با کاما جدا شوند)
 *       - in: query
 *         name: populate
 *         schema:
 *           type: string
 *         description: نام فیلدهای ارتباطی جهت پیوند (vanta-api)
 *     responses:
 *       200:
 *         description: لیست کاربران با موفقیت دریافت شد
 *       401:
 *         description: عدم احراز هویت
 *       403:
 *         description: عدم دسترسی (نیاز به نقش مدیر دارد)
 *
 *   post:
 *     summary: ایجاد کاربر جدید (مدیر سیستم)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       201:
 *         description: کاربر جدید با موفقیت ایجاد شد
 *       400:
 *         description: خطای اعتبارسنجی ورودی یا شماره تکراری
 *       401:
 *         description: عدم احراز هویت
 *       403:
 *         description: دسترسی غیرمجاز
 *
 * /api/user/{id}:
 *   get:
 *     summary: دریافت اطلاعات یک کاربر با شناسه
 *     description: دریافت اطلاعات پروفایل. در صورتی که نقش کاربر جاری user باشد، اطلاعات خود کاربر بازگردانده می‌شود.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه ۲۴ کاراکتری کاربر
 *     responses:
 *       200:
 *         description: اطلاعات کاربر دریافت شد
 *       404:
 *         description: کاربر یافت نشد
 *
 *   patch:
 *     summary: ویرایش اطلاعات کاربر
 *     description: ویرایش پروفایل کاربر توسط خود کاربر یا مدیر سیستم
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *       200:
 *         description: مشخصات کاربر با موفقیت بروزرسانی شد
 *       400:
 *         description: خطای اعتبارسنجی
 *       404:
 *         description: کاربر یافت نشد
 *
 *   delete:
 *     summary: حذف کاربر (مدیر سیستم)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: کاربر با موفقیت حذف شد
 *       403:
 *         description: عدم دسترسی
 *       404:
 *         description: کاربر یافت نشد
 */

