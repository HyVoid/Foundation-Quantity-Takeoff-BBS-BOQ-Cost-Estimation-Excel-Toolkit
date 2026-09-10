import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  ActiveTab,
  SystemParameters,
  QtyInputRow,
} from './types';
import {
  calculateQtyRows,
  generateBbsSchedule,
  generateBoqItems,
  calculateDashboardMetrics,
  runValidationChecks,
} from './utils/calculations';
import {
  loadStoredParameters,
  saveParameters,
  loadStoredQtyRows,
  saveQtyRows,
  exportFullProjectBackup,
  importProjectBackup,
  DEFAULT_PARAMETERS,
  DEFAULT_QTY_ROWS,
} from './utils/storage';
import { Sidebar } from './components/Sidebar';
import { CostDashboardSheet } from './components/CostDashboardSheet';
import { ParametersSheet } from './components/ParametersSheet';
import { QtyInputSheet } from './components/QtyInputSheet';
import { BbsEngineSheet } from './components/BbsEngineSheet';
import { BoqSummarySheet } from './components/BoqSummarySheet';
import { ValidationSheet } from './components/ValidationSheet';
import { SopManualSheet } from './components/SopManualSheet';
import { CsvImportModal } from './components/CsvImportModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { Shield, Database, Lock } from 'lucide-react';

export default function App() {
  const [params, setParams] = useState<SystemParameters>(loadStoredParameters);
  const [qtyRows, setQtyRows] = useState<QtyInputRow[]>(loadStoredQtyRows);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [lastSaved, setLastSaved] = useState<string>(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );

  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [, setAuditNonce] = useState(0);

  // Update timestamp helper
  const triggerSavedIndicator = useCallback(() => {
    setLastSaved(
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    );
  }, []);

  // Recalculate sheets dynamically in memory with zero maintenance lag
  const computedQtyRows = useMemo(() => calculateQtyRows(qtyRows, params), [qtyRows, params]);
  const bbsItems = useMemo(() => generateBbsSchedule(qtyRows, params), [qtyRows, params]);
  const boqItems = useMemo(
    () => generateBoqItems(computedQtyRows, bbsItems, params),
    [computedQtyRows, bbsItems, params]
  );
  const costMetrics = useMemo(
    () => calculateDashboardMetrics(boqItems, computedQtyRows, bbsItems),
    [boqItems, computedQtyRows, bbsItems]
  );
  const validationChecks = useMemo(
    () => runValidationChecks(qtyRows, computedQtyRows, bbsItems, boqItems, params),
    [qtyRows, computedQtyRows, bbsItems, boqItems, params]
  );

  // Parameter Update Handler
  const handleUpdateParam = useCallback(
    <K extends keyof SystemParameters>(key: K, value: SystemParameters[K]) => {
      setParams((prev) => {
        const next = { ...prev, [key]: value };
        saveParameters(next);
        triggerSavedIndicator();
        return next;
      });
    },
    [triggerSavedIndicator]
  );

  const handleResetParameters = useCallback(() => {
    setParams(DEFAULT_PARAMETERS);
    saveParameters(DEFAULT_PARAMETERS);
    triggerSavedIndicator();
  }, [triggerSavedIndicator]);

  // Qty Input Row Handlers
  const handleAddRow = useCallback(() => {
    const newRow: QtyInputRow = {
      id: `elem_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      elementId: `PC-${String(qtyRows.length + 1).padStart(2, '0')}`,
      planswiftRef: `S-02 #M${String(qtyRows.length + 1).padStart(2, '0')}`,
      category: 'Pile Cap',
      length: 2.5,
      width: 2.5,
      heightDepth: 1.0,
      diameter: 0,
      count: 2,
      mainBarSize: 16,
      mainBarQty: 12,
      stirrupSpec: '8@150',
    };
    setQtyRows((prev) => {
      const next = [...prev, newRow];
      saveQtyRows(next);
      triggerSavedIndicator();
      return next;
    });
  }, [qtyRows.length, triggerSavedIndicator]);

  const handleDuplicateRow = useCallback(
    (id: string) => {
      setQtyRows((prev) => {
        const target = prev.find((r) => r.id === id);
        if (!target) return prev;
        const duplicated: QtyInputRow = {
          ...target,
          id: `elem_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          elementId: `${target.elementId}-CPY`,
          planswiftRef: `${target.planswiftRef} (Copy)`,
        };
        const next = [...prev, duplicated];
        saveQtyRows(next);
        triggerSavedIndicator();
        return next;
      });
    },
    [triggerSavedIndicator]
  );

  const handleDeleteRow = useCallback(
    (id: string) => {
      setQtyRows((prev) => {
        const next = prev.filter((r) => r.id !== id);
        saveQtyRows(next);
        triggerSavedIndicator();
        return next;
      });
    },
    [triggerSavedIndicator]
  );

  const handleUpdateRow = useCallback(
    (id: string, updates: Partial<QtyInputRow>) => {
      setQtyRows((prev) => {
        const next = prev.map((r) => (r.id === id ? { ...r, ...updates } : r));
        saveQtyRows(next);
        triggerSavedIndicator();
        return next;
      });
    },
    [triggerSavedIndicator]
  );

  const handleImportCsv = useCallback(
    (newRows: QtyInputRow[], mode: 'append' | 'replace') => {
      setQtyRows((prev) => {
        const next = mode === 'replace' ? newRows : [...prev, ...newRows];
        saveQtyRows(next);
        triggerSavedIndicator();
        return next;
      });
    },
    [triggerSavedIndicator]
  );

  const handleResetToDefaults = useCallback(() => {
    setParams(DEFAULT_PARAMETERS);
    saveParameters(DEFAULT_PARAMETERS);
    setQtyRows(DEFAULT_QTY_ROWS);
    saveQtyRows(DEFAULT_QTY_ROWS);
    triggerSavedIndicator();
  }, [triggerSavedIndicator]);

  const handleExportBackup = useCallback(() => {
    exportFullProjectBackup(params, qtyRows);
  }, [params, qtyRows]);

  const handleImportBackup = useCallback(
    async (file: File) => {
      try {
        const data = await importProjectBackup(file);
        setParams(data.parameters);
        saveParameters(data.parameters);
        setQtyRows(data.qtyRows);
        saveQtyRows(data.qtyRows);
        triggerSavedIndicator();
      } catch (e: any) {
        alert(e.message || 'Failed to import backup file.');
      }
    },
    [triggerSavedIndicator]
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAFAF8] text-[#051C2C] font-sans antialiased selection:bg-[#2251FF]/15 selection:text-[#051C2C]">
      {/* Left Navigation Sidebar (Desktop Sticky / Mobile Responsive Drawer) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lastSaved={lastSaved}
        onExportBackup={handleExportBackup}
        onImportBackup={handleImportBackup}
        onOpenCsvModal={() => setIsCsvModalOpen(true)}
        onOpenResetModal={() => setIsResetModalOpen(true)}
        validationChecks={validationChecks}
      />

      {/* Right Column: Main Content & Footer */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 sm:px-10 py-8">
          {activeTab === 'dashboard' && (
            <CostDashboardSheet
              metrics={costMetrics}
              params={params}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'parameters' && (
            <ParametersSheet
              params={params}
              onUpdateParam={handleUpdateParam}
              onResetDefaults={handleResetParameters}
            />
          )}

          {activeTab === 'qty_input' && (
            <QtyInputSheet
              rows={computedQtyRows}
              params={params}
              onAddRow={handleAddRow}
              onDuplicateRow={handleDuplicateRow}
              onDeleteRow={handleDeleteRow}
              onUpdateRow={handleUpdateRow}
              onOpenCsvModal={() => setIsCsvModalOpen(true)}
            />
          )}

          {activeTab === 'bbs_engine' && (
            <BbsEngineSheet bbsItems={bbsItems} params={params} />
          )}

          {activeTab === 'boq_summary' && (
            <BoqSummarySheet
              boqItems={boqItems}
              params={params}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'validation' && (
            <ValidationSheet
              checks={validationChecks}
              onNavigateToTab={setActiveTab}
              onRefreshAudit={() => setAuditNonce((n) => n + 1)}
            />
          )}

          {activeTab === 'sop_manual' && <SopManualSheet />}
        </main>

        {/* Application Footer with Mandatory Privacy & LocalStorage Notice */}
        <footer className="mt-auto border-t border-[#E8E8E6] bg-white py-6">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-[#888888]">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-[#051C2C] text-[14px]">
                SUBSTRUCT ESTIMATOR
              </span>
              <span>·</span>
              <span>Civil Substructure Takeoff, BBS & Commercial Cost Engine</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#051C2C]/75 bg-[#F5F5F2] px-3.5 py-1.5 rounded-full border border-[#E8E8E6] text-center max-w-xl">
              <Shield className="w-3.5 h-3.5 text-[#00C853] shrink-0" />
              <span>
                <strong>Data Privacy Notice:</strong> All calculations and project inputs are stored strictly in your browser's local storage (localStorage). This application does not retain or transmit any user takeoff data to external servers.
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="font-mono">v1.0.0-PRO</span>
              <span>Zero-Maintenance Excel Spec</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Bulk CSV Import Modal */}
      <CsvImportModal
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        onImport={handleImportCsv}
      />

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetToDefaults}
      />
    </div>
  );
}
