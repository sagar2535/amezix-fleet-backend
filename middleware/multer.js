import multer from "multer";

const imageFileUpload = multer({
  storage: multer.memoryStorage({}),
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(file.originalname.toLowerCase());

    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"), false);
    }
  },
}).array("files", 10);

export default imageFileUpload;
