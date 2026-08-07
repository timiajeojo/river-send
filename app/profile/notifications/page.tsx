// app/profile/notifications/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logOut } from "@/lib/auth";
import BottomNav from "@/components/dashboard/BottomNav";

const navItems = [
  { id: "home",     label: "Home",     route: "/dashboard", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
  { id: "activity", label: "Activity", route: "/activity",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { id: "transfer", label: "Transfer", route: "/transfer",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> },
  { id: "profile",  label: "Profile",  route: "/profile",   icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
];

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle}
      className={`relative w-11 h-6 rounded-full border-none cursor-pointer transition-colors duration-200 shrink-0 ${enabled ? "bg-[#AAFF00]" : "bg-gray-200"}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${enabled ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

const groups = [
  {
    title: "Transactions",
    items: [
      { key: "transfers", label: "Transfer Alerts",  sub: "Get notified on every transfer",   def: true },
      { key: "payments",  label: "Payment Alerts",   sub: "Notify me when bills are paid",    def: true },
    ],
  },
  {
    title: "Account",
    items: [
      { key: "security",   label: "Security Alerts", sub: "Suspicious login or activity",      def: true },
      { key: "appUpdates", label: "App Updates",      sub: "New features and improvements",    def: true },
    ],
  },
  {
    title: "Marketing",
    items: [
      { key: "promotions", label: "Promotions", sub: "Special offers and deals",    def: false },
      { key: "newsletter", label: "Newsletter", sub: "Monthly product updates",     def: false },
    ],
  },
];

export default function NotificationsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<Record<string, boolean>>({
    transfers: true, payments: true, security: true,
    appUpdates: true, promotions: false, newsletter: false,
  });

  const toggle = (key: string) => setSettings(p => ({ ...p, [key]: !p[key] }));
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
              <h1 className="text-[20px] font-bold text-gray-900">Notifications</h1>
              <p className="text-[13px] text-gray-400">Manage your notification preferences</p>
            </div>
          </div>
          <button type="button" onClick={handleLogout} className="px-4 py-2 rounded-xl text-[13px] font-semibold text-red-500 bg-red-50 border-none cursor-pointer hover:bg-red-100 transition-colors">Logout</button>
        </div>

        <div className="flex-1 overflow-y-auto pb-24 lg:pb-10">
          <div className="px-4 pt-5 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8 max-w-[640px] lg:max-w-[800px] mx-auto lg:mx-0">

            {/* Mobile back + title */}
            <div className="flex items-center gap-3 mb-6 lg:hidden">
              <button type="button" onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm border-none cursor-pointer hover:bg-gray-50 shrink-0">
                <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              </button>
              <h1 className="text-[20px] font-bold text-gray-900">Notifications</h1>
            </div>

            {/* Groups — single col mobile, 3-col desktop */}
            <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3 lg:gap-5 lg:items-start">
              {groups.map((group) => (
                <div key={group.title}>
                  <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">{group.title}</p>
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {group.items.map((item, i) => (
                      <div key={item.key}>
                        <div className="flex items-center justify-between px-5 py-4">
                          <div className="flex-1 min-w-0 pr-4">
                            <p className="text-[14px] font-semibold text-gray-900">{item.label}</p>
                            <p className="text-[12px] text-gray-400 mt-0.5">{item.sub}</p>
                          </div>
                          <Toggle enabled={settings[item.key]} onToggle={() => toggle(item.key)} />
                        </div>
                        {i < group.items.length - 1 && <div className="h-px bg-gray-50 mx-5" />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50"><BottomNav /></div>
    </div>
  );
}
