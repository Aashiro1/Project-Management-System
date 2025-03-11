"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname(); // Get current route

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`fixed md:relative w-64 bg-gray-900 text-white p-4 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-50 h-full md:h-auto`}>
        <h2 className="text-lg font-bold">Admin</h2>
        <nav className="mt-4 space-y-2">
          <Link href="/" className={`block px-4 py-2 rounded ${pathname === "/" ? "bg-blue-600" : "hover:bg-gray-700"}`}>Dashboard</Link>
          <Link href="/projectlist" className={`block px-4 py-2 rounded ${pathname === "/projectlist" ? "bg-blue-600" : "hover:bg-gray-700"}`}>Projects</Link>
          <Link href="/tasks" className={`block px-4 py-2 rounded ${pathname === "/tasks" ? "bg-blue-600" : "hover:bg-gray-700"}`}>Tasks</Link>
          <Link href="/report" className={`block px-4 py-2 rounded ${pathname === "/report" ? "bg-blue-600" : "hover:bg-gray-700"}`}>Report</Link>
          <Link href="/users" className={`block px-4 py-2 rounded ${pathname === "/users" ? "bg-blue-600" : "hover:bg-gray-700"}`}>Users</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-blue-600 p-4 text-white flex justify-between items-center md:pl-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden"><Menu className="w-6 h-6" /></button>
          <h1 className="text-lg font-bold flex-1 text-center md:text-left">Project Management System</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" className="hidden md:block">Administrator</Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Manage Account</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
