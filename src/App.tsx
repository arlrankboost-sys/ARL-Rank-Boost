import { useState, useEffect } from "react";
import { Pizza, CartItem, SpecialDeal, StoreBranch } from "./types";
import { STORES } from "./data/pizzaData";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OrderBox from "./components/OrderBox";
import PizzaMenu from "./components/PizzaMenu";
import Deals from "./components/Deals";
import WhyChooseUs from "./components/WhyChooseUs";
import DeliverySection from "./components/DeliverySection";
import Reviews from "./components/Reviews";
import AppPromo from "./components/AppPromo";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Chatbot from "./components/Chatbot";
import { ShoppingCart, Phone, CornerDownRight } from "lucide-react";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("delivery");
  const [selectedStore, setSelectedStore] = useState<StoreBranch | null>(STORES[0]);
  const [activeSection, setActiveSection] = useState("hero");

  // Overlay navigation triggers
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Bill summaries passed to final checkout tracker
  const [billSummary, setBillSummary] = useState({
    cartSubtotal: 0,
    discountAmount: 0,
    deliveryFee: 0,
    finalTotalAmount: 0
  });

  // Scrolled offsets highlighting observer
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      const sections = ["hero", "order-box", "menu", "deals", "why-choose-us", "reviews"];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync initial configuration details
  const handleOrderTypeAndDetailsChange = (type: "pickup" | "delivery", details: string) => {
    setOrderType(type);
  };

  const handleSelectStoreBranch = (store: StoreBranch) => {
    setSelectedStore(store);
  };

  // Add Item callback
  const handleAddToCart = (
    pizza: Pizza,
    size: string,
    crust: string,
    extras: { name: string; price: number }[],
    quantity: number
  ) => {
    const extrasNames = extras.map(e => e.name).sort().join("|");
    const uniqueKey = `${pizza.id}-${size}-${crust}-${extrasNames}`;

    const sizeMultiplier = pizza.sizes.find(s => s.size === size);
    const sizeCost = sizeMultiplier ? sizeMultiplier.priceAdd : 0;
    const unitPr = pizza.price + sizeCost + extras.reduce((sum, e) => sum + e.price, 0);

    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === uniqueKey);
      if (existing) {
        return prevItems.map((item) =>
          item.id === uniqueKey
            ? {
                ...item,
                quantity: item.quantity + quantity,
                totalPrice: (item.quantity + quantity) * unitPr
              }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: uniqueKey,
          pizza,
          selectedSize: size,
          selectedCrust: crust,
          quantity,
          addedExtras: extras,
          unitPrice: unitPr,
          totalPrice: unitPr * quantity
        };
        return [...prevItems, newItem];
      }
    });

    setCartOpen(true);
  };

  // Click grab Special deal
  const handleAddDealToCart = (deal: SpecialDeal) => {
    const virtualPizza: Pizza = {
      id: `deal-${deal.id}`,
      title: `Deal: ${deal.title}`,
      description: deal.description,
      category: "Deals",
      price: deal.price,
      sizes: [{ size: "Standard Size", priceAdd: 0, slices: 1 }],
      crusts: ["Standard Crust"],
      image: deal.image,
      rating: 5,
      isPopular: true,
      isVegetarian: false,
      isSpicy: false
    };

    handleAddToCart(virtualPizza, "Standard Size", "Standard Crust", [], 1);
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleUpdateCartItemQty = (itemId: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQty,
              totalPrice: newQty * item.unitPrice
            }
          : item
      )
    );
  };

  // Triggered from Cart Drawer. Opens checkout modal.
  const handleInitializeCheckout = (
    finalSubtotal: number,
    finalDiscount: number,
    deliveryFee: number,
    finalTotal: number,
    couponCode: string
  ) => {
    setBillSummary({
      cartSubtotal: finalSubtotal,
      discountAmount: finalDiscount,
      deliveryFee: deliveryFee,
      finalTotalAmount: finalTotal
    });
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleClearCartAndBasket = () => {
    setCartItems([]);
  };

  // Navigate directly to category from footer
  const handleCategoryNav = (category: string) => {
    // Scroll automatically to menu
    const target = document.getElementById("menu");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-white">
      
      {/* Premium background layouts */}
      
      {/* Sticky Header component */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        activeSection={activeSection}
      />

      {/* Hero Presentation */}
      <Hero
        onOrderNow={() => {
          const menuEl = document.getElementById("menu");
          if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" });
        }}
        onExploreMenu={() => {
          const menuEl = document.getElementById("menu");
          if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Pickup vs Delivery Selector Box */}
      <OrderBox
        onOrderTypeChange={handleOrderTypeAndDetailsChange}
        selectedType={orderType}
        selectedStore={selectedStore}
        onSelectStore={handleSelectStoreBranch}
      />

      {/* Sizzling Pizzas Menu Section */}
      <PizzaMenu onAddToCart={handleAddToCart} />

      {/* Combinations Special Deals */}
      <Deals onAddDealToCart={handleAddDealToCart} />

      {/* Brand values / Bento Why Us */}
      <WhyChooseUs />

      {/* Speed courier highlight */}
      <DeliverySection />

      {/* Local buyers reviews */}
      <Reviews />

      {/* Smartphone app downloads */}
      <AppPromo />

      {/* Premium contact Footer */}
      <Footer onNavigateToCategory={handleCategoryNav} />

      {/* Sticky Floating Action Cart Button: Renders only when user has items in cart */}
      {totalCartCount > 0 && !cartOpen && !checkoutOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-pizza-red text-white p-4.5 rounded-full card-shadow animate-bounce flex items-center gap-2 cursor-pointer border-2 border-white btn-hover"
          id="floating-basket-btn"
          aria-label="Viewport cart trigger"
        >
          <ShoppingCart size={24} />
          <span className="font-bebas text-lg tracking-wide hidden sm:inline">VIEW BASKET</span>
          <span className="bg-yellow-accent text-dark-text text-xs font-bold font-mono h-6 px-1.5 flex items-center justify-center rounded-full">
            {totalCartCount}
          </span>
        </button>
      )}

      {/* Shopping Cart Slider Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        orderType={orderType}
        onUpdateQty={handleUpdateCartItemQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleInitializeCheckout}
      />

      {/* Form Checkout & Live order preparer tracker popup modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        orderType={orderType}
        totalPrice={billSummary.finalTotalAmount}
        deliveryFee={billSummary.deliveryFee}
        onClearCart={handleClearCartAndBasket}
      />

      {/* Modern chatbot assistance */}
      <Chatbot />

    </div>
  );
}
