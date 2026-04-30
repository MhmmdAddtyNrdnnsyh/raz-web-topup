"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCategories } from "@/features/topup/hooks/use-topup";
import { Separator } from "@/components/ui/separator";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const GROUP_ICONS: Record<string, string> = {
  "Internet & Komunikasi": "📡",
  "Hiburan & Gaming": "🎮",
  "E-Wallet & Pembayaran Digital": "💳",
  Tagihan: "📋",
  "Asuransi & Kesehatan": "🛡️",
};

export default function CategoryGrid() {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 w-48 bg-muted rounded-lg animate-pulse" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div
                      key={j}
                      className="h-24 rounded-2xl bg-muted animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Group categories by their group field
  const grouped = categories?.reduce(
    (acc, cat) => {
      if (!acc[cat.group]) {
        acc[cat.group] = [];
      }
      acc[cat.group].push(cat);
      return acc;
    },
    {} as Record<string, typeof categories>
  );

  if (!grouped) return null;

  return (
    <section id="categories" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Semua Layanan
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Pilih layanan yang kamu butuhkan
          </p>
        </motion.div>

        {/* Grouped Categories */}
        <div className="space-y-10">
          {Object.entries(grouped).map(([groupName, groupCategories], groupIndex) => (
            <motion.div
              key={groupName}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: groupIndex * 0.05 }}
            >
              {groupIndex > 0 && <Separator className="mb-8 opacity-30" />}

              {/* Group Header */}
              <div className="flex items-center gap-2.5 mb-5">
                <span className="text-lg">{GROUP_ICONS[groupName] || "📦"}</span>
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  {groupName}
                </h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {groupCategories?.length}
                </span>
              </div>

              {/* Category Items */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
              >
                {groupCategories?.map((category) => (
                  <motion.div key={category.id} variants={itemVariants}>
                    <Link
                      href={`/topup/${category.slug}`}
                      className="group relative flex flex-col items-center justify-center gap-2.5 p-5 rounded-2xl bg-card/50 border border-border hover:border-ocean-400/40 hover:bg-ocean-400/5 transition-all duration-300"
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-ocean-400/0 to-ocean-600/0 group-hover:from-ocean-400/5 group-hover:to-ocean-600/5 transition-all duration-300" />

                      <span className="text-2xl sm:text-3xl relative z-10">
                        {category.icon}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center relative z-10 leading-tight">
                        {category.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
