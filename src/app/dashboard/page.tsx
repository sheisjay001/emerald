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
  Utensils
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  // Mock Data - In a real app, this would come from your backend/context
  const currentPhase = "Luteal Phase";
  const dayOfCycle = 22;
  const daysUntilPeriod = 6;

  const holisticSync = {
    mind: {
      title: "Mental Focus",
      icon: Brain,
      advice: "Progesterone is rising, which might cause brain fog. Focus on administrative tasks rather than deep creative work.",
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-900/20"
    },
    body: {
      title: "Anatomical Support",
      icon: Activity,
      advice: "Uterine lining is thickening. You might feel heavier. Gentle stretching or yoga is better than HIIT today.",
      color: "text-rose-600",
      bg: "bg-rose-100 dark:bg-rose-900/20"
    },
    spirit: {
      title: "Emotional Balance",
      icon: Sparkles,
      advice: "You may feel more introspective. It's a great time for journaling or quiet evenings at home.",
      color: "text-amber-600",
      bg: "bg-amber-100 dark:bg-amber-900/20"
    },
    nutrition: {
      title: "Cycle Nutrition",
      icon: Utensils,
      advice: "Curb sugar cravings with complex carbs like sweet potatoes. Click for your meal plan.",
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-900/20",
      link: "/dashboard/nutrition"
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Good Morning, Sarah</h1>
          <p className="text-muted-foreground mt-1">Here's your holistic cycle update for today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/health"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            Log Symptoms
          </Link>
        </div>
      </div>

      {/* Cycle Summary Card */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-background border-4 border-primary flex items-center justify-center flex-col shadow-inner">
              <span className="text-3xl font-bold text-primary">{dayOfCycle}</span>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Day</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{currentPhase}</h2>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <Droplets size={16} className="text-blue-500" />
                Period expected in <span className="font-semibold text-foreground">{daysUntilPeriod} days</span>
              </p>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <Link 
              href="/dashboard/tracker" 
              className="flex items-center justify-between w-full md:w-auto gap-4 px-6 py-3 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors shadow-sm group"
            >
              <div className="flex items-center gap-3">
                <Calendar className="text-primary" />
                <span className="font-medium text-foreground">View Full Calendar</span>
              </div>
              <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* Holistic Cycle Sync Section */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-4">Daily Cycle Sync</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Mind - Neurological/Psychological */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-card rounded-xl border border-border p-6 shadow-sm"
          >
            <div className={`w-12 h-12 rounded-lg ${holisticSync.mind.bg} flex items-center justify-center mb-4`}>
              <holisticSync.mind.icon className={holisticSync.mind.color} size={24} />
            </div>
            <h4 className="font-semibold text-lg text-foreground mb-2">{holisticSync.mind.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {holisticSync.mind.advice}
            </p>
          </motion.div>

          {/* Body - Anatomical/Physical */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-card rounded-xl border border-border p-6 shadow-sm"
          >
            <div className={`w-12 h-12 rounded-lg ${holisticSync.body.bg} flex items-center justify-center mb-4`}>
              <holisticSync.body.icon className={holisticSync.body.color} size={24} />
            </div>
            <h4 className="font-semibold text-lg text-foreground mb-2">{holisticSync.body.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {holisticSync.body.advice}
            </p>
          </motion.div>

          {/* Spirit - Emotional/Social */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-card rounded-xl border border-border p-6 shadow-sm"
          >
            <div className={`w-12 h-12 rounded-lg ${holisticSync.spirit.bg} flex items-center justify-center mb-4`}>
              <holisticSync.spirit.icon className={holisticSync.spirit.color} size={24} />
            </div>
            <h4 className="font-semibold text-lg text-foreground mb-2">{holisticSync.spirit.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {holisticSync.spirit.advice}
            </p>
          </motion.div>

          {/* Nutrition - Meal Prep */}
          <Link href={holisticSync.nutrition.link}>
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-card rounded-xl border border-border p-6 shadow-sm h-full hover:border-emerald-500/50 transition-colors cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-lg ${holisticSync.nutrition.bg} flex items-center justify-center mb-4`}>
                <holisticSync.nutrition.icon className={holisticSync.nutrition.color} size={24} />
              </div>
              <h4 className="font-semibold text-lg text-foreground mb-2">{holisticSync.nutrition.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {holisticSync.nutrition.advice}
              </p>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Sleep Quality</h3>
            <Moon className="text-indigo-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-foreground">7h 20m</p>
          <p className="text-xs text-muted-foreground mt-1">Average this week</p>
        </div>
        
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Hydration</h3>
            <Droplets className="text-blue-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-foreground">1.5L</p>
          <p className="text-xs text-muted-foreground mt-1">Goal: 2.0L</p>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Activity</h3>
            <Activity className="text-green-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-foreground">Low Impact</p>
          <p className="text-xs text-muted-foreground mt-1">Recommended for Luteal Phase</p>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-center items-center text-center space-y-3">
          <p className="font-medium text-foreground">Community Pulse</p>
          <p className="text-sm text-muted-foreground">"Best teas for cramps?" is trending now.</p>
          <Link href="/dashboard/community" className="text-sm text-primary hover:underline font-medium">
            Join Discussion
          </Link>
        </div>
      </div>
    </div>
  );
}
