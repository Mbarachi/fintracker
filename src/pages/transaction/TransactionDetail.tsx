import { useTransactionById } from "@/hooks/useTransactionById";
import { formatDate } from "@lib/utils/formatDate";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const TransactionDetail = () => {

  const { id } = useParams();

  const { data: transaction } = useTransactionById(id!);
  const navigate = useNavigate();
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary font-medium hover:underline"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Card Container */}
      <div className="bg-surface-light rounded-xl p-6 space-y-6 shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
        {/* Header */}
        <div className="space-y-1">
          <p className="text-text-light-secondary text-sm">{formatDate(transaction?.date || "")}</p>
          <h1 className="text-text-light-primary text-2xl font-bold">{transaction?.merchant}</h1>
          <p className="text-text-light-secondary text-sm">{transaction?.description}</p>
        </div>

        {/* Amount & Status */}
        <div className="flex justify-between items-center bg-gray-50 rounded-lg">
          <div>
            <p className="text-text-light-secondary text-sm font-medium">Amount</p>
            <p className={`text-2xl font-bold ${transaction?.amount || 0 > 0 ? "text-positive" : "text-negative"}`}>
              ${Math.abs(transaction?.amount || 0).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-text-light-secondary text-sm font-medium">Status</p>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-[5px] capitalize ${transaction?.status === "completed" ? "bg-green-200 text-green-500" : "bg-amber-200 text-amber-500"
                }`}
            >
              {transaction?.status}
            </span>
          </div>
        </div>

        {/* Payment Details */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between">
            <span className="text-text-light-secondary font-medium">Payment Method</span>
            <span className="text-text-light-primary">{transaction?.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-light-secondary font-medium">Account</span>
            <span className="text-text-light-primary">{transaction?.account}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-light-secondary font-medium">Reference Number</span>
            <span className="text-text-light-primary">{transaction?.referenceNumber}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetail