import express from "express";

import {adminOnly} from "../middlewares/authMiddleware.js"
import upload from "../middlewares/multer.js"
import { addMenuItem, deleteMenuItem, getAllMenuItems, updateMenuItem } from "../controllers/menuController.js";
import { bulkUploadMenus } from "../controllers/bulkController.js";
const menuRoutes=express.Router();

menuRoutes.post("/add",adminOnly,upload.single("image"),addMenuItem)
menuRoutes.post("/bulk-upload", bulkUploadMenus);
menuRoutes.put("/update/:id",adminOnly,upload.single("image"),updateMenuItem)
menuRoutes.delete("/delete/:id",adminOnly,deleteMenuItem)
menuRoutes.get("/all",getAllMenuItems)



export default menuRoutes;