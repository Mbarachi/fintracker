import type { Transaction } from "@/types/transaction";
import { TransactionTable } from "./TransactionTable";

interface RecentTransactionsProps {
    transactions: Transaction[];
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => (
    <div className="rounded-xl border border-border-light bg-surface-light overflow-hidden">
        <div className="flex flex-col divide-y divide-border-light">
            <TransactionTable transactions={transactions} columns={["date", "merchant", "amount"]} />
        </div>
    </div>
);