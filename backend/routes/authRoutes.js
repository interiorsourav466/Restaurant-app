import express from "express";
import {
  

  getProfile,
  isAuth,
  loginUser,
  logoutUser,
  adminLogin,
  registerUser,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import uploadProfilePhoto from "../middlewares/uploadProfilePhoto.js";
import { updateProfile, uploadProfilePhoto as uploadProfilePhotoController } from "../controllers/profileController.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/admin/login", adminLogin);
authRoutes.post("/logout", logoutUser);
authRoutes.get("/profile", protect, getProfile);
authRoutes.get("/is-auth", protect, isAuth);

// profile update
authRoutes.put("/profile", protect, updateProfile);
authRoutes.post(
  "/profile-photo",
  protect,
  uploadProfilePhoto.single("photo"),
  uploadProfilePhotoController
);

export default authRoutes; 

