'use client';

import React, { useState } from 'react';
import { useData } from '@/context/data-context';
import { Logo } from './Logo';
import { SoftwareProviderId } from '@/types';
import {
  X,
  Lock,
  Mail,
  Building,
  User,
  ArrowRight,
  Sparkles,
  Link as LinkIcon,
  ShieldCheck,
  Check,
} from 'lucide-react';

export function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login, loadDemoData, softwareList, openSoftwarePermission } = useData();
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(false);
  const [selectedSoftware, setSelectedSoftware] = useState<SoftwareProviderId>('shopify');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, name, company, autoSyncEnabled ? selectedSoftware : undefined);
  };

  const handleDemoAccess = () => {
    login('guest@nud.workspace', 'Demo Guest', 'Modern Retail Co.');
    loadDemoData();
  };

  const handleQuickSoftwareLogin = (providerId: SoftwareProviderId) => {
    const sw = softwareList.find((s) => s.id === providerId);
    const mockEmail = `owner@${providerId}-store.com`;
    login(mockEmail, 'Store Owner', sw?.name || 'Retail Business', providerId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-navy-800 overflow-hidden transition-colors">
        {/* Header decoration */}
        <div className="h-2 bg-gradient-to-r from-navy-900 via-electric-600 to-electric-400"></div>

        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
          {/* Logo & Heading */}
          <div className="text-center mb-5">
            <div className="flex justify-center mb-2">
              <Logo variant="full" showTagline={false} />
            </div>
            <h3 className="text-xl font-bold text-navy-900 dark:text-white">
              {mode === 'signup' ? 'Create your N.U.D workspace' : 'Welcome back to N.U.D'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {mode === 'signup'
                ? 'Bring your business data together and unlock clear insights.'
                : 'Log in to view your dashboard, charts, and auto-synced data.'}
            </p>
          </div>

          {/* Quick Demo Access banner */}
          <div className="mb-4 p-3 rounded-xl bg-electric-50 dark:bg-navy-850 border border-electric-200 dark:border-navy-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-electric-600 text-white flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-navy-900 dark:text-white">Want to explore right now?</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Test pre-loaded retail business data in 1 click</p>
              </div>
            </div>
            <button
              onClick={handleDemoAccess}
              className="text-xs font-semibold text-electric-700 dark:text-electric-400 bg-white dark:bg-navy-800 border border-electric-300 dark:border-navy-600 hover:bg-electric-100 dark:hover:bg-navy-700 px-3 py-1.5 rounded-lg transition"
            >
              Try Demo
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="flex rounded-lg bg-slate-100 dark:bg-navy-850 p-1 mb-4">
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition ${
                mode === 'signup' ? 'bg-white dark:bg-navy-700 text-navy-900 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition ${
                mode === 'signin' ? 'bg-white dark:bg-navy-700 text-navy-900 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 dark:border-navy-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-500/20 focus:border-electric-500 bg-white dark:bg-navy-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Company / Store Name</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. Apex Retail Store"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 dark:border-navy-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-500/20 focus:border-electric-500 bg-white dark:bg-navy-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Business Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 dark:border-navy-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-500/20 focus:border-electric-500 bg-white dark:bg-navy-800 text-slate-900 dark:text-white"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Tip: Use the same email associated with your business software (Shopify, Zoho, Stripe, etc.)
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 dark:border-navy-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-500/20 focus:border-electric-500 bg-white dark:bg-navy-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Business Software Auto-Sync Consent Option */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-700 space-y-2 mt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoSyncEnabled}
                  onChange={(e) => setAutoSyncEnabled(e.target.checked)}
                  className="mt-0.5 rounded text-electric-600 focus:ring-electric-500"
                />
                <div>
                  <span className="text-xs font-bold text-navy-900 dark:text-white block">
                    Link existing business software to auto-fetch data
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block leading-relaxed">
                    N.U.D will prompt for your permission to securely import your sales & orders.
                  </span>
                </div>
              </label>

              {autoSyncEnabled && (
                <div className="pt-2 border-t border-slate-200 dark:border-navy-700">
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Select your software provider:
                  </label>
                  <select
                    value={selectedSoftware}
                    onChange={(e) => setSelectedSoftware(e.target.value as SoftwareProviderId)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-electric-500"
                  >
                    <option value="shopify">Shopify (E-Commerce Store)</option>
                    <option value="zohobooks">Zoho Books (Accounting & Invoices)</option>
                    <option value="stripe">Stripe (Payment Gateway & Subscriptions)</option>
                    <option value="quickbooks">Intuit QuickBooks (Retail & Bookkeeping)</option>
                    <option value="woocommerce">WooCommerce (WordPress Store)</option>
                    <option value="googlesheets">Google Sheets (Cloud Spreadsheet)</option>
                  </select>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-3 py-2.5 px-4 rounded-xl bg-navy-900 hover:bg-navy-850 dark:bg-electric-600 dark:hover:bg-electric-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition"
            >
              <span>{mode === 'signup' ? 'Create Account & Continue' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick 1-Click Software Login Options */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-navy-800">
            <p className="text-[11px] font-bold text-center text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5">
              Or connect directly with your software account
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickSoftwareLogin('shopify')}
                className="py-1.5 px-2 rounded-lg border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 text-[11px] font-medium text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition"
              >
                <span className="w-2 h-2 rounded-full bg-[#96BF48]"></span>
                <span>Shopify</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickSoftwareLogin('zohobooks')}
                className="py-1.5 px-2 rounded-lg border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 text-[11px] font-medium text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition"
              >
                <span className="w-2 h-2 rounded-full bg-[#F44336]"></span>
                <span>Zoho Books</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickSoftwareLogin('stripe')}
                className="py-1.5 px-2 rounded-lg border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 text-[11px] font-medium text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition"
              >
                <span className="w-2 h-2 rounded-full bg-[#635BFF]"></span>
                <span>Stripe</span>
              </button>
            </div>
          </div>

          <p className="text-[10px] text-center text-slate-400 mt-4">
            Security: 100% read-only data access. We never write, modify, or sell your business data.
          </p>
        </div>
      </div>
    </div>
  );
}
