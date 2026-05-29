import { Play, Flame, Leaf, Clock, Award } from "lucide-react";

interface HeroProps {
  onOrderNow: () => void;
  onExploreMenu: () => void;
}

export default function Hero({ onOrderNow, onExploreMenu }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-white pt-24 pb-12 sm:pb-16 flex items-center overflow-hidden"
    >
      {/* Background visual accents */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-red-50 rounded-full filter blur-3xl opacity-60 -z-10 pointer-events-none" />
      <div className="absolute left-[-10%] bottom-10 w-[400px] h-[400px] bg-yellow-50 rounded-full filter blur-3xl opacity-50 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6">
            
            {/* Promo Badge */}
            <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-100 px-4 py-2 rounded-full self-start shadow-sm transform hover:scale-105 transition-all duration-300">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pizza-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pizza-red"></span>
              </span>
              <span className="text-xs font-semibold text-pizza-red tracking-wide uppercase flex items-center gap-1.5">
                <Flame size={12} className="fill-pizza-red" /> HOT & FRESH pizza delivered in 25 mins
              </span>
            </div>

            {/* Main Title Heading */}
            <div className="space-y-2">
              <span className="text-sm font-bold text-pizza-red uppercase tracking-widest block font-mono">
                ✨ Taste The Real Flavor
              </span>
              <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl text-dark-text leading-[0.95] tracking-tight">
                Fresh & Hot Pizza <br />
                <span className="text-pizza-red">Delivered Fast</span> <br />
                To Your Doorstep
              </h1>
              
              {/* Highlights underneath header */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <Award size={14} className="text-yellow-accent" /> Premium Fresh Dough Daily
                </span>
                <span className="flex items-center gap-1.5">
                  <Leaf size={14} className="text-green-600" /> 100% Real Imported Mozzarella
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-pizza-red" /> Guaranteed Under 30 mins
                </span>
              </div>
            </div>

            {/* Subtitle Description */}
            <p className="text-gray-600 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              Enjoy premium Pizza, Crispy Burgers, Spicy Shawarma Wrap, and smokey slow-grilled BBQ from <span className="font-semibold text-dark-text">Fast Food & Pizza</span>. We cook using fresh daily hand-stretched dough and real sanitary ingredients, delivering direct to your doorstep in Bhagtanwala!
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* Primary Order Now Button */}
              <button
                onClick={onOrderNow}
                className="group relative bg-pizza-red text-white font-bebas text-2xl tracking-wide px-8 py-4 rounded-2xl card-shadow transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer overflow-hidden btn-hover"
              >
                <div className="absolute inset-0 w-3 bg-white/25 skew-x-[-15deg] transition-all group-hover:left-[110%] -left-[30%] duration-1000 ease-out" />
                <span>ORDER NOW</span>
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>

              {/* Secondary Explore Menu */}
              <button
                onClick={onExploreMenu}
                className="group border-2 border-gray-900 bg-white text-dark-text font-semibold px-8 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer btn-hover"
              >
                <span>EXPLORE THE MENU</span>
                <span className="text-yellow-400">🍕</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-8 mt-4 max-w-lg">
              <div>
                <span className="font-bebas text-3xl text-dark-text block">100%</span>
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Italian Recipe</span>
              </div>
              <div className="border-x border-gray-100 px-4">
                <span className="font-bebas text-3xl text-dark-text block">24 / 7</span>
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Hot Deliveries</span>
              </div>
              <div>
                <span className="font-bebas text-3xl text-pizza-red block">15,000+</span>
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Happy Foodies</span>
              </div>
            </div>

          </div>

          {/* Right Graphical Column */}
          <div className="lg:col-span-6 relative flex items-center justify-center max-w-lg lg:max-w-none mx-auto w-full">
            
            {/* Spinning Golden Glow / Dial behind the pizza */}
            <div className="absolute w-[80%] aspect-square bg-yellow-400/10 rounded-full animate-[spin_40s_linear_infinite] border border-dashed border-yellow-400/20 -z-10" />
            
            {/* Decorative ring */}
            <div className="absolute w-[95%] aspect-square bg-red-500/5 rounded-full -z-10 scale-95 border-2 border-red-500/5" />

            {/* Glowing Accent Badge (Floating) */}
            <div className="absolute top-4 left-6 bg-white/95 backdrop-blur-md card-shadow rounded-2xl p-3 sm:p-4 border border-gray-100 flex items-center space-x-3 animate-float max-w-[200px] z-20">
              <span className="text-4xl">🔥</span>
              <div>
                <h4 className="font-bold text-dark-text text-sm leading-tight">Crown Crust</h4>
                <p className="text-gray-500 text-xs mt-0.5">Cream Stuffed edges</p>
              </div>
            </div>

            {/* Fresh Basil/Leaf (Floating) */}
            <div className="absolute bottom-8 left-1/10 bg-white/95 backdrop-blur-md card-shadow rounded-full p-2.5 border border-gray-100 flex items-center justify-center z-20 animate-[float_5s_ease-in-out_infinite_1s]">
              <span className="text-2xl">🌱</span>
            </div>

            {/* Fresh Tomato Slice (Floating) */}
            <div className="absolute right-2 top-10 bg-white/95 backdrop-blur-md card-shadow rounded-full p-2.5 border border-gray-100 flex items-center justify-center z-20 animate-[float_6s_ease-in-out_infinite_2s]">
              <span className="text-2xl">🍅</span>
            </div>

            {/* Main Product Pizza Graphics */}
            <div className="relative w-[110%] sm:w-[94%] aspect-square flex items-center justify-center filter drop-shadow-[0_25px_30px_rgba(214,40,40,0.2)] hover:scale-102 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop"
                alt="Delicious piping hot custom pizza with kebab crown ingredients"
                className="object-cover w-full h-full rounded-full border-8 border-white bg-white"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Premium Overlay Badge on Pizza */}
            <div className="absolute bottom-4 right-10 bg-yellow-accent rounded-2xl px-5 py-3 text-dark-text shadow-xl border border-yellow-400 font-bebas text-center leading-none z-20 hover:scale-105 transition-transform duration-300">
              <span className="block text-xs font-bold tracking-wider text-black opacity-80 mb-0.5">STARTING AT</span>
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight block">Rs. 750/=</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
