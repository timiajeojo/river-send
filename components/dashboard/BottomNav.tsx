import React, { use } from 'react';
"use client";

import { useRouter, usePathname } from "next/navigation";
import type { TabId } from "@/types";
import { navTabs } from "@/components/dashboard/dashboardData";

const tabRoutes: Record<TabId, string> = {
  home:     "/dashboard",
  activity: "/activity",
  transfer: "/transfer",
  profile:  "/dashboard",
};

export default function BottomNav() {
  const router   = useRouter();
  const pathname = usePathname();

  const activeTab: TabId =
    pathname === "/activity"  ? "activity" :
    pathname === "/transfer"  ? "transfer" :
    pathname === "/dashboard" ? "home"     : "home";

  return (
    <div className="shrink-0 bg-white border-t border-gray-100 px-2 pt-2 pb-2">
      <div className="grid grid-cols-4">
        {navTabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => router.push(tabRoutes[tab.id])}
              className={`flex flex-col items-center gap-1 py-2 rounded-xl border-none cursor-pointer bg-transparent transition-colors ${
                isActive ? "text-gray-900" : "text-gray-400"
              }`}
            >
              <span>{tab.icon}</span>
              <span className={`text-[11px] font-semibold ${
                isActive ? "text-gray-900" : "text-gray-400"
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-5 h-[2.5px] bg-[#AAFF00] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}