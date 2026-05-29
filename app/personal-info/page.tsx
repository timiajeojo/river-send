// app/profile/personal-info/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const iCls = "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 text-[14px] placeholder-gray-400 outline-none focus:border-[#AAFF00] focus:ring-2 focus:ring-[#AAFF00]/20 transition-all duration-200";
const lCls = "text-[12px] font-semibold text-gray-500 mb-1.5 block uppercase tracking-wide";

export default function PersonalInfoPage() {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName:  "Tega",
    lastName:   "Collins",
    email:      "tegascollins@example.com",
    phone:      "+1 (555) 000-0000",
    address:    "123 Main Street",
    city:       "New York",
    country:    "United States",
  });

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-svh w-full bg-[#f5f5f5]">
      <div className="max-w-[500px] lg:max-w-[600px] mx-auto px-5 pt-6 pb-16 lg:px-8 lg:pt-8">

        {/* Back + title */}
        <div className="flex items-center gap-3 mb-7">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm border-none cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="text-[20px] font-bold text-gray-900">Personal Info</h1>
          <button
            type="button"
            onClick={() => editing ? handleSave() : setEditing(true)}
            className="ml-auto text-[13px] font-semibold text-[#7CB800] bg-transparent border-none cursor-pointer"
          >
            {editing ? "Save" : "Edit"}
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-[#AAFF00]/30">
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80&auto=format&fit=crop&crop=face" alt="avatar" className="w-full h-full object-cover" />
            </div>
            {editing && (
              <button type="button" className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#AAFF00] flex items-center justify-center border-none cursor-pointer shadow-sm">
                <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
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
              <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <p className="text-[13px] font-semibold text-gray-900">Changes saved successfully</p>
          </div>
        )}

        {/* Form fields */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lCls}>First Name</label>
              <input name="firstName" value={form.firstName} onChange={handle} disabled={!editing} className={`${iCls} ${!editing ? "bg-gray-50 text-gray-500" : ""}`} />
            </div>
            <div>
              <label className={lCls}>Last Name</label>
              <input name="lastName" value={form.lastName} onChange={handle} disabled={!editing} className={`${iCls} ${!editing ? "bg-gray-50 text-gray-500" : ""}`} />
            </div>
          </div>

          <div>
            <label className={lCls}>Email Address</label>
            <input name="email" type="email" value={form.email} onChange={handle} disabled={!editing} className={`${iCls} ${!editing ? "bg-gray-50 text-gray-500" : ""}`} />
          </div>

          <div>
            <label className={lCls}>Phone Number</label>
            <input name="phone" value={form.phone} onChange={handle} disabled={!editing} className={`${iCls} ${!editing ? "bg-gray-50 text-gray-500" : ""}`} />
          </div>

          <div>
            <label className={lCls}>Address</label>
            <input name="address" value={form.address} onChange={handle} disabled={!editing} className={`${iCls} ${!editing ? "bg-gray-50 text-gray-500" : ""}`} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lCls}>City</label>
              <input name="city" value={form.city} onChange={handle} disabled={!editing} className={`${iCls} ${!editing ? "bg-gray-50 text-gray-500" : ""}`} />
            </div>
            <div>
              <label className={lCls}>Country</label>
              <input name="country" value={form.country} onChange={handle} disabled={!editing} className={`${iCls} ${!editing ? "bg-gray-50 text-gray-500" : ""}`} />
            </div>
          </div>

          {editing && (
            <button type="button" onClick={handleSave} className="w-full py-4 bg-[#111] text-white text-[14px] font-bold rounded-2xl border-none cursor-pointer hover:bg-[#222] transition-colors mt-2">
              Save Changes
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
