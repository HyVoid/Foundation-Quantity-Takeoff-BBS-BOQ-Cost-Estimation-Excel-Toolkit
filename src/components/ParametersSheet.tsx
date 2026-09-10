import React from 'react';
import { SystemParameters } from '../types';
import { Settings, Info, RefreshCw, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

interface ParametersSheetProps {
  params: SystemParameters;
  onUpdateParam: <K extends keyof SystemParameters>(key: K, value: SystemParameters[K]) => void;
  onResetDefaults: () => void;
}

export const ParametersSheet: React.FC<ParametersSheetProps> = ({
  params,
  onUpdateParam,
  onResetDefaults,
}) => {
  const currencyOptions = ['$', '¥', '€', '£', 'S$'];

  const rows: Array<{
    cell: string;
    code: string;
    name: string;
    key: keyof SystemParameters;
    type: 'text' | 'number' | 'percent';
    format: string;
    description: string;
    unit: string;
    step?: string;
  }> = [
    {
      cell: 'B4',
      code: 'CURR_SYM',
      name: 'Global Currency Symbol',
      key: 'currencySymbol',
      type: 'text',
      format: '@',
      description: 'Used dynamically across all BOQ extensions, unit rates, and dashboard analytics.',
      unit: 'symbol',
    },
    {
      cell: 'B5',
      code: 'PRC_CONC',
      name: 'Structural Concrete Unit Rate',
      key: 'priceConcrete',
      type: 'number',
      format: '[CURR]#,##0.00',
      description: 'Comprehensive purchase, pumping, and placement rate for C30/C35 structural concrete.',
      unit: `${params.currencySymbol}/m³`,
      step: '10',
    },
    {
      cell: 'B6',
      code: 'PRC_EXCA',
      name: 'Earthwork Excavation Unit Rate',
      key: 'priceEarthwork',
      type: 'number',
      format: '[CURR]#,##0.00',
      description: 'Mechanical trench and pit bulk excavation, loading, and disposal within 10km radius.',
      unit: `${params.currencySymbol}/m³`,
      step: '1',
    },
    {
      cell: 'B7',
      code: 'PRC_FORM',
      name: 'Foundation Formwork Unit Rate',
      key: 'priceFormwork',
      type: 'number',
      format: '[CURR]#,##0.00',
      description: 'Supply, erection, propping, and stripping of vertical timber/plywood contact side forms.',
      unit: `${params.currencySymbol}/m²`,
      step: '1',
    },
    {
      cell: 'B8',
      code: 'PRC_RE_8',
      name: '8mm Rebar (Stirrups/Ties) Unit Rate',
      key: 'priceRebar8',
      type: 'number',
      format: '[CURR]#,##0.00',
      description: 'Coil rod/rebar HRB400/500 fabrication, cutting, bending, and fixing on site.',
      unit: `${params.currencySymbol}/t`,
      step: '50',
    },
    {
      cell: 'B9',
      code: 'PRC_RE_12',
      name: '12mm Rebar (Distribution) Unit Rate',
      key: 'priceRebar12',
      type: 'number',
      format: '[CURR]#,##0.00',
      description: 'Medium diameter secondary rebar and temperature reinforcement fabrication and fixing.',
      unit: `${params.currencySymbol}/t`,
      step: '50',
    },
    {
      cell: 'B10',
      code: 'PRC_RE_16',
      name: '16mm+ Rebar (Main Bars) Unit Rate',
      key: 'priceRebar16',
      type: 'number',
      format: '[CURR]#,##0.00',
      description: 'Heavy structural bar (16mm to 32mm) fabrication, crane hoist, lap splices, and placement.',
      unit: `${params.currencySymbol}/t`,
      step: '50',
    },
    {
      cell: 'B11',
      code: 'STEEL_DEN',
      name: 'Theoretical Rebar Mass Constant',
      key: 'steelDensity',
      type: 'number',
      format: '0.000000',
      description: 'Formula constant for nominal mass: W = 0.006165 × d² (kg/m), standard ISO/GB structural steel.',
      unit: 'constant',
      step: '0.000001',
    },
    {
      cell: 'B12',
      code: 'RE_WASTE',
      name: 'Reinforcing Steel Waste & Lap Allowance',
      key: 'rebarWasteRate',
      type: 'percent',
      format: '0.0%',
      description: 'Comprehensive allowance factoring cutting off-cuts, lap splices, and mechanical couplings.',
      unit: '% (e.g. 3.0%)',
      step: '0.5',
    },
    {
      cell: 'B13',
      code: 'EXCA_FACTOR',
      name: 'Earthwork Slope & Working Space Factor',
      key: 'earthworkFactor',
      type: 'number',
      format: '0.00',
      description: 'Multiplication coefficient applied to geometric pit prism to account for side slope (1:0.33) and working berm.',
      unit: 'multiplier',
      step: '0.05',
    },
  ];

  return (
    <div className="animate-fade-up space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
            Sheet 01 · Global Configuration Hub
          </div>
          <h1 className="font-heading text-[28px] font-bold text-[#051C2C] tracking-display mt-0.5">
            01_Parameters (Parameter Configuration Dictionary)
          </h1>
          <p className="text-[13px] text-[#051C2C]/70 mt-1 max-w-3xl">
            Centralized repository for financial rates, nominal density constants, and physical factors.
            Modifications propagate instantaneously across Qty Input, BBS Engine, and BOQ Cost Summaries without formula hardcoding.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onResetDefaults}
            className="px-3 py-1.5 text-[12px] font-medium text-[#051C2C] bg-white border border-[#E8E8E6] rounded-md hover:bg-[#F5F5F2] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Parameter Defaults</span>
          </button>
        </div>
      </div>

      {/* Insight Callout */}
      <div className="insight-block">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#2251FF] mt-0.5 shrink-0" />
          <div className="text-[12px] text-[#051C2C] leading-relaxed">
            <span className="font-semibold text-[#051C2C]">Zero Magic Numbers Mandate: </span>
            In strict compliance with modern engineering estimation standards, all workbook formulas dynamically reference coordinates{' '}
            <code className="bg-white/80 px-1 py-0.5 rounded text-[11px] font-mono text-[#2251FF] font-semibold">
              '01_Parameters'!$B$4:$B$13
            </code>.
            Changing any unit price or steel density recalculates the full Bill of Quantities immediately.
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card-surface-static overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8E8E6] flex items-center justify-between bg-[rgba(5,28,44,0.02)]">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-heading text-[18px] font-bold text-[#051C2C] tracking-heading">
              Configured Parameters Dictionary
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[12px]">
            <span className="text-[#888888]">Quick Currency:</span>
            <div className="flex bg-[#F5F5F2] p-0.5 rounded border border-[#E8E8E6]">
              {currencyOptions.map((sym) => (
                <button
                  key={sym}
                  onClick={() => onUpdateParam('currencySymbol', sym)}
                  className={`px-2 py-0.5 rounded text-[12px] font-semibold transition-all ${
                    params.currencySymbol === sym
                      ? 'bg-[#051C2C] text-white shadow-xs'
                      : 'text-[#051C2C]/70 hover:text-[#051C2C]'
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[12px] font-semibold text-[#051C2C] uppercase tracking-[0.06em]">
                <th className="py-3 px-4 w-[80px]">Cell</th>
                <th className="py-3 px-4 w-[130px]">Code</th>
                <th className="py-3 px-4">Parameter Name</th>
                <th className="py-3 px-4 w-[110px]">Type</th>
                <th className="py-3 px-4 w-[180px] text-right">Configured Value</th>
                <th className="py-3 px-4 w-[120px]">Unit</th>
                <th className="py-3 px-4">Engineering Scope & Calculation Guidance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
              {rows.map((r, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <tr
                    key={r.cell}
                    className={`transition-colors hover:bg-black/[0.02] ${
                      isEven ? 'bg-[#FFFFFF]' : 'bg-[#F5F5F2]'
                    }`}
                  >
                    <td className="py-3 px-4 font-mono text-[12px] font-semibold text-[#2251FF]">
                      {r.cell}
                    </td>
                    <td className="py-3 px-4 font-mono text-[12px] font-bold text-[#051C2C]">
                      {r.code}
                    </td>
                    <td className="py-3 px-4 font-medium text-[#051C2C]">
                      {r.name}
                    </td>
                    <td className="py-3 px-4 text-[#888888] text-[12px] font-mono">
                      {r.format}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {r.type === 'text' ? (
                        <input
                          type="text"
                          value={params.currencySymbol}
                          onChange={(e) => onUpdateParam('currencySymbol', e.target.value)}
                          className="input-editable w-24 text-center font-bold font-mono text-[14px] text-[#051C2C]"
                        />
                      ) : r.type === 'percent' ? (
                        <div className="inline-flex items-center gap-1 justify-end">
                          <input
                            type="number"
                            step={r.step || '0.1'}
                            value={(params.rebarWasteRate * 100).toFixed(1)}
                            onChange={(e) =>
                              onUpdateParam('rebarWasteRate', (parseFloat(e.target.value) || 0) / 100)
                            }
                            className="input-editable w-24 text-right font-mono text-[13px] text-[#051C2C]"
                          />
                          <span className="font-mono text-[13px] text-[#888888]">%</span>
                        </div>
                      ) : (
                        <input
                          type="number"
                          step={r.step || '1'}
                          value={params[r.key] as number}
                          onChange={(e) =>
                            onUpdateParam(r.key, parseFloat(e.target.value) || 0)
                          }
                          className="input-editable w-32 text-right font-mono text-[13px] font-medium text-[#051C2C]"
                        />
                      )}
                    </td>
                    <td className="py-3 px-4 text-[12px] text-[#888888] font-medium">
                      {r.unit}
                    </td>
                    <td className="py-3 px-4 text-[12px] text-[#051C2C]/75 leading-snug">
                      {r.description}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Reference Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="card-surface p-4 bg-white">
          <div className="text-[11px] font-semibold text-[#888888] uppercase tracking-[0.06em]">
            Rebar Linear Weight Formula
          </div>
          <div className="font-mono text-[14px] font-bold text-[#051C2C] mt-1">
            W = {params.steelDensity} × d² (kg/m)
          </div>
          <div className="text-[11px] text-[#888888] mt-1">
            e.g. Ø16: {(params.steelDensity * 16 * 16).toFixed(3)} kg/m · Ø25:{' '}
            {(params.steelDensity * 25 * 25).toFixed(3)} kg/m
          </div>
        </div>

        <div className="card-surface p-4 bg-white">
          <div className="text-[11px] font-semibold text-[#888888] uppercase tracking-[0.06em]">
            Rebar Waste & Lap Factor
          </div>
          <div className="font-mono text-[14px] font-bold text-[#051C2C] mt-1">
            (1 + {(params.rebarWasteRate * 100).toFixed(1)}%) = {(1 + params.rebarWasteRate).toFixed(3)}
          </div>
          <div className="text-[11px] text-[#888888] mt-1">
            Applied in BBS engine before exporting procurement tonnage
          </div>
        </div>

        <div className="card-surface p-4 bg-white">
          <div className="text-[11px] font-semibold text-[#888888] uppercase tracking-[0.06em]">
            Excavation Berm & Slope
          </div>
          <div className="font-mono text-[14px] font-bold text-[#051C2C] mt-1">
            Bulk Multiplier: {params.earthworkFactor.toFixed(2)}x
          </div>
          <div className="text-[11px] text-[#888888] mt-1">
            Auto-expands raw prism excavation for soil swell & working ramp
          </div>
        </div>
      </div>
    </div>
  );
};
