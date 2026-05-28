// app/transfer/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/dashboard/BottomNav";

const contacts = [
  { id: 1, name: "Jennifer A.",  email: "jenifer.a@example.com",  avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80&auto=format&fit=crop&crop=face", online: true },
  { id: 2, name: "Marcus T.",    email: "marcus.t@example.com",   avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop&crop=face", online: false },
  { id: 3, name: "Aisha K.",     email: "aisha.k@example.com",    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop&crop=face", online: true },
  { id: 4, name: "David O.",     email: "david.o@example.com",    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&auto=format&fit=crop&crop=face", online: false },
];

const accounts = [
  { id: 1, name: "Main Account",    balance: "$8,630.25", number: "•••• 4528" },
  { id: 2, name: "Savings Account", balance: "$3,200.00", number: "•••• 8821" },
];

// Sidebar nav item — desktop only
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

export default function TransferPage() {
  const router = useRouter();
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [showContacts, setShowContacts] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const displayAmount = amount ? `$${parseFloat(amount).toLocaleString()}` : "$0";

  const handleContinue = async () => {
    if (!amount || Number(amount) <= 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setAmount("");
      setNote("");
    }, 2500);
  };

  const navItems = [
    { id: "home",     label: "Home",     route: "/dashboard", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
    { id: "activity", label: "Activity", route: "/activity",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
    { id: "transfer", label: "Transfer", route: "/transfer",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> },
    { id: "profile",  label: "Profile",  route: "/dashboard", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  ];

  return (
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
            <SidebarItem key={item.id} label={item.label} active={item.id === "transfer"} icon={item.icon} onClick={() => router.push(item.route)} />
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
          <div>
            <h1 className="text-[20px] font-bold text-gray-900">Transfer</h1>
            <p className="text-[13px] text-gray-400">Send money to anyone instantly</p>
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

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pb-28 lg:pb-10">
          <div className="px-5 pt-6 lg:px-8 lg:pt-8 w-full max-w-[500px] lg:max-w-[680px] mx-auto lg:mx-0">

            {/* Mobile header */}
            <div className="flex items-center justify-between mb-7 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#AAFF00]/40 shrink-0">
                  <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80&auto=format&fit=crop&crop=face" alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-gray-900 leading-tight">Transfer</p>
                  <p className="text-[12px] text-gray-400">Send money instantly</p>
                </div>
              </div>
              <button type="button" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border-none cursor-pointer">
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>
                </svg>
              </button>
            </div>

            {/* Desktop/mobile two-col split */}
            <div className="lg:grid lg:grid-cols-2 lg:gap-10">

              {/* ── LEFT: Send To + From ── */}
              <div className="flex flex-col gap-6">

                {/* Send To label */}
                <h2 className="text-[26px] sm:text-[30px] font-extrabold text-gray-900 tracking-tight -mb-2">
                  Send to
                </h2>

                {/* Selected contact card */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowContacts(v => !v)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 bg-white rounded-2xl shadow-sm border-none cursor-pointer hover:bg-gray-50 transition-colors text-left"
                  >
                    {/* Avatar with online dot */}
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-full overflow-hidden">
                        <img src={selectedContact.avatar} alt={selectedContact.name} className="w-full h-full object-cover" />
                      </div>
                      {selectedContact.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#AAFF00] rounded-full ring-2 ring-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-gray-900">{selectedContact.name}</p>
                      <p className="text-[12px] text-gray-400 truncate">{selectedContact.email}</p>
                    </div>
                    <svg className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${showContacts ? "rotate-90" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>

                  {/* Contact picker dropdown */}
                  {showContacts && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-20">
                      {contacts.map((c, i) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => { setSelectedContact(c); setShowContacts(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-3.5 text-left border-none cursor-pointer hover:bg-gray-50 transition-colors ${
                            i < contacts.length - 1 ? "border-b border-gray-50" : ""
                          } ${c.id === selectedContact.id ? "bg-gray-50" : "bg-white"}`}
                        >
                          <div className="relative shrink-0">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                            </div>
                            {c.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#AAFF00] rounded-full ring-2 ring-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-semibold text-gray-900">{c.name}</p>
                            <p className="text-[12px] text-gray-400 truncate">{c.email}</p>
                          </div>
                          {c.id === selectedContact.id && (
                            <div className="w-5 h-5 rounded-full bg-[#AAFF00] flex items-center justify-center shrink-0">
                              <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* From account */}
                <div>
                  <p className="text-[13px] font-semibold text-gray-500 mb-2">From</p>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowAccountDropdown(v => !v)}
                      className="w-full flex items-center justify-between px-4 py-4 bg-white rounded-2xl shadow-sm border-none cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-left">
                        <p className="text-[14px] font-semibold text-gray-900">{selectedAccount.name}</p>
                        <p className="text-[12px] text-gray-400 mt-0.5">Available balance: {selectedAccount.balance}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[14px] font-bold text-gray-900">{selectedAccount.balance}</span>
                        <svg className={`w-4 h-4 text-gray-400 transition-transform ${showAccountDropdown ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                    </button>

                    {showAccountDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-10">
                        {accounts.map((acc, i) => (
                          <button
                            key={acc.id}
                            type="button"
                            onClick={() => { setSelectedAccount(acc); setShowAccountDropdown(false); }}
                            className={`w-full flex items-center justify-between px-4 py-3.5 text-left border-none cursor-pointer hover:bg-gray-50 transition-colors ${
                              i < accounts.length - 1 ? "border-b border-gray-50" : ""
                            } ${acc.id === selectedAccount.id ? "bg-gray-50" : "bg-white"}`}
                          >
                            <div>
                              <p className="text-[14px] font-semibold text-gray-900">{acc.name}</p>
                              <p className="text-[12px] text-gray-400">{acc.number}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[14px] font-bold text-gray-900">{acc.balance}</span>
                              {acc.id === selectedAccount.id && (
                                <div className="w-5 h-5 rounded-full bg-[#AAFF00] flex items-center justify-center shrink-0">
                                  <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12"/>
                                  </svg>
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ── RIGHT: Amount + Note + CTA ── */}
              <div className="flex flex-col gap-5 mt-6 lg:mt-0">

                {/* Amount */}
                <div>
                  <p className="text-[13px] font-semibold text-gray-500 mb-2">Amount</p>
                  <div className="bg-white rounded-2xl shadow-sm px-5 py-5">
                    {/* Big display — matches design exactly */}
                    <div className="flex items-center justify-end">
                      <input
                        type="number"
                        inputMode="decimal"
                        placeholder="0"
                        value={amount}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "" || (Number(val) >= 0 && val.length <= 9)) setAmount(val);
                        }}
                        className="w-full text-right text-[40px] sm:text-[48px] font-extrabold text-gray-900 tracking-tight bg-transparent outline-none border-none placeholder-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        style={{ minWidth: 0 }}
                      />
                      <span className="text-[40px] sm:text-[48px] font-extrabold text-gray-900 ml-1 shrink-0">
                        {amount === "" ? "" : ""}
                      </span>
                    </div>
                    {/* Dollar prefix row */}
                    <div className="flex items-center justify-end mt-1">
                      <span className="text-[13px] text-gray-400">
                        Available: {selectedAccount.balance}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div>
                  <p className="text-[13px] font-semibold text-gray-500 mb-2">
                    Add a note <span className="text-gray-300 font-normal">(optional)</span>
                  </p>
                  <div className="bg-white rounded-2xl shadow-sm px-4 py-3.5">
                    <input
                      type="text"
                      placeholder="What's this for?"
                      value={note}
                      onChange={(e) => setNote(e.target.value.slice(0, 50))}
                      className="w-full bg-transparent text-[14px] text-gray-900 placeholder-gray-400 outline-none border-none"
                    />
                    <p className="text-right text-[11px] text-gray-300 mt-1">{note.length}/50</p>
                  </div>
                </div>

                {/* Success banner */}
                {success && (
                  <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-2xl px-4 py-3.5">
                    <div className="w-8 h-8 rounded-full bg-[#AAFF00] flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-gray-900">Transfer sent!</p>
                      <p className="text-[12px] text-gray-500">${amount} sent to {selectedContact.name}</p>
                    </div>
                  </div>
                )}

                {/* Continue CTA — dark green matching design */}
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!amount || Number(amount) <= 0 || loading}
                  className={`w-full py-4 text-[15px] font-bold rounded-2xl border-none cursor-pointer transition-all duration-200 ${
                    !amount || Number(amount) <= 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : loading
                      ? "bg-[#2D4A1E] text-white opacity-80 cursor-not-allowed"
                      : "bg-[#2D4A1E] text-white hover:bg-[#243D18] active:scale-[0.98]"
                  }`}
                >
                  {loading ? "Sending…" : "Continue"}
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom nav — mobile only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNav />
      </div>
      </div>
      )
      }