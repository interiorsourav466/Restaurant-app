import fs from "fs";
import Menu from "../models/menuModel.js";
import Category from "../models/categoryModel.js";

export const bulkUploadMenus = async (req, res) => {
  try {
    const menus = JSON.parse(fs.readFileSync("./data/menus.json", "utf-8"));

    for (const item of menus) {
      // find category
      let category = await Category.findOne({
        name: item.category,
      });

      // create category if not exists
      if (!category) {
        category = await Category.create({
          name: item.category,
          image: item.image,
        });
      }

      // create menu item
      await Menu.create({
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        category: category._id,
        rating: item.rating,
        isAvailable: item.isAvailable, 
      });
    }

    res.json({
      success: true,
      message: "Bulk upload completed",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Bulk upload failed",
    });
  }
};
