"use client";

import { LogOut } from "lucide-react";
import { useEffect } from "react";

export default function PanicButton({ className, expanded = false }: { className?: string, expanded?: boolean }) {
  const handlePanic = () => {
    // 1. Clear sensitive data (optional, depends on user preference, but safe for now)
    try {
      localStorage.removeItem("emerald_app_user");
      // Keep essential settings if needed, but for panic, better safe than sorry
    } catch (e) {
      console.error("Error clearing data", e);
    }

    // 2. Immediate redirection to a neutral site
    window.location.replace("https://www.google.com");
  };

  // Add keyboard shortcut (ESC key x 3 quickly, or just ESC long press? Let's do simple ESC for now or maybe Alt+Q)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handlePanic();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <button
      onClick={handlePanic}
      className={`bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 ${
        expanded ? "w-full py-3 rounded-xl" : "p-3 rounded-full"
      } ${className}`}
      title="Quick Exit (Press ESC)"
      aria-label="Quick Exit to Google"
    >
      <LogOut size={20} />
      {expanded && <span>Quick Exit</span>}
    </button>
  );
}
