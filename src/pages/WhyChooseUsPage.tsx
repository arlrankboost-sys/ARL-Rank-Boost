import WhyChooseUs from "../components/WhyChooseUs";

export default function WhyChooseUsPage() {
  return (
    <div className="pt-32 pb-16 animate-fadeIn min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="text-pizza-red font-mono text-xs sm:text-sm uppercase tracking-widest font-bold block mb-2">
            ✨ METICULOUS HYGIENE & FLAVOR
          </span>
          <h1 className="font-bebas text-5xl sm:text-6xl text-dark-text tracking-tight uppercase leading-none">
            WHY WE ARE THE <span className="text-pizza-red">PREMIUM BENCHMARK</span>
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto font-sans leading-relaxed">
            We operate with rigorous ISO 9001 culinary certifications. Real ingredients, fully transparent open kitchens, and a standard-setting delivery guarantee.
          </p>
        </div>

        <WhyChooseUs />
      </div>
    </div>
  );
}
