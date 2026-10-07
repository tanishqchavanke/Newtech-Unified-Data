# Newtech Unified Data (N.U.D)

> **One Platform. Infinite Insights.**

Newtech Unified Data (N.U.D) is an easy-to-use data workspace designed to help businesses bring their business data together, understand it, visualize it, and make better decisions.

The product feels like a modern SaaS application, with an interface designed to be **simple, clean, and easy for normal business users to understand** without needing data science or programming skills.

---

## Key Features

- **Instant Data Ingestion:** Upload CSV or Excel (`.xlsx`, `.xls`) spreadsheets with automatic column schema identification.
- **Data Health & Quality Scoring:** Automated health score (out of 100), missing value counters, duplicate row detection, and actionable cleaning tips.
- **Interactive Executive Dashboard:** Clean business KPIs (Total Revenue, Orders, Unique Customers, Period Growth Rate, Average Order Value) with responsive visual charts (Revenue trends, Category distributions, Top products, and Regional splits).
- **Automated Business Insights:** Digestible intelligence cards highlighting revenue growth, top sellers, and declining lines requiring attention.
- **Ask N.U.D Assistant:** Plain-English question answering with on-the-fly chart generation for queries such as *"What are my top 5 products?"* and *"Show me the sales trend."*
- **Executive PDF / Printable Reports:** 1-click formal executive briefings ready for management review and physical printout.
- **Demo Mode:** Explore immediately with 120+ realistic pre-loaded retail sales records without uploading personal files.

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 3. Environment Variables (Optional)

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description |
| --- | --- |
| `AI_API_KEY` | Optional API key for server-side AI model integration (built-in analytical engine functions 100% offline out-of-the-box). |
| `AI_MODEL_NAME` | Model identifier (defaults to `gemini-1.5-flash`). |

---

## Technology Stack

- **Framework:** Next.js (App Router, React 18, TypeScript)
- **Styling:** Tailwind CSS with Deep Navy & Electric Blue design palette
- **Data Parsing:** PapaParse (CSV) & SheetJS (Excel / XLSX)
- **Visualization:** Recharts & Lucide Icons
