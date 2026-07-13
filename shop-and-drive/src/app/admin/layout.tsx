"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingCart, FileText, Gift, Users,
  CalendarCheck, Clock, DollarSign, Briefcase, BarChart3, Settings,
  ChevronLeft, ChevronRight, LogOut, Menu, X, ChevronDown,
} from "lucide-react";
import { NotificationDropdown } from "@/components/ui/notification-dropdown";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  {
    name: "Manajemen Produk",
    href: "/admin/produk",
    icon: Package,
  },
  { name: "Manajemen Order", href: "/admin/pesanan", icon: ShoppingCart },
  {
    name: "CMS",
    href: "/admin/cms",
    icon: FileText,
    children: [
      { name: "Artikel", href: "/admin/cms" },
      { name: "Banner & Slider", href: "/admin/cms/banner" },
    ],
  },
  { name: "Marketing", href: "/admin/marketing", icon: Gift },
  {
    name: "HRIS",
    href: "/admin/hris",
    icon: Users,
    children: [
      { name: "Data Karyawan", href: "/admin/hris/karyawan" },
      { name: "Absensi", href: "/admin/hris/absensi" },
      { name: "Persetujuan", href: "/admin/hris/persetujuan" },
      { name: "Cuti & Izin", href: "/admin/hris/cuti" },
      { name: "Payroll", href: "/admin/hris/payroll" },
      { name: "Rekrutmen", href: "/admin/hris/rekrutmen" },
      { name: "Penilaian Kinerja", href: "/admin/hris/kinerja" },
    ],
  },
  { name: "Laporan", href: "/admin/laporan", icon: BarChart3 },
  { name: "Pengaturan", href: "/admin/pengaturan", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["HRIS"]);
  const pathname = usePathname();

  const toggleMenu = (name: string) => {
    setExpandedMenus((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-gray-900 text-white transition-all duration-300 lg:static",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
          {!collapsed && (
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-sm font-bold text-white">
                S&D
              </div>
              <span className="text-sm font-bold">Admin Panel</span>
            </Link>
          )}
          {collapsed && (
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-sm font-bold text-white">
              A
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden rounded-lg p-1.5 text-gray-400 hover:bg-gray-800 lg:block"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-800 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const isExpanded = expandedMenus.includes(item.name);

            if (item.children) {
              return (
                <div key={item.name} className="mb-1">
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      isActive ? "bg-red-600 text-white" : "text-gray-300 hover:bg-gray-800"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.name}</span>
                        <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
                      </>
                    )}
                  </button>
                  {!collapsed && isExpanded && (
                    <div className="ml-3 mt-1 space-y-1 border-l-2 border-gray-700 pl-3">
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={cn(
                              "block rounded-lg px-3 py-2 text-sm transition-colors",
                              isChildActive ? "bg-red-600/20 text-red-400" : "text-gray-400 hover:text-white"
                            )}
                          >
                            {child.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive ? "bg-red-600 text-white" : "text-gray-300 hover:bg-gray-800"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-gray-800 p-3">
          <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 hover:text-white">
            <ChevronLeft className="h-4 w-4" />
            {!collapsed && <span>Lihat Website</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 lg:px-8">
          <button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Selamat datang, Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <NotificationDropdown />
            <div className="flex items-center gap-2 border-l pl-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
