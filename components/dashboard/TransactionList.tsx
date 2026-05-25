

// components/dashboard/TransactionList.tsx

import { transactions } from "@/components/dashboard/dashboardData";
import type { Transaction } from "@/types";

function TransactionLogo({ tx }: { tx: Transaction }) {
  if (tx.logo === "spotify") {
    return (
      <div className="w-10 h-10 rounded-full bg-[#1DB954] flex items-center justify-center shrink-0">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 11-.277-1.215c3.809-.87 7.077-.496 9.713 1.115a.623.623 0 01.206.857zm1.223-2.722a.78.78 0 01-1.072.257C14.1 12.388 10.539 11.88 7.2 12.847a.78.78 0 01-.452-1.492c3.773-1.145 7.754-.59 10.804 1.275a.78.78 0 01.257 1.072zm.105-2.835C14.692 9.15 9.375 8.982 6.227 9.97a.937.937 0 01-.544-1.793c3.6-1.092 9.585-.881 13.372 1.376a.937.937 0 01-.141 1.314z" />
        </svg>
      </div>
    );
  }

  if (tx.logo === "amazon") {
    return (
      <div className="w-10 h-10 rounded-full bg-[#232F3E] flex items-center justify-center shrink-0">
        <span className="text-[#FF9900] font-black text-[16px]">a</span>
      </div>
    );
  }

  if (tx.logo === "netflix") {
    return (
      <div className="w-10 h-10 rounded-full bg-[#E50914] flex items-center justify-center shrink-0">
        <span className="text-white font-black text-[15px]">N</span>
      </div>
    );
  }

  // Salary / generic income
  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${tx.bg}`}>
      {tx.positive ? (
        <svg className="w-4 h-4 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      ) : (
        <span className="text-white font-bold text-[13px]">{tx.initials}</span>
      )}
    </div>
  );
}

export default function TransactionList() {
  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[16px] font-bold text-gray-900">Recent Transactions</p>
        <button
          type="button"
          className="text-[13px] text-gray-400 bg-transparent border-none cursor-pointer hover:text-gray-600 underline underline-offset-2"
        >
          See all
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm">
        {transactions.map((tx, i) => (
          <div
            key={tx.id}
            className={`flex items-center gap-3 px-4 py-3.5 ${
              i < transactions.length - 1 ? "border-b border-gray-50" : ""
            }`}
          >
            <TransactionLogo tx={tx} />
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-gray-900 truncate">{tx.name}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {tx.date} · {tx.time}
              </p>
            </div>
            <span
              className={`text-[14px] font-bold shrink-0 ${
                tx.positive ? "text-[#22c55e]" : "text-gray-900"
              }`}
            >
              {tx.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
