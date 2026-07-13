"use client";

import { useNotifications } from "@/store/notifications";
import { Bell, Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const iconMap: Record<string, string> = {
  order: "📦", promo: "🎁", service: "🔧", hr: "👥", system: "⚠️",
};

export default function NotifikasiPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, dismissNotification } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pusat Notifikasi</h1>
          <p className="text-gray-600">{unreadCount} notifikasi belum dibaca</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="h-4 w-4" /> Tandai Semua Dibaca
          </Button>
        )}
      </div>

      <Card>
        <div className="divide-y">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="mx-auto h-10 w-10 text-gray-300 mb-2" />
              <p className="text-gray-500">Tidak ada notifikasi</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={cn(
                  "flex items-start gap-4 p-5 transition-colors hover:bg-gray-50",
                  !notif.isRead && "bg-blue-50/50"
                )}
              >
                <span className="text-2xl">{iconMap[notif.type] || "📌"}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-900">{notif.title}</h3>
                    <div className="flex items-center gap-2 ml-2">
                      <span className="text-xs text-gray-400">{new Date(notif.createdAt).toLocaleString("id-ID")}</span>
                      {!notif.isRead && <span className="h-2 w-2 rounded-full bg-red-500" />}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{notif.message}</p>
                  {notif.actionLabel && notif.link && (
                    <a href={notif.link} className="mt-2 inline-block text-sm font-medium text-red-600 hover:underline">
                      {notif.actionLabel} →
                    </a>
                  )}
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  {!notif.isRead && (
                    <Button size="sm" variant="ghost" onClick={() => markAsRead(notif.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" className="text-red-500" onClick={() => dismissNotification(notif.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
