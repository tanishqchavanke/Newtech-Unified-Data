'use client';

import React from 'react';
import { useData } from '@/context/data-context';
import { SoftwareIntegration } from '@/types';
import {
  Link as LinkIcon,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Zap,
  ArrowRight,
  Lock,
} from 'lucide-react';

export function SoftwareIntegrationsSection() {
  const { softwareList, openSoftwarePermission, user, dataset } = useData();

  return (
    <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-xs space-y-6 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-electric-600 dark:text-electric-400 uppercase tracking-wider">
              Auto-Sync Integrations
            </span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 dark:text-white">
            Link Your Business Software
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Connect using the same business account/email to automatically fetch orders, revenue, and customer records with explicit permission.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-navy-850 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-navy-800 self-start sm:self-auto">
          <Lock className="w-3.5 h-3.5 text-emerald-500" />
          <span>Read-only encrypted sync</span>
        </div>
      </div>

      {/* Grid of Available Software */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {softwareList.map((software) => {
          const isCurrentlyActive = dataset?.sourceSoftware === software.name;
          const isConnected = software.status === 'connected' || isCurrentlyActive;

          return (
            <div
              key={software.id}
              className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                isCurrentlyActive
                  ? 'border-electric-500 bg-electric-50/40 dark:bg-navy-800/80 shadow-xs ring-1 ring-electric-500/20'
                  : 'border-slate-200 dark:border-navy-800 bg-slate-50/50 dark:bg-navy-850/60 hover:border-slate-300 dark:hover:border-navy-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-xs"
                      style={{ backgroundColor: software.color }}
                    >
                      {software.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy-900 dark:text-white">
                        {software.name}
                      </h4>
                      <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 block">
                        {software.category}
                      </span>
                    </div>
                  </div>

                  {isConnected ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{isCurrentlyActive ? 'Active' : 'Linked'}</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-navy-800 text-slate-500 dark:text-slate-400">
                      Not Linked
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2 font-medium">
                  {software.tagline}
                </p>

                <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-4">
                  {software.recordsDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-navy-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  {software.sampleRecordCount}+ records
                </span>

                <button
                  type="button"
                  onClick={() => openSoftwarePermission(software)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    isCurrentlyActive
                      ? 'bg-electric-600 text-white shadow-xs hover:bg-electric-700'
                      : isConnected
                      ? 'bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-700'
                      : 'bg-navy-900 hover:bg-navy-850 dark:bg-electric-600 dark:hover:bg-electric-700 text-white'
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  <span>{isCurrentlyActive ? 'Re-Sync Live' : isConnected ? 'Sync Data' : 'Link & Fetch'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
