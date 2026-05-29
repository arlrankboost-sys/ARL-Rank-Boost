import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Pizza, CartItem, SpecialDeal, StoreBranch } from "./types";
import { STORES } from "./data/pizzaData";

// Layout & Global Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Chatbot from "./components/Chatbot";

// Pages
import Home from "./pages/Home";
import FindStorePage from "./pages/FindStorePage";
import MenuPage from "./pages/MenuPage";
import DealsPage from "./pages/DealsPage";
import WhyChooseUsPage from "./pages/WhyChooseUsPage";
import ReviewsPage from "./pages/ReviewsPage";

// Icons
import { ShoppingCart } from "lucide-react";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("delivery");
  const [selectedStore, setSelectedStore] = useState<StoreBranch | null>(STORES[0]);

  // Overlay triggers
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Bill summaries passed to final checkout tracker
  const [billSummary, setBillSummary] = useState({
    cartSubtotal: 0,
    discountAmount: 0,
    deliveryFee: 0,
    finalTotalAmount: 0
  });

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

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-white">
        
        {/* Sticky Header component with router interactions */}
        <Header
          cartCount={totalCartCount}
          onOpenCart={() => setCartOpen(true)}
        />

        {/* Independent Multi-Page Routes */}
        <div className="pt-4">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  orderType={orderType}
                  onOrderTypeChange={handleOrderTypeAndDetailsChange}
                  selectedStore={selectedStore}
                  onSelectStore={handleSelectStoreBranch}
                  onAddToCart={handleAddToCart}
                  onAddDealToCart={handleAddDealToCart}
                />
              }
            />
            <Route
              path="/find-store"
              element={
                <FindStorePage
                  orderType={orderType}
                  onOrderTypeChange={handleOrderTypeAndDetailsChange}
                  selectedStore={selectedStore}
                  onSelectStore={handleSelectStoreBranch}
                />
              }
            />
            <Route
              path="/menu"
              element={<MenuPage onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/deals"
              element={<DealsPage onAddDealToCart={handleAddDealToCart} />}
            />
            <Route
              path="/why-choose-us"
              element={<WhyChooseUsPage />}
            />
            <Route
              path="/reviews"
              element={<ReviewsPage />}
            />
          </Routes>
        </div>

        {/* Premium footer with router quick-links */}
        <Footer />

        {/* Sticky Floating Action Cart Button */}
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

        {/* Shopping Cart Drawer */}
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cartItems={cartItems}
          orderType={orderType}
          onUpdateQty={handleUpdateCartItemQty}
          onRemoveItem={handleRemoveCartItem}
          onCheckout={handleInitializeCheckout}
        />

        {/* Form Checkout & Order Status Tracker inside Modal */}
        <CheckoutModal
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          orderType={orderType}
          totalPrice={billSummary.finalTotalAmount}
          deliveryFee={billSummary.deliveryFee}
          onClearCart={handleClearCartAndBasket}
        />

        {/* Dynamic Chatbot floating companion */}
        <Chatbot />

      </div>
    </BrowserRouter>
  );
}
