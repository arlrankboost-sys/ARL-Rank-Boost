import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Phone, Clock, MapPin } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
}

export default function Header({ cartCount, onOpenCart, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navLinks = [
    { label: "Home", target: "hero" },
    { label: "Find Store", target: "order-box" },
    { label: "Pizzas Menu", target: "menu" },
    { label: "Best Deals", target: "deals" },
    { label: "Why Us", target: "why-choose-us" },
    { label: "Reviews", target: "reviews" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "glass py-3 shadow-sm border-b border-gray-150"
            : "bg-white/95 py-4 border-b border-gray-100"
        }`}
      >
        <div id="nav-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => scrollToSection("hero")}
              id="brand-logo"
            >
              <div className="bg-pizza-red text-white p-2 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 duration-300">
                <span className="font-bebas text-2xl tracking-wide">AJ</span>
              </div>
              <div>
                <span className="font-bebas text-2xl sm:text-3xl tracking-tight text-dark-text block hover:text-pizza-red transition-colors duration-200">
                  AL JANNAT
                </span>
                <span className="text-[10px] font-bold text-pizza-red tracking-widest uppercase block -mt-1">
                  Fast Food & Pizza
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1 lg:space-x-4">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollToSection(link.target)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer rounded-lg hover:bg-soft-gray ${
                    activeSection === link.target
                      ? "text-pizza-red font-semibold bg-red-50/50"
                      : "text-gray-600 hover:text-dark-text"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-3">
              {/* Call Widget (Desktop) */}
              <a
                href="tel:03467703788"
                className="hidden xl:flex items-center space-x-2 text-gray-700 bg-soft-gray px-3 py-1.5 rounded-full text-xs hover:text-pizza-red hover:bg-red-50 transition-colors duration-300"
              >
                <Phone size={14} className="text-pizza-red animate-pulse" />
                <span className="font-semibold">0346-7703788</span>
              </a>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative p-2.5 text-gray-700 hover:text-pizza-red bg-white hover:bg-red-50 border border-gray-200 hover:border-red-150 rounded-full cursor-pointer transition-all duration-350 shadow-sm hover:scale-105 btn-hover"
                id="cart-header-btn"
                aria-label="Toggle Shopping Cart"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-pizza-red text-white text-[11px] font-bold w-5.5 h-5.5 flex items-center justify-center rounded-full shadow-md animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Order Now Responsive Promo CTA */}
              <button
                onClick={() => scrollToSection("menu")}
                className="hidden sm:block bg-pizza-red text-white font-bebas tracking-wide px-5 py-2 rounded-xl text-lg active:scale-95 transition-all duration-300 btn-hover cursor-pointer"
              >
                ORDER ONLINE
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-dark-text hover:bg-soft-gray rounded-lg"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 animate-fadeIn z-50">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollToSection(link.target)}
                  className="block w-full text-left px-4 py-3 text-base font-semibold text-gray-700 hover:text-pizza-red hover:bg-soft-gray rounded-xl transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3 px-4">
                <a
                  href="tel:03058883788"
                  className="flex items-center justify-center space-x-2 text-dark-text bg-soft-gray py-3 rounded-xl text-sm font-semibold hover:text-pizza-red"
                >
                  <Phone size={16} className="text-pizza-red" />
                  <span>Call 0305-8883788</span>
                </a>
                <button
                  onClick={() => scrollToSection("menu")}
                  className="w-full bg-pizza-red text-white font-bebas text-xl py-3 rounded-xl tracking-wide hover:bg-red-700 transition-colors"
                >
                  ORDER NOW
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
