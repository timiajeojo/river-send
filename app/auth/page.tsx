
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
    setTimeout(() => {
      setMode(next);
      setAnimating(false);
    }, 200);
  };

  return (
    <div className="flex flex-col min-h-svh bg-white text-gray-900">
      <div className="flex flex-col px-6 pt-6 pb-10 w-full max-w-[430px] mx-auto">

        {/* Header: back + centered logo */}
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
        <h2 className="text-[24px] font-bold tracking-tight text-gray-900 mb-1">
          {mode === "signin" ? "Welcome back 👋" : "Create account"}
        </h2>
        <p className="text-[13px] text-gray-400 leading-relaxed mb-6">
          {mode === "signin"
            ? "Sign in to manage your finances."
            : "Join thousands managing money smarter."}
        </p>

        {/* Underline tab switcher */}
        <div className="flex w-full border-b-2 border-gray-100 mb-7">
          {(["signin", "signup"] as AuthMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className={`flex-1 pb-3 text-[15px] font-semibold cursor-pointer border-none bg-transparent transition-colors duration-200 relative ${
                mode === m
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {m === "signin" ? "Sign In" : "Sign Up"}
              <span
                className="absolute bottom-[-2px] h-[2.5px] bg-[#AAFF00] rounded-full transition-all duration-300 ease-out"
                style={{
                  width: mode === m ? "40%" : "0%",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
            </button>
          ))}
        </div>

        {/* Form with fade transition */}
        <div
          className="transition-all duration-200 ease-in-out"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(6px)" : "translateY(0)",
          }}
        >
          {mode === "signin" ? (
            <SignInForm onSwitch={() => switchMode("signup")} />
          ) : (
            <SignUpForm onSwitch={() => switchMode("signin")} />
          )}
        </div>

      </div>
    </div>
  );
}
