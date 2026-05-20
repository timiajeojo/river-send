
export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between mb-5">
      {/* Avatar + greeting */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#AAFF00]/40 shrink-0">
          <img
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80&auto=format&fit=crop&crop=face"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-[15px] font-bold text-gray-900 leading-tight">Hello Tega 👋</p>
          <p className="text-[12px] text-gray-400">Welcome back</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <div className="relative">
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border-none cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </button>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#AAFF00] rounded-full ring-1 ring-white" />
        </div>

        {/* More options */}
        <button
          type="button"
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border-none cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="19" cy="12" r="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
