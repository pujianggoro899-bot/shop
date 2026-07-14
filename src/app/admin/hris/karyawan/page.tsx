"use client";

import { useState } from "react";
import { Search, Plus, ChevronDown, MoreHorizontal, Mail, Phone, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { employees, departments } from "@/data/employees";
import { formatCurrency } from "@/lib/utils";

export default function EmployeeDataPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const filtered = employees.filter((emp) => {
    if (selectedDepartment && emp.departmentId !== selectedDepartment) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        emp.name.toLowerCase().includes(q) ||
        emp.employeeId.toLowerCase().includes(q) ||
        emp.position.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Karyawan</h1>
          <p className="text-gray-600">Total {employees.length} karyawan aktif</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Tambah Karyawan
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Cari karyawan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedDepartment || ""}
          onChange={(e) => setSelectedDepartment(e.target.value || null)}
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none"
        >
          <option value="">Semua Departemen</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>{dept.name} ({dept.headCount})</option>
          ))}
        </select>
      </div>

      {/* Employee Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500">
                <th className="px-5 py-3">Karyawan</th>
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Jabatan</th>
                <th className="px-5 py-3">Departemen</th>
                <th className="px-5 py-3">Tanggal Masuk</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => (
                <tr key={emp.id} className="border-b hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{emp.name}</p>
                        <p className="text-xs text-gray-500">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{emp.employeeId}</td>
                  <td className="px-5 py-3 text-gray-700">{emp.position}</td>
                  <td className="px-5 py-3 text-gray-700">{emp.departmentName}</td>
                  <td className="px-5 py-3 text-gray-600">{emp.joinDate}</td>
                  <td className="px-5 py-3">
                    <Badge variant={emp.status === "active" ? "success" : emp.status === "inactive" ? "warning" : "danger"}>
                      {emp.status === "active" ? "Aktif" : emp.status === "inactive" ? "Tidak Aktif" : "Resign"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
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
