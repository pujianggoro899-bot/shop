"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "order" | "promo" | "service" | "hr" | "system";
  isRead: boolean;
  createdAt: string;
  link?: string;
  actionLabel?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, "id" | "isRead" | "createdAt">) => void;
  dismissNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif-1",
      title: "Pesanan Baru Masuk",
      message: "Pesanan #INV-2401 dari Budi Santoso — Rp 395.000",
      type: "order",
      isRead: false,
      createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
      link: "/admin/pesanan",
      actionLabel: "Lihat Pesanan",
    },
    {
      id: "notif-2",
      title: "Stok Menipis",
      message: "Oli Shell Helix HX7 4L tersisa 3 unit. Segera lakukan restock.",
      type: "system",
      isRead: false,
      createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
      link: "/admin/produk",
      actionLabel: "Cek Stok",
    },
    {
      id: "notif-3",
      title: "Pengajuan Cuti Baru",
      message: "Joko Widodo mengajukan cuti tahunan 3 hari (20-22 Juli 2026).",
      type: "hr",
      isRead: true,
      createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
      link: "/admin/hris/cuti",
      actionLabel: "Review",
    },
    {
      id: "notif-4",
      title: "Booking Servis Baru",
      message: "Booking servis berkala untuk Honda Brio - 15 Juli 2026 pukul 10:00",
      type: "service",
      isRead: true,
      createdAt: new Date(Date.now() - 240 * 60000).toISOString(),
      link: "/admin/pesanan",
      actionLabel: "Lihat Detail",
    },
    {
      id: "notif-5",
      title: "Promo Berakhir",
      message: "Voucher HEMAT30 akan berakhir dalam 2 hari. Segera promosikan!",
      type: "promo",
      isRead: true,
      createdAt: new Date(Date.now() - 360 * 60000).toISOString(),
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "isRead" | "createdAt">) => {
      const newNotif: Notification = {
        ...notification,
        id: `notif-${Date.now()}`,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      setNotifications((prev) => [newNotif, ...prev]);
    },
    []
  );

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification, dismissNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within NotificationProvider");
  return context;
}

// ========== SERVICE REMINDER SYSTEM ==========
export interface ServiceReminder {
  id: string;
  vehicleId: string;
  vehicleName: string;
  licensePlate: string;
  lastServiceKm: number;
  lastServiceDate: string;
  reminderType: "kilometer" | "monthly";
  intervalKm?: number;
  intervalMonth?: number;
  nextServiceKm?: number;
  nextServiceDate?: string;
  isActive: boolean;
}

const defaultReminders: ServiceReminder[] = [
  {
    id: "sr-1",
    vehicleId: "vhc-1",
    vehicleName: "Honda Brio Satya",
    licensePlate: "B 1234 ABC",
    lastServiceKm: 45000,
    lastServiceDate: "2026-04-15",
    reminderType: "kilometer",
    intervalKm: 5000,
    nextServiceKm: 50000,
    isActive: true,
  },
  {
    id: "sr-2",
    vehicleId: "vhc-2",
    vehicleName: "Toyota Avanza",
    licensePlate: "B 5678 DEF",
    lastServiceKm: 82000,
    lastServiceDate: "2026-02-20",
    reminderType: "monthly",
    intervalMonth: 3,
    nextServiceDate: "2026-05-20",
    isActive: true,
  },
  {
    id: "sr-3",
    vehicleId: "vhc-3",
    vehicleName: "Mitsubishi Xpander",
    licensePlate: "B 9012 GHI",
    lastServiceKm: 12500,
    lastServiceDate: "2026-06-01",
    reminderType: "kilometer",
    intervalKm: 10000,
    nextServiceKm: 20000,
    isActive: false,
  },
];

interface ServiceReminderContextType {
  reminders: ServiceReminder[];
  addReminder: (reminder: Omit<ServiceReminder, "id">) => void;
  updateReminder: (id: string, data: Partial<ServiceReminder>) => void;
  deleteReminder: (id: string) => void;
  getDueReminders: () => ServiceReminder[];
  getOverdueReminders: () => ServiceReminder[];
}

const ServiceReminderContext = createContext<ServiceReminderContextType | undefined>(undefined);

export function ServiceReminderProvider({ children }: { children: ReactNode }) {
  const [reminders, setReminders] = useState<ServiceReminder[]>(defaultReminders);

  const addReminder = useCallback((reminder: Omit<ServiceReminder, "id">) => {
    const newReminder: ServiceReminder = { ...reminder, id: `sr-${Date.now()}` };
    setReminders((prev) => [...prev, newReminder]);
  }, []);

  const updateReminder = useCallback((id: string, data: Partial<ServiceReminder>) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, ...data } : r)));
  }, []);

  const deleteReminder = useCallback((id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const getDueReminders = useCallback(() => {
    const now = new Date();
    return reminders.filter((r) => {
      if (!r.isActive) return false;
      if (r.reminderType === "kilometer" && r.nextServiceKm) {
        // Assume current KM is tracked; return if within 1000 km
        return true; // Simplified
      }
      if (r.reminderType === "monthly" && r.nextServiceDate) {
        const nextDate = new Date(r.nextServiceDate);
        const diffDays = Math.ceil((nextDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays <= 14 && diffDays >= 0;
      }
      return false;
    });
  }, [reminders]);

  const getOverdueReminders = useCallback(() => {
    const now = new Date();
    return reminders.filter((r) => {
      if (!r.isActive) return false;
      if (r.reminderType === "monthly" && r.nextServiceDate) {
        return new Date(r.nextServiceDate) < now;
      }
      return false;
    });
  }, [reminders]);

  return (
    <ServiceReminderContext.Provider
      value={{ reminders, addReminder, updateReminder, deleteReminder, getDueReminders, getOverdueReminders }}
    >
      {children}
    </ServiceReminderContext.Provider>
  );
}

export function useServiceReminders() {
  const context = useContext(ServiceReminderContext);
  if (!context) throw new Error("useServiceReminders must be used within ServiceReminderProvider");
  return context;
}
