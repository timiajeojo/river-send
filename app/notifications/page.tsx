// app/profile/notifications/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} className={`relative w-11 h-6 rounded-full border-none cursor-pointer transition-colors duration-200 ${enabled ? "bg-[#AAFF00]" : "bg-gray-200"}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${enabled ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

function NotifRow({ label, sub, enabled, onToggle }: { label: string; sub: string; enabled: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-[14px] font-semibold text-gray-900">{label}</p>
        <p className="text-[12px] text-gray-400 mt-0.5">{sub}</p>
      </div>
      <Toggle enabled={enabled} onToggle={onToggle} />
    </div>
  );
}

export default function NotificationsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    transfers:    true,
    payments:     true,
    promotions:   false,
    security:     true,
    newsletter:   false,
    appUpdates:   true,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="min-h-svh w-full bg-[#f5f5f5]">
      <div className="max-w-[500px] lg:max-w-[600px] mx-auto px-5 pt-6 pb-16 lg:px-8 lg:pt-8">

        {/* Back + title */}
        <div className="flex items-center gap-3 mb-7">
          <button type="button" onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm border-none cursor-pointer hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 className="text-[20px] font-bold text-gray-900">Notifications</h1>
        </div>

        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Transactions</p>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-5">
          <NotifRow label="Transfer Alerts" sub="Get notified on every transfer" enabled={settings.transfers} onToggle={() => toggle("transfers")} />
          <div className="h-px bg-gray-50 mx-5" />
          <NotifRow label="Payment Alerts" sub="Notify me when bills are paid" enabled={settings.payments} onToggle={() => toggle("payments")} />
        </div>

        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Account</p>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-5">
          <NotifRow label="Security Alerts" sub="Suspicious login or activity" enabled={settings.security} onToggle={() => toggle("security")} />
          <div className="h-px bg-gray-50 mx-5" />
          <NotifRow label="App Updates" sub="New features and improvements" enabled={settings.appUpdates} onToggle={() => toggle("appUpdates")} />
        </div>

        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Marketing</p>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <NotifRow label="Promotions" sub="Special offers and deals" enabled={settings.promotions} onToggle={() => toggle("promotions")} />
          <div className="h-px bg-gray-50 mx-5" />
          <NotifRow label="Newsletter" sub="Monthly product updates" enabled={settings.newsletter} onToggle={() => toggle("newsletter")} />
        </div>

      </div>
    </div>
  );
}
