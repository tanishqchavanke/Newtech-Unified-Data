'use client';

import React from 'react';
import { useData } from '@/context/data-context';
import {
  CheckCircle2,
  AlertTriangle,
  Copy,
  Table,
  ShieldCheck,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';

export function DataHealthCard() {
  const { analysis } = useData();

  if (!analysis) return null;

  const { qualityReport } = analysis;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-amber-600 bg-amber-50 border-amber-200';
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-electric-600 uppercase tracking-wider">
            Quality Inspection
          </span>
          <h2 className="text-xl font-bold text-navy-900 mt-0.5">Data Health</h2>
          <p className="text-xs text-slate-500 mt-1">{qualityReport.summary}</p>
        </div>

        {/* Quality Score Badge */}
        <div
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border ${getScoreColor(
            qualityReport.score
          )}`}
        >
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
              Quality Score
            </span>
            <span className="text-2xl font-black">{qualityReport.score}/100</span>
          </div>
          <ShieldCheck className="w-8 h-8 opacity-80" />
        </div>
      </div>

      {/* 4 Clean Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Missing Values */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Missing Values</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-navy-900">{qualityReport.missingValues}</div>
          <p className="text-[11px] text-slate-500 mt-1">
            {qualityReport.missingValues === 0 ? 'No empty fields' : 'Empty cells detected'}
          </p>
        </div>

        {/* Duplicates */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Duplicates</span>
            <Copy className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-navy-900">{qualityReport.duplicateRows}</div>
          <p className="text-[11px] text-slate-500 mt-1">
            {qualityReport.duplicateRows === 0 ? 'All rows unique' : 'Exact duplicate rows'}
          </p>
        </div>

        {/* Invalid Values */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Invalid Values</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-navy-900">{qualityReport.invalidValues}</div>
          <p className="text-[11px] text-slate-500 mt-1">Format anomalies</p>
        </div>

        {/* Columns Detected */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Columns Detected</span>
            <Table className="w-4 h-4 text-electric-600" />
          </div>
          <div className="text-2xl font-bold text-navy-900">{qualityReport.totalColumns}</div>
          <p className="text-[11px] text-slate-500 mt-1">Auto-typed schema</p>
        </div>
      </div>

      {/* Helpful Recommendations if any issues */}
      {qualityReport.suggestions.length > 0 && (
        <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
          <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block mb-0.5">Quick Optimization Tip:</span>
            <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-blue-800">
              {qualityReport.suggestions.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
