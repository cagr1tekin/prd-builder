"use client";

import { Bell, Search } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-border bg-background sticky top-0 z-10">
      <h1 className="text-base font-semibold text-foreground">{title}</h1>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="ara..."
            className="pl-8 pr-3 py-1.5 text-sm bg-muted border border-border rounded-md w-48 placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        <Link
          href="/notifications"
          className="px-3 py-1.5 text-sm border border-border rounded-md text-foreground hover:bg-muted transition-colors"
        >
          bildirim
        </Link>

        <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
          <span className="text-xs text-muted-foreground">U</span>
        </div>
      </div>
    </header>
  );
}
