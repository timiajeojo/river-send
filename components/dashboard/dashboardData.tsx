import type { ReactNode } from "react";
import type { Transaction, QuickAction, NavTab } from "@/types";

// ── Date helpers ────────────────────────────────────────────
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

// ── Transactions ────────────────────────────────────────────
export const transactions: Transaction[] = [
  {
    id: 1,
    name: "Spotify Premium",
    date: formatDate(1),
    time: formatTime(9, 41, "AM"),
    amount: "-$9.99",
    positive: false,
    bg: "bg-[#1DB954]",
    logo: "spotify",
  },
  {
    id: 2,
    name: "Amazon",
    date: formatDate(2),
    time: formatTime(3, 21, "PM"),
    amount: "-$78.49",
    positive: false,
    bg: "bg-[#232F3E]",
    logo: "amazon",
  },
  {
    id: 3,
    name: "Salary from Acme Inc.",
    date: formatDate(2),
    time: formatTime(9, 0, "AM"),
    amount: "+$4,250.00",
    positive: true,
    bg: "bg-green-100",
  },
  {
    id: 4,
    name: "Netflix",
    date: formatDate(3),
    time: formatTime(8, 16, "PM"),
    amount: "-$15.49",
    positive: fallse,
    bg: "bg-[#E50914]",
    logo: "netflix",
  },
];

// ── Quick actions ───────────────────────────────────────────
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

// ── Nav tabs ────────────────────────────────────────────────
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
