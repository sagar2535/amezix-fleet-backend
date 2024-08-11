import { Router } from "express";
import { sendOtp, verifyOtp } from "../controllers/AuthController.js";

const router = Router();

router.post("/login", sendOtp);
router.post("/verify", verifyOtp);

export default router;
