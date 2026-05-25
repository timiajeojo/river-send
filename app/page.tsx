"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Slide } from "@/types";

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
    setTimeout(() => {
      setActive(idx);
      setFading(false);
    }, 300);
  };

  return (
    <div className="relative flex flex-col min-h-svh w-full max-w-[430px] mx-auto bg-[#0a0a0a] overflow-hidden">

      {/* Hero photo */}
      <div className="relative flex-1 min-h-0">
        <div className="absolute inset-0 overflow-hidden">
          {/*
            Replace with Next.js <Image> using your own photo:
            import Image from "next/image"
            <Image src="/hero.jpg" alt="hero" fill className="object-cover object-top" priority />
          */}
          <img
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=85&auto=format&fit=crop&crop=top"
            alt="hero"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Lime arc overlay */}
        <div className="absolute inset-0 pointer-events-none z-[2]">
          <svg
            className="absolute"
            style={{ left: "-18%", top: "8%", width: "110%" }}
            viewBox="0 0 500 520"
            fill="none"
          >
            <ellipse
              cx="210"
              cy="270"
              rx="195"
              ry="195"
              stroke="#AAFF00"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="900"
              strokeDashoffset="300"
            />
          </svg>
        </div>

        {/* Gradient fade to black */}
        <div
          className="absolute inset-0 z-[3]"
          style={{
            background:
              "linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 40%,rgba(0,0,0,0.75) 68%,#0a0a0a 100%)",
          }}
        />
      </div>

      {/* Bottom content */}
      <div className="relative z-10 bg-[#0a0a0a] flex flex-col items-center text-center px-7 pb-10 shrink-0">

        {/* Animated slide text */}
        <div
          className={`mb-5 transition-all duration-300 ease-in-out ${
            fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          <h1 className="text-white text-[28px] font-extrabold leading-[1.15] tracking-tight">
            {slides[active].headline}
          </h1>
          <span className="block text-[#AAFF00] text-[28px] font-extrabold leading-[1.15] tracking-tight mb-3">
            {slides[active].accent}
          </span>
          <div className="w-8 h-[3px] bg-[#AAFF00] rounded-full mx-auto mb-3" />
          <p className="text-white/50 text-[14px] leading-relaxed max-w-[260px] mx-auto">
            {slides[active].sub}
          </p>
        </div>

        {/* Slide dots */}
        <div className="flex items-center gap-2 mb-5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${
                i === active ? "w-6 bg-[#AAFF00]" : "w-2 bg-[#444]"
              }`}
            />
          ))}
        </div>

        {/* Get Started CTA */}
        <button
          type="button"
          onClick={() => router.push("/auth")}
          className="w-full py-4 bg-[#AAFF00] text-black text-[16px] font-bold rounded-2xl border-none cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
        >
          Get Started
        </button>

        <p className="mt-3 text-[13px] text-[#666]">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/auth")}
            className="text-[#AAFF00] font-semibold bg-transparent border-none cursor-pointer text-[13px]"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
