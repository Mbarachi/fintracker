import React, { useState } from "react";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import { TransactionTable } from "@components/transactions/TransactionTable";
import { useTransactions } from "@/hooks/useTransactions";
import { useDebounce } from "@/hooks/useDebounce";
import Loader from "@components/ui/Loader";


export const TransactionsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [merchantFilter, setMerchantFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const debouncedMerchantFilter = useDebounce(merchantFilter, 400);

  const { data: transactionsData, isLoading } = useTransactions({
    page: page,
    merchant: debouncedMerchantFilter || undefined,
    date: dateFilter || undefined,
  });

  const totalPages = transactionsData?.pagination.totalPages ?? 1;

  return (
    <div className="min-h-screen w-full overflow-x-hidden px-2 sm:px-0">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text-light-primary">Transactions</h1>
        <p className="text-sm text-text-light-secondary mt-1">
          View and manage all your financial activities
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        {/* Merchant Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm text-gray-500 mb-1">Filter by Merchant</label>
          <Input
            placeholder="Search..."
            value={merchantFilter}
            onChange={(e) => setMerchantFilter(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Date Filter */}
        <div className="flex-1 min-w-[150px]">
          <label className="text-sm text-gray-500 mb-1">Filter by Date</label>
          <Input
            type="date"
            value={dateFilter}
            max={new Date().toISOString().split("T")[0]} // Prevent future dates
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex-none sm:mt-0">
          <Button
            size="sm"
            className="w-full mt-4 sm:w-auto"
            onClick={() => {
              setMerchantFilter("");
              setDateFilter("");
              setPage(1);
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <TransactionTable transactions={transactionsData?.items ?? []} columns={["date", "merchant", "amount", "paymentMethod", "referenceNumber", "status", "action"]} />
        {/* Pagination */}
        <div className="flex items-center justify-end p-4 border-t border-border-light text-sm text-gray-500 gap-3">
          <Button
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};