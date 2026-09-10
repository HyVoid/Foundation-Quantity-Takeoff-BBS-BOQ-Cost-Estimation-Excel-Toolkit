import React from 'react';
import { ValidationCheck } from '../types';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

interface ValidationSheetProps {
  checks: ValidationCheck[];
  onNavigateToTab: (tab: any) => void;
  onRefreshAudit: () => void;
}

export const ValidationSheet: React.FC<ValidationSheetProps> = ({
  checks,
  onNavigateToTab,
  onRefreshAudit,
}) => {
  const allPassed = checks.every((c) => c.status === 'PASS');
  const failCount = checks.filter(
    (c) => c.status === 'FAIL' || c.status === 'ERR' || c.status === 'MISMATCH'
  ).length;
  const warningCount = checks.filter((c) => c.status === 'WARNING').length;

  return (
    <div className="animate-fade-up space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
            Sheet 06 · Internal Audit & Compliance Engine
          </div>
          <h1 className="font-heading text-[28px] font-bold text-[#051C2C] tracking-display mt-0.5">
            06_Validation (Data Integrity & Closed-Loop Verification)
          </h1>
          <p className="text-[13px] text-[#051C2C]/70 mt-1 max-w-3xl">
            Automated quality assurance system. Continuously verifies dimensional completeness, non-zero pricing parameters,
            BBS row synchronizations, and BOQ arithmetic closure to eliminate bidding inaccuracies.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRefreshAudit}
            className="px-3.5 py-1.5 text-[12px] font-medium text-[#051C2C] bg-white border border-[#E8E8E6] rounded-md hover:bg-[#F5F5F2] flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#2251FF]" />
            <span>Re-Run Audit Rules</span>
          </button>
        </div>
      </div>

      {/* Audit Verdict Banner */}
      <div
        className={`p-5 rounded-xl border transition-all ${
          allPassed
            ? 'bg-emerald-50/70 border-emerald-200'
            : failCount > 0
            ? 'bg-red-50/70 border-red-200'
            : 'bg-amber-50/70 border-amber-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {allPassed ? (
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-[#00C853]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            ) : failCount > 0 ? (
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-[#D32F2F]">
                <XCircle className="w-6 h-6" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                <AlertTriangle className="w-6 h-6" />
              </div>
            )}
            <div>
              <div className="font-heading text-[20px] font-bold text-[#051C2C] tracking-heading">
                {allPassed
                  ? 'All 4 Core Integrity Checkpoints Passed (100% Verified)'
                  : failCount > 0
                  ? `${failCount} Critical Data Discrepancies Detected`
                  : `${warningCount} Tender Warning(s) Need Review`}
              </div>
              <div className="text-[12px] text-[#051C2C]/75 mt-0.5">
                {allPassed
                  ? 'The dataset satisfies all closed-loop formulas, dimensional integrity, and pricing criteria. Reliable for formal tender quotation.'
                  : 'Review the flagged items below to prevent omitted quantities or budget under-estimation.'}
              </div>
            </div>
          </div>

          <div className="text-right">
            <span
              className={`status-pill ${
                allPassed
                  ? 'status-pill-pass'
                  : failCount > 0
                  ? 'status-pill-fail'
                  : 'status-pill-warning'
              }`}
            >
              {allPassed ? 'AUDIT: PASS' : failCount > 0 ? 'AUDIT: FAILED' : 'AUDIT: WARNING'}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Audit Rules Matrix Table */}
      <div className="card-surface-static overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8E8E6] bg-[rgba(5,28,44,0.02)]">
          <h2 className="font-heading text-[18px] font-bold text-[#051C2C] tracking-heading">
            Excel 06_Validation Formula Matrix (Cells C4 ~ C7)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px] font-semibold text-[#051C2C] uppercase tracking-[0.06em]">
                <th className="py-3 px-4 w-[70px]">Cell</th>
                <th className="py-3 px-4 w-[220px]">Check Specification</th>
                <th className="py-3 px-4">Audit Rule & Formula</th>
                <th className="py-3 px-4 w-[110px] text-center">Benchmark</th>
                <th className="py-3 px-4 w-[110px] text-center">Status</th>
                <th className="py-3 px-4 w-[140px] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[13px]">
              {checks.map((c, idx) => {
                const isEven = idx % 2 === 0;
                const isPass = c.status === 'PASS';
                return (
                  <tr
                    key={c.cellRef}
                    className={`transition-colors hover:bg-black/[0.02] ${
                      isEven ? 'bg-white' : 'bg-[#F5F5F2]'
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-[#2251FF]">
                      {c.cellRef}
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#051C2C]">
                      {c.title}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono text-[11px] bg-black/[0.03] px-2 py-1 rounded inline-block text-[#051C2C]">
                        {c.ruleFormula}
                      </div>
                      <div className="text-[12px] text-[#888888] mt-1">{c.description}</div>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-[#051C2C] text-[12px]">
                      {c.passStandard}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`status-pill ${
                          isPass
                            ? 'status-pill-pass'
                            : c.status === 'WARNING'
                            ? 'status-pill-warning'
                            : 'status-pill-fail'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {c.cellRef === 'C4' && (
                        <button
                          onClick={() => onNavigateToTab('qty_input')}
                          className="text-[12px] font-medium text-[#2251FF] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Review Qty Input</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {c.cellRef === 'C5' && (
                        <button
                          onClick={() => onNavigateToTab('parameters')}
                          className="text-[12px] font-medium text-[#2251FF] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Fix Parameters</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {c.cellRef === 'C6' && (
                        <button
                          onClick={() => onNavigateToTab('bbs_engine')}
                          className="text-[12px] font-medium text-[#2251FF] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Inspect BBS</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {c.cellRef === 'C7' && (
                        <button
                          onClick={() => onNavigateToTab('boq_summary')}
                          className="text-[12px] font-medium text-[#2251FF] hover:underline inline-flex items-center gap-1"
                        >
                          <span>View BOQ Total</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Discrepancies Details if any */}
      {!allPassed && (
        <div className="card-surface-static p-5 bg-white space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#D32F2F]" />
            <h3 className="font-heading text-[17px] font-bold text-[#051C2C] tracking-heading">
              Detailed Audit Findings & Remediation Instructions
            </h3>
          </div>

          <div className="space-y-3">
            {checks
              .filter((c) => c.status !== 'PASS')
              .map((c) => (
                <div key={c.cellRef} className="p-4 rounded-lg bg-[#F5F5F2] border border-[#E8E8E6]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#051C2C] text-[13px]">
                      {c.cellRef}: {c.title}
                    </span>
                    <span
                      className={`status-pill ${
                        c.status === 'WARNING' ? 'status-pill-warning' : 'status-pill-fail'
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>

                  {c.issues.length > 0 ? (
                    <div className="mt-3 overflow-x-auto">
                      <table className="w-full text-left text-[12px]">
                        <thead>
                          <tr className="text-[#888888] border-b border-[#E8E8E6]">
                            <th className="py-1.5 px-2">Location</th>
                            <th className="py-1.5 px-2">Element ID</th>
                            <th className="py-1.5 px-2">Attribute</th>
                            <th className="py-1.5 px-2">Remediation Required</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8E8E6]">
                          {c.issues.map((iss, i) => (
                            <tr key={i} className="font-mono">
                              <td className="py-2 px-2 text-[#2251FF]">
                                {iss.rowIdx > 0 ? `Row ${iss.rowIdx}` : 'Parameters'}
                              </td>
                              <td className="py-2 px-2 font-bold text-[#051C2C]">{iss.elementId}</td>
                              <td className="py-2 px-2 text-[#888888]">{iss.field}</td>
                              <td className="py-2 px-2 font-sans text-[#D32F2F] font-medium">
                                {iss.detail}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-[12px] text-[#888888] mt-1">No row-level details recorded.</div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Cross-Check Certification Report */}
      <div className="insight-block">
        <div className="font-bold text-[#051C2C] text-[13px]">
          Engineering System Cross-Check & Closed-Loop Guarantee
        </div>
        <p className="text-[12px] text-[#051C2C]/80 mt-1 leading-relaxed">
          The 4 verification rules mirror Section 1.1 & 1.3 of the implementation specification.
          They confirm that 100% of input elements flow continuously from Takeoff → BBS Engine → BOQ Schedule → Dashboard KPIs,
          strictly referencing the parameters dictionary with zero unhandled edge cases.
        </p>
      </div>
    </div>
  );
};
