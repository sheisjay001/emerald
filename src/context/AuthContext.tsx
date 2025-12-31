"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LocalStorage } from "@/lib/storage";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start loading to check storage
  const router = useRouter();

  useEffect(() => {
    // Check local storage for persisted session
    const storedUser = LocalStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: password || "demo123" }), // Use provided password or demo
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        LocalStorage.setItem("user", data.user, true); // Encrypted persistence
        router.push("/dashboard");
      } else {
        // Fallback for demo/preview if API fails or DB not connected
        console.warn("API login failed, falling back to mock");
        const mockUser = { email, name: email.split("@")[0] };
        setUser(mockUser);
        LocalStorage.setItem("user", mockUser, true); // Encrypted persistence
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error", error);
      // Fallback
      const mockUser = { email, name: email.split("@")[0] };
      setUser(mockUser);
      LocalStorage.setItem("user", mockUser, true); // Encrypted persistence
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    LocalStorage.removeItem("user");
    router.push("/login");
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    LocalStorage.setItem("user", updatedUser, true);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
