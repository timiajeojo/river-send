import React, { use, useState } from 'react';
"use client"
import { useState } from "react";
import type { TabId } from "@/types";
import { navTabs } from "@/components/dashboard/dashboardData";

export default function BottomNav() {
  const [active, setActive] = useState<TabId>("home");

  return (
    <div className="shrink-0 bg-white border-t border-gray-100 px-2 pt-2 pb-2">
      <div className="grid grid-cols-4">
        {navTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`flex flex-col items-center gap-1 py-2 rounded-xl border-none cursor-pointer bg-transparent transition-colors ${
              active === tab.id ? "text-gray-900" : "text-gray-400"
            }`}
          >
            <span>{tab.icon}</span>
            <span className={`text-[11px] font-semibold ${active === tab.id ? "text-gray-900" : "text-gray-400"}`}>
              {tab.label}
            </span>
            {active === tab.id && (
              <span className="w-5 h-[2.5px] bg-[#AAFF00] rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}