import { GoogleIcon, AppleIcon } from "@/components/ui/Icons";

export function SocialButtons() {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 text-[13px] font-medium cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <GoogleIcon />
        Google
      </button>
      <button
        type="button"
        className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 text-[13px] font-medium cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <AppleIcon />
        Apple
      </button>
    </div>
  );
}

export function Divider() {
  return (
    <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium">
      <span className="flex-1 h-px bg-gray-200" />
      OR
      <span className="flex-1 h-px bg-gray-200" />
    </div>
  );
}