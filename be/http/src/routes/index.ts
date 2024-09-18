import { Router } from "express";

import authRouter from "./auth-route";
import customerRouter from "./customer-route";
import productRouter from "./product-route";
import swaggerRouter from "./swagger-route"

import authMiddleware from "../middleware/auth-middleware";

const router = Router();

router.use("/", authRouter)
router.use("/customer", authMiddleware, customerRouter);
router.use("/product", productRouter);
router.use("/test", (res, req) => {
  req.json([123, 123, 123])
});

router.use("/docs", swaggerRouter)

export default router;
