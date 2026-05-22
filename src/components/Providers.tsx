"use client";

import { SessionProvider } from "next-auth/react";
import { useThemeStore } from "@/store/themeStore";
import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-dark", "theme-light", "theme-red");
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
