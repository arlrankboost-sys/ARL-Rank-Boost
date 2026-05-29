import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize the standard server-side Gemini client
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY) {
  ai = new GoogleGenAI({
    apiKey: API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Support JSON requests
app.use(express.json());

// API Pizza Chatbot Route
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message prompt is required." });
    }

    if (!ai) {
      // Graceful fallback with static responses if API Key isn't provided/loaded yet
      console.warn("GEMINI_API_KEY is not defined. Using helpful pizza placeholder response.");
      const botReply = `Hi empty-key friend! I am the Fast Food Pizza Chatbot. 🍕 It looks like the GEMINI_API_KEY is not configured yet, so I am running on backup oven power! 
      
      Our signature Masterpiece is the **Fast Food Crown Crust** (999 PKR), featuring kebab crown stuffed slices loaded with chicken tikka. I also recommend our **Smoked Chicken Tikka** for a local flavor twist, or the vegan/healthy **Garden Supreme**! You can order any of these by scrolling to our menu above. Please set up the GEMINI_API_KEY in the Secrets panel to unlock my full culinary AI brain!`;
      return res.json({ text: botReply });
    }

    // System instruction to guide the chatbot role as a premium fast-food helper
    const systemInstruction = `You are "Fast Food Chef Bot", an incredibly intelligent, warm, and highly capable conversational AI assistant for "Fast Food & Pizza" restaurant.
    - CRITICAL: You must answer ANY and EVERY question asked by the user with deep intelligence, absolute clarity, and complete understanding, whether it's related to cooking, pizza, mathematics, logic, physical science, coding, or lifestyle assistance!
    - Keep your tone highly energetic, cheerful, helpful, and fast-food loving! Use food emojis frequently (e.g., 🍕, 🍔, 🍟, 🥤, 🍨, ✨).
    - Ground your knowledge with Fast Food context:
      * Signature Masterpiece: Fast Food Crown Crust (from 999 PKR) - loaded with grilled chicken tikka, bell peppers, special onions, garlic sauce, and cream-filled kebab crown crust stuffing. This is the ultimate wood-fired-like masterpiece!
      * Classic Pizzas: New York Pepperoni (from 850 PKR) - giant double pepperoni; Garden Supreme (from 750 PKR, Vegetarian); Double Cheese Overload (from 780 PKR, Vegetarian).
      * Local Delights: Smoked Chicken Tikka (from 799 PKR, Spicy tandoori flavor); Tex-Mex Fajita Sensation (from 820 PKR, fajita spices & chicken).
      * Sizes: Personal 6", Regular 9", Large 12", Beast 16".
      * Sides & Desserts: Garlic Bread Supreme (320 PKR), Cheese Stuffed Nuggets (450 PKR), Molten Chocolate Lava Cake (390 PKR), Coca Cola 1.5L (180 PKR).
      * Store Branches: Islamabad Blue Area, Lahore DHA Phase VI, Karachi Clifton Block 5, Rawalpindi Saddar.
      * Delivery guarantee: 30 minutes super hot or discount vouchers.
    - For any non-food or general assistance queries, answer them accurately and comprehensively, then wrap up with a lighthearted, playful food analogy! (e.g., 'Just as gravity is the invisible glue of the universe, our premium double-layered cheese keeps our crispy toppings beautifully in place!').`;

    // Map incoming history to standard Gemini chat structure if supplied
    // Standard structure: history is optional. We can create chats
    const formattedHistory = Array.isArray(history) ? history.map((item: any) => ({
      role: item.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: item.text || item.content || "" }]
    })) : [];

    const chatInstance = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.75,
      },
      history: formattedHistory
    });

    const response = await chatInstance.sendMessage({ message });
    return res.json({ text: response.text });

  } catch (error: any) {
    console.error("Gemini API server-side error:", error);
    return res.status(500).json({ 
      error: "We encountered an issue preparing spices for your chat. Please try again.",
      details: error.message 
    });
  }
});

async function main() {
  // Vite dev server mounting or Production static assets handling
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Fast Food Server running on http://0.0.0.0:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Critical server start failure:", err);
});
