// components/activity/TransactionLogo.tsx
import type { Transaction } from "@/types";

export default function TransactionLogo({ tx }: { tx: Transaction }) {
  if (tx.logo === "spotify") return (
    <div className="w-11 h-11 rounded-full bg-[#1DB954] flex items-center justify-center shrink-0">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 11-.277-1.215c3.809-.87 7.077-.496 9.713 1.115a.623.623 0 01.206.857zm1.223-2.722a.78.78 0 01-1.072.257C14.1 12.388 10.539 11.88 7.2 12.847a.78.78 0 01-.452-1.492c3.773-1.145 7.754-.59 10.804 1.275a.78.78 0 01.257 1.072zm.105-2.835C14.692 9.15 9.375 8.982 6.227 9.97a.937.937 0 01-.544-1.793c3.6-1.092 9.585-.881 13.372 1.376a.937.937 0 01-.141 1.314z"/>
      </svg>
    </div>
  );

  if (tx.logo === "amazon") return (
    <div className="w-11 h-11 rounded-full bg-[#232F3E] flex items-center justify-center shrink-0">
      <span className="text-[#FF9900] font-black text-[17px]">a</span>
    </div>
  );

  if (tx.logo === "netflix") return (
    <div className="w-11 h-11 rounded-full bg-[#E50914] flex items-center justify-center shrink-0">
      <span className="text-white font-black text-[15px]">N</span>
    </div>
  );

  if (tx.logo === "apple") return (
    <div className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.28.07 2.17.77 2.93.82.61-.34 1.72-.72 3.12-.57 2.06.17 3.59 1.13 4.06 2.78-3.65 2.1-2.94 6.4.89 7.85zm-3.97-15.3c-2.78.11-5.06 3.05-4.67 5.55 2.51.2 5.02-2.73 4.67-5.55z"/>
      </svg>
    </div>
  );

  if (tx.logo === "youtube") return (
    <div className="w-11 h-11 rounded-full bg-[#FF0000] flex items-center justify-center shrink-0">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    </div>
  );

  if (tx.logo === "uber") return (
    <div className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
      <span className="text-white font-black text-[13px] tracking-tight">Uber</span>
    </div>
  );

  // Generic — income (green up arrow) or expense (initials)
  return (
    <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${tx.bg}`}>
      {tx.positive ? (
        <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      ) : (
        <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      )}
    </div>
  );
}
