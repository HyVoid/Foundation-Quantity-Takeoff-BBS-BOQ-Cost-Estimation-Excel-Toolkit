import React from 'react';
import { CostDashboardMetrics, SystemParameters } from '../types';
import {
  BarChart3,
  TrendingUp,
  Boxes,
  Zap,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowUpRight,
  ShieldCheck,
  Scale,
  Award,
} from 'lucide-react';
import { formatNumber, formatCurrency } from '../utils/calculations';

interface CostDashboardSheetProps {
  metrics: CostDashboardMetrics;
  params: SystemParameters;
  onNavigateToTab: (tab: any) => void;
}

export const CostDashboardSheet: React.FC<CostDashboardSheetProps> = ({
  metrics,
  params,
  onNavigateToTab,
}) => {
  const {
    totalCost,
    concreteVolume,
    rebarTonnage,
    earthworkVolume,
    formworkArea,
    structuralConcreteVolume,
    rebarRatio,
    formworkToConcreteRatio,
    items,
  } = metrics;

  // Industry benchmark comparison for rebar ratio (kg/m³)
  // Standard range for substructure caps/beams is 110 ~ 150 kg/m³
  const isOptimal = rebarRatio >= 110 && rebarRatio <= 150;
  const isHeavy = rebarRatio > 150;
  const isLight = rebarRatio > 0 && rebarRatio < 110;

  // Maximum item amount for chart scaling
  const maxItemAmount = Math.max(...items.map((i) => i.totalAmount), 1);

  // Trade level rollup
  const trades = [
    {
      name: 'Concrete Works',
      amount: items
        .filter((i) => i.tradeCategory === 'Concrete')
        .reduce((sum, i) => sum + i.totalAmount, 0),
      color: '#051C2C',
    },
    {
      name: 'Reinforcing Steel (BBS)',
      amount: items
        .filter((i) => i.tradeCategory === 'Reinforcement')
        .reduce((sum, i) => sum + i.totalAmount, 0),
      color: '#2251FF',
    },
    {
      name: 'Formwork & Shuttering',
      amount: items
        .filter((i) => i.tradeCategory === 'Formwork')
        .reduce((sum, i) => sum + i.totalAmount, 0),
      color: '#4B6B94',
    },
    {
      name: 'Earthwork & Excavation',
      amount: items
        .filter((i) => i.tradeCategory === 'Earthwork')
        .reduce((sum, i) => sum + i.totalAmount, 0),
      color: '#888888',
    },
  ].map((t) => ({
    ...t,
    share: totalCost > 0 ? (t.amount / totalCost) * 100 : 0,
  }));

  return (
    <div className="animate-fade-up space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
            Sheet 05 · Executive Cost Analytics
          </div>
          <h1 className="font-heading text-[28px] font-bold text-[#051C2C] tracking-display mt-0.5">
            05_Cost_Dashboard (Executive Decision & Index Center)
          </h1>
          <p className="text-[13px] text-[#051C2C]/70 mt-1 max-w-3xl">
            High-level commercial telemetry designed for General Contractors and Chief Estimators.
            Monitors total contract sum, key material intensities, cost drivers, and design steel ratios.
          </p>
        </div>
      </div>

      {/* Region 1: Four Core KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Project Cost */}
        <div className="card-surface p-5 bg-white relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
              Total Estimated Substructure Cost
            </span>
            <div className="w-6 h-6 rounded-full bg-[rgba(34,81,255,0.08)] flex items-center justify-center text-[#2251FF]">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="font-heading text-[36px] font-bold text-[#051C2C] tracking-display mt-1">
            {formatCurrency(totalCost, params.currencySymbol, 0)}
          </div>
          <div className="text-[11px] text-[#888888] mt-2 flex items-center gap-1">
            <span>Cell '04_BOQ_Summary'!$F$11</span>
            <span>·</span>
            <span className="text-[#051C2C] font-semibold">100% Contract Value</span>
          </div>
        </div>

        {/* KPI 2: Total Concrete Volume */}
        <div className="card-surface p-5 bg-white relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
              Total Concrete Quantity
            </span>
            <div className="w-6 h-6 rounded-full bg-[rgba(5,28,44,0.06)] flex items-center justify-center text-[#051C2C]">
              <Boxes className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="font-heading text-[36px] font-bold text-[#051C2C] tracking-display mt-1">
            {formatNumber(concreteVolume, 1)}{' '}
            <span className="text-[16px] font-normal text-[#888888]">m³</span>
          </div>
          <div className="text-[11px] text-[#888888] mt-2">
            Piles + Caps + Ground Beams + Columns
          </div>
        </div>

        {/* KPI 3: Total Steel Rebar Tonnage */}
        <div className="card-surface p-5 bg-white relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
              Total BBS Rebar Tonnage
            </span>
            <div className="w-6 h-6 rounded-full bg-[rgba(34,81,255,0.08)] flex items-center justify-center text-[#2251FF]">
              <Scale className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="font-heading text-[36px] font-bold text-[#051C2C] tracking-display mt-1">
            {formatNumber(rebarTonnage, 2)}{' '}
            <span className="text-[16px] font-normal text-[#888888]">t</span>
          </div>
          <div className="text-[11px] text-[#888888] mt-2">
            Incl. {(params.rebarWasteRate * 100).toFixed(1)}% site lap & cutting waste
          </div>
        </div>

        {/* KPI 4: Total Earthwork Excavation */}
        <div className="card-surface p-5 bg-white relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
              Pit & Trench Excavation
            </span>
            <div className="w-6 h-6 rounded-full bg-[rgba(5,28,44,0.06)] flex items-center justify-center text-[#051C2C]">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="font-heading text-[36px] font-bold text-[#051C2C] tracking-display mt-1">
            {formatNumber(earthworkVolume, 0)}{' '}
            <span className="text-[16px] font-normal text-[#888888]">m³</span>
          </div>
          <div className="text-[11px] text-[#888888] mt-2">
            Bulked by {params.earthworkFactor}x slope & berm coefficient
          </div>
        </div>
      </div>

      {/* Region 3: Structural Technical Economic Indicators & Benchmark Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Steel Density Indicator Card */}
        <div className="card-surface p-5 bg-white lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
                Structural Benchmark Check (Life-Line Metric)
              </div>
              <h2 className="font-heading text-[20px] font-bold text-[#051C2C] tracking-heading mt-0.5">
                Steel Rebar Intensity per m³ of Structural Concrete
              </h2>
            </div>
            <div className="text-right">
              <span
                className={`status-pill ${
                  isOptimal
                    ? 'status-pill-pass'
                    : isHeavy
                    ? 'status-pill-warning'
                    : 'status-pill-warning'
                }`}
              >
                {isOptimal ? 'Optimal Benchmark' : isHeavy ? 'High Reinforcement' : 'Light Density'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 items-center">
            <div>
              <div className="text-[11px] text-[#888888] uppercase tracking-wider font-semibold">
                Actual Measured Ratio
              </div>
              <div className="font-heading text-[38px] font-bold text-[#2251FF] tracking-display mt-0.5">
                {formatNumber(rebarRatio, 1)}{' '}
                <span className="text-[16px] font-normal text-[#051C2C]">kg/m³</span>
              </div>
              <div className="text-[11px] text-[#888888] mt-1 font-mono">
                Formula C15: (Rebar_t × 1000) / Struct_Conc_m³
              </div>
            </div>

            <div className="sm:col-span-2 bg-[#F5F5F2] p-4 rounded-lg border border-[#E8E8E6]">
              <div className="flex items-center justify-between text-[12px] mb-1.5 font-medium">
                <span className="text-[#888888]">Industry Substructure Benchmark:</span>
                <span className="font-bold text-[#051C2C]">110 ~ 150 kg/m³</span>
              </div>

              {/* Gauge Bar */}
              <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                {/* Benchmark Zone: 110 to 150 */}
                <div
                  className="absolute top-0 bottom-0 bg-emerald-200"
                  style={{ left: '35%', width: '30%' }}
                  title="Optimal Zone (110 - 150 kg/m³)"
                />
                {/* Pointer marker */}
                <div
                  className="absolute top-0 bottom-0 w-1.5 bg-[#051C2C] shadow-sm rounded"
                  style={{
                    left: `${Math.min(Math.max((rebarRatio / 220) * 100, 2), 98)}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#888888] font-mono mt-1">
                <span>0 kg/m³</span>
                <span className="font-semibold text-emerald-800">110 (Min Std)</span>
                <span className="font-semibold text-emerald-800">150 (Max Std)</span>
                <span>220+ kg/m³</span>
              </div>

              <div className="text-[12px] text-[#051C2C]/80 mt-3 leading-relaxed">
                {isOptimal ? (
                  <span>
                    ✓ <strong>Well-Proportioned Design:</strong> Measured steel content of {rebarRatio.toFixed(1)} kg/m³ aligns directly within the expected economic sweet spot (110–150 kg/m³) for pile caps and ground beams.
                  </span>
                ) : isHeavy ? (
                  <span>
                    ⚠ <strong>Heavy Steel Alert:</strong> Steel ratio exceeds 150 kg/m³. Verify if heavy seismic starter hooks or extra top-mat bars are required, or optimize bar layouts to reduce tender cost.
                  </span>
                ) : (
                  <span>
                    ℹ <strong>Low Steel Ratio:</strong> Measured ratio is under 110 kg/m³. Verify if distribution links and pile cap top mats have been entered in 02_Qty_Input.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Secondary Technical Ratio */}
        <div className="card-surface p-5 bg-white flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
              Formwork Density Indicator
            </div>
            <h3 className="font-heading text-[18px] font-bold text-[#051C2C] tracking-heading mt-0.5">
              Formwork-to-Concrete Ratio
            </h3>
            <div className="font-heading text-[32px] font-bold text-[#051C2C] tracking-display mt-2">
              {formatNumber(formworkToConcreteRatio, 2)}{' '}
              <span className="text-[16px] font-normal text-[#888888]">m²/m³</span>
            </div>
            <div className="text-[12px] text-[#888888] mt-1">
              Contact surface per unit of structural volume ({formatNumber(formworkArea, 1)} m² / {formatNumber(structuralConcreteVolume, 1)} m³)
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E8E8E6] text-[12px] text-[#051C2C]/75">
            Typical range for substructure ground beams and caps is 1.8 to 3.2 m²/m³. Higher ratios indicate slender beams requiring higher shuttering labor.
          </div>
        </div>
      </div>

      {/* Region 2: Cost Structure Breakdown Table & Visual Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Detailed Sub-Item Extension Table */}
        <div className="lg:col-span-7 card-surface-static overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#E8E8E6] flex items-center justify-between bg-[rgba(5,28,44,0.02)]">
            <h2 className="font-heading text-[17px] font-bold text-[#051C2C] tracking-heading">
              Cost Structure Breakdown (Itemized Contribution)
            </h2>
            <button
              onClick={() => onNavigateToTab('boq_summary')}
              className="text-[11px] font-medium text-[#2251FF] hover:underline flex items-center gap-1"
            >
              <span>View Full BOQ</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px] font-semibold text-[#051C2C] uppercase tracking-[0.06em]">
                  <th className="py-2.5 px-4 w-[70px]">Item</th>
                  <th className="py-2.5 px-4">Description</th>
                  <th className="py-2.5 px-4 text-right">Amount</th>
                  <th className="py-2.5 px-4 w-[160px]">Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E6] text-[12px]">
                {items.map((item) => (
                  <tr key={item.itemNo} className="hover:bg-black/[0.02] transition-colors">
                    <td className="py-2.5 px-4 font-mono font-bold text-[#2251FF]">
                      {item.itemNo}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-[#051C2C]">
                      {item.description}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-[#051C2C]">
                      {formatCurrency(item.totalAmount, params.currencySymbol, 0)}
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="data-bar-track flex-1">
                          <div
                            className="data-bar-fill"
                            style={{ width: `${Math.min(item.share, 100)}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-[#888888] w-12 text-right">
                          {item.share.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Visual Trade Proportions */}
        <div className="lg:col-span-5 card-surface p-5 bg-white flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
              Trade Composition
            </div>
            <h3 className="font-heading text-[18px] font-bold text-[#051C2C] tracking-heading mt-0.5">
              Substructure Cost Distribution by Trade
            </h3>

            <div className="space-y-3.5 mt-5">
              {trades.map((t) => (
                <div key={t.name}>
                  <div className="flex items-center justify-between text-[12px] mb-1">
                    <span className="font-medium text-[#051C2C]">{t.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#888888]">
                        {formatCurrency(t.amount, params.currencySymbol, 0)}
                      </span>
                      <span className="font-mono font-bold text-[#051C2C] w-12 text-right">
                        {t.share.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="data-bar-track h-2">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(t.share, 100)}%`,
                        backgroundColor: t.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3.5 rounded-lg bg-[rgba(34,81,255,0.04)] border-l-3 border-[#2251FF] text-[12px] text-[#051C2C] leading-relaxed">
            <span className="font-bold text-[#051C2C]">Commercial Tendering Takeaway: </span>
            Reinforcing steel and structural concrete represent{' '}
            <strong>
              {(
                (trades.find((t) => t.name.includes('Concrete'))?.share || 0) +
                (trades.find((t) => t.name.includes('Steel'))?.share || 0)
              ).toFixed(1)}
              %
            </strong>{' '}
            of total substructure expenditure. Material index hedging on HRB steel coils and ready-mix concrete suppliers offers the greatest margin protection.
          </div>
        </div>
      </div>
    </div>
  );
};
