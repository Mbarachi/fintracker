import type { Transaction } from "@/types/transaction";
import { formatDate } from "@lib/utils/formatDate";

interface TransactionTableProps {
    transactions: Transaction[];
    columns?: ("merchant" | "date" | "amount" | "paymentMethod" | "referenceNumber" | "status")[];
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
    transactions,
    columns = ["merchant", "date", "amount"], // default minimal columns
}) => {
    const columnClasses: Record<string, string> = {
        merchant: "text-sm font-medium text-text-light-primary",
        date: "text-sm text-text-light-secondary",
        paymentMethod: "text-sm text-text-light-secondary hidden sm:block",
        referenceNumber: "text-sm text-text-light-secondary hidden sm:block",
        status: "px-3 py-1 text-xs font-semibold rounded-full hidden sm:inline-block w-fit",
        amount: "text-sm font-medium",
    };

    return (
        <div className="rounded-lg overflow-hidden">
            {/* Header */}
            <div
                className="grid gap-4 bg-gray-100 px-6 py-3"
                style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
            >
                {columns.includes("merchant") && <p className="text-sm font-semibold text-text-light-secondary">Merchant</p>}
                {columns.includes("amount") && <p className="text-sm font-semibold text-text-light-secondary">Amount</p>}
                {columns.includes("paymentMethod") && <p className="text-sm font-semibold text-text-light-secondary hidden sm:block">Payment Method</p>}
                {columns.includes("referenceNumber") && <p className="text-sm font-semibold text-text-light-secondary hidden sm:block">Reference</p>}
                {columns.includes("status") && <p className="text-sm font-semibold text-text-light-secondary hidden sm:block">Status</p>}
                {columns.includes("date") && <p className="text-sm font-semibold text-text-light-secondary">Date</p>}
            </div>

            {/* Transactions */}
            {transactions.map((tx) => (
                <div
                    className={`grid gap-4 items-center px-6 py-4 hover:bg-gray-50 transition-colors`}
                    style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
                    key={tx.referenceNumber}
                >
                    {columns.includes("merchant") && <p className={columnClasses.merchant}>{tx.merchant}</p>}
                    {columns.includes("amount") && (
                        <p className={`${columnClasses.amount} ${tx.amount > 0 ? "text-positive" : "text-negative"}`}>
                            ${tx.amount}
                        </p>
                    )}
                    {columns.includes("paymentMethod") && <p className={columnClasses.paymentMethod}>{tx.paymentMethod}</p>}
                    {columns.includes("referenceNumber") && <p className={columnClasses.referenceNumber}>{tx.referenceNumber}</p>}
                    {columns.includes("status") && (
                        <span
                            className={`${columnClasses.status} ${tx.status === "completed" ? "bg-green-200 text-green-500" : "bg-amber-200 text-amber-500"
                                }`}
                        >
                            {tx.status}
                        </span>
                    )}
                    {columns.includes("date") && <p className={columnClasses.date}>{formatDate(tx.date)}</p>}
                </div>
            ))}
        </div>
    );
};
