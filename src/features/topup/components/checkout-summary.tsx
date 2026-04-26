"use client";

import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import { ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Nominal, PaymentMethod, Product } from "@/features/topup/types";

const PRODUCT_EMOJI: Record<string, string> = {
  "mobile-legends": "⚔️",
  "free-fire": "🔥",
  "genshin-impact": "🌟",
  "pubg-mobile": "🎯",
  valorant: "🎮",
  telkomsel: "📱",
};

interface CheckoutSummaryProps {
  product: Product;
  nominal: Nominal;
  paymentMethod: PaymentMethod;
  userInputs: Record<string, string>;
  isProcessing: boolean;
  onConfirm: () => void;
}

export default function CheckoutSummary({
  product,
  nominal,
  paymentMethod,
  userInputs,
  isProcessing,
  onConfirm,
}: CheckoutSummaryProps) {
  const fee =
    paymentMethod.feeType === "fixed"
      ? paymentMethod.fee
      : nominal.price * (paymentMethod.fee / 100);
  const totalAmount = nominal.price + fee;
  const emoji = PRODUCT_EMOJI[product.slug] || "🎮";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="bg-card/50 border-0">
        <CardHeader>
          <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Product */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-2xl shrink-0">
              {emoji}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{product.name}</p>
              <p className="text-xs text-muted-foreground">{nominal.name}</p>
            </div>
          </div>

          <Separator />

          {/* User inputs */}
          <div className="space-y-2">
            {product.inputFields.map((field) => (
              <div key={field.key} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{field.label}</span>
                <span className="text-foreground font-mono">{userInputs[field.key] || "-"}</span>
              </div>
            ))}
          </div>

          <Separator />

          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Harga</span>
              <span className="text-foreground">{formatCurrency(nominal.price)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Biaya Admin</span>
              <span className={fee === 0 ? "text-emerald-400" : "text-foreground"}>
                {fee === 0 ? "Gratis" : formatCurrency(fee)}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-base font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span className="text-foreground">{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          {/* Payment method */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 ring-1 ring-foreground/5">
            <span className="text-lg">{paymentMethod.icon}</span>
            <span className="text-sm text-foreground">{paymentMethod.name}</span>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            onClick={onConfirm}
            disabled={isProcessing}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:opacity-90 border-0"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Bayar {formatCurrency(totalAmount)}
              </>
            )}
          </Button>
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Transaksi dijamin aman & terenkripsi
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
