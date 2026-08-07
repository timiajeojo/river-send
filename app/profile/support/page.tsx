// app/profile/support/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logOut } from "@/lib/auth";
import BottomNav from "@/components/dashboard/BottomNav";

const navItems = [
  { id: "home",     label: "Home",     route: "/dashboard", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
  { id: "activity", label: "Activity", route: "/activity",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { id: "transfer", label: "Transfer", route: "/transfer",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> },
  { id: "profile",  label: "Profile",  route: "/profile",   icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
];

const faqs = [
  { q: "How do I send money?",          a: "Go to the Transfer tab, select a contact, enter an amount and tap Continue." },
  { q: "How long do transfers take?",   a: "Most transfers are instant. International transfers may take 1–3 business days." },
  { q: "How do I change my password?",  a: "Go to Profile → Security → Change Password and follow the steps." },
  { q: "Is my money safe?",             a: "Yes. We use bank-level 256-bit encryption and two-factor authentication." },
  { q: "How do I contact support?",     a: "Email us at support@riverpay.com or use the message form below." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-50 last:border-0">
      <button type="button" onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left border-none cursor-pointer bg-transparent hover:bg-gray-50 transition-colors">
        <p className="text-[14px] font-semibold text-gray-900 pr-4">{q}</p>
        <svg className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && <div className="px-5 pb-4"><p className="text-[13px] text-gray-500 leading-relaxed">{a}</p></div>}
    </div>
  );
}

export default function SupportPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [sent, setSent]       = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true); setMessage("");
    setTimeout(() => setSent(false), 3000);
  };

  const handleLogout = async () => { await logOut(); router.push("/"); };

  return (
    <div className="min-h-svh w-full bg-[#f5f5f5] flex flex-col lg:flex-row">

      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-[240px] xl:w-[260px] shrink-0 bg-white border-r border-gray-100 min-h-screen sticky top-0">
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#AAFF00] flex items-center justify-center text-black text-lg font-black">R</div>
            <span className="text-[20px] font-extrabold tracking-tight text-gray-900">Riverpay</span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {navItems.map((item) => (
            <button key={item.id} type="button" onClick={() => router.push(item.route)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold w-full text-left border-none cursor-pointer transition-colors ${
                item.id === "profile" ? "bg-[#AAFF00]/10 text-gray-900" : "bg-transparent text-gray-400 hover:bg-gray-50 hover:text-gray-700"
              }`}>
              <span className={item.id === "profile" ? "text-gray-900" : "text-gray-400"}>{item.icon}</span>
              {item.label}
              {item.id === "profile" && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#AAFF00]" />}
            </button>
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

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Desktop top bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 border-none cursor-pointer hover:bg-gray-200 transition-colors">
              <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </button>
            <div>
              <h1 className="text-[20px] font-bold text-gray-900">Support</h1>
              <p className="text-[13px] text-gray-400">We're here to help</p>
            </div>
          </div>
          <button type="button" onClick={handleLogout} className="px-4 py-2 rounded-xl text-[13px] font-semibold text-red-500 bg-red-50 border-none cursor-pointer hover:bg-red-100 transition-colors">Logout</button>
        </div>

        <div className="flex-1 overflow-y-auto pb-24 lg:pb-10">
          <div className="px-4 pt-5 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8 max-w-[640px] lg:max-w-none mx-auto lg:mx-0">

            {/* Mobile back + title */}
            <div className="flex items-center gap-3 mb-6 lg:hidden">
              <button type="button" onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm border-none cursor-pointer hover:bg-gray-50 shrink-0">
                <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              </button>
              <h1 className="text-[20px] font-bold text-gray-900">Support</h1>
            </div>

            {/* Desktop: two-col | Mobile: single col */}
            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">

              {/* Left col */}
              <div className="flex flex-col gap-5">

                {/* Contact cards */}
                <div>
                  <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Contact Us</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Email Us", sub: "support@riverpay.com", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg> },
                      { label: "Call Us",  sub: "+1 (800) 555-0100",    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.22 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.16a16 16 0 006.93 6.93l1.45-1.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> },
                    ].map((c) => (
                      <div key={c.label} className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-2">
                        <span className="text-[#7CB800]">{c.icon}</span>
                        <p className="text-[13px] font-bold text-gray-900">{c.label}</p>
                        <p className="text-[11px] text-gray-400 break-all">{c.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Send message */}
                <div>
                  <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Send a Message</p>
                  <div className="bg-white rounded-2xl shadow-sm p-5">
                    {sent ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#AAFF00] flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <p className="text-[14px] font-semibold text-gray-900">Message sent! We'll get back to you soon.</p>
                      </div>
                    ) : (
                      <>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Describe your issue..."
                          rows={4}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[14px] text-gray-900 placeholder-gray-400 outline-none focus:border-[#AAFF00] focus:ring-2 focus:ring-[#AAFF00]/20 resize-none transition-all duration-200 mb-3"
                        />
                        <button type="button" onClick={handleSend} disabled={!message.trim()}
                          className="w-full py-3.5 bg-[#111] text-white text-[14px] font-bold rounded-2xl border-none cursor-pointer hover:bg-[#222] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                          Send Message
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right col: FAQ */}
              <div>
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">FAQ</p>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50"><BottomNav /></div>
    </div>
  );
}
