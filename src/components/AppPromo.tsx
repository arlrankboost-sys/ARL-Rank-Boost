import React, { useState } from "react";
import { ShieldCheck, Tag, Sparkles, Smartphone, Download } from "lucide-react";

export default function AppPromo() {
  const [promoMessage, setPromoMessage] = useState("");
  return (
    <section id="app-promo" className="py-20 bg-soft-gray bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-100 rounded-3xl card-shadow overflow-hidden p-8 sm:p-12 lg:p-16 relative">
          
          {/* Background circles */}
          <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-red-50 rounded-full filter blur-2xl opacity-60 pointer-events-none" />
          <div className="absolute bottom-[-25%] left-[-10%] w-80 h-80 bg-yellow-50 rounded-full filter blur-2xl opacity-60 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Content column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="bg-yellow-accent text-dark-text text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
                <Sparkles size={11} /> EXCLUSIVE APP DISCOUNT
              </span>
              <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-dark-text leading-tight uppercase">
                GET THE AL JANNAT APP <br />
                <span className="text-pizza-red">AND SAVINGS OF UP TO 20%</span>
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xl">
                Order your favorite high-slice pizzas, sides, and hot shakes in seconds. Save and auto-load custom locations, track your rider on maps live, and get exclusive rewards on every order.
              </p>

              {/* Bullet highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-semibold">
                  <span className="bg-red-50 text-pizza-red p-2 rounded-xl">📱</span>
                  <span>Instant 1-Click Ordering</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-semibold">
                  <span className="bg-yellow-50 text-yellow-500 p-2 rounded-xl">📍</span>
                  <span>Live Map Rider Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-semibold">
                  <span className="bg-green-50 text-green-600 p-2 rounded-xl">🎁</span>
                  <span>Loyalty Coins & Free Sides</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-semibold">
                  <span className="bg-red-50 text-pizza-red p-2 rounded-xl">⚡</span>
                  <span>Direct Customer Support Chat</span>
                </div>
              </div>

              {/* Fake Download buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-6">
                
                {/* Google Play Store Badge alternative */}
                <button
                  onClick={() => setPromoMessage("Google Play app is coming soon! Our android development stream is preparing the ultimate heat-preserving ordering client.")}
                  className="bg-dark-text text-white py-3 px-6 rounded-2xl flex items-center space-x-3 transition-all duration-300 card-shadow cursor-pointer text-left btn-hover"
                >
                  <Smartphone size={24} className="text-yellow-accent" />
                  <div>
                    <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest block leading-none">GET IT ON</span>
                    <span className="text-sm font-bold block mt-0.5 leading-none">Google Play</span>
                  </div>
                </button>

                {/* Apple App Store Badge alternative */}
                <button
                  onClick={() => setPromoMessage("iOS client is undergoing final Apple App Store validation tests. Your exclusive 20% savings discount is locked in!")}
                  className="border-2 border-dark-text bg-white text-dark-text py-2.5 px-6 rounded-2xl flex items-center space-x-3 transition-all duration-300 card-shadow cursor-pointer text-left btn-hover"
                >
                  <Download size={22} className="text-pizza-red" />
                  <div>
                    <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest block leading-none">DOWNLOAD ON THE</span>
                    <span className="text-sm font-bold block mt-0.5 leading-none">App Store</span>
                  </div>
                </button>

              </div>

              {promoMessage && (
                <div className="mt-4 bg-red-50/70 border border-red-200 text-pizza-red p-3.5 rounded-xl text-xs sm:text-sm animate-fadeIn flex items-center gap-2">
                  <span className="text-base">🚀</span>
                  <div>
                    <span className="font-semibold block">App Streaming Soon!</span>
                    <p className="opacity-95">{promoMessage}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right mockup column */}
            <div className="lg:col-span-5 relative flex items-center justify-center max-w-sm lg:max-w-none mx-auto w-full">
              
              {/* Spinning outer border */}
              <div className="absolute w-[85%] aspect-[5/6] bg-yellow-accent/10 border-4 border-dashed border-yellow-accent/30 rounded-3xl -z-10 scale-95" />

              {/* Visual simulated mockup card of the app interface */}
              <div className="bg-dark-text text-white rounded-[40px] p-4 shadow-2xl border-8 border-gray-900 w-[280px] sm:w-[310px] aspect-[9/18] relative overflow-hidden flex flex-col justify-between">
                
                {/* Speaker pill */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-900 rounded-full z-20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
                </div>

                {/* App Content Interface */}
                <div className="flex-grow flex flex-col justify-between pt-6 pb-2 space-y-4">
                  {/* Top appbar */}
                  <div className="flex justify-between items-center px-2">
                    <span className="text-[10px] font-bold text-yellow-accent">AJ PIZZA APP</span>
                    <span className="text-[10px] text-gray-400 font-mono">14:29 PM</span>
                  </div>

                  {/* Mid promotional visual card */}
                  <div className="bg-gray-800 p-3.5 rounded-2xl border border-gray-750 text-center space-y-2.5">
                    <span className="text-[34px] block animate-bounce">🍕</span>
                    <h4 className="font-bebas text-lg leading-tight">Yummy Slices Just One Click Away</h4>
                    <p className="text-[10px] text-gray-400">Hand-stretched crusts delivered hot in 25 mins.</p>
                  </div>

                  {/* App quick deals list box */}
                  <div className="space-y-2">
                    <div className="bg-white text-dark-text p-2.5 rounded-xl flex items-center justify-between text-[11px] font-bold">
                      <span>👑 Al-Jannat Crown</span>
                      <span className="text-pizza-red">Rs.999</span>
                    </div>
                    <div className="bg-white text-dark-text p-2.5 rounded-xl flex items-center justify-between text-[11px] font-bold opacity-80">
                      <span>🥩 Sriracha Tornado Spicy</span>
                      <span className="text-pizza-red">Rs.950</span>
                    </div>
                  </div>

                  {/* Buy Button */}
                  <button className="w-full bg-pizza-red hover:bg-red-700 text-white font-bebas py-2 rounded-xl text-center text-sm tracking-wide shadow-md">
                    SLIDE TO ORDER
                  </button>

                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
