"use client";

import { useState } from "react";
import { Store, MapPin, Phone, Mail, Users, Package, TrendingUp, Plus, Edit, Power } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BranchSelector } from "@/components/layout/branch-selector";
import { branches, branchPerformance, type Branch } from "@/data/branches/branches";
import { formatCurrency } from "@/lib/utils";

export default function BranchManagementPage() {
  const [selectedBranch, setSelectedBranch] = useState<Branch>(branches[0]);
  const perf = branchPerformance.find(p => p.branchId === selectedBranch.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Cabang</h1>
          <p className="text-gray-600">{branches.filter(b => b.isActive).length} cabang aktif dari {branches.length} total</p>
        </div>
        <Button><Plus className="h-4 w-4" /> Tambah Cabang</Button>
      </div>

      <BranchSelector />

      {selectedBranch && (
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-2xl font-bold text-red-600">
                    {selectedBranch.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-gray-900">{selectedBranch.name}</h2>
                      {selectedBranch.isHeadOffice && <Badge variant="danger">Kantor Pusat</Badge>}
                    </div>
                    <p className="text-sm text-gray-500">Kode: {selectedBranch.code}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline"><Edit className="h-4 w-4" /> Edit</Button>
                  <Button size="sm" variant="outline"><Power className="h-4 w-4" /> {selectedBranch.isActive ? "Nonaktifkan" : "Aktifkan"}</Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-gray-400" /> {selectedBranch.address}</div>
                  <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-gray-400" /> {selectedBranch.phone}</div>
                  <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-gray-400" /> {selectedBranch.email}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-gray-400" /> Manager: {selectedBranch.managerName}</div>
                  <div className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-gray-400" /> {selectedBranch.employeeCount} karyawan</div>
                  <div className="flex items-center gap-2 text-sm"><Package className="h-4 w-4 text-gray-400" /> {selectedBranch.productsCount} produk</div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">Fitur aktif:</span>
                {selectedBranch.features.map((f) => (
                  <Badge key={f} variant={f === "ecommerce" ? "success" : f === "service" ? "info" : "default"}>
                    {f === "ecommerce" ? "E-Commerce" : f === "service" ? "Servis Bengkel" : "Click & Collect"}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 rounded-lg bg-gray-50 p-3">
                <p className="text-sm font-medium text-gray-900">Jam Operasional</p>
                <p className="text-sm text-gray-600">{selectedBranch.openHours}</p>
                <p className="text-sm text-gray-600">{selectedBranch.openHoursWeekend}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h3 className="font-bold text-gray-900 mb-4">Kinerja Cabang</h3>
              {perf ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-green-50 p-3 text-center">
                      <p className="text-lg font-bold text-green-600">{formatCurrency(perf.monthlyRevenue)}</p>
                      <p className="text-xs text-gray-500">Revenue Bulan Ini</p>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-3 text-center">
                      <p className="text-lg font-bold text-blue-600">{perf.monthlyOrders}</p>
                      <p className="text-xs text-gray-500">Pesanan</p>
                    </div>
                    <div className="rounded-lg bg-purple-50 p-3 text-center">
                      <p className="text-lg font-bold text-purple-600">{perf.monthlyServices}</p>
                      <p className="text-xs text-gray-500">Booking Servis</p>
                    </div>
                    <div className="rounded-lg bg-orange-50 p-3 text-center">
                      <p className="text-lg font-bold text-orange-600">{perf.monthlyCustomers}</p>
                      <p className="text-xs text-gray-500">Pelanggan</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <span className="text-sm text-gray-600">Growth vs Bulan Lalu</span>
                    <span className="text-sm font-bold text-green-600">+{perf.growth}%</span>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 text-sm">
                    <p><span className="text-gray-500">Kategori Terlaris:</span> <strong>{perf.topCategory}</strong></p>
                    <p className="mt-1"><span className="text-gray-500">Produk Terlaris:</span> <strong>{perf.topProduct}</strong></p>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Store className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                  <p className="text-sm text-gray-500">Cabang belum beroperasi</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardContent className="p-5">
          <h3 className="font-bold text-gray-900 mb-4">Perbandingan Antar Cabang</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs font-medium text-gray-500">
                  <th className="pb-3 pr-4">Cabang</th>
                  <th className="pb-3 pr-4 text-right">Revenue</th>
                  <th className="pb-3 pr-4 text-right">Pesanan</th>
                  <th className="pb-3 pr-4 text-right">Servis</th>
                  <th className="pb-3 pr-4 text-right">Karyawan</th>
                  <th className="pb-3 pr-4 text-right">Growth</th>
                  <th className="pb-3 text-right">Kontribusi</th>
                </tr>
              </thead>
              <tbody>
                {branchPerformance.map((bp) => {
                  const totalRev = branchPerformance.reduce((s, p) => s + p.monthlyRevenue, 0);
                  const branch = branches.find(b => b.id === bp.branchId);
                  const pct = ((bp.monthlyRevenue / totalRev) * 100).toFixed(1);
                  return (
                    <tr key={bp.branchId} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white bg-red-600">
                            {bp.branchName.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900">{bp.branchName}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-right font-medium">{formatCurrency(bp.monthlyRevenue)}</td>
                      <td className="py-3 pr-4 text-right">{bp.monthlyOrders}</td>
                      <td className="py-3 pr-4 text-right">{bp.monthlyServices}</td>
                      <td className="py-3 pr-4 text-right">{branch?.employeeCount || 0}</td>
                      <td className="py-3 pr-4 text-right">
                        <span className="text-green-600 font-medium">+{bp.growth}%</span>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-medium">{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}