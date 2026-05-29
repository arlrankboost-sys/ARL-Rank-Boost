import PizzaMenu from "../components/PizzaMenu";
import { Pizza } from "../types";

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
    <div className="pt-32 pb-16 animate-fadeIn min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <span className="text-pizza-red font-mono text-xs sm:text-sm uppercase tracking-widest font-bold block mb-2">
            🍕 HOT & SIZZLING SELECTIONS
          </span>
          <h1 className="font-bebas text-5xl sm:text-6xl text-dark-text tracking-tight uppercase leading-none">
            OUR CULINARY <span className="text-pizza-red">MASTERPIECES</span>
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto font-sans leading-relaxed">
            Explore our signature hand-stretched sourdough pizzas, crispy golden premium burgers, stuffed wrap sandwiches, and indulgent molten desserts. Hand-crafted fresh on every single ticket!
          </p>
        </div>

        <PizzaMenu onAddToCart={onAddToCart} />
      </div>
    </div>
  );
}
