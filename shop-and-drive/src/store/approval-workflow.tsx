"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

// ============ APPROVAL TYPE DEFINITIONS ============
export type ApprovalType = "leave" | "reimbursement" | "overtime" | "payroll" | "recruitment" | "purchase";

export interface ApprovalRequest {
  id: string;
  type: ApprovalType;
  title: string;
  description: string;
  requesterId: string;
  requesterName: string;
  requesterDepartment: string;
  amount?: number;
  startDate?: string;
  endDate?: string;
  duration?: number;
  status: "pending" | "approved" | "rejected" | "cancelled";
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string | null;
  approvedBy: string | null;
  approvedAt: string | null;
  rejectionReason: string | null;
  attachmentUrl: string | null;
  reviewerNotes: string | null;
}

export interface ApprovalStage {
  id: string;
  name: string;
  order: number;
  approverId: string;
  approverName: string;
  status: "pending" | "approved" | "rejected" | "skipped";
  notes: string | null;
  decidedAt: string | null;
}

export interface ApprovalWorkflow {
  id: string;
  name: string;
  type: ApprovalType;
  stages: ApprovalStage[];
  isActive: boolean;
}

export interface ApprovalStats {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
  avgApprovalTime: string; // human readable
}

// ============ MOCK DATA ============
const initialRequests: ApprovalRequest[] = [
  {
    id: "apr-1", type: "leave", title: "Cuti Tahunan - Joko Widodo",
    description: "Liburan keluarga ke Yogyakarta",
    requesterId: "emp-10", requesterName: "Joko Widodo", requesterDepartment: "Gudang & Logistik",
    startDate: "2026-07-20", endDate: "2026-07-22", duration: 3,
    status: "pending", priority: "low",
    createdAt: "2026-07-10T08:30:00Z", updatedAt: null,
    approvedBy: null, approvedAt: null, rejectionReason: null,
    attachmentUrl: null, reviewerNotes: null,
  },
  {
    id: "apr-2", type: "leave", title: "Cuti Pribadi - Nanda Putra",
    description: "Acara keluarga",
    requesterId: "emp-14", requesterName: "Nanda Putra", requesterDepartment: "Customer Service",
    startDate: "2026-07-25", endDate: "2026-07-25", duration: 1,
    status: "pending", priority: "low",
    createdAt: "2026-07-11T10:15:00Z", updatedAt: null,
    approvedBy: null, approvedAt: null, rejectionReason: null,
    attachmentUrl: null, reviewerNotes: null,
  },
  {
    id: "apr-3", type: "overtime", title: "Lembur - Tim Bengkel",
    description: "Lembur karena banyak booking servis akhir pekan. 4 mekanik, Sabtu 15 Juli.",
    requesterId: "emp-5", requesterName: "Eka Wijaya", requesterDepartment: "Operasional Bengkel",
    amount: 750000,
    startDate: "2026-07-15", endDate: "2026-07-15",
    status: "pending", priority: "high",
    createdAt: "2026-07-12T14:00:00Z", updatedAt: null,
    approvedBy: null, approvedAt: null, rejectionReason: null,
    attachmentUrl: null, reviewerNotes: null,
  },
  {
    id: "apr-4", type: "reimbursement", title: "Klaim Biaya Medis - Kartika Sari",
    description: "Biaya rawat jalan di RS Eka Hospital. Lampiran resep dan kwitansi.",
    requesterId: "emp-11", requesterName: "Kartika Sari", requesterDepartment: "HR & Keuangan",
    amount: 450000,
    status: "pending", priority: "medium",
    createdAt: "2026-07-09T09:00:00Z", updatedAt: null,
    approvedBy: null, approvedAt: null, rejectionReason: null,
    attachmentUrl: "/documents/kwitansi-kartika.pdf", reviewerNotes: null,
  },
  {
    id: "apr-5", type: "payroll", title: "Payroll Juli 2026",
    description: "Proses penggajian periode Juli 2026 untuk 15 karyawan. Total: Rp 197.600.000",
    requesterId: "emp-11", requesterName: "Kartika Sari", requesterDepartment: "HR & Keuangan",
    amount: 197600000,
    status: "pending", priority: "high",
    createdAt: "2026-07-13T07:00:00Z", updatedAt: null,
    approvedBy: null, approvedAt: null, rejectionReason: null,
    attachmentUrl: null, reviewerNotes: null,
  },
  {
    id: "apr-6", type: "leave", title: "Cuti Sakit - Gita Puspita",
    description: "Demam tinggi, disertai batuk. Surat dokter terlampir.",
    requesterId: "emp-7", requesterName: "Gita Puspita", requesterDepartment: "Operasional Bengkel",
    startDate: "2026-07-13", endDate: "2026-07-14", duration: 2,
    status: "approved", priority: "high",
    createdAt: "2026-07-13T06:30:00Z", updatedAt: "2026-07-13T08:15:00Z",
    approvedBy: "Andi Pratama", approvedAt: "2026-07-13T08:15:00Z",
    rejectionReason: null, attachmentUrl: null, reviewerNotes: "Semoga cepat sembuh, Git.",
  },
  {
    id: "apr-7", type: "leave", title: "Cuti Tahunan - Doni Prasetyo",
    description: "Cuti tahunan 2 hari",
    requesterId: "emp-4", requesterName: "Doni Prasetyo", requesterDepartment: "Penjualan & Marketing",
    startDate: "2026-07-05", endDate: "2026-07-06", duration: 2,
    status: "approved", priority: "low",
    createdAt: "2026-07-01T11:00:00Z", updatedAt: "2026-07-02T09:30:00Z",
    approvedBy: "Citra Dewi", approvedAt: "2026-07-02T09:30:00Z",
    rejectionReason: null, attachmentUrl: null, reviewerNotes: "Approved. Enjoy liburannya!",
  },
  {
    id: "apr-8", type: "purchase", title: "Pembelian Tools Bengkel",
    description: "Air compressor baru dan tool set lengkap untuk bengkel. 3 item.",
    requesterId: "emp-5", requesterName: "Eka Wijaya", requesterDepartment: "Operasional Bengkel",
    amount: 8500000,
    status: "rejected", priority: "medium",
    createdAt: "2026-07-04T13:00:00Z", updatedAt: "2026-07-05T10:00:00Z",
    approvedBy: "Andi Pratama", approvedAt: "2026-07-05T10:00:00Z",
    rejectionReason: "Budget Q3 belum disetujui. Ajukan lagi bulan depan.",
    attachmentUrl: null, reviewerNotes: null,
  },
];

// ============ CONTEXT ============
interface ApprovalContextType {
  requests: ApprovalRequest[];
  pendingCount: number;
  getPendingByType: (type: ApprovalType) => ApprovalRequest[];
  getStats: () => ApprovalStats;
  approveRequest: (id: string, reviewer: string, notes?: string) => void;
  rejectRequest: (id: string, reviewer: string, reason: string) => void;
  addRequest: (req: Omit<ApprovalRequest, "id" | "createdAt" | "updatedAt" | "approvedBy" | "approvedAt" | "rejectionReason" | "reviewerNotes" | "status"> & { status?: ApprovalRequest["status"] }) => void;
}

const ApprovalContext = createContext<ApprovalContextType | undefined>(undefined);

export function ApprovalProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<ApprovalRequest[]>(initialRequests);

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  const getPendingByType = useCallback(
    (type: ApprovalType) => requests.filter((r) => r.status === "pending" && r.type === type),
    [requests]
  );

  const getStats = useCallback((): ApprovalStats => {
    const total = requests.length;
    const pending = requests.filter(r => r.status === "pending").length;
    const approved = requests.filter(r => r.status === "approved").length;
    const rejected = requests.filter(r => r.status === "rejected").length;
    return { pending, approved, rejected, total, avgApprovalTime: "4.5 jam" };
  }, [requests]);

  const approveRequest = useCallback((id: string, reviewer: string, notes?: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: "approved", approvedBy: reviewer, approvedAt: new Date().toISOString(), updatedAt: new Date().toISOString(), reviewerNotes: notes || null }
          : r
      )
    );
  }, []);

  const rejectRequest = useCallback((id: string, reviewer: string, reason: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: "rejected", approvedBy: reviewer, rejectionReason: reason, updatedAt: new Date().toISOString(), approvedAt: new Date().toISOString() }
          : r
      )
    );
  }, []);

  const addRequest = useCallback(
    (req: Omit<ApprovalRequest, "id" | "createdAt" | "updatedAt" | "approvedBy" | "approvedAt" | "rejectionReason" | "reviewerNotes" | "status"> & { status?: ApprovalRequest["status"] }) => {
      const newReq: ApprovalRequest = {
        ...req,
        id: `apr-${Date.now()}`,
        status: req.status || "pending",
        createdAt: new Date().toISOString(),
        updatedAt: null,
        approvedBy: null,
        approvedAt: null,
        rejectionReason: null,
        reviewerNotes: null,
      };
      setRequests((prev) => [newReq, ...prev]);
    },
    []
  );

  return (
    <ApprovalContext.Provider value={{ requests, pendingCount, getPendingByType, getStats, approveRequest, rejectRequest, addRequest }}>
      {children}
    </ApprovalContext.Provider>
  );
}

export function useApprovals() {
  const context = useContext(ApprovalContext);
  if (!context) throw new Error("useApprovals must be used within ApprovalProvider");
  return context;
}
