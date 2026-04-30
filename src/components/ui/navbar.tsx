"use client";

import { useState } from "react";
import Link from "next/link";
import { Gamepad2, User, History, Search, Menu } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import SearchPalette from "@/components/ui/search-palette";
import ThemeToggle from "@/components/ui/theme-toggle";

const NAV_LINKS = [
  { href: "/", label: "Beranda", icon: Gamepad2 },
  { href: "/transactions", label: "Riwayat", icon: History },
  { href: "/auth/login", label: "Masuk", icon: User },
];

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-ocean-800 to-ocean-500 flex items-center justify-center shadow-lg shadow-ocean-800/25 group-hover:shadow-ocean-800/40 transition-shadow">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-ocean-400 to-ocean-600 bg-clip-text text-transparent">
                {APP_NAME}
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop: Theme Toggle + Search */}
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground border border-input bg-transparent hover:border-ring hover:text-foreground transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Cari produk...</span>
                <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground font-mono">
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* Mobile: Theme Toggle + Search + Menu */}
            <div className="flex md:hidden items-center gap-1">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-muted-foreground" />
              </Button>

              <Sheet>
                <SheetTrigger
                  render={
                    <Button variant="ghost" size="icon" aria-label="Open menu" />
                  }
                >
                  <Menu className="w-5 h-5 text-muted-foreground" />
                </SheetTrigger>
                <SheetContent side="right" className="bg-background border-border">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ocean-800 to-ocean-500 flex items-center justify-center">
                        <Gamepad2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="bg-gradient-to-r from-ocean-400 to-ocean-600 bg-clip-text text-transparent font-bold">
                        {APP_NAME}
                      </span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="px-4 space-y-1">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Palette */}
      <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
