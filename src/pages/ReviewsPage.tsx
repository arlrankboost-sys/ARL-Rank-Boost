import Reviews from "../components/Reviews";

export default function ReviewsPage() {
  return (
    <div className="pt-32 pb-16 animate-fadeIn min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="text-pizza-red font-mono text-xs sm:text-sm uppercase tracking-widest font-bold block mb-2">
            ⭐ WHAT FEEDBACK SAYS
          </span>
          <h1 className="font-bebas text-5xl sm:text-6xl text-dark-text tracking-tight uppercase leading-none">
            CUSTOMER <span className="text-pizza-red">TESTIMONIALS</span>
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto font-sans leading-relaxed">
            See actual ratings and photos posted by our local pizza and fast food connoisseurs in Sargodha district, raw and direct!
          </p>
        </div>

        <Reviews />
      </div>
    </div>
  );
}
