"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../hooks/useAuthStore";

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="bg-popover border border-border rounded-xl p-8 w-full max-w-sm shadow-md">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 rounded-xl bg-muted border border-border" />

          <h1 className="text-base font-semibold text-foreground">
            Hesabına giriş yap
          </h1>

          <form onSubmit={handleSubmit} className="w-full space-y-3">
            <input
              type="email"
              placeholder="E-posta adresi"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />

            {error && (
              <p className="text-xs text-destructive">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 text-sm font-medium bg-foreground text-background rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <div className="w-full flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">veya</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button className="w-full py-2.5 text-sm border border-border rounded-md text-primary hover:bg-accent transition-colors">
            Google ile Giriş
          </button>

          <div className="w-24 h-1 bg-muted rounded-full" />
        </div>
      </div>
    </div>
  );
}
