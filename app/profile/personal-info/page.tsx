// app/profile/personal-info/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logOut } from "@/lib/auth";
import BottomNav from "@/components/dashboard/BottomNav";

const iCls = "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 text-[14px] placeholder-gray-400 outline-none focus:border-[#AAFF00] focus:ring-2 focus:ring-[#AAFF00]/20 transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500";
const lCls = "text-[12px] font-semibold text-gray-500 mb-1.5 block uppercase tracking-wide";

const navItems = [
  { id: "home",     label: "Home",     route: "/dashboard", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
  { id: "activity", label: "Activity", route: "/activity",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { id: "transfer", label: "Transfer", route: "/transfer",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> },
  { id: "profile",  label: "Profile",  route: "/profile",   icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
];

export default function PersonalInfoPage() {
  const router  = useRouter();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved]     = useState(false);
  const [form, setForm] = useState({
    firstName: "Tega", lastName: "Collins",
    email: "tegascollins@example.com", phone: "+1 (555) 000-0000",
    address: "123 Main Street", city: "New York", country: "United States",
  });

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = () => {
    setEditing(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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
              }`}
            >
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
              <h1 className="text-[20px] font-bold text-gray-900">Personal Info</h1>
              <p className="text-[13px] text-gray-400">Update your personal details</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => editing ? handleSave() : setEditing(true)}
              className="px-4 py-2 rounded-xl text-[13px] font-semibold text-[#7CB800] bg-[#AAFF00]/10 border-none cursor-pointer hover:bg-[#AAFF00]/20 transition-colors">
              {editing ? "Save Changes" : "Edit"}
            </button>
            <button type="button" onClick={handleLogout} className="px-4 py-2 rounded-xl text-[13px] font-semibold text-red-500 bg-red-50 border-none cursor-pointer hover:bg-red-100 transition-colors">
              Logout
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-24 lg:pb-10">
          <div className="px-4 pt-5 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8 max-w-[640px] lg:max-w-[720px] mx-auto lg:mx-0">

            {/* Mobile back + title */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm border-none cursor-pointer hover:bg-gray-50">
                  <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                </button>
                <h1 className="text-[20px] font-bold text-gray-900">Personal Info</h1>
              </div>
              <button type="button" onClick={() => editing ? handleSave() : setEditing(true)}
                className="text-[13px] font-semibold text-[#7CB800] bg-transparent border-none cursor-pointer">
                {editing ? "Save" : "Edit"}
              </button>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-4 ring-[#AAFF00]/30">
                  <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80&auto=format&fit=crop&crop=face" alt="avatar" className="w-full h-full object-cover" />
                </div>
                {editing && (
                  <button type="button" className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#AAFF00] flex items-center justify-center border-none cursor-pointer shadow-sm">
                    <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  </button>
                )}
              </div>
              <p className="text-[16px] font-bold text-gray-900 mt-3">{form.firstName} {form.lastName}</p>
              <p className="text-[13px] text-gray-400">{form.email}</p>
            </div>

            {/* Success */}
            {saved && (
              <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-2xl px-4 py-3 mb-5">
                <div className="w-7 h-7 rounded-full bg-[#AAFF00] flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <p className="text-[13px] font-semibold text-gray-900">Changes saved successfully</p>
              </div>
            )}

            {/* Form */}
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={lCls}>First Name</label><input name="firstName" value={form.firstName} onChange={handle} disabled={!editing} className={iCls} /></div>
                <div><label className={lCls}>Last Name</label><input name="lastName" value={form.lastName} onChange={handle} disabled={!editing} className={iCls} /></div>
              </div>
              <div><label className={lCls}>Email Address</label><input name="email" type="email" value={form.email} onChange={handle} disabled={!editing} className={iCls} /></div>
              <div><label className={lCls}>Phone Number</label><input name="phone" value={form.phone} onChange={handle} disabled={!editing} className={iCls} /></div>
              <div><label className={lCls}>Address</label><input name="address" value={form.address} onChange={handle} disabled={!editing} className={iCls} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={lCls}>City</label><input name="city" value={form.city} onChange={handle} disabled={!editing} className={iCls} /></div>
                <div><label className={lCls}>Country</label><input name="country" value={form.country} onChange={handle} disabled={!editing} className={iCls} /></div>
              </div>
              {editing && (
                <button type="button" onClick={handleSave} className="w-full py-4 bg-[#111] text-white text-[14px] font-bold rounded-2xl border-none cursor-pointer hover:bg-[#222] transition-colors mt-2">
                  Save Changes
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50"><BottomNav /></div>
    </div>
  );
}
