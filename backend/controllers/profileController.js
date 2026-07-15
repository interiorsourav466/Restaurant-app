import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, gender, birthday, address } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (name) user.name = name;

    user.phone = phone;

    user.gender = gender;

    user.birthday = birthday;

    user.address = address;

    await user.save();

    const updatedUser = await User.findById(req.user.id).select("-password");

    res.json({
      success: true,
      message: "Profile updated",
      user: updatedUser,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Photo file is required" });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_photos",
      resource_type: "image",
    });

    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.profilePhoto = uploadResult.secure_url;
    await user.save();
    const updatedUser = await User.findById(req.user.id).select("-password");

    return res.json({
      success: true,
      message: "Profile photo updated",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal server error",
    });
  }
};
