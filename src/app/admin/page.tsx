"use client";

import { motion } from "framer-motion";
import { Users, BarChart2, Settings, Shield } from "lucide-react";

import withAdminAuth from "@/components/withAdminAuth";

const AdminDashboardPage = () => {
  // Mock data for now
  const stats = [
    { name: "Total Users", value: "1,234", icon: Users },
    { name: "Active Users", value: "567", icon: BarChart2 },
    { name: "Pending Approvals", value: "42", icon: Shield },
    { name: "Server Status", value: "Online", icon: Settings },
  ];

  return (
    <div className="p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">Welcome, Admin. Here's an overview of your application.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card border border-border rounded-lg p-6 flex items-center gap-6"
          >
            <div className="bg-primary/10 p-4 rounded-full">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="text-muted-foreground">
          <p>Placeholder for recent user registrations, reports, or other admin-related events.</p>
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(AdminDashboardPage);
