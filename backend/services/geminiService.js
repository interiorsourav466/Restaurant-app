import { GoogleGenAI } from "@google/genai";
import systemPrompt from "../utils/systemPrompt.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const askAI = async (userMessage, menuItems = []) => {
  const menuText = menuItems
    .map(
      (item) => `
Name: ${item.name}
Description: ${item.description}
Price: ₹${item.price}
Category: ${item.category?.name || "N/A"}
Available: ${item.isAvailable ? "Yes" : "No"}
Special: ${item.isSpecial ? "Yes" : "No"}
Rating: ${item.rating}
`
    )
    .join("\n----------------------\n");

  const prompt = `
${systemPrompt}

Restaurant Menu:

${menuText}

User:
${userMessage}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};