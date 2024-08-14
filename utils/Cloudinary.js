import { config } from "dotenv";
config();
import { v2 as Cloudinary } from "cloudinary";
import streamifier from "streamifier";

Cloudinary.config({
  cloud_name: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

export const uploadImageToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = Cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.secure_url);
      }
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export default Cloudinary;
