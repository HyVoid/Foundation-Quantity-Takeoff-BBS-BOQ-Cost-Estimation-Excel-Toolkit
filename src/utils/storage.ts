import { SystemParameters, QtyInputRow } from '../types';

export const STORAGE_KEY_PARAMS = 'substruct_estimator_params_v1';
export const STORAGE_KEY_ROWS = 'substruct_estimator_rows_v1';
export const STORAGE_KEY_SAVED_AT = 'substruct_estimator_last_saved_v1';

export const DEFAULT_PARAMETERS: SystemParameters = {
  currencySymbol: '$',
  priceConcrete: 450.0,
  priceEarthwork: 35.0,
  priceFormwork: 65.0,
  priceRebar8: 4800.0,
  priceRebar12: 4750.0,
  priceRebar16: 4650.0,
  steelDensity: 0.006165,
  rebarWasteRate: 0.03,
  earthworkFactor: 1.15,
};

export const DEFAULT_QTY_ROWS: QtyInputRow[] = [
  {
    id: 'row-1',
    elementId: 'PC-01',
    planswiftRef: 'S-01 #M04',
    category: 'Pile Cap',
    length: 2.4,
    width: 2.4,
    heightDepth: 1.1,
    diameter: 0,
    count: 14,
    mainBarSize: 20,
    mainBarQty: 18,
    stirrupSpec: '10@150',
  },
  {
    id: 'row-2',
    elementId: 'PC-02',
    planswiftRef: 'S-01 #M07',
    category: 'Pile Cap',
    length: 3.2,
    width: 1.8,
    heightDepth: 1.2,
    diameter: 0,
    count: 8,
    mainBarSize: 25,
    mainBarQty: 22,
    stirrupSpec: '10@150',
  },
  {
    id: 'row-3',
    elementId: 'P-01',
    planswiftRef: 'S-02 #M01',
    category: 'Pile',
    length: 0,
    width: 0,
    heightDepth: 18.0,
    diameter: 0.6,
    count: 48,
    mainBarSize: 16,
    mainBarQty: 8,
    stirrupSpec: '8@200',
  },
  {
    id: 'row-4',
    elementId: 'P-02',
    planswiftRef: 'S-02 #M03',
    category: 'Pile',
    length: 0,
    width: 0,
    heightDepth: 22.0,
    diameter: 0.8,
    count: 16,
    mainBarSize: 20,
    mainBarQty: 12,
    stirrupSpec: '8@150',
  },
  {
    id: 'row-5',
    elementId: 'GB-01',
    planswiftRef: 'S-03 #M10',
    category: 'Beam',
    length: 32.5,
    width: 0.4,
    heightDepth: 0.7,
    diameter: 0,
    count: 6,
    mainBarSize: 20,
    mainBarQty: 8,
    stirrupSpec: '8@150',
  },
  {
    id: 'row-6',
    elementId: 'GB-02',
    planswiftRef: 'S-03 #M14',
    category: 'Beam',
    length: 24.0,
    width: 0.35,
    heightDepth: 0.65,
    diameter: 0,
    count: 8,
    mainBarSize: 16,
    mainBarQty: 6,
    stirrupSpec: '8@200',
  },
  {
    id: 'row-7',
    elementId: 'COL-01',
    planswiftRef: 'S-04 #M02',
    category: 'Column',
    length: 0.6,
    width: 0.6,
    heightDepth: 1.5,
    diameter: 0,
    count: 22,
    mainBarSize: 25,
    mainBarQty: 12,
    stirrupSpec: '10@100',
  },
  {
    id: 'row-8',
    elementId: 'EW-01',
    planswiftRef: 'S-00 #M01',
    category: 'Earthwork',
    length: 45.0,
    width: 35.0,
    heightDepth: 2.8,
    diameter: 0,
    count: 1,
    mainBarSize: 0,
    mainBarQty: 0,
    stirrupSpec: '-',
  },
];

export function loadSavedParams(): SystemParameters {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PARAMS);
    if (raw) {
      return { ...DEFAULT_PARAMETERS, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Failed to parse saved parameters from localStorage', e);
  }
  return DEFAULT_PARAMETERS;
}

export function loadSavedRows(): QtyInputRow[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ROWS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse saved rows from localStorage', e);
  }
  return DEFAULT_QTY_ROWS;
}

export function saveStateToStorage(
  params: SystemParameters,
  rows: QtyInputRow[]
): string {
  try {
    const nowStr = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    localStorage.setItem(STORAGE_KEY_PARAMS, JSON.stringify(params));
    localStorage.setItem(STORAGE_KEY_ROWS, JSON.stringify(rows));
    localStorage.setItem(STORAGE_KEY_SAVED_AT, nowStr);
    return nowStr;
  } catch (e) {
    console.error('Failed to save state to localStorage', e);
    return 'Save Error';
  }
}

export function getLastSavedTime(): string {
  return localStorage.getItem(STORAGE_KEY_SAVED_AT) || 'Just now';
}

export function exportBackupJson(
  params: SystemParameters,
  rows: QtyInputRow[],
  projectName = 'Substructure_Civil_Project'
) {
  const data = {
    appName: 'Substructure Civil Estimation & BBS/BOQ System',
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    projectName,
    parameters: params,
    rows,
  };
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${projectName}_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function generateCsvTemplate(): string {
  const headers = [
    'Element_ID',
    'Planswift_Ref',
    'Category',
    'Length_m',
    'Width_m',
    'Height_Depth_m',
    'Diameter_m',
    'Count',
    'Main_Bar_Size_mm',
    'Main_Bar_Qty',
    'Stirrup_Spec',
  ];
  const sample1 = ['PC-03', 'S-01 #M09', 'Pile Cap', '2.5', '2.5', '1.2', '0', '10', '20', '16', '10@150'];
  const sample2 = ['P-03', 'S-02 #M08', 'Pile', '0', '0', '15.0', '0.6', '24', '16', '8', '8@200'];
  const sample3 = ['GB-03', 'S-03 #M18', 'Beam', '18.0', '0.35', '0.6', '0', '4', '16', '6', '8@150'];
  return [headers.join(','), sample1.join(','), sample2.join(','), sample3.join(',')].join('\n');
}

export function downloadCsvTemplate() {
  const content = generateCsvTemplate();
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Substructure_Takeoff_Template.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export function saveParameters(params: SystemParameters) {
  try {
    localStorage.setItem(STORAGE_KEY_PARAMS, JSON.stringify(params));
  } catch (e) {
    console.error('Failed to save parameters', e);
  }
}

export function saveQtyRows(rows: QtyInputRow[]) {
  try {
    localStorage.setItem(STORAGE_KEY_ROWS, JSON.stringify(rows));
  } catch (e) {
    console.error('Failed to save rows', e);
  }
}

export const loadStoredParameters = loadSavedParams;
export const loadStoredQtyRows = loadSavedRows;

export function parseTakeoffCsv(csvText: string): { rows: QtyInputRow[]; errors: string[] } {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const errors: string[] = [];
  const rows: QtyInputRow[] = [];

  if (lines.length < 2) {
    return { rows: [], errors: ['CSV file is empty or missing data rows.'] };
  }

  // Check header
  const header = lines[0].split(',').map((h) => h.trim().toLowerCase().replace(/[\s_-]/g, ''));

  for (let i = 1; i < lines.length; i++) {
    const rawCols = lines[i].split(',').map((c) => c.trim().replace(/^["']|["']$/g, ''));
    if (rawCols.length < 5) continue; // skip malformed lines

    try {
      const elemId = rawCols[0] || `ELEM-${i}`;
      const planswiftRef = rawCols[1] || `CSV-Row-${i}`;
      const rawCat = rawCols[2] || 'Pile Cap';
      
      let category: QtyInputRow['category'] = 'Pile Cap';
      const catLower = rawCat.toLowerCase();
      if (catLower.includes('pile cap') || catLower === 'cap') category = 'Pile Cap';
      else if (catLower.includes('pile')) category = 'Pile';
      else if (catLower.includes('beam')) category = 'Beam';
      else if (catLower.includes('column') || catLower.includes('col')) category = 'Column';
      else if (catLower.includes('earth') || catLower.includes('excav')) category = 'Earthwork';

      const length = parseFloat(rawCols[3]) || 0;
      const width = parseFloat(rawCols[4]) || 0;
      const heightDepth = parseFloat(rawCols[5]) || 0;
      const diameter = parseFloat(rawCols[6]) || 0;
      const count = parseInt(rawCols[7], 10) || 1;
      const mainBarSize = parseInt(rawCols[8], 10) || 0;
      const mainBarQty = parseInt(rawCols[9], 10) || 0;
      const stirrupSpec = rawCols[10] || '-';

      rows.push({
        id: `csv-${Date.now()}-${i}`,
        elementId: elemId,
        planswiftRef,
        category,
        length,
        width,
        heightDepth,
        diameter,
        count,
        mainBarSize,
        mainBarQty,
        stirrupSpec,
      });
    } catch (err) {
      errors.push(`Row ${i + 1}: failed to parse data values.`);
    }
  }

  return { rows, errors };
}

export function parseCsvToQtyRows(csvText: string): QtyInputRow[] {
  const res = parseTakeoffCsv(csvText);
  if (res.errors.length > 0 && res.rows.length === 0) {
    throw new Error(res.errors[0]);
  }
  return res.rows;
}

export function exportFullProjectBackup(params: SystemParameters, rows: QtyInputRow[]) {
  exportBackupJson(params, rows);
}

export async function importProjectBackup(file: File): Promise<{
  parameters: SystemParameters;
  qtyRows: QtyInputRow[];
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        if (!parsed.parameters || !parsed.rows) {
          throw new Error('Invalid project backup file schema. Missing parameters or rows.');
        }
        resolve({
          parameters: { ...DEFAULT_PARAMETERS, ...parsed.parameters },
          qtyRows: parsed.rows,
        });
      } catch (err: any) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}


