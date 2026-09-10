import React, { useState } from 'react';
import {
  QtyInputRow,
  ComputedQtyRow,
  ElementCategory,
  SystemParameters,
} from '../types';
import {
  Plus,
  Copy,
  Trash2,
  Search,
  Filter,
  Layers,
  ArrowUpDown,
  Download,
  Info,
} from 'lucide-react';
import { formatNumber } from '../utils/calculations';

interface QtyInputSheetProps {
  rows: ComputedQtyRow[];
  params: SystemParameters;
  onAddRow: () => void;
  onDuplicateRow: (id: string) => void;
  onDeleteRow: (id: string) => void;
  onUpdateRow: (id: string, updates: Partial<QtyInputRow>) => void;
  onOpenCsvModal: () => void;
}

export const QtyInputSheet: React.FC<QtyInputSheetProps> = ({
  rows,
  params,
  onAddRow,
  onDuplicateRow,
  onDeleteRow,
  onUpdateRow,
  onOpenCsvModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const categories: ElementCategory[] = ['Pile Cap', 'Pile', 'Beam', 'Column', 'Earthwork'];

  const filteredRows = rows.filter((r) => {
    const matchesSearch =
      r.elementId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.planswiftRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.stirrupSpec.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || r.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  // Calculate maximum values for inline data bars
  const maxTotalVol = Math.max(...rows.map((r) => r.totalVol), 1);
  const maxTotalForm = Math.max(...rows.map((r) => r.totalForm), 1);
  const maxRebarLen = Math.max(...rows.map((r) => r.totalRebarLen), 1);

  // Totals for table footer
  const totalVolumeSum = rows.reduce((sum, r) => sum + r.totalVol, 0);
  const totalFormSum = rows.reduce((sum, r) => sum + r.totalForm, 0);
  const totalRebarLenSum = rows.reduce((sum, r) => sum + r.totalRebarLen, 0);

  return (
    <div className="animate-fade-up space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
            Sheet 02 · Takeoff & Geometry Data Engine
          </div>
          <h1 className="font-heading text-[28px] font-bold text-[#051C2C] tracking-display mt-0.5">
            02_Qty_Input (Measurement Schedule & Geometry Engine)
          </h1>
          <p className="text-[13px] text-[#051C2C]/70 mt-1 max-w-3xl">
            Single entry point for Planswift markup items or CAD measurements.
            Editable columns (A–K, highlighted in yellow) automatically drive formula columns (L–P) in real-time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCsvModal}
            className="px-3 py-1.5 text-[12px] font-medium text-[#051C2C] bg-white border border-[#E8E8E6] rounded-md hover:bg-[#F5F5F2] flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#2251FF]" />
            <span>Bulk CSV Import</span>
          </button>
          <button
            onClick={onAddRow}
            className="px-3.5 py-1.5 text-[12px] font-semibold text-white bg-[#051C2C] hover:bg-[#051C2C]/90 rounded-md flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Takeoff Row</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-lg border border-[#E8E8E6] shadow-sm">
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-[#888888] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Element ID, Planswift Ref..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-[12px] border border-[#E8E8E6] rounded-md bg-[#F5F5F2] focus:bg-white focus:outline-none focus:border-[#2251FF]"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-[#888888] uppercase tracking-wider">
              Category:
            </span>
            <div className="flex bg-[#F5F5F2] p-0.5 rounded border border-[#E8E8E6]">
              <button
                onClick={() => setCategoryFilter('ALL')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                  categoryFilter === 'ALL'
                    ? 'bg-[#051C2C] text-white shadow-xs'
                    : 'text-[#051C2C]/70 hover:text-[#051C2C]'
                }`}
              >
                All ({rows.length})
              </button>
              {categories.map((cat) => {
                const count = rows.filter((r) => r.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                      categoryFilter === cat
                        ? 'bg-[#051C2C] text-white shadow-xs'
                        : 'text-[#051C2C]/70 hover:text-[#051C2C]'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-[12px] text-[#888888]">
          Displaying <span className="font-semibold text-[#051C2C]">{filteredRows.length}</span> of{' '}
          {rows.length} components
        </div>
      </div>

      {/* Main Takeoff Table */}
      <div className="card-surface-static overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1300px]">
            <thead>
              {/* Dual-Header tier */}
              <tr className="border-b border-[#E8E8E6] text-[11px] uppercase tracking-wider font-semibold">
                <th
                  colSpan={11}
                  className="py-2 px-4 bg-emerald-50/70 text-emerald-950 border-r border-[#E8E8E6]"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Manual Input Area (Cols A ~ K) · Planswift Geometry & Rebar Data</span>
                  </div>
                </th>
                <th
                  colSpan={5}
                  className="py-2 px-4 bg-slate-100/80 text-slate-800 border-r border-[#E8E8E6]"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#2251FF]"></span>
                    <span>Formula Generated Engine (Cols L ~ P) · Zero-Maintenance Real-Time</span>
                  </div>
                </th>
                <th className="py-2 px-3 bg-white text-center w-[70px]">Action</th>
              </tr>

              {/* Column labels row */}
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px] font-semibold text-[#051C2C] uppercase tracking-[0.06em]">
                {/* A */}
                <th className="py-2.5 px-3 w-[100px]">
                  <div className="flex items-center gap-1">
                    <span>A · ID</span>
                  </div>
                </th>
                {/* B */}
                <th className="py-2.5 px-3 w-[110px]">B · Planswift Ref</th>
                {/* C */}
                <th className="py-2.5 px-3 w-[115px]">C · Category</th>
                {/* D */}
                <th className="py-2.5 px-2 w-[75px] text-right">D · L (m)</th>
                {/* E */}
                <th className="py-2.5 px-2 w-[75px] text-right">E · W (m)</th>
                {/* F */}
                <th className="py-2.5 px-2 w-[85px] text-right">F · H/D (m)</th>
                {/* G */}
                <th className="py-2.5 px-2 w-[75px] text-right">G · Dia (m)</th>
                {/* H */}
                <th className="py-2.5 px-2 w-[65px] text-right">H · Count</th>
                {/* I */}
                <th className="py-2.5 px-2 w-[75px] text-right">I · Ø (mm)</th>
                {/* J */}
                <th className="py-2.5 px-2 w-[65px] text-right">J · Bars</th>
                {/* K */}
                <th className="py-2.5 px-3 w-[90px]">K · Links</th>

                {/* Formula Columns L-P */}
                {/* L */}
                <th className="py-2.5 px-3 w-[95px] text-right bg-slate-50/50">L · Vol (m³)</th>
                {/* M */}
                <th className="py-2.5 px-3 w-[120px] text-right bg-slate-50/50">M · Tot Vol (m³)</th>
                {/* N */}
                <th className="py-2.5 px-3 w-[95px] text-right bg-slate-50/50">N · Form (m²)</th>
                {/* O */}
                <th className="py-2.5 px-3 w-[120px] text-right bg-slate-50/50">O · Tot Form (m²)</th>
                {/* P */}
                <th className="py-2.5 px-3 w-[130px] text-right bg-slate-50/50">P · Rebar (m)</th>

                <th className="py-2.5 px-2 text-center w-[70px]">Ctrl</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E8E8E6] text-[12px]">
              {filteredRows.map((row, idx) => {
                const isEven = idx % 2 === 0;
                const volShare = maxTotalVol > 0 ? (row.totalVol / maxTotalVol) * 100 : 0;
                const formShare = maxTotalForm > 0 ? (row.totalForm / maxTotalForm) * 100 : 0;
                const rebarShare = maxRebarLen > 0 ? (row.totalRebarLen / maxRebarLen) * 100 : 0;

                return (
                  <tr
                    key={row.id}
                    className={`transition-colors hover:bg-amber-50/30 ${
                      isEven ? 'bg-white' : 'bg-[#F5F5F2]'
                    }`}
                  >
                    {/* A: Element ID */}
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={row.elementId}
                        onChange={(e) => onUpdateRow(row.id, { elementId: e.target.value })}
                        className="input-editable w-full font-mono text-[12px] font-bold text-[#051C2C]"
                      />
                    </td>

                    {/* B: Planswift Ref */}
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={row.planswiftRef}
                        onChange={(e) => onUpdateRow(row.id, { planswiftRef: e.target.value })}
                        className="input-editable w-full text-[11px] font-mono text-[#051C2C]"
                      />
                    </td>

                    {/* C: Category */}
                    <td className="py-2 px-3">
                      <select
                        value={row.category}
                        onChange={(e) =>
                          onUpdateRow(row.id, { category: e.target.value as ElementCategory })
                        }
                        className="input-editable w-full text-[11px] font-medium text-[#051C2C] bg-[#FFFDE7]"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* D: Length */}
                    <td className="py-2 px-2 text-right">
                      <input
                        type="number"
                        step="0.05"
                        value={row.length === 0 && row.category === 'Pile' ? '' : row.length}
                        placeholder={row.category === 'Pile' ? '-' : '0.00'}
                        disabled={row.category === 'Pile'}
                        onChange={(e) =>
                          onUpdateRow(row.id, { length: parseFloat(e.target.value) || 0 })
                        }
                        className="input-editable w-full text-right font-mono text-[12px] disabled:opacity-30 disabled:bg-gray-100"
                      />
                    </td>

                    {/* E: Width */}
                    <td className="py-2 px-2 text-right">
                      <input
                        type="number"
                        step="0.05"
                        value={row.width === 0 && row.category === 'Pile' ? '' : row.width}
                        placeholder={row.category === 'Pile' ? '-' : '0.00'}
                        disabled={row.category === 'Pile'}
                        onChange={(e) =>
                          onUpdateRow(row.id, { width: parseFloat(e.target.value) || 0 })
                        }
                        className="input-editable w-full text-right font-mono text-[12px] disabled:opacity-30 disabled:bg-gray-100"
                      />
                    </td>

                    {/* F: Height / Depth */}
                    <td className="py-2 px-2 text-right">
                      <input
                        type="number"
                        step="0.05"
                        value={row.heightDepth}
                        onChange={(e) =>
                          onUpdateRow(row.id, { heightDepth: parseFloat(e.target.value) || 0 })
                        }
                        className="input-editable w-full text-right font-mono text-[12px]"
                      />
                    </td>

                    {/* G: Diameter */}
                    <td className="py-2 px-2 text-right">
                      <input
                        type="number"
                        step="0.05"
                        value={row.diameter === 0 ? '' : row.diameter}
                        placeholder="0.00"
                        onChange={(e) =>
                          onUpdateRow(row.id, { diameter: parseFloat(e.target.value) || 0 })
                        }
                        className="input-editable w-full text-right font-mono text-[12px]"
                      />
                    </td>

                    {/* H: Count */}
                    <td className="py-2 px-2 text-right">
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={row.count}
                        onChange={(e) =>
                          onUpdateRow(row.id, { count: parseInt(e.target.value, 10) || 0 })
                        }
                        className="input-editable w-full text-right font-mono text-[12px] font-bold"
                      />
                    </td>

                    {/* I: Main Bar Size */}
                    <td className="py-2 px-2 text-right">
                      <input
                        type="number"
                        step="1"
                        value={row.mainBarSize === 0 ? '' : row.mainBarSize}
                        placeholder="Ø"
                        onChange={(e) =>
                          onUpdateRow(row.id, { mainBarSize: parseInt(e.target.value, 10) || 0 })
                        }
                        className="input-editable w-full text-right font-mono text-[12px]"
                      />
                    </td>

                    {/* J: Main Bar Qty */}
                    <td className="py-2 px-2 text-right">
                      <input
                        type="number"
                        step="1"
                        value={row.mainBarQty === 0 ? '' : row.mainBarQty}
                        placeholder="0"
                        onChange={(e) =>
                          onUpdateRow(row.id, { mainBarQty: parseInt(e.target.value, 10) || 0 })
                        }
                        className="input-editable w-full text-right font-mono text-[12px]"
                      />
                    </td>

                    {/* K: Stirrup Spec */}
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={row.stirrupSpec}
                        onChange={(e) => onUpdateRow(row.id, { stirrupSpec: e.target.value })}
                        className="input-editable w-full font-mono text-[11px]"
                      />
                    </td>

                    {/* L: Unit Vol (Computed) */}
                    <td className="py-2 px-3 text-right font-mono text-[12px] text-[#051C2C] bg-slate-50/50">
                      {formatNumber(row.unitVol, 3)}
                    </td>

                    {/* M: Total Vol (Computed + Data bar) */}
                    <td className="py-2 px-3 text-right bg-slate-50/50">
                      <div className="font-mono text-[12px] font-bold text-[#051C2C]">
                        {formatNumber(row.totalVol, 2)}
                      </div>
                      <div className="data-bar-track mt-1 w-full ml-auto max-w-[80px]">
                        <div
                          className="data-bar-fill"
                          style={{ width: `${Math.min(volShare, 100)}%` }}
                        />
                      </div>
                    </td>

                    {/* N: Unit Form (Computed) */}
                    <td className="py-2 px-3 text-right font-mono text-[12px] text-[#051C2C] bg-slate-50/50">
                      {formatNumber(row.unitForm, 2)}
                    </td>

                    {/* O: Total Form (Computed + Data bar) */}
                    <td className="py-2 px-3 text-right bg-slate-50/50">
                      <div className="font-mono text-[12px] font-bold text-[#051C2C]">
                        {formatNumber(row.totalForm, 2)}
                      </div>
                      <div className="data-bar-track mt-1 w-full ml-auto max-w-[80px]">
                        <div
                          className="data-bar-fill"
                          style={{ width: `${Math.min(formShare, 100)}%` }}
                        />
                      </div>
                    </td>

                    {/* P: Total Rebar Linear Meters (Computed + Data bar) */}
                    <td className="py-2 px-3 text-right bg-slate-50/50">
                      <div className="font-mono text-[12px] font-bold text-[#051C2C]">
                        {formatNumber(row.totalRebarLen, 1)} m
                      </div>
                      <div className="data-bar-track mt-1 w-full ml-auto max-w-[80px]">
                        <div
                          className="data-bar-fill"
                          style={{ width: `${Math.min(rebarShare, 100)}%` }}
                        />
                      </div>
                    </td>

                    {/* Action buttons */}
                    <td className="py-2 px-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onDuplicateRow(row.id)}
                          title="Duplicate Row"
                          className="p-1 text-[#888888] hover:text-[#2251FF] hover:bg-white rounded transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteRow(row.id)}
                          title="Delete Row"
                          className="p-1 text-[#888888] hover:text-[#D32F2F] hover:bg-white rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* Table Footer Aggregates */}
            <tfoot>
              <tr className="bg-[rgba(5,28,44,0.06)] border-t-2 border-[#051C2C] font-semibold text-[#051C2C] text-[12px]">
                <td colSpan={11} className="py-3 px-4 uppercase tracking-[0.06em]">
                  Total Substructure Quantity Rollup ({rows.length} records)
                </td>
                <td className="py-3 px-3 text-right text-[#888888] font-mono text-[11px]">—</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[13px] text-[#2251FF]">
                  {formatNumber(totalVolumeSum, 2)} m³
                </td>
                <td className="py-3 px-3 text-right text-[#888888] font-mono text-[11px]">—</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[13px] text-[#2251FF]">
                  {formatNumber(totalFormSum, 2)} m²
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[13px] text-[#2251FF]">
                  {formatNumber(totalRebarLenSum, 1)} m
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Formula Reference Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[12px]">
        <div className="insight-block">
          <div className="font-semibold text-[#051C2C]">Formula 1 & 2: Volume Logic</div>
          <div className="text-[#051C2C]/75 mt-1 font-mono text-[11px]">
            Circular: π × (Dia/2)² × H | Rect: L × W × H
          </div>
          <div className="text-[#888888] text-[11px] mt-0.5">
            Earthwork automatically applies EXCA_FACTOR ({params.earthworkFactor}) for bulk swelling.
          </div>
        </div>

        <div className="insight-block">
          <div className="font-semibold text-[#051C2C]">Formula 3: Formwork Contact Surface</div>
          <div className="text-[#051C2C]/75 mt-1 font-mono text-[11px]">
            Beam: (2H + W) × L | Cap/Col: 2 × (L + W) × H
          </div>
          <div className="text-[#888888] text-[11px] mt-0.5">
            Pile and Earthwork excavations do not account for timber side forms (0 m²).
          </div>
        </div>

        <div className="insight-block">
          <div className="font-semibold text-[#051C2C]">Formula P: Rebar Length Extension</div>
          <div className="text-[#051C2C]/75 mt-1 font-mono text-[11px]">
            Col Cut: H + 0.8m lap | Horiz Cut: L + 0.5m anchors
          </div>
          <div className="text-[#888888] text-[11px] mt-0.5">
            Total length = Cut Length × Bars per Elem × Element Count.
          </div>
        </div>
      </div>
    </div>
  );
};
