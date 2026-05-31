// app/receive/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/dashboard/BottomNav";

const ACCOUNT_NUMBER = "1234 5578 9012";

// Sidebar nav item
function SidebarItem({ label, active, icon, onClick }: {
  label: string; active: boolean; icon: React.ReactNode; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold w-full text-left border-none cursor-pointer transition-colors ${
        active ? "bg-[#AAFF00]/10 text-gray-900" : "bg-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-700"
      }`}
    >
      <span className={active ? "text-gray-900" : "text-gray-400"}>{icon}</span>
      {label}
      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#AAFF00]" />}
    </button>
  );
}

// QR Code SVG — generated pattern matching the design style
function QRCode() {
  // Simple deterministic QR-like grid pattern
  const size = 10;
  const pattern = [
    [1,1,1,1,1,1,1,0,1,1],
    [1,0,0,0,0,0,1,0,0,1],
    [1,0,1,1,1,0,1,0,1,0],
    [1,0,1,1,1,0,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,1],
    [1,0,0,0,0,0,1,1,0,0],
    [1,1,1,1,1,1,1,0,1,0],
    [0,0,0,1,0,0,0,0,1,1],
    [1,1,0,1,1,0,1,1,0,1],
    [1,0,1,0,0,1,1,0,1,1],
  ];

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm inline-block">
      <svg
        width="200"
        height="200"
        viewBox="0 0 100 100"
        className="block"
      >
        {/* Outer finder patterns — top-left */}
        <rect x="2" y="2" width="28" height="28" rx="3" fill="#1a3a0a" />
        <rect x="5" y="5" width="22" height="22" rx="2" fill="white" />
        <rect x="8" y="8" width="16" height="16" rx="1.5" fill="#1a3a0a" />

        {/* Outer finder patterns — top-right */}
        <rect x="70" y="2" width="28" height="28" rx="3" fill="#1a3a0a" />
        <rect x="73" y="5" width="22" height="22" rx="2" fill="white" />
        <rect x="76" y="8" width="16" height="16" rx="1.5" fill="#1a3a0a" />

        {/* Outer finder patterns — bottom-left */}
        <rect x="2" y="70" width="28" height="28" rx="3" fill="#1a3a0a" />
        <rect x="5" y="73" width="22" height="22" rx="2" fill="white" />
        <rect x="8" y="76" width="16" height="16" rx="1.5" fill="#1a3a0a" />

        {/* Data modules — random-looking but deterministic */}
        {[
          [36,2],[40,2],[44,2],[52,2],[60,2],[64,2],
          [36,6],[44,6],[48,6],[56,6],[60,6],
          [40,10],[44,10],[52,10],[60,10],[64,10],
          [36,14],[44,14],[48,14],[52,14],[60,14],
          [36,18],[40,18],[48,18],[56,18],[64,18],
          [36,22],[44,22],[52,22],[60,22],
          [36,26],[40,26],[44,26],[52,26],[56,26],[64,26],
          [2,36],[6,36],[14,36],[22,36],[30,36],[36,36],[44,36],[52,36],[60,36],[68,36],[76,36],[84,36],[92,36],[96,36],
          [2,40],[10,40],[18,40],[26,40],[34,40],[42,40],[50,40],[58,40],[66,40],[74,40],[82,40],[90,40],[96,40],
          [6,44],[14,44],[22,44],[38,44],[46,44],[54,44],[62,44],[70,44],[78,44],[86,44],[94,44],
          [2,48],[10,48],[18,48],[30,48],[42,48],[54,48],[66,48],[78,48],[90,48],
          [6,52],[14,52],[26,52],[38,52],[50,52],[62,52],[74,52],[86,52],[96,52],
          [2,56],[18,56],[34,56],[46,56],[58,56],[70,56],[82,56],[94,56],
          [6,60],[10,60],[22,60],[38,60],[54,60],[66,60],[78,60],[90,60],[96,60],
          [36,68],[40,68],[52,68],[60,68],[68,68],[76,68],[84,68],[92,68],[96,68],
          [36,72],[44,72],[56,72],[64,72],[72,72],[80,72],[88,72],[96,72],
          [40,76],[48,76],[60,76],[68,76],[76,76],[84,76],[92,76],
          [36,80],[44,80],[52,80],[64,80],[72,80],[80,80],[88,80],[96,80],
          [40,84],[48,84],[56,84],[68,84],[76,84],[84,84],[92,84],[96,84],
          [36,88],[44,88],[56,88],[60,88],[72,88],[80,88],[88,88],
          [40,92],[48,92],[52,92],[64,92],[68,92],[76,92],[84,92],[92,92],[96,92],
          [36,96],[44,96],[56,96],[68,96],[80,96],[92,96],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="4" height="4" rx="0.5" fill="#1a3a0a" />
        ))}
      </svg>
    </div>
  );
}

export default function ReceivePage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [requested, setRequested] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ACCOUNT_NUMBER.replace(/\s/g, ""));
    } catch {
      // fallback for mobile
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Riverpay Account Details",
        text: `Send money to my Riverpay account: ${ACCOUNT_NUMBER}`,
      });
    } catch {
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const handleRequest = () => {
    setRequested(true);
    setTimeout(() => setRequested(false), 2500);
  };

  const navItems = [
    { id: "home",     label: "Home",     route: "/dashboard", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
    { id: "activity", label: "Activity", route: "/activity",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
    { id: "transfer", label: "Transfer", route: "/transfer",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> },
    { id: "profile",  label: "Profile",  route: "/profile",   icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  ];

  return (
    <div className="min-h-svh w-full bg-[#f5f5f5] flex flex-col lg:flex-row">

      {/* ── SIDEBAR — desktop only ── */}
      <aside className="hidden lg:flex flex-col w-[240px] xl:w-[260px] shrink-0 bg-white border-r border-gray-100 min-h-screen sticky top-0">
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#AAFF00] flex items-center justify-center text-black text-lg font-black">R</div>
            <span className="text-[20px] font-extrabold tracking-tight text-gray-900">Riverpay</span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {navItems.map((item) => (
            <SidebarItem key={item.id} label={item.label} active={false} icon={item.icon} onClick={() => router.push(item.route)} />
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

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Desktop top bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 border-none cursor-pointer hover:bg-gray-200 transition-colors">
              <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </button>
            <div>
              <h1 className="text-[20px] font-bold text-gray-900">Receive Money</h1>
              <p className="text-[13px] text-gray-400">Share your account details</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pb-28 lg:pb-10">
          <div className="px-5 pt-6 lg:px-8 lg:pt-8 w-full max-w-[500px] lg:max-w-[680px] mx-auto lg:mx-0">

            {/* ── MOBILE HEADER ── */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#AAFF00]/40 shrink-0">
                  <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80&auto=format&fit=crop&crop=face" alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-gray-900 leading-tight">Hello Tega 👋</p>
                  <p className="text-[12px] text-gray-400">Receive money</p>
                </div>
              </div>
              {/* Diamond/receive icon */}
              <button type="button" onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border-none cursor-pointer hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 3h12l4 6-10 13L2 9z"/>
                </svg>
              </button>
            </div>

            {/* ── PAGE TITLE — mobile ── */}
            <h1 className="text-[28px] sm:text-[32px] font-extrabold text-gray-900 tracking-tight mb-6 lg:hidden">
              Receive Money
            </h1>

            {/* Desktop/mobile layout */}
            <div className="lg:grid lg:grid-cols-2 lg:gap-10 lg:items-start">

              {/* ── LEFT: QR Code card ── */}
              <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 flex flex-col items-center mb-5 lg:mb-0">

                {/* QR Code */}
                <div className="mb-5">
                  <QRCode />
                </div>

                {/* Account number */}
                <p className="text-[13px] text-gray-500 font-medium mb-1">Account Number</p>
                <p className="text-[17px] sm:text-[18px] font-bold text-gray-900 tracking-widest">
                  {ACCOUNT_NUMBER}
                </p>
              </div>

              {/* ── RIGHT: Action buttons ── */}
              <div className="flex flex-col gap-3">

                {/* Success banner */}
                {(copied || shared || requested) && (
                  <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-2xl px-4 py-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-[#AAFF00] flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <p className="text-[13px] font-semibold text-gray-900">
                      {copied ? "Account number copied!" : shared ? "Details shared!" : "Payment request sent!"}
                    </p>
                  </div>
                )}

                {/* Copy Account Number */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-[#2D4A1E] text-white text-[15px] font-semibold rounded-2xl border-none cursor-pointer hover:bg-[#243D18] active:scale-[0.98] transition-all duration-200"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2"/>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                  </svg>
                  {copied ? "Copied!" : "Copy Account Number"}
                </button>

                {/* Share Account Details */}
                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-[#2D4A1E] text-white text-[15px] font-semibold rounded-2xl border-none cursor-pointer hover:bg-[#243D18] active:scale-[0.98] transition-all duration-200"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  Share Account Details
                </button>

                {/* Request Payment */}
                <button
                  type="button"
                  onClick={handleRequest}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-[#2D4A1E] text-white text-[15px] font-semibold rounded-2xl border-none cursor-pointer hover:bg-[#243D18] active:scale-[0.98] transition-all duration-200"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  Request Payment
                </button>

                {/* Info note */}
                <div className="flex items-start gap-3 bg-[#AAFF00]/10 border border-[#AAFF00]/20 rounded-2xl px-4 py-3.5 mt-1">
                  <svg className="w-4 h-4 text-[#5a8a00] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <p className="text-[12px] text-[#3d6200] leading-relaxed">
                    Share your QR code or account number to receive money instantly from anyone on Riverpay.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom nav — mobile only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNav />
      </div>

    </div>
  );
      }
        
