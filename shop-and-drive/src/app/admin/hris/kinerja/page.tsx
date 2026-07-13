"use client";

import { useState } from "react";
import { Target, TrendingUp, TrendingDown, Search, Star, Download, ChevronDown, Calendar, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock performance data
interface KPI {
  id: string;
  category: string;
  target: string;
  weight: number; // percentage
  score: number; // 1-5
  notes: string;
}

interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  position: string;
  department: string;
  period: string;
  status: "draft" | "submitted" | "approved";
  overallScore: number;
  reviewer: string;
  reviewedAt: string | null;
  kpis: KPI[];
}

const performanceData: PerformanceReview[] = [
  {
    id: "pr-1", employeeId: "SD-005", employeeName: "Eka Wijaya", position: "Kepala Mekanik", department: "Bengkel",
    period: "Q2 2026", status: "approved", overallScore: 4.5, reviewer: "Andi Pratama", reviewedAt: "2026-06-30",
    kpis: [
      { id: "kpi-1", category: "Kualitas Servis", target: "≥ 4.5 rating", weight: 30, score: 4.8, notes: "Rating pelanggan sangat baik" },
      { id: "kpi-2", category: "Jumlah Servis", target: "≥ 100 servis/bulan", weight: 25, score: 4.5, notes: "Rata-rata 110 servis/bulan" },
      { id: "kpi-3", category: "Ketepatan Waktu", target: "≥ 95% on-time", weight: 20, score: 4.0, notes: "92% on-time, perlu improvement" },
      { id: "kpi-4", category: "Retensi Pelanggan", target: "≥ 80%", weight: 15, score: 4.5, notes: "85% repeated customer" },
      { id: "kpi-5", category: "Team Management", target: "≥ 4.0", weight: 10, score: 4.5, notes: "Tim solid" },
    ],
  },
  {
    id: "pr-2", employeeId: "SD-003", employeeName: "Citra Dewi", position: "Supervisor Marketing", department: "Marketing",
    period: "Q2 2026", status: "approved", overallScore: 4.2, reviewer: "Andi Pratama", reviewedAt: "2026-06-28",
    kpis: [
      { id: "kpi-6", category: "Revenue Marketing", target: "Rp 500 Jt", weight: 35, score: 4.0, notes: "Rp 480 Jt tercapai" },
      { id: "kpi-7", category: "Lead Generation", target: "≥ 200 leads/bulan", weight: 25, score: 4.5, notes: "Rata-rata 250 leads" },
      { id: "kpi-8", category: "Conversion Rate", target: "≥ 3%", weight: 20, score: 4.0, notes: "2.8% - mendekati target" },
      { id: "kpi-9", category: "Content Production", target: "12 konten/bulan", weight: 20, score: 4.5, notes: "15 konten/bulan" },
    ],
  },
  {
    id: "pr-3", employeeId: "SD-011", employeeName: "Kartika Sari", position: "Staff HR", department: "HR & Keuangan",
    period: "Q2 2026", status: "submitted", overallScore: 3.8, reviewer: "Andi Pratama", reviewedAt: null,
    kpis: [
      { id: "kpi-10", category: "Rekrutmen", target: "2 hires/kuartal", weight: 30, score: 4.0, notes: "Berhasil merekrut 3" },
      { id: "kpi-11", category: "Payroll Accuracy", target: "100%", weight: 25, score: 4.5, notes: "Tidak ada error payroll" },
      { id: "kpi-12", category: "Employee Satisfaction", target: "≥ 4.0", weight: 25, score: 3.5, notes: "Skor 3.8 - perlu improvement" },
      { id: "kpi-13", category: "Compliance", target: "100%", weight: 20, score: 3.0, notes: "Ada dokumen yang belum lengkap" },
    ],
  },
  {
    id: "pr-4", employeeId: "SD-006", employeeName: "Fajar Ramdhan", position: "Mekanik Senior", department: "Bengkel",
    period: "Q2 2026", status: "draft", overallScore: 0, reviewer: "", reviewedAt: null,
    kpis: [
      { id: "kpi-14", category: "Kualitas Servis", target: "≥ 4.5 rating", weight: 40, score: 0, notes: "" },
      { id: "kpi-15", category: "Jumlah Servis", target: "≥ 80 servis/bulan", weight: 30, score: 0, notes: "" },
      { id: "kpi-16", category: "Absensi", target: "100%", weight: 30, score: 0, notes: "" },
    ],
  },
];

export default function PerformancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Q2 2026");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReview, setSelectedReview] = useState<string | null>(null);

  const filtered = performanceData.filter((pr) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return pr.employeeName.toLowerCase().includes(q) || pr.department.toLowerCase().includes(q);
    }
    return true;
  });

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "text-green-600";
    if (score >= 4.0) return "text-blue-600";
    if (score >= 3.0) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 4.5) return "bg-green-100";
    if (score >= 4.0) return "bg-blue-100";
    if (score >= 3.0) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Penilaian Kinerja</h1>
          <p className="text-gray-600">Performance review periode {selectedPeriod}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button>
            <Target className="h-4 w-4" /> + Review Baru
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Karyawan Dinilai</p>
            <p className="text-2xl font-bold text-gray-900">{performanceData.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Selesai & Approved</p>
            <p className="text-2xl font-bold text-green-600">{performanceData.filter(p => p.status === "approved").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Menunggu Approval</p>
            <p className="text-2xl font-bold text-yellow-600">{performanceData.filter(p => p.status === "submitted").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Rata-rata Skor</p>
            <p className="text-2xl font-bold text-blue-600">
              {(performanceData.filter(p => p.overallScore > 0).reduce((sum, p) => sum + p.overallScore, 0) /
                Math.max(1, performanceData.filter(p => p.overallScore > 0).length)).toFixed(1)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Cari karyawan..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none">
          <option>Q2 2026</option>
          <option>Q1 2026</option>
          <option>Q4 2025</option>
        </select>
      </div>

      {/* Performance Cards */}
      <div className="space-y-4">
        {filtered.map((review) => (
          <Card key={review.id}>
            <div
              className="cursor-pointer p-5"
              onClick={() => setSelectedReview(selectedReview === review.id ? null : review.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-red-200 text-lg font-bold text-red-600">
                    {review.employeeName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{review.employeeName}</h3>
                    <p className="text-sm text-gray-600">{review.position} • {review.department}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" /> {review.period}
                      <Badge variant={review.status === "approved" ? "success" : review.status === "submitted" ? "warning" : "default"}>
                        {review.status === "approved" ? "Approved" : review.status === "submitted" ? "Submitted" : "Draft"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {review.overallScore > 0 ? (
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full ${getScoreBg(review.overallScore)}`}>
                      <span className={`text-xl font-bold ${getScoreColor(review.overallScore)}`}>{review.overallScore}</span>
                    </div>
                  ) : (
                    <Badge variant="warning">Belum Dinilai</Badge>
                  )}
                </div>
              </div>

              {selectedReview === review.id && (
                <div className="mt-5 border-t pt-5">
                  {/* KPI Table */}
                  <div className="space-y-3">
                    {review.kpis.map((kpi) => (
                      <div key={kpi.id} className="rounded-lg bg-gray-50 p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-900">{kpi.category}</p>
                              <span className="text-xs text-gray-400">Bobot: {kpi.weight}%</span>
                            </div>
                            <p className="text-sm text-gray-600">Target: {kpi.target}</p>
                            {kpi.notes && <p className="text-sm text-gray-500 mt-1">{kpi.notes}</p>}
                          </div>
                          <div className="ml-4 text-center">
                            {kpi.score > 0 ? (
                              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${getScoreBg(kpi.score)}`}>
                                <span className={`text-sm font-bold ${getScoreColor(kpi.score)}`}>{kpi.score}</span>
                              </div>
                            ) : (
                              <span className="text-xs text-gray-400">-</span>
                            )}
                          </div>
                        </div>
                        {/* Score bar */}
                        <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
                          <div
                            className={`h-1.5 rounded-full ${kpi.score >= 4.5 ? "bg-green-500" : kpi.score >= 4.0 ? "bg-blue-500" : kpi.score >= 3.0 ? "bg-yellow-500" : "bg-red-500"}`}
                            style={{ width: `${kpi.score > 0 ? (kpi.score / 5) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {review.reviewer && <span>Direview oleh: <strong>{review.reviewer}</strong></span>}
                      {review.reviewedAt && <span className="ml-2">• {review.reviewedAt}</span>}
                    </div>
                    <div className="flex gap-2">
                      {review.status === "draft" && <Button size="sm">Mulai Penilaian</Button>}
                      {review.status === "submitted" && (
                        <>
                          <Button size="sm" variant="outline" className="text-green-600">
                            <Check className="h-4 w-4" /> Approve
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">Revisi</Button>
                        </>
                      )}
                      {review.status === "approved" && (
                        <Button size="sm" variant="outline">Lihat Detail</Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
