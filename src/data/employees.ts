import { Employee, Attendance, LeaveRequest, Payroll } from "./types";

export const departments = [
  { id: "dept-1", name: "Manajemen", headCount: 3 },
  { id: "dept-2", name: "Penjualan & Marketing", headCount: 8 },
  { id: "dept-3", name: "Operasional Bengkel", headCount: 12 },
  { id: "dept-4", name: "Gudang & Logistik", headCount: 5 },
  { id: "dept-5", name: "HR & Keuangan", headCount: 4 },
  { id: "dept-6", name: "Customer Service", headCount: 3 },
];

export const employees: Employee[] = [
  { id: "emp-1", employeeId: "SD-001", name: "Andi Pratama", email: "andi@shopandrive.com", phone: "081234567890", position: "Kepala Toko", departmentId: "dept-1", departmentName: "Manajemen", joinDate: "2020-03-15", status: "active", photo: "" },
  { id: "emp-2", employeeId: "SD-002", name: "Bambang Susilo", email: "bambang@shopandrive.com", phone: "081234567891", position: "Wakil Kepala Toko", departmentId: "dept-1", departmentName: "Manajemen", joinDate: "2020-06-01", status: "active", photo: "" },
  { id: "emp-3", employeeId: "SD-003", name: "Citra Dewi", email: "citra@shopandrive.com", phone: "081234567892", position: "Supervisor Marketing", departmentId: "dept-2", departmentName: "Penjualan & Marketing", joinDate: "2021-01-10", status: "active", photo: "" },
  { id: "emp-4", employeeId: "SD-004", name: "Doni Prasetyo", email: "doni@shopandrive.com", phone: "081234567893", position: "Staff Marketing", departmentId: "dept-2", departmentName: "Penjualan & Marketing", joinDate: "2021-03-20", status: "active", photo: "" },
  { id: "emp-5", employeeId: "SD-005", name: "Eka Wijaya", email: "eka@shopandrive.com", phone: "081234567894", position: "Kepala Mekanik", departmentId: "dept-3", departmentName: "Operasional Bengkel", joinDate: "2019-08-05", status: "active", photo: "" },
  { id: "emp-6", employeeId: "SD-006", name: "Fajar Ramdhan", email: "fajar@shopandrive.com", phone: "081234567895", position: "Mekanik Senior", departmentId: "dept-3", departmentName: "Operasional Bengkel", joinDate: "2020-02-10", status: "active", photo: "" },
  { id: "emp-7", employeeId: "SD-007", name: "Gita Puspita", email: "gita@shopandrive.com", phone: "081234567896", position: "Mekanik", departmentId: "dept-3", departmentName: "Operasional Bengkel", joinDate: "2021-06-15", status: "active", photo: "" },
  { id: "emp-8", employeeId: "SD-008", name: "Hadi Santoso", email: "hadi@shopandrive.com", phone: "081234567897", position: "Mekanik", departmentId: "dept-3", departmentName: "Operasional Bengkel", joinDate: "2022-01-05", status: "active", photo: "" },
  { id: "emp-9", employeeId: "SD-009", name: "Indah Lestari", email: "indah@shopandrive.com", phone: "081234567898", position: "Staff Gudang", departmentId: "dept-4", departmentName: "Gudang & Logistik", joinDate: "2021-09-01", status: "active", photo: "" },
  { id: "emp-10", employeeId: "SD-010", name: "Joko Widodo", email: "joko@shopandrive.com", phone: "081234567899", position: "Staff Gudang", departmentId: "dept-4", departmentName: "Gudang & Logistik", joinDate: "2022-03-20", status: "active", photo: "" },
  { id: "emp-11", employeeId: "SD-011", name: "Kartika Sari", email: "kartika@shopandrive.com", phone: "081234567900", position: "Staff HR", departmentId: "dept-5", departmentName: "HR & Keuangan", joinDate: "2021-02-14", status: "active", photo: "" },
  { id: "emp-12", employeeId: "SD-012", name: "Lukman Hakim", email: "lukman@shopandrive.com", phone: "081234567901", position: "Staff Keuangan", departmentId: "dept-5", departmentName: "HR & Keuangan", joinDate: "2020-11-01", status: "active", photo: "" },
  { id: "emp-13", employeeId: "SD-013", name: "Maya Anggraini", email: "maya@shopandrive.com", phone: "081234567902", position: "Customer Service", departmentId: "dept-6", departmentName: "Customer Service", joinDate: "2021-05-10", status: "active", photo: "" },
  { id: "emp-14", employeeId: "SD-014", name: "Nanda Putra", email: "nanda@shopandrive.com", phone: "081234567903", position: "Customer Service", departmentId: "dept-6", departmentName: "Customer Service", joinDate: "2022-06-01", status: "active", photo: "" },
  { id: "emp-15", employeeId: "SD-015", name: "Oscar Nugroho", email: "oscar@shopandrive.com", phone: "081234567904", position: "Sales Counter", departmentId: "dept-2", departmentName: "Penjualan & Marketing", joinDate: "2022-08-15", status: "active", photo: "" },
];

export const attendances: Attendance[] = [
  { id: "att-1", employeeId: "emp-1", employeeName: "Andi Pratama", date: "2026-07-13", clockIn: "07:55", clockOut: "17:05", status: "present", location: "Taman Tekno" },
  { id: "att-2", employeeId: "emp-3", employeeName: "Citra Dewi", date: "2026-07-13", clockIn: "08:00", clockOut: null, status: "present", location: "Taman Tekno" },
  { id: "att-3", employeeId: "emp-5", employeeName: "Eka Wijaya", date: "2026-07-13", clockIn: "07:30", clockOut: null, status: "present", location: "Taman Tekno" },
  { id: "att-4", employeeId: "emp-11", employeeName: "Kartika Sari", date: "2026-07-13", clockIn: "08:15", clockOut: null, status: "late", location: "Taman Tekno" },
  { id: "att-5", employeeId: "emp-7", employeeName: "Gita Puspita", date: "2026-07-13", clockIn: "00:00", clockOut: null, status: "leave", location: "-" },
  { id: "att-6", employeeId: "emp-2", employeeName: "Bambang Susilo", date: "2026-07-13", clockIn: "07:45", clockOut: null, status: "present", location: "Taman Tekno" },
];

export const leaveRequests: LeaveRequest[] = [
  { id: "lv-1", employeeId: "emp-7", employeeName: "Gita Puspita", type: "sick", startDate: "2026-07-13", endDate: "2026-07-14", duration: 2, reason: "Demam tinggi", attachment: null, status: "approved", approvedBy: "Andi Pratama", createdAt: "2026-07-13" },
  { id: "lv-2", employeeId: "emp-10", employeeName: "Joko Widodo", type: "annual", startDate: "2026-07-20", endDate: "2026-07-22", duration: 3, reason: "Liburan keluarga", attachment: null, status: "pending", approvedBy: null, createdAt: "2026-07-10" },
  { id: "lv-3", employeeId: "emp-14", employeeName: "Nanda Putra", type: "personal", startDate: "2026-07-25", endDate: "2026-07-25", duration: 1, reason: "Ada acara keluarga", attachment: null, status: "pending", approvedBy: null, createdAt: "2026-07-11" },
  { id: "lv-4", employeeId: "emp-4", employeeName: "Doni Prasetyo", type: "annual", startDate: "2026-07-05", endDate: "2026-07-06", duration: 2, reason: "Cuti tahunan", attachment: null, status: "approved", approvedBy: "Citra Dewi", createdAt: "2026-07-01" },
];

export const payrolls: Payroll[] = [
  { id: "pay-1", employeeId: "emp-1", employeeName: "Andi Pratama", period: "Juli 2026", baseSalary: 8500000, allowances: 2000000, overtime: 500000, deductions: 850000, netSalary: 10150000, status: "draft" },
  { id: "pay-2", employeeId: "emp-5", employeeName: "Eka Wijaya", period: "Juli 2026", baseSalary: 6500000, allowances: 1500000, overtime: 750000, deductions: 650000, netSalary: 8100000, status: "draft" },
  { id: "pay-3", employeeId: "emp-11", employeeName: "Kartika Sari", period: "Juli 2026", baseSalary: 5000000, allowances: 1000000, overtime: 0, deductions: 500000, netSalary: 5500000, status: "draft" },
  { id: "pay-4", employeeId: "emp-3", employeeName: "Citra Dewi", period: "Juli 2026", baseSalary: 6000000, allowances: 1200000, overtime: 300000, deductions: 600000, netSalary: 6900000, status: "processed" },
  { id: "pay-5", employeeId: "emp-13", employeeName: "Maya Anggraini", period: "Juli 2026", baseSalary: 4200000, allowances: 800000, overtime: 200000, deductions: 420000, netSalary: 4800000, status: "processed" },
];
