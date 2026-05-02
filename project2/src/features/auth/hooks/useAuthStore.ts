import { create } from "zustand";
import type { AuthState } from "../types";

export const useAuthStore = create<AuthState>((set) => ({
  user: { id: "1", name: "Kullanıcı Adı", email: "user@example.com" },
  isAuthenticated: true,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const user = {
        id: "1",
        name: "Kullanıcı Adı",
        email: credentials.email,
      };
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ error: "Giriş başarısız.", isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
