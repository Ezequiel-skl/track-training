import { create } from "zustand";

type Theme = "light" | "dark";

type Store = {
  theme: Theme;
  toogleTheme: () => void;
};

const useStoreTheme = create<Store>()((set) => ({
  theme: (localStorage.getItem("theme") as Theme) || "light",

  toogleTheme: () => {
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    });
  },
}));

export { useStoreTheme };