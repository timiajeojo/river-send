// app/profile/security/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logOut } from "@/lib/auth";
import BottomNav from "@/components/dashboard/BottomNav";

const iCls = "w-full px-4 py-3 pr-10 bg-white border border-gray-200 rounded-xl text-gray-900 text-[14px] placeholder-gray-400 outline-none focus:border-[#AAFF00] focus:ring-2 focus:ring-[#AAFF00]/20 transition-all duration-200";
const lCls = "text-[12px] font-semibold text-gray-500 mb-1.5 block uppercase tracking-wide";

const navItems = [
  { id: "home",     label: "Home",     route: "/dashboard", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
  { id: "activity", label: "Activity", route: "/activity",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { id: "transfer", label: "Transfer", route: "/transfer",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> },
  { id: "profile",  label: "Profile",  route: "/profile",   icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
];

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle}
      className={`relative w-11 h-6 rounded-full border-none cursor-pointer transition-colors duration-200 ${enabled ? "bg-[#AAFF00]" : "bg-gray-200"}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${enabled ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

function EyeBtn({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 bg-transparent border-none cursor-pointer p-0">
      {show
        ? <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        : <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
      }
    </button>
  );
}

export default function SecurityPage() {
  const router = useRouter();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [twoFA, setTwoFA]             = useState(true);
  const [biometric, setBiometric]     = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [saved, setSaved]             = useState(false);
  const [passwords, setPasswords]     = useState({ current: "", newPw: "", confirm: "" });

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasswords(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = () => {
    setSaved(true);
    setPasswords({ current: "", newPw: "", confirm: "" });
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = async () => { await logOut(); router.push("/"); };

  return (
    <div className="min-h-svh w-full bg-[#f5f5f5] flex flex-col lg:flex-row">

      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-[240px] xl:w-[260px] shrink-0 bg-white border-r border-gray-100 min-h-screen sticky top-0">
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#AAFF00] flex items-center justify-center text-black text-lg font-black">R</div>
            <span className="text-[20px] font-extrabold tracking-tight text-gray-900">Riverpay</span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {navItems.map((item) => (
            <button key={item.id} type="button" onClick={() => router.push(item.route)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold w-full text-left border-none cursor-pointer transition-colors ${
                item.id === "profile" ? "bg-[#AAFF00]/10 text-gray-900" : "bg-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-700"
              }`}>
              <span className={item.id === "profile" ? "text-gray-900" : "text-gray-400"}>{item.icon}</span>
              {item.label}
              {item.id === "profile" && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#AAFF00]" />}
            </button>
          ))}
        </nav>
        <div className="px-6 py-5 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80&auto=format&fit=crop&crop=face" alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-gray-900 truncate">Tega</p>
              <p className="text-[11px] text-gray-400 truncate">tega@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Desktop top bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 border-none cursor-pointer hover:bg-gray-200 transition-colors">
              <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </button>
            <div>
              <h1 className="text-[20px] font-bold text-gray-900">Security</h1>
              <p className="text-[13px] text-gray-400">Manage your account security</p>
            </div>
          </div>
          <button type="button" onClick={handleLogout} className="px-4 py-2 rounded-xl text-[13px] font-semibold text-red-500 bg-red-50 border-none cursor-pointer hover:bg-red-100 transition-colors">
            Logout
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-24 lg:pb-10">
          <div className="px-4 pt-5 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8 max-w-[640px] lg:max-w-[800px] mx-auto lg:mx-0">

            {/* Mobile back + title */}
            <div className="flex items-center gap-3 mb-6 lg:hidden">
              <button type="button" onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm border-none cursor-pointer hover:bg-gray-50 shrink-0">
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

            {/* Desktop: two-col | Mobile: single col */}
            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:items-start">

              {/* Change password */}
              <div>
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Change Password</p>
                <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4">
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
                  <button type="button" onClick={handleSave}
                    disabled={!passwords.current || !passwords.newPw || !passwords.confirm}
                    className="w-full py-3.5 bg-[#111] text-white text-[14px] font-bold rounded-2xl border-none cursor-pointer hover:bg-[#222] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    Update Password
                  </button>
                </div>
              </div>

              {/* Security settings + Danger */}
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Security Settings</p>
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {[
                      { label: "Two-Factor Authentication", sub: "Require a code when signing in",   val: twoFA,       set: setTwoFA },
                      { label: "Biometric Login",           sub: "Use fingerprint or Face ID",        val: biometric,   set: setBiometric },
                      { label: "Login Alerts",              sub: "Get notified of new sign-ins",      val: loginAlerts, set: setLoginAlerts },
                    ].map((s, i, arr) => (
                      <div key={s.label}>
                        <div className="flex items-center justify-between px-5 py-4">
                          <div className="flex-1 min-w-0 pr-4">
                            <p className="text-[14px] font-semibold text-gray-900">{s.label}</p>
                            <p className="text-[12px] text-gray-400 mt-0.5">{s.sub}</p>
                          </div>
                          <Toggle enabled={s.val} onToggle={() => s.set(v => !v)} />
                        </div>
                        {i < arr.length - 1 && <div className="h-px bg-gray-50 mx-5" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Danger Zone</p>
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <button type="button" className="w-full flex items-center justify-between px-5 py-4 text-left border-none cursor-pointer hover:bg-red-50 transition-colors">
                      <div>
                        <p className="text-[14px] font-semibold text-red-500">Close Account</p>
                        <p className="text-[12px] text-gray-400 mt-0.5">Permanently delete your account</p>
                      </div>
                      <svg className="w-4 h-4 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50"><BottomNav /></div>
    </div>
  );
}
