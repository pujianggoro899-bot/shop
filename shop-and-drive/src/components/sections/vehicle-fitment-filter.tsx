"use client";

import { useState } from "react";
import { Car, Search, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock vehicle database
const vehicleData = {
  brands: [
    {
      name: "Toyota",
      models: [
        { name: "Avanza", years: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "Innova", years: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "Fortuner", years: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "Camry", years: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "Corolla Altis", years: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "Rush", years: ["2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "Calya", years: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
      ],
    },
    {
      name: "Honda",
      models: [
        { name: "Brio", years: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "Mobilio", years: ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"] },
        { name: "HR-V", years: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "CR-V", years: ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "Civic", years: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "City", years: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "Jazz", years: ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"] },
      ],
    },
    {
      name: "Mitsubishi",
      models: [
        { name: "Xpander", years: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "Pajero Sport", years: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "L300", years: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"] },
        { name: "Outlander", years: ["2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "Triton", years: ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
      ],
    },
    {
      name: "Suzuki",
      models: [
        { name: "Ertiga", years: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "Ignis", years: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "Baleno", years: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "Swift", years: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"] },
        { name: "XL7", years: ["2020", "2021", "2022", "2023"] },
        { name: "Carry Pickup", years: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
      ],
    },
    {
      name: "Daihatsu",
      models: [
        { name: "Xenia", years: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "Terios", years: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "Sigra", years: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "Ayla", years: ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
        { name: "Gran Max", years: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"] },
      ],
    },
  ],
};

interface VehicleFitmentFilterProps {
  onFilterChange: (filters: { brand: string; model: string; year: string } | null) => void;
  compact?: boolean;
}

export function VehicleFitmentFilter({ onFilterChange, compact = false }: VehicleFitmentFilterProps) {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isOpen, setIsOpen] = useState(!compact);

  const currentBrand = vehicleData.brands.find((b) => b.name === selectedBrand);
  const models = currentBrand?.models || [];
  const currentModel = models.find((m) => m.name === selectedModel);
  const years = currentModel?.years || [];

  const handleApply = () => {
    if (selectedBrand && selectedModel && selectedYear) {
      onFilterChange({ brand: selectedBrand, model: selectedModel, year: selectedYear });
    }
  };

  const handleReset = () => {
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedYear("");
    onFilterChange(null);
  };

  const hasActiveFilter = selectedBrand && selectedModel && selectedYear;

  if (compact) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Car className="h-4 w-4" />
          {hasActiveFilter
            ? `${selectedBrand} ${selectedModel} (${selectedYear})`
            : "Cari Berdasarkan Kendaraan"}
        </button>

        {isOpen && (
          <Card className="absolute z-50 mt-2 w-[320px] shadow-lg">
            <CardContent className="p-4">
              <VehicleFilterContent
                vehicleData={vehicleData}
                selectedBrand={selectedBrand}
                selectedModel={selectedModel}
                selectedYear={selectedYear}
                onBrandChange={(v) => { setSelectedBrand(v); setSelectedModel(""); setSelectedYear(""); }}
                onModelChange={(v) => { setSelectedModel(v); setSelectedYear(""); }}
                onYearChange={setSelectedYear}
                onApply={handleApply}
                onReset={handleReset}
                hasActiveFilter={!!hasActiveFilter}
              />
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Car className="h-5 w-5 text-red-600" />
          <h3 className="font-semibold text-gray-900">Cari Berdasarkan Kendaraan</h3>
        </div>
        <VehicleFilterContent
          vehicleData={vehicleData}
          selectedBrand={selectedBrand}
          selectedModel={selectedModel}
          selectedYear={selectedYear}
          onBrandChange={(v) => { setSelectedBrand(v); setSelectedModel(""); setSelectedYear(""); }}
          onModelChange={(v) => { setSelectedModel(v); setSelectedYear(""); }}
          onYearChange={setSelectedYear}
          onApply={handleApply}
          onReset={handleReset}
          hasActiveFilter={!!hasActiveFilter}
        />
      </CardContent>
    </Card>
  );
}

interface VehicleModel { name: string; years: string[]; }
interface VehicleBrand { name: string; models: VehicleModel[]; }
interface VehicleDB { brands: VehicleBrand[]; }

function VehicleFilterContent({
  vehicleData, selectedBrand, selectedModel, selectedYear,
  onBrandChange, onModelChange, onYearChange,
  onApply, onReset, hasActiveFilter,
}: {
  vehicleData: VehicleDB;
  selectedBrand: string;
  selectedModel: string;
  selectedYear: string;
  onBrandChange: (v: string) => void;
  onModelChange: (v: string) => void;
  onYearChange: (v: string) => void;
  onApply: () => void;
  onReset: () => void;
  hasActiveFilter: boolean;
}) {
  const currentBrand = vehicleData.brands.find((b) => b.name === selectedBrand);
  const currentModel = currentBrand?.models.find((m) => m.name === selectedModel);

  return (
    <div className="space-y-4">
      {/* Brand Select */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Merek</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {vehicleData.brands.map((brand) => (
            <button
              key={brand.name}
              onClick={() => onBrandChange(brand.name)}
              className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all ${
                selectedBrand === brand.name
                  ? "border-red-600 bg-red-50 text-red-600"
                  : "border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>

      {/* Model Select */}
      {selectedBrand && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Model</label>
          <div className="flex flex-wrap gap-2">
            {vehicleData.brands
              .find((b) => b.name === selectedBrand)
              ?.models.map((model) => (
                <button
                  key={model.name}
                  onClick={() => onModelChange(model.name)}
                  className={`rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-all ${
                    selectedModel === model.name
                      ? "border-red-600 bg-red-50 text-red-600"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {model.name}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Year Select */}
      {selectedModel && currentBrand?.models.find((m) => m.name === selectedModel) && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Tahun</label>
          <div className="flex flex-wrap gap-2">
            {currentBrand.models
              .find((m) => m.name === selectedModel)
              ?.years.map((year) => (
                <button
                  key={year}
                  onClick={() => onYearChange(year)}
                  className={`rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-all ${
                    selectedYear === year
                      ? "border-red-600 bg-red-50 text-red-600"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {year}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button onClick={onApply} disabled={!hasActiveFilter} className="flex-1">
          <Search className="h-4 w-4" /> Cari Produk
        </Button>
        {hasActiveFilter && (
          <Button variant="outline" onClick={onReset}>
            Reset
          </Button>
        )}
      </div>

      {hasActiveFilter && (
        <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
          <Check className="inline h-4 w-4 mr-1" />
          Menampilkan produk yang kompatibel dengan <strong>{selectedBrand} {selectedModel} ({selectedYear})</strong>
        </div>
      )}
    </div>
  );
}
