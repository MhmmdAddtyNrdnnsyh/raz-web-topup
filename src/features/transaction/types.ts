export interface Transaction {
  id: string;
  orderId: string;
  productName: string;
  productImage: string;
  nominal: string;
  amount: number;
  fee: number;
  totalAmount: number;
  paymentMethod: string;
  status: "pending" | "processing" | "success" | "failed";
  userInputs: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}
