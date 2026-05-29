import { ShieldCheck, Flame, Leaf, Truck, Users, Award } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    {
      icon: <Award className="text-pizza-red" size={32} />,
      title: "Hand-Stretched Sourdough",
      desc: "Our premium dough is fermented for 48 hours and hand-stretched to order, creating a perfectly bubbly, crispy, and airy crust with artisan characteristics."
    },
    {
      icon: <Flame className="text-yellow-accent" size={32} />,
      title: "Wood-Fire Brick Baking",
      desc: "Pizzas are baked at 450°C over natural Italian stone tiles. This flash-cook locks in hydration, cooks cheese to golden perfection, and adds a wood-smoked aroma."
    },
    {
      icon: <Leaf className="text-green-600" size={32} />,
      title: "100% Premium Ingredients",
      desc: "No processed analog cheese slices here! We use imported 100% mozzarella, vine-ripened sweet Italian plum tomatoes, and organic local farm vegetables."
    },
    {
      icon: <Truck className="text-pizza-red" size={32} />,
      title: "Thermal Safety Delivery",
      desc: "Our delivery fleet rides with premium custom insulated thermal cabinets that maintain constant 70°C heat, guaranteeing your pizza arrives crunchy and hot."
    },
    {
      icon: <ShieldCheck className="text-yellow-accent" size={32} />,
      title: "Certified Gold Hygiene",
      desc: "We operate under rigorous sanitization standards. Every chef wears protective gear, and we have fully open kitchen designs for total inspection."
    },
    {
      icon: <Users className="text-green-600" size={32} />,
      title: "15,000+ Happy Locals",
      desc: "Serving communities across Rawalpindi, Islamabad, Lahore, and Karachi. We are rated 4.8/5 stars across all major directories for taste and service."
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-pizza-red font-bold text-xs uppercase tracking-widest block mb-2">
            🍕 OUR CRAFT DIFFERENCE
          </span>
          <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-dark-text tracking-tight uppercase leading-none">
            WHY WE ARE THE <span className="text-pizza-red">#1 PIZZA BRAND</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            We don’t just assemble pizzas; we handcraft edible art using the highest quality ingredients and cooking traditions available in Pakistan.
          </p>
        </div>

        {/* Features Bento style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="p-8 bg-white border border-gray-100 rounded-3xl transition-all duration-350 flex flex-col space-y-4 card-shadow"
            >
              <div className="bg-red-50 group-hover:bg-white border border-red-100 p-4 rounded-2xl w-fit transition-colors">
                {pt.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-bebas text-2xl text-dark-text group-hover:text-pizza-red transition-colors">
                  {pt.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom promo highlight */}
        <div className="mt-16 bg-red-50/50 border border-red-100 rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl text-center lg:text-left">
            <h3 className="font-bebas text-3xl text-dark-text">Ready to taste the Royal Premium Slices?</h3>
            <p className="text-gray-600 text-sm">
              Place your first pickup or delivery order today and get automatic free delivery on checkout using code <span className="font-bold underline text-pizza-red tracking-wide">FASTFOODFREE</span>.
            </p>
          </div>
          <button
            onClick={() => {
              const element = document.getElementById("menu");
              if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="bg-pizza-red text-white font-bebas text-xl tracking-wider py-4 px-8 rounded-2xl transition-all card-shadow shrink-0 cursor-pointer active:scale-95 btn-hover"
          >
            ORDER ONLINE NOW
          </button>
        </div>

      </div>
    </section>
  );
}
