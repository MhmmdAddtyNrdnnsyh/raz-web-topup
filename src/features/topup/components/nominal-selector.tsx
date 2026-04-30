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
                ? "border-ocean-400 bg-ocean-400/10 shadow-lg shadow-ocean-400/10"
                : "border-border bg-card/50 hover:border-ocean-400/30 hover:bg-card"
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
                isSelected ? "text-ocean-300 dark:text-ocean-300" : "text-foreground/80"
              )}
            >
              {nominal.name}
            </span>

            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-sm font-bold",
                  isSelected ? "text-ocean-400" : "text-foreground"
                )}
              >
                {formatCurrency(nominal.price)}
              </span>
              {nominal.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
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
