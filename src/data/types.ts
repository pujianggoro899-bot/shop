// === Product Types ===
export interface ProductVariant {
  id: string;
  name: string;
  additionalPrice: number;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  categoryId: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  variants: ProductVariant[];
  compatibilities: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  image: string;
  productCount: number;
}

// === Order Types ===
export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  variantName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  shippingMethod: string;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// === Service Booking Types ===
export interface ServiceBooking {
  id: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: number;
  licensePlate: string;
  serviceType: string;
  serviceNotes: string;
  bookingDate: string;
  bookingTime: string;
  estimatedCost: number;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
}

export interface ServiceType {
  id: string;
  name: string;
  slug: string;
  description: string;
  estimatedPrice: number;
  estimatedDuration: string;
  image: string;
  icon: string;
}

// === Article Types ===
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categoryId: string;
  categoryName: string;
  author: string;
  image: string;
  tags: string[];
  status: "draft" | "review" | "published";
  publishedAt: string | null;
  createdAt: string;
  metaTitle: string;
  metaDescription: string;
}

// === Employee / HRIS Types ===
export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  departmentId: string;
  departmentName: string;
  joinDate: string;
  status: "active" | "inactive" | "resigned";
  photo: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  clockIn: string;
  clockOut: string | null;
  status: "present" | "late" | "absent" | "leave";
  location: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: "annual" | "sick" | "personal" | "maternity" | "other";
  startDate: string;
  endDate: string;
  duration: number;
  reason: string;
  attachment: string | null;
  status: "pending" | "approved" | "rejected";
  approvedBy: string | null;
  createdAt: string;
}

export interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string;
  baseSalary: number;
  allowances: number;
  overtime: number;
  deductions: number;
  netSalary: number;
  status: "draft" | "processed" | "paid";
}

// === Review Types ===
export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

// === Banner / Promotion Types ===
export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  isActive: boolean;
  order: number;
}

export interface Voucher {
  id: string;
  code: string;
  type: "percentage" | "nominal";
  value: number;
  minPurchase: number;
  maxDiscount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}
