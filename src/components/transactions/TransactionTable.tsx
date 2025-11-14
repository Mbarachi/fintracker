import type { Transaction } from "@/types/transaction";
import { formatDate } from "@lib/utils/formatDate";


export const TransactionTable: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => (
    <div className="rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-3 gap-4 bg-gray-100 px-6 py-3">
            <p className="text-sm font-semibold text-text-light-secondary">Merchant</p>
            <p className="text-sm font-semibold text-text-light-secondary">Date</p>
            <p className="text-sm font-semibold text-text-light-secondary text-right">Amount</p>
        </div>

        {/* Transactions */}
        {transactions.map((tx, idx) => (
            <div
                key={idx}
                className="grid grid-cols-3 gap-4 items-center px-6 py-4 hover:bg-gray-50 transition-colors"
            >
                <p className="text-sm font-medium text-text-light-primary">{tx.merchant}</p>
                <p className="text-sm text-text-light-secondary">{formatDate(tx.date)}</p>
                <p
                    className={`text-sm font-medium text-right ${tx.amount > 0 ? 'text-positive' : 'text-negative'
                        }`}
                >
                    ${tx.amount}
                </p>
            </div>
        ))}
    </div>
);