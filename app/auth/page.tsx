
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthMode } from "@/types";
import Logo from "@/components/ui/Logo";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [animating, setAnimating] = useState<boolean>(false);

  const switchMode = (next: AuthMode): void => {
    if (next === mode) return;
    setAnimating(true);
    setTimeout(() => { setMode(next); setAnimating(false); }, 200);
  };

  return (
    <div className="min-h-svh w-full bg-gray-50 flex items-center justify-center p-0 sm:p-6">
      <div className="flex w-full min-h-svh sm:min-h-0 sm:max-w-[480px] sm:rounded-3xl sm:shadow-xl bg-white overflow-hidden lg:max-w-[960px]">

        {/* LEFT PANEL — decorative, desktop only */}
        <div className="hidden lg:flex flex-col justify-end flex-1 relative bg-[#0d0d0d] overflow-hidden p-14">
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(170,255,0,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 20%, rgba(170,255,0,0.06) 0%, transparent 60%)" }}
          />
          {/* Wave rings */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <svg viewBox="0 0 600 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice" fill="none">
              {[0,40,80,120,160,200,240,280,320].map((offset, i) => (
                <ellipse key={i} cx="300" cy={400 + offset} rx={280 - i * 8} ry={200 - i * 10} stroke="rgba(170,255,0,0.2)" strokeWidth="1.2" />
              ))}
            </svg>
          </div>
          {/* Badge */}
          <div className="relative inline-flex items-center gap-2 bg-[rgba(170,255,0,0.1)] border border-[rgba(170,255,0,0.3)] rounded-full px-4 py-2 text-[13px] font-medium text-[#AAFF00] mb-8 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#AAFF00] animate-pulse" />
            Trusted by 2M+ users worldwide
          </div>
          {/* Headline */}
          <h1 className="relative text-[42px] xl:text-[52px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white mb-5">
            Banking Built<br />
            <span className="text-[#AAFF00]">Just For You</span>
          </h1>
          <p className="relative text-[16px] text-[#888] leading-[1.65] max-w-[380px] mb-12">
            Smart, secure and seamless banking for your everyday life.
          </p>
          {/* Stats */}
          <div className="relative flex gap-8">
            {[{ val: "$2B+", label: "Transferred" }, { val: "99.9%", label: "Uptime" }, { val: "0 Fees", label: "This Month" }].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-[26px] font-bold text-[#AAFF00]">{s.val}</span>
                <span className="text-[12px] text-[#888] uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL — form */}
        <div className="flex flex-col w-full lg:max-w-[480px] px-6 pt-6 pb-10 sm:px-8 md:px-10 overflow-y-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-7">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 cursor-pointer border-none hover:bg-gray-200 transition-colors"
            >
              <ArrowLeftIcon />
            </button>
            <Logo dark />
            <div className="w-9" />
          </div>

          {/* Greeting */}
          <h2 className="text-[24px] sm:text-[26px] font-bold tracking-tight text-gray-900 mb-1">
            {mode === "signin" ? "Welcome back 👋" : "Create account"}
          </h2>
          <p className="text-[13px] text-gray-400 leading-relaxed mb-6">
            {mode === "signin" ? "Sign in to manage your finances." : "Join thousands managing money smarter."}
          </p>

          {/* Tab switcher */}
          <div className="flex w-full border-b-2 border-gray-100 mb-7">
            {(["signin", "signup"] as AuthMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`flex-1 pb-3 text-[15px] font-semibold cursor-pointer border-none bg-transparent transition-colors duration-200 relative ${mode === m ? "text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
              >
                {m === "signin" ? "Sign In" : "Sign Up"}
                <span
                  className="absolute bottom-[-2px] h-[2.5px] bg-[#AAFF00] rounded-full transition-all duration-300 ease-out"
                  style={{ width: mode === m ? "40%" : "0%", left: "50%", transform: "translateX(-50%)" }}
                />
              </button>
            ))}
          </div>

          {/* Form */}
          <div
            className="transition-all duration-200 ease-in-out"
            style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(6px)" : "translateY(0)" }}
          >
            {mode === "signin"
              ? <SignInForm onSwitch={() => switchMode("signup")} />
              : <SignUpForm onSwitch={() => switchMode("signin")} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
