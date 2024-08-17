import { config } from "dotenv";
config();
import { v2 as Cloudinary } from "cloudinary";

Cloudinary.config({
  cloud_name: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

export async function uploadImageToCloudinary(base64Data) {
  try {
    if (!base64Data.startsWith("data:")) {
      throw new Error("Invalid Base64 data format.");
    }
    const result = await Cloudinary.uploader.upload(base64Data, {
      resource_type: "image",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading Base64 data to Cloudinary:", error);
    throw new Error("Image upload failed");
  }
}

export default Cloudinary;
