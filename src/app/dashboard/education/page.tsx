"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Brain, Utensils, Shield, ChevronRight, PlayCircle } from "lucide-react";

const CATEGORIES = [
  { id: "cycle", name: "Cycle Science", icon: BookOpen, color: "text-pink-500", bg: "bg-pink-100 dark:bg-pink-900/30" },
  { id: "mental", name: "Mental Wellness", icon: Brain, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" },
  { id: "nutrition", name: "Nutrition", icon: Utensils, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
  { id: "safety", name: "Safety & Privacy", icon: Shield, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
];

const ARTICLES = [
  {
    id: 1,
    title: "Understanding the Luteal Phase",
    category: "cycle",
    readTime: "5 min read",
    image: "bg-pink-200",
    description: "Why do you feel tired and hungry before your period? The science behind progesterone explained.",
  },
  {
    id: 2,
    title: "Managing Anxiety Naturally",
    category: "mental",
    readTime: "7 min read",
    image: "bg-purple-200",
    description: "Breathing techniques and mindfulness practices to reduce cycle-related anxiety.",
  },
  {
    id: 3,
    title: "Seed Cycling 101",
    category: "nutrition",
    readTime: "4 min read",
    image: "bg-green-200",
    description: "How to use seeds to balance your hormones throughout your cycle naturally.",
  },
  {
    id: 4,
    title: "Digital Privacy Guide",
    category: "safety",
    readTime: "6 min read",
    image: "bg-blue-200",
    description: "Essential steps to protect your digital footprint and stay safe online.",
  },
  {
    id: 5,
    title: "PCOS: Signs & Symptoms",
    category: "cycle",
    readTime: "8 min read",
    image: "bg-pink-300",
    description: "Early warning signs of Polycystic Ovary Syndrome and when to see a doctor.",
  },
];

export default function EducationPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = ARTICLES.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Health Education</h1>
        <p className="text-muted-foreground mt-2">Expert-backed insights to understand your body better.</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search for topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === "all" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            All Topics
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Section (only show when no search/filter) */}
      {selectedCategory === "all" && !searchQuery && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <PlayCircle className="text-primary h-5 w-5" />
            Featured Series: Cycle Syncing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-6 text-white shadow-lg">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block">Start Here</span>
              <h3 className="text-2xl font-bold mb-2">The 4 Phases Explained</h3>
              <p className="text-pink-100 mb-6">A complete guide to understanding your menstrual cycle phases and how they affect your brain and body.</p>
              <button className="bg-white text-pink-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-pink-50 transition-colors">
                Start Reading
              </button>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block">Mental Health</span>
              <h3 className="text-2xl font-bold mb-2">Hormones & Happiness</h3>
              <p className="text-indigo-100 mb-6">Why your mood fluctuates throughout the month and scientific ways to stabilize it.</p>
              <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-indigo-50 transition-colors">
                Start Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article, idx) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-all cursor-pointer"
          >
            <div className={`h-48 ${article.image} relative`}>
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {CATEGORIES.find(c => c.id === article.category)?.name}
                </span>
                <span className="text-xs text-muted-foreground">{article.readTime}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                {article.description}
              </p>
              <div className="flex items-center text-primary text-sm font-medium">
                Read Article <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
