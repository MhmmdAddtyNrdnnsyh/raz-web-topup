"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import type { PaymentMethod } from "@/features/topup/types";

interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  selectedId: string | null;
  onSelect: (method: PaymentMethod) => void;
}

export default function PaymentMethodSelector({
  methods,
  selectedId,
  onSelect,
}: PaymentMethodSelectorProps) {
  // Group methods by their group
  const grouped = methods.reduce(
    (acc, method) => {
      if (!acc[method.group]) {
        acc[method.group] = [];
      }
      acc[method.group].push(method);
      return acc;
    },
    {} as Record<string, PaymentMethod[]>
  );

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([group, groupMethods]) => (
        <div key={group}>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {group}
          </h4>
          <div className="space-y-2">
            {groupMethods.map((method) => {
              const isSelected = selectedId === method.id;

              return (
                <motion.button
                  key={method.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelect(method)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200",
                    isSelected
                      ? "border-ocean-400 bg-ocean-400/10"
                      : "border-border bg-card/50 hover:border-ocean-400/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{method.icon}</span>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isSelected ? "text-foreground" : "text-foreground/80"
                      )}
                    >
                      {method.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {method.fee > 0 && (
                      <span className="text-xs text-muted-foreground">
                        +{formatCurrency(method.fee)}
                      </span>
                    )}
                    {method.fee === 0 && (
                      <span className="text-xs text-emerald-400 font-medium">
                        Gratis
                      </span>
                    )}
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border-2 transition-colors",
                        isSelected
                          ? "border-ocean-400 bg-ocean-400"
                          : "border-muted-foreground/30"
                      )}
                    >
                      {isSelected && (
                        <div className="w-full h-full rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
