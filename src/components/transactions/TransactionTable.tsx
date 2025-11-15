import type { Transaction } from "@/types/transaction";
import Button from "@components/ui/Button";
import { formatDate } from "@lib/utils/formatDate";
import { EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TransactionTableProps {
    transactions: Transaction[];
    columns?: (
        | "date"
        | "merchant"
        | "amount"
        | "paymentMethod"
        | "referenceNumber"
        | "status"
        | "action"
    )[];
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
    transactions,
    columns = ["date", "merchant", "amount"],
}) => {
    const columnClasses: Record<string, string> = {
        merchant: "text-sm font-medium text-text-light-primary",
        date: "text-sm text-text-light-secondary",
        paymentMethod: "text-sm text-text-light-secondary",
        referenceNumber: "text-sm text-text-light-secondary",
        status: "px-3 py-1 text-xs font-semibold rounded-[5px] w-fit capitalize",
        amount: "text-sm font-medium",
    };

    const minColWidthPx = 140;

    const navigate = useNavigate();

    const handleViewDetails = (id: string) => {
        navigate(`/transactions/${id}`);
    };

    return (
        <div className="w-full overflow-x-auto">
            < div className="rounded-lg overflow-hidden" >
                {/* Header */}
                <div
                    className="grid gap-4 px-6 py-3"
                    style={{
                        gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                    }}
                >
                    {
                        columns.map((col) => (
                            <p
                                key={col}
                                className="text-sm font-semibold text-text-light-secondary"
                            >
                                {col.charAt(0).toUpperCase() + col.slice(1)}
                            </p>
                        ))
                    }
                </div >

                {/* Rows */}
                {
                    transactions.map((tx) => (
                        <div
                            key={tx.id}
                            className="grid gap-4 items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                            style={{
                                gridTemplateColumns: `repeat(${columns.length}, minmax(${minColWidthPx}px, 1fr))`,
                            }}
                        >
                            {columns.includes("date") && (
                                <p className={columnClasses.date}>{formatDate(tx.date)}</p>
                            )}

                            {columns.includes("merchant") && (
                                <p className={columnClasses.merchant}>{tx.merchant}</p>
                            )}

                            {columns.includes("amount") && (
                                <p
                                    className={`${columnClasses.amount} ${tx.amount > 0 ? "text-positive" : "text-negative"
                                        }`}
                                >
                                    {new Intl.NumberFormat("en-us", {
                                        style: "currency",
                                        currency: "USD",
                                        currencyDisplay: "symbol",
                                    }).format(tx.amount)}
                                </p>
                            )}

                            {columns.includes("paymentMethod") && (
                                <p className={columnClasses.paymentMethod}>{tx.paymentMethod}</p>
                            )}

                            {columns.includes("referenceNumber") && (
                                <p className={columnClasses.referenceNumber}>
                                    {tx.referenceNumber}
                                </p>
                            )}

                            {columns.includes("status") && (
                                <span
                                    className={`${columnClasses.status} ${tx.status === "completed" ? "bg-green-200 text-green-500" : "bg-amber-200 text-amber-500"
                                        }`}
                                >
                                    {tx.status}
                                </span>
                            )}

                            {columns.includes("action") && (
                                <Button size="sm" variant="secondary" className="flex gap-1" onClick={() => handleViewDetails(tx.id)}>
                                    View Details
                                    <EyeIcon size={20} />
                                </Button>
                            )}
                        </div>
                    ))
                }

                {
                    transactions.length === 0 && (
                        <div className="p-6 text-center text-sm text-text-light-secondary">
                            No transactions found.
                        </div>
                    )
                }
            </div >
        </div >
    );
};