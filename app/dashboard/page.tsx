// app/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthChange } from "@/lib/auth";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BalanceCard from "@/components/dashboard/BalanceCard";
import QuickActions from "@/components/dashboard/QuickActions";
import PromoBanner from "@/components/dashboard/PromoBanner";
import TransactionList from "@/components/dashboard/TransactionList";
import BottomNav from "@/components/dashboard/BottomNav";

const navItems = [
  { label: "Home",     route: "/dashboard", active: true,  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
  { label: "Activity", route: "/activity",  active: false, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { label: "Transfer", route: "/transfer",  active: false, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> },
  { label: "Profile",  route: "/profile",   active: false, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
];

export default function DashboardPage() {
  const router = useRouter();

  // Redirect to /auth if not signed in
  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      if (!user) router.replace("/auth");
    });
    return () => unsubscribe();
  }, [router]);

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
              key={item.label}
              type="button"
              onClick={() => router.push(item.route)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold w-full text-left border-none cursor-pointer transition-colors ${
                item.active ? "bg-[#AAFF00]/10 text-gray-900" : "bg-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              <span className={item.active ? "text-gray-900" : "text-gray-400"}>{item.icon}</span>
              {item.label}
              {item.active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#AAFF00]" />}
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

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="hidden lg:flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100 shrink-0">
          <div>
            <h1 className="text-[20px] font-bold text-gray-900">Dashboard</h1>
            <p className="text-[13px] text-gray-400">Welcome back, Tega 👋</p>
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

        <div className="flex-1 overflow-y-auto pb-24 lg:pb-10">
          <div className="px-4 pt-5 sm:px-5 sm:pt-5 lg:px-8 lg:pt-8">
            <div className="lg:hidden"><DashboardHeader /></div>
            <div className="flex flex-col gap-4 lg:hidden">
              <BalanceCard />
              <QuickActions />
              <PromoBanner />
              <TransactionList />
            </div>
            <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="lg:col-span-3 xl:col-span-4"><BalanceCard /></div>
              <div className="lg:col-span-3 xl:col-span-4"><QuickActions /></div>
              <div className="lg:col-span-1 xl:col-span-2"><PromoBanner /></div>
              <div className="lg:col-span-2 xl:col-span-2"><TransactionList /></div>
            </div>
          </div>
        </div>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
          <BottomNav />
        </div>
      </div>

    </div>
  );
}
