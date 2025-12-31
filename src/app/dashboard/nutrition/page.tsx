"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Utensils, 
  Coffee, 
  Droplets, 
  Dumbbell, 
  ChefHat,
  Leaf,
  Flame,
  Snowflake,
  Globe,
  Wind
} from "lucide-react";

type MealPlan = {
  breakfast: string;
  lunch: string;
  dinner: string;
  snack: string;
};

type RegionMeals = {
  [key: string]: MealPlan; // key is region name
};

// Meal Prep Data for Phases
const CYCLE_NUTRITION = [
  {
    phase: "Menstrual",
    days: "Days 1-5",
    theme: "Rest & Replenish",
    icon: Wind,
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
    description: "Focus on warm, comforting foods that are easy to digest. Replenish iron lost during menstruation.",
    nutrients: ["Iron", "Vitamin C", "Magnesium", "Omega-3"],
    hydration: "Warm herbal teas (ginger, chamomile) and plenty of water.",
    exercise: "Light yoga, walking, or rest.",
    meals: {
      Global: {
        breakfast: "Oatmeal with berries and flaxseeds",
        lunch: "Lentil soup with spinach and warm bread",
        dinner: "Grilled salmon or tofu with steamed broccoli and sweet potato",
        snack: "Dark chocolate and walnuts"
      },
      Africa: {
        breakfast: "Warm Millet porridge with dates and baobab powder",
        lunch: "Spicy Pepper Soup with fish or goat meat (rich in iron)",
        dinner: "Okra soup with swallow (e.g., eba/fufu) or sweet potatoes",
        snack: "Roasted groundnuts or Tiger nuts"
      },
      Asia: {
        breakfast: "Congee (Rice Porridge) with ginger and chicken",
        lunch: "Miso soup with tofu, seaweed, and warm rice",
        dinner: "Steamed fish with bok choy and ginger soy sauce",
        snack: "Red bean soup or warm soy milk"
      },
      Europe: {
        breakfast: "Warm porridge with stewed apples and cinnamon",
        lunch: "Beef and beetroot stew (Borscht style) for iron",
        dinner: "Baked cod with root vegetables",
        snack: "Dark chocolate and herbal tea"
      },
      "North America": {
        breakfast: "Warm quinoa bowl with maple and pecans",
        lunch: "Beef chili with kidney beans and spinach",
        dinner: "Roast chicken with mashed sweet potatoes",
        snack: "Trail mix with pumpkin seeds"
      },
      "South America": {
        breakfast: "Arepa with scrambled eggs and spinach",
        lunch: "Sancocho (hearty soup) with root vegetables",
        dinner: "Feijoada (black bean stew) with orange slices (Vitamin C)",
        snack: "Açaí bowl (room temp) or Brazil nuts"
      },
      Oceania: {
        breakfast: "Warm Weet-Bix with warm milk and honey",
        lunch: "Lamb stew with kumara (sweet potato)",
        dinner: "Steamed Snapper with pumpkin mash",
        snack: "Macadamia nuts"
      }
    }
  },
  {
    phase: "Follicular",
    days: "Days 6-14",
    theme: "Energy Rising",
    icon: Leaf,
    color: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-200",
    description: "Estrogen is rising. Focus on fresh, vibrant foods to support energy and follicular development.",
    nutrients: ["Probiotics", "Protein", "Vitamin E", "Zinc"],
    hydration: "Water with lemon or cucumber.",
    exercise: "Cardio, hiking, or dance.",
    meals: {
      Global: {
        breakfast: "Greek yogurt parfait with pumpkin seeds",
        lunch: "Quinoa salad with chickpeas, cucumber, and avocado",
        dinner: "Stir-fried chicken or tempeh with mixed vegetables",
        snack: "Apple slices with almond butter"
      },
      Africa: {
        breakfast: "Akara (bean cakes) with pap/ogi",
        lunch: "Jollof Rice with coleslaw and grilled chicken",
        dinner: "Efo Riro (Spinach stew) with lean meat and rice",
        snack: "Garden egg with peanut paste"
      },
      Asia: {
        breakfast: "Kimchi and egg over rice",
        lunch: "Fresh Spring Rolls with shrimp and herbs",
        dinner: "Bibimbap (Mixed Rice) with plenty of vegetables",
        snack: "Edamame or fresh fruit"
      },
      Europe: {
        breakfast: "Muesli with yogurt and fresh berries",
        lunch: "Caprese Salad with grilled chicken breast",
        dinner: "Pasta Primavera with light olive oil sauce",
        snack: "Fresh fruit salad"
      },
      "North America": {
        breakfast: "Avocado toast with poached egg and sprouts",
        lunch: "Cobb salad with turkey bacon and vinaigrette",
        dinner: "Grilled shrimp tacos with cabbage slaw",
        snack: "Carrot sticks with hummus"
      },
      "South America": {
        breakfast: "Tapioca crepe with cheese and turkey breast",
        lunch: "Ceviche with corn and sweet potato",
        dinner: "Grilled steak with chimichurri and salad",
        snack: "Papaya with lime"
      },
      Oceania: {
        breakfast: "Smashed avo on toast with feta",
        lunch: "Chicken and mango salad",
        dinner: "Barramundi fillet with fresh asparagus",
        snack: "Kiwi fruit"
      }
    }
  },
  {
    phase: "Ovulatory",
    days: "Days 15-17",
    theme: "Peak Performance",
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-200",
    description: "Energy is at its peak. Cooling foods help balance high body temperature. Focus on fiber.",
    nutrients: ["Fiber", "Antioxidants", "Calcium", "Glutathione"],
    hydration: "Coconut water or fruit-infused water.",
    exercise: "HIIT, strength training, or spin class.",
    meals: {
      Global: {
        breakfast: "Green smoothie with spinach, pineapple, and protein powder",
        lunch: "Raw kale caesar salad with grilled shrimp",
        dinner: "Tuna steak or chickpeas with asparagus and wild rice",
        snack: "Berries and a handful of almonds"
      },
      Africa: {
        breakfast: "Fruit salad (Papaya, Pineapple, Watermelon)",
        lunch: "Moi Moi (steamed bean pudding) with fish",
        dinner: "Grilled Tilapia with fresh vegetable salad",
        snack: "Coconut slices"
      },
      Asia: {
        breakfast: "Smoothie bowl with dragon fruit and mango",
        lunch: "Cold Soba noodles with dipping sauce",
        dinner: "Sushi or Sashimi with wakame salad",
        snack: "Green tea mochi"
      },
      Europe: {
        breakfast: "Smoked salmon bagel with cream cheese",
        lunch: "Gazpacho (cold tomato soup)",
        dinner: "Paella with seafood and saffron",
        snack: "Grapes and cheese"
      },
      "North America": {
        breakfast: "Acai bowl with granola and banana",
        lunch: "Spinach and strawberry salad with pecans",
        dinner: "Salmon poke bowl with brown rice",
        snack: "Frozen yogurt bark"
      },
      "South America": {
        breakfast: "Fresh tropical fruit platter with yogurt",
        lunch: "Quinoa salad with black beans and corn",
        dinner: "Moqueca (fish stew) with coconut milk",
        snack: "Passion fruit mousse"
      },
      Oceania: {
        breakfast: "Berry smoothie with protein powder",
        lunch: "Prawn cocktail salad",
        dinner: "BBQ seafood skewers with pineapple",
        snack: "Fresh pineapple slices"
      }
    }
  },
  {
    phase: "Luteal",
    days: "Days 18-28",
    theme: "Ground & Stabilize",
    icon: Snowflake,
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-200",
    description: "Progesterone rises. Focus on complex carbs to stabilize blood sugar and curb PMS cravings.",
    nutrients: ["B Vitamins", "Magnesium", "Complex Carbs", "Fiber"],
    hydration: "Water, peppermint tea (for bloating).",
    exercise: "Pilates, strength training, or moderate cardio.",
    meals: {
      Global: {
        breakfast: "Scrambled eggs with spinach and whole grain toast",
        lunch: "Roasted root vegetable bowl with tahini dressing",
        dinner: "Turkey chili or bean stew with brown rice",
        snack: "Hummus with carrot sticks"
      },
      Africa: {
        breakfast: "Yam porridge with leafy greens (Ugu)",
        lunch: "Egusi soup with pounded yam (rich and grounding)",
        dinner: "Beans pottage with plantain (complex carbs)",
        snack: "Cashew nuts"
      },
      Asia: {
        breakfast: "Brown rice with natto and egg",
        lunch: "Curry rice with root vegetables (potatoes, carrots)",
        dinner: "Hot pot with plenty of mushrooms and tofu",
        snack: "Roasted chestnuts or sweet potato"
      },
      Europe: {
        breakfast: "Rye bread with avocado and seeds",
        lunch: "Lentil stew with sausages",
        dinner: "Risotto with mushrooms and parmesan",
        snack: "Oat cakes with cheese"
      },
      "North America": {
        breakfast: "Whole wheat pancakes with turkey sausage",
        lunch: "Butternut squash soup with whole grain roll",
        dinner: "Meatloaf with mashed potatoes and green beans",
        snack: "Popcorn (air-popped)"
      },
      "South America": {
        breakfast: "Scrambled eggs with tomatoes and onions (Perico)",
        lunch: "Arroz con Pollo (Chicken and Rice)",
        dinner: "Lentil stew with chorizo",
        snack: "Plantain chips"
      },
      Oceania: {
        breakfast: "Wholegrain toast with vegemite and avocado",
        lunch: "Roast lamb sandwich with chutney",
        dinner: "Shepherd's pie with sweet potato top",
        snack: "Banana bread"
      }
    }
  }
];

const REGIONS = ["Global", "Africa", "Asia", "Europe", "North America", "South America", "Oceania"];

export default function NutritionPage() {
  const [selectedPhase, setSelectedPhase] = useState(CYCLE_NUTRITION[0]);
  const [selectedRegion, setSelectedRegion] = useState("Global");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Utensils className="text-primary" />
            Cycle-Synced Nutrition
          </h1>
          <p className="text-muted-foreground mt-1">
            Nourish your body according to your hormonal rhythm.
          </p>
        </div>
        
        {/* Region Selector */}
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1 shadow-sm">
          <Globe className="ml-2 text-muted-foreground" size={16} />
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-transparent border-none text-sm font-medium focus:ring-0 cursor-pointer py-1 pr-8"
          >
            {REGIONS.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Phase Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {CYCLE_NUTRITION.map((phase) => {
          const Icon = phase.icon;
          const isSelected = selectedPhase.phase === phase.phase;
          return (
            <button
              key={phase.phase}
              onClick={() => setSelectedPhase(phase)}
              className={`flex flex-col items-center p-4 rounded-xl border transition-all ${
                isSelected
                  ? `${phase.bg} ${phase.border} ring-2 ring-primary ring-offset-2`
                  : "bg-card border-border hover:bg-secondary"
              }`}
            >
              <Icon className={`h-6 w-6 mb-2 ${phase.color}`} />
              <span className="font-semibold text-foreground">{phase.phase}</span>
              <span className="text-xs text-muted-foreground">{phase.days}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <motion.div
        key={`${selectedPhase.phase}-${selectedRegion}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Main Guide */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Card */}
          <section className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${selectedPhase.bg}`}>
                <ChefHat className={`h-6 w-6 ${selectedPhase.color}`} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{selectedPhase.theme}</h2>
                <p className="text-sm text-muted-foreground">Focus for {selectedPhase.phase} Phase</p>
              </div>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              {selectedPhase.description}
            </p>
            
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Key Nutrients</h3>
              <div className="flex flex-wrap gap-2">
                {selectedPhase.nutrients.map((nutrient) => (
                  <span 
                    key={nutrient}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
                  >
                    {nutrient}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Meal Plan */}
          <section className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Utensils className="text-primary" size={20} />
                Meal Ideas ({selectedRegion})
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-lg bg-secondary/30">
                <div className="w-24 font-medium text-foreground shrink-0">Breakfast</div>
                <div className="text-muted-foreground">{(selectedPhase.meals as any)[selectedRegion].breakfast}</div>
              </div>
              <div className="flex gap-4 p-4 rounded-lg bg-secondary/30">
                <div className="w-24 font-medium text-foreground shrink-0">Lunch</div>
                <div className="text-muted-foreground">{(selectedPhase.meals as any)[selectedRegion].lunch}</div>
              </div>
              <div className="flex gap-4 p-4 rounded-lg bg-secondary/30">
                <div className="w-24 font-medium text-foreground shrink-0">Dinner</div>
                <div className="text-muted-foreground">{(selectedPhase.meals as any)[selectedRegion].dinner}</div>
              </div>
              <div className="flex gap-4 p-4 rounded-lg bg-secondary/30">
                <div className="w-24 font-medium text-foreground shrink-0">Snack</div>
                <div className="text-muted-foreground">{(selectedPhase.meals as any)[selectedRegion].snack}</div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          {/* Hydration */}
          <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900 p-6">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2 mb-3">
              <Droplets className="h-5 w-5" />
              Hydration Tip
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {selectedPhase.hydration}
            </p>
          </section>

          {/* Exercise */}
          <section className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-900 p-6">
            <h3 className="font-semibold text-green-900 dark:text-green-100 flex items-center gap-2 mb-3">
              <Dumbbell className="h-5 w-5" />
              Movement
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              {selectedPhase.exercise}
            </p>
          </section>

          {/* Quick Tip */}
          <section className="bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-900 p-6">
            <h3 className="font-semibold text-amber-900 dark:text-amber-100 flex items-center gap-2 mb-3">
              <Coffee className="h-5 w-5" />
              Pro Tip
            </h3>
            <p className="text-sm text-amber-800 dark:text-amber-200">
              {selectedPhase.phase === "Menstrual" && "Prioritize sleep and don't push yourself too hard."}
              {selectedPhase.phase === "Follicular" && "Start a new project or learn something new!"}
              {selectedPhase.phase === "Ovulatory" && "Socialize and schedule important meetings now."}
              {selectedPhase.phase === "Luteal" && "Practice self-care and declutter your space."}
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
