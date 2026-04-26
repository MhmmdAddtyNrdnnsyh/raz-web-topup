export interface Category {
  id: string;
  name: string;
  slug: string;
  group: string;
  icon: string;
  description: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categorySlug: string;
  image: string;
  publisher: string;
  description: string;
  inputFields: InputField[];
  nominals: Nominal[];
}

export interface InputField {
  key: string;
  label: string;
  placeholder: string;
  type: "text" | "number" | "select";
  required: boolean;
  options?: { label: string; value: string }[];
}

export interface Nominal {
  id: string;
  name: string;
  amount: number;
  price: number;
  originalPrice?: number;
  isPromo?: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  group: string;
  icon: string;
  fee: number;
  feeType: "fixed" | "percentage";
}

export interface CheckoutData {
  product: Product;
  nominal: Nominal;
  paymentMethod: PaymentMethod;
  userInputs: Record<string, string>;
}
