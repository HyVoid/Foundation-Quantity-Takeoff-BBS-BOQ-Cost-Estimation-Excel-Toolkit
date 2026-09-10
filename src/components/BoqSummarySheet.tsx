import React from 'react';
import { BOQItem, SystemParameters } from '../types';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Info,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { formatNumber, formatCurrency } from '../utils/calculations';

interface BoqSummarySheetProps {
  boqItems: BOQItem[];
  params: SystemParameters;
  onNavigateToTab?: (tab: any) => void;
}

export const BoqSummarySheet: React.FC<BoqSummarySheetProps> = ({
  boqItems,
  params,
  onNavigateToTab,
}) => {
  const totalAmount = boqItems.reduce((sum, item) => sum + item.totalAmount, 0);

  const exportBoqCsv = () => {
    const headers = ['Item_No', 'Description', 'Unit', 'Quantity', 'Unit_Rate', 'Total_Amount', 'Trade'];
    const rows = boqItems.map((b) => [
      b.itemNo,
      `"${b.description.replace(/"/g, '""')}"`,
      b.unit,
      b.quantity.toFixed(2),
      b.unitRate.toFixed(2),
      b.totalAmount.toFixed(2),
      b.tradeCategory,
    ]);
    const summaryRow = ['TOTAL', '"Grand Total Contract Value"', '', '', '', totalAmount.toFixed(2), ''];
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(',')), summaryRow.join(',')].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Substructure_BOQ_Bill_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fade-up space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
            Sheet 04 · Commercial Bill of Quantities
          </div>
          <h1 className="font-heading text-[28px] font-bold text-[#051C2C] tracking-display mt-0.5">
            04_BOQ_Summary (Standard Engineering Bill & Commercial Pricing)
          </h1>
          <p className="text-[13px] text-[#051C2C]/70 mt-1 max-w-3xl">
            Standard civil works breakdown dynamically aggregating takeoff quantities and linking live unit prices from Sheet 01.
            Generates the contract tender schedule and total bid estimate without manual intervention.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 text-[12px] font-medium text-[#051C2C] bg-white border border-[#E8E8E6] rounded-md hover:bg-[#F5F5F2] flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Contract Schedule</span>
          </button>
          <button
            onClick={exportBoqCsv}
            className="px-3.5 py-1.5 text-[12px] font-semibold text-white bg-[#051C2C] hover:bg-[#051C2C]/90 rounded-md flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#2251FF]" />
            <span>Export BOQ (CSV)</span>
          </button>
        </div>
      </div>

      {/* Insight Banner */}
      <div className="insight-block">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#2251FF] mt-0.5 shrink-0" />
          <div className="text-[12px] text-[#051C2C] leading-relaxed">
            <span className="font-semibold text-[#051C2C]">Zero Maintenance Dynamic Aggregation: </span>
            Whether the underlying measurement sheet (02_Qty_Input) has 10 lines or 10,000 lines, this BOQ dynamically compiles items via{' '}
            <code className="bg-white/80 px-1 py-0.5 rounded text-[11px] font-mono text-[#2251FF]">
              SUMIFS('02_Qty_Input'!M:M, '02_Qty_Input'!C:C, [Trade])
            </code>
            {' '}and connects to parameters in{' '}
            <code className="bg-white/80 px-1 py-0.5 rounded text-[11px] font-mono text-[#2251FF]">
              '01_Parameters'!$B$5:$B$10
            </code>.
          </div>
        </div>
      </div>

      {/* Main BOQ Table */}
      <div className="card-surface-static overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8E8E6] flex items-center justify-between bg-[rgba(5,28,44,0.02)]">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-heading text-[18px] font-bold text-[#051C2C] tracking-heading">
              Substructure Civil Bill of Quantities (Pricing Schedule)
            </h2>
          </div>
          <div className="text-[12px] text-[#888888]">
            Currency: <span className="font-bold text-[#051C2C]">{params.currencySymbol}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px] font-semibold text-[#051C2C] uppercase tracking-[0.06em]">
                <th className="py-3 px-4 w-[90px]">Item No</th>
                <th className="py-3 px-4">Item Description & Work Scope</th>
                <th className="py-3 px-3 w-[70px] text-center">Unit</th>
                <th className="py-3 px-4 w-[130px] text-right">Quantity</th>
                <th className="py-3 px-4 w-[140px] text-right">Unit Rate</th>
                <th className="py-3 px-4 w-[170px] text-right">Total Amount</th>
                <th className="py-3 px-4 w-[160px]">Cost Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
              {boqItems.map((item, idx) => {
                const share = totalAmount > 0 ? (item.totalAmount / totalAmount) * 100 : 0;
                const isEven = idx % 2 === 0;

                return (
                  <tr
                    key={item.itemNo}
                    className={`hover:bg-black/[0.02] transition-colors ${
                      isEven ? 'bg-white' : 'bg-[#F5F5F2]'
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-[#2251FF]">
                      {item.itemNo}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-[#051C2C]">{item.description}</div>
                      <div className="text-[11px] text-[#888888] mt-0.5 flex items-center gap-1.5 font-mono">
                        <span>Trade: {item.tradeCategory}</span>
                        <span>·</span>
                        <span>Excel Cell: D{5 + idx} × E{5 + idx}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-medium text-[#051C2C]">
                      {item.unit}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-[#051C2C]">
                      {formatNumber(item.quantity, 2)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-[#051C2C]">
                      {formatCurrency(item.unitRate, params.currencySymbol, 2)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-[14px] text-[#051C2C]">
                      {formatCurrency(item.totalAmount, params.currencySymbol, 2)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="data-bar-track flex-1">
                          <div
                            className="data-bar-fill"
                            style={{ width: `${Math.min(share, 100)}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-[#888888] w-12 text-right">
                          {share.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-[rgba(5,28,44,0.06)] border-t-2 border-[#051C2C] text-[13px]">
                <td colSpan={5} className="py-4 px-4 font-bold text-[#051C2C] uppercase tracking-wider">
                  <div className="flex items-center justify-between">
                    <span>Grand Total Substructure Contract Price (Excel Cell F11: =SUM(F5:F10))</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right font-mono font-bold text-[18px] text-[#2251FF]">
                  {formatCurrency(totalAmount, params.currencySymbol, 2)}
                </td>
                <td className="py-4 px-4 font-mono text-[12px] font-bold text-[#051C2C]">
                  100.0%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Trade Cost Breakdown Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {['Earthwork', 'Concrete', 'Formwork', 'Reinforcement'].map((trade) => {
          const tradeItems = boqItems.filter((i) => i.tradeCategory === trade);
          const tradeTotal = tradeItems.reduce((acc, i) => acc + i.totalAmount, 0);
          const tradeShare = totalAmount > 0 ? (tradeTotal / totalAmount) * 100 : 0;

          return (
            <div key={trade} className="card-surface p-4 bg-white">
              <div className="text-[11px] font-semibold text-[#888888] uppercase tracking-[0.06em]">
                {trade} Sub-Total
              </div>
              <div className="font-heading text-[22px] font-bold text-[#051C2C] tracking-heading mt-1">
                {formatCurrency(tradeTotal, params.currencySymbol, 0)}
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#888888] mt-2">
                <span>Contribution</span>
                <span className="font-mono font-bold text-[#051C2C]">{tradeShare.toFixed(1)}%</span>
              </div>
              <div className="data-bar-track mt-1 w-full">
                <div
                  className="data-bar-fill"
                  style={{ width: `${Math.min(tradeShare, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
