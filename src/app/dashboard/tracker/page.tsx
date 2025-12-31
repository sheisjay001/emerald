"use client";

import { useState, useEffect, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, addDays, differenceInDays, isSameDay, startOfDay, subDays, isAfter, isBefore } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, AlertCircle, Sparkles, Plus, X, Calendar as CalendarIcon } from "lucide-react";
import { LocalStorage } from "@/lib/storage";

// Common symptoms to log
const SYMPTOM_OPTIONS = [
  "Cramps", "Headache", "Bloating", "Acne", 
  "Fatigue", "Mood Swings", "Insomnia", "Cravings",
  "High Energy", "High Libido", "Anxiety", "Sadness"
];

export default function TrackerPage() {
  // State
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);
  
  // Persistent State
  const [periodDays, setPeriodDays] = useState<Date[]>([]);
  const [symptoms, setSymptoms] = useState<Record<string, string[]>>({});
  const [cycleLength, setCycleLength] = useState(28); // Default 28 days
  const [periodLength, setPeriodLength] = useState(5); // Default 5 days

  // Load data on mount
  useEffect(() => {
    const storedDays = LocalStorage.getItem("period_days");
    if (storedDays) {
      setPeriodDays(storedDays.map((d: string) => new Date(d)));
    } else {
      // Default mock data if empty
      const today = new Date();
      const lastMonth = subDays(today, 28);
      const defaultDays = Array.from({ length: 5 }, (_, i) => addDays(lastMonth, i));
      setPeriodDays(defaultDays);
    }

    const storedSymptoms = LocalStorage.getItem("tracker_symptoms");
    if (storedSymptoms) {
      setSymptoms(storedSymptoms);
    }

    const storedCycleLength = LocalStorage.getItem("cycle_length");
    if (storedCycleLength) setCycleLength(Number(storedCycleLength));
  }, []);

  // Save period days when changed
  useEffect(() => {
    if (periodDays.length > 0) {
      LocalStorage.setItem("period_days", periodDays.map(d => d.toISOString()));
    }
  }, [periodDays]);

  // Save symptoms when changed
  useEffect(() => {
    if (Object.keys(symptoms).length > 0) {
      LocalStorage.setItem("tracker_symptoms", symptoms);
    }
  }, [symptoms]);

  // Save settings
  useEffect(() => {
    LocalStorage.setItem("cycle_length", cycleLength);
  }, [cycleLength]);

  // --- Cycle Calculations ---

  // Find the start date of the most recent period
  const lastPeriodStart = useMemo(() => {
    if (periodDays.length === 0) return new Date();
    
    // Sort days
    const sorted = [...periodDays].sort((a, b) => a.getTime() - b.getTime());
    
    // Find the last contiguous block (simplified: just look for the last date and go back)
    // Better approach: Find the latest date that doesn't have a "yesterday" in the list, 
    // but simplified for this context: find the start of the *latest* logged sequence.
    
    let latestStart = sorted[0];
    
    // Group into cycles (gap > 10 days)
    let currentBlockStart = sorted[0];
    let lastDate = sorted[0];
    
    for (let i = 1; i < sorted.length; i++) {
      const diff = differenceInDays(sorted[i], lastDate);
      if (diff > 10) {
        currentBlockStart = sorted[i];
      }
      lastDate = sorted[i];
    }
    latestStart = currentBlockStart;
    
    return latestStart;
  }, [periodDays]);

  const nextPeriodStart = addDays(lastPeriodStart, cycleLength);
  const ovulationDay = subDays(nextPeriodStart, 14);
  const fertileWindowStart = subDays(ovulationDay, 5);
  const fertileWindowEnd = addDays(ovulationDay, 1);

  // Generate arrays for calendar modifiers
  const fertileDays = useMemo(() => {
    const days = [];
    for (let i = 0; i <= differenceInDays(fertileWindowEnd, fertileWindowStart); i++) {
      days.push(addDays(fertileWindowStart, i));
    }
    return days;
  }, [fertileWindowStart, fertileWindowEnd]);

  // --- Helpers ---

  const handleLogPeriod = (start: Date, days: number) => {
    const newDays = [];
    for (let i = 0; i < days; i++) {
      newDays.push(addDays(start, i));
    }
    // Merge unique
    const uniqueDays = [...periodDays, ...newDays].filter((date, i, self) => 
      self.findIndex(d => isSameDay(d, date)) === i
    );
    setPeriodDays(uniqueDays);
    setIsLogModalOpen(false);
  };

  const handleToggleSymptom = (symptom: string) => {
    if (!selectedDate) return;
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const currentSymptoms = symptoms[dateKey] || [];
    
    let newSymptoms;
    if (currentSymptoms.includes(symptom)) {
      newSymptoms = currentSymptoms.filter(s => s !== symptom);
    } else {
      newSymptoms = [...currentSymptoms, symptom];
    }
    
    setSymptoms({
      ...symptoms,
      [dateKey]: newSymptoms
    });
  };

  const getPhaseInfo = (date: Date) => {
    if (!lastPeriodStart) return { name: "Unknown", description: "Log your period to see insights." };

    // Calculate days passed since the *relevant* cycle start for this date
    // For simplicity, we'll project the current cycle
    const dayOfCycle = differenceInDays(date, lastPeriodStart);
    
    // Adjust for future/past cycles logic if needed, but for now let's stick to the current projected cycle
    // or modulo math for a rough estimate
    const adjustedDay = ((dayOfCycle % cycleLength) + cycleLength) % cycleLength;

    if (periodDays.some(d => isSameDay(d, date))) {
      return { 
        name: "Menstrual Phase", 
        description: "Energy is lowest. Prioritize rest and warmth.",
        icon: Droplets,
        color: "text-rose-500"
      };
    }
    
    if (adjustedDay < cycleLength - 14 - 5) {
      return { 
        name: "Follicular Phase", 
        description: "Energy is rising. Great time for new projects and exercise.",
        icon: Sparkles,
        color: "text-pink-500"
      };
    }
    
    if (adjustedDay >= cycleLength - 19 && adjustedDay <= cycleLength - 13) {
      return { 
        name: "Ovulatory Phase", 
        description: "Peak energy and confidence. You are most fertile now.",
        icon: AlertCircle,
        color: "text-blue-500"
      };
    }
    
    return { 
      name: "Luteal Phase", 
      description: "Energy winds down. You may feel inward or emotional.",
      icon: CalendarIcon,
      color: "text-purple-500"
    };
  };

  const currentPhase = selectedDate ? getPhaseInfo(selectedDate) : null;
  const selectedDateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const currentSymptoms = symptoms[selectedDateKey] || [];

  return (
    <div className="space-y-8 relative pb-20">
      {/* Log Period Modal */}
      <AnimatePresence>
        {isLogModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card w-full max-w-md rounded-xl p-6 shadow-xl border border-border"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Log Period</h2>
                <button onClick={() => setIsLogModalOpen(false)} className="p-1 hover:bg-secondary rounded-full">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const dateStr = formData.get("startDate") as string;
                const duration = parseInt(formData.get("duration") as string);
                if (dateStr && duration) {
                  handleLogPeriod(new Date(dateStr), duration);
                }
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input type="date" name="startDate" defaultValue={format(new Date(), "yyyy-MM-dd")} required className="w-full rounded-md border border-input bg-background px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration (Days)</label>
                    <input type="number" name="duration" defaultValue={5} min={1} max={10} className="w-full rounded-md border border-input bg-background px-3 py-2" />
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button type="button" onClick={() => setIsLogModalOpen(false)} className="px-4 py-2 text-sm font-medium hover:bg-secondary rounded-md">Cancel</button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90">Save</button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Log Symptoms Modal */}
      <AnimatePresence>
        {isSymptomModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card w-full max-w-md rounded-xl p-6 shadow-xl border border-border"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold">Log Symptoms</h2>
                  <p className="text-sm text-muted-foreground">{selectedDate ? format(selectedDate, "MMM d, yyyy") : ""}</p>
                </div>
                <button onClick={() => setIsSymptomModalOpen(false)} className="p-1 hover:bg-secondary rounded-full">
                  <X size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {SYMPTOM_OPTIONS.map(symptom => (
                  <button
                    key={symptom}
                    onClick={() => handleToggleSymptom(symptom)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all text-left flex items-center justify-between ${
                      currentSymptoms.includes(symptom)
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {symptom}
                    {currentSymptoms.includes(symptom) && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={() => setIsSymptomModalOpen(false)} 
                  className="px-6 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cycle Tracker</h1>
          <p className="text-muted-foreground">Monitor your cycle, fertility, and symptoms.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-lg text-sm">
             <span className="text-muted-foreground">Cycle Length:</span>
             <input 
               type="number" 
               value={cycleLength} 
               onChange={(e) => setCycleLength(Math.max(20, Math.min(45, parseInt(e.target.value) || 28)))}
               className="w-12 bg-transparent font-semibold text-center outline-none border-b border-primary/20 focus:border-primary"
             />
             <span className="text-muted-foreground">days</span>
          </div>
          <button 
            onClick={() => setIsLogModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full font-medium shadow-sm transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Log Period
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm"
        >
          <div className="flex flex-col items-center">
            <style>{`
              .rdp {
                --rdp-cell-size: 50px;
                --rdp-accent-color: #0284c7;
                --rdp-background-color: #e0f2fe;
                margin: 0;
              }
              .rdp-day_selected { 
                background-color: var(--primary); 
                font-weight: bold;
                color: white;
              }
              .rdp-day_today { 
                font-weight: bold; 
                color: var(--primary);
              }
              .period-day {
                background-color: #fecdd3; /* Rose 200 */
                color: #be123c;
                border-radius: 50%;
              }
              .fertile-day {
                background-color: #dbeafe; /* Blue 100 */
                color: #1e40af;
                border-radius: 50%;
              }
              .ovulation-day {
                border: 2px solid #3b82f6;
                background-color: #eff6ff;
                border-radius: 50%;
                font-weight: bold;
              }
              .symptom-dot {
                position: relative;
              }
              .symptom-dot::after {
                content: '';
                position: absolute;
                bottom: 2px;
                left: 50%;
                transform: translateX(-50%);
                width: 4px;
                height: 4px;
                background-color: #8b5cf6;
                border-radius: 50%;
              }
            `}</style>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={{
                period: periodDays,
                fertile: fertileDays,
                ovulation: [ovulationDay],
                hasSymptoms: (date) => !!symptoms[format(date, "yyyy-MM-dd")]?.length
              }}
              modifiersClassNames={{
                period: "period-day",
                fertile: "fertile-day",
                ovulation: "ovulation-day",
                hasSymptoms: "symptom-dot"
              }}
            />
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-200"></div>
              <span className="text-sm text-muted-foreground">Period</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-100"></div>
              <span className="text-sm text-muted-foreground">Fertile Window</span>
            </div>
             <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border-2 border-blue-500"></div>
              <span className="text-sm text-muted-foreground">Ovulation</span>
            </div>
             <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
              <span className="text-sm text-muted-foreground">Logged Data</span>
            </div>
          </div>
        </motion.div>

        {/* Daily Insights Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Selected Date Info */}
          <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
            </h3>
            {currentPhase && (
              <>
                <div className={`flex items-center gap-2 font-medium ${currentPhase.color}`}>
                  {currentPhase.icon && <currentPhase.icon size={18} />}
                  {currentPhase.name}
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Sparkles className="text-yellow-500 mt-1 flex-shrink-0" size={18} />
                    <p className="text-sm text-muted-foreground">
                      {currentPhase.description}
                    </p>
                  </div>
                  {currentPhase.name === "Ovulatory Phase" && (
                    <div className="flex items-start gap-3">
                      <AlertCircle className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                      <p className="text-sm text-muted-foreground">
                        Chance of pregnancy: <span className="font-semibold text-blue-700">High</span>
                      </p>
                    </div>
                  )}
                   {currentPhase.name === "Follicular Phase" && (
                    <div className="flex items-start gap-3">
                      <AlertCircle className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                      <p className="text-sm text-muted-foreground">
                        Chance of pregnancy: <span className="font-semibold text-blue-700">Medium</span>
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Symptom Log */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col min-h-[200px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-foreground">Logged Symptoms</h3>
              {currentSymptoms.length > 0 && (
                <button 
                  onClick={() => setIsSymptomModalOpen(true)}
                  className="text-xs text-primary font-medium hover:underline"
                >
                  Edit
                </button>
              )}
            </div>
            
            {currentSymptoms.length > 0 ? (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {currentSymptoms.map((symptom) => (
                    <span 
                      key={symptom} 
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 flex-1 flex flex-col items-center justify-center">
                <div className="bg-secondary/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Droplets className="text-muted-foreground" size={24} />
                </div>
                <p className="text-sm text-muted-foreground">No symptoms logged.</p>
                <button 
                  onClick={() => setIsSymptomModalOpen(true)}
                  className="mt-3 text-sm font-medium text-primary hover:text-primary/80"
                >
                  + Add Symptoms
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}