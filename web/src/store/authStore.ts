import { create } from "zustand";

type User = Record<string, any> | null;

interface AuthState {
  user: User;
  setUser: (u: User) => void;
  logout: () => void;
}

const readInitial = (): User => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: readInitial(),
  setUser: (u: User) => {
    try {
      if (u) localStorage.setItem("user", JSON.stringify(u));
      else localStorage.removeItem("user");
    } catch (e) {
      // ignore
    }
    set({ user: u });
  },
  logout: () => {
    try {
      localStorage.removeItem("user");
    } catch (e) {}
    set({ user: null });
  },
}));

export default useAuthStore;
