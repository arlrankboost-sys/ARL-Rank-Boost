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
      const botReply = `Hi empty-key friend! I am the Al Jannat Pizza Chatbot. 🍕 It looks like the GEMINI_API_KEY is not configured yet, so I am running on backup oven power! 
      
      Our signature Masterpiece is the **Al-Jannat Crown Crust** (999 PKR), featuring kebab crown stuffed slices loaded with chicken tikka. I also recommend our **Smoked Chicken Tikka** for a local flavor twist, or the vegan/healthy **Garden Supreme**! You can order any of these by scrolling to our menu above. Please set up the GEMINI_API_KEY in the Secrets panel to unlock my full culinary AI brain!`;
      return res.json({ text: botReply });
    }

    // System instruction to guide the chatbot role as a premium fast-food helper
    const systemInstruction = `You are "Al Jannat Chef Bot", the virtual host and culinary assistant for "Al Jannat Fast Food" pizza restaurant.
    Your personality is highly energetic, warm, cheerful, and pizza-loving! Use food emojis frequently. Keep answers relatively concise and highly scannable to ensure a premium ordering user-experience.

    Ground your knowledge with Al Jannat Fast Food:
    - Signature Masterpiece: Al-Jannat Crown Crust (from 999 PKR) - loaded with grilled chicken tikka, bell peppers, special onions, garlic sauce, and cream-filled kebab crown crust stuffing. This is the ultimate wood-fired-like masterpiece!
    - Classic Pizzas: New York Pepperoni (from 850 PKR) - giant double pepperoni; Garden Supreme (from 750 PKR, Vegetarian); Double Cheese Overload (from 780 PKR, Vegetarian).
    - Local Delights: Smoked Chicken Tikka (from 799 PKR, Spicy tandoori flavor); Tex-Mex Fajita Sensation (from 820 PKR, fajita spices & chicken).
    - Sizes: Personal 6", Regular 9", Large 12", Beast 16".
    - Sides & Desserts: Garlic Bread Supreme (320 PKR), Cheese Stuffed Nuggets (450 PKR), Molten Chocolate Lava Cake (390 PKR), Coca Cola 1.5L (180 PKR).
    - Store Branches: 
      1) Islamabad Blue Area Branch (Plot 12-B, Sector F-6, near Centaurus, Ph: +92 51 111-222-333)
      2) Lahore DHA Phase VI Branch (Raya Fairways block-G, Ph: +92 42 111-222-333)
      3) Karachi Clifton Block 5 Branch (Sea View Boulevard, Ph: +92 21 111-222-333)
      4) Rawalpindi Saddar Branch (Commercial Market near Saddar, Ph: +92 51 444-555-666)
    - Delivery guarantee: 30 minutes super hot or discount vouchers.
    
    Offer tasty recommendations. If users ask to order, tell them they can easily click the "Add to Cart" or "Customize" button on any item in the modern menu above, or use the "Solo Sensation", "Double Delight", or "Mega Feast" coupons in our Deals section!`;

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
    console.log(`Al Jannat Server running on http://0.0.0.0:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Critical server start failure:", err);
});
