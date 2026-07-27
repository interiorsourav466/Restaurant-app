import Groq from "groq-sdk";
import systemPrompt from "../utils/systemPrompt.js";

export const askAI = async (userMessage, menuItems = []) => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing from environment variables.");
  }

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const menuText =
    menuItems.length > 0
      ? menuItems
          .map(
            (item) => `
Name: ${item.name}
Description: ${item.description || "N/A"}
Price: ₹${item.price}
Category: ${item.category?.name || "N/A"}
Available: ${item.isAvailable ? "Yes" : "No"}
Special: ${item.isSpecial ? "Yes" : "No"}
Rating: ${item.rating ?? "N/A"}
`
          )
          .join("\n-----------------\n")
      : "No active menu items available currently.";

  const fullPrompt = `${systemPrompt}

Restaurant Menu:
${menuText}`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: fullPrompt },
        { role: "user", content: userMessage },
      ],
      model: "llama-3.3-70b-versatile",
    });

    return chatCompletion.choices[0]?.message?.content || "No response generated.";
  } catch (err) {
    console.error("Groq AI Error:", err.message);
    throw new Error(err.message || "Failed to process request with AI.");
  }
};