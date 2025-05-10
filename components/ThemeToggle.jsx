"use client";
import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const enabled = stored === "dark" || (!stored && prefersDark);

    root.classList.toggle("dark", enabled);
    setIsDark(enabled);
  }, []);

  const toggleDark = () => {
    const root = window.document.documentElement;
    const enabled = !isDark;
    root.classList.toggle("dark", enabled);
    localStorage.setItem("theme", enabled ? "dark" : "light");
    setIsDark(enabled);
  };

  return (
    <button
      onClick={toggleDark}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;
