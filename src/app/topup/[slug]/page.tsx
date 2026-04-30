"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useProduct, usePaymentMethods } from "@/features/topup/hooks/use-topup";
import NominalSelector from "@/features/topup/components/nominal-selector";
import PaymentMethodSelector from "@/features/topup/components/payment-method-selector";
import CheckoutSummary from "@/features/topup/components/checkout-summary";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Nominal, PaymentMethod } from "@/features/topup/types";
import { generateOrderId } from "@/lib/utils";

type Step = "input" | "nominal" | "payment" | "checkout" | "success";

const STEP_LABELS: Record<Step, string> = {
  input: "Data Akun",
  nominal: "Pilih Nominal",
  payment: "Pembayaran",
  checkout: "Konfirmasi",
  success: "Selesai",
};

const STEPS_ORDER: Step[] = ["input", "nominal", "payment", "checkout", "success"];

const PRODUCT_EMOJI: Record<string, string> = {
  "mobile-legends": "⚔️",
  "free-fire": "🔥",
  "genshin-impact": "🌟",
  "pubg-mobile": "🎯",
  valorant: "🎮",
  telkomsel: "📱",
};

export default function TopupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { data: product, isLoading } = useProduct(slug);
  const { data: paymentMethods } = usePaymentMethods();

  const [currentStep, setCurrentStep] = useState<Step>("input");
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [selectedNominal, setSelectedNominal] = useState<Nominal | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});

  if (isLoading) return <LoadingSpinner />;

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
        <AlertCircle className="w-12 h-12 text-muted-foreground" />
        <h2 className="text-lg font-semibold text-foreground">Produk tidak ditemukan</h2>
        <Link href="/" className="text-sm text-ocean-400 hover:text-ocean-300 underline underline-offset-4">Kembali ke beranda</Link>
      </div>
    );
  }

  const currentStepIndex = STEPS_ORDER.indexOf(currentStep);
  const emoji = PRODUCT_EMOJI[product.slug] || "🎮";

  const validateInputs = (): boolean => {
    const errors: Record<string, string> = {};
    product.inputFields.forEach((field) => {
      if (field.required && !userInputs[field.key]?.trim()) {
        errors[field.key] = `${field.label} wajib diisi`;
      }
    });
    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === "input" && validateInputs()) setCurrentStep("nominal");
    else if (currentStep === "nominal" && selectedNominal) setCurrentStep("payment");
    else if (currentStep === "payment" && selectedPayment) setCurrentStep("checkout");
  };

  const handleConfirmOrder = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setOrderId(generateOrderId());
    setIsProcessing(false);
    setCurrentStep("success");
  };

  const canProceed = () => {
    if (currentStep === "input") return product.inputFields.every((f) => !f.required || userInputs[f.key]?.trim());
    if (currentStep === "nominal") return !!selectedNominal;
    if (currentStep === "payment") return !!selectedPayment;
    return false;
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-background/80 backdrop-blur-xl border-b border-border sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                if (currentStep === "input") router.push("/");
                else {
                  const prevIndex = currentStepIndex - 1;
                  if (prevIndex >= 0) setCurrentStep(STEPS_ORDER[prevIndex]);
                }
              }}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2 text-sm overflow-x-auto">
              {STEPS_ORDER.slice(0, -1).map((step, index) => {
                const isActive = currentStepIndex >= index;
                const isCurrent = currentStep === step;
                return (
                  <div key={step} className="flex items-center gap-2 shrink-0">
                    {index > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground/50" />}
                    <span className={isCurrent ? "text-ocean-400 font-medium" : isActive ? "text-foreground" : "text-muted-foreground"}>
                      {STEP_LABELS[step]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Product Header */}
        {currentStep !== "success" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ocean-800 to-ocean-900 flex items-center justify-center text-3xl shrink-0 border border-border">
              {emoji}
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{product.name}</h1>
              <p className="text-sm text-muted-foreground">{product.publisher}</p>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Input */}
          {currentStep === "input" && (
            <motion.div key="input" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">Masukkan Data Akun</h2>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>
              <div className="space-y-4">
                {product.inputFields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label>
                      {field.label}
                      {field.required && <span className="text-destructive ml-0.5">*</span>}
                    </Label>
                    {field.type === "select" ? (
                      <select
                        value={userInputs[field.key] || ""}
                        onChange={(e) => setUserInputs((prev) => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full h-10 px-3 rounded-lg border border-input bg-transparent text-sm focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 transition-all appearance-none"
                      >
                        <option value="" className="bg-card">{field.placeholder}</option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-card">{opt.label}</option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={userInputs[field.key] || ""}
                        onChange={(e) => setUserInputs((prev) => ({ ...prev, [field.key]: e.target.value }))}
                        className="h-10"
                      />
                    )}
                    {inputErrors[field.key] && (
                      <p className="text-xs text-destructive">{inputErrors[field.key]}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Nominal */}
          {currentStep === "nominal" && (
            <motion.div key="nominal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">Pilih Nominal</h2>
                <p className="text-sm text-muted-foreground">Pilih paket yang ingin kamu beli</p>
              </div>
              <NominalSelector nominals={product.nominals} selectedId={selectedNominal?.id || null} onSelect={setSelectedNominal} />
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {currentStep === "payment" && paymentMethods && (
            <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">Metode Pembayaran</h2>
                <p className="text-sm text-muted-foreground">Pilih cara pembayaran yang kamu inginkan</p>
              </div>
              <PaymentMethodSelector methods={paymentMethods} selectedId={selectedPayment?.id || null} onSelect={setSelectedPayment} />
            </motion.div>
          )}

          {/* Step 4: Checkout */}
          {currentStep === "checkout" && selectedNominal && selectedPayment && (
            <motion.div key="checkout" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <CheckoutSummary product={product} nominal={selectedNominal} paymentMethod={selectedPayment} userInputs={userInputs} isProcessing={isProcessing} onConfirm={handleConfirmOrder} />
            </motion.div>
          )}

          {/* Step 5: Success */}
          {currentStep === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}>
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Pesanan Berhasil! 🎉</h2>
                <p className="text-sm text-muted-foreground max-w-sm">Transaksi kamu sedang diproses. Item akan masuk ke akun dalam beberapa saat.</p>
              </div>
              <div className="p-4 rounded-xl bg-card ring-1 ring-foreground/10 text-sm">
                <p className="text-muted-foreground mb-1">Order ID</p>
                <p className="text-foreground font-mono font-semibold">{orderId}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link href="/transactions" className="inline-flex items-center justify-center h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80 transition-colors">
                  Lihat Riwayat Transaksi
                </Link>
                <Link href="/" className="inline-flex items-center justify-center h-9 px-4 rounded-lg border border-input bg-transparent text-sm font-medium hover:bg-muted transition-colors">
                  Kembali ke Beranda
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Action Button */}
        {currentStep !== "checkout" && currentStep !== "success" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border z-40">
            <div className="max-w-4xl mx-auto">
              <Button
                onClick={handleNextStep}
                disabled={!canProceed()}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-ocean-800 to-ocean-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-30 border-0"
              >
                Lanjutkan
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
