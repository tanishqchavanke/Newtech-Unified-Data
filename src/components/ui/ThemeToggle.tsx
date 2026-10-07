'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useData } from '@/context/data-context';
import { ThemeMode } from '@/types';
import { Sun, Moon, Laptop, Check } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { id: ThemeMode; label: string; icon: React.ElementType }[] = [
    { id: 'light', label: 'Light Theme', icon: Sun },
    { id: 'dark', label: 'Dark Theme', icon: Moon },
    { id: 'system', label: 'System Default', icon: Laptop },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button near Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800 transition flex items-center justify-center border border-transparent hover:border-slate-200 dark:hover:border-navy-700"
        aria-label="Toggle theme mode"
        title="Switch Light / Dark Theme"
      >
        {theme === 'dark' ? (
          <Moon className="w-4 h-4 text-electric-400" />
        ) : theme === 'light' ? (
          <Sun className="w-4 h-4 text-amber-500" />
        ) : (
          <Laptop className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        )}
      </button>

      {/* Popup Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-navy-900 rounded-xl shadow-xl border border-slate-200 dark:border-navy-800 p-1.5 z-50 animate-fadeIn">
          <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Appearance
          </div>

          <div className="space-y-0.5">
            {options.map((opt) => {
              const Icon = opt.icon;
              const isSelected = theme === opt.id;

              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setTheme(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded-lg transition ${
                    isSelected
                      ? 'bg-electric-50 dark:bg-navy-800 text-electric-600 dark:text-electric-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{opt.label}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-electric-600 dark:text-electric-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
