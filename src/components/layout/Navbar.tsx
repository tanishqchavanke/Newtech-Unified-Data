'use client';

import React, { useState } from 'react';
import { useData } from '@/context/data-context';
import { Logo } from '../ui/Logo';
import { ThemeToggle } from '../ui/ThemeToggle';
import {
  Search,
  Bell,
  UploadCloud,
  FileSpreadsheet,
  ChevronDown,
  Sparkles,
  LogOut,
  User,
  ShieldCheck,
  Menu,
  Zap,
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const { dataset, user, logout, setIsAuthModalOpen, setActiveTab, loadDemoData } = useData();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 dark:bg-navy-950/95 backdrop-blur border-b border-slate-200 dark:border-navy-900 px-4 md:px-6 flex items-center justify-between transition-colors">
      {/* Left: Mobile hamburger & Compact branding or Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-900 lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Compact N.U.D brand for top bar on small screens */}
        <div className="lg:hidden">
          <Logo variant="compact" />
        </div>

        {/* Global Search Bar */}
        <div className="relative hidden md:block w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search records, products, or KPIs..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-500/20 focus:border-electric-500 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition"
          />
        </div>
      </div>

      {/* Right: Active Dataset badge, Quick Upload, Notifications, Dark/Light Mode Popup, User profile */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Active Dataset Pill */}
        {dataset ? (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-xs">
            <FileSpreadsheet className="w-3.5 h-3.5 text-electric-600 dark:text-electric-400" />
            <span className="font-medium text-slate-700 dark:text-slate-300 max-w-[150px] truncate">{dataset.name}</span>
            <span className="px-1.5 py-0.2 bg-white dark:bg-navy-800 rounded text-[10px] font-semibold text-slate-500 dark:text-slate-400 shadow-xs">
              {dataset.rowCount} rows
            </span>
          </div>
        ) : (
          <button
            onClick={loadDemoData}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-medium hover:bg-amber-100 dark:hover:bg-amber-900/60 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Load Demo Data</span>
          </button>
        )}

        {/* Upload Button */}
        <button
          onClick={() => setActiveTab('data')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-electric-600 hover:bg-electric-700 text-white shadow-sm transition"
        >
          <UploadCloud className="w-4 h-4" />
          <span className="hidden sm:inline">Upload Data</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-900 rounded-lg transition"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-electric-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-navy-900 rounded-xl shadow-xl border border-slate-200 dark:border-navy-800 p-3 z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-navy-800 mb-2">
                <span className="text-xs font-semibold text-navy-900 dark:text-white">Notifications</span>
                <span className="text-[10px] font-medium text-electric-600 dark:text-electric-400">Mark all read</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-navy-850 text-xs text-slate-700 dark:text-slate-300">
                  <p className="font-semibold text-navy-900 dark:text-white">Data Analysis Ready</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Your dataset was processed with a 92/100 quality score.</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-navy-850 text-xs text-slate-700 dark:text-slate-300">
                  <p className="font-semibold text-navy-900 dark:text-white">Sales Trend Detected</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Revenue grew +14.2% in the latest recorded period.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dark / Light Mode Popup Button near Profile */}
        <ThemeToggle />

        {/* User Profile Dropdown Button */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 pl-2 text-xs font-medium text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-900 transition"
          >
            <div className="w-7 h-7 rounded-full bg-navy-900 dark:bg-electric-600 text-white flex items-center justify-center font-bold text-xs">
              {user.name.charAt(0)}
            </div>
            <span className="hidden md:inline font-semibold text-navy-900 dark:text-white">{user.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-navy-900 rounded-xl shadow-xl border border-slate-200 dark:border-navy-800 p-2 z-50 animate-fadeIn">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-navy-800 mb-1">
                <p className="text-xs font-bold text-navy-900 dark:text-white">{user.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span>{user.isDemo ? 'Demo Mode' : user.company}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  setActiveTab('settings');
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-850 rounded-lg text-left"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Account Settings</span>
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  setActiveTab('data');
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-850 rounded-lg text-left"
              >
                <Zap className="w-3.5 h-3.5 text-electric-600 dark:text-electric-400" />
                <span>Connect Software (Auto-Data)</span>
              </button>

              {user.isDemo ? (
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-electric-600 dark:text-electric-400 font-semibold hover:bg-electric-50 dark:hover:bg-navy-850 rounded-lg text-left"
                >
                  <Sparkles className="w-3.5 h-3.5 text-electric-600" />
                  <span>Create Free Account</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-navy-850 rounded-lg text-left"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
