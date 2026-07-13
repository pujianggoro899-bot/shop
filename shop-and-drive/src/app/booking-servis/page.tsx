"use client";

import { useState } from "react";
import { CalendarDays, Clock, Car, Wrench, DollarSign, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { serviceTypes } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

const timeSlots = [
  "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
  "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00",
];

export default function BookingServisPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [vehicleData, setVehicleData] = useState({
    brand: "",
    model: "",
    year: "",
    licensePlate: "",
    kilometer: "",
  });
  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const selectedServiceData = serviceTypes.find((s) => s.id === selectedService);
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Booking servis berhasil dikirim! Kami akan mengkonfirmasi dalam 1x24 jam melalui WhatsApp.");
    setStep(1);
    setSelectedService(null);
    setSelectedDate("");
    setSelectedTime("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <Wrench className="mx-auto h-10 w-10 mb-4" />
          <h1 className="text-3xl font-bold md:text-4xl">Booking Servis</h1>
          <p className="mx-auto mt-2 max-w-xl text-red-100">
            Booking servis online, datang langsung tanpa antri. Pilih jadwal yang sesuai untuk Anda.
          </p>
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: "Pilih Layanan" },
              { num: 2, label: "Pilih Jadwal" },
              { num: 3, label: "Data Kendaraan" },
              { num: 4, label: "Konfirmasi" },
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    step > s.num
                      ? "bg-green-500 text-white"
                      : step === s.num
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > s.num ? <Check className="h-4 w-4" /> : s.num}
                </div>
                <span className="mt-1 hidden text-xs text-gray-600 md:block">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Step 1: Choose Service */}
        {step === 1 && (
          <div>
            <h2 className="mb-6 text-xl font-bold text-gray-900">Pilih Layanan Servis</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {serviceTypes.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`rounded-xl border-2 p-4 text-left transition-all ${
                    selectedService === service.id
                      ? "border-red-600 bg-red-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="mt-1 text-sm text-gray-600">{service.description}</p>
                    </div>
                    {selectedService === service.id && (
                      <Check className="h-5 w-5 flex-shrink-0 text-red-600" />
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="font-bold text-red-600">{formatCurrency(service.estimatedPrice)}</span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <Clock className="h-3.5 w-3.5" />
                      {service.estimatedDuration}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 text-right">
              <Button disabled={!selectedService} onClick={() => setStep(2)}>
                Selanjutnya
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Choose Schedule */}
        {step === 2 && (
          <div>
            <h2 className="mb-6 text-xl font-bold text-gray-900">Pilih Jadwal</h2>
            <div className="mb-6">
              <Input
                label="Pilih Tanggal"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={today}
              />
            </div>
            {selectedDate && (
              <div>
                <p className="mb-3 text-sm font-medium text-gray-700">Pilih Jam Booking</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`rounded-lg border-2 px-4 py-3 text-center text-sm font-medium transition-all ${
                        selectedTime === slot
                          ? "border-red-600 bg-red-50 text-red-600"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {slot.split(" - ")[0]}
                      <span className="block text-xs text-gray-400">{slot.split(" - ")[1]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>Kembali</Button>
              <Button disabled={!selectedDate || !selectedTime} onClick={() => setStep(3)}>
                Selanjutnya
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Vehicle & Customer Data */}
        {step === 3 && (
          <div>
            <h2 className="mb-6 text-xl font-bold text-gray-900">Data Kendaraan & Pemesan</h2>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Data Kendaraan</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Merek Kendaraan" placeholder="Contoh: Honda, Toyota" value={vehicleData.brand}
                  onChange={(e) => setVehicleData({ ...vehicleData, brand: e.target.value })} />
                <Input label="Model" placeholder="Contoh: Brio, Avanza" value={vehicleData.model}
                  onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })} />
                <Input label="Tahun" type="number" placeholder="2020" value={vehicleData.year}
                  onChange={(e) => setVehicleData({ ...vehicleData, year: e.target.value })} />
                <Input label="Nomor Polisi" placeholder="B 1234 XYZ" value={vehicleData.licensePlate}
                  onChange={(e) => setVehicleData({ ...vehicleData, licensePlate: e.target.value })} />
                <Input label="Kilometer Terakhir" type="number" placeholder="50000" value={vehicleData.kilometer}
                  onChange={(e) => setVehicleData({ ...vehicleData, kilometer: e.target.value })} />
              </div>

              <h3 className="mt-6 font-semibold text-gray-800">Data Pemesan</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Nama Lengkap" placeholder="Nama Anda" value={customerData.name}
                  onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })} />
                <Input label="Nomor WhatsApp" placeholder="08xxxxxxxxxx" value={customerData.phone}
                  onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })} />
                <Input label="Email (opsional)" type="email" placeholder="email@example.com" value={customerData.email}
                  onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Catatan Tambahan</label>
                <textarea
                  rows={3}
                  placeholder="Misal: keluhan khusus, request mekanik tertentu, dll."
                  className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={customerData.notes}
                  onChange={(e) => setCustomerData({ ...customerData, notes: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>Kembali</Button>
              <Button disabled={!vehicleData.brand || !vehicleData.model || !customerData.name || !customerData.phone}
                onClick={() => setStep(4)}>
                Selanjutnya
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && selectedServiceData && (
          <div>
            <h2 className="mb-6 text-xl font-bold text-gray-900">Konfirmasi Booking</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b">
                  <Wrench className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{selectedServiceData.name}</p>
                    <p className="text-sm text-gray-600">{selectedServiceData.estimatedDuration}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="font-bold text-lg text-red-600">{formatCurrency(selectedServiceData.estimatedPrice)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pb-4 border-b">
                  <CalendarDays className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900">Jadwal</p>
                    <p className="text-sm text-gray-600">{selectedDate} | {selectedTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pb-4 border-b">
                  <Car className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900">Kendaraan</p>
                    <p className="text-sm text-gray-600">
                      {vehicleData.brand} {vehicleData.model} ({vehicleData.year})
                    </p>
                    <p className="text-sm text-gray-500">Nopol: {vehicleData.licensePlate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-sm font-bold">
                    {customerData.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{customerData.name}</p>
                    <p className="text-sm text-gray-600">{customerData.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="mt-6 rounded-xl bg-yellow-50 border border-yellow-200 p-4">
              <p className="text-sm text-yellow-800">
                Dengan melakukan booking, Anda menyetujui syarat & ketentuan yang berlaku. 
                Pembatalan dapat dilakukan maksimal H-1 sebelum jadwal.
              </p>
            </div>
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setStep(3)}>Kembali</Button>
              <Button onClick={handleSubmit}>
                <Check className="h-4 w-4" />
                Konfirmasi Booking
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
