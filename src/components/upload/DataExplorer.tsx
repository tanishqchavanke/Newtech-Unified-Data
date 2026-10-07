'use client';

import React, { useState } from 'react';
import { useData } from '@/context/data-context';
import { formatCurrency } from '@/lib/data-analyzer';
import {
  Table,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Hash,
  Calendar,
  Type,
  Coins,
  Layers,
} from 'lucide-react';

export function DataExplorer() {
  const { dataset, rows, analysis } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (!analysis || !dataset || rows.length === 0) return null;

  const { columns } = analysis;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'currency':
        return <Coins className="w-3 h-3 text-emerald-600" />;
      case 'number':
        return <Hash className="w-3 h-3 text-blue-600" />;
      case 'date':
        return <Calendar className="w-3 h-3 text-purple-600" />;
      case 'category':
        return <Layers className="w-3 h-3 text-amber-600" />;
      default:
        return <Type className="w-3 h-3 text-slate-500" />;
    }
  };

  const filteredRows = rows.filter((row) => {
    if (!searchTerm) return true;
    return Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-electric-600 uppercase tracking-wider">
          Schema & Records
        </span>
        <h2 className="text-xl font-bold text-navy-900 mt-0.5">Detected Columns & Preview</h2>
        <p className="text-xs text-slate-500 mt-1">
          N.U.D automatically detects field types so you don't have to configure schemas manually.
        </p>
      </div>

      {/* Column Type Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
        {columns.map((col) => (
          <div
            key={col.name}
            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-left"
          >
            <div className="flex items-center gap-1.5 mb-1">
              {getTypeIcon(col.type)}
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {col.type}
              </span>
            </div>
            <p className="text-xs font-bold text-navy-900 truncate" title={col.name}>
              {col.name}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {col.uniqueCount} unique • {col.nullCount > 0 ? `${col.nullCount} empty` : '100% filled'}
            </p>
          </div>
        ))}
      </div>

      {/* Table search & pagination bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search across all records..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-electric-500"
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-500">
          <span>
            Showing {(currentPage - 1) * rowsPerPage + 1} -{' '}
            {Math.min(currentPage * rowsPerPage, filteredRows.length)} of {filteredRows.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-md border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-semibold text-slate-700">
              {currentPage} / {Math.max(1, totalPages)}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-1 rounded-md border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <th className="py-2.5 px-3 w-10 text-center text-slate-400">#</th>
              {columns.map((c) => (
                <th key={c.name} className="py-2.5 px-3 whitespace-nowrap">
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {paginatedRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition">
                <td className="py-2.5 px-3 text-center text-slate-400 text-[11px]">
                  {(currentPage - 1) * rowsPerPage + idx + 1}
                </td>
                {columns.map((col) => {
                  const val = row[col.name];
                  const isCurrency = col.type === 'currency' || col.name.toLowerCase().includes('revenue');
                  return (
                    <td key={col.name} className="py-2.5 px-3 whitespace-nowrap">
                      {isCurrency && typeof val === 'number' ? (
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
  );
}
