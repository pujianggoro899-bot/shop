"use client";

import { useState } from "react";
import { Briefcase, MapPin, Clock, Send, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const jobOpenings = [
  {
    id: "job-1",
    title: "Mekanik Mobil",
    department: "Operasional Bengkel",
    location: "Taman Tekno, BSD City",
    type: "Full Time",
    salary: "Rp 4.000.000 - Rp 6.000.000",
    postedDate: "1 Juli 2026",
    description: "Kami mencari mekanik mobil berpengalaman untuk bergabung dengan tim bengkel kami.",
    requirements: [
      "Minimal 2 tahun pengalaman sebagai mekanik mobil",
      "Menguasai perbaikan mesin, kelistrikan, dan AC mobil",
      "Memiliki sertifikasi keahlian otomotif (diutamakan)",
      "Jujur, teliti, dan bertanggung jawab",
      "Bersedia bekerja shift",
    ],
  },
  {
    id: "job-2",
    title: "Staff Marketing & Konten",
    department: "Penjualan & Marketing",
    location: "Taman Tekno, BSD City",
    type: "Full Time",
    salary: "Rp 4.500.000 - Rp 5.500.000",
    postedDate: "28 Juni 2026",
    description: "Mengelola konten digital, media sosial, dan kampanye pemasaran untuk meningkatkan brand awareness dan penjualan.",
    requirements: [
      "Diploma/Sarjana di bidang Marketing/Komunikasi",
      "Pengalaman minimal 1 tahun di bidang digital marketing",
      "Menguasai social media management dan content creation",
      "Kreatif dan memiliki kemampuan menulis yang baik",
      "Memahami dasar SEO dan Google Ads (nilai plus)",
    ],
  },
  {
    id: "job-3",
    title: "Customer Service",
    department: "Customer Service",
    location: "Taman Tekno, BSD City",
    type: "Full Time",
    salary: "Rp 3.800.000 - Rp 4.500.000",
    postedDate: "25 Juni 2026",
    description: "Melayani pelanggan via chat, telepon, dan langsung di toko. Memberikan informasi produk dan layanan dengan ramah dan profesional.",
    requirements: [
      "Minimal SMA/SMK sederajat",
      "Pengalaman di bidang customer service (diutamakan)",
      "Komunikatif dan ramah",
      "Menguasai Microsoft Office dan aplikasi chat",
      "Bersedia bekerja shift termasuk akhir pekan",
    ],
  },
  {
    id: "job-4",
    title: "Staff Gudang & Logistik",
    department: "Gudang & Logistik",
    location: "Taman Tekno, BSD City",
    type: "Full Time",
    salary: "Rp 3.500.000 - Rp 4.200.000",
    postedDate: "20 Juni 2026",
    description: "Mengelola stok barang, penerimaan dan pengiriman barang, serta memastikan kelancaran logistik toko.",
    requirements: [
      "Minimal SMA/SMK sederajat",
      "Pengalaman di gudang/logistik (diutamakan)",
      "Teliti dan mampu bekerja dengan sistem inventory",
      "Mampu mengoperasikan forklift (nilai plus)",
      "Sehat jasmani dan rohani",
    ],
  },
];

export default function CareersPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <Briefcase className="mx-auto h-12 w-12 mb-4" />
          <h1 className="text-3xl font-bold md:text-4xl">Karir di Shop & Drive</h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-300">
            Bergabunglah dengan tim kami dan jadilah bagian dari keluarga besar Shop & Drive Taman Tekno.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Job Openings */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Lowongan Tersedia</h2>
          <div className="space-y-4">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <div
                  className="cursor-pointer p-6"
                  onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Diposting {job.postedDate}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="success">{job.type}</Badge>
                      {expandedId === job.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </div>
                  {expandedId === job.id && (
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <p className="text-gray-700">{job.description}</p>
                      <div className="mt-4">
                        <p className="mb-2 font-semibold text-gray-900">Persyaratan:</p>
                        <ul className="space-y-1.5">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          Estimasi Gaji: <span className="font-semibold text-gray-900">{job.salary}</span>
                        </p>
                        <Button onClick={(e) => { e.stopPropagation(); setShowForm(true); }}>
                          <Send className="h-4 w-4" />
                          Lamar Sekarang
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Application Form */}
        {showForm && (
          <section className="mt-12">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Form Lamaran Kerja</h2>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input label="Nama Lengkap" placeholder="Masukkan nama lengkap" required />
                    <Input label="Email" type="email" placeholder="email@example.com" required />
                    <Input label="Nomor Telepon" placeholder="08xxxxxxxxxx" required />
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Posisi yang Dilamar</label>
                      <select className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500">
                        <option value="">Pilih posisi...</option>
                        {jobOpenings.map((job) => (
                          <option key={job.id} value={job.id}>{job.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Upload CV & Dokumen Pendukung</label>
                    <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                      <p className="text-sm text-gray-600">Seret file ke sini atau klik untuk upload</p>
                      <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max 5 MB)</p>
                    </div>
                  </div>
                  <Button type="submit" className="w-full">Kirim Lamaran</Button>
                </form>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Why Join Us */}
        <section className="mt-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Kenapa Bekerja di Shop & Drive?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: "💰", title: "Gaji Kompetitif", desc: "Gaji dan tunjangan di atas standar industri" },
              { icon: "📈", title: "Jenjang Karir", desc: "Kesempatan pengembangan dan promosi karir" },
              { icon: "🤝", title: "Lingkungan Kerja", desc: "Tim yang solid dan budaya kerja yang positif" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-white p-6 text-center shadow-sm">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
