
# Foundation Quantity Takeoff, BBS, BOQ & Cost Estimation Excel Toolkit

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)](#access)
[![Tool Type](https://img.shields.io/badge/Tool-Decision%20Support-orange.svg)](#what-it-helps-track)

**A practical quantity, reinforcement, BOQ, and cost-estimation workflow for building and civil substructure projects — turning measured foundation data into quantities, reinforcement tonnage, commercial BOQ values, and cost-control indicators without rebuilding the model for every project.**

> **Try the free web-based version. If you need the offline Excel version for permanent records, audit trails, and repeated project use, you can buy it with a 30-day, no-questions-asked money-back guarantee.**
>
> [🌐 Open in Browser](#) · [📥 Download Excel](#)

No signup. No installation. Free to use in the browser. An Excel version is available for users who need an offline working file and repeatable project records.

## What It Helps You Track

- Foundation quantities across piles, pile caps, beams, columns, and earthwork — without maintaining separate manual calculations for each element type.
- Concrete volume, formwork area, and earthwork quantities — tied directly to measured dimensions and element counts.
- Reinforcement quantities by bar diameter, including calculated cutting length, total linear metres, theoretical weight, and allowance for waste.
- A structured BOQ covering earthwork, concrete, formwork, and reinforcement — with quantities automatically carried into commercial values.
- Total estimated cost and material consumption indicators — including reinforcement tonnage and reinforcement intensity per cubic metre of structural concrete.
- Input and calculation exceptions that can materially distort a tender or budget — surfaced through dedicated validation checks.

## Quick Start Workflow

1. **Set the project parameters.**  
   Enter the project currency and current material rates for concrete, excavation, formwork, and reinforcement. Set the applicable reinforcement waste allowance and earthwork factor once.

2. **Import existing measurement data.**  
   Paste the measured foundation elements into the designated input area. Data can originate from a quantity-takeoff workflow such as Planswift or from an existing spreadsheet. The input structure captures element references, drawing references, dimensions, quantities, and reinforcement parameters.

3. **Get the results instantly.**  
   The workbook calculates element quantities, reinforcement requirements, BOQ quantities, commercial values, and management indicators automatically. There is no need to manually copy totals between calculation sheets.

4. **Refresh as the project changes.**  
   Update the measurement data or project rates when drawings, quantities, or market assumptions change. The downstream calculations refresh from the same source data.

**Set the project parameters. Drop in the measured data. Get the quantities and cost analysis. Refresh when the project changes.**

## Why I Built This

Foundation estimating often fails at the handoff between **quantity takeoff, reinforcement calculation, BOQ preparation, and commercial review**.

A measured quantity may be correct but still become unreliable once it is manually transferred into another spreadsheet. Reinforcement may be calculated separately from the structural quantities. BOQ values may then be rebuilt again for pricing. By the time a project manager reviews the final number, it can be difficult to identify which assumption produced it.

I built this as a **productized estimating workflow**, rather than another collection of disconnected Excel tables.

The intended flow is simple:

**Measured element → calculated quantity → reinforcement requirement → BOQ → cost → validation**

For example, a foundation estimate may contain 80 pile caps and several hundred metres of ground beams. Instead of manually calculating concrete and formwork for each category and then separately preparing a reinforcement summary, the workbook carries the element data through the calculation chain.

The practical difference is not merely faster arithmetic.

**Before:** a rate changes, several manually prepared totals need to be checked and updated.

**After:** the commercial rate is maintained centrally and the BOQ values recalculate from the underlying quantities.

The same principle applies when a drawing revision changes element dimensions or counts. The objective is to keep the estimating chain connected so that the commercial output remains traceable to the measured input.

## Common Foundation Estimating Problems This Solves

| Problem | Without This Tool | With This Tool |
|---|---|---|
| Quantity takeoff is separated from pricing | Measured quantities are manually transferred into another pricing sheet, creating transcription risk. | Element quantities flow into the BOQ calculation automatically. |
| Reinforcement is estimated separately | Rebar totals can become disconnected from the structural element quantities that generated them. | Reinforcement parameters are linked to the same element-level input data. |
| Different element types require different geometry | Estimators repeatedly switch between pile, pile-cap, beam, column, and earthwork calculations. | Element category and dimensions drive the applicable quantity logic. |
| BOQ preparation becomes a second manual exercise | Quantity totals are copied into commercial schedules and can drift from the source estimate. | Standard BOQ items aggregate directly from calculated quantities. |
| Material rates change during estimating | Multiple rate cells or copied values have to be located and updated. | Core project rates are maintained in one parameter area and referenced by the BOQ. |
| Input omissions survive into the final estimate | Missing dimensions or zero rates may not be noticed until a tender is reviewed. | Validation checks flag incomplete geometry, invalid rates, reinforcement mismatches, and BOQ reconciliation errors. |

## Who This Is For

This toolkit is designed for **construction estimators, quantity surveyors, contractors, project managers, and small-to-mid-sized construction teams** working on foundation and substructure estimating.

It is particularly useful when the workflow needs to connect **quantity takeoff → reinforcement estimate → BOQ → cost review** without introducing a full enterprise estimating platform.

It is not designed to replace a specialist structural design package, a full estimating ERP, or project-specific engineering judgment. Reinforcement assumptions, construction allowances, and commercial rates still need to be reviewed against the actual drawings, specifications, project conditions, and applicable standards.

No spreadsheet expertise is needed to start with the browser version. Open it and work from the defined input-to-output workflow.
```

 

````markdown
## About

I build lightweight Excel and browser-based decision-support tools for operational problems that have too many moving parts to manage reliably in a single spreadsheet or in someone's head.

The central question is simple:

> **What information needs to be in one place to make the next decision confidently?**

This foundation estimating toolkit applies that approach to substructure work by connecting measured elements, quantities, reinforcement, BOQ values, cost indicators, and validation into one repeatable workflow.

## Technical Details

<details>
<summary>For technical reviewers, Excel practitioners, and collaborators</summary>

### Workbook Architecture

The workbook is structured as a controlled six-sheet calculation chain:

| Sheet | Role | Primary Output |
|---|---|---|
| `01_Parameters` | Central parameter configuration | Currency, material rates, reinforcement constant, waste allowance, earthwork factor |
| `02_Qty_Input` | Primary data-entry layer | Element quantities, concrete volume, formwork area, reinforcement input |
| `03_Reinforcement_Engine` | Reinforcement calculation engine | Cutting length, bar counts, linear metres, theoretical weight, total tonnes |
| `04_BOQ_Summary` | Commercial aggregation | BOQ quantities, unit rates, line-item amounts, total estimated cost |
| `05_Cost_Dashboard` | Management analysis | Total cost, material quantities, cost structure, reinforcement intensity |
| `06_Validation` | Integrity and error checking | Geometry, pricing, reinforcement alignment, and BOQ reconciliation status |

The intended data flow is:

```text
Measured Drawings / Takeoff Data
            │
            ▼
    02_Qty_Input
            │
      ┌─────┴─────┐
      ▼           ▼
03_Reinforcement  04_BOQ_Summary
      │           │
      └─────┬─────┘
            ▼
    05_Cost_Dashboard
            │
            ▼
      06_Validation

01_Parameters
      │
      └──────► shared assumptions and rates
````

The source specification defines `02_Qty_Input` as the primary manual-entry sheet, with columns `A:K` used for element identifiers, drawing references, categories, dimensions, quantities, and reinforcement parameters. Calculated fields occupy `L:P`. 

The reinforcement engine is formula-driven and filters only elements containing reinforcement parameters. Its output includes element reference, category, bar diameter, cutting length, total bar count, total linear metres, theoretical unit weight, net weight, and weight including waste. 

The BOQ layer aggregates six predefined estimating items covering earthwork, pile concrete, structural foundation concrete, formwork, reinforcement at `>=16mm`, and reinforcement below `16mm`. 

### Three Traps That Catch Even Experienced Estimators

#### Trap 1 — Correct takeoff, wrong commercial total

1. **A decision was made:**
   A tender price is prepared from the measured foundation quantities.

2. **The hidden flaw:**
   Quantity values and commercial rates are maintained in separate manually copied tables.

3. **How the flaw changes the recommendation:**
   A rate revision can leave part of the estimate using an old assumption, making the tender appear more competitive than it actually is.

4. **Why the reasoning is incorrect:**
   The commercial result is no longer a reliable function of the current project assumptions.

5. **Corrected approach:**
   Maintain core rates centrally and calculate BOQ amounts from the current quantity totals.

6. **Corrected decision outcome:**
   A rate change propagates into the affected BOQ values, allowing the estimator to review the resulting tender position from one calculation chain.

<details>
<summary>Formula reference</summary>

The BOQ amount follows the basic relationship:

```excel
=Quantity*Unit_Rate
```

The total is then reconciled as:

```excel
=SUM(F5:F10)
```

</details>

#### Trap 2 — Reinforcement tonnage looks plausible but is disconnected

1. **A decision was made:**
   Steel procurement is based on a separately prepared reinforcement total.

2. **The hidden flaw:**
   The steel summary is not directly tied to the element-level dimensions, bar sizes, quantities, and calculated cutting lengths.

3. **How the flaw changes the recommendation:**
   A change in element count or geometry may change the required reinforcement while the procurement number remains unchanged.

4. **Why the reasoning is incorrect:**
   A plausible total is not sufficient if its source cannot be traced back to the current structural input.

5. **Corrected approach:**
   Derive reinforcement records from the same element input table and calculate total linear metres before converting to theoretical weight.

6. **Corrected decision outcome:**
   The reinforcement estimate moves with the underlying element data and can be reconciled against the source element count.

<details>
<summary>Formula reference</summary>

The implementation uses the theoretical reinforcement relationship:

```excel
W = den * d^2
```

and converts the resulting kilogram value to tonnes after applying the configured waste allowance:

```excel
=(tot_m*(den*dia*dia)*(1+waste))/1000
```

</details>

#### Trap 3 — A missing input is mistaken for a low-cost result

1. **A decision was made:**
   The estimate appears unusually low and is accepted as a competitive number.

2. **The hidden flaw:**
   A structural element has a positive quantity but an omitted or zero dimension.

3. **How the flaw changes the recommendation:**
   The missing dimension can suppress the calculated quantity and therefore understate the commercial value.

4. **Why the reasoning is incorrect:**
   The model is producing a mathematically valid result from incomplete construction data. Mathematical validity does not establish estimating validity.

5. **Corrected approach:**
   Validate required geometry and pricing inputs before accepting the estimate.

6. **Corrected decision outcome:**
   The estimate is reviewed before it becomes a tender or procurement commitment.

<details>
<summary>Formula reference</summary>

The validation layer checks for non-earthwork elements with a positive count but missing depth/height:

```excel
=IF(
  COUNTIFS(
    '02_Qty_Input'!C:C,"<>Earthwork",
    '02_Qty_Input'!H:H,">0",
    '02_Qty_Input'!F:F,"<=0"
  )=0,
  "PASS",
  "FAIL"
)
```

</details>

### Example Scenario

Consider a foundation estimate containing piles, pile caps, ground beams, short columns, and excavation.

The workflow begins with element-level inputs such as:

| Input                       |           Example |
| --------------------------- | ----------------: |
| Pile diameter               |            0.60 m |
| Pile depth                  |           18.00 m |
| Pile quantity               |                24 |
| Pile cap length             |            2.40 m |
| Pile cap width              |            2.40 m |
| Pile cap depth              |            0.80 m |
| Pile cap quantity           |                 6 |
| Main reinforcement diameter |             20 mm |
| Main reinforcement quantity | 16 bars / element |

The input layer calculates the geometry-specific quantity for each element. Circular elements use the diameter-based calculation, while rectangular elements use length × width × depth. Earthwork receives the configured earthwork factor separately from structural element quantities. 

The reinforcement engine then filters elements with reinforcement information and derives total bar counts from the element quantity and specified reinforcement count. Cutting length is adjusted according to the element category, and total linear metres are converted into theoretical weight using the configured diameter constant and waste allowance. 

The resulting quantities feed the BOQ. Concrete, formwork, earthwork, and reinforcement quantities are multiplied by their configured rates to produce line-item amounts and a total estimated cost. 

The management layer then exposes the commercial result through a smaller set of indicators: total cost, concrete volume, reinforcement tonnage, earthwork quantity, and reinforcement intensity per cubic metre of structural concrete. 

The final decision is not simply **"What is the total?"**

It is:

**"Does the quantity, reinforcement requirement, pricing assumption, and commercial total form a traceable and internally consistent estimate?"**

That distinction is important when the workbook is used for tender review, budget preparation, or procurement planning.

### Formula Reference

<details>
<summary>Element Geometry</summary>

For circular elements, the implementation calculates volume from diameter and height/depth:

```excel
=LET(
    len, A5:INDEX(D:D, COUNTA(A:A)),
    wid, E5:INDEX(E:E, COUNTA(A:A)),
    hgt, F5:INDEX(F:F, COUNTA(A:A)),
    dia, G5:INDEX(G:G, COUNTA(A:A)),
    IF(dia>0, 3.1415926*(dia/2)^2*hgt, len*wid*hgt)
)
```

For rectangular elements, the calculation falls back to:

```text
Length × Width × Height
```

</details>

<details>
<summary>Earthwork Quantity</summary>

Earthwork receives the configured factor from `01_Parameters`:

```excel
=LET(
    u_vol, L5#,
    qty, H5:INDEX(H:H, COUNTA(A:A)),
    cat, C5:INDEX(C:C, COUNTA(A:A)),
    IF(
        cat="Earthwork",
        u_vol*qty*'01_Parameters'!$B$13,
        u_vol*qty
    )
)
```

The implementation therefore keeps the earthwork factor outside the base geometric calculation and applies it according to element category. 

</details>

<details>
<summary>Formwork Calculation</summary>

Formwork quantity is determined from element category:

```excel
=LET(
    cat, C5:INDEX(C:C, COUNTA(A:A)),
    len, D5:INDEX(D:D, COUNTA(A:A)),
    wid, E5:INDEX(E:E, COUNTA(A:A)),
    hgt, F5:INDEX(F:F, COUNTA(A:A)),
    qty, H5:INDEX(H:H, COUNTA(A:A)),
    SWITCH(
        cat,
        "Pile", 0,
        "Earthwork", 0,
        "Pile Cap", 2*(len+wid)*hgt*qty,
        "Beam", (2*hgt+wid)*len*qty,
        "Column", 2*(len+wid)*hgt*qty,
        0
    )
)
```

This reflects the implementation's stated treatment of formwork contact surfaces by element category. 

</details>

<details>
<summary>Reinforcement Weight</summary>

The reinforcement engine calculates total weight using the configured theoretical-weight constant and waste allowance:

```excel
=LET(
    dia, C5#,
    tot_m, F5#,
    den, '01_Parameters'!$B$11,
    waste, '01_Parameters'!$B$12,
    (tot_m*(den*dia*dia)*(1+waste))/1000
)
```

The parameter table defines the theoretical-weight constant as `0.006165` and the default reinforcement waste allowance as `3.0%`. 

</details>

<details>
<summary>BOQ Aggregation</summary>

The BOQ uses category-based aggregation such as:

```excel
=SUMIFS(
    '02_Qty_Input'!M:M,
    '02_Qty_Input'!C:C,
    "Earthwork"
)
```

and reinforcement diameter-based aggregation such as:

```excel
=SUMIFS(
    '03_Reinforcement_Engine'!I:I,
    '03_Reinforcement_Engine'!C:C,
    ">=16"
)
```

The final BOQ total is:

```excel
=SUM(F5:F10)
```

</details>

<details>
<summary>Cost Dashboard Indicators</summary>

The reinforcement intensity indicator is calculated as:

```excel
=LET(
    conc_vol, '04_BOQ_Summary'!$D$7,
    rebar_ton, '04_BOQ_Summary'!$D$9+'04_BOQ_Summary'!$D$10,
    IF(conc_vol>0,(rebar_ton*1000)/conc_vol,0)
)
```

This expresses reinforcement consumption as kilograms per cubic metre of structural concrete. 

</details>

### Validation Rules

| Field / Check           | Rule                                                                                          | Error Behavior                        |
| ----------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------- |
| Geometry completeness   | Non-earthwork elements with a positive count must have a positive height/depth.               | `FAIL`                                |
| Unit-rate validity      | Configured concrete, excavation, formwork, and reinforcement rates must be greater than zero. | `WARNING`                             |
| Reinforcement alignment | Generated reinforcement rows must align with input elements containing reinforcement data.    | `MISMATCH`                            |
| BOQ reconciliation      | BOQ total must equal the sum of line-item quantity × unit-rate values after rounding.         | `ERR`                                 |
| Dynamic-array integrity | Formula spill ranges must remain unobstructed by manually entered values or merged cells.     | `#SPILL!` requires input-area cleanup |

The source validation matrix defines four core checks covering geometry, pricing, reinforcement-row alignment, and BOQ amount reconciliation. 

</details>

## The Business Logic & Methodology

The model is built around one commercial principle: **keep the estimate connected from physical work to financial consequence**.

* **Element-level quantity calculation** converts measured dimensions into consistent physical quantities, so the estimate starts from construction reality rather than manually assembled totals.
* **Reinforcement calculation** converts bar diameter, element geometry, and quantities into procurement-oriented tonnage, making steel consumption visible alongside the structural quantity.
* **BOQ aggregation** converts physical quantities into commercial line items, reducing the gap between estimating and tender pricing.
* **Centralized assumptions** keep material rates, waste allowances, and other project parameters in one place, so a change in the commercial environment does not require rebuilding the estimate.
* **Validation and reconciliation** test whether the estimate is complete and internally consistent before the number is used for a commercial decision.

The result is deliberately narrower than an enterprise construction platform. It is a reusable estimating and decision-support workflow for the recurring question:

**What quantity is actually required, what will it cost under the current assumptions, and can the final number be traced back to the measured work?**

## Other Tools in This Series

A growing collection of lightweight Excel and browser-based business decision tools covering estimating, costing, operations, inventory, project control, and financial analysis.

→ Explore the related tools in the repository and project profile.

## License

This project is released under the **Apache License 2.0**.

See the [`LICENSE`](LICENSE) file for the complete license terms.



**Part 1 ends at the complete README structure above; the remaining publication-level sections can be split further if needed.**
```
