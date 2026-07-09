import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const BACKGROUND_OPTIONS = [
  { id: "default", label: "Default", value: null },
  { id: "ocean", label: "Ocean", value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { id: "sunset", label: "Sunset", value: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)" },
  { id: "forest", label: "Forest", value: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)" },
  { id: "midnight", label: "Midnight", value: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)" },
];

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("kanban-theme");
    return saved ? saved === "dark" : false;
  });

  const [background, setBackground] = useState(() => {
    return localStorage.getItem("kanban-background") || "default";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("kanban-theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("kanban-background", background);
  }, [background]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const backgroundValue = BACKGROUND_OPTIONS.find(
    (bg) => bg.id === background
  )?.value;

  return (
    <ThemeContext.Provider
      value={{ isDark, toggleTheme, background, setBackground, backgroundValue }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}