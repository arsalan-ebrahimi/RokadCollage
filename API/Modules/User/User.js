import { Router } from "express";
import { getAll, getOne, update } from "./UserCn.js";
import IsAdmin from "../../Middleware/IsAdmin.js";
import IsLogin from "../../Middleware/IsLogin.js";
import { validateRequest } from "../../Utils/validateRequest.js";
import { updateUserValidator } from "./UserValidation.js";

const userRouter = Router();

userRouter.route("/")
  .get(IsLogin, IsAdmin, getAll);

userRouter.route("/:id")
  .get(IsLogin, getOne)
  .patch(IsLogin, validateRequest(updateUserValidator), update);

export default userRouter;

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: مدیریت کاربران
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
 */
