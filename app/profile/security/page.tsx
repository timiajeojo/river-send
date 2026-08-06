// app/profile/security/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const iCls = "w-full px-4 py-3 pr-10 bg-white border border-gray-200 rounded-xl text-gray-900 text-[14px] placeholder-gray-400 outline-none focus:border-[#AAFF00] focus:ring-2 focus:ring-[#AAFF00]/20 transition-all duration-200";
const lCls = "text-[12px] font-semibold text-gray-500 mb-1.5 block uppercase tracking-wide";

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full border-none cursor-pointer transition-colors duration-200 ${enabled ? "bg-[#AAFF00]" : "bg-gray-200"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${enabled ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

function SecurityRow({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5">
      <div className="flex-1 min-w-0 pr-2">
        <p className="text-[14px] font-semibold text-gray-900 truncate">{label}</p>
        {sub && <p className="text-[12px] text-gray-400 mt-0.5 truncate">{sub}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function SecurityPage() {
  const router = useRouter();
  const [showCurrent, setShowCurrent]   = useState(false);
  const [showNew, setShowNew]           = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [twoFA, setTwoFA]               = useState(true);
  const [biometric, setBiometric]       = useState(false);
  const [loginAlerts, setLoginAlerts]   = useState(true);
  const [saved, setSaved]               = useState(false);
  const [passwords, setPasswords]       = useState({ current: "", newPw: "", confirm: "" });

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasswords(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = () => {
    setSaved(true);
    setPasswords({ current: "", newPw: "", confirm: "" });
    setTimeout(() => setSaved(false), 2500);
  };

  const EyeBtn = ({ show, onToggle }: { show: boolean; onToggle: () => void }) => (
    <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 bg-transparent border-none cursor-pointer p-0">
      {show ? (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      ) : (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
      )}
    </button>
  );

  return (
    <div className="min-h-svh w-full max-w-[100vw] overflow-x-hidden bg-[#f5f5f5]">
      <div className="max-w-full sm:max-w-[500px] lg:max-w-[600px] mx-auto px-4 pt-5 pb-16 sm:px-5 sm:pt-5 lg:px-8 lg:pt-8">

        {/* Back + title */}
        <div className="flex items-center gap-3 mb-7">
          <button type="button" onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm border-none cursor-pointer hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 className="text-[20px] font-bold text-gray-900">Security</h1>
        </div>

        {/* Success */}
        {saved && (
          <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-2xl px-4 py-3 mb-5">
            <div className="w-7 h-7 rounded-full bg-[#AAFF00] flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <p className="text-[13px] font-semibold text-gray-900">Password updated successfully</p>
          </div>
        )}

        {/* Change password */}
        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Change Password</p>
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 mb-5 flex flex-col gap-4">
          <div>
            <label className={lCls}>Current Password</label>
            <div className="relative">
              <input name="current" type={showCurrent ? "text" : "password"} placeholder="Enter current password" value={passwords.current} onChange={handle} className={iCls} />
              <EyeBtn show={showCurrent} onToggle={() => setShowCurrent(v => !v)} />
            </div>
          </div>
          <div>
            <label className={lCls}>New Password</label>
            <div className="relative">
              <input name="newPw" type={showNew ? "text" : "password"} placeholder="Enter new password" value={passwords.newPw} onChange={handle} className={iCls} />
              <EyeBtn show={showNew} onToggle={() => setShowNew(v => !v)} />
            </div>
          </div>
          <div>
            <label className={lCls}>Confirm New Password</label>
            <div className="relative">
              <input name="confirm" type={showConfirm ? "text" : "password"} placeholder="Confirm new password" value={passwords.confirm} onChange={handle} className={iCls} />
              <EyeBtn show={showConfirm} onToggle={() => setShowConfirm(v => !v)} />
            </div>
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={!passwords.current || !passwords.newPw || !passwords.confirm}
            className="w-full py-3.5 bg-[#111] text-white text-[14px] font-bold rounded-2xl border-none cursor-pointer hover:bg-[#222] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Update Password
          </button>
        </div>

        {/* Security settings */}
        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Security Settings</p>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-5">
          <SecurityRow label="Two-Factor Authentication" sub="Require a code when signing in">
            <Toggle enabled={twoFA} onToggle={() => setTwoFA(v => !v)} />
          </SecurityRow>
          <div className="h-px bg-gray-50 mx-4 sm:mx-5" />
          <SecurityRow label="Biometric Login" sub="Use fingerprint or Face ID">
            <Toggle enabled={biometric} onToggle={() => setBiometric(v => !v)} />
          </SecurityRow>
          <div className="h-px bg-gray-50 mx-4 sm:mx-5" />
          <SecurityRow label="Login Alerts" sub="Get notified of new sign-ins">
            <Toggle enabled={loginAlerts} onToggle={() => setLoginAlerts(v => !v)} />
          </SecurityRow>
        </div>

        {/* Danger zone */}
        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Danger Zone</p>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button type="button" className="w-full flex items-center justify-between gap-3 px-4 py-4 sm:px-5 text-left border-none cursor-pointer hover:bg-red-50 transition-colors">
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-red-500">Close Account</p>
              <p className="text-[12px] text-gray-400 mt-0.5">Permanently delete your account and data</p>
            </div>
            <svg className="w-4 h-4 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
