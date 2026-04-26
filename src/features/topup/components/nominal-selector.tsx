"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import type { Nominal } from "@/features/topup/types";

interface NominalSelectorProps {
  nominals: Nominal[];
  selectedId: string | null;
  onSelect: (nominal: Nominal) => void;
}

export default function NominalSelector({
  nominals,
  selectedId,
  onSelect,
}: NominalSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {nominals.map((nominal, index) => {
        const isSelected = selectedId === nominal.id;

        return (
          <motion.button
            key={nominal.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => onSelect(nominal)}
            className={cn(
              "relative flex flex-col items-start gap-1.5 p-4 rounded-xl border transition-all duration-200 text-left",
              isSelected
                ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10"
                : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
            )}
          >
            {/* Promo badge */}
            {nominal.isPromo && (
              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-md bg-gradient-to-r from-orange-500 to-red-500 text-white text-[9px] font-bold uppercase">
                Sale
              </span>
            )}

            <span
              className={cn(
                "text-sm font-semibold",
                isSelected ? "text-violet-300" : "text-zinc-200"
              )}
            >
              {nominal.name}
            </span>

            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-sm font-bold",
                  isSelected ? "text-violet-400" : "text-white"
                )}
              >
                {formatCurrency(nominal.price)}
              </span>
              {nominal.originalPrice && (
                <span className="text-xs text-zinc-600 line-through">
                  {formatCurrency(nominal.originalPrice)}
                </span>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
