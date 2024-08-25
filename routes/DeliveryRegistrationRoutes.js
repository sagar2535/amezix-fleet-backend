import { Router } from "express";
import {
  createDeliveryRegistration,
  getAllDeliveryRegistrations,
  getDeliveryRegistrationDataUsingPhoneNumber,
  updateDeliveryRegistration,
  deleteDeliveryRegistration,
} from "../controllers/DeliveryRegistrationController.js";

const router = Router();

router.post("/", createDeliveryRegistration);
router.get("/", getAllDeliveryRegistrations);
router.get("/phone", getDeliveryRegistrationDataUsingPhoneNumber);
router.put("/:id", updateDeliveryRegistration);
router.delete("/:id", deleteDeliveryRegistration);

export default router;
