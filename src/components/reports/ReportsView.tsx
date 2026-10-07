'use client';

import React, { useRef } from 'react';
import { useData } from '@/context/data-context';
import { formatCurrency, formatNumber } from '@/lib/data-analyzer';
import { Logo } from '../ui/Logo';
import {
  FileText,
  Printer,
  Download,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export function ReportsView() {
  const { dataset, analysis, user, loadDemoData } = useData();
  const reportRef = useRef<HTMLDivElement>(null);

  if (!analysis || !dataset) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center py-20 bg-white rounded-2xl border border-slate-200">
        <FileText className="w-10 h-10 text-electric-600 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-navy-900 mb-2">No data loaded to compile report</h2>
        <p className="text-xs text-slate-500 mb-6">
          Load demo data or upload a file first to compile a full executive briefing report.
        </p>
        <button
          onClick={loadDemoData}
          className="px-4 py-2 rounded-xl bg-electric-600 hover:bg-electric-700 text-white font-semibold text-xs transition"
        >
          Load Demo Data
        </button>
      </div>
    );
  }

  const { kpis, qualityReport, insights, topProducts, timeSeries, categories } = analysis;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Action Header (Hidden during print) */}
      <div className="print:hidden bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-electric-600 uppercase tracking-wider">
            Executive Deliverables
          </span>
          <h1 className="text-2xl font-bold text-navy-900 mt-0.5">Business Intelligence Report</h1>
          <p className="text-xs text-slate-500 mt-1">
            Clean, formal summary ready for team sharing and leadership review.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-850 text-white text-xs font-semibold shadow-xs transition flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Sheet */}
      <div
        ref={reportRef}
        className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm max-w-4xl mx-auto space-y-8 print:p-0 print:border-none print:shadow-none"
      >
        {/* Document Header */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Logo variant="full" showTagline={true} />
            <h2 className="text-2xl font-bold text-navy-900 mt-3">Executive Performance Report</h2>
            <p className="text-xs text-slate-500">
              Source: <span className="font-semibold text-slate-700">{dataset.name}</span> ({dataset.rowCount} records)
            </p>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-500 space-y-1">
            <p className="flex items-center sm:justify-end gap-1.5 font-medium text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-electric-600" />
              <span>{currentDate}</span>
            </p>
            <p>Prepared for: <span className="font-semibold text-navy-900">{user.name}</span></p>
            <p>Organization: <span className="font-semibold text-navy-900">{user.company}</span></p>
          </div>
        </div>

        {/* 1. Executive Summary */}
        <div>
          <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
            1. Executive Summary
          </h3>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
            During the evaluated tracking period, the business accumulated a cumulative revenue of{' '}
            <strong>{formatCurrency(kpis.totalRevenue)}</strong> across{' '}
            <strong>{formatNumber(kpis.totalOrders)} customer transactions</strong>. The growth rate is currently{' '}
            <strong>+{kpis.growthRate}%</strong>, led predominantly by customer interest in{' '}
            <strong>{kpis.topCategory.name}</strong> products. Data integrity scored{' '}
            <strong>{qualityReport.score}/100</strong>, indicating trustworthy underlying operational metrics.
          </div>
        </div>

        {/* 2. Key Business Metrics */}
        <div>
          <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-3">
            2. Primary Performance Indicators
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Total Revenue</span>
              <span className="text-xl font-bold text-navy-900 block mt-1">
                {formatCurrency(kpis.totalRevenue)}
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
                +{kpis.growthRate}% Growth
              </span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Orders Processed</span>
              <span className="text-xl font-bold text-navy-900 block mt-1">
                {formatNumber(kpis.totalOrders)}
              </span>
              <span className="text-[10px] text-slate-500 mt-1 block">
                Avg {formatCurrency(kpis.averageOrderValue)} / order
              </span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Unique Customers</span>
              <span className="text-xl font-bold text-navy-900 block mt-1">
                {formatNumber(kpis.totalCustomers)}
              </span>
              <span className="text-[10px] text-slate-500 mt-1 block">Active buyers</span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Data Health</span>
              <span className="text-xl font-bold text-navy-900 block mt-1">
                {qualityReport.score}/100
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
                {qualityReport.status}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Visual Charts Overview */}
        <div>
          <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-3">
            3. Visual Performance Trends
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl border border-slate-200">
              <p className="text-xs font-bold text-navy-900 mb-2">Revenue Progression</p>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeSeries} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <XAxis dataKey="period" stroke="#94A3B8" fontSize={10} tickLine={false} />
                    <YAxis
                      stroke="#94A3B8"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `₹${v >= 100000 ? (v / 100000).toFixed(0) + 'L' : (v / 1000).toFixed(0) + 'k'}`}
                    />
                    <Tooltip formatter={(v: any) => [formatCurrency(Number(v)), 'Revenue']} />
                    <Area type="monotone" dataKey="revenue" stroke="#2563EB" fill="#DBEAFE" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200">
              <p className="text-xs font-bold text-navy-900 mb-2">Top 5 Products</p>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topProducts} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <XAxis
                      dataKey="product"
                      stroke="#94A3B8"
                      fontSize={9}
                      tickLine={false}
                      tickFormatter={(v) => (v.length > 9 ? v.slice(0, 9) + '..' : v)}
                    />
                    <YAxis
                      stroke="#94A3B8"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `₹${v >= 100000 ? (v / 100000).toFixed(0) + 'L' : (v / 1000).toFixed(0) + 'k'}`}
                    />
                    <Tooltip formatter={(v: any) => [formatCurrency(Number(v)), 'Revenue']} />
                    <Bar dataKey="revenue" fill="#0F274A" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Strategic Observations */}
        <div>
          <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
            4. Strategic Observations
          </h3>
          <div className="space-y-2">
            {insights.map((ins, i) => (
              <div key={i} className="p-3 rounded-lg border border-slate-200 flex items-start gap-2.5 text-xs">
                <span className="w-5 h-5 rounded-full bg-slate-100 font-bold text-slate-700 flex items-center justify-center flex-shrink-0 text-[10px]">
                  {i + 1}
                </span>
                <div>
                  <span className="font-bold text-navy-900">{ins.title}: </span>
                  <span className="text-slate-600">{ins.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document Footer */}
        <div className="border-t border-slate-200 pt-6 flex items-center justify-between text-[11px] text-slate-400">
          <span>Generated by Newtech Unified Data (N.U.D)</span>
          <span>Confidential • Internal Business Use</span>
        </div>
      </div>
    </div>
  );
}
