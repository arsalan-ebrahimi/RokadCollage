import { Router } from "express";
import {
  checkoutRequest,
  checkoutVerify,
  getCourseLicense,
} from "./PaymentCn.js";
import IsLogin from "../../Middleware/IsLogin.js";
import { validateParams, objectIdParamValidator } from "../../Utils/validateRequest.js";

const paymentRouter = Router();

// Initiate course checkout via payment gateway or free enrollment
paymentRouter.post("/checkout-request", IsLogin, checkoutRequest);

// Verify payment from Zarinpal callback and issue license
paymentRouter.post("/checkout-verify", IsLogin, checkoutVerify);

// Fetch student's SpotPlayer license and downloads for a specific course
paymentRouter.get("/license/:courseId", IsLogin, getCourseLicense);

export default paymentRouter;
