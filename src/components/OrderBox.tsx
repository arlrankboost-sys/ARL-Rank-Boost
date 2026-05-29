import { useState } from "react";
import { StoreBranch } from "../types";
import { STORES } from "../data/pizzaData";
import { MapPin, Navigation, Compass, CheckCircle2, ShoppingBag, Truck } from "lucide-react";

interface OrderBoxProps {
  onOrderTypeChange: (type: "pickup" | "delivery", details: string) => void;
  selectedType: "pickup" | "delivery";
  selectedStore: StoreBranch | null;
  onSelectStore: (store: StoreBranch) => void;
}

export default function OrderBox({
  onOrderTypeChange,
  selectedType,
  selectedStore,
  onSelectStore
}: OrderBoxProps) {
  const [addressInput, setAddressInput] = useState("");
  const [selectedCity, setSelectedCity] = useState("Islamabad");
  const [isFinding, setIsFinding] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleTypeSelect = (type: "pickup" | "delivery") => {
    // Clear notifications on switch
    setSuccessMessage("");
    // Default details
    const details = type === "delivery"
      ? `Delivery to: ${addressInput || "Default Area"}, ${selectedCity}`
      : `Pickup from Store: ${selectedStore?.name || STORES[0].name}`;
    onOrderTypeChange(type, details);
  };

  const handleFindStore = () => {
    setIsFinding(true);
    setSuccessMessage("");

    setTimeout(() => {
      setIsFinding(false);
      if (selectedType === "pickup") {
        // Find store based on selected city
        const found = STORES.find(st => st.name.toLowerCase().includes(selectedCity.toLowerCase())) || STORES[0];
        onSelectStore(found);
        setSuccessMessage(`Store found & selected: ${found.name}! Your order is set for pickup.`);
        onOrderTypeChange("pickup", `Pickup from Store: ${found.name}`);
      } else {
        if (!addressInput.trim()) {
          setSuccessMessage("Please enter your exact street address first!");
          return;
        }
        setSuccessMessage(`Address saved successfully! Delivering from the nearest kitchen branch in ${selectedCity}.`);
        onOrderTypeChange("delivery", `Delivery to: ${addressInput}, ${selectedCity}`);
      }
    }, 1200);
  };

  const handleUseLocation = () => {
    setIsFinding(true);
    setTimeout(() => {
      setIsFinding(false);
      if (selectedType === "delivery") {
        const mockAddresses = [
          "Tower Block 4, Sector F-11/1, Islamabad",
          "Street 3, Phase 5 Extension, DHA Lahore",
          "Apartment 12-F, Seaview Heights, Clifton, Karachi"
        ];
        // match random based on city
        let idx = 0;
        if (selectedCity === "Lahore") idx = 1;
        if (selectedCity === "Karachi") idx = 2;

        setAddressInput(mockAddresses[idx]);
        setSuccessMessage("GPS Location detected and loaded successfully!");
        onOrderTypeChange("delivery", `Delivery to: ${mockAddresses[idx]}, ${selectedCity}`);
      } else {
        // select closest store
        const found = STORES.find(st => st.name.toLowerCase().includes(selectedCity.toLowerCase())) || STORES[0];
        onSelectStore(found);
        setSuccessMessage(`Automatically connected to closest store: ${found.name}`);
        onOrderTypeChange("pickup", `Pickup from Store: ${found.name}`);
      }
    }, 1000);
  };

  const cities = ["Islamabad", "Lahore", "Karachi", "Rawalpindi"];

  return (
    <section id="order-box" className="py-12 bg-soft-gray bg-gradient-to-b from-white to-gray-50 border-y border-gray-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Order toggle container & inputs with modern details */}
        <div className="bg-white rounded-3xl card-shadow overflow-hidden border border-gray-100 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
          
          <div className="text-center max-w-lg mx-auto mb-6">
            <h2 className="font-bebas text-3xl sm:text-4xl text-dark-text tracking-tight uppercase">
              How would you like to <span className="text-pizza-red">Order</span>?
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Select delivery format or choose your closest branch to explore local dynamic deals.
            </p>
          </div>

          {/* Toggle selector button (Delivery vs Pickup) */}
          <div className="relative flex p-1.5 bg-gray-100 rounded-2xl max-w-md mx-auto mb-8 border border-gray-200">
            {/* Soft Slider block */}
            <div
              className={`absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-md border border-gray-200/50 transition-all duration-300 ease-out ${
                selectedType === "pickup" ? "translate-x-full" : "translate-x-0"
              }`}
            />

            {/* Delivery Toggle Button */}
            <button
              onClick={() => handleTypeSelect("delivery")}
              className={`w-1/2 py-3.5 px-4 text-center rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 z-10 cursor-pointer ${
                selectedType === "delivery" ? "text-pizza-red" : "text-gray-500 hover:text-dark-text"
              }`}
            >
              <Truck size={18} className={selectedType === "delivery" ? "animate-pulse" : ""} />
              <span>DELIVERY</span>
            </button>

            {/* Pickup Toggle Button */}
            <button
              onClick={() => handleTypeSelect("pickup")}
              className={`w-1/2 py-3.5 px-4 text-center rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 z-10 cursor-pointer ${
                selectedType === "pickup" ? "text-pizza-red" : "text-gray-500 hover:text-dark-text"
              }`}
            >
              <ShoppingBag size={18} />
              <span>PICKUP</span>
            </button>
          </div>

          {/* Dynamic input sections based on Delivery or Pickup */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            
            {/* City selector: Used for both flows */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                YOUR CITY
              </label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setSuccessMessage("");
                }}
                className="w-full bg-white border border-gray-200 focus:border-pizza-red focus:outline-none rounded-xl py-3 px-4 text-sm font-medium text-dark-text transition-colors duration-200"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Delivery Address Input */}
            {selectedType === "delivery" ? (
              <div className="md:col-span-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    DELIVERY ADDRESS
                  </label>
                  <button
                    onClick={handleUseLocation}
                    className="text-xs text-pizza-red flex items-center gap-1 font-semibold hover:underline"
                  >
                    <Navigation size={11} /> Use Current GPS
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <MapPin size={16} />
                  </span>
                  <input
                    type="text"
                    placeholder="E.g., house #, street, phase/sector..."
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    className="w-full bg-white border border-gray-200 focus:border-pizza-red focus:outline-none rounded-xl py-3 pl-11 pr-4 text-sm text-dark-text transition-all"
                  />
                </div>
              </div>
            ) : (
              /* Pickup Select Store Branch Dropdown */
              <div className="md:col-span-6">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  CHOOSE STORE LOCATION
                </label>
                <select
                  value={selectedStore?.id || ""}
                  onChange={(e) => {
                    const found = STORES.find(st => st.id === e.target.value);
                    if (found) {
                      onSelectStore(found);
                      onOrderTypeChange("pickup", `Pickup from Store: ${found.name}`);
                    }
                    setSuccessMessage("");
                  }}
                  className="w-full bg-white border border-gray-200 focus:border-pizza-red focus:outline-none rounded-xl py-3 px-4 text-sm font-medium text-dark-text transition-colors duration-200"
                >
                  <option value="" disabled>-- Choose Branch --</option>
                  {STORES.filter(st => st.name.toLowerCase().includes(selectedCity.toLowerCase()))
                    .map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  {/* Default fallback list if no branches for selected city are configured in standard list */}
                  {STORES.filter(st => !st.name.toLowerCase().includes(selectedCity.toLowerCase()))
                    .map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name} ({branch.name.split(" ")[1]})
                      </option>
                    ))}
                </select>
              </div>
            )}

            {/* CTA Find Button Column */}
            <div className="md:col-span-3">
              <button
                onClick={handleFindStore}
                disabled={isFinding}
                className="w-full bg-pizza-red text-white font-semibold rounded-xl py-3.5 px-6 text-sm flex items-center justify-center gap-2 card-shadow active:scale-98 transition-all cursor-pointer disabled:bg-red-400 btn-hover"
              >
                {isFinding ? (
                  <>
                    <Compass className="animate-spin" size={16} />
                    <span>LOCATING...</span>
                  </>
                ) : (
                  <>
                    <MapPin size={16} />
                    <span>FIND STORE</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Interactive Information Panel mapping out current details */}
          {successMessage && (
            <div className="mt-6 flex items-start gap-2.5 bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-xs sm:text-sm animate-fadeIn">
              <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Store Configured!</span>
                <span className="opacity-90">{successMessage}</span>
              </div>
            </div>
          )}

          {/* Detailed Branch Information Panel (Only for Pickup after selection) */}
          {selectedType === "pickup" && selectedStore && (
            <div className="mt-6 border-t border-gray-100 pt-6 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-600">
                <div className="bg-soft-gray border border-gray-100 p-4 rounded-xl">
                  <span className="block text-[10px] font-bold text-pizza-red tracking-widest uppercase mb-1">SELECTED OUTLET</span>
                  <span className="font-semibold text-dark-text block text-sm">{selectedStore.name}</span>
                  <span className="text-xs block text-gray-500 mt-1">{selectedStore.address}</span>
                </div>
                <div className="bg-soft-gray border border-gray-100 p-4 rounded-xl">
                  <span className="block text-[10px] font-bold text-pizza-red tracking-widest uppercase mb-1">PHONE HELPLINE</span>
                  <a href={`tel:${selectedStore.phone}`} className="font-semibold text-pizza-red hover:underline block">
                    {selectedStore.phone}
                  </a>
                  <span className="text-xs block text-gray-500 mt-1">Available for custom catering & bulk queries</span>
                </div>
                <div className="bg-soft-gray border border-gray-100 p-4 rounded-xl">
                  <span className="block text-[10px] font-bold text-pizza-red tracking-widest uppercase mb-1">OPERATING HOURS</span>
                  <span className="font-semibold text-green-600 block flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse inline-block"></span> Open Now
                  </span>
                  <span className="text-xs block text-gray-500 mt-1">{selectedStore.timings}</span>
                </div>
              </div>
            </div>
          )}

          {/* Delivery Area Estimates Panel */}
          {selectedType === "delivery" && (
            <div className="mt-6 border-t border-gray-100 pt-4 flex flex-wrap gap-x-6 gap-y-2 justify-center text-xs text-gray-500 text-center">
              <span>🚀 Delivery Charge: <span className="font-semibold text-dark-text">Rs. 150</span></span>
              <span>•</span>
              <span>🕒 Average Wait Time: <span className="font-semibold text-dark-text">20 - 30 Minutes</span></span>
              <span>•</span>
              <span>🍕 Heat-retaining thermal visual box used for maximum crisp crust</span>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
