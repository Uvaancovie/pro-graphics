"use client";

import { motion } from "framer-motion";

export function ReviewBadge() {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 left-6 z-50 hidden md:flex items-center gap-3 bg-white p-3 rounded-2xl shadow-2xl border border-gray-100 hover:scale-105 transition-transform cursor-pointer group"
      onClick={() => window.open('https://www.google.com/search?q=Pro+Graphics+Durban+reviews', '_blank')}
    >
      <div className="bg-amber-500 p-2 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <div>
        <div className="flex gap-0.5 mb-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-amber-500"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <div className="text-xs font-bold text-blue-950">4.8 Rating on Google</div>
        <div className="text-[10px] text-gray-400 group-hover:text-amber-600 transition-colors">See 50+ Happy Reviews</div>
      </div>
    </motion.div>
  );
}
