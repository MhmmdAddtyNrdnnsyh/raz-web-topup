"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "pending" | "processing" | "success" | "failed";
  className?: string;
}

const STATUS_CONFIG = {
  pending: {
    label: "Menunggu",
    dotColor: "bg-amber-400",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  processing: {
    label: "Diproses",
    dotColor: "bg-blue-400",
    badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  success: {
    label: "Berhasil",
    dotColor: "bg-emerald-400",
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  failed: {
    label: "Gagal",
    dotColor: "bg-red-400",
    badgeClass: "bg-red-500/10 text-red-400 border-red-500/20",
  },
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const isActive = status === "pending" || status === "processing";

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <Badge
        variant="outline"
        className={cn(config.badgeClass, "gap-1.5 rounded-lg", className)}
      >
        <span className="relative flex h-1.5 w-1.5">
          {isActive && (
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                config.dotColor
              )}
            />
          )}
          <span
            className={cn(
              "relative inline-flex rounded-full h-1.5 w-1.5",
              config.dotColor
            )}
          />
        </span>
        {config.label}
      </Badge>
    </motion.div>
  );
}
