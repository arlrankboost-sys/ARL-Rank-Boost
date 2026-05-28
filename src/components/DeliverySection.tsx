import { Flame, Route, ShieldCheck, HeartPulse, Clock } from "lucide-react";

export default function DeliverySection() {
  const steps = [
    {
      title: "Preparation in 10 Mins",
      desc: "Fresh sourdough is flattened, topped, and baked under extreme heat in under 10 minutes.",
      icon: <Flame className="text-pizza-red" size={24} />
    },
    {
      title: "Insulated Packing",
      desc: "Packed directly from stone tiles into foil-lined heat preservation boxes.",
      icon: <ShieldCheck className="text-yellow-accent" size={24} />
    },
    {
      title: "Express Hot Routing",
      desc: "Our riders choose optimal GPS routes to deliver straight to your door in under 25 minutes.",
      icon: <Route className="text-pizza-red" size={24} />
    }
  ];

  return (
    <section id="delivery" className="py-20 bg-soft-gray bg-gradient-to-b from-white to-gray-50 text-dark-text border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text / Info */}
          <div className="lg:col-span-6 space-y-6">
            <span className="block text-pizza-red font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
              <Clock size={12} className="text-pizza-red" /> EXPRESS LOCAL RUNNERS
            </span>
            <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-dark-text leading-tight uppercase">
              PIPING HOT DELIVERY <br />
              <span className="text-pizza-red">UNDER 25 MINUTES GUARANTEED</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We understand that a limp, lukewarm pizza crust is a sin. That's why we have custom-engineered our backend ordering dispatch and partnered with express local riders to deliver within record speeds.
            </p>

            {/* Stepped milestones */}
            <div className="space-y-6 pt-4">
              {steps.map((st, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="bg-white border border-gray-100 p-3 rounded-2xl card-shadow shrink-0">
                    {st.icon}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-dark-text">{st.title}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-0.5 max-w-md">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual reassurance badge */}
            <div className="mt-6 flex items-center gap-3 bg-white border border-gray-100 p-4 rounded-2xl max-w-md card-shadow">
              <span className="text-3xl">🛡️</span>
              <p className="text-xs text-gray-500">
                <span className="font-bold text-dark-text block hover:text-pizza-red">Safety Disinfectant Guaranteed</span>
                All orders are prepared using double hygiene protocols. Riders undergo daily body scanners.
              </p>
            </div>

          </div>

          {/* Right graphics: Beautiful food presentation banner */}
          <div className="lg:col-span-6 relative flex items-center justify-center max-w-md lg:max-w-none mx-auto w-full">
            <div className="absolute w-[90%] aspect-square bg-red-100/30 rounded-full -z-10 filter blur-2xl" />
            <div className="relative aspect-square w-full sm:w-[90%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=600&auto=format&fit=crop"
                alt="Express hot delivery fresh baked pizza close-up toppings"
                className="object-cover w-full h-full"
                referrerPolicy="no-referrer"
              />
              
              {/* Glassmorphism card floating on bottom of image */}
              <div className="absolute bottom-6 left-6 right-6 glass p-5 rounded-2xl card-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold text-pizza-red tracking-widest uppercase block mb-1">RIDER DISPATCH LIVE</span>
                    <h4 className="text-sm font-bold text-dark-text leading-tight">Fast Food Thermal Insulation Active</h4>
                  </div>
                  <span className="bg-red-50 text-pizza-red border border-red-100 text-[10px] font-bold px-3 py-1 rounded-full shrink-0 uppercase tracking-wider">
                    72°C Temp Locked
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
