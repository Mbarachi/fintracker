import type { TransactionFilters } from "@/types/transaction";
import apiClient from "@lib/apiClient";

const cleanParams = (filters: TransactionFilters) =>
    Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== undefined && v !== null)
    ); // Prevents sending undefined/null params in the request

export const transactionService = {
    getTransactionsList: async (filters: TransactionFilters = {}) => {
        const { data } = await apiClient.get("/api/transactions", {
            params: cleanParams(filters),
        });
        return data;
    },
};