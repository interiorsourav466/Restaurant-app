import multer from "multer";

// NOTE: Multer disk storage is configured with defaults (memory-like behavior not needed).
// We will stream the uploaded file directly to Cloudinary and then discard local file.
const upload = multer({ storage: multer.diskStorage({}) });

export default upload;

