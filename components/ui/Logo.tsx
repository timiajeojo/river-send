interface LogoProps {
  dark?: boolean;
}

export default function Logo({ dark = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-xl bg-[#AAFF00] flex items-center justify-center text-black text-lg font-black">
        R
      </div>
      <span
        className={`text-[22px] font-extrabold tracking-tight ${
          dark ? "text-gray-900" : "text-white"
        }`}
      >
        Riverpay
      </span>
    </div>
  );
}