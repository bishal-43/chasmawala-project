// src/components/superadmin/DashboardHeader.js

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const DashboardHeader = ({ onAddAdmin }) => (
  <header className="flex items-center justify-between pb-4 border-b border-slate-200">
    <div>
      <h1 className="text-3xl font-bold text-slate-900">Admin Management</h1>
      <p className="mt-1 text-sm text-slate-600">
        Manage and create new administrator accounts.
      </p>
    </div>
    <Button onClick={onAddAdmin}>
      <PlusCircle className="mr-2 h-4 w-4" />
      Add Admin
    </Button>
  </header>
);