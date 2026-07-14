"use client";

import { useState } from "react";
import { useApprovals, type ApprovalType, type ApprovalRequest } from "@/store/approval-workflow";
import { useNotifications } from "@/store/notifications";
import {
  CheckCircle, XCircle, AlertTriangle, Clock, User, DollarSign, Calendar,
  CalendarDays, FileText, Search, ChevronDown, MessageSquare, Check, X, Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";

const typeConfig: Record<ApprovalType, { label: string; icon: string; color: string }> = {
  leave: { label: "Cuti & Izin", icon: "🏖️", color: "border-l-blue-500" },
  reimbursement: { label: "Reimbursement", icon: "💰", color: "border-l-green-500" },
  overtime: { label: "Lembur", icon: "⏰", color: "border-l-orange-500" },
  payroll: { label: "Payroll", icon: "💳", color: "border-l-purple-500" },
  recruitment: { label: "Rekrutmen", icon: "👥", color: "border-l-teal-500" },
  purchase: { label: "Pembelian", icon: "🛒", color: "border-l-red-500" },
};

const priorityColors = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

export default function ApprovalWorkflowPage() {
  const { requests, pendingCount, getStats, approveRequest, rejectRequest } = useApprovals();
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState<"pending" | "history">("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [rejectModal, setRejectModal] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [approveNotes, setApproveNotes] = useState("");

  const stats = getStats();

  const filteredRequests = requests.filter((r) => {
    if (activeTab === "pending" && r.status !== "pending") return false;
    if (activeTab === "history" && r.status === "pending") return false;
    if (typeFilter !== "all" && r.type !== typeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return r.title.toLowerCase().includes(q) || r.requesterName.toLowerCase().includes(q);
    }
    return true;
  });

  const handleApprove = (req: ApprovalRequest) => {
    approveRequest(req.id, "Andi Pratama (Manager)", approveNotes);
    addNotification({
      title: "Persetujuan Diberikan",
      message: `${req.title} telah disetujui.`,
      type: "hr",
      link: "/admin/hris/persetujuan",
      actionLabel: "Lihat Detail",
    });
    setSelectedRequest(null);
    setApproveNotes("");
  };

  const handleReject = () => {
    if (!rejectModal || !rejectReason) return;
    rejectRequest(rejectModal, "Andi Pratama (Manager)", rejectReason);
    addNotification({
      title: "Pengajuan Ditolak",
      message: `${requests.find(r => r.id === rejectModal)?.title} ditolak. Alasan: ${rejectReason}`,
      type: "hr",
      link: "/admin/hris/persetujuan",
      actionLabel: "Lihat Detail",
    });
    setRejectModal(null);
    setRejectReason("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Approval Workflow</h1>
        <p className="text-gray-600">Kelola dan review semua pengajuan yang memerlukan persetujuan Anda</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-700">{stats.pending}</p>
            <p className="text-sm text-blue-600">Menunggu</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-700">{stats.approved}</p>
            <p className="text-sm text-green-600">Disetujui</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-700">{stats.rejected}</p>
            <p className="text-sm text-red-600">Ditolak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-500">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{stats.avgApprovalTime}</p>
            <p className="text-sm text-gray-500">Rata-rata Approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button onClick={() => setActiveTab("pending")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "pending" ? "border-red-600 text-red-600" : "border-transparent text-gray-500"
          }`}>
          <Clock className="h-4 w-4" />
          Menunggu Persetujuan
          {pendingCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">{pendingCount}</span>
          )}
        </button>
        <button onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "history" ? "border-red-600 text-red-600" : "border-transparent text-gray-500"
          }`}>
          <FileText className="h-4 w-4" />
          Riwayat
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Cari pengajuan..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none">
          <option value="all">Semua Tipe</option>
          <option value="leave">Cuti & Izin</option>
          <option value="overtime">Lembur</option>
          <option value="reimbursement">Reimbursement</option>
          <option value="payroll">Payroll</option>
          <option value="recruitment">Rekrutmen</option>
          <option value="purchase">Pembelian</option>
        </select>
      </div>

      {/* Approval List */}
      <div className="space-y-3">
        {filteredRequests.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-400 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900">
                {activeTab === "pending" ? "Semua sudah diproses!" : "Belum ada riwayat"}
              </h3>
              <p className="text-gray-500 mt-1">
                {activeTab === "pending" ? "Tidak ada pengajuan yang menunggu persetujuan." : "Riwayat approval akan muncul di sini."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((req) => {
            const config = typeConfig[req.type];
            const isSelected = selectedRequest === req.id;

            return (
              <Card key={req.id} className={`overflow-hidden border-l-4 ${config.color}`}>
                <div
                  className="cursor-pointer p-5"
                  onClick={() => setSelectedRequest(isSelected ? null : req.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="text-2xl mt-0.5">{config.icon}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{req.title}</h3>
                          <Badge variant={req.priority === "high" ? "danger" : req.priority === "medium" ? "warning" : "default"}>
                            {req.priority === "high" ? "Urgent" : req.priority === "medium" ? "Sedang" : "Normal"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-0.5 line-clamp-1">{req.description}</p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><User className="h-3 w-3" /> {req.requesterName}</span>
                          <span>{req.requesterDepartment}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(req.createdAt).toLocaleString("id-ID")}</span>
                          {req.amount && <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> {formatCurrency(req.amount)}</span>}
                          {req.duration && <span><CalendarDays className="h-3 w-3 inline" /> {req.duration} hari</span>}
                        </div>
                      </div>
                    </div>
                    <Badge variant={req.status === "pending" ? "warning" : req.status === "approved" ? "success" : "danger"}>
                      {req.status === "pending" ? "Pending" : req.status === "approved" ? "Disetujui" : "Ditolak"}
                    </Badge>
                  </div>

                  {req.status === "rejected" && req.rejectionReason && (
                    <div className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                      <XCircle className="h-4 w-4 inline mr-1" />
                      Alasan penolakan: {req.rejectionReason}
                    </div>
                  )}

                  {req.status === "approved" && req.reviewerNotes && (
                    <div className="mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                      <CheckCircle className="h-4 w-4 inline mr-1" />
                      Catatan: {req.reviewerNotes}
                    </div>
                  )}
                </div>

                {/* Approval Actions */}
                {isSelected && req.status === "pending" && (
                  <div className="border-t bg-gray-50 px-5 py-4">
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Catatan (opsional)</label>
                      <textarea
                        rows={2}
                        placeholder="Tambahkan catatan persetujuan..."
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none"
                        value={approveNotes}
                        onChange={(e) => setApproveNotes(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleApprove(req)} className="flex-1">
                        <Check className="h-4 w-4" /> Setujui
                      </Button>
                      <Button variant="outline" className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                        onClick={() => { setRejectModal(req.id); setRejectReason(""); }}>
                        <X className="h-4 w-4" /> Tolak
                      </Button>
                    </div>
                  </div>
                )}

                {/* Reject Modal */}
                {rejectModal === req.id && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <Card className="w-full max-w-md mx-4">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Alasan Penolakan</h3>
                        <p className="text-sm text-gray-600 mb-4">Berikan alasan mengapa pengajuan ini ditolak.</p>
                        <textarea
                          rows={3}
                          placeholder="Tulis alasan penolakan..."
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none"
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          autoFocus
                        />
                        <div className="mt-4 flex gap-2">
                          <Button variant="danger" onClick={handleReject} disabled={!rejectReason}>
                            Konfirmasi Tolak
                          </Button>
                          <Button variant="outline" onClick={() => setRejectModal(null)}>Batal</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
