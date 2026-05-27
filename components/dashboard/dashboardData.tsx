// components/dashboard/dashboardData.tsx
import type { ReactNode } from "react";
import type { Transaction, QuickAction, NavTab } from "@/types";

// ── Date helpers ─────────────────────────────────────────────
export function formatDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(h: number, m: number, ampm: "AM" | "PM"): string {
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
}

// ── All transactions ─────────────────────────────────────────
export const transactions: Transaction[] = [
  // TODAY
  {
    id: 1,
    name: "Spotify Premium",
    date: formatDate(0),
    time: formatTime(9, 41, "AM"),
    amount: "-$9.99",
    positive: false,
    bg: "bg-[#1DB954]",
    logo: "spotify",
    category: "subscriptions",
  },
  {
    id: 2,
    name: "Apple iCloud",
    date: formatDate(0),
    time: formatTime(11, 5, "AM"),
    amount: "-$2.99",
    positive: false,
    bg: "bg-gray-900",
    logo: "apple",
    category: "subscriptions",
  },
  {
    id: 3,
    name: "Salary from Acme Inc.",
    date: formatDate(0),
    time: formatTime(9, 0, "AM"),
    amount: "+$4,250.00",
    positive: true,
    bg: "bg-green-100",
    category: "transfers",
  },

  // YESTERDAY
  {
    id: 4,
    name: "Amazon",
    date: formatDate(1),
    time: formatTime(3, 21, "PM"),
    amount: "-$78.49",
    positive: false,
    bg: "bg-[#232F3E]",
    logo: "amazon",
    category: "payments",
  },
  {
    id: 5,
    name: "Netflix",
    date: formatDate(1),
    time: formatTime(8, 16, "PM"),
    amount: "-$15.49",
    positive: false,
    bg: "bg-[#E50914]",
    logo: "netflix",
    category: "subscriptions",
  },
  {
    id: 6,
    name: "YouTube Premium",
    date: formatDate(1),
    time: formatTime(10, 0, "AM"),
    amount: "-$13.99",
    positive: false,
    bg: "bg-[#FF0000]",
    logo: "youtube",
    category: "subscriptions",
  },
  {
    id: 7,
    name: "Bank Transfer",
    date: formatDate(1),
    time: formatTime(2, 45, "PM"),
    amount: "+$500.00",
    positive: true,
    bg: "bg-blue-100",
    category: "transfers",
  },

  // 2 DAYS AGO
  {
    id: 8,
    name: "Uber",
    date: formatDate(2),
    time: formatTime(7, 30, "PM"),
    amount: "-$24.50",
    positive: false,
    bg: "bg-gray-900",
    logo: "uber",
    category: "payments",
  },
  {
    id: 9,
    name: "Electric Bill",
    date: formatDate(2),
    time: formatTime(10, 0, "AM"),
    amount: "-$120.00",
    positive: false,
    bg: "bg-yellow-100",
    category: "payments",
  },
  {
    id: 10,
    name: "Freelance Payment",
    date: formatDate(2),
    time: formatTime(4, 15, "PM"),
    amount: "+$800.00",
    positive: true,
    bg: "bg-green-100",
    category: "transfers",
  },

  // 3 DAYS AGO
  {
    id: 11,
    name: "Amazon Prime",
    date: formatDate(3),
    time: formatTime(9, 0, "AM"),
    amount: "-$14.99",
    positive: false,
    bg: "bg-[#232F3E]",
    logo: "amazon",
    category: "subscriptions",
  },
  {
    id: 12,
    name: "Internet Bill",
    date: formatDate(3),
    time: formatTime(11, 0, "AM"),
    amount: "-$59.99",
    positive: false,
    bg: "bg-blue-200",
    category: "payments",
  },
];

// ── Quick actions ────────────────────────────────────────────
export const quickActions: QuickAction[] = [
  {
    label: "Send",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    ),
  },
  {
    label: "Receive",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
    ),
  },
  {
    label: "Pay Bills",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    label: "More",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="5" cy="12" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="19" cy="12" r="1.5" />
      </svg>
    ),
  },
];

// ── Nav tabs ─────────────────────────────────────────────────
export const navTabs: NavTab[] = [
  {
    id: "home",
    label: "Home",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    id: "activity",
    label: "Activity",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    id: "transfer",
    label: "Transfer",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];