import WhyChooseUs from "../components/WhyChooseUs";
import { Sparkles, Star, ShieldCheck, Heart } from "lucide-react";

export default function WhyChooseUsPage() {
  return (
    <div className="pt-24 pb-16 animate-fadeIn min-h-screen bg-slate-50/50">
      {/* Immersive Brand Standards Banner */}
      <div className="relative h-96 w-full overflow-hidden shadow-md">
        <img
          src="/src/assets/images/al_jannat_store_1780062285562.png"
          alt="Premium Kitchen Base"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-black/30 flex flex-col justify-end p-8 sm:p-12">
          <div className="max-w-7xl mx-auto w-full">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-widest bg-pizza-red text-white uppercase mb-4 animate-bounce">
              ✨ THE GOLD STANDARD OF FAST FOOD
            </span>
            <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-none drop-shadow-md">
              WHY CHOOSE <span className="text-yellow-accent">OUR CRAFT?</span>
            </h1>
            <p className="text-gray-200 text-sm sm:text-base mt-2 max-w-2xl font-sans font-light leading-relaxed">
              We operate with state-of-the-art culinary practices, certified double-glazed glass enclosures, completely touchless delivery pipelines, and fresh organic flour baseline batches!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 card-shadow">
          <WhyChooseUs />
        </div>
      </div>
    </div>
  );
}
