import type { Metadata } from "next";
import type { ReactNode } from "react";

import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard | Pathly",
  description: "Manage Pathly countries and scholarships.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] flex overflow-hidden bg-page text-foreground">
      <AdminSidebar />
      <main className="min-w-0 flex-1 overflow-y-auto pt-16 lg:pt-0">
        <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-10 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
