import Menu from "../models/menuModel.js";
import { v2 as cloudinary } from "cloudinary";
import Category from "../models/categoryModel.js";
export const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category || !req.file) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const result = await cloudinary.uploader.upload(req.file.path);

    const newMenuItem = await Menu.create({
      name,
      description,
      price,
      category,
      image: result.secure_url,
    });
    res.status(201).json({
      message: "Menu item added",
      success: true,
      menuItem: newMenuItem,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

export const getAllMenuItems = async (req, res) => {
  try {
    // search query
    const search = req.query.search || "";

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

    const skip = (page - 1) * limit;

    let filter = {};

    if (search && search.trim() !== "") {
      filter.name = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    // total items
    const totalMenus = await Menu.countDocuments(filter);

    // menus
    const menuItems = await Menu.find(filter)
      .populate("category", "name")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      menuItems,
      currentPage: page,
      totalPages: Math.ceil(totalMenus / limit),
      totalMenus,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, isAvailable } = req.body;

    const menuItem = await Menu.findById(id);
    if (!menuItem)
      return res
        .status(404)
        .json({ message: "Menu item not found", success: false });

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      menuItem.image = result.secure_url;
    }
    if (name) menuItem.name = name;
    if (description) menuItem.description = description;
    if (price) menuItem.price = price;
    if (category) menuItem.category = category;
    if (isAvailable !== undefined) menuItem.isAvailable = isAvailable;

    await menuItem.save();
    res
      .status(200)
      .json({ message: "Menu item updated", success: true, menuItem });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await Menu.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Menu item deleted" });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};
