import {Request, Router} from "express";
import { body } from "express-validator";
const router = Router();

import {trace} from "@opentelemetry/api";

import authController from "../controllers/auth-controller";
import opentelemetryMiddleware from "../middleware/opentelemetry-middleware";

const tracer = trace.getTracer("auth-controller")

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 30 }),
  (req: Request, res, next) => {
    return opentelemetryMiddleware(req, () => authController.registration(req, res, next))
  }
);
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 30 }),
  authController.login
);
router.get("/logout", authController.logout);
router.get("/refresh", authController.refresh);


export default router;