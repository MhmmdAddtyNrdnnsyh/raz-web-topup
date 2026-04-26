"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Clock, CreditCard } from "lucide-react";

const STEPS = [
  {
    icon: Zap,
    title: "Pilih Produk",
    description: "Pilih game atau layanan yang ingin kamu top-up",
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    icon: CreditCard,
    title: "Masukkan ID & Nominal",
    description: "Isi User ID dan pilih nominal yang diinginkan",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Bayar",
    description: "Pilih metode pembayaran dan selesaikan transaksi",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Clock,
    title: "Selesai!",
    description: "Item akan masuk ke akun kamu dalam hitungan detik",
    gradient: "from-emerald-500 to-teal-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Cara Order
          </h2>
          <p className="text-sm text-zinc-500 max-w-md mx-auto">
            Hanya butuh 4 langkah mudah untuk top-up
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="relative group"
            >
              {/* Connector line (hidden on mobile and last item) */}
              {index < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+2rem)] right-0 h-px bg-gradient-to-r from-white/10 to-transparent" />
              )}

              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300">
                {/* Step number & icon */}
                <div className="relative mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-bold text-zinc-400">
                    {index + 1}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
