import { Router } from "express";
import { getOne, update } from "./SeoCn.js";
import IsLogin from "../../Middleware/IsLogin.js";
import IsAdmin from "../../Middleware/IsAdmin.js";
import { validateRequest } from "../../Utils/validateRequest.js";
import { updateSeoValidator } from "./SeoValidation.js";

const seoRouter = Router();

seoRouter
  .route("/")
  .get(getOne)
  .patch(IsLogin, IsAdmin, validateRequest(updateSeoValidator), update);

export default seoRouter;

/**
 * @swagger
 * components:
 *   schemas:
 *     Seo:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: عنوان وبسایت
 *         description:
 *           type: string
 *           description: توضیحات متای وبسایت
 *         keywords:
 *           type: string
 *           description: کلمات کلیدی متای وبسایت
 *         robots:
 *           type: string
 *           default: "index, follow"
 *         canonicalUrl:
 *           type: string
 *         ogTitle:
 *           type: string
 *         ogDescription:
 *           type: string
 *         ogImage:
 *           type: string
 *         ogType:
 *           type: string
 *           default: "website"
 *         twitterCard:
 *           type: string
 *           default: "summary_large_image"
 *         twitterTitle:
 *           type: string
 *         twitterDescription:
 *           type: string
 *         twitterImage:
 *           type: string
 *     SeoInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         keywords:
 *           type: string
 *         robots:
 *           type: string
 *         canonicalUrl:
 *           type: string
 *         ogTitle:
 *           type: string
 *         ogDescription:
 *           type: string
 *         ogImage:
 *           type: string
 *         ogType:
 *           type: string
 *         twitterCard:
 *           type: string
 *         twitterTitle:
 *           type: string
 *         twitterDescription:
 *           type: string
 *         twitterImage:
 *           type: string
 *     SeoResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/Seo'
 */

/**
 * @swagger
 * tags:
 *   - name: Seo
 *     description: مدیریت تنظیمات سئو سایت (Singleton)
 */

/**
 * @swagger
 * /api/seo:
 *   get:
 *     summary: دریافت تنظیمات سئو سایت
 *     tags: [Seo]
 *     description: "دریافت تنظیمات جامع سئو (الگوی Singleton)."
 *     responses:
 *       200:
 *         description: تنظیمات سئو با موفقیت دریافت شد
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeoResponse'
 *   patch:
 *     summary: ویرایش و به‌روزرسانی تنظیمات سئو سایت
 *     tags: [Seo]
 *     description: "به‌روزرسانی تنظیمات سئو (نیاز به دسترسی ادمین دارد)."
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SeoInput'
 *     responses:
 *       200:
 *         description: تنظیمات سئو با موفقیت به‌روزرسانی شد
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SeoResponse'
 */
