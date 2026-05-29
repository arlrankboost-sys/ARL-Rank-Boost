import Reviews from "../components/Reviews";
import { Star, MessageSquare, Award, Sparkles, Smile } from "lucide-react";

export default function ReviewsPage() {
  return (
    <div className="pt-24 pb-16 animate-fadeIn min-h-screen bg-slate-50/50">
      {/* Immersive Social Proof Banner */}
      <div className="relative h-96 w-full overflow-hidden shadow-md">
        <img
          src="/src/assets/images/al_jannat_hero_1780062230084.png"
          alt="Lively Happy Customers Table"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-black/30 flex flex-col justify-end p-8 sm:p-12">
          <div className="max-w-7xl mx-auto w-full">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-widest bg-yellow-accent text-dark-text uppercase mb-4 animate-bounce">
              ⭐ RATED 4.9 BY LOCAL COMMS
            </span>
            <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-none drop-shadow-md">
              WHAT OUR <span className="text-pizza-red">RAVING FANS SAY</span>
            </h1>
            <p className="text-gray-200 text-sm sm:text-base mt-2 max-w-2xl font-sans font-light leading-relaxed">
              We slice up premium wood-fired magic Daily! Explore live unfiltered testimonials, and post your own review comments down below!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Dynamic Reviews Score Board */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100 card-shadow text-center">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-1">AGGREGATE RATING</span>
            <h3 className="font-bebas text-4xl sm:text-5xl text-dark-text leading-none">4.9 / 5.0</h3>
            <div className="flex justify-center gap-1 text-yellow-500 mt-2">
              <Star size={16} className="fill-yellow-500" />
              <Star size={16} className="fill-yellow-500" />
              <Star size={16} className="fill-yellow-500" />
              <Star size={16} className="fill-yellow-500" />
              <Star size={16} className="fill-yellow-500" />
            </div>
            <span className="text-[10px] text-gray-400 mt-1.5 block">Based on 12,480 customers</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 card-shadow text-center">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-1">TOTAL SERVED</span>
            <h3 className="font-bebas text-4xl sm:text-5xl text-pizza-red leading-none">100k +</h3>
            <div className="flex justify-center items-center gap-1 text-pizza-red mt-2.5 font-bold font-mono text-xs">
              <Award size={14} /> Registered Accounts
            </div>
            <span className="text-[10px] text-gray-400 mt-1.5 block">Across Punjab & Karachi</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 card-shadow text-center">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-1">HYGIENE INDEX</span>
            <h3 className="font-bebas text-4xl sm:text-5xl text-green-600 leading-none">99.8%</h3>
            <div className="flex justify-center items-center gap-1 text-green-600 mt-2.5 font-bold font-mono text-xs">
              <Sparkles size={14} /> Certified Clean Rooms
            </div>
            <span className="text-[10px] text-gray-400 mt-1.5 block">Transparent glass boundaries</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 card-shadow text-center">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-1">RECOMMEND RATE</span>
            <h3 className="font-bebas text-4xl sm:text-5xl text-orange-500 leading-none">97.4%</h3>
            <div className="flex justify-center items-center gap-1 text-orange-500 mt-2.5 font-bold font-mono text-xs">
              <Smile size={14} /> Postings repeat buyers
            </div>
            <span className="text-[10px] text-gray-400 mt-1.5 block">Verified by third party auditor</span>
          </div>

        </div>

        {/* Embedded Interactive Reviews Component */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 card-shadow">
          <Reviews />
        </div>

      </div>
    </div>
  );
}
