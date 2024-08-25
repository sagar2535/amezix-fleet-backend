import { Router } from "express";
import {
  endDutyTime,
  startDutyTime,
  getDutyTime,
} from "../controllers/DutyTimeController.js";

const router = Router();

router.post("/start", startDutyTime);
router.post("/end/:id", endDutyTime);
router.get("/:delivery_registration_id", getDutyTime);

export default router;
