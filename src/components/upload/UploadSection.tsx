'use client';

import React, { useState, useRef } from 'react';
import { useData } from '@/context/data-context';
import { DataHealthCard } from './DataHealthCard';
import { DataExplorer } from './DataExplorer';
import {
  UploadCloud,
  FileSpreadsheet,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Loader2,
  FileCheck2,
  ArrowRight,
} from 'lucide-react';

export function UploadSection() {
  const { dataset, handleFileUpload, loadDemoData, isLoading, error, setActiveTab } = useData();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      await processFile(file);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      await processFile(file);
    }
  };

  const processFile = async (file: File) => {
    setUploadProgress(true);
    const success = await handleFileUpload(file);
    setUploadProgress(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-electric-600 uppercase tracking-wider">
              Data Ingestion
            </span>
            <h1 className="text-2xl font-bold text-navy-900 mt-1">Bring Your Data to N.U.D</h1>
            <p className="text-slate-500 text-sm mt-1">
              Upload a CSV or Excel file to start discovering insights.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadDemoData}
              className="px-4 py-2 rounded-xl bg-electric-50 hover:bg-electric-100 text-electric-700 text-xs font-semibold border border-electric-200 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-electric-600" />
              <span>Try Demo Data</span>
            </button>
            {dataset && (
              <button
                onClick={() => setActiveTab('overview')}
                className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-850 text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5"
              >
                <span>View Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Upload Drop Zone Box */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-6 border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-electric-500 bg-electric-50/50 scale-[1.005]'
              : 'border-slate-300 hover:border-electric-400 bg-slate-50/50 hover:bg-slate-50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="w-16 h-16 rounded-2xl bg-electric-100 text-electric-600 flex items-center justify-center mx-auto mb-4">
            {isLoading || uploadProgress ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              <UploadCloud className="w-8 h-8" />
            )}
          </div>

          <h3 className="text-lg font-bold text-navy-900">Drag & Drop your file here</h3>
          <p className="text-sm text-slate-500 mt-1">or click to browse from your computer</p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
            <span className="px-2.5 py-1 bg-white rounded-md border border-slate-200">CSV</span>
            <span className="px-2.5 py-1 bg-white rounded-md border border-slate-200">Excel / XLSX</span>
            <span>Up to 25MB</span>
          </div>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* File Analysis Status Strip */}
        {dataset && (
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-navy-900 flex items-center gap-2">
                  <span>{dataset.name}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Ready
                  </span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Size: {(dataset.sizeBytes / 1024).toFixed(1)} KB • {dataset.rowCount} rows • {dataset.columnCount} columns
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => processFile(selectedFile || new File([], dataset.name))}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition"
              >
                Re-Analyze
              </button>
              <button
                onClick={() => setActiveTab('overview')}
                className="px-3.5 py-1.5 rounded-lg bg-electric-600 hover:bg-electric-700 text-white text-xs font-semibold shadow-xs transition"
              >
                Open Dashboard
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Data Health Section */}
      <DataHealthCard />

      {/* Interactive Data Explorer */}
      <DataExplorer />
    </div>
  );
}
