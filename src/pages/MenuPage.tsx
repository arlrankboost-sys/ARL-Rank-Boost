import { useState } from "react";
import PizzaMenu from "../components/PizzaMenu";
import { Pizza } from "../types";
import { PIZZAS } from "../data/pizzaData";
import { Sparkles, ShoppingBag, Flame, Star, FileText, LayoutGrid, Phone, MapPin } from "lucide-react";

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
  const [viewMode, setViewMode] = useState<"interactive" | "brochure">("interactive");

  const handleQuickAdd = (itemId: string, defaultSize: string = "Standard Size", defaultCrust: string = "Standard Crust") => {
    const item = PIZZAS.find(p => p.id === itemId);
    if (item) {
      onAddToCart(item, defaultSize, defaultCrust, [], 1);
    }
  };

  return (
    <div className="pt-24 pb-16 animate-fadeIn min-h-screen bg-slate-50/50">
      {/* Immersive Gourmet Pizza Hero Banner */}
      <div className="relative h-[22rem] w-full overflow-hidden shadow-md">
        <img
          src="/src/assets/images/al_jannat_hero_1780062230084.png"
          alt="Al Jannat Sizzling Masterpieces"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-black/30 flex flex-col justify-end p-8 sm:p-12">
          <div className="max-w-7xl mx-auto w-full">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-widest bg-yellow-accent text-dark-text uppercase mb-4 animate-pulse">
              🍕 AL JANNAT PREMIUM MENU
            </span>
            <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-none drop-shadow-md">
              THE ULTIMATE <span className="text-pizza-red">FEAST CARD</span>
            </h1>
            <p className="text-gray-200 text-sm sm:text-base mt-2 max-w-2xl font-sans font-light leading-relaxed">
              Explore our premium sourdough pizzas, crispy golden burgers, traditional rolls, and mouth-watering deals. Hand-stretched and baked to perfect bubbling sizzle 24/7!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Toggle Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-gray-200 pb-6">
          <div>
            <h2 className="text-2xl font-bebas text-dark-text tracking-wide uppercase">
              How would you like to view our menu?
            </h2>
            <p className="text-xs text-gray-500 font-medium">Select a view to explore items and add them instantly to your basket.</p>
          </div>
          <div className="bg-white p-1 rounded-2xl border border-gray-200 card-shadow flex gap-1 self-start sm:self-auto shrink-0">
            <button
              onClick={() => setViewMode("interactive")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === "interactive"
                  ? "bg-pizza-red text-white shadow-md shadow-red-500/15"
                  : "text-gray-600 hover:text-dark-text hover:bg-slate-50"
              }`}
            >
              <LayoutGrid size={16} />
              Interactive Grid
            </button>
            <button
              onClick={() => setViewMode("brochure")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === "brochure"
                  ? "bg-[#ffc107] text-[#1e293b] shadow-md shadow-yellow-500/15"
                  : "text-gray-600 hover:text-dark-text hover:bg-slate-50"
              }`}
            >
              <FileText size={16} />
              Original Menu Board Replicas
            </button>
          </div>
        </div>

        {viewMode === "interactive" ? (
          <div>
            {/* Highlight Cards Container for instant category selection guidance */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
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
                  <span className="text-[10px] text-gray-400">Thick premium breast patties</span>
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
                  🌯
                </div>
                <div>
                  <span className="font-bold text-xs sm:text-sm text-dark-text block">Paratha Rolls</span>
                  <span className="text-[10px] text-gray-400">Freshly wrapped local seekh</span>
                </div>
              </div>
            </div>

            {/* Embedded Interactive Pizza Menu Core Component */}
            <PizzaMenu onAddToCart={onAddToCart} />
          </div>
        ) : (
          /* HIGH FIDELITY DIGITAL RECREATION OF THE ORIGINAL RED/YELLOW AL JANNAT MENU CARD */
          <div className="animate-slideUp max-w-5xl mx-auto border-4 border-yellow-500 bg-[#fffde7] rounded-3xl overflow-hidden shadow-2xl relative">
            
            {/* Header portion */}
            <div className="bg-red-700 text-white p-6 text-center border-b-4 border-yellow-500 relative">
              <div className="absolute top-4 left-4 bg-yellow-500 text-dark-text px-3 py-1 rounded-full text-xs font-bold font-mono">
                ORIGINAL DESIGN
              </div>
              
              <span className="text-yellow-400 font-semibold text-xs uppercase tracking-widest block mb-1">CRAVING DELICIOUSNESS?</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-bebas text-yellow-400 drop-shadow-md">
                AL JANNAT SPECIAL PIZZA & FAST FOOD
              </h2>
              
              {/* Urdu Brand calligraphy card simulation */}
              <div className="my-4 inline-block bg-yellow-400 border-2 border-white px-8 py-2 rounded-2xl shadow-md">
                <span className="text-red-700 font-extrabold text-2xl sm:text-4xl block tracking-wide">
                  الجنت فاسٹ فوڈ اینڈ پیزا ہٹ
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold tracking-wide text-yellow-100 mt-2">
                <span className="flex items-center gap-1">
                  <Phone size={14} className="text-yellow-400" />
                  0346-7703788 • 0305-8883788 • 0329-1480725
                </span>
                <span className="hidden sm:inline bg-white/20 h-4 w-[1px]" />
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-yellow-400" />
                  Opposite Civil Hospital, Main Bazar Bhagtanwala City
                </span>
              </div>
            </div>

            {/* Main Menu card inner grids */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* LEFT COLUMN - PIZZAS AND SPECIAL PIZZAS */}
              <div className="space-y-6">
                
                {/* 1. Al Jannat Special Pizza box */}
                <div className="border-2 border-red-600 bg-red-50 p-4 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase">
                    Our Crown Special
                  </div>
                  <h3 className="font-bebas text-2xl text-red-700 uppercase tracking-wide border-b border-red-200 pb-1 mb-3">
                    ▶ AI JANNAT SPECIAL PIZZA
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 font-semibold leading-relaxed">
                    Extra spicy sauce, spicy chicken, chicken sausages, mushroom, jalapeno, tomato toppings!
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => handleQuickAdd("sp1", "Small Pizza")} className="bg-white border hover:border-red-500 rounded-xl p-2 text-center transition-all cursor-pointer">
                      <span className="text-[10px] text-gray-400 block font-bold">SMALL</span>
                      <span className="text-xs font-mono font-bold text-red-600">Rs. 700</span>
                      <span className="text-[9px] bg-red-100 text-red-700 rounded px-1 block mt-1">Add To Cart</span>
                    </button>
                    <button onClick={() => handleQuickAdd("sp1", "Medium Pizza")} className="bg-white border hover:border-red-500 rounded-xl p-2 text-center transition-all cursor-pointer">
                      <span className="text-[10px] text-gray-400 block font-bold">MEDIUM</span>
                      <span className="text-xs font-mono font-bold text-red-600">Rs. 1300</span>
                      <span className="text-[9px] bg-red-100 text-red-700 rounded px-1 block mt-1">Add To Cart</span>
                    </button>
                    <button onClick={() => handleQuickAdd("sp1", "Large Pizza")} className="bg-white border hover:border-red-500 rounded-xl p-2 text-center transition-all cursor-pointer">
                      <span className="text-[10px] text-gray-400 block font-bold">LARGE</span>
                      <span className="text-xs font-mono font-bold text-red-600">Rs. 1700</span>
                      <span className="text-[9px] bg-red-100 text-red-700 rounded px-1 block mt-1">Add To Cart</span>
                    </button>
                  </div>
                </div>

                {/* 2. Pizza Flavours Section */}
                <div className="border-2 border-red-600 bg-white p-4 rounded-2xl">
                  <div className="bg-red-600 text-white px-3 py-1.5 rounded-xl text-center mb-3">
                    <h3 className="font-bebas text-xl sm:text-2xl tracking-wide uppercase">
                      PIZZA FLAVOURS
                    </h3>
                  </div>
                  
                  {/* General Flavour Prices */}
                  <div className="bg-yellow-100 p-2 rounded-xl mb-4 text-center grid grid-cols-4 gap-1 text-[11px] font-bold text-dark-text border border-yellow-200">
                    <div>
                      <span className="block text-[8px] text-gray-500">SMALL</span>
                      <span className="font-mono text-red-700 font-extrabold">Rs. 500</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-gray-500">MEDIUM</span>
                      <span className="font-mono text-red-700 font-extrabold">Rs. 1100</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-gray-500">LARGE</span>
                      <span className="font-mono text-red-700 font-extrabold">Rs. 1400</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-gray-500">X-LARGE</span>
                      <span className="font-mono text-red-700 font-extrabold">Rs. 2200</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: "p1", title: "CHICKEN TIKKA", desc: "Traditional tikka recipe chicken topped with onions" },
                      { id: "p2", title: "CHICKEN FAJITA", desc: "Spicy chicken fajita, onion, green bell peppers" },
                      { id: "p3", title: "CHICKEN ACHARI", desc: "Chicken cheese achari, achari spice drizzle" },
                      { id: "p4", title: "CHICKEN TANDOORI", desc: "Smoked tandoori chicken, tomatoes, onions" },
                      { id: "p5", title: "HOT & SPICY", desc: "Fiery spicy chicken, hot sauce, green peppers" },
                      { id: "p6", title: "MALAI BOTI", desc: "Traditional Malai Boti pieces with cream drizzle" },
                      { id: "p7", title: "SUPER SUPREME", desc: "Loaded supreme meats, vegetables, black olives" },
                      { id: "p8", title: "AFGHANI TIKKA", desc: "Mild marinated rich afghani style chicken tikka" }
                    ].map((f) => (
                      <div key={f.id} className="border-b border-gray-100 pb-2 flex justify-between items-center group">
                        <div>
                          <h4 className="font-bold text-sm text-dark-text group-hover:text-red-600 transition-colors">▶ {f.title}</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5">{f.desc}</p>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => handleQuickAdd(f.id, "Small Pizza")} className="bg-red-50 text-[10px] font-bold text-red-700 px-2 py-1 rounded hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                            +S (500)
                          </button>
                          <button onClick={() => handleQuickAdd(f.id, "Medium Pizza")} className="bg-red-50 text-[10px] font-bold text-red-700 px-2 py-1 rounded hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                            +M (1100)
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Seekh Kabab Pizza & Square Pizza */}
                <div className="border-2 border-red-600 bg-white p-4 rounded-2xl space-y-4">
                  <div>
                    <h3 className="font-bebas text-xl text-red-700 uppercase tracking-wide border-b border-red-100 pb-1 mb-2">
                      ▶ SPECIAL SEEKH KABAB PIZZA
                    </h3>
                    <div className="flex justify-between items-center text-xs font-semibold text-gray-600 bg-yellow-50 p-2 rounded-xl">
                      <span>Small: <strong className="text-red-600 font-mono">Rs. 700</strong></span>
                      <span>Medium: <strong className="text-red-600 font-mono">Rs. 1300</strong></span>
                      <span>Large: <strong className="text-red-600 font-mono">Rs. 1700</strong></span>
                    </div>
                    <button onClick={() => handleQuickAdd("sp2", "Medium Pizza")} className="w-full text-center bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold py-1.5 rounded-xl uppercase tracking-wider mt-2 transition-all cursor-pointer">
                      + Add Seekh Kabab Pizza (Medium)
                    </button>
                  </div>

                  <div className="border-t border-gray-150 pt-3">
                    <h3 className="font-bebas text-xl text-red-700 uppercase tracking-wide border-b border-red-100 pb-1 mb-2">
                      ▶ AL JANNAT SQUARE PIZZA
                    </h3>
                    <div className="flex justify-between items-center text-xs font-semibold text-gray-600 bg-red-50 p-2 rounded-xl">
                      <span>MEDIUM SQUARE: <strong className="text-red-600 font-mono">Rs. 1200</strong></span>
                      <span>LARGE SQUARE: <strong className="text-red-600 font-mono">Rs. 1700</strong></span>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN - BURGERS, BROAST, ROLLS, APPS */}
              <div className="space-y-6">
                
                {/* 1. Burgers Section */}
                <div className="border-2 border-red-600 bg-white p-4 rounded-2xl">
                  <div className="bg-red-600 text-white px-3 py-1.5 rounded-xl text-center mb-3">
                    <h3 className="font-bebas text-xl sm:text-2xl tracking-wide uppercase">
                      BURGERS SECTION
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: "b1", title: "Shami Burger", price: 150 },
                      { id: "b2", title: "Chicken Burger", price: 180 },
                      { id: "b3", title: "Chicken Patty Burger", price: 250 },
                      { id: "b4", title: "Chicken Patty Cheese Burger", price: 300 },
                      { id: "b5", title: "Zinger Burger", price: 300 },
                      { id: "b6", title: "Zinger Burger With Cheese", price: 400 }
                    ].map((b) => (
                      <div key={b.id} className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <div>
                          <span className="font-bold text-sm text-dark-text block">▶ {b.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold font-mono text-xs text-red-600">Rs. {b.price}</span>
                          <button onClick={() => handleQuickAdd(b.id)} className="bg-red-600 hover:bg-neutral-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer uppercase">
                            Add +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Broast Section */}
                <div className="border-2 border-red-600 bg-white p-4 rounded-2xl">
                  <div className="bg-red-600 text-white px-3 py-1.5 rounded-xl text-center mb-3">
                    <h3 className="font-bebas text-xl sm:text-2xl tracking-wide uppercase">
                      BROAST & CHIPS SPECIAL
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { id: "f1", title: "Quarter Broast", price: 400 },
                      { id: "f2", title: "Half Broast", price: 800 },
                      { id: "f3", title: "Full Broast", price: 1600 },
                      { id: "f4", title: "Hot Wings (5 Pcs)", price: 350 },
                      { id: "f5", title: "Hot Wings (10 Pcs)", price: 700 },
                      { id: "f6", title: "Chicken Nuggets (10 Pcs)", price: 700 },
                      { id: "f7", title: "Classic French Fries", price: 200 },
                      { id: "f8", title: "Loaded Cheese Fries", price: 350 },
                      { id: "f9", title: "Mayo Garlic Fries", price: 300 }
                    ].map((br) => (
                      <div key={br.id} className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                        <span className="font-bold text-xs text-dark-text">▶ {br.title}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-bold font-mono text-xs text-red-600">Rs. {br.price}</span>
                          <button onClick={() => handleQuickAdd(br.id)} className="bg-red-600 hover:bg-neutral-900 text-white text-[9px] font-bold px-2 py-0.5 rounded transition-colors cursor-pointer uppercase">
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Rolls & Shawarma */}
                <div className="border-2 border-red-600 bg-white p-4 rounded-2xl">
                  <div className="bg-red-600 text-white px-3 py-1.5 rounded-xl text-center mb-3">
                    <h3 className="font-bebas text-xl sm:text-2xl tracking-wide uppercase">
                      ROLL & SHAWARMA CARD
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      { id: "s1", title: "Chicken Shawarma", pr: 180 },
                      { id: "s2", title: "Zinger Shawarma", pr: 250 },
                      { id: "s3", title: "Arabic Shawarma", pr: 300 },
                      { id: "s4", title: "Chicken Paratha Roll", pr: 300 },
                      { id: "s5", title: "Zinger Paratha Roll", pr: 350 },
                      { id: "s6", title: "Twister Chicken Roll", pr: 350 },
                      { id: "s7", title: "Platter Shawarma", pr: 400 },
                      { id: "s8", title: "Bahari Shawarma Roll", pr: 250 }
                    ].map((r) => (
                      <div key={r.id} className="bg-slate-50 p-2.5 rounded-xl border border-gray-100 flex flex-col justify-between">
                        <span className="font-bold text-dark-text truncate">▶ {r.title}</span>
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100">
                          <span className="font-mono font-bold text-red-600 text-xs">Rs. {r.pr}</span>
                          <button onClick={() => handleQuickAdd(r.id)} className="bg-red-600 hover:bg-dark-text text-white text-[9px] font-bold px-1.5 py-0.5 rounded cursor-pointer">
                            +Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Cheese Breads, Biriyani & Sweets */}
                <div className="border-2 border-red-600 bg-[#fff59d] p-4 rounded-2xl">
                  <h3 className="font-bebas text-xl text-red-700 uppercase tracking-wide border-b border-red-300 pb-1 mb-2">
                    ▶ SPECIAL EXTRAS & DRINKS
                  </h3>
                  <div className="space-y-1.5 text-xs text-dark-text font-semibold">
                    <div className="flex justify-between">
                      <span>▶ Cheese Bread Small / Medium / Large</span>
                      <span className="font-mono text-red-700">700 / 1300 / 1700</span>
                    </div>
                    <div className="flex justify-between">
                      <span>▶ Chicken Biryani Platter</span>
                      <span className="font-mono text-red-700">300</span>
                    </div>
                    <div className="flex justify-between">
                      <span>▶ Chicken Corn Soup Serve</span>
                      <span className="font-mono text-red-700">200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>▶ Cold Soft Drink (Cans / Bottles)</span>
                      <span className="font-mono text-red-700">60 • 120 • 160 • 220 • 260</span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-center">
                    <button onClick={() => handleQuickAdd("cb2", "Medium 9\" Size")} className="bg-red-600 hover:bg-red-700 text-white text-[10px] px-4 py-1.5 py-1 rounded-lg uppercase tracking-wider font-bold cursor-pointer">
                      + Add Garlic Cheese Bread
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Delivery banner */}
            <div className="bg-yellow-500 text-[#1e293b] p-4 text-center font-bold text-sm border-t-2 border-yellow-600">
              ⚡ COMPLIMENTARY LOCAL EXPRESS HOME DELIVERY FOR PACKS OVER RS. 1000! DIAL Direct order helpline NOW at 0346-7703788 • 0305-8883788 • 0329-1480725
            </div>

          </div>
        )}

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
              Make sure to navigate to our special interactive Deals Page! Select any of our 21 bundle packages like "Solo Sensation", "Double Delight", or the gigantic "Mega Feast" to get special meal custom pricing. Free delivery values are auto-applied on premium bundles!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
