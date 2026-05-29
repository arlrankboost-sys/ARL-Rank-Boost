import React, { useState, useEffect } from "react";
import { X, Check, Truck, Flame, ShoppingBag, MapPin, User, Phone, CheckCircle2, Navigation, Compass } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderType: "pickup" | "delivery";
  totalPrice: number;
  deliveryFee: number;
  onClearCart: () => void;
}

type OrderStep = "received" | "kitchen" | "dispatch" | "delivered";

export default function CheckoutModal({
  isOpen,
  onClose,
  orderType,
  totalPrice,
  deliveryFee,
  onClearCart
}: CheckoutModalProps) {
  // Shipping input state
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [pickupTime, setPickupTime] = useState("In 20 Mins");
  const [payMethod, setPayMethod] = useState<"cod" | "card">("cod");
  const [cardNumber, setCardNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Tracking state
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderTrackingActive, setOrderTrackingActive] = useState(false);
  const [trackingStep, setTrackingStep] = useState<OrderStep>("received");
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (orderTrackingActive && trackingStep !== "delivered") {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // transition to next step
            if (trackingStep === "received") {
              setTrackingStep("kitchen");
              return 10; // 10 secs in kitchen
            } else if (trackingStep === "kitchen") {
              setTrackingStep("dispatch");
              return 12; // 12 secs out for delivery
            } else if (trackingStep === "dispatch") {
              setTrackingStep("delivered");
              return 0;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [orderTrackingActive, trackingStep]);

  if (!isOpen) return null;

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!userName.trim() || !userPhone.trim()) {
      setErrorMessage("Please fill out name and phone number first!");
      return;
    }
    if (orderType === "delivery" && !userAddress.trim()) {
      setErrorMessage("Please specify delivery address first!");
      return;
    }

    setIsOrdering(true);

    // Simulate database booking delays
    setTimeout(() => {
      setIsOrdering(false);
      setOrderTrackingActive(true);
      setTrackingStep("received");
      setCountdown(8); // Start receiving step timer
      onClearCart();
    }, 1500);
  };

  const handleDoneTracking = () => {
    setOrderTrackingActive(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      
      {/* Container card */}
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 animate-scaleUp relative"
        id="checkout-inner-card"
      >
        
        {/* Toggle Close Icon (Hidden during active tracking to avoid interrupting the order) */}
        {!orderTrackingActive && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-100 text-gray-500 hover:text-dark-text p-2 rounded-full cursor-pointer transition-colors"
            aria-label="Close Checkout"
          >
            <X size={18} />
          </button>
        )}

        {/* Dynamic Headers */}
        {!orderTrackingActive ? (
          <div>
            {/* Form Checkout Header */}
            <div className="p-6 bg-gradient-to-r from-red-50 to-white border-b border-gray-100">
              <span className="block text-pizza-red text-[10px] font-bold uppercase tracking-widest mb-1">
                Finalizing Food Basket Order
              </span>
              <h3 className="font-bebas text-3xl text-dark-text tracking-wide uppercase">
                {orderType === "delivery" ? "Home Delivery Details" : "Self Takeaway Pickup"}
              </h3>
            </div>

            <form onSubmit={handlePlaceOrderSubmit} className="p-6 space-y-4">
              
              {/* Core Information input */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  1. Customer Information
                </h4>
                
                {/* Full name */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      <User size={14} />
                    </span>
                    <input
                      required
                      type="text"
                      placeholder="E.g., Muhammad Faisal"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-soft-gray border border-gray-200 focus:border-pizza-red focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-dark-text font-medium"
                    />
                  </div>
                </div>

                {/* Telephone */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                    Contact Phone Helpline (Mobile)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      <Phone size={14} />
                    </span>
                    <input
                      required
                      type="tel"
                      placeholder="E.g., 0300-1234567"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full bg-soft-gray border border-gray-200 focus:border-pizza-red focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-dark-text font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery info or Pickup time selector */}
              {orderType === "delivery" ? (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    2. Delivery Location Info
                  </h4>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                      Precise Street Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-gray-400">
                        <MapPin size={14} />
                      </span>
                      <textarea
                        required
                        rows={2}
                        placeholder="House #, Street Address, Nearest landmark or block area..."
                        value={userAddress}
                        onChange={(e) => setUserAddress(e.target.value)}
                        className="w-full bg-soft-gray border border-gray-200 focus:border-pizza-red focus:outline-none rounded-xl py-2 pl-10 pr-4 text-xs sm:text-sm text-dark-text"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    2. Pickup Schedule Estimates
                  </h4>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                      When will you arrive at the outlet?
                    </label>
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full bg-soft-gray border border-gray-200 focus:border-pizza-red focus:outline-none rounded-xl py-2.5 px-3 text-xs sm:text-sm text-dark-text font-bold"
                    >
                      <option value="In 15 Mins">Immediately (15 mins prep)</option>
                      <option value="In 30 Mins">In 30 Minutes</option>
                      <option value="In 45 Mins">In 45 Minutes</option>
                      <option value="In 1 Hour">In 1 Hour</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Payment Methods Choice */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  3. Select Payment Mode
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPayMethod("cod")}
                    className={`border rounded-xl p-3 text-center cursor-pointer font-bold text-xs transition-colors flex items-center justify-center gap-1.5 ${
                      payMethod === "cod"
                        ? "border-pizza-red bg-red-50/50 text-pizza-red shadow-sm"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    💵 Cash on {orderType === "delivery" ? "Delivery" : "Counter"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayMethod("card")}
                    className={`border rounded-xl p-3 text-center cursor-pointer font-bold text-xs transition-colors flex items-center justify-center gap-1.5 ${
                      payMethod === "card"
                        ? "border-pizza-red bg-red-50/50 text-pizza-red shadow-sm"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    💳 Card Check out
                  </button>
                </div>

                {/* Credit card credentials prompt if selected card method */}
                {payMethod === "card" && (
                  <div className="bg-soft-gray p-3 rounded-xl border border-gray-150 space-y-2.5 animate-fadeIn">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Debit/Credit Card Number
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="4242 •••• •••• 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white border border-gray-200 focus:border-pizza-red focus:outline-none rounded-lg py-1.5 px-3 text-xs"
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 leading-tight">
                      * Secured using sandbox mock payment gateway. No real amount is billed.
                    </p>
                  </div>
                )}
              </div>

              {/* Order Submission Panel details */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-150 mt-4 space-y-1.5">
                <div className="flex justify-between text-xs text-gray-600 leading-none">
                  <span>Grand Total Bill Amount:</span>
                  <span className="font-bold text-dark-text font-mono">Rs. {totalPrice}</span>
                </div>
                <div className="text-[11px] text-gray-500 leading-relaxed">
                  * Pricing includes standard local sales tax. Food is prepared hygienic following ISO criteria.
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 text-pizza-red text-xs font-semibold rounded-xl border border-red-200 animate-fadeIn">
                  ⚠️ {errorMessage}
                </div>
              )}

              {/* Confirm submit order button */}
              <button
                type="submit"
                disabled={isOrdering}
                className="w-full bg-pizza-red hover:bg-neutral-900 text-white font-bebas text-2xl py-4 rounded-xl tracking-wider uppercase transition-all shadow-md active:scale-98 disabled:bg-red-400 cursor-pointer"
              >
                {isOrdering ? "RESERVING OVEN KITCHEN SLOT..." : "CONFIRM & PLACE ORDER"}
              </button>

            </form>
          </div>
        ) : (
          /* Real-Time Live tracking progress step UI */
          <div className="p-8 text-center space-y-8 animate-fadeIn">
            <div>
              <span className="text-4xl block animate-bounce mb-2">🎉</span>
              <h3 className="font-bebas text-3xl text-dark-text">Your Order is Confirmed!</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Cooking sequence initiated. Below is our real-time oven-to-door delivery tracker.
              </p>
            </div>

            {/* Steps graphics visual vertical/horizontal bar */}
            <div className="space-y-6 max-w-sm mx-auto text-left relative pl-8 py-2 border-l-2 border-dashed border-gray-200">
              
              {/* Overlay highlight bars showing current step values */}
              
              {/* Step 1: Received */}
              <div className="relative">
                <div
                  className={`absolute -left-[45px] top-0 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
                    trackingStep === "received"
                      ? "bg-pizza-red text-white animate-pulse"
                      : "bg-green-600 text-white"
                  }`}
                >
                  1
                </div>
                <div className="pl-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-dark-text">Order Received</h4>
                  <p className="text-xs text-gray-400 leading-tight">Branch has approved and logged cooking details.</p>
                  {trackingStep === "received" && (
                    <span className="text-[10px] text-pizza-red font-bold animate-pulse block mt-1">
                      Readying ingredients ({countdown}s)...
                    </span>
                  )}
                </div>
              </div>

              {/* Step 2: Kitchen */}
              <div className="relative">
                <div
                  className={`absolute -left-[45px] top-0 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    trackingStep === "kitchen"
                      ? "bg-pizza-red text-white animate-pulseScale"
                      : trackingStep === "dispatch" || trackingStep === "delivered"
                      ? "bg-green-600 text-white"
                      : "bg-gray-150 text-gray-400"
                  }`}
                >
                  2
                </div>
                <div className="pl-3">
                  <h4 className={`font-bold text-xs uppercase tracking-wider ${trackingStep === "kitchen" ? "text-dark-text" : "text-gray-400"}`}>
                    Baking In Stone Oven
                  </h4>
                  <p className="text-xs text-gray-400 leading-tight">Piping hot melting cheese baking at 450°C temp.</p>
                  {trackingStep === "kitchen" && (
                    <span className="text-[10px] text-pizza-red font-bold animate-pulse block mt-1 flex items-center gap-1">
                      <Flame size={10} className="text-orange-500 animate-bounce" /> Heat-locking active ({countdown}s)...
                    </span>
                  )}
                </div>
              </div>

              {/* Step 3: Dispatch */}
              <div className="relative">
                <div
                  className={`absolute -left-[45px] top-0 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    trackingStep === "dispatch"
                      ? "bg-pizza-red text-white animate-pulse"
                      : trackingStep === "delivered"
                      ? "bg-green-600 text-white"
                      : "bg-gray-150 text-gray-400"
                  }`}
                >
                  3
                </div>
                <div className="pl-3">
                  <h4 className={`font-bold text-xs uppercase tracking-wider ${trackingStep === "dispatch" ? "text-dark-text" : "text-gray-400"}`}>
                    {orderType === "delivery" ? "Out For Thermal Delivery" : "Ready For Store Takeaway"}
                  </h4>
                  <p className="text-xs text-gray-400 leading-tight">
                    {orderType === "delivery"
                      ? "Rider is racing containing thermal insulation locked box."
                      : "Your crown slices are fresh baked on rack. Come pickup!"}
                  </p>
                  {trackingStep === "dispatch" && (
                    <span className="text-[10px] text-pizza-red font-bold animate-pulse block mt-1 flex items-center gap-1">
                      <Truck size={12} className="animate-bounce text-pizza-red" /> Rider on course ({countdown}s)...
                    </span>
                  )}
                </div>
              </div>

              {/* Step 4: Arrived */}
              <div className="relative">
                <div
                  className={`absolute -left-[45px] top-0 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    trackingStep === "delivered"
                      ? "bg-green-600 text-white scale-110"
                      : "bg-gray-150 text-gray-400"
                  }`}
                >
                  ✔
                </div>
                <div className="pl-3">
                  <h4 className={`font-bold text-xs uppercase tracking-wider ${trackingStep === "delivered" ? "text-green-700 font-extrabold" : "text-gray-400"}`}>
                    {orderType === "delivery" ? "Arrived & Handed Over" : "Order Handed Over"}
                  </h4>
                  <p className="text-xs text-gray-400 leading-tight">Yummy crust, high values. Bon appetite!</p>
                </div>
              </div>

            </div>

            {/* Celebration or continuous timer estimates */}
            {trackingStep === "delivered" ? (
              <div className="bg-green-50 text-green-800 border border-green-200 p-4 rounded-2xl text-xs sm:text-sm animate-fadeIn">
                <span className="font-bold block text-sm mb-1">Delivered! Enjoy your Feast!</span>
                Your food has been delivered or collected safely. Give us five-star reviews on the homepage!
              </div>
            ) : (
              <p className="text-[10px] text-gray-400">
                Please leave this page tracker open to track continuous oven cook milestones!
              </p>
            )}

            {/* OK Actions */}
            <button
              onClick={handleDoneTracking}
              className="w-full bg-dark-text hover:bg-pizza-red text-white py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wide cursor-pointer transition-colors"
            >
              {trackingStep === "delivered" ? "Back To Restaurant" : "OK, Minimize Tracker"}
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
