
"use client";

import { useRouter } from "next/navigation";
import { quickActions } from "@/components/dashboard/dashboardData";

export default function QuickActions() {
  const router = useRouter();

  const handleAction = (label: string) => {
    if (label === "Send") router.push("/transfer");
  };

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-5">
      {quickActions.map((action) => (
        <button
          key={action.label}
          type="button"
          onClick={() => handleAction(action.label)}
          className="flex flex-col items-center gap-2 bg-white rounded-2xl py-4 sm:py-5 border-none cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
        >
          <span className="text-gray-800">{action.icon}</span>
          <span className="text-[12px] sm:text-[13px] font-medium text-gray-700">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
}