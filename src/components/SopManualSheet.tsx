import React from 'react';
import {
  BookOpen,
  HelpCircle,
  CheckCircle2,
  Workflow,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';

export const SopManualSheet: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Configure Global Parameters (01_Parameters)',
      desc: 'Set the base currency symbol ($, ¥, €, £). Update current local unit rates for concrete, excavation, formwork, and reinforcement grades. Confirm the 3.0% waste allowance.',
    },
    {
      num: '02',
      title: 'Input Measurement Schedule (02_Qty_Input)',
      desc: 'Export item measurements from Planswift or CAD drawings. Paste or type geometry (length, width, depth, diameter) and rebar specifications into the yellow editable cells. Formula columns calculate instantly.',
    },
    {
      num: '03',
      title: 'Audit & Compliance Verification (06_Validation)',
      desc: 'Review the 4 automated checks (C4~C7). Ensure all status indicators display PASS. If an anomaly is flagged, use the detailed findings table to rectify missing dimensions or parameters.',
    },
    {
      num: '04',
      title: 'Extract Tender BOQ & Cost Analytics (04_BOQ / 05_Dashboard)',
      desc: 'Review total contract sum, evaluate the steel intensity ratio against the 110~150 kg/m³ benchmark, and export clean BOQ or BBS CSV files for client bids or factory rebar ordering.',
    },
  ];

  const faqs = [
    {
      q: 'Q1: How does this web system prevent the classic Excel #SPILL! error?',
      a: 'In traditional Excel, dynamic array formulas like FILTER and LET crash if any non-empty cell blocks their expansion path. In this SaaS application, array extensions execute reactively in memory, supporting up to 50,000 components with zero risk of spill collisions.',
    },
    {
      q: 'Q2: How does modifying parameter rates propagate across the entire project?',
      a: 'All calculations are reactive. Changing any unit price (e.g., Structural Concrete from $450 to $480/m³) triggers instantaneous recalculation of item extensions, trade totals, grand contract sums, and dashboard percentages without page reloads or manual formula drags.',
    },
    {
      q: 'Q3: How are formwork contact surface areas calculated for different components?',
      a: 'The geometry engine automatically distinguishes component types: Ground Beams account for two vertical sides and exposed soffit where applicable ((2H + W) × L); Pile Caps and Stub Columns calculate four perimeter faces (2(L + W) × H); Cast-in-place Piles and Bulk Earthwork pits require no lateral timber forms (0 m²).',
    },
    {
      q: 'Q4: Where is my takeoff data stored, and is it private?',
      a: 'All data is stored directly in your browser’s localStorage. No project data, tender quantities, or proprietary unit rates are transmitted to external servers. You can safely export JSON project backups or bulk CSV files at any time.',
    },
  ];

  return (
    <div className="animate-fade-up space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
            Standard Operating Procedure & Troubleshooting
          </div>
          <h1 className="font-heading text-[28px] font-bold text-[#051C2C] tracking-display mt-0.5">
            SOP & System Implementation Manual
          </h1>
          <p className="text-[13px] text-[#051C2C]/70 mt-1 max-w-3xl">
            Complete reference guide outlining standard operational workflows, Planswift markup mappings,
            formula dictionaries, and troubleshooting procedures for professional civil estimating.
          </p>
        </div>
      </div>

      {/* 4-Step SOP Workflow */}
      <div className="card-surface-static p-6 bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Workflow className="w-5 h-5 text-[#2251FF]" />
          <h2 className="font-heading text-[18px] font-bold text-[#051C2C] tracking-heading">
            Four-Step Standard Operating Procedure (SOP)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, idx) => (
            <div
              key={s.num}
              className="p-4 rounded-lg bg-[#F5F5F2] border border-[#E8E8E6] flex flex-col justify-between"
            >
              <div>
                <div className="font-heading text-[24px] font-bold text-[#2251FF]">
                  Step {s.num}
                </div>
                <div className="font-bold text-[#051C2C] text-[13px] mt-1">
                  {s.title}
                </div>
                <p className="text-[12px] text-[#051C2C]/75 mt-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Field Flow Mapping Table */}
      <div className="card-surface-static overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8E8E6] bg-[rgba(5,28,44,0.02)]">
          <h2 className="font-heading text-[18px] font-bold text-[#051C2C] tracking-heading">
            Field Flow Transformation Matrix (Input → Computation → Commercial Delivery)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px] font-semibold text-[#051C2C] uppercase tracking-[0.06em]">
                <th className="py-2.5 px-4 w-[220px]">Manual Input Field (Sheet 02)</th>
                <th className="py-2.5 px-4 w-[220px]">Computation Engine Layer</th>
                <th className="py-2.5 px-4 w-[240px]">Key Output Metric</th>
                <th className="py-2.5 px-4">Primary Commercial / Engineering Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6]">
              <tr className="hover:bg-black/[0.02]">
                <td className="py-2.5 px-4 font-medium text-[#051C2C]">Component Category (Category)</td>
                <td className="py-2.5 px-4 text-[#888888] font-mono text-[12px]">Dynamic Grouping / Filter</td>
                <td className="py-2.5 px-4 font-semibold text-[#051C2C]">BOQ Item Classification</td>
                <td className="py-2.5 px-4 text-[#051C2C]/75">Substructure trade rollup (Piles, Caps, Beams, Earthwork)</td>
              </tr>
              <tr className="hover:bg-black/[0.02]">
                <td className="py-2.5 px-4 font-medium text-[#051C2C]">Dimensions (L, W, H/D, Dia, Count)</td>
                <td className="py-2.5 px-4 text-[#888888] font-mono text-[12px]">Geometric Formula Evaluator</td>
                <td className="py-2.5 px-4 font-semibold text-[#051C2C]">Volume (m³) & Formwork (m²)</td>
                <td className="py-2.5 px-4 text-[#051C2C]/75">Concrete purchase orders and formwork carpentry planning</td>
              </tr>
              <tr className="hover:bg-black/[0.02]">
                <td className="py-2.5 px-4 font-medium text-[#051C2C]">Main Bar Size & Count (Ø, Bars)</td>
                <td className="py-2.5 px-4 text-[#888888] font-mono text-[12px]">BBS Rebar Length & Mass Engine</td>
                <td className="py-2.5 px-4 font-semibold text-[#051C2C]">Rebar Tonnage by Dia (t)</td>
                <td className="py-2.5 px-4 text-[#051C2C]/75">Direct rebar mill procurement and bending machine scheduling</td>
              </tr>
              <tr className="hover:bg-black/[0.02]">
                <td className="py-2.5 px-4 font-medium text-[#051C2C]">Trench / Pit Depth & Length</td>
                <td className="py-2.5 px-4 text-[#888888] font-mono text-[12px]">Bulk Soil Expansion (1.15x)</td>
                <td className="py-2.5 px-4 font-semibold text-[#051C2C]">Excavation Volume (m³)</td>
                <td className="py-2.5 px-4 text-[#051C2C]/75">Earthwork dump truck dispatch and cart-away pricing</td>
              </tr>
              <tr className="hover:bg-black/[0.02]">
                <td className="py-2.5 px-4 font-medium text-[#051C2C]">Parameters Unit Rates</td>
                <td className="py-2.5 px-4 text-[#888888] font-mono text-[12px]">Multiplication Extension</td>
                <td className="py-2.5 px-4 font-semibold text-[#051C2C]">Total Substructure Contract Value</td>
                <td className="py-2.5 px-4 text-[#051C2C]/75">Commercial tender quotation and executive cost control</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="card-surface-static p-6 bg-white space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#2251FF]" />
          <h2 className="font-heading text-[18px] font-bold text-[#051C2C] tracking-heading">
            Frequently Asked Questions & Field Engineering Guidance
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-[#F5F5F2] border border-[#E8E8E6]">
              <div className="font-bold text-[#051C2C] text-[13px]">{faq.q}</div>
              <div className="text-[12px] text-[#051C2C]/80 mt-1.5 leading-relaxed">
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
