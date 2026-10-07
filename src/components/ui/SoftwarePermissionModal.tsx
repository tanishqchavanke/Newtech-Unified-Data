'use client';

import React, { useState } from 'react';
import { useData } from '@/context/data-context';
import { SoftwareIntegration } from '@/types';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  Loader2,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

interface SoftwarePermissionModalProps {
  software: SoftwareIntegration | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmSync: (software: SoftwareIntegration) => Promise<void>;
}

export function SoftwarePermissionModal({
  software,
  isOpen,
  onClose,
  onConfirmSync,
}: SoftwarePermissionModalProps) {
  const { user } = useData();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStep, setSyncStep] = useState<'consent' | 'syncing' | 'completed'>('consent');

  if (!isOpen || !software) return null;

  const handleGrantPermission = async () => {
    setIsSyncing(true);
    setSyncStep('syncing');

    // Simulate verified secure OAuth handshake & data ingestion
    setTimeout(async () => {
      await onConfirmSync(software);
      setSyncStep('completed');
      setTimeout(() => {
        setIsSyncing(false);
        setSyncStep('consent');
        onClose();
      }, 1200);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-navy-800 overflow-hidden text-slate-900 dark:text-slate-100 transition-colors">
        {/* Header Accent Bar */}
        <div
          className="h-2 w-full"
          style={{ backgroundColor: software.color || '#2563EB' }}
        />

        {/* Close Button */}
        {!isSyncing && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="p-6 sm:p-7">
          {syncStep === 'consent' && (
            <div className="space-y-5">
              {/* Software Header */}
              <div className="flex items-center gap-3.5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm"
                  style={{ backgroundColor: software.color }}
                >
                  {software.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                      Link {software.name}
                    </h3>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      Official API
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Account: <span className="font-semibold text-slate-700 dark:text-slate-200">{user.email}</span>
                  </p>
                </div>
              </div>

              {/* Permission Request Statement */}
              <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-navy-800/80 border border-blue-100 dark:border-navy-700 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2 font-semibold text-navy-900 dark:text-white mb-1">
                  <ShieldCheck className="w-4 h-4 text-electric-600 dark:text-electric-400" />
                  <span>Permission Request</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Newtech Unified Data (N.U.D)</strong> is requesting your explicit permission to establish a secure, read-only link with your <strong>{software.name}</strong> account to automatically fetch and analyze your business records.
                </p>
              </div>

              {/* Scope of Permissions Requested */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Data Permissions You Are Granting:
                </p>
                <div className="space-y-2 text-xs">
                  {software.permissionsRequired.map((perm, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-navy-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-[11px] text-slate-600 dark:text-slate-300">{perm}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security & Isolation Guarantee */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  Strictly read-only. You can revoke access at any time from Settings.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-navy-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
                >
                  Cancel & Deny
                </button>
                <button
                  type="button"
                  onClick={handleGrantPermission}
                  className="px-5 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-700 text-white text-xs font-bold shadow-md shadow-electric-600/20 transition flex items-center gap-2"
                >
                  <span>Allow & Auto-Sync Data</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {syncStep === 'syncing' && (
            <div className="py-10 text-center space-y-4">
              <div className="relative w-16 h-16 mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-electric-50 dark:bg-navy-800 flex items-center justify-center text-electric-600 dark:text-electric-400 animate-pulse">
                  <RefreshCw className="w-8 h-8 animate-spin" />
                </div>
              </div>
              <h4 className="text-base font-bold text-navy-900 dark:text-white">
                Connecting to {software.name}...
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Verifying permission token and fetching your business sales records, product catalog, and regional data.
              </p>
            </div>
          )}

          {syncStep === 'completed' && (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-navy-900 dark:text-white">
                Successfully Synced with {software.name}!
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your live records have been securely imported into N.U.D.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
