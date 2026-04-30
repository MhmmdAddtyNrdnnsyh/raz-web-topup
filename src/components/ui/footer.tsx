import Link from "next/link";
import { Gamepad2, Star, MessageCircle } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ocean-800 to-ocean-500 flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-ocean-400 to-ocean-600 bg-clip-text text-transparent">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Platform top-up game, pulsa, dan produk digital terlengkap dan
              tercepat di Indonesia. Proses instan, harga terjangkau.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-ocean-400 hover:bg-ocean-400/10 transition-all"
              >
                <Star className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-ocean-400 hover:bg-ocean-400/10 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Layanan
            </h4>
            <ul className="space-y-2">
              {["Top Up Game", "Pulsa & Data", "E-Wallet", "Voucher"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-sm text-muted-foreground hover:text-ocean-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Bantuan
            </h4>
            <ul className="space-y-2">
              {["FAQ", "Cara Order", "Hubungi Kami", "Kebijakan Privasi"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-sm text-muted-foreground hover:text-ocean-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
