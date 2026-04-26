"use client";

import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-violet-500/20" />
        <Loader2 className="w-12 h-12 text-violet-500 animate-spin absolute inset-0" />
      </div>
      <p className="text-sm text-zinc-500 animate-pulse">Memuat...</p>
    </div>
  );
}
