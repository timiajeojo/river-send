// app/profile/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { logOut } from "@/lib/auth";
import BottomNav from "@/components/dashboard/BottomNav";

// Sidebar nav item
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

// Menu row
function MenuRow({ label, icon, onClick, badge, danger }: {
  label: string; icon: React.ReactNode; onClick: () => void;
  badge?: React.ReactNode; danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-4 text-left border-none cursor-pointer transition-colors hover:bg-gray-50 ${
        danger ? "text-red-500" : "text-gray-900"
      }`}
    >
      <span className={`shrink-0 ${danger ? "text-red-400" : "text-gray-500"}`}>{icon}</span>
      <span className={`flex-1 text-[15px] font-medium ${danger ? "text-red-500" : "text-gray-900"}`}>{label}</span>
      {badge && <span className="shrink-0">{badge}</span>}
      {!danger && (
        <svg className="w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      )}
    </button>
  );
}

export default function ProfilePage() {
  const router = useRouter();

  const navItems = [
    { id: "home",     label: "Home",     route: "/dashboard", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
    { id: "activity", label: "Activity", route: "/activity",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
    { id: "transfer", label: "Transfer", route: "/transfer",  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> },
    { id: "profile",  label: "Profile",  route: "/profile",   icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  ];

  const handleLogout = async () => {
    await logOut();
    router.push("/auth");
  };

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
            <SidebarItem key={item.id} label={item.label} active={item.id === "profile"} icon={item.icon} onClick={() => router.push(item.route)} />
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

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Desktop top bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100 shrink-0">
          <div>
            <h1 className="text-[20px] font-bold text-gray-900">Profile</h1>
            <p className="text-[13px] text-gray-400">Manage your account</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-[13px] font-semibold text-red-500 bg-red-50 border-none cursor-pointer hover:bg-red-100 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-28 lg:pb-10">
          <div className="px-5 pt-6 lg:px-8 lg:pt-8 w-full max-w-[500px] lg:max-w-[600px] mx-auto lg:mx-0">

            {/* ── MOBILE HEADER ── */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#AAFF00]/40 shrink-0">
                  <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80&auto=format&fit=crop&crop=face" alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-gray-900 leading-tight">Hello Tega</p>
                  <p className="text-[12px] text-gray-400">tegascollins@example.com</p>
                </div>
              </div>
              {/* Edit icon */}
              <button type="button" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border-none cursor-pointer hover:bg-gray-50">
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </button>
            </div>

            {/* ── PAGE TITLE ── */}
            <h1 className="text-[28px] sm:text-[32px] font-extrabold text-gray-900 tracking-tight mb-5 lg:hidden">
              Profile
            </h1>

            {/* ── PROFILE CARD ── */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
              <button
                type="button"
                onClick={() => router.push("/profile/personal-info")}
                className="w-full flex items-center gap-3 px-5 py-4 text-left border-none cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="w-11 h-11 rounded-full overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80&auto=format&fit=crop&crop=face" alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-gray-900">Hello Tega</p>
                  <p className="text-[12px] text-gray-400 truncate">tegascollins@example.com</p>
                </div>
                <svg className="w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>

            {/* ── MENU ITEMS ── */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">

              {/* Personal Info */}
              <MenuRow
                label="Personal Info"
                onClick={() => router.push("/profile/personal-info")}
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                }
              />
              <div className="h-px bg-gray-50 mx-5" />

              {/* Security */}
              <MenuRow
                label="Security"
                onClick={() => router.push("/profile/security")}
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                }
              />
              <div className="h-px bg-gray-50 mx-5" />

              {/* Notifications */}
              <MenuRow
                label="Notifications"
                onClick={() => router.push("/profile/notifications")}
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 01-3.46 0"/>
                  </svg>
                }
                badge={<span className="w-2.5 h-2.5 rounded-full bg-green-500 block" />}
              />
              <div className="h-px bg-gray-50 mx-5" />

              {/* Support */}
              <MenuRow
                label="Support"
                onClick={() => router.push("/profile/support")}
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                }
              />
            </div>

            {/* ── LOGOUT ── */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-4 text-[15px] font-semibold text-red-500 bg-transparent border-none cursor-pointer hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom nav — mobile only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNav />
      </div>

    </div>
  );
}
