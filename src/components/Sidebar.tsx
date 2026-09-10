import React, { useRef, useState } from 'react';
import {
  Calculator,
  Layers,
  Database,
  FileSpreadsheet,
  BarChart3,
  ShieldCheck,
  BookOpen,
  Download,
  Upload,
  FileUp,
  RotateCcw,
  CheckCircle2,
  Menu,
  X,
  Shield,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ActiveTab, ValidationCheck } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  lastSaved: string;
  onExportBackup: () => void;
  onImportBackup: (file: File) => void;
  onOpenCsvModal: () => void;
  onOpenResetModal: () => void;
  validationChecks: ValidationCheck[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  lastSaved,
  onExportBackup,
  onImportBackup,
  onOpenCsvModal,
  onOpenResetModal,
  validationChecks,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasErrors = validationChecks.some(
    (c) => c.status === 'FAIL' || c.status === 'ERR' || c.status === 'MISMATCH'
  );
  const hasWarnings = validationChecks.some((c) => c.status === 'WARNING');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImportBackup(e.target.files[0]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const navWorkflowItems: Array<{
    id: ActiveTab;
    sheetNo: string;
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'dashboard',
      sheetNo: '05',
      label: 'Cost Dashboard',
      icon: <BarChart3 className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'parameters',
      sheetNo: '01',
      label: 'Parameters Hub',
      icon: <Calculator className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'qty_input',
      sheetNo: '02',
      label: 'Takeoff Qty Input',
      icon: <Layers className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'bbs_engine',
      sheetNo: '03',
      label: 'BBS Rebar Engine',
      icon: <Database className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'boq_summary',
      sheetNo: '04',
      label: 'BOQ Pricing Bill',
      icon: <FileSpreadsheet className="w-4 h-4 shrink-0" />,
    },
  ];

  const navAuditItems: Array<{
    id: ActiveTab;
    sheetNo: string;
    label: string;
    icon: React.ReactNode;
    badge?: React.ReactNode;
  }> = [
    {
      id: 'validation',
      sheetNo: '06',
      label: 'Compliance Audit',
      icon: <ShieldCheck className="w-4 h-4 shrink-0" />,
      badge: hasErrors ? (
        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
          FAIL
        </span>
      ) : hasWarnings ? (
        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
          WARN
        </span>
      ) : (
        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
          PASS
        </span>
      ),
    },
    {
      id: 'sop_manual',
      sheetNo: 'SOP',
      label: 'Implementation SOP',
      icon: <BookOpen className="w-4 h-4 shrink-0" />,
    },
  ];

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setIsMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between bg-white select-none">
      {/* Brand Header */}
      <div>
        <div className="p-4 border-b border-[#E8E8E6] flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-[#051C2C] text-white flex items-center justify-center font-serif text-lg font-bold shadow-sm shrink-0">
              Σ
            </div>
            {!isCollapsed && (
              <div className="min-w-0 transition-opacity duration-200">
                <div className="font-serif text-[15px] font-bold tracking-tight text-[#051C2C] leading-none truncate">
                  SUBSTRUCT ESTIMATOR
                </div>
                <div className="text-[10px] font-semibold tracking-wider text-[#888888] uppercase mt-1 truncate">
                  Civil Takeoff & Cost Engine
                </div>
              </div>
            )}
          </div>

          {/* Desktop Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            className="hidden lg:flex p-1.5 text-[#888888] hover:text-[#051C2C] hover:bg-black/5 rounded-md transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-280px)]">
          {/* Workflow Section */}
          <div>
            {!isCollapsed && (
              <div className="px-3 pb-2 text-[10px] font-bold text-[#888888] uppercase tracking-[0.08em]">
                Workflow Sheets
              </div>
            )}
            <div className="space-y-1">
              {navWorkflowItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    title={isCollapsed ? `${item.sheetNo} ${item.label}` : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all group relative ${
                      isActive
                        ? 'bg-[rgba(34,81,255,0.08)] text-[#2251FF] font-semibold'
                        : 'text-[#051C2C]/75 hover:bg-black/[0.03] hover:text-[#051C2C]'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#2251FF] rounded-r-md" />
                    )}
                    <span
                      className={`${
                        isActive
                          ? 'text-[#2251FF]'
                          : 'text-[#888888] group-hover:text-[#051C2C]'
                      }`}
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <div className="flex items-center justify-between flex-1 truncate">
                        <span className="truncate">{item.label}</span>
                        <span className="font-mono text-[10px] font-semibold text-[#888888] px-1.5 py-0.5 rounded bg-black/[0.04]">
                          {item.sheetNo}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Audit & Knowledge Section */}
          <div>
            {!isCollapsed && (
              <div className="px-3 pb-2 text-[10px] font-bold text-[#888888] uppercase tracking-[0.08em]">
                Audit & Manual
              </div>
            )}
            <div className="space-y-1">
              {navAuditItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    title={isCollapsed ? `${item.sheetNo} ${item.label}` : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all group relative ${
                      isActive
                        ? 'bg-[rgba(34,81,255,0.08)] text-[#2251FF] font-semibold'
                        : 'text-[#051C2C]/75 hover:bg-black/[0.03] hover:text-[#051C2C]'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#2251FF] rounded-r-md" />
                    )}
                    <span
                      className={`${
                        isActive
                          ? 'text-[#2251FF]'
                          : 'text-[#888888] group-hover:text-[#051C2C]'
                      }`}
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <div className="flex items-center justify-between flex-1 truncate">
                        <span className="truncate">{item.label}</span>
                        {item.badge ? (
                          item.badge
                        ) : (
                          <span className="font-mono text-[10px] font-semibold text-[#888888] px-1.5 py-0.5 rounded bg-black/[0.04]">
                            {item.sheetNo}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Footer Operations */}
      <div className="p-3 border-t border-[#E8E8E6] bg-[rgba(5,28,44,0.015)] space-y-2">
        {/* Last saved timestamp indicator */}
        {!isCollapsed ? (
          <div className="flex items-center gap-2 text-[11px] text-[#888888] px-2 py-1 bg-white rounded-md border border-[#E8E8E6]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00C853] shrink-0" />
            <span className="truncate font-mono">Saved: {lastSaved}</span>
          </div>
        ) : (
          <div
            className="flex justify-center p-1.5 text-[#00C853]"
            title={`Last saved: ${lastSaved}`}
          >
            <CheckCircle2 className="w-4 h-4" />
          </div>
        )}

        {/* Quick Action Grid */}
        {!isCollapsed ? (
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button
              onClick={onOpenCsvModal}
              title="Bulk CSV Import"
              className="px-2.5 py-1.5 text-[11px] font-medium text-[#051C2C] bg-white border border-[#E8E8E6] rounded-md hover:bg-[#F5F5F2] flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <FileUp className="w-3.5 h-3.5 text-[#2251FF]" />
              <span>CSV Import</span>
            </button>

            <button
              onClick={onExportBackup}
              title="Export Full Project Backup (JSON)"
              className="px-2.5 py-1.5 text-[11px] font-medium text-[#051C2C] bg-white border border-[#E8E8E6] rounded-md hover:bg-[#F5F5F2] flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import Project Backup (JSON)"
              className="px-2.5 py-1.5 text-[11px] font-medium text-[#051C2C] bg-white border border-[#E8E8E6] rounded-md hover:bg-[#F5F5F2] flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />

            <button
              onClick={onOpenResetModal}
              title="Reset Takeoff Data to Baseline"
              className="px-2.5 py-1.5 text-[11px] font-medium text-[#D32F2F] bg-white border border-[#E8E8E6] rounded-md hover:bg-red-50 flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={onOpenCsvModal}
              title="Bulk CSV Import"
              className="p-2 text-[#051C2C] hover:bg-black/5 rounded-md"
            >
              <FileUp className="w-4 h-4 text-[#2251FF]" />
            </button>
            <button
              onClick={onExportBackup}
              title="Export Project Backup"
              className="p-2 text-[#051C2C] hover:bg-black/5 rounded-md"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import Project Backup"
              className="p-2 text-[#051C2C] hover:bg-black/5 rounded-md"
            >
              <Upload className="w-4 h-4" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
          </div>
        )}

        {/* Security & Privacy Indicator */}
        {!isCollapsed && (
          <div className="pt-2">
            <div className="flex items-center gap-1.5 text-[10px] text-[#888888] px-1">
              <Shield className="w-3 h-3 text-[#00C853] shrink-0" />
              <span>100% Client-Side Local Storage</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar with Drawer Trigger */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-[#E8E8E6] px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-1.5 text-[#051C2C] hover:bg-black/5 rounded-md"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#051C2C] text-white flex items-center justify-center font-serif text-sm font-bold shadow-xs">
              Σ
            </div>
            <div className="font-serif text-[15px] font-bold text-[#051C2C]">
              SUBSTRUCT ESTIMATOR
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-[11px] font-mono text-[#888888] bg-[#F5F5F2] px-2 py-0.5 rounded border border-[#E8E8E6]">
            {lastSaved}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative w-[280px] max-w-[85vw] h-full bg-white shadow-2xl z-10 flex flex-col">
            <div className="absolute right-3 top-3 z-20">
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1.5 text-[#888888] hover:text-[#051C2C] hover:bg-black/5 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside
        className={`hidden lg:block sticky top-0 h-screen border-r border-[#E8E8E6] shadow-[1px_0_3px_rgba(5,28,44,0.03)] z-30 transition-all duration-200 shrink-0 ${
          isCollapsed ? 'w-[72px]' : 'w-[260px]'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
