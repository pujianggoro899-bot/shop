"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Clock, CalendarDays, DollarSign, FileText, LogOut, CheckCircle, XCircle, AlertCircle, ChevronRight, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatDate } from "@/lib/utils";

// Mock employee logged in
const employee = {
  id: "emp-5",
  employeeId: "SD-005",
  name: "Eka Wijaya",
  position: "Kepala Mekanik",
  department: "Operasional Bengkel",
  email: "eka@shopandrive.com",
  phone: "081234567894",
  photo: "",
  joinDate: "2019-08-05",
  status: "active",
};

const attendanceMonth = [
  { date: "01 Jul 2026", clockIn: "07:30", clockOut: "17:15", status: "present" as const },
  { date: "02 Jul 2026", clockIn: "07:45", clockOut: "17:00", status: "present" as const },
  { date: "03 Jul 2026", clockIn: "08:10", clockOut: "17:30", status: "late" as const },
  { date: "04 Jul 2026", clockIn: "07:20", clockOut: "16:45", status: "present" as const },
  { date: "05 Jul 2026", clockIn: "07:00", clockOut: "17:00", status: "present" as const },
  { date: "06 Jul 2026", clockIn: "-", clockOut: "-", status: "absent" as const },
  { date: "07 Jul 2026", clockIn: "-", clockOut: "-", status: "leave" as const },
];

const leaveBalance = {
  annual: { total: 12, used: 5, remaining: 7 },
  sick: { total: 14, used: 2, remaining: 12 },
  personal: { total: 5, used: 1, remaining: 4 },
};

const recentPayrolls = [
  { period: "Juli 2026", baseSalary: 6500000, allowances: 1500000, overtime: 750000, deductions: 650000, netSalary: 8100000, status: "draft" as const },
  { period: "Juni 2026", baseSalary: 6500000, allowances: 1500000, overtime: 500000, deductions: 650000, netSalary: 7850000, status: "paid" as const },
  { period: "Mei 2026", baseSalary: 6500000, allowances: 1500000, overtime: 600000, deductions: 650000, netSalary: 7950000, status: "paid" as const },
];

export default function ESSPage() {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState("07:55");
  const [showClockModal, setShowClockModal] = useState(false);
  const [clockLocation, setClockLocation] = useState("Taman Tekno");
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveForm, setLeaveForm] = useState({ type: "annual", startDate: "", endDate: "", reason: "" });

  const statusCounts = {
    present: attendanceMonth.filter(a => a.status === "present").length,
    late: attendanceMonth.filter(a => a.status === "late").length,
    absent: attendanceMonth.filter(a => a.status === "absent").length,
    leave: attendanceMonth.filter(a => a.status === "leave").length,
  };

  const handleClock = () => {
    if (!clockedIn) {
      setClockTime(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }));
      setClockedIn(true);
    }
    setShowClockModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-2xl font-bold">
                {employee.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold">Halo, {employee.name.split(" ")[0]}! 👋</h1>
                <p className="text-gray-300">{employee.position} • {employee.department}</p>
                <p className="text-gray-400 text-sm">{employee.employeeId}</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${
                clockedIn ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"
              }`}>
                <div className={`h-2.5 w-2.5 rounded-full ${clockedIn ? "bg-green-400" : "bg-yellow-400"} animate-pulse`} />
                {clockedIn ? "Sudah Absen • " + clockTime : "Belum Absen"}
              </div>
              <div className="mt-2">
                <Button
                  size="sm"
                  className={clockedIn ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"}
                  onClick={() => {
                    if (!clockedIn) setShowClockModal(true);
                    else setClockedIn(false);
                  }}
                >
                  {clockedIn ? "Absen Pulang" : "Absen Masuk"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clock Modal */}
      {showClockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-sm mx-4">
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Konfirmasi Absensi</h3>
              <p className="mt-2 text-sm text-gray-600">
                Lokasi Anda terdeteksi di <strong>{clockLocation}</strong>
              </p>
              <p className="text-3xl font-bold text-gray-900 my-4">
                {new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false })}
              </p>
              <p className="text-sm text-gray-500">{new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowClockModal(false)}>Batal</Button>
                <Button className="flex-1" onClick={handleClock}>Konfirmasi Absen</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Link href="/ess/absensi">
            <Card hover>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Kehadiran</p>
                  <p className="text-xl font-bold text-gray-900">
                    {statusCounts.present}/{attendanceMonth.length}
                  </p>
                  <p className="text-xs text-gray-400">Bulan ini</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/ess/cuti">
            <Card hover>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <CalendarDays className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Sisa Cuti</p>
                  <p className="text-xl font-bold text-gray-900">{leaveBalance.annual.remaining} hari</p>
                  <p className="text-xs text-gray-400">Cuti tahunan</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/ess/payroll">
            <Card hover>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <DollarSign className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Gaji Terakhir</p>
                  <p className="text-xl font-bold text-gray-900">{formatCurrency(recentPayrolls[0].netSalary)}</p>
                  <p className="text-xs text-gray-400">Periode {recentPayrolls[0].period}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Card hover>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Dokumen</p>
                <p className="text-xl font-bold text-gray-900">5</p>
                <p className="text-xs text-gray-400">Terlampir</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Attendance Today */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-900">Absensi Bulan Juli 2026</h2>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-green-500" /> Hadir ({statusCounts.present})</span>
                    <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-yellow-500" /> Terlambat ({statusCounts.late})</span>
                    <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-red-500" /> Alpha ({statusCounts.absent})</span>
                    <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-blue-500" /> Cuti ({statusCounts.leave})</span>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {attendanceMonth.map((day, i) => (
                    <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${
                      day.status === "present" ? "bg-green-100 text-green-700" :
                      day.status === "late" ? "bg-yellow-100 text-yellow-700" :
                      day.status === "absent" ? "bg-red-100 text-red-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {day.date.split(" ")[0]}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Leave Request */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-900">Pengajuan Cuti / Izin</h2>
                  <Button size="sm" onClick={() => setShowLeaveForm(!showLeaveForm)}>
                    + Ajukan Cuti
                  </Button>
                </div>

                {showLeaveForm && (
                  <div className="mb-4 rounded-lg border-2 border-red-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Form Pengajuan Cuti</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Jenis</label>
                        <select value={leaveForm.type} onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none">
                          <option value="annual">Cuti Tahunan (sisa: {leaveBalance.annual.remaining} hari)</option>
                          <option value="sick">Cuti Sakit (sisa: {leaveBalance.sick.remaining} hari)</option>
                          <option value="personal">Cuti Pribadi (sisa: {leaveBalance.personal.remaining} hari)</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input label="Tanggal Mulai" type="date" value={leaveForm.startDate}
                          onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })} />
                        <Input label="Tanggal Selesai" type="date" value={leaveForm.endDate}
                          onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })} />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Alasan</label>
                        <textarea rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none"
                          placeholder="Alasan pengajuan cuti..." value={leaveForm.reason}
                          onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })} />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => {
                          alert("Pengajuan cuti berhasil dikirim! Menunggu approval atasan.");
                          setShowLeaveForm(false);
                          setLeaveForm({ type: "annual", startDate: "", endDate: "", reason: "" });
                        }}>
                          Kirim Pengajuan
                        </Button>
                        <Button variant="outline" onClick={() => setShowLeaveForm(false)}>Batal</Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Leave Balance */}
                <div className="grid gap-3 sm:grid-cols-3">
                  {Object.entries(leaveBalance).map(([key, val]) => (
                    <div key={key} className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500 capitalize">
                        {key === "annual" ? "Cuti Tahunan" : key === "sick" ? "Cuti Sakit" : "Cuti Pribadi"}
                      </p>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="text-xl font-bold text-gray-900">{val.remaining}</span>
                        <span className="text-xs text-gray-400">/ {val.total} hari</span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full rounded-full bg-gray-200">
                        <div className="h-1.5 rounded-full bg-red-500" style={{ width: `${(val.remaining / val.total) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Payroll Summary */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-900">Slip Gaji Terbaru</h2>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
                {recentPayrolls.slice(0, 2).map((pay) => (
                  <div key={pay.period} className={`flex items-center justify-between py-2 ${pay.period !== recentPayrolls[0].period ? "border-t" : ""}`}>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{pay.period}</p>
                      <p className="text-xs text-gray-500">
                        Pokok: {formatCurrency(pay.baseSalary)} • Lembur: {formatCurrency(pay.overtime)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{formatCurrency(pay.netSalary)}</p>
                      <Badge variant={pay.status === "paid" ? "success" : "warning"}>
                        {pay.status === "paid" ? "Dibayar" : "Draft"}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Link href="/ess/payroll">
                  <Button variant="ghost" size="sm" className="w-full mt-2">Lihat Semua Slip Gaji</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-5">
                <h2 className="font-bold text-gray-900 mb-4">Aksi Cepat</h2>
                <div className="space-y-2">
                  <Link href="/booking-servis">
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarDays className="h-4 w-4" /> Booking Servis
                    </Button>
                  </Link>
                  <Link href="/ess/profile">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="h-4 w-4" /> Lihat Profil
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start text-red-600">
                    <LogOut className="h-4 w-4" /> Logout
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardContent className="p-5">
                <h2 className="font-bold text-gray-900 mb-3">Dokumen Saya</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-red-500" />
                      <span>Kontrak Kerja</span>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-red-500" />
                      <span>NPWP</span>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-red-500" />
                      <span>BPJS Kesehatan</span>
                    </div>
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-red-500" />
                      <span>BPJS Ketenagakerjaan</span>
                    </div>
                    <XCircle className="h-4 w-4 text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
