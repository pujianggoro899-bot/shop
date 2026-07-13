"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Wrench, Calendar, Bell, Clock, Plus, Trash2, Check, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";

interface VehicleReminder {
  id: string;
  vehicleName: string;
  licensePlate: string;
  lastServiceKm: number;
  lastServiceDate: string;
  reminderType: "kilometer" | "monthly";
  intervalKm?: number;
  intervalMonth?: number;
  nextServiceKm?: number;
  nextServiceDate?: string;
  isDue: boolean;
  isOverdue: boolean;
}

const initialReminders: VehicleReminder[] = [
  {
    id: "sr-1", vehicleName: "Honda Brio Satya", licensePlate: "B 1234 ABC",
    lastServiceKm: 45000, lastServiceDate: "2026-04-15",
    reminderType: "kilometer", intervalKm: 5000, nextServiceKm: 50000,
    isDue: true, isOverdue: false,
  },
  {
    id: "sr-2", vehicleName: "Toyota Avanza", licensePlate: "B 5678 DEF",
    lastServiceKm: 82000, lastServiceDate: "2026-02-20",
    reminderType: "monthly", intervalMonth: 3, nextServiceDate: "2026-05-20",
    isDue: false, isOverdue: true,
  },
  {
    id: "sr-3", vehicleName: "Mitsubishi Xpander", licensePlate: "B 9012 GHI",
    lastServiceKm: 12500, lastServiceDate: "2026-06-01",
    reminderType: "kilometer", intervalKm: 10000, nextServiceKm: 20000,
    isDue: false, isOverdue: false,
  },
];

export default function ServiceReminderPage() {
  const [reminders, setReminders] = useState<VehicleReminder[]>(initialReminders);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    vehicleName: "", licensePlate: "", lastServiceKm: "", lastServiceDate: "",
    reminderType: "kilometer" as "kilometer" | "monthly", intervalKm: "5000", intervalMonth: "3",
  });

  const addReminder = () => {
    const reminder: VehicleReminder = {
      id: `sr-${Date.now()}`,
      vehicleName: newReminder.vehicleName,
      licensePlate: newReminder.licensePlate,
      lastServiceKm: parseInt(newReminder.lastServiceKm) || 0,
      lastServiceDate: newReminder.lastServiceDate,
      reminderType: newReminder.reminderType,
      intervalKm: newReminder.reminderType === "kilometer" ? parseInt(newReminder.intervalKm) : undefined,
      intervalMonth: newReminder.reminderType === "monthly" ? parseInt(newReminder.intervalMonth) : undefined,
      nextServiceKm: newReminder.reminderType === "kilometer" ? (parseInt(newReminder.lastServiceKm) || 0) + (parseInt(newReminder.intervalKm) || 5000) : undefined,
      nextServiceDate: newReminder.reminderType === "monthly" ? (() => {
        if (!newReminder.lastServiceDate) return undefined;
        const d = new Date(newReminder.lastServiceDate);
        d.setMonth(d.getMonth() + (parseInt(newReminder.intervalMonth) || 3));
        return d.toISOString().split("T")[0];
      })() : undefined,
      isDue: false,
      isOverdue: false,
    };
    setReminders([...reminders, reminder]);
    setShowAddForm(false);
    setNewReminder({ vehicleName: "", licensePlate: "", lastServiceKm: "", lastServiceDate: "", reminderType: "kilometer", intervalKm: "5000", intervalMonth: "3" });
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* Breadcrumb */}
        <Link href="/akun" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 mb-4">
          <ChevronRight className="h-4 w-4 rotate-180" /> Kembali ke Akun
        </Link>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pengingat Servis</h1>
            <p className="text-gray-600">Jangan lewatkan jadwal servis kendaraan Anda</p>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4" /> Tambah Kendaraan
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Bell className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{reminders.filter(r => r.isDue).length}</p>
              <p className="text-sm text-gray-600">Segera Servis</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">{reminders.filter(r => r.isOverdue).length}</p>
              <p className="text-sm text-gray-600">Terlewat</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Wrench className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{reminders.length}</p>
              <p className="text-sm text-gray-600">Total Kendaraan</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <Card className="mb-6 border-2 border-red-200">
            <CardContent className="p-5">
              <h3 className="font-bold text-gray-900 mb-4">Tambah Kendaraan untuk Pengingat Servis</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Nama Kendaraan" placeholder="Merek & Model" value={newReminder.vehicleName}
                  onChange={(e) => setNewReminder({ ...newReminder, vehicleName: e.target.value })} />
                <Input label="Nomor Polisi" placeholder="B 1234 XYZ" value={newReminder.licensePlate}
                  onChange={(e) => setNewReminder({ ...newReminder, licensePlate: e.target.value })} />
                <Input label="KM Terakhir Servis" type="number" placeholder="45000" value={newReminder.lastServiceKm}
                  onChange={(e) => setNewReminder({ ...newReminder, lastServiceKm: e.target.value })} />
                <Input label="Tanggal Servis Terakhir" type="date" value={newReminder.lastServiceDate}
                  onChange={(e) => setNewReminder({ ...newReminder, lastServiceDate: e.target.value })} />
              </div>
              <div className="mt-4 flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="reminderType" checked={newReminder.reminderType === "kilometer"}
                    onChange={() => setNewReminder({ ...newReminder, reminderType: "kilometer" })}
                    className="accent-red-600" />
                  Berdasarkan KM ({newReminder.intervalKm} km)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="reminderType" checked={newReminder.reminderType === "monthly"}
                    onChange={() => setNewReminder({ ...newReminder, reminderType: "monthly" })}
                    className="accent-red-600" />
                  Berdasarkan Bulan ({newReminder.intervalMonth} bulan)
                </label>
              </div>
              <div className="mt-4 flex gap-2">
                <Button onClick={addReminder} disabled={!newReminder.vehicleName || !newReminder.lastServiceDate}>
                  <Check className="h-4 w-4" /> Simpan
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Batal</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reminder List */}
        <div className="space-y-4">
          {reminders.length === 0 ? (
            <div className="py-16 text-center">
              <Bell className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900">Belum Ada Kendaraan</h3>
              <p className="text-gray-600 mt-1">Tambahkan kendaraan untuk mulai menerima pengingat servis</p>
            </div>
          ) : (
            reminders.map((reminder) => (
              <Card key={reminder.id} className={`overflow-hidden ${reminder.isOverdue ? "border-red-300" : reminder.isDue ? "border-yellow-300" : ""}`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        reminder.isOverdue ? "bg-red-100 text-red-600" : 
                        reminder.isDue ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"
                      }`}>
                        {reminder.isDue || reminder.isOverdue ? <AlertTriangle className="h-5 w-5" /> : <Check className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{reminder.vehicleName}</h3>
                        <p className="text-sm text-gray-500">{reminder.licensePlate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {reminder.isOverdue && <Badge variant="danger">Terlewat</Badge>}
                      {reminder.isDue && !reminder.isOverdue && <Badge variant="warning">Segera</Badge>}
                      {!reminder.isDue && !reminder.isOverdue && <Badge variant="success">Aman</Badge>}
                      <button onClick={() => deleteReminder(reminder.id)} className="p-1.5 text-gray-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">Servis Terakhir</p>
                      <p className="text-sm font-medium text-gray-900">
                        {reminder.lastServiceKm.toLocaleString()} km • {formatDate(reminder.lastServiceDate)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">Servis Berikutnya</p>
                      <p className="text-sm font-medium text-gray-900">
                        {reminder.nextServiceKm ? `${reminder.nextServiceKm.toLocaleString()} km` : ""}
                        {reminder.nextServiceDate ? formatDate(reminder.nextServiceDate) : ""}
                      </p>
                    </div>
                  </div>

                  {reminder.isDue || reminder.isOverdue ? (
                    <div className="mt-4">
                      <Link href="/booking-servis">
                        <Button size="sm" className="w-full">
                          <Calendar className="h-4 w-4" /> Booking Servis Sekarang
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="mt-4 text-xs text-gray-400">
                      Servis berikutnya dalam {reminder.reminderType === "kilometer" 
                        ? `${((reminder.nextServiceKm || 0) - reminder.lastServiceKm).toLocaleString()} km lagi`
                        : reminder.nextServiceDate ? `${Math.ceil((new Date(reminder.nextServiceDate).getTime() - Date.now()) / (1000*60*60*24))} hari lagi` : ""}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* CTA */}
        <Card className="mt-8 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">Punya kendaraan lain?</h3>
              <p className="text-red-100 text-sm mt-1">Tambahkan semua kendaraan Anda untuk pengingat servis otomatis</p>
            </div>
            <Button className="bg-white text-red-600 hover:bg-red-50 flex-shrink-0" onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4" /> Tambah
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
