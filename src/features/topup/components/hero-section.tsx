"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Users, ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-ocean-800/20 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ocean-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ocean-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(123,189,232,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(123,189,232,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ocean-400/10 border border-ocean-400/20 text-ocean-400 dark:text-ocean-300 text-xs font-medium mb-6"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Proses Instan • Harga Terbaik</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6"
        >
          Top Up{" "}
          <span className="bg-gradient-to-r from-ocean-400 via-ocean-500 to-ocean-600 bg-clip-text text-transparent">
            Semua
          </span>
          <br />
          Kebutuhanmu
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Game, pulsa, e-wallet, dan produk digital lainnya. Cepat, aman, dan
          harga paling bersaing di Indonesia.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-14"
        >
          <a
            href="#categories"
            className="group relative inline-flex items-center justify-center"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-ocean-800 to-ocean-500 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 blur" />
            <div className="relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-ocean-800 to-ocean-500 rounded-2xl text-white text-sm font-semibold">
              Mulai Top Up
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 max-w-md mx-auto"
        >
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-card/50 border border-border">
            <Shield className="w-4 h-4 text-emerald-500 mb-0.5" />
            <span className="text-lg sm:text-xl font-bold text-foreground">100%</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground">Aman</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-card/50 border border-border">
            <Zap className="w-4 h-4 text-amber-500 mb-0.5" />
            <span className="text-lg sm:text-xl font-bold text-foreground">1-3s</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground">Proses</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-card/50 border border-border">
            <Users className="w-4 h-4 text-ocean-400 mb-0.5" />
            <span className="text-lg sm:text-xl font-bold text-foreground">10K+</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground">Transaksi/Hari</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
