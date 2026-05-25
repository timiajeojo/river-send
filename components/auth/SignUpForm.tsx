"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp, signInWithGoogle } from "@/lib/auth";
import { EyeIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { GoogleIcon, AppleIcon } from "@/components/ui/Icons";
import { Divider } from "@/components/auth/AuthShared";

const iCls =
  "w-full px-4 py-3 pr-10 bg-white border border-gray-200 rounded-xl text-gray-900 text-[14px] placeholder-gray-400 outline-none focus:border-[#AAFF00] focus:ring-2 focus:ring-[#AAFF00]/20 transition-all duration-200";
const lCls =
  "text-[12px] font-semibold text-gray-500 mb-1.5 block uppercase tracking-wide";

interface SignUpFormProps {
  onSwitch: () => void;
}

export default function SignUpForm({ onSwitch }: SignUpFormProps) {
  const router = useRouter();
  const [showPw, setShowPw]   = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError]     = useState<string>("");

  const [fields, setFields] = useState({
    firstName:       "",
    lastName:        "",
    phone:           "",
    email:           "",
    password:        "",
    confirmPassword: "",
    agree:           false,
  });

  const set = (key: string, value: string | boolean) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");

    if (fields.password !== fields.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (fields.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await signUp(fields.email, fields.password);
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Sign up failed.";
      setError(friendlyError(msg));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async (): Promise<void> => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Google sign in failed.";
      setError(friendlyError(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 w-full">

      {/* Social buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 text-[13px] font-medium cursor-pointer hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <GoogleIcon /> Google
        </button>
        <button
          type="button"
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 text-[13px] font-medium cursor-pointer hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <AppleIcon /> Apple
        </button>
      </div>

      <Divider />

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-[13px] text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* Name */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lCls}>First Name</label>
          <input
            placeholder="John"
            value={fields.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            required
            className={iCls}
          />
        </div>
        <div>
          <label className={lCls}>Last Name</label>
          <input
            placeholder="Doe"
            value={fields.lastName}
            onChange={(e) => set("lastName", e.target.value)}
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
            placeholder="+1 (555) 000-0000"
            value={fields.phone}
            onChange={(e) => set("phone", e.target.value)}
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
            type="email"
            placeholder="name@example.com"
            value={fields.email}
            onChange={(e) => set("email", e.target.value)}
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
            type={showPw ? "text" : "password"}
            placeholder="Create a password"
            value={fields.password}
            onChange={(e) => set("password", e.target.value)}
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
          type="password"
          placeholder="Re-enter your password"
          value={fields.confirmPassword}
          onChange={(e) => set("confirmPassword", e.target.value)}
          required
          className={iCls}
        />
      </div>

      {/* Terms */}
      <label className="flex items-start gap-2.5 text-[12px] text-gray-500 leading-relaxed cursor-pointer">
        <input
          type="checkbox"
          checked={fields.agree}
          onChange={(e) => set("agree", e.target.checked)}
          required
          className="mt-0.5 w-4 h-4 accent-[#AAFF00] cursor-pointer shrink-0"
        />
        I agree to the{" "}
        <span className="text-[#7CB800] font-semibold cursor-pointer">Terms of Service</span>
        {" "}and{" "}
        <span className="text-[#7CB800] font-semibold cursor-pointer">Privacy Policy</span>
      </label>

      {/* CTA */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-[#111] text-white text-[14px] font-bold rounded-2xl border-none cursor-pointer hover:bg-[#222] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Creating account…" : "Create Account"}
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

function friendlyError(msg: string): string {
  if (msg.includes("email-already-in-use"))
    return "An account with this email already exists.";
  if (msg.includes("invalid-email"))
    return "Please enter a valid email address.";
  if (msg.includes("weak-password"))
    return "Password must be at least 6 characters.";
  return "Something went wrong. Please try again.";
}
