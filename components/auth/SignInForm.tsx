"use client";

import { useState } from "react";
import { SignInFormData } from "@/types";
import { EyeIcon, MailIcon } from "@/components/ui/Icons";
import { SocialButtons, Divider } from "@/components/auth/AuthShared";

const iCls =
  "w-full px-4 py-3 pr-10 bg-white border border-gray-200 rounded-xl text-gray-900 text-[14px] placeholder-gray-400 outline-none focus:border-[#AAFF00] focus:ring-2 focus:ring-[#AAFF00]/20 transition-all duration-200";
const lCls =
  "text-[12px] font-semibold text-gray-500 mb-1.5 block uppercase tracking-wide";

interface SignInFormProps {
  onSwitch: () => void;
  onSubmit?: (data: SignInFormData) => void;
}

export default function SignInForm({ onSwitch, onSubmit }: SignInFormProps) {
  const [showPw, setShowPw] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <SocialButtons />
      <Divider />

      {/* Email */}
      <div>
        <label className={lCls}>Email</label>
        <div className="relative">
          <input
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className={iCls}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <MailIcon />
          </span>
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className={lCls} style={{ marginBottom: 0 }}>
            Password
          </label>
          <button
            type="button"
            className="text-[12px] text-[#7CB800] font-semibold bg-transparent border-none cursor-pointer"
          >
            Forgot?
          </button>
        </div>
        <div className="relative">
          <input
            name="password"
            type={showPw ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className={iCls}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 bg-transparent border-none cursor-pointer p-0"
          >
            <EyeIcon open={showPw} />
          </button>
        </div>
      </div>

      {/* CTA */}
      <button
        type="submit"
        className="w-full py-3.5 bg-[#111] text-white text-[14px] font-bold rounded-2xl border-none cursor-pointer hover:bg-[#222] transition-colors mt-1"
      >
        Sign In
      </button>

      <p className="text-center text-[13px] text-gray-500">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-[#7CB800] font-bold bg-transparent border-none cursor-pointer text-[13px]"
        >
          Sign Up
        </button>
      </p>
    </form>
  );
}
