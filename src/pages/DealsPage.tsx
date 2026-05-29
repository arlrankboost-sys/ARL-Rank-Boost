import Deals from "../components/Deals";
import { SpecialDeal } from "../types";

interface DealsPageProps {
  onAddDealToCart: (deal: SpecialDeal) => void;
}

export default function DealsPage({ onAddDealToCart }: DealsPageProps) {
  return (
    <div className="pt-32 pb-16 animate-fadeIn min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="text-pizza-red font-mono text-xs sm:text-sm uppercase tracking-widest font-bold block mb-2">
            🔥 BUDGET-SAVING PACKAGES
          </span>
          <h1 className="font-bebas text-5xl sm:text-6xl text-dark-text tracking-tight uppercase leading-none">
            UNBEATABLE <span className="text-pizza-red">SPECIAL DEALS</span>
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto font-sans leading-relaxed">
            Get your hands on our signature party packages. Perfect for friends, family, birthdays, or solo movie nights. Grab your coupon codes!
          </p>
        </div>

        <Deals onAddDealToCart={onAddDealToCart} />
      </div>
    </div>
  );
}
