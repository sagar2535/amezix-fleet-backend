import express from "express";
import {
  createDeliveryRegistration,
  getAllDeliveryRegistrations,
  getDeliveryRegistrationById,
  updateDeliveryRegistration,
  deleteDeliveryRegistration,
} from "../controllers/DeliveryRegistrationController.js";

const router = express.Router();

router.post("/", createDeliveryRegistration);
router.get("/", getAllDeliveryRegistrations);
router.get("/:id", getDeliveryRegistrationById);
router.put("/:id", updateDeliveryRegistration);
router.delete("/:id", deleteDeliveryRegistration);

export default router;
