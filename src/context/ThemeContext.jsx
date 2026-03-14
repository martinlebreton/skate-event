import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  // Récupère la préférence sauvegardée ou détecte la préférence système
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Applique ou retire la classe 'dark' sur <html>
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <ThemeContext.Provider
      value={{ dark, toggleDark: () => setDark((d) => !d) }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
