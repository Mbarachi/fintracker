export interface Transaction {
    id: string;
    date: string;
    merchant: string;
    description: string;
    amount: number;
    account: string;
    status: "completed" | "pending";
    paymentMethod:
    | "Debit Card"
    | "Credit Card"
    | "Bank Transfer"
    | "Mobile Payment";
    referenceNumber: string;
}

export interface Pagination {
    totalItems: number;
    totalPages: number;
    page: number;
    pageSize: number;
}

export interface TransactionResponse {
    items: Transaction[];
    pagination: Pagination;
}

export interface TransactionFilters {
    page?: number;
    merchant?: string;
    date?: string;
}