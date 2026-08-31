"use client";

import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeName = "light" | "dark" | "system";

type ThemeOption = {
  name: ThemeName;
  label: string;
  Icon: LucideIcon;
};

type ThemeToggleProps = {
  compact?: boolean;
  className?: string;
};

const themeOptions: ThemeOption[] = [
  { name: "light", label: "Light", Icon: Sun },
  { name: "dark", label: "Dark", Icon: Moon },
  { name: "system", label: "System", Icon: Monitor },
];

export default function ThemeToggle({
  compact = false,
  className = "",
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, systemTheme, theme } = useTheme();
  const activeTheme = mounted ? (theme as ThemeName | undefined) : undefined;

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      role="group"
      aria-label="Theme preference"
      aria-busy={!mounted}
      className={`theme-toggle ${compact ? "theme-toggle-compact" : "theme-toggle-full"} ${className}`}
    >
      {themeOptions.map(({ name, label, Icon }) => {
        const isActive = activeTheme === name;
        const systemStatus =
          mounted && name === "system" && systemTheme
            ? ` (currently ${systemTheme})`
            : "";

        return (
          <button
            key={name}
            type="button"
            disabled={!mounted}
            onClick={() => setTheme(name)}
            aria-label={`Use ${label.toLowerCase()} theme${systemStatus}`}
            aria-pressed={isActive}
            title={`${label}${systemStatus}`}
            className="theme-toggle-option"
          >
            <Icon aria-hidden="true" size={15} strokeWidth={2} />
            <span className={compact ? "sr-only" : undefined}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
