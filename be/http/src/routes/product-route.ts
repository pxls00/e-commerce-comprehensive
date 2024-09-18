import {Request, Router} from "express";
import {body} from "express-validator";

import {trace} from "@opentelemetry/api";

import productController from "../controllers/product-controller";
import authMiddleware from "../middleware/auth-middleware";
import opentelemetryMiddleware from "../middleware/opentelemetry-middleware";

const tracer = trace.getTracer("product-controller")

const router = Router();

router.get("/",
  (req: Request, res, next) => {
    return opentelemetryMiddleware(req, () => productController.getProducts(req, res, next))
  }
);
router.get("/:uuid",
  (req: Request, res, next) => {
    return opentelemetryMiddleware(req, () => productController.getOneProduct(req, res, next))
  }
);

router.post(
  "/add",
  authMiddleware,
  body("price").isNumeric(),
  body('name').notEmpty(),
  body('description').notEmpty(),
  productController.addProduct
);
router.put("/:uuid", authMiddleware, productController.updateProduct);
router.delete("/:uuid", authMiddleware, productController.deleteProduct);

export default router;