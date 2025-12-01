export const projects = [
  {
    id: 'azure-cost-usage',
    title: 'Azure Cost & Usage Dashboard',
    shortDescription: 'Real-time Azure spend, budget tracking, forecasting, and tag-based chargeback in a single Power BI view.',
    tags: ['Power BI', 'Azure Cost Management', 'FinOps', 'DAX'],
    images: [
      '/images/Portfolio/Project1/Homepage.png',
      '/images/Portfolio/Project1/AzureCostOverview.png',
      '/images/Portfolio/Project1/UsageDetails.png'
    ],
    embedUrl: 'https://app.fabric.microsoft.com/view?r=eyJrIjoiNDJjYzVkN2QtMDBmNy00YmVhLWJmZWQtZWQ2ZWY1MmQxMTkyIiwidCI6ImE0YTZlMGMxLWI1MzEtNDY4OS1hMGEwLTFhZDIyNTBiYTg0MyIsImMiOjl9',
    fullDescription: `A production-ready Azure FinOps dashboard that centralizes cost, usage, and tagging health across subscriptions, resource groups, services, and regions. It connects to Azure Cost Management exports and/or the Consumption APIs to surface daily spend, month-to-date (MTD) progress, end-of-month forecasts, budget variance, idle/underutilized hotspots, and tag coverage for accurate showback/chargeback. Interactive slicers for subscription, environment, department, and custom tags make it easy for finance, IT, and engineering leads to drill into anomalies and take action.`,
    businessProblem: `Finance and engineering teams lacked a single source of truth for Azure spend, leading to budget overruns, weak forecasting, and poor tag hygiene that blocked accurate cross-charging.`,
    technologies: ['Power BI', 'Power Query (M)', 'DAX', 'Azure Cost Management + Billing', 'Azure Consumption API', 'Azure Storage (CSV/Parquet exports)'],
    dataSources: [
      'Azure Cost Management export (daily CSV/Parquet to Blob/Data Lake)',
      'UsageDetails from Azure Consumption API',
      'Budgets API (monthly budgets & alerts)',
      'Resource/Tag inventory (e.g., Resource Graph export)'
    ],
    daxLogic: [
      {
        title: 'Total Cost',
        code: `Total Cost =
SUM ( 'Costs'[CostAmount] )`
      },
      {
        title: 'MTD Cost',
        code: `MTD Cost =
CALCULATE ( [Total Cost], DATESMTD ( 'Date'[Date] ) )`
      },
      {
        title: 'Daily Cost (latest day on context)',
        code: `Daily Cost =
VAR _today = MAX ( 'Date'[Date] )
RETURN
CALCULATE ( [Total Cost], KEEPFILTERS ( 'Date'[Date] = _today ) )`
      },
      {
        title: 'Days In Month / Days Elapsed',
        code: `Days In Month =
DAY ( EOMONTH ( MAX ( 'Date'[Date] ), 0 ) )

Days Elapsed (MTD) =
DISTINCTCOUNT ( DATESMTD ( 'Date'[Date] ) )`
      },
      {
        title: 'EOM Forecast (linear, based on MTD)',
        code: `EOM Forecast =
DIVIDE ( [MTD Cost], [Days Elapsed (MTD)] ) * [Days In Month]`
      },
      {
        title: 'Budget (MTD) & Variance %',
        code: `Budget MTD =
CALCULATE ( SUM ( 'Budget'[Amount] ), DATESMTD ( 'Date'[Date] ) )

Budget Variance % =
DIVIDE ( [MTD Cost] - [Budget MTD], [Budget MTD] )`
      },
      {
        title: '14-Day Anomaly Detection (simple z-score rule)',
        code: `Avg 14d =
CALCULATE ( AVERAGEX ( VALUES ( 'Date'[Date] ), [Daily Cost] ),
           DATESINPERIOD ( 'Date'[Date], MAX ( 'Date'[Date] ), -14, DAY ) )

Stdev 14d =
CALCULATE ( STDEVX.P ( VALUES ( 'Date'[Date] ), [Daily Cost] ),
           DATESINPERIOD ( 'Date'[Date], MAX ( 'Date'[Date] ), -14, DAY ) )

Is Anomalous (Today) =
VAR _z =
DIVIDE ( [Daily Cost] - [Avg 14d], [Stdev 14d] )
RETURN IF ( _z > 2, 1, 0 )`
      },
      {
        title: 'Tag Coverage % (Department tag example)',
        code: `Tagged Cost (Department) =
CALCULATE ( [Total Cost], NOT ( ISBLANK ( SELECTEDVALUE ( 'Costs'[Tag_Department] ) ) ) )

Tag Coverage % (Department) =
DIVIDE ( [Tagged Cost (Department)], [Total Cost] )`
      }
    ],
    keyFeatures: [
      'Cost overview with MTD trend, YoY/PoP variance, and end-of-month forecast',
      'Breakdowns by subscription, resource group, service, region, and pricing model',
      'Budget tracking with variance heatmaps and alert thresholds',
      'Tag governance: coverage %, missing/invalid tags, and showback/chargeback views',
      'Anomaly detection on daily spend (rolling 14-day baseline)',
      'Idle/underutilized hotspots and quick filters for Environment/Department',
      'Drillthrough to cost by resource with direct remediation links (optional)',
      'Exportable insights for finance (CSV/XLSX/PDF) and scheduled refresh in the Service'
    ]
  },
  {
    id: 'financial-reporting',
    title: 'Financial Reporting Dashboard',
    shortDescription: 'Comprehensive financial reporting in Power BI: KPIs, Actual vs Budget, Income Statement, and Balance Sheet with drill-downs.',
    tags: ['Power BI', 'Financial Reporting', 'Business Central', 'DAX'],
    images: [
      '/images/Portfolio/Project4/Finance1.png',
      '/images/Portfolio/Project4/Finance1b.png',
      '/images/Portfolio/Project4/Finance2.png',
      '/images/Portfolio/Project4/Finance3.png',
      '/images/Portfolio/Project4/Finance4.png'
    ],
    fullDescription: `An enterprise-ready financial reporting suite covering Executive Overview, Actual vs Budget analysis, detailed Income Statement, and Balance Sheet. The solution supports fiscal calendars, multiple account hierarchies, and dynamic slicers across account number/name, category, and subcategory with governed date filters. It features clean KPI cards, variance visuals, and drillable matrices for month and YTD views.`,
    businessProblem: `Finance teams needed a single, interactive reporting experience to replace static spreadsheets, reduce month-end close effort, and provide up-to-date insight on revenue, expenses, profitability, assets, equity, and liabilities.`,
    technologies: ['Power BI', 'Power Query (M)', 'DAX', 'Business Central'],
    dataSources: [
      'Business Central – G/L Entries',
      'Business Central – Budget Entries',
      'Account Categories and Subcategories',
      'Date/Fiscal calendar table'
    ],
    daxLogic: [
      {
        title: 'YTD Actual',
        code: `YTD Actual =\nCALCULATE( [Actual Amount], DATESYTD('Date'[Date]) )`
      },
      {
        title: 'YTD Budget',
        code: `YTD Budget =\nCALCULATE( [Budget Amount], DATESYTD('Date'[Date]) )`
      },
      {
        title: 'YTD Variance %',
        code: `YTD Variance % =\nDIVIDE( [YTD Actual] - [YTD Budget], [YTD Budget], 0 ) * 100`
      }
    ],
    keyFeatures: [
      'Executive KPIs for Revenue, Expenses, Net Profit, Assets, Equity, Liabilities',
      'Actual vs Budget with donut/column visuals and status badges',
      'Income Statement with drillable monthly matrix',
      'Balance Sheet by category with monthly columns',
      'Governed slicers: account number/name, category, subcategory, date range',
      'Responsive layout with branded theme'
    ]
  },
  {
    id: 'devops-case-ticket-management',
    title: 'DevOps Case & Ticket Management Dashboard',
    shortDescription: 'End-to-end view of tickets, incidents, SLAs and product workloads with trends, priorities, and statuses across DevOps pipelines and servicedesk.',
    tags: ['Power BI', 'Azure DevOps', 'Service Desk', 'DAX'],
    images: [
      '/images/Portfolio/Project3/image.png'
    ],
    fullDescription: `A production-grade DevOps and Service Desk monitoring dashboard that consolidates cases, incidents, requests, and change tickets into a single operational view. It tracks current workload by product/team, SLA attainment, backlog age, and weekly creation vs resolution trends. Interactive slicers (Client, License, Status, Type, Date) enable fast triage and executive reporting.`,
    businessProblem: `Operations lacked a unified, real-time view of ticket volumes and SLA risk across multiple queues. Managers had to manually compile weekly snapshots, making it difficult to spot rising backlogs, prioritize critical items, and coordinate handoffs between product teams.`,
    technologies: ['Power BI', 'Power Query (M)', 'DAX', 'Azure DevOps REST API/Exports', 'Service Desk/ITSM connector'],
    dataSources: [
      'Azure DevOps work items (Bugs, Tasks, User Stories, Custom States)',
      'Incident/Request data from ITSM tool (e.g., Service Desk, Freshservice, Jira Service Management)',
      'SLA calendar and priority matrix',
      'Product/team ownership mapping'
    ],
    daxLogic: [
      {
        title: 'Active Tickets',
        code: `Active Tickets =\nCOUNTROWS ( FILTER ( Tickets, Tickets[IsActive] = TRUE () ) )`
      },
      {
        title: 'Incident Count',
        code: `Incidents =\nCALCULATE ( COUNTROWS ( Tickets ), Tickets[Type] = "Incident" )`
      },
      {
        title: 'Requests Count',
        code: `Requests =\nCALCULATE ( COUNTROWS ( Tickets ), Tickets[Type] = "Request" )`
      },
      {
        title: 'Created vs Resolved (Weekly)',
        code: `Created (WK) =\nCALCULATE ( COUNTROWS ( Tickets ), ISBLANK ( Tickets[ResolvedDate] ), VALUES ( 'Date'[Week] ) )\n\nResolved (WK) =\nCALCULATE ( COUNTROWS ( Tickets ), NOT ISBLANK ( Tickets[ResolvedDate] ), VALUES ( 'Date'[Week] ) )`
      },
      {
        title: 'SLA Breach %',
        code: `SLA Breach % =\nVAR Breached = COUNTROWS ( FILTER ( Tickets, Tickets[SLAStatus] = "Breached" ) )\nVAR Total = COUNTROWS ( Tickets )\nRETURN DIVIDE ( Breached, Total, 0 )`
      }
    ],
    keyFeatures: [
      'KPI cards for Active Tickets, Incidents, and Requests',
      'Weekly trend lines for Created, Resolved, and Active work',
      'Backlog by DevOps status with product/team drill-down',
      'Priority and SLA compliance donuts with breach tracking',
      'Interactive slicers for Client, License, Status, Type, and Date range',
      'Last refresh timestamp and governed date slicer experience'
    ]
  },
  {
    id: 'budget-vs-actual-analysis',
    title: 'Budget vs Actual Analysis Dashboard',
    shortDescription: 'Budget vs Actual Analysis Dashboard – A Power BI solution that visualizes budget and actual performance across accounts, categories, and months. It provides dynamic variance insights, trend tracking, and real-time budget status indicators for financial control.',
    tags: ['Power BI', 'Business Central', 'Financial Analysis', 'Budget Control', 'DAX'],
    images: [
      '/images/Portfolio/Project2/image.png'
    ],
    fullDescription: `Budget vs Actual Analysis Dashboard in Power BI
This interactive financial performance dashboard enables organizations to monitor and analyze budget versus actual results across multiple dimensions — including account number, account name, category, and subcategory.

The solution integrates data from the General Ledger and Budget tables in Business Central to calculate monthly, year-to-date (YTD), and variance metrics, presented through modern visuals and KPIs.

Key features include:

Dynamic Filters: Slice data by GL Account, Category, Subcategory, and custom date range.

KPI Overview Cards: Instantly view total budget, actuals, YTD figures, and overall variance %.

Variance Indicators: Color-coded performance statuses (Excellent, On Track, or Over Budget).

Visual Insights: Interactive donut and column charts for quick budget-to-actual comparisons by month.

Detailed Matrix: Drill-down table of monthly budget and actual values per account category.

Professional Layout: Custom-branded BBbi theme with teal, orange, and white color palette for clarity and consistency.

This dashboard empowers finance teams to track expenditure efficiency, detect overspending early, and ensure accurate budget governance — driving better financial visibility and decision-making.`,
    businessProblem: `Finance teams struggled with manual budget tracking processes, lacking real-time visibility into budget performance across different account categories and months. The absence of dynamic variance analysis made it difficult to identify overspending patterns and maintain accurate financial control.`,
    technologies: ['Power BI', 'Business Central', 'DAX', 'Power Query', 'Financial Reporting'],
    dataSources: [
      'Business Central - General Ledger Entries',
      'Business Central - Budget Entries', 
      'Business Central - Account Categories',
      'Business Central - Account Subcategories'
    ],
    daxLogic: [
      {
        title: 'Budget Amount',
        code: `Budget Amount = 
SUM(Budget[Amount])`
      },
      {
        title: 'Actual Amount',
        code: `Actual Amount = 
SUM('G/L Entry'[Amount])`
      },
      {
        title: 'YTD Budget',
        code: `YTD Budget = 
CALCULATE(
    [Budget Amount],
    DATESYTD('Date'[Date])
)`
      },
      {
        title: 'YTD Actual',
        code: `YTD Actual = 
CALCULATE(
    [Actual Amount],
    DATESYTD('Date'[Date])
)`
      },
      {
        title: 'YTD Variance %',
        code: `YTD Variance % = 
DIVIDE(
    [YTD Actual] - [YTD Budget],
    [YTD Budget],
    0
) * 100`
      },
      {
        title: 'Budget Status',
        code: `Budget Status = 
VAR VariancePct = ABS([YTD Variance %])
RETURN
SWITCH(
    TRUE(),
    VariancePct <= 3, "Excellent (±3%)",
    VariancePct <= 10, "On Track (±10%)",
    "Over Budget (>10%)"
)`
      }
    ],
    keyFeatures: [
      'Dynamic filtering by GL Account, Category, and Subcategory',
      'Real-time KPI cards showing budget vs actual performance',
      'Color-coded variance indicators for quick status assessment',
      'Interactive donut chart for budget vs actual comparison',
      'Monthly trend analysis with column charts',
      'Detailed matrix table with drill-down capabilities',
      'Custom BBbi branding with professional color scheme',
      'Year-to-date and monthly variance calculations',
      'Responsive design for desktop and mobile viewing'
    ]
  },
  {
    id: 'cashflow-dutch-housing',
    title: 'Cashflow Dashboard - Dutch Housing',
    shortDescription: 'Comprehensive cash flow analysis dashboard for Dutch housing organizations with KPIs, cumulative trends, and detailed category breakdowns.',
    tags: ['Power BI', 'Cash Flow', 'Financial Reporting', 'DAX', 'Dutch Housing'],
    images: [
      '/images/Portfolio/Cashflow_Dutch_Housing.png'
    ],
    fullDescription: `A comprehensive cash flow management dashboard designed specifically for Dutch housing organizations. This Power BI solution provides real-time visibility into cash flow across operational, investment, and financing activities. The dashboard features key performance indicators (KPIs) for beginning balance, operational activities, investment activities, financing activities, and ending balance. It includes a cumulative cash flow chart showing monthly trends and cumulative values, along with a detailed breakdown table categorizing cash flows by DAEB, GEMENGD, and NDAEB classifications. Interactive filters allow users to drill down by administrative owner, journal, document number, cash flow category, and subcategory.`,
    businessProblem: `Dutch housing organizations needed a centralized view of cash flow to track operational performance, monitor investment activities, and manage financing requirements. The lack of real-time cash flow visibility made it difficult to identify trends, forecast future cash positions, and make informed financial decisions.`,
    technologies: ['Power BI', 'DAX', 'Power Query', 'Business Central', 'Financial Reporting'],
    dataSources: [
      'Business Central - General Ledger Entries',
      'Business Central - Cash Flow Categories',
      'Business Central - Journal Entries',
      'Date/Fiscal calendar table'
    ],
    daxLogic: [
      {
        title: 'Beginning Balance',
        code: `Begin Saldo =
CALCULATE(
    SUM('Cash Flow'[Amount]),
    'Cash Flow'[Date] < MIN('Date'[Date])
)`
      },
      {
        title: 'Operational Activities',
        code: `Operationele Activiteiten =
CALCULATE(
    SUM('Cash Flow'[Amount]),
    'Cash Flow'[Category] = "Operationele Activiteiten"
)`
      },
      {
        title: 'Investment Activities',
        code: `(Des)Investeringsactiviteiten =
CALCULATE(
    SUM('Cash Flow'[Amount]),
    'Cash Flow'[Category] = "Investeringsactiviteiten"
)`
      },
      {
        title: 'Financing Activities',
        code: `Financieringsactiviteiten =
CALCULATE(
    SUM('Cash Flow'[Amount]),
    'Cash Flow'[Category] = "Financieringsactiviteiten"
)`
      },
      {
        title: 'Ending Balance',
        code: `Eind Saldo =
[Begin Saldo] + 
[Operationele Activiteiten] + 
[(Des)Investeringsactiviteiten] + 
[Financieringsactiviteiten] + 
[Overig]`
      },
      {
        title: 'Cumulative Cash Flow',
        code: `Cumulative Cash Flow =
VAR CurrentDate = MAX('Date'[Date])
RETURN
CALCULATE(
    [Total Cash Flow],
    FILTER(
        ALL('Date'[Date]),
        'Date'[Date] <= CurrentDate
    )
)`
      },
      {
        title: 'Monthly Cash Flow',
        code: `Monthly Cash Flow =
CALCULATE(
    SUM('Cash Flow'[Amount]),
    DATESBETWEEN(
        'Date'[Date],
        STARTOFMONTH('Date'[Date]),
        ENDOFMONTH('Date'[Date])
    )
)`
      }
    ],
    keyFeatures: [
      'KPI cards for beginning balance, operational activities, investment activities, financing activities, and ending balance',
      'Cumulative cash flow chart showing monthly trends and cumulative values over time',
      'Detailed category breakdown table with DAEB, GEMENGD, and NDAEB classifications',
      'Interactive filters for administrative owner, journal, document number, cash flow category, and subcategory',
      'Date range selection for flexible period analysis',
      'Monthly breakdown by category and subcategory',
      'Total calculations across all categories and time periods',
      'Clean, modern design with teal and white color scheme',
      'Dutch language interface for local housing organizations'
    ]
  },
  {
    id: 'oppa-wall-art-sales',
    title: 'OPPA Wall Art - Sales & Product Overview',
    shortDescription: 'Comprehensive sales dashboard for OPPA Wall Art company featuring sales trends, product performance, quote vs paid analysis, and customer insights.',
    tags: ['Power BI', 'Sales Analytics', 'Product Performance', 'DAX', 'E-commerce'],
    images: [
      '/images/Portfolio/OPPA1.png',
      '/images/Portfolio/OPPA2.png',
      '/images/Portfolio/OPPA3.png',
      '/images/Portfolio/OPPA_Home.png',
      '/images/Portfolio/OPPA_End.png'
    ],
    embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiNGJlMGJmZmMtYTU3ZS00MjM0LWEyMWEtMzE5MDljYmYyMmM3IiwidCI6ImE0YTZlMGMxLWI1MzEtNDY4OS1hMGEwLTFhZDIyNTBiYTg0MyIsImMiOjl9',
    fullDescription: `A comprehensive sales and product overview dashboard designed for OPPA Wall Art company. This Power BI solution provides real-time visibility into sales performance, product category breakdowns, and customer metrics. The dashboard features key performance indicators (KPIs) for quotes, total sales, and customer count. It includes multiple visualizations: a time-series line chart showing sales trends over time, a donut chart breaking down sales by product category (African continent, Geometric, Moon wall Art, Diffuser wall Art, Large Sound Diffuser), a dual-line chart comparing quoted vs paid sales, and a horizontal bar chart showing sales performance by year. Interactive filters allow users to drill down by year, month, and product type for detailed analysis. The solution also includes customer analysis with top customers by sales, geographic sales visualization on a map of South Africa, and product category performance breakdowns.`,
    businessProblem: `OPPA Wall Art needed a centralized view of sales performance to track revenue trends, understand product category performance, and monitor the conversion from quotes to paid sales. The lack of real-time sales visibility made it difficult to identify top-performing products, track sales trends over time, and make informed inventory and marketing decisions.`,
    technologies: ['Power BI', 'DAX', 'Power Query', 'Sales Analytics', 'E-commerce Integration', 'Azure Maps'],
    dataSources: [
      'Sales Transaction Data',
      'Product Catalog',
      'Customer Database',
      'Quote/Order Management System',
      'Geographic/Location Data',
      'Date/Fiscal calendar table'
    ],
    daxLogic: [
      {
        title: 'Total Sales',
        code: `Total Sales =
SUM(Sales[Amount])`
      },
      {
        title: 'Total Quotes',
        code: `Total Quotes =
COUNTROWS(
    FILTER(
        Sales,
        Sales[Status] = "Quote"
    )
)`
      },
      {
        title: 'Total Customers',
        code: `Total Customers =
DISTINCTCOUNT(Sales[CustomerID])`
      },
      {
        title: 'Sales by Product Category',
        code: `Sales by Category =
CALCULATE(
    [Total Sales],
    VALUES('Product'[Category])
)`
      },
      {
        title: 'Quote vs Paid Comparison',
        code: `Quoted Sales =
CALCULATE(
    [Total Sales],
    Sales[Status] = "Quote"
)

Paid Sales =
CALCULATE(
    [Total Sales],
    Sales[Status] = "Paid"
)`
      },
      {
        title: 'Sales by Year',
        code: `Sales by Year =
CALCULATE(
    [Total Sales],
    VALUES('Date'[Year])
)`
      },
      {
        title: 'Top Customers by Sales',
        code: `Top Customers =
TOPN(
    10,
    VALUES('Customer'[CustomerName]),
    [Total Sales],
    DESC
)`
      },
      {
        title: 'Conversion Rate (Quote to Paid)',
        code: `Conversion Rate % =
DIVIDE(
    [Paid Sales],
    [Quoted Sales],
    0
) * 100`
      }
    ],
    keyFeatures: [
      'KPI cards for total quotes, total sales, and customer count',
      'Time-series line chart showing sales trends from Jan 2022 to Jul 2024',
      'Donut chart displaying sales breakdown by product category with percentages',
      'Dual-line chart comparing quoted vs paid sales over time',
      'Horizontal bar chart showing sales performance by year (2022, 2023, 2024)',
      'Top 10 customers bar chart showing individual customer sales contributions',
      'Geographic map visualization showing sales distribution across South Africa',
      'Product category bar chart showing sales by product type',
      'Interactive filters for year, month, and product type',
      'Product category analysis: African continent, Geometric, Moon wall Art, Diffuser wall Art, Large Sound Diffuser',
      'Clean, modern design with orange and white color scheme matching OPPA brand',
      'Real-time sales performance tracking and trend analysis'
    ]
  },
  {
    id: 'dutch-housing-rental',
    title: 'Dutch Housing Rental Property Dashboard',
    shortDescription: 'Comprehensive rental property management dashboard for Dutch housing organizations with occupancy tracking, vacancy analysis, and financial KPIs.',
    tags: ['Power BI', 'Property Management', 'Rental Analytics', 'DAX', 'Dutch Housing'],
    images: [
      '/images/Portfolio/DutchHousing.png'
    ],
    fullDescription: `A comprehensive rental property management dashboard designed specifically for Dutch housing organizations. This Power BI solution provides real-time visibility into property occupancy, vacancy rates, rental income, and operational expenses. The dashboard features key performance indicators (KPIs) including total units, vacancy units, occupancy units, potential rent, total rent, and vacancy loss. It includes detailed analysis of occupancy percentages, vacancy percentages, and gap analysis. The solution provides month-over-month trends for total rent and vacancy units, along with operational expense breakdowns by category. Interactive filters allow users to drill down by location (woonplaats), vacancy type (leegstandstype), building description (gebouw), tenant component (huurdercomp), and rental contract number (huurcontractnr).`,
    businessProblem: `Dutch housing organizations needed a centralized view of rental property performance to track occupancy rates, identify vacant units, monitor rental income, and analyze operational expenses. The lack of real-time property visibility made it difficult to optimize occupancy, reduce vacancy losses, and make informed property management decisions.`,
    technologies: ['Power BI', 'DAX', 'Power Query', 'Property Management', 'Financial Reporting'],
    dataSources: [
      'Property Management System',
      'Rental Contract Database',
      'Vacancy Tracking System',
      'Financial/Operational Expense Data',
      'Date/Fiscal calendar table'
    ],
    daxLogic: [
      {
        title: 'Total Units',
        code: `Total Units =
DISTINCTCOUNT('Property'[UnitID])`
      },
      {
        title: 'Vacancy Units',
        code: `Vacancy Units =
CALCULATE(
    DISTINCTCOUNT('Property'[UnitID]),
    'Property'[Status] = "Vacant"
)`
      },
      {
        title: 'Occupancy Units',
        code: `Occupancy Units =
[Total Units] - [Vacancy Units]`
      },
      {
        title: 'Occupancy Percentage',
        code: `Occupancy % =
DIVIDE(
    [Occupancy Units],
    [Total Units],
    0
) * 100`
      },
      {
        title: 'Vacancy Percentage',
        code: `Vacancy % =
DIVIDE(
    [Vacancy Units],
    [Total Units],
    0
) * 100`
      },
      {
        title: 'Total Rent',
        code: `Total Rent =
SUM('Rental'[RentAmount])`
      },
      {
        title: 'Potential Rent',
        code: `Potential Rent =
SUMX(
    VALUES('Property'[UnitID]),
    RELATED('Property'[BaseRent])
)`
      },
      {
        title: 'Vacancy Loss',
        code: `Vacancy Loss =
[Potential Rent] - [Total Rent]`
      },
      {
        title: 'Gap Percentage',
        code: `Gap % =
DIVIDE(
    [Vacancy Loss],
    [Potential Rent],
    0
) * 100`
      }
    ],
    keyFeatures: [
      'KPI cards for total units, vacancy units, occupancy units, potential rent, total rent, and vacancy loss',
      'Occupancy and vacancy percentage tracking with period-based calculations',
      'Monthly trend analysis for total rent and vacancy units',
      'Donut chart showing occupancy, vacancy, and gap percentages',
      'Operational expense breakdown by category (exploitatiepost_bedrag)',
      'Interactive filters for location, vacancy type, building, tenant component, and contract number',
      'Date range selection for flexible period analysis',
      'Gap analysis showing potential revenue loss from vacancies',
      'Vacancy days tracking for current year',
      'Clean, modern design with professional color scheme',
      'Dutch language interface for local housing organizations'
    ]
  },
  {
    id: 'invoice-automation',
    title: 'Invoice Automation Control Center',
    shortDescription: 'End-to-end Azure + Power BI dashboard for automated invoice processing with real-time tracking and AI-driven validation.',
    tags: ['Power BI', 'Azure', 'AI Automation', 'Business Central'],
    image: '/images/dashboard1.png',
    fullDescription: `A comprehensive invoice automation system that integrates Azure Logic Apps, Power Automate, and Power BI to create an intelligent control center for invoice processing. This solution reduced manual processing time by 85% and improved accuracy to 99.2%.`,
    businessProblem: `The finance team was spending over 120 hours per month manually processing invoices, leading to delays in vendor payments and frequent data entry errors. The lack of visibility into the invoice pipeline made it difficult to track bottlenecks and SLA compliance.`,
    technologies: ['Power BI', 'Azure Logic Apps', 'Azure Cognitive Services', 'Business Central', 'Power Automate', 'SQL Server'],
    dataSources: ['Business Central API', 'Azure Blob Storage', 'SharePoint', 'SQL Database'],
    daxLogic: [
      {
        title: 'Invoice Processing Rate',
        code: `Invoice Processing Rate = 
DIVIDE(
    CALCULATE(
        COUNT(Invoices[InvoiceID]),
        Invoices[Status] = "Processed"
    ),
    COUNT(Invoices[InvoiceID]),
    0
) * 100`
      },
      {
        title: 'Average Processing Time',
        code: `Avg Processing Time = 
AVERAGEX(
    FILTER(
        Invoices,
        Invoices[Status] = "Processed"
    ),
    DATEDIFF(
        Invoices[ReceivedDate],
        Invoices[ProcessedDate],
        HOUR
    )
)`
      }
    ],
    keyFeatures: [
      'Real-time invoice tracking dashboard',
      'AI-powered data extraction and validation',
      'Automated routing and approval workflows',
      'Exception handling and alerts',
      'Vendor performance analytics'
    ]
  },
  {
    id: 'budget-vs-actual',
    title: 'Budget vs Actual Report',
    shortDescription: 'Business Central integrated Power BI model with advanced DAX for variance analysis and predictive forecasting.',
    tags: ['Power BI', 'Business Central', 'DAX', 'Financial Reporting'],
    image: '/images/dashboard2.png',
    fullDescription: `A sophisticated financial reporting solution that connects directly to Dynamics 365 Business Central to provide real-time budget variance analysis, trend forecasting, and departmental performance tracking.`,
    businessProblem: `Executive leadership lacked real-time visibility into budget performance across departments. Monthly budget reports were generated manually in Excel, taking 3-4 days to compile and often containing outdated information by the time they were reviewed.`,
    technologies: ['Power BI', 'Business Central', 'DAX Studio', 'Power Query'],
    dataSources: ['Business Central - G/L Entries', 'Business Central - Budget Entries', 'Business Central - Dimensions'],
    daxLogic: [
      {
        title: 'Budget Variance',
        code: `Budget Variance = 
VAR ActualAmount = SUM('G/L Entry'[Amount])
VAR BudgetAmount = SUM('G/L Budget Entry'[Amount])
RETURN
    ActualAmount - BudgetAmount`
      },
      {
        title: 'Variance %',
        code: `Variance % = 
DIVIDE(
    [Budget Variance],
    SUM('G/L Budget Entry'[Amount]),
    0
) * 100`
      }
    ],
    keyFeatures: [
      'Real-time budget vs actual comparison',
      'Department and cost center drill-down',
      'Predictive year-end forecasting',
      'Monthly trend analysis',
      'Automated variance alerts'
    ]
  },
  {
    id: 'cashflow-vat',
    title: 'Cashflow & VAT Analysis',
    shortDescription: 'Dynamic Power BI visuals with pro-rata VAT logic, cash flow forecasting, and liquidity planning tools.',
    tags: ['Power BI', 'VAT Compliance', 'Cash Flow', 'Treasury'],
    image: '/images/dashboard3.png',
    fullDescription: `A comprehensive treasury and tax compliance solution that provides real-time cash flow visibility, VAT calculation automation with pro-rata support, and intelligent forecasting for liquidity planning.`,
    businessProblem: `The finance team struggled with complex VAT calculations involving multiple tax rates and pro-rata scenarios. Cash flow visibility was limited to bank statements, with no forward-looking forecasting capability.`,
    technologies: ['Power BI', 'DAX', 'Power Query', 'Business Central', 'Azure SQL'],
    dataSources: ['Business Central - VAT Entries', 'Bank Transactions', 'Sales & Purchase Orders', 'Payment Terms Master Data'],
    daxLogic: [
      {
        title: 'Pro-Rata VAT Calculation',
        code: `Pro-Rata VAT = 
VAR TotalRevenue = 
    CALCULATE(SUM(Sales[Amount]), ALL(Sales[VATRate]))
VAR TaxableRevenue = 
    CALCULATE(SUM(Sales[Amount]), Sales[VATRate] > 0)
VAR ProRataPercentage = DIVIDE(TaxableRevenue, TotalRevenue, 0)
VAR InputVAT = SUM('Purchase VAT'[VATAmount])
RETURN
    InputVAT * ProRataPercentage`
      }
    ],
    keyFeatures: [
      'Real-time cash position tracking',
      'Pro-rata VAT calculation engine',
      '90-day cash flow forecast',
      'What-if scenario modeling',
      'Payment timing optimization'
    ]
  },
  {
    id: 'project-cost',
    title: 'Project Cost & Obligations Dashboard',
    shortDescription: 'DAX-driven reporting model for project cost tracking, resource allocation, and financial commitment analysis.',
    tags: ['Power BI', 'Project Accounting', 'Resource Management', 'DAX'],
    image: '/images/dashboard4.png',
    fullDescription: `A sophisticated project management and cost control system that provides real-time visibility into project financial performance, resource utilization, and obligation tracking for improved project profitability.`,
    businessProblem: `Project managers had no real-time view of project costs against budgets, leading to multiple projects exceeding their budgets before issues were identified.`,
    technologies: ['Power BI', 'Business Central', 'DAX', 'Project Module Integration'],
    dataSources: ['Business Central - Project Ledger', 'Resource Allocations', 'Purchase Commitments', 'Time Sheets'],
    daxLogic: [
      {
        title: 'Total Project Cost',
        code: `Total Project Cost = 
VAR ActualCost = 
    CALCULATE(
        SUM('Project Ledger'[Total Cost]),
        'Project Ledger'[Entry Type] = "Usage"
    )
VAR CommittedCost = 
    CALCULATE(
        SUM('Purchase Line'[Outstanding Amount]),
        'Purchase Line'[Job No.] = SELECTEDVALUE('Project'[No.])
    )
RETURN
    ActualCost + CommittedCost`
      }
    ],
    keyFeatures: [
      'Real-time project P&L by project',
      'Resource utilization tracking',
      'Budget vs actual with forecasting',
      'Commitment and obligation tracking',
      'Project health scoring'
    ]
  },
  {
    id: 'executive-overview',
    title: 'Executive Overview Dashboard',
    shortDescription: 'KPIs and department performance tracker with drill-through capabilities and executive-level insights.',
    tags: ['Power BI', 'Executive Reporting', 'KPI Tracking', 'Strategic Analytics'],
    image: '/images/dashboard5.png',
    fullDescription: `A comprehensive executive dashboard that consolidates key performance indicators from across the organization, providing leadership with a single source of truth for strategic decision-making.`,
    businessProblem: `Executive leadership was receiving fragmented reports from different departments in various formats, making it difficult to get a holistic view of organizational performance.`,
    technologies: ['Power BI', 'Business Central', 'Azure SQL', 'Power Automate', 'Multiple Data Connectors'],
    dataSources: ['Business Central - Financial Data', 'Sales CRM', 'HR Systems', 'Operations Database'],
    daxLogic: [
      {
        title: 'Revenue Growth YoY',
        code: `Revenue Growth YoY % = 
VAR CurrentYearRevenue = 
    CALCULATE(SUM(Sales[Amount]), DATESYTD('Date'[Date]))
VAR PriorYearRevenue = 
    CALCULATE(SUM(Sales[Amount]), DATESYTD(DATEADD('Date'[Date], -1, YEAR)))
RETURN
    DIVIDE(CurrentYearRevenue - PriorYearRevenue, PriorYearRevenue, 0) * 100`
      }
    ],
    keyFeatures: [
      'Real-time KPI monitoring across all departments',
      'Drill-through to detailed departmental reports',
      'Trend analysis and forecasting',
      'Automated alerts for threshold breaches',
      'Mobile-optimized for on-the-go access'
    ]
  },
  {
    id: 'sales-pipeline',
    title: 'Sales Pipeline Analytics',
    shortDescription: 'AI-enhanced sales forecasting with conversion tracking, deal health scoring, and rep performance analytics.',
    tags: ['Power BI', 'Sales Analytics', 'AI Forecasting', 'CRM Integration'],
    image: '/images/dashboard6.png',
    fullDescription: `An intelligent sales analytics platform that combines CRM data with AI-driven forecasting to provide accurate revenue predictions and identify at-risk deals.`,
    businessProblem: `Sales forecasting was highly inaccurate, with actual results varying by 30-40% from projections. Sales leadership had limited visibility into pipeline health.`,
    technologies: ['Power BI', 'Azure ML', 'Dynamics 365 Sales', 'Power Automate'],
    dataSources: ['Dynamics 365 Sales', 'Email Engagement Data', 'Calendar Activities', 'Historical Sales Data'],
    daxLogic: [
      {
        title: 'Weighted Pipeline Value',
        code: `Weighted Pipeline = 
SUMX(
    Opportunity,
    Opportunity[Estimated Value] * RELATED('Stage'[Win Probability])
)`
      }
    ],
    keyFeatures: [
      'AI-powered revenue forecasting',
      'Deal health scoring',
      'Sales rep performance tracking',
      'Pipeline coverage analysis',
      'Win/loss analysis'
    ]
  }
];

export const getProjectById = (id) => {
  return projects.find(project => project.id === id);
};

