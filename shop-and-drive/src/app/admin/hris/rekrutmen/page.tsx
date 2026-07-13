"use client";

import { useState } from "react";
import { Briefcase, MapPin, Clock, Users, Search, Calendar, Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock recruitment data
const jobPostings = [
  {
    id: "job-1", title: "Mekanik Mobil", department: "Operasional", location: "Taman Tekno",
    type: "Full Time", salary: "Rp 4-6 Jt", status: "active", postedDate: "1 Jul 2026",
    applicants: 12, interviewed: 4, hired: 0,
    candidates: [
      { id: "c-1", name: "Rudi Hartono", email: "rudi@email.com", phone: "0812345671", experience: "3 tahun", status: "screening" as const, appliedDate: "2 Jul 2026" },
      { id: "c-2", name: "Slamet Riyadi", email: "slamet@email.com", phone: "0812345672", experience: "5 tahun", status: "interview" as const, appliedDate: "3 Jul 2026" },
      { id: "c-3", name: "Adi Nugroho", email: "adi@email.com", phone: "0812345673", experience: "2 tahun", status: "offer" as const, appliedDate: "1 Jul 2026" },
    ],
  },
  {
    id: "job-2", title: "Staff Marketing", department: "Marketing", location: "Taman Tekno",
    type: "Full Time", salary: "Rp 4.5-5.5 Jt", status: "active", postedDate: "28 Jun 2026",
    applicants: 8, interviewed: 3, hired: 0,
    candidates: [
      { id: "c-4", name: "Dewi Sartika", email: "dewi@email.com", phone: "0812345674", experience: "2 tahun", status: "interview" as const, appliedDate: "29 Jun 2026" },
    ],
  },
  {
    id: "job-3", title: "Customer Service", department: "CS", location: "Taman Tekno",
    type: "Full Time", salary: "Rp 3.8-4.5 Jt", status: "active", postedDate: "25 Jun 2026",
    applicants: 15, interviewed: 6, hired: 1,
    candidates: [
      { id: "c-5", name: "Fitri Handayani", email: "fitri@email.com", phone: "0812345675", experience: "1 tahun", status: "hired" as const, appliedDate: "26 Jun 2026" },
    ],
  },
  {
    id: "job-4", title: "Staff Gudang", department: "Logistik", location: "Taman Tekno",
    type: "Full Time", salary: "Rp 3.5-4.2 Jt", status: "closed", postedDate: "20 Jun 2026",
    applicants: 20, interviewed: 8, hired: 1,
    candidates: [],
  },
];

type CandidateStatus = "screening" | "interview" | "offer" | "hired" | "rejected";

const statusConfig: Record<CandidateStatus, { label: string; color: "default" | "info" | "warning" | "success" | "danger" }> = {
  screening: { label: "Screening", color: "default" },
  interview: { label: "Interview", color: "info" },
  offer: { label: "Offer", color: "warning" },
  hired: { label: "Hired", color: "success" },
  rejected: { label: "Ditolak", color: "danger" },
};

export default function RecruitmentPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);

  const totalApplicants = jobPostings.reduce((sum, j) => sum + j.applicants, 0);
  const totalInterviewed = jobPostings.reduce((sum, j) => sum + j.interviewed, 0);
  const totalHired = jobPostings.reduce((sum, j) => sum + j.hired, 0);

  const filteredJobs = jobPostings.filter((job) => {
    if (statusFilter !== "all" && job.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return job.title.toLowerCase().includes(q) || job.department.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Rekrutmen</h1>
          <p className="text-gray-600">Kelola lowongan kerja dan kandidat</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Briefcase className="h-4 w-4" /> + Lowongan Baru
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{jobPostings.filter(j => j.status === "active").length}</p>
            <p className="text-sm text-gray-600">Lowongan Aktif</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{totalApplicants}</p>
            <p className="text-sm text-gray-600">Total Pelamar</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{totalInterviewed}</p>
            <p className="text-sm text-gray-600">Diinterview</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{totalHired}</p>
            <p className="text-sm text-gray-600">Berhasil Direkrut</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Cari lowongan..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none"
        >
          <option value="all">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="closed">Ditutup</option>
        </select>
      </div>

      {/* Job Postings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="overflow-hidden">
            <div
              className="cursor-pointer p-5"
              onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                    <Badge variant={job.status === "active" ? "success" : "default"}>
                      {job.status === "active" ? "Aktif" : "Ditutup"}
                    </Badge>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {job.department}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {job.postedDate}</span>
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {job.applicants} pelamar</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Badge variant="info">{job.type}</Badge>
                  {expandedJob === job.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </div>
            </div>

            {expandedJob === job.id && (
              <div className="border-t border-gray-100">
                {/* Pipeline Summary */}
                <div className="grid grid-cols-3 gap-0 border-b">
                  {[
                    { label: "Screening", count: job.candidates.filter(c => c.status === "screening").length, color: "bg-gray-200" },
                    { label: "Interview", count: job.candidates.filter(c => c.status === "interview").length, color: "bg-blue-200" },
                    { label: "Offer", count: job.candidates.filter(c => c.status === "offer" || c.status === "hired").length, color: "bg-green-200" },
                  ].map((stage) => (
                    <div key={stage.label} className="p-4 text-center border-r last:border-0">
                      <p className={`text-2xl font-bold ${stage.label === "Screening" ? "text-gray-700" : stage.label === "Interview" ? "text-blue-700" : "text-green-700"}`}>
                        {stage.count}
                      </p>
                      <p className="text-sm text-gray-600">{stage.label}</p>
                    </div>
                  ))}
                </div>

                {/* Candidate Table */}
                <div className="p-5">
                  <h4 className="mb-3 font-semibold text-gray-900">Daftar Kandidat ({job.candidates.length})</h4>
                  {job.candidates.length === 0 ? (
                    <p className="py-8 text-center text-sm text-gray-500">Belum ada kandidat untuk posisi ini.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b text-left text-xs font-medium text-gray-500">
                            <th className="pb-2 pr-4">Kandidat</th>
                            <th className="pb-2 pr-4">Kontak</th>
                            <th className="pb-2 pr-4">Pengalaman</th>
                            <th className="pb-2 pr-4">Tanggal Lamar</th>
                            <th className="pb-2 pr-4">Status</th>
                            <th className="pb-2">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {job.candidates.map((candidate) => {
                            const config = statusConfig[candidate.status];
                            return (
                              <tr key={candidate.id} className="border-b last:border-0">
                                <td className="py-3 pr-4">
                                  <div className="flex items-center gap-2">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-600">
                                      {candidate.name.charAt(0)}
                                    </div>
                                    <span className="font-medium text-gray-900">{candidate.name}</span>
                                  </div>
                                </td>
                                <td className="py-3 pr-4 text-gray-600 text-xs">{candidate.email}</td>
                                <td className="py-3 pr-4 text-gray-700">{candidate.experience}</td>
                                <td className="py-3 pr-4 text-gray-600">{candidate.appliedDate}</td>
                                <td className="py-3 pr-4">
                                  <Badge variant={config.color}>{config.label}</Badge>
                                </td>
                                <td className="py-3">
                                  <div className="flex gap-1">
                                    <Button size="sm" variant="ghost" className="text-green-600">
                                      <Check className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="ghost" className="text-red-600">
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
