"use client"

import { useState } from "react";

function WavePattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 340 160"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      {[0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120].map((offset, i) => (
        <path
          key={i}
          d={`M-20 ${90 + offset} Q85 ${60 + offset} 170 ${90 + offset} T360 ${90 + offset}`}
          stroke={i % 3 === 0 ? "#AAFF00" : "#2a2a2a"}
          strokeWidth={i % 3 === 0 ? "0.8" : "0.5"}
          opacity={i % 3 === 0 ? 0.5 : 0.25}
        />
      ))}
    </svg>
  );
}

export default function BalanceCard() {
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <div className="relative bg-[#111] rounded-[24px] p-5 mb-5 overflow-hidden min-h-[160px]">
      <WavePattern />

      <div className="relative z-10">
        {/* Top row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <p className="text-[13px] text-gray-400 font-medium">Available Balance</p>
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              className="text-gray-400 bg-transparent border-none cursor-pointer p-0"
            >
              {visible ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              )}
            </button>
          </div>

          {/* Card icon */}
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
          </div>
        </div>

        {/* Balance amount */}
        <div className="mb-5">
          {visible ? (
            <p className="text-white font-extrabold tracking-tight text-[38px] leading-none">
              $8,630<span className="text-[24px] text-gray-400">.25</span>
            </p>
          ) : (
            <p className="text-white font-extrabold text-[38px] leading-none tracking-widest">
              ••••••
            </p>
          )}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-white text-[13px] font-medium border-none cursor-pointer hover:bg-white/15 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            Accounts
          </button>

          <button
            type="button"
            className="w-10 h-10 rounded-full bg-[#AAFF00] flex items-center justify-center border-none cursor-pointer hover:opacity-90 transition-opacity"
          >
            <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
