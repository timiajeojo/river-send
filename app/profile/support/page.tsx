// app/profile/support/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const faqs = [
  { q: "How do I send money?",             a: "Go to the Transfer tab, select a contact, enter an amount and tap Continue." },
  { q: "How long do transfers take?",      a: "Most transfers are instant. International transfers may take 1-3 business days." },
  { q: "How do I change my password?",     a: "Go to Profile → Security → Change Password and follow the steps." },
  { q: "Is my money safe?",                a: "Yes. We use bank-level 256-bit encryption and two-factor authentication to protect your account." },
  { q: "How do I contact support?",        a: "You can email us at support@riverpay.com or use the chat button below." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-gray-50 last:border-0`}>
      <button type="button" onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between gap-3 px-4 py-4 sm:px-5 text-left border-none cursor-pointer bg-transparent hover:bg-gray-50 transition-colors">
        <p className="text-[14px] font-semibold text-gray-900 pr-1">{q}</p>
        <svg className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 sm:px-5">
          <p className="text-[13px] text-gray-500 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function SupportPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="min-h-svh w-full max-w-[100vw] overflow-x-hidden bg-[#f5f5f5]">
      <div className="max-w-full sm:max-w-[500px] lg:max-w-[600px] mx-auto px-4 pt-5 pb-16 sm:px-5 sm:pt-5 lg:px-8 lg:pt-8">

        {/* Back + title */}
        <div className="flex items-center gap-3 mb-7">
          <button type="button" onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm border-none cursor-pointer hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 className="text-[20px] font-bold text-gray-900">Support</h1>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-6">
          {[
            { label: "Email Us", sub: "support@riverpay.com", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg> },
            { label: "Call Us",  sub: "+1 (800) 555-0100",    icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.22 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.16a16 16 0 006.93 6.93l1.45-1.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> },
          ].map((c) => (
            <div key={c.label} className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-2 min-w-0">
              <span className="text-[#7CB800]">{c.icon}</span>
              <p className="text-[13px] font-bold text-gray-900">{c.label}</p>
              <p className="text-[11px] text-gray-400 break-words">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">FAQ</p>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
        </div>

        {/* Send message */}
        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Send a Message</p>
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5">
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
              <button
                type="button"
                onClick={handleSend}
                disabled={!message.trim()}
                className="w-full py-3.5 bg-[#111] text-white text-[14px] font-bold rounded-2xl border-none cursor-pointer hover:bg-[#222] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send Message
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
