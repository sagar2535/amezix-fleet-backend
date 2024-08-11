import { config } from "dotenv";
config();
import { v2 as Cloudinary } from "cloudinary";

Cloudinary.config({
  cloud_name: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

export async function uploadImageToCloudinary(url) {
  try {
    const result = await Cloudinary.uploader.upload(url);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Image upload failed");
  }
}

export default Cloudinary;
