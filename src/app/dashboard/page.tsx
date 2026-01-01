"use client";

import Link from "next/link";
import { 
  Calendar, 
  Plus, 
  ChevronRight, 
  Activity, 
  Droplets,
  Brain,
  Sparkles,
  Moon,
  Utensils,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function DashboardPage() {
  const { user } = useAuth();
  
  // Mock Data
  const currentPhase = "Luteal Phase";
  const dayOfCycle = 22;
  const daysUntilPeriod = 6;

  const holisticSync = {
    mind: {
      title: "Mental Focus",
      icon: Brain,
      advice: "Progesterone is rising. Focus on administrative tasks rather than deep creative work.",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-900/20",
      border: "border-purple-200 dark:border-purple-800"
    },
    body: {
      title: "Anatomical Support",
      icon: Activity,
      advice: "Uterine lining is thickening. Gentle stretching or yoga is better than HIIT today.",
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-100 dark:bg-rose-900/20",
      border: "border-rose-200 dark:border-rose-800"
    },
    spirit: {
      title: "Emotional Balance",
      icon: Sparkles,
      advice: "You may feel more introspective. It's a great time for journaling.",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-900/20",
      border: "border-amber-200 dark:border-amber-800"
    },
    nutrition: {
      title: "Cycle Nutrition",
      icon: Utensils,
      advice: "Curb sugar cravings with complex carbs like sweet potatoes.",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-100 dark:bg-emerald-900/20",
      border: "border-emerald-200 dark:border-emerald-800",
      link: "/dashboard/nutrition"
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Welcome Header */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Good Morning, <span className="text-emerald-600 dark:text-emerald-400">{user?.name || "Sarah"}</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">Here's your holistic cycle update for today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/health"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full shadow-lg shadow-emerald-500/20 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="mr-2 h-4 w-4" />
            Log Symptoms
          </Link>
        </div>
      </motion.div>

      {/* Cycle Summary Card */}
      <motion.div variants={item} className="relative overflow-hidden bg-gradient-to-br from-white to-emerald-50/50 dark:from-card dark:to-emerald-950/30 rounded-3xl p-8 border border-emerald-100 dark:border-emerald-900 shadow-xl shadow-emerald-500/5">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="h-28 w-28 rounded-full bg-white dark:bg-card border-4 border-emerald-500/20 flex items-center justify-center flex-col shadow-inner relative z-10">
                <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">{dayOfCycle}</span>
                <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Day</span>
              </div>
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
            </div>
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wide mb-2">
                Current Phase
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-1">{currentPhase}</h2>
              <p className="text-muted-foreground flex items-center gap-2 text-lg">
                <Droplets size={18} className="text-rose-500" />
                Period expected in <span className="font-semibold text-foreground">{daysUntilPeriod} days</span>
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <Link 
              href="/dashboard/tracker" 
              className="flex items-center justify-between w-full md:w-auto gap-6 px-6 py-4 bg-white dark:bg-card/50 rounded-2xl border border-emerald-100 dark:border-emerald-900 hover:border-emerald-500/50 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg text-emerald-600">
                   <Calendar size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-foreground">View Calendar</span>
                  <span className="text-xs text-muted-foreground">See predictions</span>
                </div>
              </div>
              <ChevronRight className="text-muted-foreground group-hover:text-emerald-500 transition-colors" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Holistic Cycle Sync Section */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="text-emerald-500" size={20} />
            Daily Cycle Sync
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Mind */}
          <motion.div 
            whileHover={{ y: -5 }}
            className={`bg-card rounded-2xl border ${holisticSync.mind.border} p-6 shadow-sm hover:shadow-md transition-all`}
          >
            <div className={`w-14 h-14 rounded-2xl ${holisticSync.mind.bg} flex items-center justify-center mb-4`}>
              <holisticSync.mind.icon className={holisticSync.mind.color} size={28} />
            </div>
            <h4 className="font-bold text-lg text-foreground mb-2">{holisticSync.mind.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {holisticSync.mind.advice}
            </p>
          </motion.div>

          {/* Body */}
          <motion.div 
            whileHover={{ y: -5 }}
            className={`bg-card rounded-2xl border ${holisticSync.body.border} p-6 shadow-sm hover:shadow-md transition-all`}
          >
            <div className={`w-14 h-14 rounded-2xl ${holisticSync.body.bg} flex items-center justify-center mb-4`}>
              <holisticSync.body.icon className={holisticSync.body.color} size={28} />
            </div>
            <h4 className="font-bold text-lg text-foreground mb-2">{holisticSync.body.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {holisticSync.body.advice}
            </p>
          </motion.div>

          {/* Spirit */}
          <motion.div 
            whileHover={{ y: -5 }}
            className={`bg-card rounded-2xl border ${holisticSync.spirit.border} p-6 shadow-sm hover:shadow-md transition-all`}
          >
            <div className={`w-14 h-14 rounded-2xl ${holisticSync.spirit.bg} flex items-center justify-center mb-4`}>
              <holisticSync.spirit.icon className={holisticSync.spirit.color} size={28} />
            </div>
            <h4 className="font-bold text-lg text-foreground mb-2">{holisticSync.spirit.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {holisticSync.spirit.advice}
            </p>
          </motion.div>

          {/* Nutrition */}
          <Link href={holisticSync.nutrition.link || "#"}>
            <motion.div 
              whileHover={{ y: -5 }}
              className={`bg-card rounded-2xl border ${holisticSync.nutrition.border} p-6 shadow-sm hover:shadow-md transition-all h-full cursor-pointer group relative overflow-hidden`}
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={16} className="text-emerald-500" />
              </div>
              <div className={`w-14 h-14 rounded-2xl ${holisticSync.nutrition.bg} flex items-center justify-center mb-4`}>
                <holisticSync.nutrition.icon className={holisticSync.nutrition.color} size={28} />
              </div>
              <h4 className="font-bold text-lg text-foreground mb-2 group-hover:text-emerald-600 transition-colors">{holisticSync.nutrition.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {holisticSync.nutrition.advice}
              </p>
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Sleep Quality</h3>
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <Moon className="text-indigo-500" size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground">7h 20m</p>
          <p className="text-xs text-muted-foreground mt-1">Average this week</p>
        </div>
        
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Hydration</h3>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Droplets className="text-blue-500" size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground">1.5L</p>
          <p className="text-xs text-muted-foreground mt-1">Goal: 2.0L</p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Activity</h3>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Activity className="text-green-500" size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground">Low Impact</p>
          <p className="text-xs text-muted-foreground mt-1">Recommended</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-lg text-white flex flex-col justify-center items-center text-center space-y-3">
          <p className="font-bold text-lg">Community Pulse</p>
          <p className="text-sm text-emerald-100">"Best teas for cramps?" is trending now.</p>
          <Link href="/dashboard/community" className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full font-semibold transition-colors backdrop-blur-sm">
            Join Discussion
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
