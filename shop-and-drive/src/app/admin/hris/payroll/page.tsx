"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { payrolls } from "@/data/employees";
import { formatCurrency } from "@/lib/utils";

export default function PayrollPage() {
  const totalGaji = payrolls.reduce((sum, p) => sum + p.netSalary, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll</h1>
          <p className="text-gray-600">Periode: Juli 2026</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button>Proses Payroll</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Karyawan</p>
            <p className="text-2xl font-bold text-gray-900">{payrolls.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Gaji</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(totalGaji)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Status</p>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
              <p className="text-lg font-semibold text-gray-900">Draft (3)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500">
                <th className="px-5 py-3">Karyawan</th>
                <th className="px-5 py-3">Gaji Pokok</th>
                <th className="px-5 py-3">Tunjangan</th>
                <th className="px-5 py-3">Lembur</th>
                <th className="px-5 py-3">Potongan</th>
                <th className="px-5 py-3">Gaji Bersih</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {payrolls.map((pay) => (
                <tr key={pay.id} className="border-b hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600">
                        {pay.employeeName.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{pay.employeeName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-700">{formatCurrency(pay.baseSalary)}</td>
                  <td className="px-5 py-3 text-gray-700">{formatCurrency(pay.allowances)}</td>
                  <td className="px-5 py-3 text-gray-700">{formatCurrency(pay.overtime)}</td>
                  <td className="px-5 py-3 text-red-600">({formatCurrency(pay.deductions)})</td>
                  <td className="px-5 py-3 font-bold text-gray-900">{formatCurrency(pay.netSalary)}</td>
                  <td className="px-5 py-3">
                    <Badge variant={pay.status === "paid" ? "success" : pay.status === "processed" ? "info" : "warning"}>
                      {pay.status === "paid" ? "Dibayar" : pay.status === "processed" ? "Diproses" : "Draft"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
