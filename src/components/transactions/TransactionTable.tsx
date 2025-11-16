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

    const navigate = useNavigate();

    const handleViewDetails = (id: string) => {
        navigate(`/transactions/${id}`);
    };

    return (
        <div className="w-full overflow-x-auto max-w-[400px] md:max-w-none">
            <table className="min-w-max w-full border-collapse">
                <thead className="bg-surface-light">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col}
                                className="px-4 py-2 text-left text-sm font-semibold text-text-light-secondary whitespace-nowrap"
                            >
                                {col.charAt(0).toUpperCase() + col.slice(1)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                            {columns.includes("date") && (
                                <td className="px-4 py-2 whitespace-nowrap">{formatDate(tx.date)}</td>
                            )}
                            {columns.includes("merchant") && (
                                <td className="px-4 py-2 whitespace-nowrap">{tx.merchant}</td>
                            )}
                            {columns.includes("amount") && (
                                <td className={`px-4 py-2 whitespace-nowrap ${tx.amount < 0 ? "text-negative" : "text-positive"}`}>
                                    {new Intl.NumberFormat("en-us", {
                                        style: "currency",
                                        currency: "USD",
                                    }).format(tx.amount)}
                                </td>
                            )}
                            {columns.includes("paymentMethod") && (
                                <td className="px-4 py-2 whitespace-nowrap">{tx.paymentMethod}</td>
                            )}
                            {columns.includes("referenceNumber") && (
                                <td className="px-4 py-2 whitespace-nowrap">{tx.referenceNumber}</td>
                            )}
                            {columns.includes("status") && (
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <span
                                        className={`${tx.status === "completed"
                                            ? "bg-green-200 text-green-500"
                                            : "bg-amber-200 text-amber-500"
                                            } px-2 py-1 text-xs font-semibold rounded-[5px] w-fit capitalize`}
                                    >
                                        {tx.status}
                                    </span>
                                </td>
                            )}
                            {columns.includes("action") && (
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        className="flex gap-1"
                                        onClick={() => handleViewDetails(tx.id)}
                                    >
                                        View
                                        <EyeIcon size={20} />
                                    </Button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};