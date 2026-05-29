import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import OrderBox from "../components/OrderBox";
import PizzaMenu from "../components/PizzaMenu";
import Deals from "../components/Deals";
import WhyChooseUs from "../components/WhyChooseUs";
import Reviews from "../components/Reviews";
import DeliverySection from "../components/DeliverySection";
import AppPromo from "../components/AppPromo";
import { Pizza, SpecialDeal, StoreBranch } from "../types";

interface HomeProps {
  orderType: "pickup" | "delivery";
  onOrderTypeChange: (type: "pickup" | "delivery", details: string) => void;
  selectedStore: StoreBranch | null;
  onSelectStore: (store: StoreBranch) => void;
  onAddToCart: (
    pizza: Pizza,
    size: string,
    crust: string,
    extras: { name: string; price: number }[],
    quantity: number
  ) => void;
  onAddDealToCart: (deal: SpecialDeal) => void;
}

export default function Home({
  orderType,
  onOrderTypeChange,
  selectedStore,
  onSelectStore,
  onAddToCart,
  onAddDealToCart,
}: HomeProps) {
  const navigate = useNavigate();

  // Scroll to a specific local section if needed
  const scrollToSectionId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="animate-fadeIn space-y-20 pb-16">
      {/* 1. Hero Section */}
      <div id="hero">
        <Hero
          onOrderNow={() => scrollToSectionId("menu-section")}
          onExploreMenu={() => scrollToSectionId("menu-section")}
        />
      </div>

      {/* 2. Store Locator & Order Box Selection */}
      <div id="order-box" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center mb-8">
          <span className="text-pizza-red font-mono text-xs sm:text-sm uppercase tracking-widest font-bold block mb-2">
            📍 STORE LOCATOR & ORDER MODE
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl text-dark-text tracking-tight uppercase leading-none">
            FIND YOUR NEAREST <span className="text-pizza-red">OUTLET</span>
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto font-sans leading-relaxed">
            Select standard high-speed home delivery or select your favorite branch for swift pickup. Fresh hot dough is rolling 24/7!
          </p>
        </div>
        <OrderBox
          onOrderTypeChange={onOrderTypeChange}
          selectedType={orderType}
          selectedStore={selectedStore}
          onSelectStore={onSelectStore}
        />
      </div>

      {/* 3. Pizza Menu Section */}
      <div id="menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-pizza-red font-mono text-xs sm:text-sm uppercase tracking-widest font-bold block mb-2">
            🍕 HOT & SIZZLING SELECTIONS
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl text-dark-text tracking-tight uppercase leading-none">
            OUR CULINARY <span className="text-pizza-red">MASTERPIECES</span>
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto font-sans leading-relaxed">
            Explore our signature hand-stretched sourdough pizzas, crispy golden premium burgers, stuffed wrap sandwiches, and indulgent molten desserts. Hand-crafted fresh on every single ticket!
          </p>
        </div>
        <PizzaMenu onAddToCart={onAddToCart} />
      </div>

      {/* 4. Special Deals Section */}
      <div id="deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-pizza-red font-mono text-xs sm:text-sm uppercase tracking-widest font-bold block mb-2">
            🔥 BUDGET-SAVING PACKAGES
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl text-dark-text tracking-tight uppercase leading-none">
            UNBEATABLE <span className="text-pizza-red">SPECIAL DEALS</span>
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto font-sans leading-relaxed">
            Get your hands on our signature party packages. Perfect for friends, family, birthdays, or solo movie nights. Grab your coupon codes!
          </p>
        </div>
        <Deals onAddDealToCart={onAddDealToCart} />
      </div>

      {/* 5. Delivery Value Prop section */}
      <div className="bg-soft-gray/40 py-10">
        <DeliverySection />
      </div>

      {/* 6. Why Choose Us (Hygiene Standards) */}
      <div id="why-choose-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-pizza-red font-mono text-xs sm:text-sm uppercase tracking-widest font-bold block mb-2">
            ✨ METICULOUS HYGIENE & FLAVOR
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl text-dark-text tracking-tight uppercase leading-none">
            WHY WE ARE THE <span className="text-pizza-red">PREMIUM BENCHMARK</span>
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto font-sans leading-relaxed">
            We operate with rigorous ISO 9001 culinary certifications. Real ingredients, fully transparent open kitchens, and a standard-setting delivery guarantee.
          </p>
        </div>
        <WhyChooseUs />
      </div>

      {/* 7. App Promo Showcase */}
      <div>
        <AppPromo />
      </div>

      {/* 8. Customer Reviews Log Section */}
      <div id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-pizza-red font-mono text-xs sm:text-sm uppercase tracking-widest font-bold block mb-2">
            ⭐ WHAT FEEDBACK SAYS
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl text-dark-text tracking-tight uppercase leading-none">
            CUSTOMER <span className="text-pizza-red">TESTIMONIALS</span>
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto font-sans leading-relaxed">
            See actual ratings and photos posted by our local pizza and fast food connoisseurs in Sargodha district, raw and direct!
          </p>
        </div>
        <Reviews />
      </div>
    </div>
  );
}

