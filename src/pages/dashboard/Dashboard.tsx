import { useCurrentUser } from "@/hooks/useCurrentUser";
import WelcomeBanner from "./WelcomeBanner";
import { SummaryCard } from "@components/cards/SummaryCard";
import { RecentTransactions } from "@components/transactions/RecentTransactions";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useDashboardStats } from "@/hooks/useDashboardStats";

export const Dashboard: React.FC = () => {
  const { data: user } = useCurrentUser();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();

  const accountBalance = stats ? (stats?.income.amount) - Math.abs(stats?.expenses.amount) : 0;
  const income = stats ? stats?.income.amount : 0;
  const expenses = stats ? stats?.expenses.amount : 0;
  const netExpense = stats ? (stats?.income.amount) + Math.abs(stats?.expenses.amount) : 0;


  const recentTransactions = stats?.mostRecentTransactions

  return (
    <div className="mx-auto max-w-7xl">
      <WelcomeBanner name={user?.firstName ?? ""} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col justify-between rounded-xl bg-surface-light p-6 border border-border-light">
          <div>
            <p className="text-text-light-secondary text-sm font-medium mb-1">Account Balance</p>
            <p className="text-text-light-primary text-4xl font-bold leading-tight tracking-[-0.033em]">${accountBalance.toFixed(2)}</p>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="flex w-full items-center justify-center rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold">Add Funds</button>
            <button className="flex w-full items-center justify-center rounded-lg h-10 px-4 bg-primary/20 text-primary text-sm font-bold">Transfer</button>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SummaryCard icon={TrendingUp} title="Income this Month" value={`$${income.toFixed(2)}`} />
          <SummaryCard icon={TrendingDown} title="Expenses this Month" value={`$${expenses.toFixed(2)}`} bgColor="bg-red-500/10" />
          <SummaryCard icon={Wallet} title="Net Cash Flow" value={`$${netExpense.toFixed(2)}`} bgColor="bg-blue-500/10" />
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-text-light-primary text-xl font-bold leading-tight tracking-[-0.015em]">Recent Transactions</h2>
          <a className="text-primary text-sm font-semibold hover:underline" href="#">View All</a>
        </div>
        <div className="w-full overflow-x-auto">
          <RecentTransactions transactions={recentTransactions ?? []} />
        </div>
      </div>
    </div>
  );
};