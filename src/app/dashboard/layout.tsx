"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Activity, 
  MessageSquareHeart, 
  Settings, 
  LogOut,
  Menu,
  X,
  Utensils,
  BookOpen,
  Sparkles,
  ShieldAlert
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import PrivacyGuard from "@/components/PrivacyGuard";

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Cycle Tracker", href: "/dashboard/tracker", icon: CalendarDays },
  { name: "Health & Mood", href: "/dashboard/health", icon: Activity },
  { name: "Nutrition", href: "/dashboard/nutrition", icon: Utensils },
  { name: "Education", href: "/dashboard/education", icon: BookOpen },
  { name: "AI Support", href: "/dashboard/chat", icon: Sparkles },
  { name: "Community", href: "/dashboard/community", icon: MessageSquareHeart },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-muted/20 flex font-sans">
      <PrivacyGuard />
      
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-card border-r border-border h-screen sticky top-0 shadow-sm z-30">
        <div className="p-6 border-b border-border/50">
          <Link href="/" className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
                E
              </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-300">
              Emerald
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-2">
            Menu
          </p>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group overflow-hidden ${
                  isActive 
                    ? "bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 text-emerald-700 dark:text-emerald-300 shadow-sm" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-l-full"
                  />
                )}
                <Icon size={20} className={isActive ? "text-emerald-600 dark:text-emerald-400" : "group-hover:text-emerald-500 transition-colors"} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/50 space-y-4 bg-muted/10">
           {/* User Profile Mini */}
           <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold">
                {user?.name?.[0] || "S"}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-foreground truncate">{user?.name || "Sarah User"}</p>
                <p className="text-xs text-muted-foreground truncate">Free Plan</p>
              </div>
           </div>

          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2 w-full text-sm font-medium text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-40 px-4 py-3 flex justify-between items-center shadow-sm">
        <Link href="/" className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
              E
            </div>
           <span className="text-xl font-bold text-foreground">Emerald</span>
        </Link>
        <div className="flex items-center gap-3">
          {/* Quick Log Out Icon for Visibility */}
          <button 
            onClick={logout}
            className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors"
            title="Sign Out"
          >
            <LogOut size={20} />
          </button>
          
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-foreground rounded-md hover:bg-muted">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-[60px] bg-background z-50 flex flex-col md:hidden"
          >
             <nav className="flex-1 p-4 space-y-2 overflow-y-auto pb-24">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium border border-transparent ${
                      isActive 
                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800" 
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon size={24} className={isActive ? "text-emerald-600" : ""} />
                    {item.name}
                  </Link>
                );
              })}
              
              <div className="mt-8 pt-8 border-t border-border">
                <button 
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-4 px-4 py-4 w-full text-base font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-lg shadow-red-500/20 transition-all transform active:scale-95"
                >
                  <LogOut size={24} />
                  SIGN OUT
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 md:p-8 pt-20 px-4 pb-24 md:pb-8 w-full overflow-x-hidden transition-all duration-300 ease-in-out relative">
        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
        
        {/* Mobile Quick Log FAB */}
        <div className="md:hidden fixed bottom-6 right-6 z-40">
           <Link
             href="/dashboard/health"
             className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 transition-transform active:scale-90"
           >
             <Activity size={24} />
           </Link>
        </div>
      </main>
    </div>
  );
}
