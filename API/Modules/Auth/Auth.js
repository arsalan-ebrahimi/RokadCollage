import { Router } from "express";
import {
  auth,
  forgetPassword,
  loginWithOtp,
  loginWithPassword,
  resendCode,
} from "./AuthCn.js";
import { validateRequest } from "../../Utils/validateRequest.js";
import {
  authValidator,
  forgetPasswordValidator,
  loginWithOtpValidator,
  loginWithPasswordValidator,
  resendCodeValidator,
} from "./AuthValidation.js";

const authRouter = Router();

authRouter.route("/").post(validateRequest(authValidator), auth);
authRouter.route("/login-password").post(validateRequest(loginWithPasswordValidator), loginWithPassword);
authRouter.route("/login-otp").post(validateRequest(loginWithOtpValidator), loginWithOtp);
authRouter.route("/resend-code").post(validateRequest(resendCodeValidator), resendCode);
authRouter.route("/forget-password").post(validateRequest(forgetPasswordValidator), forgetPassword);

export default authRouter;

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: احراز هویت و ورود کاربران
 */
