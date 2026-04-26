import Link from "next/link";
import { Gamepad2, Star, MessageCircle } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
              Platform top-up game, pulsa, dan produk digital terlengkap dan
              tercepat di Indonesia. Proses instan, harga terjangkau.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all"
              >
                <Star className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-300 mb-4">
              Layanan
            </h4>
            <ul className="space-y-2">
              {["Top Up Game", "Pulsa & Data", "E-Wallet", "Voucher"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-sm text-zinc-500 hover:text-violet-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-300 mb-4">
              Bantuan
            </h4>
            <ul className="space-y-2">
              {["FAQ", "Cara Order", "Hubungi Kami", "Kebijakan Privasi"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-sm text-zinc-500 hover:text-violet-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5">
          <p className="text-xs text-zinc-600 text-center">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
