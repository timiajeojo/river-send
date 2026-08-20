"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Slide } from "@/types";

const slides: Slide[] = [
  {
    headline: "Banking Built Just",
    accent: "For You",
    sub: "Smart, secure and seamless banking for your everyday life.",
  },
  {
    headline: "Send Money Anywhere",
    accent: "Instantly",
    sub: "Transfer funds locally or internationally with zero fees this month.",
  },
  {
    headline: "Your Money, Your",
    accent: "Control",
    sub: "Track spending, manage cards, and grow your savings all in one place.",
  },
];

export default function GetStartedPage() {
  const router = useRouter();
  const [active, setActive] = useState<number>(0);
  const [fading, setFading] = useState<boolean>(false);

  useEffect(() => {
    const t = setTimeout(() => goTo((active + 1) % slides.length), 4000);
    return () => clearTimeout(t);
  }, [active]);

  const goTo = (idx: number): void => {
    if (idx === active) return;
    setFading(true);
    setTimeout(() => { setActive(idx); setFading(false); }, 300);
  };

  return (
    <div className="min-h-svh w-full bg-[#0a0a0a]">

      {/* ════════════════════════════════════════
          MOBILE  (< md)  — full screen hero
      ════════════════════════════════════════ */}
      <div className="flex flex-col min-h-svh md:hidden">

        {/* Photo */}
        <div className="relative flex-1 min-h-0">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=85&auto=format&fit=crop&crop=top"
              alt="hero"
              className="w-full h-full object-cover object-top"
            />
          </div>
          {/* Lime arc */}
          <div className="absolute inset-0 pointer-events-none z-[2]">
            <svg className="absolute" style={{ left: "-18%", top: "8%", width: "110%" }} viewBox="0 0 500 520" fill="none">
              <ellipse cx="210" cy="270" rx="195" ry="195" stroke="#AAFF00" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="900" strokeDashoffset="300" />
            </svg>
          </div>
          {/* Fade */}
          <div className="absolute inset-0 z-[3]" style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 40%,rgba(0,0,0,0.75) 68%,#0a0a0a 100%)" }} />
        </div>

        {/* Bottom content */}
        <div className="relative z-10 bg-[#0a0a0a] flex flex-col items-center text-center px-7 pb-10 pt-2 shrink-0">
          <div className={`mb-5 transition-all duration-300 ease-in-out ${fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
            <h1 className="text-white text-[28px] font-extrabold leading-[1.15] tracking-tight">
              {slides[active].headline}
            </h1>
            <span className="block text-[#AAFF00] text-[28px] font-extrabold leading-[1.15] tracking-tight mb-3">
              {slides[active].accent}
            </span>
            <div className="w-8 h-[3px] bg-[#AAFF00] rounded-full mx-auto mb-3" />
            <p className="text-white/50 text-[14px] leading-relaxed max-w-[280px] mx-auto">
              {slides[active].sub}
            </p>
          </div>
          <div className="flex items-center gap-2 mb-6">
            {slides.map((_, i) => (
              <button key={i} type="button" onClick={() => goTo(i)}
                className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${i === active ? "w-6 bg-[#AAFF00]" : "w-2 bg-[#444]"}`}
              />
            ))}
          </div>
          <button type="button" onClick={() => router.push("/auth")}
            className="w-full py-4 bg-[#AAFF00] text-black text-[16px] font-bold rounded-2xl border-none cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all duration-200">
            Get Started
          </button>
          <p className="mt-3 text-[13px] text-[#666]">
            Already have an account?{" "}
            <button type="button" onClick={() => router.push("/auth")}
              className="text-[#AAFF00] font-semibold bg-transparent border-none cursor-pointer text-[13px]">
              Sign In
            </button>
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════
          TABLET  (md – lg)  — centered card
      ════════════════════════════════════════ */}
      <div className="hidden md:flex lg:hidden min-h-svh items-center justify-center p-8">
        <div className="relative flex flex-col w-full max-w-[420px] min-h-[700px] rounded-[44px] overflow-hidden shadow-[0_48px_120px_rgba(0,0,0,0.8)]">

          {/* Photo */}
          <div className="relative flex-1 min-h-[420px]">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=85&auto=format&fit=crop&crop=top"
                alt="hero"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute inset-0 pointer-events-none z-[2]">
              <svg className="absolute" style={{ left: "-18%", top: "8%", width: "110%" }} viewBox="0 0 500 520" fill="none">
                <ellipse cx="210" cy="270" rx="195" ry="195" stroke="#AAFF00" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="900" strokeDashoffset="300" />
              </svg>
            </div>
            <div className="absolute inset-0 z-[3]" style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 40%,rgba(0,0,0,0.75) 68%,#0a0a0a 100%)" }} />
          </div>

          {/* Bottom */}
          <div className="relative z-10 bg-[#0a0a0a] flex flex-col items-center text-center px-10 pb-10 pt-2 shrink-0">
            <div className={`mb-5 transition-all duration-300 ease-in-out ${fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
              <h1 className="text-white text-[32px] font-extrabold leading-[1.15] tracking-tight">
                {slides[active].headline}
              </h1>
              <span className="block text-[#AAFF00] text-[32px] font-extrabold leading-[1.15] tracking-tight mb-3">
                {slides[active].accent}
              </span>
              <div className="w-8 h-[3px] bg-[#AAFF00] rounded-full mx-auto mb-3" />
              <p className="text-white/50 text-[15px] leading-relaxed max-w-[300px] mx-auto">
                {slides[active].sub}
              </p>
            </div>
            <div className="flex items-center gap-2 mb-6">
              {slides.map((_, i) => (
                <button key={i} type="button" onClick={() => goTo(i)}
                  className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${i === active ? "w-6 bg-[#AAFF00]" : "w-2 bg-[#444]"}`}
                />
              ))}
            </div>
            <button type="button" onClick={() => router.push("/auth")}
              className="w-full py-4 bg-[#AAFF00] text-black text-[16px] font-bold rounded-2xl border-none cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all duration-200">
              Get Started
            </button>
            <p className="mt-3 text-[13px] text-[#666]">
              Already have an account?{" "}
              <button type="button" onClick={() => router.push("/auth")}
                className="text-[#AAFF00] font-semibold bg-transparent border-none cursor-pointer text-[13px]">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          DESKTOP  (lg+)  — two column split
      ════════════════════════════════════════ */}
      <div className="hidden lg:flex min-h-svh">

        {/* Left — full height photo */}
        <div className="relative flex-1 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=85&auto=format&fit=crop&crop=top"
            alt="hero"
            className="w-full h-full object-cover object-top"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80" />
          {/* Lime arc */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="absolute" style={{ left: "-5%", top: "10%", width: "75%" }} viewBox="0 0 500 520" fill="none">
              <ellipse cx="210" cy="270" rx="195" ry="195" stroke="#AAFF00" strokeWidth="2" strokeLinecap="round" strokeDasharray="900" strokeDashoffset="300" />
            </svg>
          </div>
          {/* Logo */}
          <div className="absolute top-10 left-10 flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#AAFF00] flex items-center justify-center text-black text-xl font-black">R</div>
            <span className="text-white text-[22px] font-extrabold tracking-tight">Riverpay</span>
          </div>
          {/* Bottom text */}
          <div className="absolute bottom-12 left-10 right-10">
            <div className={`transition-all duration-300 ${fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
              <h1 className="text-white text-[48px] xl:text-[56px] font-extrabold leading-[1.1] tracking-[-0.03em] mb-3">
                {slides[active].headline}<br />
                <span className="text-[#AAFF00]">{slides[active].accent}</span>
              </h1>
              <div className="w-10 h-[3px] bg-[#AAFF00] rounded-full mb-4" />
              <p className="text-white/60 text-[16px] leading-relaxed max-w-[360px]">
                {slides[active].sub}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-6">
              {slides.map((_, i) => (
                <button key={i} type="button" onClick={() => goTo(i)}
                  className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${i === active ? "w-8 bg-[#AAFF00]" : "w-2 bg-white/30"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right — CTA panel */}
        <div className="w-[460px] xl:w-[520px] shrink-0 bg-[#0a0a0a] flex flex-col justify-center px-12 xl:px-16 py-16">

          {/* Stats */}
          <div className="flex gap-8 mb-12">
            {[
              { val: "$2B+",  label: "Transferred" },
              { val: "2M+",   label: "Users" },
              { val: "0 Fees",label: "This Month" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-[22px] font-bold text-[#AAFF00]">{s.val}</span>
                <span className="text-[11px] text-[#666] uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Copy */}
          <p className="text-[#AAFF00] text-[13px] font-semibold uppercase tracking-widest mb-3">
            Get Started Today
          </p>
          <h2 className="text-white text-[32px] xl:text-[38px] font-extrabold tracking-tight leading-[1.15] mb-4">
            Banking built<br />for your life
          </h2>
          <p className="text-white/40 text-[15px] leading-relaxed mb-10 max-w-[320px]">
            Join millions managing money smarter with Riverpay. Fast, secure, and always free.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <button type="button" onClick={() => router.push("/auth")}
              className="w-full py-4 bg-[#AAFF00] text-black text-[16px] font-bold rounded-2xl border-none cursor-pointer hover:opacity-90 transition-opacity">
              Create Free Account
            </button>
            <button type="button" onClick={() => router.push("/auth")}
              className="w-full py-4 bg-white/8 text-white text-[16px] font-semibold rounded-2xl border border-white/10 cursor-pointer hover:bg-white/15 transition-colors">
              Sign In
            </button>
          </div>

          {/* Trust */}
          <p className="mt-8 text-[12px] text-white/25 text-center">
            🔒 Bank-level security · No hidden fees · Cancel anytime
          </p>
        </div>
      </div>

    </div>
  );
}
