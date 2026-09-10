import React, { useState } from 'react';
import { QtyInputRow } from '../types';
import { parseCsvToQtyRows } from '../utils/storage';
import { X, Upload, FileText, Check, AlertCircle, Download } from 'lucide-react';

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (rows: QtyInputRow[], mode: 'append' | 'replace') => void;
}

export const CsvImportModal: React.FC<CsvImportModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [csvText, setCsvText] = useState('');
  const [mode, setMode] = useState<'append' | 'replace'>('append');
  const [error, setError] = useState<string | null>(null);
  const [previewRows, setPreviewRows] = useState<QtyInputRow[]>([]);

  if (!isOpen) return null;

  const handleParse = (text: string) => {
    setCsvText(text);
    setError(null);
    try {
      const parsed = parseCsvToQtyRows(text);
      setPreviewRows(parsed);
    } catch (e: any) {
      setError(e.message || 'Failed to parse CSV text');
      setPreviewRows([]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        handleParse(text);
      };
      reader.readAsText(file);
    }
  };

  const handleConfirm = () => {
    if (previewRows.length === 0) {
      setError('No valid rows to import. Please paste or upload valid CSV data.');
      return;
    }
    onImport(previewRows, mode);
    onClose();
  };

  const sampleCsv = `Element_ID,Planswift_Ref,Category,Length,Width,Height,Diameter,Count,Main_Bar_Size,Main_Bar_Qty,Stirrup_Spec
PC-04,S-02 #M01,Pile Cap,2.80,2.80,1.20,0.00,4,20,18,8@150
GB-03,S-02 #M02,Beam,8.50,0.40,0.75,0.00,3,25,8,8@200
P-03,S-01 #M03,Pile,0.00,0.00,16.00,0.60,8,16,12,8@250`;

  const downloadSample = () => {
    const blob = new Blob([sampleCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_takeoff_import.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden border border-[#E8E8E6] animate-fade-up">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8E8E6] flex items-center justify-between bg-[rgba(5,28,44,0.02)]">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-[#2251FF]" />
            <h3 className="font-heading text-[18px] font-bold text-[#051C2C] tracking-heading">
              Bulk CSV Import (Planswift Takeoff)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#888888] hover:text-[#051C2C] hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="flex items-center justify-between">
            <label className="text-[12px] font-semibold text-[#051C2C] uppercase tracking-wider">
              Paste Raw CSV Content or Upload File
            </label>
            <button
              onClick={downloadSample}
              className="text-[11px] font-medium text-[#2251FF] hover:underline flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>Download Sample Template</span>
            </button>
          </div>

          <textarea
            rows={5}
            value={csvText}
            onChange={(e) => handleParse(e.target.value)}
            placeholder="Paste CSV here (e.g. Element_ID,Planswift_Ref,Category,Length,Width,Height,Diameter,Count,Main_Bar_Size,Main_Bar_Qty,Stirrup_Spec)..."
            className="w-full p-3 font-mono text-[11px] border border-[#E8E8E6] rounded-md bg-[#F5F5F2] focus:bg-white focus:outline-none focus:border-[#2251FF]"
          />

          <div className="flex items-center gap-4">
            <label className="px-3 py-1.5 bg-white border border-[#E8E8E6] rounded-md text-[12px] font-medium text-[#051C2C] hover:bg-[#F5F5F2] cursor-pointer flex items-center gap-1.5 transition-colors shadow-xs">
              <FileText className="w-3.5 h-3.5 text-[#2251FF]" />
              <span>Choose .CSV File</span>
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <div className="flex items-center gap-3 text-[12px]">
              <span className="text-[#888888]">Import Mode:</span>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="importMode"
                  checked={mode === 'append'}
                  onChange={() => setMode('append')}
                  className="text-[#2251FF]"
                />
                <span className="text-[#051C2C]">Append to Current</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="importMode"
                  checked={mode === 'replace'}
                  onChange={() => setMode('replace')}
                  className="text-[#2251FF]"
                />
                <span className="text-[#051C2C]">Replace Existing</span>
              </label>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-700 text-[12px] flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {previewRows.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-[12px]">
                <span className="font-semibold text-[#051C2C]">
                  Parsed Preview ({previewRows.length} valid items detected)
                </span>
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Ready for import
                </span>
              </div>
              <div className="max-h-[160px] overflow-y-auto border border-[#E8E8E6] rounded-md">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead className="bg-[#F5F5F2] border-b border-[#E8E8E6] sticky top-0">
                    <tr>
                      <th className="py-1.5 px-2">ID</th>
                      <th className="py-1.5 px-2">Ref</th>
                      <th className="py-1.5 px-2">Category</th>
                      <th className="py-1.5 px-2 text-right">L×W×H</th>
                      <th className="py-1.5 px-2 text-right">Count</th>
                      <th className="py-1.5 px-2 text-right">Bar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E8E6]">
                    {previewRows.map((r, i) => (
                      <tr key={i} className="hover:bg-black/[0.02]">
                        <td className="py-1 px-2 font-bold text-[#051C2C]">{r.elementId}</td>
                        <td className="py-1 px-2 text-[#888888]">{r.planswiftRef}</td>
                        <td className="py-1 px-2">{r.category}</td>
                        <td className="py-1 px-2 text-right">
                          {r.length}×{r.width}×{r.heightDepth}
                        </td>
                        <td className="py-1 px-2 text-right font-bold">{r.count}</td>
                        <td className="py-1 px-2 text-right">
                          Ø{r.mainBarSize}×{r.mainBarQty}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#E8E8E6] bg-[#F5F5F2] flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-[12px] font-medium text-[#051C2C] bg-white border border-[#E8E8E6] rounded-md hover:bg-[#F5F5F2] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={previewRows.length === 0}
            className="px-4 py-1.5 text-[12px] font-semibold text-white bg-[#051C2C] hover:bg-[#051C2C]/90 rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Import {previewRows.length > 0 ? `${previewRows.length} Items` : ''}
          </button>
        </div>
      </div>
    </div>
  );
};
