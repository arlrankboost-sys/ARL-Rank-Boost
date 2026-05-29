import { useNavigate } from "react-router-dom";
import { Facebook, Instagram, Twitter, Phone, MapPin, Mail, Award } from "lucide-react";

interface FooterProps {
  onNavigateToCategory?: (category: string) => void;
}

export default function Footer({ onNavigateToCategory }: FooterProps) {
  const navigate = useNavigate();

  const handleRouteNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuQuickLinks = [
    { label: "Signature Slices", category: "Signature" },
    { label: "Local Pakistani Cheesy Delights", category: "Local Delight" },
    { label: "Classic Thin Crust", category: "Classic" },
    { label: "Sides, Lava Cakes & Soda", category: "Sides & Drinks" }
  ];

  return (
    <footer className="bg-dark-text text-white border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 column structural layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-800 pb-12 mb-12">
          
          {/* Column 1: Outlets / Branding */}
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-2">
              <div className="bg-pizza-red p-2 rounded-xl text-white font-bebas text-lg tracking-wide">
                FF
              </div>
              <div>
                <span className="font-bebas text-3xl tracking-tight block">FAST FOOD</span>
                <span className="text-[10px] font-bold text-pizza-red tracking-widest uppercase block -mt-1.5">Fast Food & Pizza</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Pakistan's premium gourmet wood-fired pizza house. Serving hand-stretched crusted masterworks loaded with real imported mozzarella and rich tandoori/tikka flavor infusions.
            </p>
            {/* Social shares */}
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2.5 bg-gray-800 hover:bg-pizza-red text-white hover:-translate-y-1 rounded-full transition-all duration-300">
                <Facebook size={16} />
              </a>
              <a href="#" className="p-2.5 bg-gray-800 hover:bg-pizza-red text-white hover:-translate-y-1 rounded-full transition-all duration-300">
                <Instagram size={16} />
              </a>
              <a href="#" className="p-2.5 bg-gray-800 hover:bg-pizza-red text-white hover:-translate-y-1 rounded-full transition-all duration-300">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Pizza Categories mapping links */}
          <div className="space-y-4 text-left">
            <h4 className="font-bebas text-xl tracking-wider text-pizza-red">EXPLORE PIZZAS</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              {menuQuickLinks.map((ql, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      if (onNavigateToCategory) {
                        onNavigateToCategory(ql.category);
                      }
                      handleRouteNavigate("/menu");
                    }}
                    className="hover:text-white transition-colors cursor-pointer block text-left bg-transparent border-none p-0"
                  >
                    • {ql.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Site Maps navigation */}
          <div className="space-y-4 text-left">
            <h4 className="font-bebas text-xl tracking-wider text-pizza-red">QUICK LINKS</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <a
                  href="/"
                  className="hover:text-white transition-colors hover:underline block text-left"
                >
                  • Back to Home
                </a>
              </li>
              <li>
                <a
                  href="/find-store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors hover:underline block text-left"
                >
                  • Pin Store Branches
                </a>
              </li>
              <li>
                <a
                  href="/menu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors hover:underline block text-left"
                >
                  • Full Menu card
                </a>
              </li>
              <li>
                <a
                  href="/deals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors hover:underline block text-left"
                >
                  • Grab Special Kombos
                </a>
              </li>
              <li>
                <a
                  href="/why-choose-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors hover:underline block text-left"
                >
                  • Hygiene Standards
                </a>
              </li>
              <li>
                <a
                  href="/reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors hover:underline block text-left font-sans"
                >
                  • Customer Feedback logs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Locations helpline info */}
          <div className="space-y-4 text-left">
            <h4 className="font-bebas text-xl tracking-wider text-pizza-red">UAN HELPLINE</h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-gray-400">
              <a href="tel:+9251111222333" className="flex items-center gap-2 text-white hover:text-pizza-red transition-colors font-bold text-sm">
                <Phone size={16} className="text-pizza-red" />
                <span>+92 51 111-222-333</span>
              </a>
              <div className="flex items-start gap-2 leading-relaxed">
                <MapPin size={16} className="text-pizza-red shrink-0 mt-0.5" />
                <span>Major presence in Rawalpindi, Islamabad, Lahore, and Karachi.</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-pizza-red" />
                <span>contact@fastfood.com.pk</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-gray-800 border border-gray-750 p-2 rounded-xl text-[10px] text-gray-300">
                <Award size={12} className="text-yellow-500" /> ISO 9001 Certified Kitchens
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 pt-4 mt-4 border-t border-gray-900">
          <div>
            © 2026 Fast Food & Pizza Restaurant Systems. All Rights Reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Cookie Configurations</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
