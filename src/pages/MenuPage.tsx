import PizzaMenu from "../components/PizzaMenu";
import { Pizza } from "../types";
import { Sparkles, ShoppingBag, Flame, Star } from "lucide-react";

interface MenuPageProps {
  onAddToCart: (
    pizza: Pizza,
    size: string,
    crust: string,
    extras: { name: string; price: number }[],
    quantity: number
  ) => void;
}

export default function MenuPage({ onAddToCart }: MenuPageProps) {
  return (
    <div className="pt-24 pb-16 animate-fadeIn min-h-screen bg-slate-50/50">
      {/* Immersive Gourmet Pizza Hero Banner */}
      <div className="relative h-[26rem] w-full overflow-hidden shadow-md">
        <img
          src="/src/assets/images/gourmet_pizza_hdr_1780025232311.png"
          alt="Gourmet Pizzas Sizzling Masterpieces"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-black/30 flex flex-col justify-end p-8 sm:p-12">
          <div className="max-w-7xl mx-auto w-full">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-widest bg-yellow-accent text-dark-text uppercase mb-4 animate-bounce">
              🍕 GOURMET SELECTIONS
            </span>
            <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-none drop-shadow-md">
              THE ULTIMATE <span className="text-pizza-red">FEAST CARD</span>
            </h1>
            <p className="text-gray-200 text-sm sm:text-base mt-2 max-w-2xl font-sans font-light leading-relaxed">
              Explore our premium sourdough pizzas, crispy golden premium burgers, and decadent desserts. Every piece is baked to bubbling perfection around the clock!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Highlight Cards Container for instant category selection guidance */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 card-shadow flex items-center gap-3 hover:translate-y-[-2px] transition-transform duration-300">
            <div className="h-10 w-10 shrink-0 bg-red-100 text-pizza-red rounded-xl flex items-center justify-center font-bold">
              🍕
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm text-dark-text block">Signature Pizza</span>
              <span className="text-[10px] text-gray-400">Fresh sourdough bases</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 card-shadow flex items-center gap-3 hover:translate-y-[-2px] transition-transform duration-300">
            <div className="h-10 w-10 shrink-0 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center font-bold">
              🍔
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm text-dark-text block">Loaded Burgers</span>
              <span className="text-[10px] text-gray-400">Thick premium beef/chicken</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 card-shadow flex items-center gap-3 hover:translate-y-[-2px] transition-transform duration-300">
            <div className="h-10 w-10 shrink-0 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center font-bold">
              🥖
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm text-dark-text block">Side Delights</span>
              <span className="text-[10px] text-gray-400">Nuggets & cheese garlic breads</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 card-shadow flex items-center gap-3 hover:translate-y-[-2px] transition-transform duration-300">
            <div className="h-10 w-10 shrink-0 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center font-bold">
              🧁
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm text-dark-text block">Molten Sweets</span>
              <span className="text-[10px] text-gray-400">Delectable hot lava cakes</span>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Pizza Menu Core Component */}
        <PizzaMenu onAddToCart={onAddToCart} />

        {/* Extra Promotion Banner */}
        <div className="bg-gradient-to-r from-pizza-red to-orange-600 text-white rounded-3xl p-8 sm:p-12 mt-16 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-15 translate-x-12 translate-y-12 shrink-0">
            <Flame size={280} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="bg-yellow-accent text-dark-text text-[10px] font-bold tracking-widest uppercase py-1 px-3 rounded-full inline-block mb-3">
              🔥 SPECIAL COMBO INTEGRAL
            </span>
            <h3 className="font-bebas text-3xl sm:text-5xl tracking-wide uppercase leading-tight">
              CRAVING EXTRA BUDGET SAVINGS?
            </h3>
            <p className="text-white/90 text-xs sm:text-sm mt-2 leading-relaxed font-light">
              Make sure to navigate to our special interactive Deals Page! Select any of our bundle packages like "Solo Sensation", "Double Delight", or the gigantic "Mega Feast" to get special meal custom pricing. Free delivery values are auto-applied on premium bundles!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
