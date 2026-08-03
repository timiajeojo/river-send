// app/activity/page.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { ActivityFilter } from "@/types";
import { transactions } from "@/components/dashboard/dashboardData";
import TransactionLogo from "@/components/activity/TransactionLogo";
import BottomNav from "@/components/dashboard/BottomNav";

const filters: { id: ActivityFilter; label: string }[] = [
  { id: "all",           label: "All" },
  { id: "transfers",     label: "Transfers" },
  { id: "payments",      label: "Payments" },
  { id: "subscriptions", label: "Subscriptions" },
];

function groupByDate(txs: typeof transactions): Record<string, typeof transactions> {
  const today     = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return txs.reduce((acc, tx) => {
    let label = tx.date;
    if (tx.date === fmt(today))     label = "Today";
    if (tx.date === fmt(yesterday)) label = "Yesterday";
    if (!acc[label]) acc[label] = [];
    acc[label].push(tx);
    return acc;
  }, {} as Record<string, typeof transactions>);
}

const navItems = [
  { id: "home",     label: "Home",     route: "/dashboard", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
  { id: "activity", label: "Activity", route: "/activity",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { id: "transfer", label: "Transfer", route: "/transfer",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> },
  { id: "profile",  label: "Profile",  route: "/profile",   icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
];

export default function ActivityPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<ActivityFilter>("all");
  const [search, setSearch]  = useState<string>("");

  const filtered = useMemo(() =>
    transactions.filter((tx) => {
      const matchesFilter = filter === "all" || tx.category === filter;
      const matchesSearch = tx.name.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    }), [filter, search]);

  const grouped   = useMemo(() => groupByDate(filtered), [filtered]);
  const groupKeys = Object.keys(grouped);

  const counts = useMemo(() => ({
    all:           transactions.length,
    transfers:     transactions.filter(t => t.category === "transfers").length,
    payments:      transactions.filter(t => t.category === "payments").length,
    subscriptions: transactions.filter(t => t.category === "subscriptions").length,
  }), []);

  return (
    <div className="min-h-svh w-full bg-[#f5f5f5] flex flex-col lg:flex-row">

      {/* ── SIDEBAR — lg+ only ── */}
      <aside className="hidden lg:flex flex-col w-[240px] xl:w-[260px] shrink-0 bg-white border-r border-gray-100 min-h-screen sticky top-0">
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#AAFF00] flex items-center justify-center text-black text-lg font-black">R</div>
            <span className="text-[20px] font-extrabold tracking-tight text-gray-900">Riverpay</span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => router.push(item.route)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold w-full text-left border-none cursor-pointer transition-colors ${
                item.id === "activity"
                  ? "bg-[#AAFF00]/10 text-gray-900"
                  : "bg-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              <span className={item.id === "activity" ? "text-gray-900" : "text-gray-400"}>{item.icon}</span>
              {item.label}
              {item.id === "activity" && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#AAFF00]" />}
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

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Desktop top bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100 shrink-0">
          <div>
            <h1 className="text-[20px] font-bold text-gray-900">Activity</h1>
            <p className="text-[13px] text-gray-400">Your transaction history</p>
          </div>
          <div className="relative">
            <button type="button" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-none cursor-pointer hover:bg-gray-200 transition-colors">
              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
            </button>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#AAFF00] rounded-full ring-1 ring-white" />
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pb-24 lg:pb-10">
          <div className="px-4 pt-5 sm:px-5 sm:pt-6 lg:px-8 lg:pt-8">

            {/* ── MOBILE HEADER ── */}
            <div className="flex items-center justify-between mb-5 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#AAFF00]/40 shrink-0">
                  <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80&auto=format&fit=crop&crop=face" alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[15px] sm:text-[16px] font-bold text-gray-900 leading-tight">Hello Tega 👋</p>
                  <p className="text-[12px] text-gray-400">Your activity</p>
                </div>
              </div>
              <button type="button" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border-none cursor-pointer hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
              </button>
            </div>

            {/* Title — mobile + tablet */}
            <h1 className="text-[26px] sm:text-[30px] font-extrabold text-gray-900 tracking-tight mb-5 lg:hidden">
              Activity
            </h1>

            {/* Search + export */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-2xl text-[14px] text-gray-900 placeholder-gray-400 outline-none focus:border-[#AAFF00] focus:ring-2 focus:ring-[#AAFF00]/20 transition-all duration-200"
                />
                {search && (
                  <button type="button" onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 bg-transparent border-none cursor-pointer p-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                )}
              </div>
              {/* Export — all screen sizes */}
              <button type="button" className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-2xl text-[13px] font-semibold text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold border-none cursor-pointer whitespace-nowrap transition-all duration-200 shrink-0 ${
                    filter === f.id ? "bg-gray-900 text-white" : "bg-white text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {f.label}
                  <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                    filter === f.id ? "bg-[#AAFF00] text-black" : "bg-gray-100 text-gray-500"
                  }`}>
                    {counts[f.id]}
                  </span>
                </button>
              ))}
            </div>

            {/* Empty state */}
            {groupKeys.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>
                <p className="text-[15px] font-semibold text-gray-700 mb-1">No transactions found</p>
                <p className="text-[13px] text-gray-400">Try a different search or filter</p>
              </div>
            ) : (
              /* Mobile: single col | Tablet: single col | Desktop: 2-col grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                {groupKeys.map((group) => (
                  <div key={group}>
                    <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                      {group}
                    </p>
                    <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm">
                      {grouped[group].map((tx, i) => (
                        <div
                          key={tx.id}
                          className={`flex items-center gap-3 px-4 py-3.5 sm:py-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                            i < grouped[group].length - 1 ? "border-b border-gray-50" : ""
                          }`}
                        >
                          <TransactionLogo tx={tx} />
                          <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-semibold text-gray-900 truncate">{tx.name}</p>
                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                              <p className="text-[11px] sm:text-[12px] text-gray-400 whitespace-nowrap">
                                {tx.date} · {tx.time}
                              </p>
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                                tx.category === "transfers"     ? "bg-blue-50 text-blue-500"
                                : tx.category === "subscriptions" ? "bg-purple-50 text-purple-500"
                                : "bg-orange-50 text-orange-500"
                              }`}>
                                {tx.category.charAt(0).toUpperCase() + tx.category.slice(1)}
                              </span>
                            </div>
                          </div>
                          <span className={`text-[14px] font-bold shrink-0 ${tx.positive ? "text-[#22c55e]" : "text-gray-900"}`}>
                            {tx.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Bottom nav — mobile + tablet only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNav />
      </div>

    </div>
  );
}
