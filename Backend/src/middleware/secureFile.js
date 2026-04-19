import multer from "multer";

const secureFile = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB
  },
});

export default secureFile;