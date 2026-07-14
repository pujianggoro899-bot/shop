import { Banner, Voucher } from "./types";

export const banners: Banner[] = [
  {
    id: "bnr-1",
    title: "Servis Berkala Gratis Oli",
    subtitle: "Lakukan servis berkala dan dapatkan oli mesin gratis*",
    image: "/images/banners/servis-promo.jpg",
    link: "/booking-servis",
    isActive: true,
    order: 1,
  },
  {
    id: "bnr-2",
    title: "Diskon 30% Aki GS Astra",
    subtitle: "Ganti aki sekarang! Promo terbatas untuk semua tipe",
    image: "/images/banners/aki-promo.jpg",
    link: "/produk?category=aki",
    isActive: true,
    order: 2,
  },
  {
    id: "bnr-3",
    title: "Gratis Ongkir Seluruh Indonesia",
    subtitle: "Minimal belanja Rp 200.000, syarat & ketentuan berlaku",
    image: "/images/banners/ongkir-promo.jpg",
    link: "/produk",
    isActive: true,
    order: 3,
  },
];

export const vouchers: Voucher[] = [
  {
    id: "voc-1",
    code: "BARU10",
    type: "percentage",
    value: 10,
    minPurchase: 100000,
    maxDiscount: 50000,
    validFrom: "2026-07-01",
    validUntil: "2026-07-31",
    isActive: true,
  },
  {
    id: "voc-2",
    code: "SERVIS50",
    type: "nominal",
    value: 50000,
    minPurchase: 200000,
    maxDiscount: 50000,
    validFrom: "2026-07-01",
    validUntil: "2026-08-31",
    isActive: true,
  },
  {
    id: "voc-3",
    code: "HEMAT30",
    type: "percentage",
    value: 30,
    minPurchase: 500000,
    maxDiscount: 150000,
    validFrom: "2026-06-01",
    validUntil: "2026-07-15",
    isActive: true,
  },
];
