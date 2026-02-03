// src/app/review/page.js

"use client";
import { useState } from "react";
import { Star, Send, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Animated Star Rating Component
const StarRating = ({ rating, hoverRating, setRating, setHoverRating }) => {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = (hoverRating || rating) >= star;
        return (
          <motion.div
            key={star}
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Star
              size={40}
              className={`cursor-pointer transition-all duration-200 ${
                isActive 
                  ? "text-yellow-400 fill-yellow-400 drop-shadow-lg" 
                  : "text-gray-300 hover:text-yellow-200"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

// Rating Label Component
const RatingLabel = ({ rating }) => {
  const labels = {
    1: { text: "Poor", color: "text-red-600", emoji: "😞" },
    2: { text: "Fair", color: "text-orange-600", emoji: "😕" },
    3: { text: "Good", color: "text-yellow-600", emoji: "😊" },
    4: { text: "Very Good", color: "text-lime-600", emoji: "😄" },
    5: { text: "Excellent", color: "text-green-600", emoji: "🤩" }
  };

  if (!rating) return null;

  const label = labels[rating];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-2 ${label.color} font-semibold text-lg`}
    >
      <span className="text-2xl">{label.emoji}</span>
      <span>{label.text}</span>
    </motion.div>
  );
};

// Success Message Component
const SuccessMessage = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", duration: 0.6 }}
    className="relative overflow-hidden"
  >
    {/* Animated Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
    
    {/* Sparkle Effect */}
    <div className="absolute top-4 right-4 animate-pulse">
      <Sparkles className="text-yellow-400" size={24} />
    </div>
    
    <div className="relative p-10 text-center">
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg mb-6"
      >
        <CheckCircle className="text-white" size={48} strokeWidth={3} />
      </motion.div>

      {/* Success Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-3">Thank You!</h3>
        <p className="text-lg text-gray-600 mb-6">
          Your review has been submitted successfully.
        </p>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md border-2 border-green-200">
          <span className="text-2xl">🎉</span>
          <span className="text-sm font-semibold text-gray-700">Your feedback helps others!</span>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export default function ReviewForm({ slug, onReviewSubmitted }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setStatus({ message: "Please select a star rating.", type: "error" });
      return;
    }

    setIsSubmitting(true);
    setStatus({ message: "", type: "" });

    try {
      const res = await fetch(`/api/doctors/${slug}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });

      if (res.status === 401) {
        setStatus({ 
          message: "Please log in to submit a review.", 
          type: "error" 
        });
        // Optional redirect could be handled here
        return;
      }

      const data = await res.json();
      setStatus({ message: data.message, type: res.ok ? "success" : "error" });

      if (res.ok) {
        setIsSubmitted(true);
        // Call the parent callback if provided
        if (onReviewSubmitted) {
          onReviewSubmitted({ rating, comment });
        }
      }

    } catch (err) {
      setStatus({ 
        message: "An unexpected error occurred. Please try again.", 
        type: "error" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden">
        <SuccessMessage />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-xl border border-gray-200 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-100 rounded-full blur-3xl opacity-20 -z-10"></div>

      <div className="relative p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
              <Star className="text-white" size={24} />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Write a Review
            </h3>
          </div>
          <p className="text-gray-600">Share your experience and help others make informed decisions</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Star Rating Section */}
          <div className="flex flex-col items-center space-y-4">
            <label className="text-base font-semibold text-gray-700">
              How would you rate your experience?
            </label>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <StarRating
                rating={rating}
                hoverRating={hoverRating}
                setRating={setRating}
                setHoverRating={setHoverRating}
              />
            </div>

            <AnimatePresence mode="wait">
              {rating > 0 && (
                <RatingLabel rating={rating} />
              )}
            </AnimatePresence>
          </div>

          {/* Comment Section */}
          <div className="space-y-3">
            <label htmlFor="comment" className="block text-base font-semibold text-gray-700">
              Share Your Thoughts
              <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
            </label>
            
            <div className="relative">
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience with this doctor. What did you like? What could be improved?"
                rows="5"
                className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-white"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {comment.length} characters
              </div>
            </div>
          </div>

          {/* Status Message */}
          <AnimatePresence>
            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 ${
                  status.type === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-700' 
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <p className="text-sm font-medium">{status.message}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || rating === 0}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-base font-bold shadow-lg transition-all duration-300 ${
              isSubmitting || rating === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-3 border-white border-t-transparent rounded-full"
                />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Submit Review</span>
              </>
            )}
          </motion.button>

          {/* Helper Text */}
          {rating === 0 && (
            <p className="text-center text-sm text-gray-500 italic">
              Please select a rating to enable submission
            </p>
          )}
        </form>
      </div>
    </motion.div>
  );
}