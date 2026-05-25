
// components/dashboard/QuickActions.tsx

import { quickActions } from "@/components/dashboard/dashboardData";

export default function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-2 mb-5">
      {quickActions.map((action) => (
        <button
          key={action.label}
          type="button"
          className="flex flex-col items-center gap-2 bg-white rounded-2xl py-4 border-none cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
        >
          <span className="text-gray-800">{action.icon}</span>
          <span className="text-[12px] font-medium text-gray-700">{action.label}</span>
        </button>
      ))}
    </div>
  );
}
