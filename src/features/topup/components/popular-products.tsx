"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { useProducts } from "@/features/topup/hooks/use-topup";
import { formatCurrency } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function PopularProducts() {
  const { data: products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-2xl bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <section className="py-16 sm:py-20" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Populer
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Produk paling banyak dipesan
            </p>
          </div>
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1 text-sm text-ocean-400 hover:text-ocean-300 transition-colors"
          >
            Lihat semua
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {products?.slice(0, 8).map((product) => {
            const minPrice = Math.min(
              ...product.nominals.map((n) => n.price)
            );
            const hasPromo = product.nominals.some((n) => n.isPromo);

            return (
              <motion.div key={product.id} variants={itemVariants}>
                <Link
                  href={`/topup/${product.slug}`}
                  className="group relative flex flex-col rounded-2xl bg-card/50 border border-border overflow-hidden hover:border-ocean-400/40 transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-ocean-900/50 to-ocean-800/50 dark:from-ocean-900 dark:to-ocean-800 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-5xl">
                      {product.slug === "mobile-legends" && "⚔️"}
                      {product.slug === "free-fire" && "🔥"}
                      {product.slug === "genshin-impact" && "🌟"}
                      {product.slug === "pubg-mobile" && "🎯"}
                      {product.slug === "valorant" && "🎮"}
                      {product.slug === "telkomsel" && "📱"}
                    </div>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                    {/* Promo badge */}
                    {hasPromo && (
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold uppercase tracking-wider">
                          Promo
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4 flex flex-col gap-1.5">
                    <h3 className="text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground">
                      {product.publisher}
                    </p>
                    <p className="text-xs text-ocean-400 font-medium mt-1">
                      Mulai dari {formatCurrency(minPrice)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
