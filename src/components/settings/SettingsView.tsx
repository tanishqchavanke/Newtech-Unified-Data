'use client';

import React, { useState } from 'react';
import { useData } from '@/context/data-context';
import {
  User,
  Building,
  Bell,
  Shield,
  Trash2,
  RefreshCw,
  LogOut,
  Save,
  Check,
} from 'lucide-react';

export function SettingsView() {
  const { user, login, logout, clearData, loadDemoData } = useData();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [company, setCompany] = useState(user.company);
  const [currency, setCurrency] = useState('INR');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, name, company);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-xs font-bold text-electric-600 uppercase tracking-wider">
          Configuration
        </span>
        <h1 className="text-2xl font-bold text-navy-900 mt-0.5">Workspace Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your personal profile, business details, currency formatting, and data cache.
        </p>
      </div>

      {/* Profile & Business Info Form */}
      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <h2 className="text-base font-bold text-navy-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <User className="w-4 h-4 text-electric-600" />
          <span>Profile & Workspace Identity</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-electric-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-electric-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Company / Store Name</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-electric-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Primary Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-electric-500 text-slate-900 bg-white"
            >
              <option value="INR">Indian Rupee (₹ INR)</option>
              <option value="USD">US Dollar ($ USD)</option>
              <option value="EUR">Euro (€ EUR)</option>
              <option value="GBP">British Pound (£ GBP)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Settings updated successfully!</span>
            </span>
          ) : (
            <span />
          )}

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-850 text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>

      {/* Data Management Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-navy-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <Shield className="w-4 h-4 text-electric-600" />
          <span>Data Storage & Security</span>
        </h2>

        <div className="divide-y divide-slate-100 text-xs">
          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-navy-900">Reload Demo Dataset</p>
              <p className="text-slate-500 text-[11px]">
                Reset your current workspace back to the initial 120+ retail records demo data.
              </p>
            </div>
            <button
              onClick={() => {
                loadDemoData();
                alert('Demo dataset reloaded successfully.');
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload Demo</span>
            </button>
          </div>

          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-navy-900">Clear Uploaded Data</p>
              <p className="text-slate-500 text-[11px]">
                Wipe the currently loaded file from browser memory.
              </p>
            </div>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear your loaded data?')) {
                  clearData();
                }
              }}
              className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Data</span>
            </button>
          </div>

          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-navy-900">Account Session</p>
              <p className="text-slate-500 text-[11px]">
                Sign out of this browser session.
              </p>
            </div>
            <button
              onClick={logout}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
