import type { Transaction } from "@/features/transaction/types";
import { MOCK_TRANSACTIONS } from "@/lib/mock-data";

export async function getTransactions(): Promise<Transaction[]> {
  // return apiClient.get<Transaction[]>('/transactions');
  return Promise.resolve(MOCK_TRANSACTIONS);
}

export async function getTransactionById(
  id: string
): Promise<Transaction | null> {
  // return apiClient.get<Transaction>(`/transactions/${id}`);
  return Promise.resolve(MOCK_TRANSACTIONS.find((t) => t.id === id) ?? null);
}
