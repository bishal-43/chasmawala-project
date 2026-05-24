// src/app/admin/(protected)/customers/page.js

"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Calendar } from "lucide-react";

// Helper to get initials from a name for the avatar
const getInitials = (name) => {
  if (!name) return "?";
  const names = name.split(' ');
  if (names.length > 1) {
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/customers");
        if (!res.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await res.json();
        setCustomers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[300px] gap-3">
        <div className="w-8 h-8 rounded-full border-4 border-zinc-200 border-t-amber-500 animate-spin" />
        <p className="text-zinc-500 text-sm font-medium">Loading customers...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header and counter */}
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight dark:text-zinc-50">Customers</h1>
          <p className="text-[14px] text-zinc-500 font-medium">
            Manage your registered customer accounts and check logs.
          </p>
        </div>
        <div className="flex items-center gap-2.5 mt-4 md:mt-0 text-xs font-semibold bg-white border border-zinc-150 rounded-xl px-4 py-2.5 text-zinc-650 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400">
          <Users className="h-4 w-4 text-amber-500" />
          <span>Total registered: <span className="font-extrabold text-zinc-900 dark:text-zinc-50">{customers.length}</span></span>
        </div>
      </div>

      {/* Table view */}
      <Card className="border border-zinc-100 dark:border-zinc-800 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="px-6 py-5 bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
          <CardTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Customer Directory</CardTitle>
          <CardDescription className="text-xs text-zinc-450 mt-1">A structured directory of registered users on Chasmawala.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
                <TableRow className="border-b border-zinc-100 hover:bg-transparent dark:border-zinc-800">
                  <TableHead className="px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wider">Customer</TableHead>
                  <TableHead className="px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wider hidden sm:table-cell">Email Address</TableHead>
                  <TableHead className="px-6 py-3.5 text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">Joined On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="p-8 text-center text-sm text-zinc-400">
                      No registered customers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  customers.map((customer) => (
                    <TableRow key={customer._id} className="border-b border-zinc-100 hover:bg-zinc-50/30 transition dark:border-zinc-800">
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border border-zinc-100 shadow-sm rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600">
                            <AvatarFallback className="text-[11px] font-bold text-zinc-950">
                              {getInitials(customer.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">{customer.name}</span>
                            <span className="text-[11px] text-zinc-400 sm:hidden mt-0.5 block">{customer.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 hidden sm:table-cell font-medium text-zinc-600 dark:text-zinc-400">{customer.email}</TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 font-semibold dark:text-zinc-400 bg-zinc-50 border border-zinc-200/50 rounded-lg px-2.5 py-1">
                          <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                          {new Date(customer.createdAt).toLocaleDateString()}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage;