import { useState } from "react";
import { CartItem, SpecialDeal } from "../types";
import { X, ShoppingCart, Trash2, Ticket, CheckCircle2, ChevronRight } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  orderType: "pickup" | "delivery";
  onUpdateQty: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: (finalSubtotal: number, finalDiscount: number, deliveryFee: number, finalTotal: number, couponCode: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  orderType,
  onUpdateQty,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");

  if (!isOpen) return null;

  // Calculate calculations
  const calculateCartSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  };

  const handleApplyCoupon = () => {
    setCouponError("");
    const code = couponInput.trim().toUpperCase();

    if (!code) return;

    if (code === "JANNATSOLO" || code === "ALJANNATFREE") {
      setAppliedCoupon(code);
      setDiscountPercent(10); // 10% off
    } else if (code === "JANNATDOUBLE") {
      setAppliedCoupon(code);
      setDiscountPercent(15); // 15% off
    } else if (code === "JANNATMEGA") {
      setAppliedCoupon(code);
      setDiscountPercent(20); // 20% off
    } else {
      setCouponError("Invalid coupon! Try JANNATDOUBLE or ALJANNATFREE.");
    }
  };

  const cartSubtotal = calculateCartSubtotal();
  const deliveryFee = orderType === "delivery" ? 150 : 0;
  
  // Custom discount calculation
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const finalTotalAmount = Math.max(0, cartSubtotal + deliveryFee - discountAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Dim backdrop overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-gray-100 animate-slideLeft">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="text-pizza-red" size={24} />
              <h3 className="font-bebas text-2xl text-dark-text tracking-wide">
                YOUR ORDER BASKET ({cartItems.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-gray-400 hover:text-dark-text bg-soft-gray rounded-full cursor-pointer transition-colors"
              aria-label="Close basket"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-gray-150 rounded-2xl bg-white hover:border-gray-250 transition-colors"
                  >
                    {/* Item Image */}
                    <img
                      src={item.pizza.image}
                      alt={item.pizza.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 bg-gray-55"
                      referrerPolicy="no-referrer"
                    />

                    {/* Details content column */}
                    <div className="flex-grow space-y-1 relative">
                      {/* Delete icon */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="absolute top-0 right-0 text-gray-400 hover:text-pizza-red p-1 cursor-pointer transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>

                      <h4 className="font-bebas text-lg leading-tight text-dark-text pr-6">
                        {item.pizza.title}
                      </h4>

                      {/* Config description */}
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        {item.selectedSize} • {item.selectedCrust}
                      </span>

                      {/* Extras list display */}
                      {item.addedExtras.length > 0 && (
                        <div className="text-[11px] text-gray-500 font-medium">
                          + {item.addedExtras.map(ex => ex.name.split(" ")[1] || ex.name).join(", ")}
                        </div>
                      )}

                      {/* Price and Counter adjustments block */}
                      <div className="flex justify-between items-center pt-2">
                        <span className="font-bold text-sm text-pizza-red font-mono">
                          Rs. {item.totalPrice}
                        </span>

                        {/* Interactive Quantity Counters */}
                        <div className="flex items-center bg-soft-gray border border-gray-200 rounded-lg p-0.5 scale-90">
                          <button
                            onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                            className="w-6 h-6 flex items-center justify-center rounded text-xs font-bold hover:bg-white text-gray-600 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-dark-text font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded text-xs font-bold hover:bg-white text-gray-600 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty Basket layout */
              <div className="text-center py-24 px-4 space-y-4">
                <span className="text-6xl block">🛒</span>
                <h4 className="font-bebas text-2xl text-dark-text">Your Basket is Empty</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Add some of our sizzling, loaded pizzas and stuffed-crust specials to start checking out!
                </p>
                <button
                  onClick={onClose}
                  className="bg-pizza-red hover:bg-red-700 text-white font-semibold text-xs px-6 py-3 rounded-xl uppercase tracking-wider transition-colors inline-block cursor-pointer"
                >
                  Start Adding
                </button>
              </div>
            )}

          </div>

          {/* Drawer footer / checkout summary details */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-150 p-6 bg-gray-50 rounded-t-3xl space-y-4 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
              
              {/* Coupon input field */}
              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Ticket size={14} />
                    </span>
                    <input
                      type="text"
                      placeholder="ENTER COUPON CODE"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-white border border-gray-200 focus:border-pizza-red focus:outline-none rounded-xl py-2.5 pl-9 pr-4 text-xs font-bold tracking-wider uppercase text-dark-text"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-dark-text hover:bg-pizza-red text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase cursor-pointer transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon ? (
                  <div className="flex items-center gap-1.5 text-xs text-green-700 font-bold bg-green-50/80 p-2 border border-green-200 rounded-lg animate-fadeIn">
                    <CheckCircle2 size={14} /> Coupon applied ({discountPercent}% off via {appliedCoupon})!
                  </div>
                ) : couponError ? (
                  <div className="text-xs text-pizza-red font-semibold pl-1 animate-fadeIn">
                    {couponError}
                  </div>
                ) : (
                  <div className="text-[10px] text-gray-400 pl-1 font-medium">
                    Try <span className="underline font-bold">ALJANNATFREE</span> or <span className="underline font-bold">JANNATDOUBLE</span>
                  </div>
                )}
              </div>

              {/* Slicing Price Subtotal lists */}
              <div className="space-y-2 text-xs text-gray-600 font-medium">
                <div className="flex justify-between">
                  <span>Cart Items Subtotal:</span>
                  <span className="font-mono text-dark-text">Rs. {cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    Service Fee ({orderType === "delivery" ? "Home Delivery" : "Store Takeaway"}):
                  </span>
                  <span className="font-mono text-dark-text">
                    {deliveryFee > 0 ? `Rs. ${deliveryFee}` : "FREE"}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700 font-bold">
                    <span>Discount code:</span>
                    <span className="font-mono">-Rs. {discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-bold text-dark-text border-t border-gray-200 pt-3">
                  <span>Grand Total:</span>
                  <span className="font-mono text-pizza-red text-lg">
                    Rs. {finalTotalAmount}
                  </span>
                </div>
              </div>

              {/* Primary Checkout Button */}
              <button
                onClick={() => onCheckout(cartSubtotal, discountAmount, deliveryFee, finalTotalAmount, appliedCoupon || "")}
                className="w-full bg-pizza-red hover:bg-neutral-950 text-white font-bebas text-2xl py-4 rounded-xl tracking-wider uppercase shadow-xl hover:shadow-red-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ChevronRight size={20} className="stroke-[3]" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
