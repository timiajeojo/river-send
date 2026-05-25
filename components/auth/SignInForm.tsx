"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signInWithGoogle } from "@/lib/auth";
import { EyeIcon, MailIcon } from "@/components/ui/Icons";
import { Divider } from "@/components/auth/AuthShared";
import { GoogleIcon, AppleIcon } from "@/components/ui/Icons";

const iCls =
  "w-full px-4 py-3 pr-10 bg-white border border-gray-200 rounded-xl text-gray-900 text-[14px] placeholder-gray-400 outline-none focus:border-[#AAFF00] focus:ring-2 focus:ring-[#AAFF00]/20 transition-all duration-200";
const lCls =
  "text-[12px] font-semibold text-gray-500 mb-1.5 block uppercase tracking-wide";

interface SignInFormProps {
  onSwitch: () => void;
}

export default function SignInForm({ onSwitch }: SignInFormProps) {
  const router = useRouter();
  const [showPw, setShowPw]   = useState<boolean>(false);
  const [email, setEmail]     = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError]     = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Sign in failed.";
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

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

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-[13px] text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* Email */}
      <div>
        <label className={lCls}>Email</label>
        <div className="relative">
          <input
            name="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <label className={lCls} style={{ marginBottom: 0 }}>Password</label>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        disabled={loading}
        className="w-full py-3.5 bg-[#111] text-white text-[14px] font-bold rounded-2xl border-none cursor-pointer hover:bg-[#222] transition-colors mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in…" : "Sign In"}
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

// Map Firebase error codes to friendly messages
function friendlyError(msg: string): string {
  if (msg.includes("user-not-found") || msg.includes("wrong-password") || msg.includes("invalid-credential"))
    return "Invalid email or password.";
  if (msg.includes("too-many-requests"))
    return "Too many attempts. Please try again later.";
  if (msg.includes("user-disabled"))
    return "This account has been disabled.";
  return "Something went wrong. Please try again.";
}
