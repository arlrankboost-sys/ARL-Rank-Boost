import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, Sparkles, Pizza, UtensilsCrossed } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-1",
      role: "assistant",
      text: "As-salamu Alaykum! 🍕 Welcome to Fast Food! I am your AI Chef Bot. How can I help spice up your day? Ask me about our signature Crown Crust pizza, spicy local tikka flavors, vegan selections, or store branches!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest message when window expands/updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorStatus(null);
    const userMsgId = `user-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: userMsgId,
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Map prior logs to appropriate conversational context
      const chatHistoryForAPI = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistoryForAPI,
        }),
      });

      if (!response.ok) {
        throw new Error("Oven went cold! The server replied with a bad status.");
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: data.text || "Your pizza is ready in our hearts, but I couldn't cook up a textual reply. Try again!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("Chat failure:", err);
      setErrorStatus("Failed to send. Please check your network connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const PRESETS = [
    { label: "💰 View Menu Prices", query: "Provide a quick categorized pricing list of your best pizzas, burgers, shawarmas, and sides." },
    { label: "👑 Signature Crown Crust", query: "Tell me about the Fast Food Crown Crust pizza, its components, and exact pricing." },
    { label: "🍔 Burgers & Rolls", query: "Give me information on your loaded Zinger burgers, shami burgers, and paratha rolls with pricing." },
    { label: "📍 Store Outlets", query: "Where are your local store branches located and what are their phone numbers?" },
    { label: "🎓 Ask General/Math Q", query: "Can you explain a complex science theory, solve a coding question, or prove a mathematical logic puzzle? Act like ChatGPT!" },
  ];

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-dark-text hover:bg-pizza-red text-white p-4.5 rounded-full shadow-2xl hover:scale-106 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-2 border-white btn-hover group"
          id="floating-chatbot-btn"
          aria-label="Toggle Fast Food Chatbot"
        >
          <div className="relative">
            <Bot size={24} className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-yellow-accent rounded-full animate-ping" />
          </div>
          <span className="font-bebas text-lg tracking-wide hidden sm:inline">ASK THE CHEF</span>
        </button>
      )}

      {/* Modern Sleek Chatbot Window */}
      {isOpen && (
        <div
          id="chatbot-window"
          className="fixed bottom-6 left-6 z-50 w-[92vw] sm:w-[420px] h-[580px] bg-white rounded-3xl border border-gray-150 card-shadow flex flex-col overflow-hidden animate-fadeIn"
        >
          {/* Header */}
          <div className="bg-dark-text text-white p-4.5 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-pizza-red rounded-xl flex items-center justify-center relative">
                <UtensilsCrossed size={18} className="text-white" />
                <span className="absolute bottom-[-2px] right-[-2px] w-3 h-3 bg-emerald-500 rounded-full border-2 border-dark-text" />
              </div>
              <div>
                <h3 className="font-bebas text-lg tracking-wider flex items-center gap-1.5">
                  FAST FOOD CHEF BOT <Sparkles size={14} className="text-yellow-accent animate-pulse" />
                </h3>
                <p className="text-[10px] text-gray-400 font-mono">Live virtual assistance • Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick FAQ Suggestion Bar */}
          <div className="bg-soft-gray px-3 py-2 border-b border-gray-200 flex gap-1.5 overflow-x-auto scrollbar-none scroll-smooth">
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(preset.query)}
                disabled={isLoading}
                className="whitespace-nowrap bg-white hover:bg-pizza-red/5 text-gray-700 hover:text-pizza-red text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border border-gray-200 transition-colors cursor-pointer disabled:opacity-50"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50">
            {messages.map((msg) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={msg.id}
                  className={`flex ${isAssistant ? "justify-start" : "justify-end"} items-end gap-2 animate-fadeIn`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm">
                      <Pizza size={14} />
                    </div>
                  )}
                  <div className="max-w-[80%] flex flex-col">
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isAssistant
                          ? "bg-white text-dark-text border border-gray-200/80 rounded-bl-none shadow-sm"
                          : "bg-pizza-red text-white rounded-br-none shadow-md"
                      }`}
                    >
                      {/* Splitting Markdown double asterisks for inline bold style */}
                      {msg.text.split("\n").map((line, key) => {
                        // Very simple bold replacement helper
                        const parts = line.split("**");
                        return (
                          <p key={key} className={key > 0 ? "mt-1.5" : ""}>
                            {parts.map((p, pIdx) => (pIdx % 2 === 1 ? <strong key={pIdx} className="font-bold underline decoration-yellow-accent decoration-2">{p}</strong> : p))}
                          </p>
                        );
                      })}
                    </div>
                    <span
                      className={`text-[9px] text-gray-400 mt-1 ${
                        isAssistant ? "text-left" : "text-right"
                      } font-mono`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Chat Loading Skeleton State */}
            {isLoading && (
              <div className="flex justify-start items-end gap-2 animate-pulse">
                <div className="w-7 h-7 bg-pizza-red/10 rounded-lg flex items-center justify-center text-pizza-red shrink-0">
                  <Pizza size={14} className="animate-spin" />
                </div>
                <div className="max-w-[80%] flex flex-col">
                  <div className="bg-white border border-gray-250 p-3.5 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-pizza-red rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-pizza-red rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-pizza-red rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}

            {/* Network or Key Configuration Errors */}
            {errorStatus && (
              <div className="bg-red-50 border border-red-200 text-pizza-red px-3.5 py-2.5 rounded-xl text-xs animate-fadeIn text-center">
                <span className="font-bold block mb-0.5">Kitchen Error ❌</span>
                <p className="opacity-90">{errorStatus}</p>
                <button
                  onClick={() => setIsLoading(false) || setErrorStatus(null)}
                  className="font-bold uppercase text-[9px] mt-1.5 hover:underline block mx-auto text-dark-text"
                >
                  Dismiss
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Form Input footer */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 border-t border-gray-150 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Fast Food Chef..."
              disabled={isLoading}
              className="flex-1 bg-soft-gray focus:bg-white text-dark-text border border-transparent focus:border-pizza-red text-xs sm:text-sm py-2.5 px-4 rounded-xl outline-none transition-all disabled:opacity-50 font-sans"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="bg-pizza-red text-white p-2.5 sm:p-3 rounded-xl hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:scale-100 disabled:bg-gray-400 font-bold"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
