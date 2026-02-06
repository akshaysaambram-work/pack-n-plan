"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { createContext, useContext, useEffect } from "react";

type Theme = "light" | "dark" | "system";
type Color =
  | "zinc"
  | "slate"
  | "stone"
  | "gray"
  | "neutral"
  | "red"
  | "rose"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "violet";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultColor?: Color;
}

interface ThemeProviderState {
  theme: Theme;
  color: Color;
  setTheme: (theme: Theme) => void;
  setColor: (color: Color) => void;
}

const initialState: ThemeProviderState = {
  theme: "system",
  color: "blue",
  setTheme: () => null,
  setColor: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultColor = "blue",
}: Readonly<ThemeProviderProps>) {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", defaultTheme);
  const [color, setColor] = useLocalStorage<Color>("color", defaultColor);

  useEffect(() => {
    const root = globalThis.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = globalThis.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const root = globalThis.document.documentElement;
    const colors: Color[] = [
      "zinc",
      "slate",
      "stone",
      "gray",
      "neutral",
      "red",
      "rose",
      "orange",
      "green",
      "blue",
      "yellow",
      "violet",
    ];
    colors.forEach((c) => {
      root.classList.remove(`theme-${c}`);
    });
    root.classList.add(`theme-${color}`);
  }, [color]);

  const value = {
    theme,
    color,
    setTheme,
    setColor,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
