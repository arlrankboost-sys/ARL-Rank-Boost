import React, { useState } from "react";
import { Review } from "../types";
import { REVIEWS } from "../data/pizzaData";
import { Star, MessageSquarePlus, MessageSquare, CheckCircle2 } from "lucide-react";

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    city: "Islamabad",
    comment: ""
  });
  const [success, setSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const submitted: Review = {
      id: `custom-r-${Date.now()}`,
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      city: newReview.city,
      date: "Just now"
    };

    setReviewsList([submitted, ...reviewsList]);
    setSuccess(true);
    setNewReview({
      name: "",
      rating: 5,
      city: "Islamabad",
      comment: ""
    });

    setTimeout(() => {
      setSuccess(false);
      setShowReviewForm(false);
    }, 2500);
  };

  const citiesList = ["Islamabad", "Rawalpindi", "Lahore", "Karachi", "Faisalabad", "Peshawar", "Multan"];

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-gray-100 pb-8">
          <div>
            <span className="block text-pizza-red font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Star size={12} className="fill-pizza-red text-pizza-red" /> LOVED BY LOCAL COMMUNITIES
            </span>
            <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-dark-text leading-[0.95] tracking-tight">
              CUSTOMER <span className="text-pizza-red">TESTIMONIALS</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1 max-w-xl">
              Don't take our word for it. Here’s why thousands of pizza connoisseurs crown Al Jannat Fast Food as their supreme slice benchmark.
            </p>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="mt-6 md:mt-0 bg-dark-text hover:bg-pizza-red text-white font-semibold text-xs py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 transform active:scale-95"
          >
            <MessageSquarePlus size={16} />
            <span>WRITE A REVIEW</span>
          </button>
        </div>

        {/* Interactive write a review collapsible form */}
        {showReviewForm && (
          <div className="mb-12 bg-soft-gray bg-gradient-to-r from-gray-50 to-white border border-gray-150 p-6 sm:p-8 rounded-3xl max-w-2xl mx-auto shadow-inner animate-fadeIn">
            {success ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-bebas text-2xl text-dark-text">Review Published Successfully!</h3>
                <p className="text-xs text-gray-500">
                  Thank you for sharing your experience. Your feedback keeps our food quality supreme!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <h3 className="font-bebas text-2xl text-dark-text border-b border-gray-200 pb-2">We Value Your Pizza Slices Feedback</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Your Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="E.g., Hamza Ahmed"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full bg-white border border-gray-200 focus:border-pizza-red focus:outline-none rounded-xl py-3 px-4 text-xs sm:text-sm text-dark-text"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Rating (1 - 5 stars)</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full bg-white border border-gray-200 focus:border-pizza-red focus:outline-none rounded-xl py-3 px-4 text-xs sm:text-sm text-dark-text font-bold"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ Excellent (5 Stars)</option>
                      <option value="4">⭐⭐⭐⭐ Great (4 Stars)</option>
                      <option value="3">⭐⭐⭐ Good (3 Stars)</option>
                      <option value="2">⭐⭐ Medium (2 Stars)</option>
                      <option value="1">⭐ Bad (1 Star)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Your City</label>
                    <select
                      value={newReview.city}
                      onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                      className="w-full bg-white border border-gray-200 focus:border-pizza-red focus:outline-none rounded-xl py-3 px-4 text-xs sm:text-sm text-dark-text font-medium"
                    >
                      {citiesList.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Review Comments</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your pizza experience, delivery speed, cheese thickness..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full bg-white border border-gray-200 focus:border-pizza-red focus:outline-none rounded-xl py-3 px-4 text-xs sm:text-sm text-dark-text"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:text-dark-text"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-pizza-red text-white px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all card-shadow btn-hover cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Reviews Cards masonry/grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-350 relative card-shadow"
            >
              <div className="space-y-4">
                {/* Formatting Stars ratings */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < rev.rating ? "fill-yellow-accent text-yellow-accent" : "text-gray-200"}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Reviewer signature */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-5 mt-6">
                <div className="flex items-center space-x-2.5">
                  <div className="h-9 w-9 bg-red-50 border border-red-100 text-pizza-red font-bold rounded-full flex items-center justify-center text-xs shadow-inner">
                    {rev.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="font-bold text-dark-text text-xs sm:text-sm leading-none">{rev.name}</h4>
                    <span className="text-[10px] text-gray-400 font-medium block mt-1">{rev.city} • Verified Customer</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest bg-soft-gray px-2 py-1 rounded">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
