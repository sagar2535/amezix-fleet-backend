import axios from "axios";
import { config } from "dotenv";
config();

export const sendOtp = async (req, res) => {
  const { mobileNumber } = req.body;
  try {
    const response = await axios.post("https://api.msg91.com/api/v5/otp", {
      mobile: mobileNumber,
      authkey: process.env.MSG91_API_KEY,
      template_id: process.env.MSG91_TEMPLATE_ID,
    });
    console.log("OTP sent:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.json(error);
  }
};

// Example usage

export const verifyOtp = async (req, res) => {
  const { mobileNumber, otp } = req.body;
  try {
    const response = await axios.post(
      "https://api.msg91.com/api/v5/otp/verify",
      {
        mobile: mobileNumber,
        otp: otp,
        authkey: process.env.MSG91_API_KEY,
      }
    );
    console.log("OTP verification result:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.json(error);
  }
};
