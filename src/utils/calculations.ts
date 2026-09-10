import {
  SystemParameters,
  QtyInputRow,
  ComputedQtyRow,
  BBSItem,
  BOQItem,
  ValidationCheck,
  CostDashboardMetrics,
} from '../types';

/**
 * Computes all derived values for a single Qty Input row (Sheet 02)
 */
export function computeQtyRow(
  row: QtyInputRow,
  params: SystemParameters
): ComputedQtyRow {
  const dia = Number(row.diameter) || 0;
  const hgt = Number(row.heightDepth) || 0;
  const len = Number(row.length) || 0;
  const wid = Number(row.width) || 0;
  const qty = Number(row.count) || 0;
  const barSize = Number(row.mainBarSize) || 0;
  const barQty = Number(row.mainBarQty) || 0;

  // Formula 1: Unit Volume (L5:L)
  // IF(dia>0, 3.1415926 * (dia/2)^2 * hgt, len * wid * hgt)
  const unitVol = dia > 0 ? Math.PI * Math.pow(dia / 2, 2) * hgt : len * wid * hgt;

  // Formula 2: Total Volume (M5:M)
  // IF(cat="Earthwork", u_vol * qty * '01_Parameters'!$B$13, u_vol * qty)
  const totalVol = row.category === 'Earthwork'
    ? unitVol * qty * (params.earthworkFactor || 1.15)
    : unitVol * qty;

  // Formula 3: Formwork Area (N5:N, O5:O)
  // Pile: 0, Earthwork: 0, Pile Cap: 2*(len+wid)*hgt, Beam: (2*hgt+wid)*len, Column: 2*(len+wid)*hgt
  let unitForm = 0;
  switch (row.category) {
    case 'Pile':
    case 'Earthwork':
      unitForm = 0;
      break;
    case 'Pile Cap':
    case 'Column':
      unitForm = 2 * (len + wid) * hgt;
      break;
    case 'Beam':
      unitForm = (2 * hgt + wid) * len;
      break;
    default:
      unitForm = 0;
  }
  const totalForm = unitForm * qty;

  // Formula P: Total Rebar Length (P5:P)
  // cut_len = IF(cat="Column", hgt + 0.8, len + 0.5)
  // cut_len * bars
  const cutLength = row.category === 'Column' ? hgt + 0.8 : len + 0.5;
  const totalRebarLen = barSize > 0 ? cutLength * barQty * qty : 0;

  return {
    ...row,
    unitVol,
    totalVol,
    unitForm,
    totalForm,
    totalRebarLen,
  };
}

export function calculateQtyRows(
  rows: QtyInputRow[],
  params: SystemParameters
): ComputedQtyRow[] {
  return rows.map((r) => computeQtyRow(r, params));
}

export const generateBoqItems = generateBoqSummary;

export function calculateDashboardMetrics(
  boqItems: BOQItem[],
  computedRows: ComputedQtyRow[],
  bbsItems?: BBSItem[]
): CostDashboardMetrics {
  return computeDashboardMetrics(boqItems, computedRows);
}

/**
 * Filters rows where Main_Bar_Size > 0
 */
export function generateBbsSchedule(
  computedRows: ComputedQtyRow[],
  params: SystemParameters
): BBSItem[] {
  const activeRows = computedRows.filter(
    (r) => Number(r.mainBarSize) > 0 && Number(r.count) > 0
  );

  return activeRows.map((row) => {
    const dia = Number(row.mainBarSize);
    const hgt = Number(row.heightDepth) || 0;
    const len = Number(row.length) || 0;
    const count = Number(row.count) || 0;
    const barQty = Number(row.mainBarQty) || 0;

    // Cut Length: Column gets starter + lap 0.8m, horizontal members get 0.5m anchorages
    const cutLength = row.category === 'Column' ? hgt + 0.8 : len + 0.5;
    const totalBars = barQty * count;
    const totalLinearM = cutLength * totalBars;

    // Formula: W = constant * dia^2 (kg/m)
    const unitWeightKgM = (params.steelDensity || 0.006165) * dia * dia;
    const netWeightKg = totalLinearM * unitWeightKgM;

    // Total Weight (t) with waste factor
    const totalWeightT = (netWeightKg * (1 + (params.rebarWasteRate || 0.03))) / 1000;

    return {
      id: `bbs-${row.id}`,
      refElementId: row.elementId,
      category: row.category,
      barDiameter: dia,
      cutLength,
      totalBars,
      totalLinearM,
      unitWeightKgM,
      netWeightKg,
      totalWeightT,
    };
  });
}

/**
 * Generates Sheet 04: BOQ Summary
 * Computes 6 standard subitems with dynamic aggregation
 */
export function generateBoqSummary(
  computedRows: ComputedQtyRow[],
  bbsItems: BBSItem[],
  params: SystemParameters
): BOQItem[] {
  // 01.01: Earthwork
  const earthworkVol = computedRows
    .filter((r) => r.category === 'Earthwork')
    .reduce((sum, r) => sum + r.totalVol, 0);

  // 02.01: Pile Concrete
  const pileConcVol = computedRows
    .filter((r) => r.category === 'Pile')
    .reduce((sum, r) => sum + r.totalVol, 0);

  // 02.02: Structural Concrete (Pile Cap, Beam, Column)
  const structConcVol = computedRows
    .filter((r) => r.category !== 'Earthwork' && r.category !== 'Pile')
    .reduce((sum, r) => sum + r.totalVol, 0);

  // 03.01: Formwork Area
  const totalFormArea = computedRows.reduce((sum, r) => sum + r.totalForm, 0);

  // 04.01: Main Rebar (Dia >= 16mm)
  const rebarHeavyT = bbsItems
    .filter((b) => b.barDiameter >= 16)
    .reduce((sum, b) => sum + b.totalWeightT, 0);

  // 04.02: Distribution Rebar & Stirrups (Dia < 16mm)
  const rebarLightT = bbsItems
    .filter((b) => b.barDiameter < 16)
    .reduce((sum, b) => sum + b.totalWeightT, 0);

  const items: BOQItem[] = [
    {
      itemNo: '01.01',
      description: 'Pit & Trench Earthwork Excavation & Loading (incl. 15% bulking/slope factor)',
      unit: 'm³',
      quantity: earthworkVol,
      unitRate: params.priceEarthwork,
      totalAmount: earthworkVol * params.priceEarthwork,
      tradeCategory: 'Earthwork',
    },
    {
      itemNo: '02.01',
      description: 'Cast-in-Place Bored & Uplift Piles Structural Concrete',
      unit: 'm³',
      quantity: pileConcVol,
      unitRate: params.priceConcrete,
      totalAmount: pileConcVol * params.priceConcrete,
      tradeCategory: 'Concrete',
    },
    {
      itemNo: '02.02',
      description: 'Foundation Pile Caps, Ground Beams & Stub Columns Structural Concrete',
      unit: 'm³',
      quantity: structConcVol,
      unitRate: params.priceConcrete,
      totalAmount: structConcVol * params.priceConcrete,
      tradeCategory: 'Concrete',
    },
    {
      itemNo: '03.01',
      description: 'Foundation Substructure Side Formwork Fabrication, Erection & Stripping',
      unit: 'm²',
      quantity: totalFormArea,
      unitRate: params.priceFormwork,
      totalAmount: totalFormArea * params.priceFormwork,
      tradeCategory: 'Formwork',
    },
    {
      itemNo: '04.01',
      description: 'Heavy Structural Main Reinforcing Steel Fabrication & Installation (Dia ≥ 16mm)',
      unit: 't',
      quantity: rebarHeavyT,
      unitRate: params.priceRebar16,
      totalAmount: rebarHeavyT * params.priceRebar16,
      tradeCategory: 'Reinforcement',
    },
    {
      itemNo: '04.02',
      description: 'Distribution Rebar, Secondary Links & Stirrups Fabrication & Installation (Dia < 16mm)',
      unit: 't',
      quantity: rebarLightT,
      unitRate: params.priceRebar8,
      totalAmount: rebarLightT * params.priceRebar8,
      tradeCategory: 'Reinforcement',
    },
  ];

  return items;
}

/**
 * Computes Sheet 05: Cost Dashboard KPIs and metrics
 */
export function computeDashboardMetrics(
  boqItems: BOQItem[],
  computedRows: ComputedQtyRow[]
): CostDashboardMetrics {
  const totalCost = boqItems.reduce((acc, item) => acc + item.totalAmount, 0);

  const pileVol = boqItems.find((i) => i.itemNo === '02.01')?.quantity || 0;
  const structVol = boqItems.find((i) => i.itemNo === '02.02')?.quantity || 0;
  const concreteVolume = pileVol + structVol;

  const rebar16T = boqItems.find((i) => i.itemNo === '04.01')?.quantity || 0;
  const rebar8T = boqItems.find((i) => i.itemNo === '04.02')?.quantity || 0;
  const rebarTonnage = rebar16T + rebar8T;

  const earthworkVolume = boqItems.find((i) => i.itemNo === '01.01')?.quantity || 0;
  const formworkArea = boqItems.find((i) => i.itemNo === '03.01')?.quantity || 0;

  // Steel content per m3 of structural concrete (kg/m3)
  // Industry standard benchmark: 110 ~ 150 kg/m3 for substructure caps & beams
  const rebarRatio = structVol > 0 ? (rebarTonnage * 1000) / structVol : 0;
  const formworkToConcreteRatio = structVol > 0 ? formworkArea / structVol : 0;

  const items = boqItems.map((item) => ({
    ...item,
    share: totalCost > 0 ? (item.totalAmount / totalCost) * 100 : 0,
  }));

  return {
    totalCost,
    concreteVolume,
    rebarTonnage,
    earthworkVolume,
    formworkArea,
    structuralConcreteVolume: structVol,
    rebarRatio,
    formworkToConcreteRatio,
    items,
  };
}

/**
 * Runs Sheet 06: Validation Audit Engine
 */
export function runValidationChecks(
  rawRows: QtyInputRow[],
  computedRows: ComputedQtyRow[],
  bbsItems: BBSItem[],
  boqItems: BOQItem[],
  params: SystemParameters
): ValidationCheck[] {
  const checks: ValidationCheck[] = [];

  // Check 1: C4 Foundation Geometric Integrity Check
  // IF(COUNTIFS('02_Qty_Input'!C:C, "<>Earthwork", '02_Qty_Input'!H:H, ">0", '02_Qty_Input'!F:F, "<=0")=0, "PASS", "FAIL")
  const c4Issues: ValidationCheck['issues'] = [];
  rawRows.forEach((r, idx) => {
    if (r.category !== 'Earthwork' && Number(r.count) > 0) {
      if (Number(r.heightDepth) <= 0) {
        c4Issues.push({
          rowIdx: idx + 1,
          elementId: r.elementId || `Row ${idx + 1}`,
          field: 'heightDepth',
          detail: 'Height/Depth is 0 or missing for structural member.',
        });
      }
      if (r.category === 'Pile' && Number(r.diameter) <= 0) {
        c4Issues.push({
          rowIdx: idx + 1,
          elementId: r.elementId || `Row ${idx + 1}`,
          field: 'diameter',
          detail: 'Pile diameter must be greater than zero.',
        });
      }
      if (
        (r.category === 'Pile Cap' || r.category === 'Beam' || r.category === 'Column') &&
        (Number(r.length) <= 0 || (r.category !== 'Column' && Number(r.width) <= 0))
      ) {
        c4Issues.push({
          rowIdx: idx + 1,
          elementId: r.elementId || `Row ${idx + 1}`,
          field: 'length/width',
          detail: 'Plan dimension (Length or Width) is 0 or missing.',
        });
      }
    }
  });

  checks.push({
    cellRef: 'C4',
    title: 'Substructure Geometric Integrity',
    ruleFormula: 'COUNTIFS(Category<>"Earthwork", Count>0, HeightDepth<=0) = 0',
    passStandard: 'PASS',
    status: c4Issues.length === 0 ? 'PASS' : 'FAIL',
    description:
      'Verifies all structural components (Piles, Caps, Beams, Columns) have complete dimensional attributes (Depth, Length, Width/Dia).',
    issues: c4Issues,
  });

  // Check 2: C5 Unit Price Completeness & Non-Negative Check
  // IF(COUNTIF('01_Parameters'!B5:B10, "<=0")=0, "PASS", "WARNING")
  const c5Issues: ValidationCheck['issues'] = [];
  const priceList = [
    { key: 'priceConcrete', name: 'Structural Concrete (PRC_CONC)', val: params.priceConcrete },
    { key: 'priceEarthwork', name: 'Earthwork Excavation (PRC_EXCA)', val: params.priceEarthwork },
    { key: 'priceFormwork', name: 'Formwork (PRC_FORM)', val: params.priceFormwork },
    { key: 'priceRebar8', name: '8mm Rebar (PRC_RE_8)', val: params.priceRebar8 },
    { key: 'priceRebar12', name: '12mm Rebar (PRC_RE_12)', val: params.priceRebar12 },
    { key: 'priceRebar16', name: '16mm+ Rebar (PRC_RE_16)', val: params.priceRebar16 },
  ];

  priceList.forEach((p) => {
    if (p.val <= 0 || isNaN(p.val)) {
      c5Issues.push({
        rowIdx: 0,
        elementId: '01_Parameters',
        field: p.key,
        detail: `${p.name} is zero or missing, risking budget under-estimation.`,
      });
    }
  });

  checks.push({
    cellRef: 'C5',
    title: 'Unit Price Parameters Completeness',
    ruleFormula: 'COUNTIF(PriceParameters<=0) = 0',
    passStandard: 'PASS',
    status: c5Issues.length === 0 ? 'PASS' : 'WARNING',
    description:
      'Ensures no critical unit cost in Sheet 01 is zero or negative, preventing incomplete tenders.',
    issues: c5Issues,
  });

  // Check 3: C6 BBS Rebar Engine Row Alignment
  // IF(COUNTA('03_Reinforcement_Engine'!A:A)-4 = COUNTIFS('02_Qty_Input'!I:I, ">0"), "PASS", "MISMATCH")
  const c6Issues: ValidationCheck['issues'] = [];
  const rebarRowsCount = rawRows.filter(
    (r) => Number(r.mainBarSize) > 0 && Number(r.count) > 0
  ).length;
  const bbsCount = bbsItems.length;

  if (bbsCount !== rebarRowsCount) {
    c6Issues.push({
      rowIdx: 0,
      elementId: '03_Reinforcement_Engine',
      field: 'row_count',
      detail: `Mismatch: BBS engine generated ${bbsCount} rows, but Qty Input has ${rebarRowsCount} reinforced members.`,
    });
  }

  checks.push({
    cellRef: 'C6',
    title: 'BBS Rebar Engine Row Synchronization',
    ruleFormula: 'COUNTA(BBS_Items) = COUNTIFS(Main_Bar_Size>0, Count>0)',
    passStandard: 'PASS',
    status: c6Issues.length === 0 ? 'PASS' : 'MISMATCH',
    description:
      'Confirms 100% of reinforced elements from the takeoff schedule are mapped into the BBS engine.',
    issues: c6Issues,
  });

  // Check 4: C7 BOQ Financial Closed-Loop Check
  // IF(ROUND('04_BOQ_Summary'!F11, 2) = ROUND(SUMPRODUCT('04_BOQ_Summary'!D5:D10, '04_BOQ_Summary'!E5:E10), 2), "PASS", "ERR")
  const c7Issues: ValidationCheck['issues'] = [];
  const calculatedSum = boqItems.reduce(
    (sum, item) => sum + Math.round(item.quantity * item.unitRate * 100) / 100,
    0
  );
  const totalCost = boqItems.reduce((sum, item) => sum + item.totalAmount, 0);

  if (Math.abs(Math.round(totalCost * 100) - Math.round(calculatedSum * 100)) > 1) {
    c7Issues.push({
      rowIdx: 0,
      elementId: '04_BOQ_Summary',
      field: 'total_amount',
      detail: `BOQ Total Amount (${totalCost.toFixed(2)}) deviates from sum of item products (${calculatedSum.toFixed(2)}).`,
    });
  }

  checks.push({
    cellRef: 'C7',
    title: 'BOQ Financial Closed-Loop Audit',
    ruleFormula: 'ROUND(Total_Cost, 2) = ROUND(SUMPRODUCT(Quantities, UnitRates), 2)',
    passStandard: 'PASS',
    status: c7Issues.length === 0 ? 'PASS' : 'ERR',
    description:
      'Validates arithmetic consistency between item extensions and grand total value.',
    issues: c7Issues,
  });

  return checks;
}

/**
 * Helper to format currency
 */
export function formatCurrency(amount: number, symbol = '$', decimals = 2): string {
  if (isNaN(amount)) return `${symbol}0.00`;
  const formatted = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return amount < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

/**
 * Helper to format numbers with commas
 */
export function formatNumber(val: number, decimals = 2): string {
  if (isNaN(val)) return '0.00';
  return val.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
