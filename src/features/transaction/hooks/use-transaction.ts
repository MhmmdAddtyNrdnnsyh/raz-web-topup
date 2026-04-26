import { useQuery } from "@tanstack/react-query";
import {
  getTransactions,
  getTransactionById,
} from "@/services/transaction-service";

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransactionById(id),
    enabled: !!id,
  });
}
