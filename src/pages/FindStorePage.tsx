import OrderBox from "../components/OrderBox";
import { StoreBranch } from "../types";
import { MapPin, Shield, Star, Clock, Heart } from "lucide-react";

interface FindStorePageProps {
  orderType: "pickup" | "delivery";
  onOrderTypeChange: (type: "pickup" | "delivery", details: string) => void;
  selectedStore: StoreBranch | null;
  onSelectStore: (store: StoreBranch) => void;
}

export default function FindStorePage({
  orderType,
  onOrderTypeChange,
  selectedStore,
  onSelectStore,
}: FindStorePageProps) {
  return (
    <div className="pt-24 pb-16 animate-fadeIn min-h-screen bg-slate-50/50">
      {/* Visual Header Banner */}
      <div className="relative h-96 w-full overflow-hidden shadow-md">
        <img
          src="/src/assets/images/al_jannat_store_1780062285562.png"
          alt="Modern Food Store Front"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/30 flex flex-col justify-end p-8 sm:p-12">
          <div className="max-w-7xl mx-auto w-full">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-widest bg-pizza-red text-white uppercase mb-4 animate-pulse">
              📍 INTERACTIVE OUTLETS MAP
            </span>
            <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-none drop-shadow-md">
              LOCATE YOUR <span className="text-yellow-accent">GOLDEN BRANCH</span>
            </h1>
            <p className="text-gray-200 text-sm sm:text-base mt-2 max-w-2xl font-sans font-light leading-relaxed">
              Serving premium sizzle and hot fresh crust across standard national locations. Track your nearest neighborhood kitchen in real-time or lock in an express self-pickup.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main selection module (takes 2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 card-shadow transition-all hover:shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-red-100 rounded-xl flex items-center justify-center text-pizza-red">
                  <MapPin size={22} />
                </div>
                <div>
                  <h2 className="font-bebas text-2xl sm:text-3xl text-dark-text tracking-wide uppercase">
                    SELECT DESTINATION PARAMETERS
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">Configure real-time delivery estimates and nearest outlet dispatching</p>
                </div>
              </div>

              <OrderBox
                onOrderTypeChange={onOrderTypeChange}
                selectedType={orderType}
                selectedStore={selectedStore}
                onSelectStore={onSelectStore}
              />
            </div>

            {/* Premium Guide Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 card-shadow flex gap-4">
                <div className="h-12 w-12 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0 text-yellow-500 font-bebas text-2xl font-bold">
                  01
                </div>
                <div>
                  <h3 className="font-bold text-dark-text text-sm">CHOOSE CITY & MODE</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Select your city to query exact real-time branch operating hours, local menus, and active coupon structures.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 card-shadow flex gap-4">
                <div className="h-12 w-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0 text-pizza-red font-bebas text-2xl font-bold">
                  02
                </div>
                <div>
                  <h3 className="font-bold text-dark-text text-sm">ENJOY MAXIMUM SIZZLE</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Once customized, our dedicated high-retaining heat bags or prompt pickup service ensures bubbling fresh results!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Side Info Cards (takes 1 column) */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-dark-text to-slate-900 text-white p-8 rounded-3xl card-shadow relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10">
                <MapPin size={200} className="-mr-10 -mt-10" />
              </div>
              <h3 className="font-bebas text-3xl tracking-wide uppercase mb-2">
                Fast Food GUARANTEE
              </h3>
              <p className="text-gray-300 text-xs leading-relaxed mb-6 font-light">
                Every single order dispatched goes through meticulous culinary standard checks. Double-baked crust, premium temperature insulation, and certified touchless handovers.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-yellow-accent shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold">100% ISO Hygiene Approved</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-yellow-accent shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold">Under 30-Min High Express Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star size={18} className="text-yellow-accent shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold">4.9 Star Verified Local Rating</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-accent/10 border border-yellow-accent/20 p-6 rounded-2xl text-dark-text">
              <div className="flex items-center gap-2 text-yellow-600 mb-2 font-bold font-mono text-xs">
                <Heart size={14} className="animate-pulse" />
                <span>HOT & READY 24/7</span>
              </div>
              <h4 className="font-bold text-sm">Direct Ordering Helpline</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Got a customized party catering requirement or bulky high-volume burger delivery requested for your events? Pick up the phone and dial <strong>0305-8883788</strong> directly!
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
