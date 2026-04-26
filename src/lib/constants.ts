export const APP_NAME = "RazzTopup";
export const APP_DESCRIPTION =
  "Platform top-up game, pulsa, dan produk digital terlengkap dan tercepat di Indonesia.";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const CATEGORY_SLUGS = {
  GAME: "game",
  PULSA: "pulsa",
  E_WALLET: "e-wallet",
  VOUCHER: "voucher",
  PLN: "pln",
  STREAMING: "streaming",
} as const;

export const PAYMENT_METHODS = {
  QRIS: "qris",
  BANK_TRANSFER: "bank-transfer",
  E_WALLET: "e-wallet",
  CONVENIENCE_STORE: "convenience-store",
} as const;

export const TRANSACTION_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SUCCESS: "success",
  FAILED: "failed",
} as const;
