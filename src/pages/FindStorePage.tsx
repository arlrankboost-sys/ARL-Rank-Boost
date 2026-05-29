import OrderBox from "../components/OrderBox";
import { StoreBranch } from "../types";

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
    <div className="pt-32 pb-16 animate-fadeIn min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-pizza-red font-mono text-xs sm:text-sm uppercase tracking-widest font-bold block mb-2">
            📍 STORE LOCATOR & ORDER MODE
          </span>
          <h1 className="font-bebas text-5xl sm:text-6xl text-dark-text tracking-tight uppercase leading-none">
            FIND YOUR NEAREST <span className="text-pizza-red">OUTLET</span>
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto font-sans leading-relaxed">
            Select standard high-speed home delivery or select your favorite branch for swift pickup. Fresh hot dough is rolling 24/7!
          </p>
        </div>

        <OrderBox
          onOrderTypeChange={onOrderTypeChange}
          selectedType={orderType}
          selectedStore={selectedStore}
          onSelectStore={onSelectStore}
        />
      </div>
    </div>
  );
}
