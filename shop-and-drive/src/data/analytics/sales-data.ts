// ============ SALES ANALYTICS DATA ============

export interface SalesByDay {
  date: string;
  label: string;
  revenue: number;
  orders: number;
  visitors: number;
  conversion: number;
}

export interface SalesByCategory {
  category: string;
  revenue: number;
  orders: number;
  percentage: number;
}

export interface TopProduct {
  name: string;
  sku: string;
  revenue: number;
  orders: number;
  stock: number;
  growth: number; // percentage
}

export interface MonthlyTrend {
  month: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
  target: number;
  targetAchieved: number; // percentage
}

export interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
  conversion: number;
}

// Daily sales for current month
export const dailySales: SalesByDay[] = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1;
  const baseRevenue = 5000000 + Math.random() * 5000000;
  const isWeekend = day % 7 === 0 || day % 7 === 6;
  const weekendBoost = isWeekend ? 1.3 : 1;
  const revenue = Math.round(baseRevenue * weekendBoost);
  const orders = Math.round(5 + Math.random() * 15);
  const visitors = Math.round(80 + Math.random() * 120);
  
  return {
    date: `2026-07-${String(day).padStart(2, "0")}`,
    label: `${day} Juli`,
    revenue,
    orders,
    visitors,
    conversion: parseFloat(((orders / visitors) * 100).toFixed(1)),
  };
});

// Monthly trends 2026
export const monthlyTrends: MonthlyTrend[] = [
  { month: "Jan", revenue: 185000000, orders: 420, averageOrderValue: 440476, target: 200000000, targetAchieved: 92.5 },
  { month: "Feb", revenue: 172000000, orders: 380, averageOrderValue: 452632, target: 200000000, targetAchieved: 86 },
  { month: "Mar", revenue: 210000000, orders: 480, averageOrderValue: 437500, target: 220000000, targetAchieved: 95.5 },
  { month: "Apr", revenue: 198000000, orders: 450, averageOrderValue: 440000, target: 220000000, targetAchieved: 90 },
  { month: "Mei", revenue: 235000000, orders: 520, averageOrderValue: 451923, target: 240000000, targetAchieved: 97.9 },
  { month: "Jun", revenue: 252000000, orders: 560, averageOrderValue: 450000, target: 250000000, targetAchieved: 100.8 },
  { month: "Jul", revenue: 168000000, orders: 380, averageOrderValue: 442105, target: 260000000, targetAchieved: 64.6 },
];

// Sales by category
export const salesByCategory: SalesByCategory[] = [
  { category: "Oli & Cairan", revenue: 89200000, orders: 412, percentage: 22.5 },
  { category: "Sparepart Mesin", revenue: 76500000, orders: 245, percentage: 19.3 },
  { category: "Aksesoris", revenue: 65400000, orders: 380, percentage: 16.5 },
  { category: "Ban", revenue: 84500000, orders: 125, percentage: 21.3 },
  { category: "Aki", revenue: 42500000, orders: 210, percentage: 10.7 },
  { category: "Jasa Servis", revenue: 38900000, orders: 178, percentage: 9.7 },
];

// Top products
export const topProducts: TopProduct[] = [
  { name: "Oli Mobil Shell Helix HX7 10W-40 4L", sku: "OLI-SH-HX7-10W40", revenue: 28750000, orders: 73, stock: 15, growth: 15.2 },
  { name: "Ban Michelin Primacy 4 195/65 R15", sku: "BAN-MIC-P4-19565R15", revenue: 22500000, orders: 18, stock: 8, growth: 8.5 },
  { name: "Lampu LED Philips Ultinon Pro9000", sku: "LMP-PHIL-U9000-H7", revenue: 18700000, orders: 22, stock: 10, growth: 22.1 },
  { name: "Aki GS Astra GS 40B20R", sku: "AKI-GS-40B20R", revenue: 16320000, orders: 24, stock: 12, growth: -2.3 },
  { name: "Busi Iridium NGK Premium Set", sku: "BUS-NGK-IR-SET4", revenue: 14400000, orders: 30, stock: 20, growth: 12.8 },
  { name: "Floor Mat Mobil Universal Premium", sku: "AKS-FM-PREMIUM-BLK", revenue: 9828000, orders: 52, stock: 30, growth: 5.4 },
];

// Traffic sources
export const trafficSources: TrafficSource[] = [
  { source: "Google Organic", visitors: 8450, percentage: 38.2, conversion: 3.2 },
  { source: "Direct", visitors: 4120, percentage: 18.6, conversion: 2.8 },
  { source: "Social Media", visitors: 3670, percentage: 16.6, conversion: 1.9 },
  { source: "WhatsApp / Chat", visitors: 2850, percentage: 12.9, conversion: 8.5 },
  { source: "Email / Newsletter", visitors: 1680, percentage: 7.6, conversion: 4.1 },
  { source: "Marketplace Referral", visitors: 1350, percentage: 6.1, conversion: 3.5 },
];

// HR Analytics data
export interface HRAnalytics {
  department: string;
  headcount: number;
  avgAttendance: number; // percentage
  avgOvertimeHours: number;
  turnoverRate: number; // percentage
  avgTenureMonths: number;
  payrollThisMonth: number;
}

export const hrAnalytics: HRAnalytics[] = [
  { department: "Manajemen", headcount: 3, avgAttendance: 98.5, avgOvertimeHours: 8, turnoverRate: 0, avgTenureMonths: 48, payrollThisMonth: 28500000 },
  { department: "Penjualan & Marketing", headcount: 8, avgAttendance: 95.2, avgOvertimeHours: 12, turnoverRate: 8.3, avgTenureMonths: 24, payrollThisMonth: 48600000 },
  { department: "Operasional Bengkel", headcount: 12, avgAttendance: 93.8, avgOvertimeHours: 18, turnoverRate: 5.2, avgTenureMonths: 30, payrollThisMonth: 62400000 },
  { department: "Gudang & Logistik", headcount: 5, avgAttendance: 94.5, avgOvertimeHours: 10, turnoverRate: 10, avgTenureMonths: 18, payrollThisMonth: 21500000 },
  { department: "HR & Keuangan", headcount: 4, avgAttendance: 97.8, avgOvertimeHours: 6, turnoverRate: 0, avgTenureMonths: 36, payrollThisMonth: 22800000 },
  { department: "Customer Service", headcount: 3, avgAttendance: 96.2, avgOvertimeHours: 5, turnoverRate: 6.7, avgTenureMonths: 14, payrollThisMonth: 13800000 },
];

export const inventoryAnalytics = {
  totalSKU: 145,
  totalStockValue: 892000000,
  outOfStock: 7,
  lowStock: 15,
  overstock: 12,
  monthlyTurnover: 1.8, // ratio
  topSellingCategories: [
    { name: "Oli & Cairan", turnover: 3.2 },
    { name: "Aki", turnover: 2.1 },
    { name: "Filter", turnover: 2.0 },
    { name: "Aksesoris", turnover: 1.5 },
  ],
};
