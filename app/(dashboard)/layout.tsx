import React from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Dashboard | Instagram Clone",
  description: "Dashboard to manage your account.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar/>
        <main className="w-full relative bg-gray-50">
          <SidebarTrigger className="fixed z-10 hover:scale-110 duration-300 transition-transform ease-in-out" />
          {children}
        </main>
        <Toaster />
      </SidebarProvider>
    </>
  );
}
