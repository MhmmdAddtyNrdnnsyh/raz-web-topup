import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} - Top Up Game, Pulsa & Produk Digital`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    "top up game",
    "top up diamond",
    "pulsa murah",
    "e-wallet",
    "mobile legends",
    "free fire",
    "genshin impact",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn("h-full", "antialiased", "dark", inter.variable, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col bg-zinc-950 text-white">
        <QueryProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
