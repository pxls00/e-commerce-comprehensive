import { Router } from "express";
const router = Router();

import customerController from "../controllers/customer-controller";

router.get("/all", customerController.getCustomers);
router.get("/", customerController.getCurrentCustomer);
router.get("/:uuid", customerController.getCustomer);
router.put("/:uuid", customerController.updateCustomer);

export default router;