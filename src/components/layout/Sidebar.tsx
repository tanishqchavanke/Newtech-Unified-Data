'use client';

import React from 'react';
import { useData } from '@/context/data-context';
import { Logo } from '../ui/Logo';
import { ActiveTab } from '@/types';
import {
  LayoutDashboard,
  Database,
  TrendingUp,
  MessageSquareText,
  FileBarChart2,
  CreditCard,
  Settings,
  Sparkles,
  X,
  ExternalLink,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onGoHome?: () => void;
}

export function Sidebar({ isOpen, onClose, onGoHome }: SidebarProps) {
  const { activeTab, setActiveTab, loadDemoData } = useData();

  const navItems: { id: ActiveTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'data', label: 'My Data', icon: Database },
    { id: 'insights', label: 'Insights', icon: TrendingUp, badge: 'New' },
    { id: 'ask', label: 'Ask N.U.D', icon: MessageSquareText, badge: 'AI' },
    { id: 'reports', label: 'Reports', icon: FileBarChart2 },
    { id: 'pricing', label: 'Pricing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-navy-950/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-navy-950 text-slate-300 border-r border-navy-900 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header with Brand */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-navy-900">
          <div className="cursor-pointer" onClick={onGoHome}>
            <Logo variant="compact" showTagline={true} theme="dark" />
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-navy-900 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation links */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Workspace
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-electric-600 text-white shadow-md shadow-electric-600/30 font-bold'
                    : 'text-slate-300 hover:bg-navy-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge === 'AI'
                        ? 'bg-electric-950 text-electric-300 border border-electric-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Demo Data Quick Action Box */}
        <div className="p-3 border-t border-navy-900">
          <div className="p-3 rounded-xl bg-navy-900/90 border border-navy-800 text-left">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-electric-400" />
              <span>Explore Demo Data</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-2.5">
              Instantly test N.U.D with 120+ retail store sales records.
            </p>
            <button
              onClick={() => {
                loadDemoData();
                setActiveTab('overview');
                onClose();
              }}
              className="w-full py-1.5 px-2.5 rounded-lg bg-navy-800 hover:bg-electric-600 hover:text-white text-slate-200 text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <span>Reload Demo Data</span>
            </button>
          </div>

          {/* Bottom Landing link */}
          {onGoHome && (
            <button
              onClick={onGoHome}
              className="w-full mt-2 py-2 px-3 flex items-center justify-between text-xs text-slate-400 hover:text-white hover:bg-navy-900 rounded-lg transition"
            >
              <span>Landing Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
