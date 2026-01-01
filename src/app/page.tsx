"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Shield, 
  Heart, 
  Activity, 
  Lock, 
  Zap, 
  Users, 
  ArrowRight, 
  Menu, 
  X,
  Smartphone,
  Brain,
  Stethoscope
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
                E
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-300">
                Emerald
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {["Features", "Goals", "Contact"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-muted-foreground hover:text-foreground"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {["Features", "Goals", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-base font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link href="/login" className="w-full text-center py-2 text-muted-foreground">Sign In</Link>
                <Link href="/signup" className="w-full bg-primary text-primary-foreground py-2 rounded-lg text-center font-medium">Get Started</Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          {/* Background Decor */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" />
            <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-pulse-slow delay-1000" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-300 ring-1 ring-inset ring-emerald-600/20 mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-600 mr-2 animate-pulse"></span>
                  Now available for early access
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                  Health & Safety, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                    Reimagined.
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  A privacy-first, AI-powered sanctuary for women. Personalized cycle tracking, mental wellness, and community safety — all in one elegant, secure space.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/signup"
                    className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold rounded-full text-white bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-1"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    href="#features"
                    className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold rounded-full text-foreground bg-secondary/50 hover:bg-secondary transition-colors border border-transparent hover:border-emerald-200"
                  >
                    Explore Features
                  </Link>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-16 lg:mt-0 relative"
              >
                <div className="relative rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-8 shadow-2xl border border-white/20 backdrop-blur-sm">
                  {/* Abstract UI Representation */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 bg-card p-4 rounded-xl shadow-sm border border-border/50 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600">
                        <Activity className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="h-2 w-24 bg-muted rounded mb-2" />
                        <div className="h-2 w-16 bg-muted rounded" />
                      </div>
                    </div>
                    <div className="bg-card p-4 rounded-xl shadow-sm border border-border/50 aspect-square flex flex-col justify-center items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600">
                        <Brain className="h-5 w-5" />
                      </div>
                      <div className="h-2 w-16 bg-muted rounded mt-2" />
                    </div>
                    <div className="bg-card p-4 rounded-xl shadow-sm border border-border/50 aspect-square flex flex-col justify-center items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center text-pink-600">
                        <Heart className="h-5 w-5" />
                      </div>
                      <div className="h-2 w-16 bg-muted rounded mt-2" />
                    </div>
                  </div>
                  
                  {/* Floating Shield Badge */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-emerald-100 dark:border-emerald-900 flex items-center gap-3"
                  >
                    <div className="bg-emerald-500 rounded-lg p-2 text-white">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Privacy First</p>
                      <p className="text-sm font-bold text-foreground">End-to-End Encrypted</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Goals Section */}
        <section id="goals" className="py-24 bg-secondary/30 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide uppercase text-sm">Our Mission</h2>
              <p className="mt-2 text-4xl font-bold text-foreground sm:text-5xl tracking-tight">
                Empowering Women Through Technology
              </p>
              <p className="mt-4 text-xl text-muted-foreground">
                Building a digital ecosystem that prioritizes your health, privacy, and safety above all else.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  title: "Intelligent Insights", 
                  desc: "Advanced AI that learns your unique patterns for precise health predictions.",
                  icon: <Brain className="h-6 w-6" />
                },
                { 
                  title: "Mental Wellness", 
                  desc: "Holistic support integrating emotional well-being with physical health.",
                  icon: <Heart className="h-6 w-6" />
                },
                { 
                  title: "Uncompromised Privacy", 
                  desc: "Your data belongs to you. Local-first storage with military-grade encryption.",
                  icon: <Lock className="h-6 w-6" />
                },
                { 
                  title: "Community Safety", 
                  desc: "A verified, safe space protected from harassment and toxicity.",
                  icon: <Shield className="h-6 w-6" />
                },
              ].map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-emerald-500/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {goal.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{goal.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {goal.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">World-Class Features</h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to manage your health journey with confidence and clarity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Smart Cycle Tracker",
                  desc: "Beyond basic dates. Tracks ovulation, symptoms, and energy levels with predictive AI adjustments.",
                  icon: <Activity className="h-6 w-6 text-pink-500" />,
                  bg: "bg-pink-50 dark:bg-pink-900/10"
                },
                {
                  title: "Health Alert System",
                  desc: "Early detection patterns for PCOS, Endometriosis, and anemia risks to keep you informed.",
                  icon: <Stethoscope className="h-6 w-6 text-blue-500" />,
                  bg: "bg-blue-50 dark:bg-blue-900/10"
                },
                {
                  title: "Mood & Mind",
                  desc: "Correlate mood with cycle phases. Access mindfulness and nutrition tips tailored to you.",
                  icon: <Zap className="h-6 w-6 text-yellow-500" />,
                  bg: "bg-yellow-50 dark:bg-yellow-900/10"
                },
                {
                  title: "Privacy Vault",
                  desc: "No selling data. No third parties. Your health information stays on your device.",
                  icon: <Lock className="h-6 w-6 text-emerald-500" />,
                  bg: "bg-emerald-50 dark:bg-emerald-900/10"
                },
                {
                  title: "Education Hub",
                  desc: "Context-aware learning. Understand 'why' you feel this way during each phase.",
                  icon: <Smartphone className="h-6 w-6 text-purple-500" />,
                  bg: "bg-purple-50 dark:bg-purple-900/10"
                },
                {
                  title: "Safe Community",
                  desc: "AI-moderated spaces ensuring supportive, harassment-free connections.",
                  icon: <Users className="h-6 w-6 text-indigo-500" />,
                  bg: "bg-indigo-50 dark:bg-indigo-900/10"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="relative bg-card p-8 rounded-3xl border border-border/60 hover:border-emerald-500/30 transition-all shadow-sm hover:shadow-xl"
                >
                  <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-600 dark:bg-emerald-900">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent"></div>
          </div>
          <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to prioritize yourself?</h2>
            <p className="text-xl text-emerald-50 mb-10">
              Join thousands of women who are taking control of their health and safety with Emerald.
            </p>
            <Link
              href="/signup"
              className="inline-flex px-8 py-4 bg-white text-emerald-600 font-bold rounded-full shadow-lg hover:bg-emerald-50 transition-colors transform hover:scale-105"
            >
              Get Started Free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                E
              </div>
              <span className="text-xl font-bold text-foreground">Emerald</span>
            </div>
            
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Terms of Service</Link>
            </div>

            <p className="text-sm text-muted-foreground text-center md:text-right">
              &copy; 2025 Emerald. Made with <Heart className="inline h-3 w-3 text-red-500 mx-1" /> for women — by a woman in cybersecurity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
