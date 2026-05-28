import React, { useState } from "react";
import { SpecialDeal, Pizza } from "../types";
import { DEALS } from "../data/pizzaData";
import { Tag, Sparkles, Check, Gift, ArrowRight } from "lucide-react";

interface DealsProps {
  onAddDealToCart: (deal: SpecialDeal) => void;
}

export default function Deals({ onAddDealToCart }: DealsProps) {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopyCode = (id: string, code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => {
      setCopiedCodeId(null);
    }, 2000);
  };

  return (
    <section id="deals" className="py-20 bg-soft-gray bg-gradient-to-b from-gray-50 to-white border-y border-gray-105">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="bg-red-50 border border-red-100 text-pizza-red text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
            <Gift size={12} /> AMAZING OFFERS JUST FOR YOU
          </span>
          <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-dark-text tracking-tight uppercase leading-none">
            SPECIAL SAVINGS <span className="text-pizza-red">& DEALS</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Get your hands on Al-Jannat’s signature party packages. Perfect for friends, families, birthdays, or solo cinematic pizza sessions!
          </p>
        </div>

        {/* Deals Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEALS.map((deal) => {
            const isCopied = copiedCodeId === deal.id;

            return (
              <div
                key={deal.id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 card-shadow hover:-translate-y-1 transition-all duration-350 flex flex-col h-full"
                id={`deal-${deal.id}`}
              >
                {/* Visual Image Banner with overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <div className="absolute top-4 left-4 z-10 bg-pizza-red text-white font-bold text-xs px-3.5 py-1.5 rounded-xl uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={11} className="animate-spin" /> Promo Pack
                  </div>
                  
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glassmorphism Price badge */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-pizza-red border border-red-100 p-3 rounded-2xl text-center leading-none shadow-lg">
                    <span className="block text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">COMBO PRICE</span>
                    <span className="text-2xl font-black font-mono">Rs.{deal.price}</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between space-y-5">
                  <div className="space-y-2">
                    <span className="text-xs text-pizza-red font-bold uppercase tracking-wider block">
                      {deal.subtitle}
                    </span>
                    <h3 className="font-bebas text-2xl text-dark-text group-hover:text-pizza-red transition-colors">
                      {deal.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                      {deal.description}
                    </p>
                  </div>

                  {/* Interactive Buttons & Copy Coupon option */}
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    
                    {/* Interactive clipboard widget */}
                    <div
                      onClick={(e) => handleCopyCode(deal.id, deal.code, e)}
                      className="bg-soft-gray hover:bg-red-50/50 border border-gray-200 hover:border-red-100 px-4 py-2.5 rounded-xl flex items-center justify-between text-xs font-semibold text-gray-600 hover:text-pizza-red cursor-pointer transition-colors"
                      title="Click to copy coupon"
                    >
                      <span className="flex items-center gap-1.5">
                        <Tag size={12} className="text-pizza-red" />
                        <span>COUPON CODE:</span>
                        <span className="font-mono bg-white border border-gray-250 text-dark-text px-2 py-0.5 rounded-lg ml-1 font-bold">
                          {deal.code}
                        </span>
                      </span>
                      {isCopied ? (
                        <span className="text-green-600 font-bold flex items-center gap-1 animate-fadeIn">
                          <Check size={11} /> Copied!
                        </span>
                      ) : (
                        <span className="text-gray-400 text-[10px] hover:underline uppercase tracking-wide">Copy</span>
                      )}
                    </div>

                    {/* Quick Order button */}
                    <button
                      onClick={() => onAddDealToCart(deal)}
                      className="w-full bg-dark-text text-white py-3 px-5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all uppercase flex items-center justify-center gap-2 cursor-pointer card-shadow active:scale-98 btn-hover"
                    >
                      <span>Grab This Deal</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Dynamic warning bar */}
        <div className="mt-12 bg-white rounded-2xl border border-dashed border-red-200 p-4 text-center text-xs text-gray-600 max-w-2xl mx-auto">
          ⚠️ <span className="font-semibold text-dark-text">Terms apply:</span> Deals are available for both delivery & takeaway orders. Deals cannot be clubbed with other manual discounts but exclude beverage tax. Drink can choices will be prompted during checkout.
        </div>

      </div>
    </section>
  );
}
