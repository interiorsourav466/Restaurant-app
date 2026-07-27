import Menu from "../models/menuModel.js";
import { askAI } from "../services/geminiService.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "A valid non-empty message is required.",
      });
    }

    // Fetch available menu items
    const menuItems = await Menu.find({ isAvailable: true })
      .populate("category", "name")
      .lean();

    // Generate AI response
    const reply = await askAI(message, menuItems);

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("AI Controller Error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to process chat request.",
    });
  }
};