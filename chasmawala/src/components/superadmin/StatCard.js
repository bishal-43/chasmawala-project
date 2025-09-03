// src/components/superadmin/StatCard.js

import { Card, CardContent } from "@/components/ui/card";

// A reusable card for displaying a single statistic
export function StatCard({ label, value, icon, color }) {
  return (
    <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <CardContent className="flex items-center p-4 justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      </CardContent>
    </Card>
  );
}

// A skeleton loader component that mimics the StatCard layout
export function StatCardSkeleton() {
  return (
    <Card className="shadow-md">
      <CardContent className="flex items-center p-4 justify-between">
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-2"></div>
          <div className="h-7 bg-gray-200 rounded animate-pulse w-12"></div>
        </div>
        <div className="p-3 rounded-full bg-gray-200 animate-pulse">
          <div className="h-6 w-6"></div>
        </div>
      </CardContent>
    </Card>
  );
}