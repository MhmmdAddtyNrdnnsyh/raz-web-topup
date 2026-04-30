"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, CornerDownLeft, Hash } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/lib/mock-data";

interface SearchPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SearchResult {
  id: string;
  type: "category" | "product";
  name: string;
  description: string;
  icon: string;
  href: string;
  group?: string;
}

export default function SearchPalette({ open, onOpenChange }: SearchPaletteProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  // Build search index
  const allResults: SearchResult[] = [
    ...CATEGORIES.map((cat) => ({
      id: cat.id,
      type: "category" as const,
      name: cat.name,
      description: cat.description,
      icon: cat.icon,
      href: `/topup/${cat.slug}`,
      group: cat.group,
    })),
    ...PRODUCTS.map((prod) => ({
      id: prod.id,
      type: "product" as const,
      name: prod.name,
      description: prod.description,
      icon:
        prod.slug === "mobile-legends" ? "⚔️" :
        prod.slug === "free-fire" ? "🔥" :
        prod.slug === "genshin-impact" ? "🌟" :
        prod.slug === "pubg-mobile" ? "🎯" :
        prod.slug === "valorant" ? "🎮" :
        prod.slug === "telkomsel" ? "📱" : "📦",
      href: `/topup/${prod.slug}`,
    })),
  ];

  // Filter results
  const filteredResults = query.trim()
    ? allResults.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.description.toLowerCase().includes(query.toLowerCase()) ||
          r.group?.toLowerCase().includes(query.toLowerCase())
      )
    : allResults.slice(0, 8);

  // Reset on open/close
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector("[data-active='true']");
    if (active) {
      active.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const navigate = useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href);
    },
    [onOpenChange, router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < filteredResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : filteredResults.length - 1
      );
    } else if (e.key === "Enter" && filteredResults[activeIndex]) {
      e.preventDefault();
      navigate(filteredResults[activeIndex].href);
    } else if (e.key === "Escape") {
      onOpenChange(false);
    }
  };

  // Global ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4"
            onClick={() => onOpenChange(false)}
          >
            <div className="w-full max-w-lg rounded-2xl bg-card border border-border shadow-2xl shadow-black/50 overflow-hidden" onClick={(e) => e.stopPropagation()}>
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Cari produk, kategori, atau layanan..."
                  className="w-full py-4 bg-transparent text-foreground text-sm placeholder:text-muted-foreground focus:outline-none"
                />
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md bg-muted border border-border text-[10px] text-muted-foreground font-mono shrink-0">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div
                ref={listRef}
                className="max-h-[50vh] overflow-y-auto overscroll-contain p-2"
              >
                {filteredResults.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-2">
                    <Search className="w-8 h-8 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">
                      Tidak ada hasil untuk &quot;{query}&quot;
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      Coba kata kunci lain
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredResults.map((result, index) => {
                      const isActive = index === activeIndex;
                      return (
                        <button
                          key={result.id}
                          data-active={isActive}
                          onClick={() => navigate(result.href)}
                          onMouseEnter={() => setActiveIndex(index)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                            isActive
                              ? "bg-ocean-400/10 text-foreground"
                              : "text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {/* Icon */}
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0 ${
                              isActive
                                ? "bg-ocean-400/15"
                                : "bg-muted"
                            }`}
                          >
                            {result.icon}
                          </div>

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm font-medium truncate ${
                                  isActive ? "text-foreground" : "text-foreground/80"
                                }`}
                              >
                                {result.name}
                              </span>
                              {result.type === "category" && (
                                <Hash className="w-3 h-3 text-muted-foreground/50 shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground/70 truncate">
                              {result.group
                                ? `${result.group} · ${result.description}`
                                : result.description}
                            </p>
                          </div>

                          {/* Action hint */}
                          {isActive && (
                            <ArrowRight className="w-4 h-4 text-ocean-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-border text-[11px] text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-muted border border-border font-mono">↑</kbd>
                    <kbd className="px-1 py-0.5 rounded bg-muted border border-border font-mono">↓</kbd>
                    navigasi
                  </span>
                  <span className="flex items-center gap-1">
                    <CornerDownLeft className="w-3 h-3" />
                    buka
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-muted border border-border font-mono">ESC</kbd>
                  tutup
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
