"use client";

import { useState } from "react";
import { Store, MapPin, Check, ChevronDown } from "lucide-react";
import { branches, type Branch } from "@/data/branches/branches";
import { cn } from "@/lib/utils";

interface BranchSelectorProps {
  compact?: boolean;
  onBranchChange?: (branch: Branch) => void;
}

export function BranchSelector({ compact = false, onBranchChange }: BranchSelectorProps) {
  const defaultBranch = branches.find((b: Branch) => b.isActive);
  const [selectedId, setSelectedId] = useState(defaultBranch?.id || branches[0]?.id || "");
  const [isOpen, setIsOpen] = useState(false);

  const selected = branches.find((b: Branch) => b.id === selectedId) || branches[0]!;
  const activeBranches = branches.filter(b => b.isActive);

  const handleSelect = (branch: Branch) => {
    setSelectedId(branch.id);
    setIsOpen(false);
    onBranchChange?.(branch);
  };

  if (compact) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
        >
          <Store className="h-4 w-4 text-gray-500" />
          <span className="text-gray-700 font-medium">{selected.code}</span>
          <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
        </button>

        {isOpen && (
          <div className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-gray-200 bg-white shadow-xl">
            <div className="p-2">
              <p className="px-3 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider">Pilih Cabang</p>
              {branches.map((branch) => {
                const isActive = branch.isActive;
                return (
                  <button
                    key={branch.id}
                    onClick={() => isActive && handleSelect(branch)}
                    disabled={!isActive}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                      selectedId === branch.id ? "bg-red-50 text-red-700" : isActive ? "text-gray-700 hover:bg-gray-50" : "text-gray-300 cursor-not-allowed"
                    )}
                  >
                    <div className={cn(
                      "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full text-white text-xs font-bold",
                      branch.isHeadOffice ? "bg-red-600" : isActive ? "bg-blue-600" : "bg-gray-300"
                    )}>
                      {branch.code.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-semibold">{branch.name}</p>
                        {branch.isHeadOffice && (
                          <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-700">Pusat</span>
                        )}
                        {!isActive && <span className="text-[10px] text-gray-400">(Coming Soon)</span>}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{branch.city}</p>
                      <p className="text-xs text-gray-400">{branch.employeeCount} karyawan • {branch.productsCount} produk</p>
                    </div>
                    {selectedId === branch.id && <Check className="h-4 w-4 text-red-600 mt-1" />}
                  </button>
                );
              })}
            </div>
            <div className="border-t px-3 py-2">
              <a href="/admin/pengaturan/cabang" className="text-xs text-red-600 hover:underline">Kelola Cabang →</a>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Full layout for settings page
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {branches.map((branch) => (
          <button
            key={branch.id}
            onClick={() => branch.isActive && setSelectedId(branch.id)}
            className={cn(
              "rounded-xl border-2 p-5 text-left transition-all",
              selectedId === branch.id ? "border-red-600 bg-red-50" : branch.isActive ? "border-gray-200 hover:border-gray-300" : "border-gray-100 bg-gray-50 opacity-60"
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-white font-bold",
                  branch.isHeadOffice ? "bg-red-600" : "bg-blue-600"
                )}>
                  {branch.code.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{branch.name}</p>
                  <p className="text-sm text-gray-500">{branch.code}</p>
                </div>
              </div>
              {selectedId === branch.id && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600">
                  <Check className="h-3.5 w-3.5 text-white" />
                </div>
              )}
            </div>
            <div className="mt-3 space-y-1 text-sm">
              <p className="flex items-center gap-1 text-gray-600"><MapPin className="h-3.5 w-3.5" /> {branch.address}</p>
              <p className="text-gray-500">{branch.phone}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {branch.features.map((f) => (
                <span key={f} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                  {f === "ecommerce" ? "🛒 E-Commerce" : f === "service" ? "🔧 Servis" : "📦 Pickup"}
                </span>
              ))}
              {!branch.isActive && <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700">⏳ Pembangunan</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
