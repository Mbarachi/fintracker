import apiClient from "@lib/apiClient";

export const transactionService = {
    getTransactionsList: async () => {
        const { data } = await apiClient.get("/api/transactions");
        return data;
    }
}