import Deals from "../components/Deals";
import { SpecialDeal } from "../types";
import { Award, Percent, Users, Flame, Ticket, ShieldAlert } from "lucide-react";

interface DealsPageProps {
  onAddDealToCart: (deal: SpecialDeal) => void;
}

export default function DealsPage({ onAddDealToCart }: DealsPageProps) {
  return (
    <div className="pt-24 pb-16 animate-fadeIn min-h-screen bg-slate-50/50">
      {/* Decorative Warm Celebration Banner */}
      <div className="relative h-96 w-full overflow-hidden shadow-md">
        <img
          src="/src/assets/images/pizza_party_fun_1780025259167.png"
          alt="Lively Pizza Party Celebration"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-black/30 flex flex-col justify-end p-8 sm:p-12">
          <div className="max-w-7xl mx-auto w-full">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-widest bg-pizza-red text-white uppercase mb-4 animate-bounce">
              🔥 SPECIAL SEASONAL DISCOUNTS
            </span>
            <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-none drop-shadow-md">
              UNBEATABLE <span className="text-yellow-accent">COMBO DEALS</span>
            </h1>
            <p className="text-gray-200 text-sm sm:text-base mt-2 max-w-2xl font-sans font-light leading-relaxed">
              Lock in premium value with our handcrafted group party boxes! From intimate date nights to giant mega festivals, we pack ultimate flavors at fraction price points.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Value Proportions Ribbon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 card-shadow flex gap-4 items-start">
            <div className="h-12 w-12 bg-red-100 rounded-2xl flex items-center justify-center shrink-0 text-pizza-red">
              <Percent size={24} />
            </div>
            <div>
              <h4 className="font-bold text-dark-text text-sm">UP TO 35% FLAGGED SAVINGS</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                By purchasing combined pizzas, sides, and massive beverages as single tickets, you avoid repetitive markup items!
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 card-shadow flex gap-4 items-start">
            <div className="h-12 w-12 bg-yellow-100 rounded-2xl flex items-center justify-center shrink-0 text-yellow-600">
              <Users size={24} />
            </div>
            <div>
              <h4 className="font-bold text-dark-text text-sm">DESIGNED FOR GROUPS</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Perfect portions calculated meticulously by our head Chefs so nobody is left hungry during game nights or corporate huddles.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 card-shadow flex gap-4 items-start">
            <div className="h-12 w-12 bg-orange-100 rounded-2xl flex items-center justify-center shrink-0 text-orange-600">
              <Ticket size={24} />
            </div>
            <div>
              <h4 className="font-bold text-dark-text text-sm">AUTO-APPLY BASKETS</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Simply click "GRAB DEAL" below to bundle the components into your floating cart. Our checkout handles coupon variables automatically!
              </p>
            </div>
          </div>
        </div>

        {/* Embedded Dynamic Deals Grid */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 card-shadow">
          <Deals onAddDealToCart={onAddDealToCart} />
        </div>

        {/* Terms notice */}
        <div className="mt-8 flex items-center gap-2 text-xs text-gray-400 justify-center">
          <ShieldAlert size={14} />
          <span>* These limited-time digital packages cannot be stacked with custom physical flyers. Hot delivery is applicable at all hours!</span>
        </div>

      </div>
    </div>
  );
}
