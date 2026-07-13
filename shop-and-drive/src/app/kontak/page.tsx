"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Pesan Anda telah terkirim! Kami akan menghubungi Anda dalam 1x24 jam.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Kontak & Bantuan</h1>
          <p className="mt-2 text-gray-600">Hubungi kami melalui form atau kanal komunikasi di bawah ini</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Info Cards */}
          <div className="space-y-4 lg:col-span-1">
            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Alamat</p>
                  <p className="text-sm text-gray-600">Jl. Taman Tekno No. 88, BSD City, Tangerang Selatan 15314</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Telepon / WhatsApp</p>
                  <a href="tel:02112345678" className="text-sm text-red-600 hover:underline">(021) 1234 5678</a>
                  <br />
                  <a href="https://wa.me/621234567890" className="text-sm text-red-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    0812 3456 7890
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a href="mailto:info@shopandrive-tamantekno.com" className="text-sm text-red-600 hover:underline">
                    info@shopandrive-tamantekno.com
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Jam Operasional</p>
                  <p className="text-sm text-gray-600">Senin - Sabtu: 08.00 - 20.00</p>
                  <p className="text-sm text-gray-600">Minggu: 09.00 - 17.00</p>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp CTA */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Butuh bantuan cepat?</p>
                    <p className="text-sm text-green-700">Chat langsung via WhatsApp</p>
                  </div>
                </div>
                <a href="https://wa.me/621234567890" target="_blank" rel="noopener noreferrer">
                  <Button className="mt-3 w-full bg-green-600 hover:bg-green-700">
                    <MessageCircle className="h-4 w-4" />
                    Chat WhatsApp
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Kirim Pesan</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="Nama Lengkap"
                      placeholder="Masukkan nama Anda"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="email@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <Input
                      label="Nomor Telepon"
                      placeholder="08xxxxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <Input
                      label="Subjek"
                      placeholder="Subjek pesan"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Pesan</label>
                    <textarea
                      rows={5}
                      placeholder="Tulis pesan Anda..."
                      className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full md:w-auto">
                    <Send className="h-4 w-4" />
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Preview */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900">FAQ - Pertanyaan Umum</h3>
                <div className="mt-4 space-y-4">
                  {[
                    { q: "Apakah produk yang dijual original?", a: "Ya, kami menjamin semua produk yang kami jual adalah original dan bergaransi resmi." },
                    { q: "Berapa lama waktu pengiriman?", a: "Pengiriman Jabodetabek 1-2 hari kerja, luar kota 2-5 hari kerja tergantung ekspedisi." },
                    { q: "Apakah bisa retur jika barang tidak sesuai?", a: "Ya, retur dapat dilakukan dalam 7 hari dengan syarat barang belum dipakai dan dalam kondisi baik." },
                  ].map((faq, i) => (
                    <div key={i} className="rounded-lg bg-gray-50 p-4">
                      <p className="font-medium text-gray-900">{faq.q}</p>
                      <p className="mt-1 text-sm text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
