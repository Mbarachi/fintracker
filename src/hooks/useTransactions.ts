import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { transactionService } from "@/services/transactionService";
import type { TransactionFilters, TransactionResponse } from "@/types/transaction";

export const useTransactions = (filters: TransactionFilters) => {
    return useQuery<TransactionResponse>({
        queryKey: ["transactions", filters],
        queryFn: async () => {
            const data = await transactionService.getTransactionsList(filters);
            return data;
        },
        placeholderData: keepPreviousData, // smooth pagination UX
        refetchOnWindowFocus: true,
    },
    );
}