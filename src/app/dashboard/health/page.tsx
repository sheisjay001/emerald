"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LocalStorage } from "@/lib/storage";
import { 
  Smile, 
  Meh, 
  Frown, 
  CloudRain, 
  Zap, 
  Save, 
  Activity,
  Thermometer,
  Droplets,
  AlertOctagon,
  Trash2
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// Mock Data for Charts
const SYMPTOM_DATA = [
  { day: "Mon", pain: 2, mood: 8, energy: 7 },
  { day: "Tue", pain: 3, mood: 7, energy: 6 },
  { day: "Wed", pain: 5, mood: 5, energy: 4 },
  { day: "Thu", pain: 4, mood: 6, energy: 5 },
  { day: "Fri", pain: 2, mood: 8, energy: 8 },
  { day: "Sat", pain: 1, mood: 9, energy: 9 },
  { day: "Sun", pain: 1, mood: 8, energy: 8 },
];

export default function HealthPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const moods = [
    { name: "Happy", icon: Smile, color: "text-green-500", bg: "bg-green-100" },
    { name: "Neutral", icon: Meh, color: "text-yellow-500", bg: "bg-yellow-100" },
    { name: "Sad", icon: Frown, color: "text-blue-500", bg: "bg-blue-100" },
    { name: "Anxious", icon: CloudRain, color: "text-gray-500", bg: "bg-gray-100" },
    { name: "Energetic", icon: Zap, color: "text-orange-500", bg: "bg-orange-100" },
  ];

  const symptomCategories = [
    {
      title: "Physical & Anatomical",
      items: ["Cramps", "Bloating", "Backache", "Breast Tenderness", "Acne", "Digestive Issues"]
    },
    {
      title: "Neurological & Mental",
      items: ["Headache", "Migraine", "Brain Fog", "High Focus", "Insomnia", "Sensory Sensitivity"]
    },
    {
      title: "Reproductive & Sexual",
      items: ["High Libido", "Low Libido", "Spotting", "Egg White CM", "Sticky CM", "Dry"]
    }
  ];

  const [aiInsight, setAiInsight] = useState("Analyzing your data...");
  const [healthAlerts, setHealthAlerts] = useState<{title: string, message: string, severity: 'low' | 'medium' | 'high'}[]>([]);

  // State for Chart Data
  const [chartData, setChartData] = useState<any[]>(SYMPTOM_DATA);
  const [logs, setLogs] = useState<any[]>([]);

  // Load logs on mount
  useEffect(() => {
    const loadedLogs = LocalStorage.getItem("health_logs") || [];
    setLogs(loadedLogs);
  }, []);

  // Process chart when logs change
  useEffect(() => {
    if (logs.length > 0) {
      // Sort by date (oldest to newest)
      const sortedLogs = [...logs].sort((a: any, b: any) => new Date(a.date).getTime() - b.date);
      
      // Take last 7 entries
      const recentLogs = sortedLogs.slice(-7);
      
      const newChartData = recentLogs.map((log: any) => {
        const date = new Date(log.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        // Map mood to score
        let moodScore = 5;
        if (log.mood === "Happy") moodScore = 9;
        if (log.mood === "Energetic") moodScore = 8;
        if (log.mood === "Neutral") moodScore = 5;
        if (log.mood === "Anxious") moodScore = 3;
        if (log.mood === "Sad") moodScore = 2;

        // Map symptoms count to "Physical Load" (proxy for pain/energy drain)
        const symptomLoad = Math.min(10, (log.symptoms?.length || 0) * 2);

        return {
          day: dayName,
          mood: moodScore,
          energy: 10 - symptomLoad // Inverse of symptom load as proxy for energy
        };
      });
      
      if (newChartData.length > 0) {
        setChartData(newChartData);
      }
    }
  }, [logs]);

  const handleDelete = (index: number) => {
    // Index is from the reversed slice (0-4) shown in UI
    const reversedLogs = [...logs].reverse();
    const logToDelete = reversedLogs[index];
    
    if (logToDelete) {
      const updatedLogs = logs.filter(l => l !== logToDelete);
      setLogs(updatedLogs);
      LocalStorage.setItem("health_logs", updatedLogs, true);
    }
  };
  // Calculate alerts based on current selection
  useEffect(() => {
    const alerts: typeof healthAlerts = [];
    
    // PCOS Pattern (Mock: Acne + Irregularity indicators)
    if ((selectedSymptoms.includes("Acne") || selectedSymptoms.includes("Excess Hair")) && (selectedSymptoms.includes("Irregular Periods") || selectedSymptoms.includes("High Libido"))) {
      alerts.push({
        title: "PCOS Risk Pattern Detected",
        message: "Your logged symptoms (Acne, Libido changes) align with common PCOS patterns. We recommend tracking your cycle length closely and consulting a specialist.",
        severity: "medium"
      });
    }

    // Endometriosis Pattern (Mock: Severe Pain combo)
    // Real app: Tracks pain intensity > 7/10 for 2+ days
    if (selectedSymptoms.includes("Cramps") && (selectedSymptoms.includes("Backache") || selectedSymptoms.includes("Pelvic Pain")) && selectedSymptoms.includes("Digestive Issues")) {
      alerts.push({
        title: "High Pain Pattern (Endo Risk)",
        message: "The combination of cramps, back pain, and digestive issues is often associated with Endometriosis. Please consider discussing this with your OBGYN.",
        severity: "high"
      });
    }

    // Anemia Risk (Mock)
    // Real app: Tracks heavy flow days + fatigue
    if ((selectedSymptoms.includes("Brain Fog") || selectedSymptoms.includes("Dizziness")) && (selectedSymptoms.includes("Insomnia") || selectedSymptoms.includes("Fatigue"))) {
      alerts.push({
        title: "Potential Iron Deficiency (Anemia)",
        message: "Persistent fatigue, brain fog, or dizziness can be signs of Anemia, especially during your period. Consider an iron-rich diet or a blood test.",
        severity: "low"
      });
    }
    
    // PMDD Pattern
    if ((selectedMood === "Sad" || selectedMood === "Anxious") && selectedSymptoms.includes("Bloating")) {
       alerts.push({
        title: "PMDD Pattern Detected",
        message: "Severe mood shifts combined with physical symptoms before your period may indicate PMDD.",
        severity: "medium"
      });
    }

    setHealthAlerts(alerts);
  }, [selectedSymptoms, selectedMood]);

  useEffect(() => {
    if (selectedSymptoms.includes("Headache") || selectedSymptoms.includes("Migraine")) {
      setAiInsight("You've logged headaches. Ensure you're hydrated and minimize screen time if possible.");
    } else if (selectedMood === "Sad" || selectedMood === "Anxious") {
       setAiInsight("Your mood might be influenced by hormonal shifts. Prioritize rest and self-care.");
    } else if (selectedSymptoms.includes("High Focus")) {
       setAiInsight("Great time for productivity! Leverage this high-focus window.");
    } else {
       setAiInsight("Your patterns look stable. Keep logging to unlock deeper cycle insights!");
    }
  }, [selectedSymptoms, selectedMood]);

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Create entry object
    const entry = {
      date: new Date().toISOString(),
      mood: selectedMood,
      symptoms: selectedSymptoms,
      note: note
    };

    try {
      // Get existing logs
      const existingLogs = LocalStorage.getItem("health_logs") || [];
      const updatedLogs = [...existingLogs, entry];
      
      // Save encrypted
      LocalStorage.setItem("health_logs", updatedLogs, true);
      setLogs(updatedLogs);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSaving(false);
      // Reset form
      setNote("");
      setSelectedMood(null);
      setSelectedSymptoms([]);
    } catch (error) {
      console.error("Save error:", error);
      setIsSaving(false);
      alert("Failed to save entry.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Health & Mood Log</h1>
        <p className="text-muted-foreground mt-1">Track your daily symptoms and well-being.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Mood Section */}
          <section className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Smile className="text-primary" size={20} />
              How are you feeling today?
            </h2>
            <div className="flex flex-wrap gap-4">
              {moods.map((mood) => {
                const Icon = mood.icon;
                const isSelected = selectedMood === mood.name;
                return (
                  <motion.button
                    key={mood.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMood(mood.name)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                      isSelected 
                        ? `${mood.bg} ring-2 ring-offset-2 ring-primary` 
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    <Icon className={`h-8 w-8 ${isSelected ? mood.color : "text-muted-foreground"}`} />
                    <span className={`text-sm font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                      {mood.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* Symptoms Section */}
          <div className="space-y-6">
            {symptomCategories.map((category) => (
              <section key={category.title} className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Activity className="text-primary" size={20} />
                  {category.title}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {category.items.map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                        selectedSymptoms.includes(symptom)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-muted-foreground border-input hover:border-primary/50"
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Notes Section */}
          <section className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-4">Notes</h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add any other details about your day..."
              className="w-full h-32 px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </section>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {isSaving ? (
                "Saving..."
              ) : (
                <>
                  <Save size={20} />
                  Save Entry
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sidebar / Insights */}
        <div className="space-y-6">
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-4">Weekly Trends</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6b7280'}} />
                  <YAxis hide domain={[0, 10]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#0ea5e9" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorMood)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="energy" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    fillOpacity={0}
                    fill="transparent" 
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary"></span> Mood
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Energy
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4" />
              AI Insight
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {aiInsight || "Analyzing your data..."}
            </p>
          </div>

          {/* Health Alerts */}
          {healthAlerts.length > 0 && (
            <div className="space-y-4">
              {healthAlerts.map((alert, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${
                  alert.severity === 'high' ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900' :
                  alert.severity === 'medium' ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-900' :
                  'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900'
                }`}>
                  <h3 className={`font-semibold flex items-center gap-2 mb-2 ${
                    alert.severity === 'high' ? 'text-red-900 dark:text-red-100' :
                    alert.severity === 'medium' ? 'text-amber-900 dark:text-amber-100' :
                    'text-yellow-900 dark:text-yellow-100'
                  }`}>
                    <AlertOctagon className="h-4 w-4" />
                    {alert.title}
                  </h3>
                  <p className={`text-sm ${
                    alert.severity === 'high' ? 'text-red-800 dark:text-red-200' :
                    alert.severity === 'medium' ? 'text-amber-800 dark:text-amber-200' :
                    'text-yellow-800 dark:text-yellow-200'
                  }`}>
                    {alert.message}
                  </p>
                  <button className="mt-3 text-xs font-medium underline opacity-80 hover:opacity-100">
                    Find a Specialist
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Recent History */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-4">Recent Logs</h3>
            {logs.length > 0 ? (
              <div className="space-y-4">
                {logs.slice().reverse().slice(0, 5).map((log: any, idx: number) => (
                  <div key={idx} className="pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium text-foreground">
                        {new Date(log.date).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground`}>
                        {log.mood || "No Mood"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {log.symptoms?.length || 0} symptoms
                      </span>
                      <button 
                        onClick={() => handleDelete(idx)}
                        className="ml-auto p-1 text-muted-foreground hover:text-red-500 transition-colors"
                        title="Delete entry"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                    {log.note && (
                      <p className="text-xs text-muted-foreground line-clamp-2 italic">
                        "{log.note}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No logs yet. Start tracking today!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
