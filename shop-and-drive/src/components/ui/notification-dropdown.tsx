"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, Package, Gift, Wrench, Users, AlertTriangle, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications, type Notification } from "@/store/notifications";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

const iconMap: Record<string, React.ReactNode> = {
  order: <Package className="h-4 w-4" />,
  promo: <Gift className="h-4 w-4" />,
  service: <Wrench className="h-4 w-4" />,
  hr: <Users className="h-4 w-4" />,
  system: <AlertTriangle className="h-4 w-4" />,
};

const colorMap: Record<string, string> = {
  order: "bg-blue-100 text-blue-600",
  promo: "bg-purple-100 text-purple-600",
  service: "bg-green-100 text-green-600",
  hr: "bg-orange-100 text-orange-600",
  system: "bg-red-100 text-red-600",
};

export function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const diffMs = Date.now() - date.getTime();
      const diffMin = Math.floor(diffMs / 60000);
      if (diffMin < 1) return "Baru saja";
      if (diffMin < 60) return `${diffMin} menit lalu`;
      const diffHour = Math.floor(diffMin / 60);
      if (diffHour < 24) return `${diffHour} jam lalu`;
      return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
    } catch {
      return dateStr;
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-96 rounded-xl border border-gray-200 bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-5 py-3">
            <h3 className="font-semibold text-gray-900">Notifikasi</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs font-medium text-red-600 hover:text-red-700"
              >
                Tandai semua dibaca
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-gray-500">
                <Bell className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                <p>Tidak ada notifikasi</p>
              </div>
            ) : (
              notifications.slice(0, 10).map((notif) => (
                <div
                  key={notif.id}
                  className={cn(
                    "border-b last:border-0 px-5 py-3 transition-colors hover:bg-gray-50",
                    !notif.isRead && "bg-blue-50/50"
                  )}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
                        colorMap[notif.type]
                      )}
                    >
                      {iconMap[notif.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                        <span className="ml-2 flex-shrink-0 text-xs text-gray-400">
                          {formatTime(notif.createdAt)}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-gray-600 line-clamp-2">{notif.message}</p>
                      {notif.link && notif.actionLabel && (
                        <Link
                          href={notif.link}
                          className="mt-1 inline-block text-xs font-medium text-red-600 hover:underline"
                        >
                          {notif.actionLabel} →
                        </Link>
                      )}
                    </div>
                    {!notif.isRead && (
                      <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-500" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="border-t px-5 py-2.5 text-center">
              <Link href="/admin/notifikasi" className="text-xs text-gray-500 hover:text-red-600">
                Lihat semua notifikasi
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
