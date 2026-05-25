// app/dashboard/page.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BalanceCard from "@/components/dashboard/BalanceCard";
import QuickActions from "@/components/dashboard/QuickActions";
import PromoBanner from "@/components/dashboard/PromoBanner";
import TransactionList from "@/components/dashboard/TransactionList";
import BottomNav from "@/components/dashboard/BottomNav";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-svh bg-[#f5f5f5]">

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 pt-5 pb-4 max-w-[430px] mx-auto">
          <DashboardHeader />
          <BalanceCard />
          <QuickActions />
          <PromoBanner />
          <TransactionList />
        </div>
      </div>

      {/* Sticky bottom nav */}
      <div className="sticky bottom-0 max-w-[430px] mx-auto w-full">
        <BottomNav />
      </div>

    </div>
  );
}
