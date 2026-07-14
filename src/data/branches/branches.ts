// ============ BRANCH / CABANG MANAGEMENT ============

export interface Branch {
  id: string;
  code: string;
  name: string;
  address: string;
  city: string;
  province: string;
  phone: string;
  email: string;
  whatsapp: string;
  openHours: string;
  openHoursWeekend: string;
  managerId: string;
  managerName: string;
  employeeCount: number;
  isActive: boolean;
  isHeadOffice: boolean;
  joinDate: string;
  lat: number;
  lng: number;
  features: ("ecommerce" | "service" | "pickup")[];
  productsCount: number;
}

export interface BranchPerformance {
  branchId: string;
  branchName: string;
  monthlyRevenue: number;
  monthlyOrders: number;
  monthlyServices: number;
  monthlyCustomers: number;
  growth: number; // percentage
  topCategory: string;
  topProduct: string;
}

export const branches: Branch[] = [
  {
    id: "br-1",
    code: "TTK",
    name: "Taman Tekno (Pusat)",
    address: "Jl. Taman Tekno No. 88, BSD City",
    city: "Tangerang Selatan",
    province: "Banten",
    phone: "(021) 1234 5678",
    email: "tamantekno@shopandrive.com",
    whatsapp: "621234567890",
    openHours: "Sen-Sab: 08:00 - 20:00",
    openHoursWeekend: "Minggu: 09:00 - 17:00",
    managerId: "emp-1",
    managerName: "Andi Pratama",
    employeeCount: 15,
    isActive: true,
    isHeadOffice: true,
    joinDate: "2019-08-01",
    lat: -6.3014,
    lng: 106.652,
    features: ["ecommerce", "service", "pickup"],
    productsCount: 145,
  },
  {
    id: "br-2",
    code: "SERPONG",
    name: "Serpong Utara",
    address: "Jl. Raya Serpong KM 12, BSD City",
    city: "Tangerang Selatan",
    province: "Banten",
    phone: "(021) 2345 6789",
    email: "serpong@shopandrive.com",
    whatsapp: "621234567891",
    openHours: "Sen-Sab: 08:00 - 20:00",
    openHoursWeekend: "Minggu: 09:00 - 17:00",
    managerId: "emp-3",
    managerName: "Citra Dewi",
    employeeCount: 10,
    isActive: true,
    isHeadOffice: false,
    joinDate: "2021-03-15",
    lat: -6.2858,
    lng: 106.6257,
    features: ["ecommerce", "service"],
    productsCount: 98,
  },
  {
    id: "br-3",
    code: "BINTARO",
    name: "Bintaro",
    address: "Jl. Bintaro Utama Raya No. 45",
    city: "Tangerang Selatan",
    province: "Banten",
    phone: "(021) 3456 7890",
    email: "bintaro@shopandrive.com",
    whatsapp: "621234567892",
    openHours: "Sen-Sab: 08:00 - 20:00",
    openHoursWeekend: "Minggu: 10:00 - 16:00",
    managerId: "",
    managerName: "— (Sedang rekrut)",
    employeeCount: 0,
    isActive: false,
    isHeadOffice: false,
    joinDate: "2026-08-01",
    lat: -6.2726,
    lng: 106.7603,
    features: ["service", "pickup"],
    productsCount: 0,
  },
];

export const branchPerformance: BranchPerformance[] = [
  {
    branchId: "br-1", branchName: "Taman Tekno (Pusat)",
    monthlyRevenue: 168000000, monthlyOrders: 380, monthlyServices: 145, monthlyCustomers: 420,
    growth: 12.5, topCategory: "Oli & Cairan", topProduct: "Oli Shell Helix HX7",
  },
  {
    branchId: "br-2", branchName: "Serpong Utara",
    monthlyRevenue: 98500000, monthlyOrders: 215, monthlyServices: 89, monthlyCustomers: 245,
    growth: 8.3, topCategory: "Sparepart Mesin", topProduct: "Filter Udara Honda",
  },
];

export interface BranchSettings {
  defaultBranch: string;
  allowCrossBranchOrder: boolean;
  stockVisibility: "all" | "local" | "main";
  multiBranchCheckout: boolean;
  branchTransferEnabled: boolean;
}
