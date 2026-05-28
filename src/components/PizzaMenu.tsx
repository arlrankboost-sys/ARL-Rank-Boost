import { useState } from "react";
import { Pizza } from "../types";
import { PIZZAS } from "../data/pizzaData";
import { Flame, Leaf, Star, Search, SlidersHorizontal, Plus, ChevronRight, X, Heart, ShoppingBag } from "lucide-react";

interface PizzaMenuProps {
  onAddToCart: (
    pizza: Pizza,
    size: string,
    crust: string,
    extras: { name: string; price: number }[],
    quantity: number
  ) => void;
}

export default function PizzaMenu({ onAddToCart }: PizzaMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [spicyFilter, setSpicyFilter] = useState<boolean>(false);
  const [vegFilter, setVegFilter] = useState<boolean>(false);
  
  // Customization modal state
  const [activeCustomizePizza, setActiveCustomizePizza] = useState<Pizza | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("Regular 9\"");
  const [selectedCrust, setSelectedCrust] = useState<string>("");
  const [selectedExtras, setSelectedExtras] = useState<{ name: string; price: number }[]>([]);
  const [customizeQty, setCustomizeQty] = useState<number>(1);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (pizzaId: string) => {
    if (favorites.includes(pizzaId)) {
      setFavorites(favorites.filter(f => f !== pizzaId));
    } else {
      setFavorites([...favorites, pizzaId]);
    }
  };

  const isPizzaProduct = (pizza: Pizza) => {
    return pizza.category === "Pizzas" || pizza.category === "Special Pizzas";
  };

  // Open modal with defaults
  const handleOpenCustomize = (pizza: Pizza) => {
    setActiveCustomizePizza(pizza);
    if (isPizzaProduct(pizza)) {
      setSelectedSize("Small Pizza");
      setSelectedCrust(pizza.crusts[0] || "Pan Crust");
    } else {
      setSelectedSize(pizza.sizes[0]?.size || "Standard Size");
      setSelectedCrust(pizza.crusts[0] || "Standard Style");
    }
    setSelectedExtras([]);
    setCustomizeQty(1);
  };

  const handleCloseCustomize = () => {
    setActiveCustomizePizza(null);
  };

  const toggleExtra = (extraName: string, price: number) => {
    const exists = selectedExtras.some(e => e.name === extraName);
    if (exists) {
      setSelectedExtras(selectedExtras.filter(e => e.name !== extraName));
    } else {
      setSelectedExtras([...selectedExtras, { name: extraName, price }]);
    }
  };

  const handleConfirmAdd = () => {
    if (!activeCustomizePizza) return;
    onAddToCart(
      activeCustomizePizza,
      selectedSize,
      selectedCrust,
      selectedExtras,
      customizeQty
    );
    handleCloseCustomize();
  };

  // Calculate current item sum in real time
  const calculateModalTotal = () => {
    if (!activeCustomizePizza) return 0;
    const sizeMultiplier = activeCustomizePizza.sizes.find(s => s.size === selectedSize);
    const addedPrice = sizeMultiplier ? sizeMultiplier.priceAdd : 0;
    const baseAndSize = activeCustomizePizza.price + addedPrice;
    const extrasSum = selectedExtras.reduce((sum, e) => sum + e.price, 0);
    return (baseAndSize + extrasSum) * customizeQty;
  };

  // Categories list - Dynamically constructed from ALL items in PIZZAS dataset
  const categories = ["All", ...Array.from(new Set(PIZZAS.map((p) => p.category)))];

  // Filtering logic
  const filteredPizzas = PIZZAS.filter((p) => {
    // Category match
    const categoryMatches = selectedCategory === "All" || p.category === selectedCategory;
    
    // Search match
    const searchMatches = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Spicy filter
    const spicyMatches = !spicyFilter || p.isSpicy;
    
    // Vegetarian filter
    const vegMatches = !vegFilter || p.isVegetarian;

    return categoryMatches && searchMatches && spicyMatches && vegMatches;
  });

  const extrasOptions = [
    { name: "Extra Pure Mozzarella", price: 150 },
    { name: "Spicy Jalapeno Rings", price: 80 },
    { name: "Smoked Grilled Chicken cubes", price: 200 },
    { name: "Chef Secret Garlic Cream Drizzle", price: 60 },
  ];

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-100 pb-8">
          <div>
            <span className="block text-pizza-red font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <SparkleEmoji /> CRISPY CHEESY HEAVEN
            </span>
            <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-dark-text leading-[0.95]">
              EXPLORE OUR <span className="text-pizza-red">PREMIUM MENU</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1 max-w-xl">
              Freshly hand-stretched sourdough pizzas loaded with premium ingredients. Custom sizing available from Personal up to Beast size!
            </p>
          </div>

          {/* Core Search input along elements */}
          <div className="mt-6 md:mt-0 relative max-w-md w-full shrink-0 flex items-center gap-3">
            <div className="relative w-full">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Find hot pizzas, sides, treats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-soft-gray border border-gray-150 focus:border-pizza-red focus:outline-none rounded-xl py-3.5 pl-11 pr-4 text-sm text-dark-text transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-semibold hover:text-pizza-red"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Nav Tabs + Filter Checkboxes */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
          
          {/* Categories Horizontal flow */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer btn-hover ${
                  selectedCategory === cat
                    ? "bg-pizza-red text-white card-shadow"
                    : "bg-soft-gray text-gray-600 hover:text-dark-text"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Filters toggle checks */}
          <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-700 font-medium">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={spicyFilter}
                onChange={(e) => setSpicyFilter(e.target.checked)}
                className="accent-pizza-red w-4 h-4 rounded cursor-pointer"
              />
              <span className={`flex items-center gap-1 ${spicyFilter ? "text-pizza-red font-semibold" : ""}`}>
                <Flame size={14} className="text-pizza-red shrink-0" /> Spicy
              </span>
            </label>

            <span className="text-gray-200">|</span>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={vegFilter}
                onChange={(e) => setVegFilter(e.target.checked)}
                className="accent-green-600 w-4 h-4 rounded cursor-pointer"
              />
              <span className={`flex items-center gap-1 ${vegFilter ? "text-green-600 font-semibold" : ""}`}>
                <Leaf size={14} className="text-green-600 shrink-0" /> Vegetarian
              </span>
            </label>
          </div>
        </div>

        {/* Pizza Items Grid */}
        {filteredPizzas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPizzas.map((p) => {
              const basePriceFormatted = p.price;
              const hasPopularTag = p.isPopular;

              return (
                <div
                  key={p.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all duration-350 hover:-translate-y-1 flex flex-col h-full relative card-shadow hover:shadow-xl"
                  id={`item-${p.id}`}
                >
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                    {hasPopularTag && (
                      <span className="bg-yellow-accent text-dark-text font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                        Best Seller
                      </span>
                    )}
                    {p.isSpicy && (
                      <span className="bg-red-50 border border-red-100 text-pizza-red font-semibold text-[10px] uppercase tracking-wide px-3 py-1 rounded-full flex items-center gap-0.5 shadow-sm">
                        <Flame size={10} className="fill-pizza-red" /> Spicy
                      </span>
                    )}
                    {p.isVegetarian && (
                      <span className="bg-green-50 border border-green-100 text-green-700 font-semibold text-[10px] uppercase tracking-wide px-3 py-1 rounded-full flex items-center gap-0.5 shadow-sm">
                        <Leaf size={10} /> Veg
                      </span>
                    )}
                  </div>

                  {/* Favorite Toggle Button */}
                  <button
                    onClick={() => toggleFavorite(p.id)}
                    className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-400 hover:text-pizza-red p-2 rounded-full cursor-pointer transition-colors shadow-sm active:scale-90"
                    aria-label="Favorite item"
                  >
                    <Heart
                      size={18}
                      className={favorites.includes(p.id) ? "fill-pizza-red text-pizza-red" : ""}
                    />
                  </button>

                  {/* Product Image Area with responsive aspect ratio */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 border-b border-gray-100">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="object-cover w-full h-full group-hover:scale-106 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow">
                    
                    {/* Size list preview pill */}
                    {isPizzaProduct(p) && (
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                        SMALL • MEDIUM • LARGE • EXTRA LARGE
                      </span>
                    )}

                    {/* Title */}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bebas text-2xl text-dark-text group-hover:text-pizza-red transition-colors duration-200">
                        {p.title}
                      </h3>
                      
                      <div className="flex items-center text-yellow-500 font-semibold text-xs gap-1 shrink-0 bg-yellow-50 px-2 py-0.5 rounded-lg border border-yellow-100">
                        <Star size={12} className="fill-yellow-500" />
                        <span>{p.rating}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-xs sm:text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                      {p.description}
                    </p>

                    {/* Actions and Pricing */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <div>
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">STARTING AT</span>
                        <span className="text-xl font-bold font-mono text-dark-text mt-1 block">
                          Rs. {basePriceFormatted}
                        </span>
                      </div>

                      <button
                        onClick={() => handleOpenCustomize(p)}
                        className="bg-pizza-red text-white font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-all duration-300 transform group-hover:scale-102 card-shadow btn-hover"
                        id={`btn-${p.id}`}
                      >
                        <Plus size={16} />
                        <span>ADD TO CART</span>
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search results layout */
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 max-w-xl mx-auto">
            <span className="text-5xl block mb-4">🔍</span>
            <h3 className="font-bebas text-3xl text-dark-text">No Pizzas Match Slicing Criteria</h3>
            <p className="text-gray-500 text-sm mt-1 px-8">
              Check spelling or try toggling the filters off. We have lots of other signature items in store!
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                setSpicyFilter(false);
                setVegFilter(false);
              }}
              className="mt-6 bg-pizza-red hover:bg-red-700 text-white font-semibold text-xs px-6 py-3 rounded-xl uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Modern Premium Customization Modal overlay */}
      {activeCustomizePizza && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 animate-slideUp relative"
            id="builder-modal"
          >
            {/* Close Cross icon */}
            <button
              onClick={handleCloseCustomize}
              className="absolute top-4 right-4 bg-gray-100 text-gray-500 hover:text-dark-text p-2 rounded-full cursor-pointer z-10 hover:rotate-90 transition-transform"
              aria-label="Close configuration"
            >
              <X size={20} />
            </button>

            {/* Modal Hero graphics */}
            <div className="relative aspect-[16/6] bg-soft-gray border-b border-gray-100 overflow-hidden">
              <img
                src={activeCustomizePizza.image}
                alt={activeCustomizePizza.title}
                className="object-cover w-full h-full"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                <div>
                  <span className="bg-pizza-red text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full block self-start max-w-fit mb-2">
                    {activeCustomizePizza.category}
                  </span>
                  <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
                    {activeCustomizePizza.title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Product description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {activeCustomizePizza.description}
              </p>

              {/* Sizing choosing checklist cards block (Hidden and disabled for non-pizza items) */}
              {isPizzaProduct(activeCustomizePizza) && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    1. Select Pizza Size
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {activeCustomizePizza.sizes.map((sz) => {
                      const totalSzPrice = activeCustomizePizza.price + sz.priceAdd;
                      const isSelected = selectedSize === sz.size;

                      return (
                        <button
                          key={sz.size}
                          onClick={() => setSelectedSize(sz.size)}
                          className={`border rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 flex flex-col justify-between items-center space-y-2 hover:border-pizza-red ${
                            isSelected
                              ? "border-pizza-red bg-red-50/50 text-pizza-red"
                              : "border-gray-200 bg-white text-gray-600"
                          }`}
                        >
                          <span className="text-xs font-semibold block uppercase tracking-wider">{sz.size}</span>
                          {sz.slices && <span className="text-[10px] block opacity-80 font-medium">({sz.slices} slices)</span>}
                          <span className="font-bold text-sm block font-mono">Rs. {totalSzPrice}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Crust selector choosing list (Hidden and disabled for non-pizza items) */}
              {isPizzaProduct(activeCustomizePizza) && activeCustomizePizza.crusts.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    2. Select Pizza Crust
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {activeCustomizePizza.crusts.map((cr) => {
                      const isSelected = selectedCrust === cr;

                      return (
                        <button
                          key={cr}
                          onClick={() => setSelectedCrust(cr)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-medium border cursor-pointer transition-all hover:border-pizza-red ${
                            isSelected
                              ? "border-pizza-red bg-red-50 text-pizza-red font-semibold"
                              : "border-gray-200 bg-white text-gray-600"
                          }`}
                        >
                          {cr}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Extras checklist chooser (Only for pizza items) */}
              {isPizzaProduct(activeCustomizePizza) && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    3. Boost with Premium Extras
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {extrasOptions.map((ext) => {
                      const isSelected = selectedExtras.some(e => e.name === ext.name);

                      return (
                        <button
                          key={ext.name}
                          onClick={() => toggleExtra(ext.name, ext.price)}
                          className={`border rounded-xl p-3.5 text-left cursor-pointer transition-all duration-200 flex items-center justify-between hover:border-pizza-red ${
                            isSelected
                              ? "border-pizza-red bg-red-50/30 text-pizza-red"
                              : "border-gray-200 bg-white text-gray-600"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              readOnly
                              className="accent-pizza-red w-4 h-4"
                            />
                            <span className="text-xs font-medium">{ext.name}</span>
                          </div>
                          <span className="text-xs font-bold font-mono">+Rs.{ext.price}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity selector and active price summary footer details */}
              <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
                
                {/* Quantity selector with interactive counters */}
                <div className="flex items-center justify-start space-x-3 self-center sm:self-auto">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">QUANTITY</span>
                  <div className="flex items-center bg-soft-gray rounded-xl border border-gray-200 p-1">
                    <button
                      onClick={() => setCustomizeQty(Math.max(1, customizeQty - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-gray-600 font-extrabold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-dark-text font-mono">
                      {customizeQty}
                    </span>
                    <button
                      onClick={() => setCustomizeQty(customizeQty + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-gray-600 font-extrabold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Pricing / CTA */}
                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <div className="text-right">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">TOTAL PRICE</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-pizza-red font-mono">
                      Rs. {calculateModalTotal()}
                    </span>
                  </div>

                  <button
                    onClick={handleConfirmAdd}
                    className="bg-pizza-red hover:bg-neutral-900 text-white font-bebas text-xl px-8 py-3.5 rounded-xl tracking-wider shadow-lg hover:shadow-red-500/20 active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag size={18} />
                    <span>ADD TO ORDER</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}

// Sparkle Pizza Emoji Helper
function SparkleEmoji() {
  return <span className="text-sm">✨</span>;
}
