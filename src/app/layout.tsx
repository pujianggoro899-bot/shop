import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/providers";
import { PWARegister } from "@/components/pwa-register";
import { PWAInstallPrompt } from "@/components/ui/pwa-install-prompt";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Shop & Drive Taman Tekno — Automotive Center BSD City",
  description:
    "Pusat sparepart, aksesoris, oli, ban, aki, dan servis mobil & motor profesional di Taman Tekno, BSD City. Belanja online, booking servis, gratis ongkir.",
  keywords: [
    "sparepart mobil", "servis mobil", "oli mobil", "ban mobil", "aki mobil",
    "aksesoris mobil", "Shop and Drive", "Taman Tekno", "BSD City",
    "booking servis", "bengkel mobil BSD", "otomotif",
  ],
  openGraph: {
    title: "Shop & Drive Taman Tekno — Automotive Center",
    description: "Solusi lengkap sparepart, servis, dan aksesoris kendaraan Anda. Specialist sejak 2019.",
    type: "website",
    locale: "id_ID",
    siteName: "Shop & Drive",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#dc2626" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Shop & Drive" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
      </head>
      <body className={`${inter.variable} font-sans bg-carbon-900 text-gray-100 antialiased`}>
        <PWARegister />
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <PWAInstallPrompt />
        </Providers>
      </body>
    </html>
  );
}
