"use client";

import { useEffect, useState } from "react";
import { EyeOff, Lock } from "lucide-react";

export default function PrivacyGuard() {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    const handleBlur = () => setIsBlurred(true);
    const handleFocus = () => setIsBlurred(false);

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    
    const handleVisibilityChange = () => {
      if (document.hidden) setIsBlurred(true);
      else setIsBlurred(false);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (!isBlurred) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-3xl flex flex-col items-center justify-center text-foreground p-4 text-center">
      <div className="bg-card p-8 rounded-full shadow-2xl shadow-emerald-500/20 mb-6">
        <Lock size={64} className="text-primary" />
      </div>
      <h2 className="text-3xl font-bold mb-2">Emerald Protected</h2>
      <p className="text-muted-foreground max-w-md">
        Your session is blurred for privacy because you switched windows. Click here or refocus to continue.
      </p>
    </div>
  );
}
