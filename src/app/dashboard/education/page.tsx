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
    content: `The luteal phase is the second half of your menstrual cycle, starting after ovulation and ending when your next period begins. It typically lasts 12-14 days.

During this time, your progesterone levels rise. Progesterone is known as the "calming hormone," but it also has physical effects that can feel like PMS.

**Key Changes in Your Body:**
- **Increased Metabolism:** Your body actually burns more calories during this phase (100-300 extra per day), which explains the hunger!
- **Water Retention:** You might feel bloated as your body holds onto fluids.
- **Lower Energy:** As progesterone rises, you may feel more tired or sluggish. This is a signal from your body to slow down.

**How to Support Yourself:**
1. **Prioritize Rest:** Go to bed 30 minutes earlier than usual.
2. **Eat Complex Carbs:** Sweet potatoes, oats, and brown rice help stabilize serotonin levels.
3. **Gentle Movement:** Swap HIIT for yoga or walking.`
  },
  {
    id: 2,
    title: "Managing Anxiety Naturally",
    category: "mental",
    readTime: "7 min read",
    image: "bg-purple-200",
    description: "Breathing techniques and mindfulness practices to reduce cycle-related anxiety.",
    content: `Cycle-related anxiety, often linked to PMDD or severe PMS, is real and valid. It's caused by the rapid drop in hormones before menstruation.

**Techniques to Try:**

**1. The 4-7-8 Breathing Method**
- Inhale quietly through the nose for 4 seconds.
- Hold the breath for 7 seconds.
- Exhale forcefully through the mouth for 8 seconds.
- Repeat 4 times.

**2. Magnesium Glycinate**
Consider supplementing with magnesium (consult your doctor first). It's known as "nature's relaxant" and can help with both anxiety and cramps.

**3. Sensory Grounding**
When you feel overwhelmed, find:
- 5 things you can see
- 4 things you can feel
- 3 things you can hear
- 2 things you can smell
- 1 thing you can taste`
  },
  {
    id: 3,
    title: "Seed Cycling 101",
    category: "nutrition",
    readTime: "4 min read",
    image: "bg-green-200",
    description: "How to use seeds to balance your hormones throughout your cycle naturally.",
    content: `Seed cycling involves eating specific seeds during the two main phases of your menstrual cycle to help promote the healthy balance of estrogen and progesterone levels.

**Phase 1: Follicular Phase (Day 1 to Ovulation)**
*Goal: Support Estrogen Production*
- **Seeds:** 1 tbsp Flax seeds + 1 tbsp Pumpkin seeds daily.
- **Why:** Flax seeds contain lignans which bind to excess estrogen. Pumpkin seeds are high in zinc, which supports progesterone production for the next phase.

**Phase 2: Luteal Phase (Ovulation to Period)**
*Goal: Support Progesterone Production*
- **Seeds:** 1 tbsp Sesame seeds + 1 tbsp Sunflower seeds daily.
- **Why:** Sesame seeds block excess estrogen. Sunflower seeds are high in selenium and Vitamin E, which support progesterone levels.`
  },
  {
    id: 4,
    title: "Digital Privacy Guide",
    category: "safety",
    readTime: "6 min read",
    image: "bg-blue-200",
    description: "Essential steps to protect your digital footprint and stay safe online.",
    content: `In an age where data is the new oil, protecting your digital privacy is crucial, especially for health data.

**Key Steps for Protection:**

1. **Use Privacy-First Browsers:** Switch to browsers like Brave or Firefox that block trackers by default.
2. **Review App Permissions:** Regularly check what apps have access to your location, camera, and microphone.
3. **Two-Factor Authentication (2FA):** Enable 2FA on all sensitive accounts.
4. **Metadata Awareness:** Remember that photos you share often contain location data (EXIF). Scrub this data before posting publicly if you want to remain anonymous.
5. **Emerald's Promise:** We store your sensitive health data locally on your device whenever possible, giving you full control.`
  },
  {
    id: 5,
    title: "PCOS: Signs & Symptoms",
    category: "cycle",
    readTime: "8 min read",
    image: "bg-pink-300",
    description: "Early warning signs of Polycystic Ovary Syndrome and when to see a doctor.",
    content: `Polycystic Ovary Syndrome (PCOS) affects 1 in 10 women of childbearing age. Early detection can prevent long-term complications.

**Common Symptoms:**
- **Irregular Periods:** Fewer than 9 periods a year or cycles longer than 35 days.
- **Excess Androgen:** High levels of "male" hormones resulting in physical signs like excess facial or body hair (hirsutism) or severe acne.
- **Polycystic Ovaries:** Your ovaries might be enlarged and contain follicles that surround the eggs.

**What to Do:**
If you have at least two of these symptoms, consult a healthcare provider. Lifestyle changes, including a low-glycemic diet and regular exercise, are often the first line of treatment.`
  },
];

export default function EducationPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedArticle, setSelectedArticle] = useState<typeof ARTICLES[0] | null>(null);

  const filteredArticles = ARTICLES.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="min-h-screen px-4 text-center">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-card shadow-xl rounded-2xl border border-border relative"
            >
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
              >
                ✕
              </button>
              
              <div className={`h-48 -mx-6 -mt-6 mb-6 ${selectedArticle.image} relative`}>
                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/60 to-transparent w-full">
                  <span className="text-white/90 text-sm font-medium uppercase tracking-wider bg-black/20 px-2 py-1 rounded backdrop-blur-sm">
                    {CATEGORIES.find(c => c.id === selectedArticle.category)?.name}
                  </span>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-4">{selectedArticle.title}</h2>
              <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none text-muted-foreground">
                <p className="lead text-lg text-foreground font-medium mb-4">{selectedArticle.description}</p>
                {selectedArticle.content ? (
                  <div className="whitespace-pre-wrap">{selectedArticle.content}</div>
                ) : (
                  <p>Full article content would appear here. This is a preview of the educational material.</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}

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
            onClick={() => setSelectedArticle(article)}
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
