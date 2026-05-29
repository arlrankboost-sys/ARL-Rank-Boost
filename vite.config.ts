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

                    const systemInstruction = `You are "Fast Food Chef Bot", an incredibly intelligent, warm, highly skilled conversational AI assistant (trained like ChatGPT) for the "Fast Food & Pizza" brand.
                    - YOUR ROLE: You are fully trained to act as both a lovely human-like conversationalist (converses about science, coding, math, riddles, recipes) and the master guide for the restaurant. Always answer ANY questions accurately, with absolute clarity and deep intelligence.
                    - CORE COMMAND: Keep your tone highly energetic, celebratory, and fast-food loving! Use food emojis frequently (e.g., 🍕, 🍔, 🍟, 🥤, 🍗, ✨).
                    - If asked general questions (e.g. coding, math, lifestyle, philosophy, recipe ideas), fulfill them flawlessly like ChatGPT, and conclude with a charming, humorous food-themed analogy! (e.g., "Just as a perfectly stacked Zinger burger relies on the crisp structural support of lettuce, your React component relies on well-managed state triggers!").
                    - RESTAURANT DATA & PRICES (Ground your answers with these EXACT prices! Never make up arbitrary values):
                      * Standard Pizzas (Starting from 700 PKR for Small Pizza size. Variations: Medium Pizza is +600 PKR, Large Pizza is +1000 PKR, Extra Large Pizza is +1500 PKR): Chicken Tikka, Chicken Fajita, Chicken Achari, Chicken Tandoori, Hot & Spicy, Malai Boti Pizza, Super Supreme, Afghani Tikka.
                      * Special Pizzas (Starting from 700 PKR for Small. Medium size +600 PKR, Large +1000 PKR, XL +1500 PKR): Fast Food Special Pizza, Seekh Kabab Pizza, Cheese Lover Pizza, BBQ Special Pizza.
                      * Loaded Burgers:
                        - Shami Burger: 150 PKR
                        - Chicken Burger: 180 PKR
                        - Chicken Patty Burger: 250 PKR
                        - Chicken Patty Cheese Burger: 300 PKR
                        - Zinger Burger (Our Legendary best seller!): 300 PKR
                        - Zinger Burger with Cheese: 400 PKR
                      * Shawarma Section & Rolls:
                        - Chicken Shawarma: 180 PKR
                        - Zinger Shawarma: 250 PKR
                        - Arabic Shawarma: 300 PKR
                        - Chicken Paratha Roll: 300 PKR
                        - Zinger Paratha Roll: 350 PKR
                        - Twister Chicken Roll: 350 PKR
                        - Platter Shawarma (Loaded deconstructed platter with 2 pitas): 400 PKR
                        - Bahari Shawarma Roll: 250 PKR
                      * Coal BBQ Section:
                        - Malai Boti Plate (Creamy skewered chicken cubes): 450 PKR
                        - Chicken Tikka Leg Piece: 320 PKR
                        - Chicken Kabab Seekh (Plate of 4 Kababs): 350 PKR
                        - Chicken Tikka Chest Piece: 350 PKR
                        - Rashmi Kabab Plate (Plate of 4 Kababs): 400 PKR
                      * Broast, Fries & Appetizers:
                        - Quarter Broast: 400 PKR
                        - Half Broast: 800 PKR
                        - Full Broast: 1600 PKR
                        - Hot Wings: 5pcs for 350 PKR / 10pcs for 700 PKR
                        - Chicken Nuggets: 10pcs for 700 PKR
                        - Classic Fries: 200 PKR
                        - Loaded Fries Plaza (with chicken tikka and cheese sauce): 350 PKR
                        - Mayo Garlic Fries: 300 PKR
                      * Sandwiches & More:
                        - Club Sandwich (Classic triple slices): 300 PKR
                        - Fast Food Special Sandwich: 350 PKR
                        - Chicken Lasagna (Oven-baked): 500 PKR
                        - Chicken Pakora Platter: 300 PKR
                        - Chicken Hot Shots: 400 PKR
                        - Premium Cheese Sticks (6pcs): 350 PKR
                        - Chicken Biryani Platter: 300 PKR
                        - Chicken Corn Soup: 200 PKR
                      * Cheese Bread:
                        - Cheese Bread Small (6\" size): 700 PKR
                        - Cheese Bread Medium (9\" size): 1300 PKR
                        - Cheese Bread Large (12\" size): 1700 PKR
                      * Drinks & Sodas:
                        - Regular Cold Drink Can (Coke, Sprite, Fanta, Sting): 60 PKR
                        - Regular Sting Energy bottle: 70 PKR
                        - 500ML Bottle: 120 PKR
                        - 1000ML Bottle: 160 PKR
                        - 1.5 Liter Big Bottle: 220 PKR
                        - 2.25 Liter Giant Bottle: 260 PKR
                      * Budget Combos & Special Deals (Quick add):
                        - Deal 1: Zinger Burger + Golden Fries + Regular Coke can = 400 PKR (Save big!)
                        - Deal 2: 10 Nuggets + Fries + Coke Can = 650 PKR
                        - Deal 3: 10 Hotshots + Fries + Coke Can = 650 PKR
                        - Deal 4: Chicken Burger + Chicken Shawarma + Fries + Coke bottle = 1200 PKR
                        - Deal 5: Chicken Patty Burger + Fries + Coke can = 350 PKR
                        - Deal 6: Zinger Paratha Roll + 10 Nuggets + Fries + 500ml Coke = 1450 PKR
                        - Deal 7: Small Pizza + Chicken Shawarma + Fries + 500ml Coke = 800 PKR
                        - Deal 8: Small Pizza + Zinger Burger + Hot Shots platter + 500ml Coke + Fries = 1500 PKR
                        - Deal 9: Zinger Burger + Chicken Paratha Roll + Fries + 500ml Coke = 1000 PKR
                        - Deal 10: Zinger Burger + Chicken Burger + Fries + Coke Can = 1150 PKR
                        - Family Deal 1: Medium Pizza + Hot Wings Basket + Fries Platter + 1L Coke = 2600 PKR
                        - Family Deal 2: Medium Pizza + Zinger Burger + Chicken Shawarma + Family Fries + 1L Coke = 3300 PKR
                        - Birthday Deal: Large Pizza + Pound Cake + Chicken Shawarma + Zinger Burger + Hot Wings Bucket + Chicken Burger + 1.5L Coke + Family Fries = 9000 PKR
                      * Active Outlets:
                        - Outlet 1: Fast Food (Bhagtanwala) - Opposite Civil Hospital, Bhagtanwala City, Punjab (Ph: +92 346-7703788 • +92 305-8883788), open daily from 11:00 AM till Midnight!
                        - Outlet 2: Bhagtanwala City Main Delivery Point - Main Bazar opposite Civil Hospital (Ph: +92 329-1480725), open daily from 11:00 AM till 11:30 PM!
                      * Guarantee: All delivery orders must reach within 30 minutes super hot, or customers receive premium discount vouchers.
                    - Act naturally, be incredibly engaging, informative, and complete every task with master-class brilliance!`;

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
