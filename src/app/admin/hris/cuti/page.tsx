"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { leaveRequests } from "@/data/employees";

export default function LeavePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cuti & Izin</h1>
        <p className="text-gray-600">Kelola pengajuan cuti dan izin karyawan</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">2</p>
            <p className="text-sm text-gray-600">Menunggu Approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">2</p>
            <p className="text-sm text-gray-600">Disetujui (Bulan Ini)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">0</p>
            <p className="text-sm text-gray-600">Ditolak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">4</p>
            <p className="text-sm text-gray-600">Total Hari Cuti</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500">
                <th className="px-5 py-3">Karyawan</th>
                <th className="px-5 py-3">Jenis</th>
                <th className="px-5 py-3">Tanggal</th>
                <th className="px-5 py-3">Durasi</th>
                <th className="px-5 py-3">Alasan</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((leave) => (
                <tr key={leave.id} className="border-b hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600">
                        {leave.employeeName.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{leave.employeeName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 capitalize text-gray-700">{leave.type}</td>
                  <td className="px-5 py-3 text-gray-600">{leave.startDate} - {leave.endDate}</td>
                  <td className="px-5 py-3 text-gray-700">{leave.duration} hari</td>
                  <td className="px-5 py-3 text-gray-500 max-w-[150px] truncate">{leave.reason}</td>
                  <td className="px-5 py-3">
                    <Badge variant={
                      leave.status === "approved" ? "success" :
                      leave.status === "rejected" ? "danger" : "warning"
                    }>
                      {leave.status === "approved" ? "Disetujui" :
                       leave.status === "rejected" ? "Ditolak" : "Pending"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    {leave.status === "pending" ? (
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="text-green-600">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">{leave.approvedBy || "-"}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
