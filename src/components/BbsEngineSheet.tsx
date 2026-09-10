import React, { useState } from 'react';
import { BBSItem, SystemParameters } from '../types';
import {
  Database,
  Download,
  Filter,
  CheckCircle2,
  Info,
  Layers,
} from 'lucide-react';
import { formatNumber, formatCurrency } from '../utils/calculations';

interface BbsEngineSheetProps {
  bbsItems: BBSItem[];
  params: SystemParameters;
}

export const BbsEngineSheet: React.FC<BbsEngineSheetProps> = ({
  bbsItems,
  params,
}) => {
  const [selectedDiameter, setSelectedDiameter] = useState<string>('ALL');

  // Available diameters in dataset
  const diameters: number[] = Array.from(new Set<number>(bbsItems.map((b) => b.barDiameter))).sort(
    (a, b) => a - b
  );

  const filteredItems = bbsItems.filter((item) => {
    if (selectedDiameter === 'ALL') return true;
    return item.barDiameter === parseInt(selectedDiameter, 10);
  });

  // Rollup metrics
  const totalLinearM = bbsItems.reduce((acc, b) => acc + b.totalLinearM, 0);
  const totalNetKg = bbsItems.reduce((acc, b) => acc + b.netWeightKg, 0);
  const totalWeightT = bbsItems.reduce((acc, b) => acc + b.totalWeightT, 0);

  const heavyRebarT = bbsItems
    .filter((b) => b.barDiameter >= 16)
    .reduce((acc, b) => acc + b.totalWeightT, 0);

  const lightRebarT = bbsItems
    .filter((b) => b.barDiameter < 16)
    .reduce((acc, b) => acc + b.totalWeightT, 0);

  const maxRowWeightT = Math.max(...bbsItems.map((b) => b.totalWeightT), 0.1);

  // Grouped summary by diameter
  const diameterSummary = diameters.map((dia) => {
    const items = bbsItems.filter((b) => b.barDiameter === dia);
    const totalBars = items.reduce((acc, b) => acc + b.totalBars, 0);
    const linearM = items.reduce((acc, b) => acc + b.totalLinearM, 0);
    const tonnage = items.reduce((acc, b) => acc + b.totalWeightT, 0);
    const unitRate =
      dia >= 16
        ? params.priceRebar16
        : dia >= 12
        ? params.priceRebar12
        : params.priceRebar8;
    const estCost = tonnage * unitRate;

    return {
      diameter: dia,
      barCount: totalBars,
      linearM,
      tonnage,
      unitRate,
      estCost,
      share: totalWeightT > 0 ? (tonnage / totalWeightT) * 100 : 0,
    };
  });

  const exportBbsCsv = () => {
    const headers = [
      'Ref_Element_ID',
      'Category',
      'Bar_Diameter_mm',
      'Cut_Length_m',
      'Total_Bars',
      'Total_Linear_m',
      'Linear_Mass_kg_m',
      'Net_Weight_kg',
      'Total_Weight_Tonnes',
    ];
    const rows = bbsItems.map((b) => [
      b.refElementId,
      b.category,
      b.barDiameter,
      b.cutLength.toFixed(2),
      b.totalBars,
      b.totalLinearM.toFixed(2),
      b.unitWeightKgM.toFixed(4),
      b.netWeightKg.toFixed(2),
      b.totalWeightT.toFixed(3),
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Substructure_BBS_Schedule_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-fade-up space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
            Sheet 03 · Rebar Cutting & Weight Calculation Engine
          </div>
          <h1 className="font-heading text-[28px] font-bold text-[#051C2C] tracking-display mt-0.5">
            03_Reinforcement_Engine (Bar Bending Schedule / BBS)
          </h1>
          <p className="text-[13px] text-[#051C2C]/70 mt-1 max-w-3xl">
            Pure formula engine filtered from Sheet 02 where <code className="font-mono text-[#2251FF]">Main_Bar_Size &gt; 0</code>.
            Expands individual cut lengths, linear mass density, and applies a {(params.rebarWasteRate * 100).toFixed(1)}% site waste factor.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportBbsCsv}
            className="px-3.5 py-1.5 text-[12px] font-medium text-[#051C2C] bg-white border border-[#E8E8E6] rounded-md hover:bg-[#F5F5F2] flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#2251FF]" />
            <span>Export BBS Cutting Schedule (CSV)</span>
          </button>
        </div>
      </div>

      {/* Tonnage Rollup KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-surface p-4 bg-white">
          <div className="text-[11px] font-semibold text-[#888888] uppercase tracking-[0.06em]">
            Total Rebar Demand (Tonnes)
          </div>
          <div className="font-heading text-[32px] font-bold text-[#051C2C] tracking-display mt-0.5">
            {formatNumber(totalWeightT, 3)}{' '}
            <span className="text-[14px] font-normal text-[#888888]">t</span>
          </div>
          <div className="text-[11px] text-[#888888] mt-1">
            Incl. {(params.rebarWasteRate * 100).toFixed(1)}% waste ({formatNumber(totalNetKg / 1000, 3)} t net)
          </div>
        </div>

        <div className="card-surface p-4 bg-white">
          <div className="text-[11px] font-semibold text-[#888888] uppercase tracking-[0.06em]">
            Main Heavy Steel (Dia ≥ 16mm)
          </div>
          <div className="font-heading text-[32px] font-bold text-[#051C2C] tracking-display mt-0.5">
            {formatNumber(heavyRebarT, 3)}{' '}
            <span className="text-[14px] font-normal text-[#888888]">t</span>
          </div>
          <div className="text-[11px] text-[#888888] mt-1">
            BOQ Item 04.01 ({totalWeightT > 0 ? ((heavyRebarT / totalWeightT) * 100).toFixed(1) : 0}% of steel)
          </div>
        </div>

        <div className="card-surface p-4 bg-white">
          <div className="text-[11px] font-semibold text-[#888888] uppercase tracking-[0.06em]">
            Distribution & Ties (Dia &lt; 16mm)
          </div>
          <div className="font-heading text-[32px] font-bold text-[#051C2C] tracking-display mt-0.5">
            {formatNumber(lightRebarT, 3)}{' '}
            <span className="text-[14px] font-normal text-[#888888]">t</span>
          </div>
          <div className="text-[11px] text-[#888888] mt-1">
            BOQ Item 04.02 ({totalWeightT > 0 ? ((lightRebarT / totalWeightT) * 100).toFixed(1) : 0}% of steel)
          </div>
        </div>

        <div className="card-surface p-4 bg-white">
          <div className="text-[11px] font-semibold text-[#888888] uppercase tracking-[0.06em]">
            Total Linear Meters Extruded
          </div>
          <div className="font-heading text-[32px] font-bold text-[#051C2C] tracking-display mt-0.5">
            {formatNumber(totalLinearM, 1)}{' '}
            <span className="text-[14px] font-normal text-[#888888]">m</span>
          </div>
          <div className="text-[11px] text-[#888888] mt-1">
            Across {bbsItems.length} reinforced structure components
          </div>
        </div>
      </div>

      {/* Diameter Procurement Breakdown */}
      <div className="card-surface-static overflow-hidden">
        <div className="px-6 py-3.5 border-b border-[#E8E8E6] flex items-center justify-between bg-[rgba(5,28,44,0.02)]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-heading text-[17px] font-bold text-[#051C2C] tracking-heading">
              Diameter Specification Procurement Summary (Factory Mill Order)
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px] font-semibold text-[#051C2C] uppercase tracking-[0.06em]">
                <th className="py-2.5 px-4 w-[110px]">Bar Diameter</th>
                <th className="py-2.5 px-4 text-right">Total Bars</th>
                <th className="py-2.5 px-4 text-right">Total Length (m)</th>
                <th className="py-2.5 px-4 text-right">Theoretical Tonnage (t)</th>
                <th className="py-2.5 px-4 text-right">Procurement Rate</th>
                <th className="py-2.5 px-4 text-right">Estimated Steel Cost</th>
                <th className="py-2.5 px-4 w-[180px]">Proportion of Rebar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[12px]">
              {diameterSummary.map((sum) => (
                <tr key={sum.diameter} className="hover:bg-black/[0.02] transition-colors">
                  <td className="py-2.5 px-4 font-mono font-bold text-[#051C2C]">
                    Ø{sum.diameter} mm
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono">{formatNumber(sum.barCount, 0)}</td>
                  <td className="py-2.5 px-4 text-right font-mono">{formatNumber(sum.linearM, 1)} m</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-[#051C2C]">
                    {formatNumber(sum.tonnage, 3)} t
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-[#888888]">
                    {formatCurrency(sum.unitRate, params.currencySymbol, 2)}/t
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-[#2251FF]">
                    {formatCurrency(sum.estCost, params.currencySymbol, 2)}
                  </td>
                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="data-bar-track flex-1">
                        <div
                          className="data-bar-fill"
                          style={{ width: `${Math.min(sum.share, 100)}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono text-[#888888] w-12 text-right">
                        {sum.share.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Main BBS Detailed Table */}
      <div className="card-surface-static overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8E8E6] flex flex-wrap items-center justify-between gap-3 bg-[rgba(5,28,44,0.02)]">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-heading text-[17px] font-bold text-[#051C2C] tracking-heading">
              03_Reinforcement_Engine Dynamic Takeoff Log
            </h2>
            <span className="text-[11px] text-[#888888] ml-2">
              (Formula driven · Dynamic spill array simulation)
            </span>
          </div>

          <div className="flex items-center gap-2 text-[12px]">
            <span className="text-[#888888]">Filter by Bar Size:</span>
            <div className="flex bg-[#F5F5F2] p-0.5 rounded border border-[#E8E8E6]">
              <button
                onClick={() => setSelectedDiameter('ALL')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                  selectedDiameter === 'ALL'
                    ? 'bg-[#051C2C] text-white shadow-xs'
                    : 'text-[#051C2C]/70 hover:text-[#051C2C]'
                }`}
              >
                All
              </button>
              {diameters.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDiameter(d.toString())}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                    selectedDiameter === d.toString()
                      ? 'bg-[#051C2C] text-white shadow-xs'
                      : 'text-[#051C2C]/70 hover:text-[#051C2C]'
                  }`}
                >
                  Ø{d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px] font-semibold text-[#051C2C] uppercase tracking-[0.06em]">
                <th className="py-3 px-4 w-[110px]">A · Ref Element</th>
                <th className="py-3 px-4 w-[110px]">B · Category</th>
                <th className="py-3 px-4 w-[100px] text-right">C · Ø (mm)</th>
                <th className="py-3 px-4 w-[120px] text-right">D · Cut Length (m)</th>
                <th className="py-3 px-4 w-[110px] text-right">E · Total Bars</th>
                <th className="py-3 px-4 w-[130px] text-right">F · Linear (m)</th>
                <th className="py-3 px-4 w-[130px] text-right">G · Linear Mass (kg/m)</th>
                <th className="py-3 px-4 w-[130px] text-right">H · Net Mass (kg)</th>
                <th className="py-3 px-4 w-[150px] text-right">I · Total Weight (t)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[12px]">
              {filteredItems.map((item, idx) => {
                const isEven = idx % 2 === 0;
                const weightShare =
                  maxRowWeightT > 0 ? (item.totalWeightT / maxRowWeightT) * 100 : 0;

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-black/[0.02] transition-colors ${
                      isEven ? 'bg-white' : 'bg-[#F5F5F2]'
                    }`}
                  >
                    <td className="py-2.5 px-4 font-mono font-bold text-[#051C2C]">
                      {item.refElementId}
                    </td>
                    <td className="py-2.5 px-4 text-[#888888] font-medium">{item.category}</td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold text-[#051C2C]">
                      Ø{item.barDiameter}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono">
                      {formatNumber(item.cutLength, 2)} m
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono">
                      {formatNumber(item.totalBars, 0)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium text-[#051C2C]">
                      {formatNumber(item.totalLinearM, 1)} m
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-[#888888]">
                      {formatNumber(item.unitWeightKgM, 3)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono">
                      {formatNumber(item.netWeightKg, 1)} kg
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <div className="font-mono font-bold text-[#051C2C]">
                        {formatNumber(item.totalWeightT, 3)} t
                      </div>
                      <div className="data-bar-track mt-1 w-full ml-auto max-w-[80px]">
                        <div
                          className="data-bar-fill"
                          style={{ width: `${Math.min(weightShare, 100)}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-[rgba(5,28,44,0.06)] border-t-2 border-[#051C2C] font-semibold text-[#051C2C] text-[12px]">
                <td colSpan={4} className="py-3 px-4 uppercase tracking-[0.06em]">
                  Total BBS Schedule Aggregate ({filteredItems.length} components)
                </td>
                <td className="py-3 px-4 text-right font-mono">
                  {formatNumber(filteredItems.reduce((acc, i) => acc + i.totalBars, 0), 0)}
                </td>
                <td className="py-3 px-4 text-right font-mono">
                  {formatNumber(filteredItems.reduce((acc, i) => acc + i.totalLinearM, 0), 1)} m
                </td>
                <td className="py-3 px-4 text-right text-[#888888] font-mono">—</td>
                <td className="py-3 px-4 text-right font-mono">
                  {formatNumber(filteredItems.reduce((acc, i) => acc + i.netWeightKg, 0), 1)} kg
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold text-[14px] text-[#2251FF]">
                  {formatNumber(filteredItems.reduce((acc, i) => acc + i.totalWeightT, 0), 3)} t
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
