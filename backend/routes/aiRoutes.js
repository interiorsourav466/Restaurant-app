import express from "express";
import { chatWithAI } from "../controllers/aiController.js";

const aiRoutes = express.Router();

aiRoutes.post("/chat", chatWithAI);

export default aiRoutes;