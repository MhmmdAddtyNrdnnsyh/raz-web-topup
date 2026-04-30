"use client";

import { motion } from "framer-motion";
import { History, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useTransactions } from "@/features/transaction/hooks/use-transaction";
import StatusBadge from "@/components/ui/status-badge";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

const PRODUCT_EMOJI: Record<string, string> = {
  Mobile: "⚔️",
  Free: "🔥",
  Genshin: "🌟",
  PUBG: "🎯",
  Valorant: "🎮",
};

function getProductEmoji(name: string): string {
  for (const [key, emoji] of Object.entries(PRODUCT_EMOJI)) {
    if (name.includes(key)) return emoji;
  }
  return "🎮";
}

export default function TransactionsPage() {
  const { data: transactions, isLoading } = useTransactions();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <History className="w-5 h-5 text-ocean-400" />
            <h1 className="text-2xl font-bold text-foreground">Riwayat Transaksi</h1>
          </div>
          <p className="text-sm text-muted-foreground">Daftar semua transaksi yang pernah kamu lakukan</p>
        </motion.div>

        {!transactions || transactions.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-[40vh] gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <History className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Belum ada transaksi</p>
            <Link href="/" className="text-sm text-ocean-400 hover:text-ocean-300 underline underline-offset-4">Mulai top-up sekarang</Link>
          </motion.div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
            {transactions.map((trx) => (
              <motion.div key={trx.id} variants={itemVariants}>
                <Card className="bg-card/50 border-0 group hover:ring-foreground/20 transition-all">
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-ocean-800 to-ocean-900 flex items-center justify-center text-xl shrink-0 ring-1 ring-foreground/5">
                          {getProductEmoji(trx.productName)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{trx.productName}</p>
                          <p className="text-xs text-muted-foreground">{trx.nominal}</p>
                        </div>
                      </div>
                      <StatusBadge status={trx.status} />
                    </div>
                    <Separator className="my-3" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="font-mono">{trx.orderId}</span>
                        <span>{formatDate(trx.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{formatCurrency(trx.totalAmount)}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-ocean-400 transition-colors" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
