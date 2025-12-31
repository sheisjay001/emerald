"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, addDays } from "date-fns";
import { motion } from "framer-motion";
import { Droplets, AlertCircle, Sparkles } from "lucide-react";

// Mock data for cycle phases
const cycleData = {
  lastPeriod: new Date(2024, 11, 24), // Dec 24, 2024
  cycleLength: 28,
  periodLength: 5,
};

export default function TrackerPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [periodDays, setPeriodDays] = useState<Date[]>([
    new Date(2024, 11, 24),
    new Date(2024, 11, 25),
    new Date(2024, 11, 26),
    new Date(2024, 11, 27),
    new Date(2024, 11, 28),
  ]);

  useEffect(() => {
    const storedDays = LocalStorage.getItem("period_days");
    if (storedDays) {
      // Need to convert strings back to Date objects
      const dates = storedDays.map((d: string) => new Date(d));
      setPeriodDays(dates);
    }
  }, []);

  const handleLogPeriod = (start: Date, days: number) => {
    const newDays = [];
    for (let i = 0; i < days; i++) {
      newDays.push(addDays(start, i));
    }
    // Merge with existing (simple dedup)
    const uniqueDays = [...periodDays, ...newDays].filter((date, i, self) => 
      self.findIndex(d => d.getTime() === date.getTime()) === i
    );
    setPeriodDays(uniqueDays);
    LocalStorage.setItem("period_days", uniqueDays.map(d => d.toISOString()));
    setIsLogModalOpen(false);
  };

  const ovulationDay = new Date(2025, 0, 7); // Jan 7, 2025
  const fertileWindow = [
    new Date(2025, 0, 4),
    new Date(2025, 0, 5),
    new Date(2025, 0, 6),
    new Date(2025, 0, 7),
    new Date(2025, 0, 8),
  ];

  return (
    <div className="space-y-8 relative">
      {/* Log Period Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card w-full max-w-md rounded-xl p-6 shadow-xl border border-border"
          >
            <h2 className="text-xl font-bold mb-4">Log Period</h2>
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
                  <input type="date" name="startDate" required className="w-full rounded-md border border-input bg-background px-3 py-2" />
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

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cycle Tracker</h1>
          <p className="text-muted-foreground">Monitor your cycle, fertility, and symptoms.</p>
        </div>
        <button 
          onClick={() => setIsLogModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full font-medium shadow-sm transition-colors"
        >
          Log Period
        </button>
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
            `}</style>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={{
                period: periodDays,
                fertile: fertileWindow,
                ovulation: [ovulationDay]
              }}
              modifiersClassNames={{
                period: "period-day",
                fertile: "fertile-day",
                ovulation: "ovulation-day"
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
            <p className="text-primary font-medium">Follicular Phase</p>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3">
                <Sparkles className="text-yellow-500 mt-1" size={18} />
                <p className="text-sm text-muted-foreground">
                  Energy levels are rising. You might feel more social and confident today.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="text-blue-500 mt-1" size={18} />
                <p className="text-sm text-muted-foreground">
                  Chance of pregnancy: <span className="font-semibold text-blue-700">Low</span>
                </p>
              </div>
            </div>
          </div>

          {/* Symptom Log */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-foreground">Logged Symptoms</h3>
              <button className="text-xs text-primary font-medium hover:underline">Edit</button>
            </div>
            
            {/* Empty State Placeholder */}
            <div className="text-center py-8">
              <div className="bg-secondary/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Droplets className="text-muted-foreground" size={24} />
              </div>
              <p className="text-sm text-muted-foreground">No symptoms logged for this day.</p>
              <button className="mt-3 text-sm font-medium text-primary hover:text-primary/80">
                + Add Symptoms
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
