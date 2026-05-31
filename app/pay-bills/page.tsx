// app/pay-bills/page.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/dashboard/BottomNav";

// ── Bill data ────────────────────────────────────────────────
interface Bill {
  id: number;
  name: string;
  provider: string;
  amount: number;
  dueDate: string;
  category: "electricity" | "water" | "internet" | "mobile" | "rent" | "insurance";
  paid: boolean;
  overdue: boolean;
}

function getDueDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const initialBills: Bill[] = [
  { id: 1, name: "Electricity",  provider: "exampleutility.com",   amount: 123.45, dueDate: getDueDate(2),   category: "electricity", paid: false, overdue: false },
  { id: 2, name: "Water",        provider: "clearwaterbilling.com", amount: 45.21,  dueDate: getDueDate(5),   category: "water",       paid: false, overdue: false },
  { id: 3, name: "Internet",     provider: "fasenetservices.com",   amount: 85.99,  dueDate: getDueDate(8),   category: "internet",    paid: false, overdue: false },
  { id: 4, name: "Mobile",       provider: "+1 (855) 229-4567",     amount: 44.09,  dueDate: getDueDate(10),  category: "mobile",      paid: false, overdue: false },
  { id: 5, name: "Rent",         provider: "propertymanage.com",    amount: 1200.00,dueDate: getDueDate(15),  category: "rent",        paid: false, overdue: false },
  { id: 6, name: "Insurance",    provider: "safeguard-ins.com",     amount: 89.00,  dueDate: getDueDate(-2),  category: "insurance",   paid: false, overdue: true  },
];

// ── Bill icons ───────────────────────────────────────────────
function BillIcon({ category }: { category: Bill["category"] }) {
  const cfg: Record<Bill["category"], { bg: string; icon: React.ReactNode }> = {
    electricity: {
      bg: "bg-yellow-50",
      icon: <svg className="w-5 h-5 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    },
    water: {
      bg: "bg-blue-50",
      icon: <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C6 8 4 13 4 16a8 8 0 0016 0c0-3-2-8-8-14z"/></svg>,
    },
    internet: {
      bg: "bg-green-50",
      icon: <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>,
    },
    mobile: {
      bg: "bg-purple-50",
      icon: <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
    },
    rent: {
      bg: "bg-orange-50",
      icon: <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    },
    insurance: {
      bg: "bg-red-50",
      icon: <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    },
  };
  const { bg, icon } = cfg[category];
  return (
    <div className={`w-11 h-11 rounded-full ${bg} flex items-center justify-center shrink-0`}>
      {icon}
    </div>
  );
}

// ── Sidebar nav item ─────────────────────────────────────────
function SidebarItem({ label, active, icon, onClick }: { label: string; active: boolean; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold w-full text-left border-none cursor-pointer transition-colors ${
        active ? "bg-[#AAFF00]/10 text-gray-900" : "bg-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-700"
      }`}
    >
      <span className={active ? "text-gray-900" : "text-gray-400"}>{icon}</span>
      {label}
      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#AAFF00]" />}
    </button>
  );
}

// ── Pay confirmation modal ───────────────────────────────────
function PayModal({ bill, onConfirm, onCancel }: { bill: Bill; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white w-full sm:max-w-[400px] rounded-t-3xl sm:rounded-3xl p-6 shadow-xl">
        <h3 className="text-[18px] font-bold text-gray-900 mb-1">Confirm Payment</h3>
        <p className="text-[13px] text-gray-400 mb-6">You are about to pay your {bill.name} bill</p>

        <div className="bg-gray-50 rounded-2xl p-4 mb-6 flex items-center gap-4">
          <BillIcon category={bill.category} />
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold text-gray-900">{bill.name}</p>
            <p className="text-[12px] text-gray-400">{bill.provider}</p>
          </div>
          <p className="text-[16px] font-bold text-gray-900">${bill.amount.toFixed(2)}</p>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={onCancel} className="flex-1 py-3.5 bg-gray-100 text-gray-700 text-[14px] font-semibold rounded-2xl border-none cursor-pointer hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="flex-1 py-3.5 bg-[#2D4A1E] text-white text-[14px] font-bold rounded-2xl border-none cursor-pointer hover:bg-[#243D18] transition-colors">
            Pay ${bill.amount.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PayBillsPage() {
  const router = useRouter();
  const [bills, setBills] = useState<Bill[]>(initialBills);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [successBill, setSuccessBill] = useState<string | null>(null);

  const total = useMemo(() => bills.filter(b => !b.paid).reduce((sum, b) => sum + b.amount, 0), [bills]);
  const unpaidCount = bills.filter(b => !b.paid).length;
  const overdueCount = bills.filter(b => b.overdue && !b.paid).length;

  const handleConfirmPay = () => {
    if (!selectedBill) return;
    setBills(prev => prev.map(b => b.id === selectedBill.id ? { ...b, paid: true } : b));
    setSuccessBill(selectedBill.name);
    setSelectedBill(null);
    setTimeout(() => setSuccessBill(null), 3000);
  };

  const navItems = [
    { id: "home",     label: "Home",     route: "/dashboard", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
    { id: "activity", label: "Activity", route: "/activity",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
    { id: "transfer", label: "Transfer", route: "/transfer",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> },
    { id: "profile",  label: "Profile",  route: "/profile",   icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  ];

  return (
    <>
      <div className="min-h-svh w-full bg-[#f5f5f5] flex flex-col lg:flex-row">

        {/* ── SIDEBAR — desktop only ── */}
        <aside className="hidden lg:flex flex-col w-[240px] xl:w-[260px] shrink-0 bg-white border-r border-gray-100 min-h-screen sticky top-0">
          <div className="px-6 py-6 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#AAFF00] flex items-center justify-center text-black text-lg font-black">R</div>
              <span className="text-[20px] font-extrabold tracking-tight text-gray-900">Riverpay</span>
            </div>
          </div>
          <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
            {navItems.map((item) => (
              <SidebarItem key={item.id} label={item.label} active={false} icon={item.icon} onClick={() => router.push(item.route)} />
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

          {/* Desktop top bar */}
          <div className="hidden lg:flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 border-none cursor-pointer hover:bg-gray-200 transition-colors">
                <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              </button>
              <div>
                <h1 className="text-[20px] font-bold text-gray-900">Pay Bills</h1>
                <p className="text-[13px] text-gray-400">Manage and pay your bills</p>
              </div>
            </div>
            {overdueCount > 0 && (
              <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-[12px] font-semibold text-red-500">{overdueCount} overdue</span>
              </div>
            )}
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto pb-28 lg:pb-10">
            <div className="px-5 pt-6 lg:px-8 lg:pt-8 w-full max-w-[500px] lg:max-w-[720px] mx-auto lg:mx-0">

              {/* Mobile header */}
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#AAFF00]/40 shrink-0">
                    <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80&auto=format&fit=crop&crop=face" alt="avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-gray-900 leading-tight">Pay Bills</p>
                    <p className="text-[12px] text-gray-400">tega@example.com</p>
                  </div>
                </div>
                <button type="button" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border-none cursor-pointer">
                  <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>
                  </svg>
                </button>
              </div>

              {/* Page title — mobile */}
              <h1 className="text-[28px] sm:text-[32px] font-extrabold text-gray-900 tracking-tight mb-5 lg:hidden">
                Pay Bills
              </h1>

              {/* Success banner */}
              {successBill && (
                <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-2xl px-4 py-3 mb-5">
                  <div className="w-7 h-7 rounded-full bg-[#AAFF00] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <p className="text-[13px] font-semibold text-gray-900">{successBill} bill paid successfully!</p>
                </div>
              )}

              {/* ── TOTAL CARD ── */}
              <div className="bg-white rounded-2xl shadow-sm px-5 py-4 mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[13px] text-gray-400 font-medium mb-0.5">Total Due</p>
                  <p className="text-[28px] sm:text-[32px] font-extrabold text-gray-900 tracking-tight">
                    ${total.toFixed(2)}
                  </p>
                  <p className="text-[12px] text-gray-400 mt-0.5">{unpaidCount} bill{unpaidCount !== 1 ? "s" : ""} remaining</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const firstUnpaid = bills.find(b => !b.paid);
                    if (firstUnpaid) setSelectedBill(firstUnpaid);
                  }}
                  disabled={unpaidCount === 0}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#2D4A1E] text-white text-[13px] font-semibold rounded-xl border-none cursor-pointer hover:bg-[#243D18] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Pay All
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>

              {/* Overdue warning */}
              {overdueCount > 0 && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 mb-5">
                  <svg className="w-4 h-4 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <p className="text-[13px] text-red-600 font-medium">
                    You have {overdueCount} overdue bill{overdueCount > 1 ? "s" : ""}. Please pay as soon as possible.
                  </p>
                </div>
              )}

              {/* ── BILLS LIST ── */}
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Your Bills</p>

              <div className="lg:grid lg:grid-cols-2 lg:gap-4">
                {bills.map((bill) => (
                  <div
                    key={bill.id}
                    className={`bg-white rounded-2xl shadow-sm overflow-hidden mb-3 lg:mb-0 transition-opacity ${bill.paid ? "opacity-50" : ""}`}
                  >
                    <div className="flex items-center gap-3 px-4 py-4">
                      <BillIcon category={bill.category} />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[14px] font-semibold text-gray-900">{bill.name}</p>
                          {bill.overdue && !bill.paid && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-red-50 text-red-500 rounded-full">Overdue</span>
                          )}
                          {bill.paid && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-green-50 text-green-600 rounded-full">Paid</span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-400 truncate">{bill.provider}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Due {bill.dueDate}</p>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <p className="text-[15px] font-bold text-gray-900">${bill.amount.toFixed(2)}</p>
                        {!bill.paid ? (
                          <button
                            type="button"
                            onClick={() => setSelectedBill(bill)}
                            className={`px-3 py-1.5 text-[12px] font-semibold rounded-xl border-none cursor-pointer transition-colors ${
                              bill.overdue
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-[#2D4A1E] text-white hover:bg-[#243D18]"
                            }`}
                          >
                            Pay
                          </button>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-3.5 h-3.5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Bottom nav — mobile only */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
          <BottomNav />
        </div>

      </div>

      {/* Pay confirmation modal */}
      {selectedBill && (
        <PayModal
          bill={selectedBill}
          onConfirm={handleConfirmPay}
          onCancel={() => setSelectedBill(null)}
        />
      )}
    </>
  );
    }
      
