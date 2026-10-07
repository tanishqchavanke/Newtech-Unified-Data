'use client';

import React, { useState } from 'react';
import { useData } from '@/context/data-context';
import { formatCurrency, formatNumber } from '@/lib/data-analyzer';
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Users,
  IndianRupee,
  ArrowUpRight,
  Sparkles,
  UploadCloud,
  FileBarChart2,
  MessageSquareText,
  Search,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const PIE_COLORS = ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];

export function DashboardOverview() {
  const { dataset, rows, analysis, setActiveTab, loadDemoData } = useData();
  const [tableSearch, setTableSearch] = useState('');

  if (!analysis || !dataset) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-electric-50 border border-electric-200 text-electric-600 flex items-center justify-center mx-auto mb-4">
          <UploadCloud className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Your N.U.D workspace is ready.</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-6">
          Upload a CSV or Excel dataset, or explore with our realistic retail demo dataset to see N.U.D in action.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={loadDemoData}
            className="px-5 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-700 text-white font-semibold text-sm shadow-sm transition flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Try Demo Data</span>
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition"
          >
            Upload Your File
          </button>
        </div>
      </div>
    );
  }

  const { kpis, timeSeries, topProducts, categories, regions, qualityReport } = analysis;

  // Filtered rows for the preview table
  const filteredRows = rows.filter((row) => {
    if (!tableSearch) return true;
    return Object.values(row).some((val) =>
      String(val).toLowerCase().includes(tableSearch.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-850 text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:12px_12px]"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-electric-300 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Active Dataset: {dataset.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Good morning 👋</h1>
          <p className="text-slate-300 text-sm mt-1">
            Here's what's happening with your business data today.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('ask')}
            className="px-4 py-2 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
          >
            <MessageSquareText className="w-4 h-4" />
            <span>Ask N.U.D</span>
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur border border-white/15 transition flex items-center gap-1.5"
          >
            <FileBarChart2 className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-3">
            <span>Total Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-electric-50 text-electric-600 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-navy-900 tracking-tight">
            {formatCurrency(kpis.totalRevenue)}
          </div>
          <div className="flex items-center gap-1.5 text-xs mt-2.5 font-medium text-emerald-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{kpis.growthRate}% vs previous period</span>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-3">
            <span>Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-navy-900 tracking-tight">
            {formatNumber(kpis.totalOrders)}
          </div>
          <div className="flex items-center gap-1.5 text-xs mt-2.5 font-medium text-slate-500">
            <span>Avg {formatCurrency(kpis.averageOrderValue)} / order</span>
          </div>
        </div>

        {/* Customers */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-3">
            <span>Unique Customers</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-navy-900 tracking-tight">
            {formatNumber(kpis.totalCustomers)}
          </div>
          <div className="flex items-center gap-1.5 text-xs mt-2.5 font-medium text-emerald-600">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>High repeat buyer density</span>
          </div>
        </div>

        {/* Data Quality Score */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition cursor-pointer" onClick={() => setActiveTab('data')}>
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-3">
            <span>Data Health Score</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-navy-900 tracking-tight flex items-baseline gap-1">
            <span>{qualityReport.score}</span>
            <span className="text-sm font-normal text-slate-400">/ 100</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs mt-2.5 font-medium text-emerald-600">
            <span>{qualityReport.status} • {qualityReport.totalColumns} columns detected</span>
          </div>
        </div>
      </div>

      {/* Primary Visualizations Grid: 3 to 5 Useful Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Revenue & Sales Trend (Line/Area Chart) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-navy-900 text-base">Revenue Trend</h3>
              <p className="text-xs text-slate-500">Sales progression across tracked time intervals</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-electric-50 text-electric-700">
              <Calendar className="w-3.5 h-3.5" />
              <span>Timeline View</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeries} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="period" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `₹${val >= 100000 ? (val / 100000).toFixed(0) + 'L' : (val / 1000).toFixed(0) + 'k'}`}
                />
                <Tooltip
                  formatter={(value: any) => [formatCurrency(Number(value)), 'Revenue']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#revenueGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Category Revenue Share (Donut Chart) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col">
          <div className="mb-4">
            <h3 className="font-bold text-navy-900 text-base">Category Breakdown</h3>
            <p className="text-xs text-slate-500">Revenue split across business segments</p>
          </div>

          <div className="h-48 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="revenue"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [formatCurrency(Number(val)), 'Revenue']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category legend */}
          <div className="mt-auto space-y-2 pt-2 border-t border-slate-100 text-xs">
            {categories.slice(0, 4).map((c, i) => (
              <div key={c.category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}></span>
                  <span className="text-slate-700 font-medium">{c.category}</span>
                </div>
                <div className="text-slate-900 font-semibold">{c.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Charts: Top Products & Regional Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Products Bar Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-navy-900 text-base">Top Performing Products</h3>
              <p className="text-xs text-slate-500">Highest revenue contributors</p>
            </div>
            <button onClick={() => setActiveTab('insights')} className="text-xs font-semibold text-electric-600 hover:text-electric-700 flex items-center gap-1">
              <span>View Insights</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={topProducts}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis
                  type="number"
                  stroke="#94A3B8"
                  fontSize={11}
                  tickFormatter={(val) => `₹${val >= 100000 ? (val / 100000).toFixed(0) + 'L' : (val / 1000).toFixed(0) + 'k'}`}
                />
                <YAxis
                  type="category"
                  dataKey="product"
                  stroke="#64748B"
                  fontSize={11}
                  width={110}
                  tickFormatter={(val) => (val.length > 14 ? val.slice(0, 14) + '...' : val)}
                />
                <Tooltip
                  formatter={(val: any) => [formatCurrency(Number(val)), 'Revenue']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Performance Bar Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-navy-900 text-base">Regional Sales Distribution</h3>
              <p className="text-xs text-slate-500">Revenue split across geographical zones</p>
            </div>
            <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
              Top: {regions[0]?.region || 'N/A'}
            </div>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regions} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="region" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `₹${val >= 100000 ? (val / 100000).toFixed(0) + 'L' : (val / 1000).toFixed(0) + 'k'}`}
                />
                <Tooltip
                  formatter={(val: any) => [formatCurrency(Number(val)), 'Revenue']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                />
                <Bar dataKey="revenue" fill="#0F274A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Dataset Records Preview Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-bold text-navy-900 text-base">Recent Dataset Records</h3>
            <p className="text-xs text-slate-500">Showing first {Math.min(filteredRows.length, 6)} rows from {dataset.name}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-48 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search table..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-electric-500"
              />
            </div>
            <button
              onClick={() => setActiveTab('data')}
              className="px-3 py-1.5 text-xs font-semibold text-electric-600 hover:bg-electric-50 rounded-lg transition"
            >
              Full Explorer
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/60 text-slate-600">
                {Object.keys(rows[0] || {}).slice(0, 7).map((col) => (
                  <th key={col} className="py-2.5 px-3 font-semibold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRows.slice(0, 6).map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  {Object.keys(row).slice(0, 7).map((col) => {
                    const val = row[col];
                    const isRev = col.toLowerCase().includes('revenue') || col.toLowerCase().includes('price');
                    return (
                      <td key={col} className="py-2.5 px-3 whitespace-nowrap">
                        {isRev && typeof val === 'number' ? (
                          <span className="font-semibold text-navy-900">{formatCurrency(val)}</span>
                        ) : (
                          String(val ?? '-')
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
