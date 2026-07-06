import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

export const updateProfile = async (req, res) => {

  try {
    const { name, email, password } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (name) user.name = name;

    // Allow updating email only if you really want it.
    // Keep same logic to prevent conflicts.
    if (email && email !== user.email) {
      const existing = await User.findOne({ email });
      if (existing) {
        return res.json({ success: false, message: "Email already in use" });
      }
      user.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    return res.json({ success: true, message: "Profile updated", user: { ...user.toObject() } });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Photo file is required" });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_photos",
      resource_type: "image",
    });

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.profilePhoto = uploadResult.secure_url;
    await user.save();

    return res.json({ success: true, message: "Profile photo updated", user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message || "Internal server error" });
  }
};

