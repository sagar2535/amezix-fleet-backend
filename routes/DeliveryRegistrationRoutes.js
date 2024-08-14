import { Router } from "express";
import {
  createDeliveryRegistration,
  getAllDeliveryRegistrations,
  getDeliveryRegistrationById,
  updateDeliveryRegistration,
  deleteDeliveryRegistration,
} from "../controllers/DeliveryRegistrationController.js";
import imageFileUpload from "../middleware/multer.js";

const router = Router();

router.post("/", imageFileUpload, createDeliveryRegistration);
router.get("/", getAllDeliveryRegistrations);
router.get("/:id", getDeliveryRegistrationById);
router.put("/:id", updateDeliveryRegistration);
router.delete("/:id", deleteDeliveryRegistration);

export default router;
