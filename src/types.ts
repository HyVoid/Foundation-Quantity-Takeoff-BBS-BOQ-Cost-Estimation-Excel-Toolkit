export type ElementCategory = 'Pile' | 'Pile Cap' | 'Beam' | 'Column' | 'Earthwork';

export interface SystemParameters {
  currencySymbol: string;    // B4: CURR_SYM ($)
  priceConcrete: number;     // B5: PRC_CONC (450.00)
  priceEarthwork: number;    // B6: PRC_EXCA (35.00)
  priceFormwork: number;     // B7: PRC_FORM (65.00)
  priceRebar8: number;       // B8: PRC_RE_8 (4800.00)
  priceRebar12: number;      // B9: PRC_RE_12 (4750.00)
  priceRebar16: number;      // B10: PRC_RE_16 (4650.00)
  steelDensity: number;      // B11: STEEL_DEN (0.006165)
  rebarWasteRate: number;    // B12: RE_WASTE (0.03)
  earthworkFactor: number;   // B13: EXCA_FACTOR (1.15)
}

export interface QtyInputRow {
  id: string;
  elementId: string;         // Col A: Element_ID (e.g. PC-01)
  planswiftRef: string;      // Col B: Planswift_Ref (e.g. S-01 #M04)
  category: ElementCategory; // Col C: Category
  length: number;            // Col D: Length (m)
  width: number;             // Col E: Width (m)
  heightDepth: number;       // Col F: Height/Depth (m)
  diameter: number;          // Col G: Diameter (m) for circular
  count: number;             // Col H: Count
  mainBarSize: number;       // Col I: Main_Bar_Size (mm)
  mainBarQty: number;        // Col J: Main_Bar_Qty
  stirrupSpec: string;       // Col K: Stirrup_Spec (e.g. 8@150)
}

export interface ComputedQtyRow extends QtyInputRow {
  unitVol: number;           // Col L: Unit_Vol_m3
  totalVol: number;          // Col M: Total_Vol_m3
  unitForm: number;          // Col N: Unit_Form_m2
  totalForm: number;         // Col O: Total_Form_m2
  totalRebarLen: number;     // Col P: Total_Rebar_Len_m
}

export interface BBSItem {
  id: string;
  refElementId: string;      // Col A: Ref_Element_ID
  category: ElementCategory; // Col B: Category
  barDiameter: number;       // Col C: Bar_Diameter (mm)
  cutLength: number;         // Col D: Cut_Length_m
  totalBars: number;         // Col E: Total_Bars
  totalLinearM: number;      // Col F: Total_Linear_m
  unitWeightKgM: number;     // Col G: Unit_Weight_kg_m
  netWeightKg: number;       // Col H: Net_Weight_kg
  totalWeightT: number;      // Col I: Total_Weight_t (with waste)
}

export interface BOQItem {
  itemNo: string;            // Col A: BOQ_Item_No (e.g. 01.01)
  description: string;       // Col B: Description
  unit: string;              // Col C: Unit (m3, m2, t)
  quantity: number;          // Col D: Quantity
  unitRate: number;          // Col E: Unit_Rate
  totalAmount: number;       // Col F: Total_Amount
  tradeCategory: 'Earthwork' | 'Concrete' | 'Formwork' | 'Reinforcement';
}

export interface ValidationIssue {
  rowIdx: number;
  elementId: string;
  field: string;
  detail: string;
}

export interface ValidationCheck {
  cellRef: string;           // C4, C5, C6, C7
  title: string;
  ruleFormula: string;
  passStandard: string;
  status: 'PASS' | 'FAIL' | 'WARNING' | 'MISMATCH' | 'ERR';
  description: string;
  issues: ValidationIssue[];
}

export interface CostDashboardMetrics {
  totalCost: number;
  concreteVolume: number;
  rebarTonnage: number;
  earthworkVolume: number;
  formworkArea: number;
  structuralConcreteVolume: number;
  rebarRatio: number;        // kg/m3 of structural concrete
  formworkToConcreteRatio: number;
  items: Array<BOQItem & { share: number }>;
}

export type ActiveTab = 
  | 'dashboard' 
  | 'parameters' 
  | 'qty_input' 
  | 'bbs_engine' 
  | 'boq_summary' 
  | 'validation' 
  | 'sop_manual';
