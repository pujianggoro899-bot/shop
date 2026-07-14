"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { attendances } from "@/data/employees";

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Absensi Karyawan</h1>
        <p className="text-gray-600">Rekap kehadiran hari ini — 13 Juli 2026</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500">
                <th className="px-5 py-3">Karyawan</th>
                <th className="px-5 py-3">Jam Masuk</th>
                <th className="px-5 py-3">Jam Keluar</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Lokasi</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((att) => (
                <tr key={att.id} className="border-b hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                        {att.employeeName.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{att.employeeName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    {att.clockIn !== "00:00" ? att.clockIn : "-"}
                  </td>
                  <td className="px-5 py-3">
                    {att.clockOut || "-"}
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={
                      att.status === "present" ? "success" :
                      att.status === "late" ? "warning" :
                      att.status === "leave" ? "info" : "danger"
                    }>
                      {att.status === "present" ? "Hadir" :
                       att.status === "late" ? "Terlambat" :
                       att.status === "leave" ? "Cuti" : "Alpha"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{att.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
