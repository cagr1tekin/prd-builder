"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Bell,
  Settings,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/settings", label: "Ayarlar", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-48 flex-shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
      <div className="px-4 py-4 border-b border-sidebar-border">
        <div className="bg-muted rounded-md px-3 py-2 text-sm font-semibold text-sidebar-foreground">
          logo · TaskFlow
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <span
                className={cn(
                  "w-2 h-2 rounded-full border-2 flex-shrink-0",
                  active
                    ? "border-sidebar-primary bg-sidebar-primary"
                    : "border-muted-foreground"
                )}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-muted flex-shrink-0" />
          <span className="text-xs text-muted-foreground truncate">
            Kullanıcı Adı
          </span>
        </div>
      </div>
    </aside>
  );
}
