import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'vite-api-chatbot-middleware',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/api/chat' && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk;
              });
              req.on('end', async () => {
                try {
                  const { message, history } = JSON.parse(body || '{}');
                  const apiKey = process.env.GEMINI_API_KEY;

                  let replyText = "";
                  if (!apiKey) {
                    replyText = `Hi there! I am your AI Chef Bot, running on temporary standby! 🍕 I can see your GEMINI_API_KEY is not configured yet in the Settings panel. 

I want to answer your question with deep understanding: "${message.substring(0, 100)}". 
To unlock my full AI superpowers and answer any general or technical question with deep cognitive understanding, please add your GEMINI_API_KEY in the Secrets panel! Meanwhile, our signature menu is loaded with incredible choices like the **Fast Food Crown Crust** pizza (999 PKR) and the **Grand Fast Food Fiesta** deals!`;
                  } else {
                    const aiClient = new GoogleGenAI({
                      apiKey,
                      httpOptions: {
                        headers: {
                          'User-Agent': 'aistudio-build',
                        },
                      },
                    });

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
                    - For any non-food or general assistance queries, answer them accurately and comprehensively, then wrap up with a lighthearted, playful food analogy! (e.g., 'Just as gravity is the invisible glue of the universe, our premium double-layered cheese keeps our crispy toppings beautifully in place! Enjoy this tasty thought!').`;

                    const formattedHistory = Array.isArray(history) ? history.slice(-10).map((item: any) => ({
                      role: item.role === "assistant" ? "model" as const : "user" as const,
                      parts: [{ text: item.text || item.content || "" }]
                    })) : [];

                    const chatInstance = aiClient.chats.create({
                      model: "gemini-3.5-flash",
                      config: {
                        systemInstruction,
                        temperature: 0.75,
                      },
                      history: formattedHistory
                    });

                    const geminiRes = await chatInstance.sendMessage({ message });
                    replyText = geminiRes.text || "I processed your question, but could not cook up a textual reply. Please try again! 🍕";
                  }

                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ text: replyText }));
                } catch (err: any) {
                  console.error("Vite API Chat backup error:", err);
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: err.message || "Failed processing chat." }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
