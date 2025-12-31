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
    content: \`The luteal phase is the second half of your menstrual cycle, starting after ovulation and ending when your next period begins. It typically lasts 12-14 days.

During this time, your progesterone levels rise. Progesterone is known as the "calming hormone," but it also has physical effects that can feel like PMS.

Key Changes in Your Body:
- Increased Metabolism: Your body actually burns more calories during this phase (100-300 extra per day), which explains the hunger!
- Water Retention: You might feel bloated as your body holds onto fluids.
- Lower Energy: As progesterone rises, you may feel more tired or sluggish. This is a signal from your body to slow down.

How to Support Yourself:
1. Prioritize Rest: Go to bed 30 minutes earlier than usual.
2. Eat Complex Carbs: Sweet potatoes, oats, and brown rice help stabilize serotonin levels.
3. Gentle Movement: Swap HIIT for yoga or walking.\`
  },
  {
    id: 2,
    title: "Managing Anxiety Naturally",
    category: "mental",
    readTime: "7 min read",
    image: "bg-purple-200",
    description: "Breathing techniques and mindfulness practices to reduce cycle-related anxiety.",
    content: \`Cycle-related anxiety, often linked to PMDD or severe PMS, is real and valid. It's caused by the rapid drop in hormones before menstruation.

Techniques to Try:

1. The 4-7-8 Breathing Method
- Inhale quietly through the nose for 4 seconds.
- Hold the breath for 7 seconds.
- Exhale forcefully through the mouth for 8 seconds.
- Repeat 4 times.

2. Magnesium Glycinate
Consider supplementing with magnesium (consult your doctor first). It's known as "nature's relaxant" and can help with both anxiety and cramps.

3. Sensory Grounding
When you feel overwhelmed, find:
- 5 things you can see
- 4 things you can feel
- 3 things you can hear
- 2 things you can smell
- 1 thing you can taste\`
  },
  {
    id: 3,
    title: "Seed Cycling 101",
    category: "nutrition",
    readTime: "4 min read",
    image: "bg-green-200",
    description: "How to use seeds to balance your hormones throughout your cycle naturally.",
    content: \`Seed cycling involves eating specific seeds during the two main phases of your menstrual cycle to help promote the healthy balance of estrogen and progesterone levels.

Phase 1: Follicular Phase (Day 1 to Ovulation)
Goal: Support Estrogen Production
- Seeds: 1 tbsp Flax seeds + 1 tbsp Pumpkin seeds daily.
- Why: Flax seeds contain lignans which bind to excess estrogen. Pumpkin seeds are high in zinc, which supports progesterone production for the next phase.

Phase 2: Luteal Phase (Ovulation to Period)
Goal: Support Progesterone Production
- Seeds: 1 tbsp Sesame seeds + 1 tbsp Sunflower seeds daily.
- Why: Sesame seeds block excess estrogen. Sunflower seeds are high in selenium and Vitamin E, which support progesterone levels.\`
  },
  {
    id: 4,
    title: "Digital Privacy Guide",
    category: "safety",
    readTime: "6 min read",
    image: "bg-blue-200",
    description: "Essential steps to protect your digital footprint and stay safe online.",
    content: \`In an age where data is the new oil, protecting your digital privacy is crucial, especially for health data.

Key Steps for Protection:

1. Use Privacy-First Browsers: Switch to browsers like Brave or Firefox that block trackers by default.
2. Review App Permissions: Regularly check what apps have access to your location, camera, and microphone.
3. Two-Factor Authentication (2FA): Enable 2FA on all sensitive accounts.
4. Metadata Awareness: Remember that photos you share often contain location data (EXIF). Scrub this data before posting publicly if you want to remain anonymous.
5. Emerald's Promise: We store your sensitive health data locally on your device whenever possible, giving you full control.\`
  },
  {
    id: 5,
    title: "PCOS: Signs & Symptoms",
    category: "cycle",
    readTime: "8 min read",
    image: "bg-pink-300",
    description: "Early warning signs of Polycystic Ovary Syndrome and when to see a doctor.",
    content: \`Polycystic Ovary Syndrome (PCOS) affects 1 in 10 women of childbearing age. Early detection can prevent long-term complications.

Common Symptoms:
- Irregular Periods: Fewer than 9 periods a year or cycles longer than 35 days.
- Excess Androgen: High levels of "male" hormones resulting in physical signs like excess facial or body hair (hirsutism) or severe acne.
- Polycystic Ovaries: Your ovaries might be enlarged and contain follicles that surround the eggs.

What to Do:
If you have at least two of these symptoms, consult a healthcare provider. Lifestyle changes, including a low-glycemic diet and regular exercise, are often the first line of treatment.\`
  },
  {
    id: 6,
    title: "The 4 Phases Explained",
    category: "cycle",
    readTime: "10 min read",
    image: "bg-rose-200",
    description: "A complete guide to understanding your menstrual cycle phases and how they affect your brain and body.",
    content: \`Your menstrual cycle is more than just your period. It's a continuous 28-ish day rhythm with four distinct seasons, each bringing different strengths and energy levels.

1. Menstrual Phase (Winter)
Days 1-5
- What's happening: Hormones are at their lowest. Your uterine lining is shedding.
- How you feel: Tired, inward-focused, reflective.
- Superpower: Intuition and evaluation. It's a great time to journal and reassess your goals.

2. Follicular Phase (Spring)
Days 6-14
- What's happening: Estrogen starts to rise. An egg is preparing to be released.
- How you feel: Energetic, creative, social.
- Superpower: Brainstorming and beginning new projects. Your brain is primed for learning and complex problem-solving.

3. Ovulatory Phase (Summer)
Days 15-17
- What's happening: Estrogen peaks; testosterone surges slightly. The egg is released.
- How you feel: Confident, magnetic, communicative.
- Superpower: Communication and connection. Schedule important meetings or dates now.

4. Luteal Phase (Autumn)
Days 18-28
- What's happening: Progesterone rises. The body prepares for a potential pregnancy.
- How you feel: Calmer, detail-oriented, potentially moody if hormones are unbalanced.
- Superpower: Focus and finishing tasks. It's the "get things done" phase.\`
  },
  {
    id: 7,
    title: "Hormones & Happiness",
    category: "mental",
    readTime: "8 min read",
    image: "bg-indigo-200",
    description: "Why your mood fluctuates throughout the month and scientific ways to stabilize it.",
    content: \`Ever feel like a completely different person depending on the week? That's not "just in your head"—it's in your hormones.

The Estrogen-Serotonin Connection
In the first half of your cycle (Follicular/Ovulatory), rising estrogen boosts serotonin (the happiness chemical) and dopamine (the reward chemical). This is why you often feel optimistic and motivated.

The Progesterone Shift
In the second half (Luteal), estrogen drops and progesterone rises. Progesterone stimulates GABA receptors, which have a sedating, calming effect. While this can be relaxing, a sharp drop in progesterone before your period can lead to anxiety and irritability.

Scientific Ways to Stabilize Mood:

1. Cycle-Sync Your Social Life:
   - High Estrogen: Go out, network, socialize.
   - High Progesterone: Keep plans low-key, prioritize close friends or solo time.

2. Blood Sugar Balance:
   - Mood swings are often exaggerated by blood sugar crashes. Eat protein and healthy fats with every meal, especially in your Luteal phase.

3. Sunlight & Vitamin D:
   - Aim for 10-15 minutes of morning sunlight to regulate your circadian rhythm, which helps balance serotonin levels naturally.\`
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 relative">
      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-0 md:p-4 overflow-y-auto">
          <div className="min-h-screen px-0 md:px-4 text-center flex items-center justify-center w-full">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block w-full max-w-2xl bg-card shadow-xl md:rounded-2xl border border-border relative text-left overflow-hidden my-0 md:my-8 min-h-screen md:min-h-0 flex flex-col"
            >
              <div className="relative">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors backdrop-blur-sm"
                >
                  <span className="sr-only">Close</span>
                  ✕
                </button>
                
                <div className={`h-48 md:h-64 ${selectedArticle.image} relative w-full`}>
                  <div className="absolute bottom-0 left-0 p-4 md:p-6 bg-gradient-to-t from-black/60 to-transparent w-full">
                    <span className="text-white/90 text-xs md:text-sm font-medium uppercase tracking-wider bg-black/20 px-2 py-1 rounded backdrop-blur-sm">
                      {CATEGORIES.find(c => c.id === selectedArticle.category)?.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-8 flex-1 overflow-y-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">{selectedArticle.title}</h2>
                <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none text-muted-foreground pb-8">
                  <p className="lead text-base md:text-lg text-foreground font-medium mb-4">{selectedArticle.description}</p>
                  {selectedArticle.content ? (
                    <div className="whitespace-pre-wrap text-sm md:text-base">{selectedArticle.content}</div>
                  ) : (
                    <p>Full article content would appear here. This is a preview of the educational material.</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Health Education</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-2">Expert-backed insights to understand your body better.</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 md:mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search for topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 md:py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm md:text-base shadow-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
              selectedCategory === "all" 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            All Topics
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm"
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
        <div className="mb-8 md:mb-12">
          <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
            <PlayCircle className="text-primary h-5 w-5" />
            Featured Series: Cycle Syncing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-5 md:p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block backdrop-blur-sm">Start Here</span>
                <h3 className="text-xl md:text-2xl font-bold mb-2">The 4 Phases Explained</h3>
                <p className="text-pink-100 mb-4 md:mb-6 text-sm md:text-base">A complete guide to understanding your menstrual cycle phases and how they affect your brain and body.</p>
                <button 
                  onClick={() => setSelectedArticle(ARTICLES.find(a => a.id === 6) || null)}
                  className="w-full md:w-auto bg-white text-pink-600 px-4 py-2.5 md:py-2 rounded-lg font-medium text-sm hover:bg-pink-50 transition-colors shadow-sm"
                >
                  Start Reading
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 md:p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block backdrop-blur-sm">Mental Health</span>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Hormones & Happiness</h3>
                <p className="text-indigo-100 mb-4 md:mb-6 text-sm md:text-base">Why your mood fluctuates throughout the month and scientific ways to stabilize it.</p>
                <button 
                  onClick={() => setSelectedArticle(ARTICLES.find(a => a.id === 7) || null)}
                  className="w-full md:w-auto bg-white text-indigo-600 px-4 py-2.5 md:py-2 rounded-lg font-medium text-sm hover:bg-indigo-50 transition-colors shadow-sm"
                >
                  Start Reading
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-20 md:pb-0">
        {filteredArticles.map((article, idx) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedArticle(article)}
            className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col"
          >
            <div className={`h-40 md:h-48 ${article.image} relative`}>
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="p-4 md:p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {CATEGORIES.find(c => c.id === article.category)?.name}
                </span>
                <span className="text-xs text-muted-foreground">{article.readTime}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                {article.description}
              </p>
              <div className="flex items-center text-primary text-sm font-medium mt-auto">
                Read Article <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
