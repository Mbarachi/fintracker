import { useQuery } from "@tanstack/react-query";
import { transactionService } from "@/services/transactionService";

export const useTransactions = () => {
    return useQuery<any[]>({
        queryKey: ["transactions"],
        queryFn: async () => {
            const data = await transactionService.getTransactionsList();
            return data;
        },
        enabled: true,
    },
    );
}