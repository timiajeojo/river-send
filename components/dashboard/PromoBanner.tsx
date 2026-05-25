// components/dashboard/PromoBanner.tsx
"use client";

import { useState } from "react";

export default function PromoBanner() {
  const [visible, setVisible] = useState<boolean>(true);

  if (!visible) return null;

  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-5 flex items-center gap-3">
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-[#2a2a2a] flex items-center justify-center shrink-0">
        <svg
          className="w-5 h-5 text-[#AAFF00]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-[13px] font-medium leading-snug">
          Send money internationally with zero fees this month.
        </p>
        <p className="text-[#AAFF00] text-[11px] font-semibold mt-0.5">
          Limited time offer
        </p>
      </div>

      {/* Dismiss */}
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="text-gray-500 bg-transparent border-none cursor-pointer p-1 hover:text-gray-300 transition-colors shrink-0"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
