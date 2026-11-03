import { create } from "zustand";

type Theme = "dark" | "light";
export const useTheme = create<{ theme: Theme; toggleTheme: () => void }>(
  (set) => ({
    theme:
      typeof document !== "undefined" &&
      document.documentElement.dataset.theme === "light"
        ? "light"
        : "dark",
    toggleTheme: () =>
      set(({ theme }) => {
        const next = theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        document.documentElement.classList.toggle("dark", next === "dark");
        document.documentElement.style.colorScheme = next;
        document
          .querySelector('meta[name="theme-color"]')
          ?.setAttribute("content", next === "dark" ? "#101814" : "#f6f7f3");
        try {
          localStorage.setItem("organui-theme", next);
        } catch {
          /* Keep the toggle usable without storage. */
        }
        return { theme: next };
      }),
  }),
);
