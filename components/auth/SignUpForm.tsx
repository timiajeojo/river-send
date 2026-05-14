"use client";

import { useState } from "react";
import { SignUpFormData } from "@/types";
import { EyeIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { SocialButtons, Divider } from "@/components/auth/AuthShared";

const iCls =
  "w-full px-4 py-3 pr-10 bg-white border border-gray-200 rounded-xl text-gray-900 text-[14px] placeholder-gray-400 outline-none focus:border-[#AAFF00] focus:ring-2 focus:ring-[#AAFF00]/20 transition-all duration-200";
const lCls =
  "text-[12px] font-semibold text-gray-500 mb-1.5 block uppercase tracking-wide";

interface SignUpFormProps {
  onSwitch: () => void;
  onSubmit?: (data: SignUpFormData) => void;
}

export default function SignUpForm({ onSwitch, onSubmit }: SignUpFormProps) {
  const [showPw, setShowPw] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 w-full">
      <SocialButtons />
      <Divider />

      {/* Name row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lCls}>First Name</label>
          <input
            name="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange}
            required
            className={iCls}
          />
        </div>
        <div>
          <label className={lCls}>Last Name</label>
          <input
            name="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
            required
            className={iCls}
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className={lCls}>Phone</label>
        <div className="relative">
          <input
            name="phone"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={handleChange}
            required
            className={iCls}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <PhoneIcon />
          </span>
        </div>
      </div>

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
        <label className={lCls}>Password</label>
        <div className="relative">
          <input
            name="password"
            type={showPw ? "text" : "password"}
            placeholder="Create a password"
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

      {/* Confirm Password */}
      <div>
        <label className={lCls}>Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className={iCls}
        />
      </div>

      {/* Terms */}
      <label className="flex items-start gap-2.5 text-[12px] text-gray-500 leading-relaxed cursor-pointer">
        <input
          type="checkbox"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
          required
          className="mt-0.5 w-4 h-4 accent-[#AAFF00] cursor-pointer shrink-0"
        />
        I agree to the{" "}
        <span className="text-[#7CB800] font-semibold cursor-pointer">
          Terms of Service
        </span>{" "}
        and{" "}
        <span className="text-[#7CB800] font-semibold cursor-pointer">
          Privacy Policy
        </span>
      </label>

      {/* CTA */}
      <button
        type="submit"
        className="w-full py-3.5 bg-[#111] text-white text-[14px] font-bold rounded-2xl border-none cursor-pointer hover:bg-[#222] transition-colors"
      >
        Create Account
      </button>

      <p className="text-center text-[13px] text-gray-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-[#7CB800] font-bold bg-transparent border-none cursor-pointer text-[13px]"
        >
          Sign In
        </button>
      </p>
    </form>
  );
}
