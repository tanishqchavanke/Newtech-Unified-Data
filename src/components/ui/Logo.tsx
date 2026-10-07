import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon-only';
  showTagline?: boolean;
  className?: string;
  theme?: 'dark' | 'light';
}

export function Logo({ variant = 'compact', showTagline = false, className = '', theme = 'light' }: LogoProps) {
  const isLight = theme === 'light';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* N.U.D Icon Concept: Stylized N + Connected Data Nodes */}
      <div className="relative flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 p-[2px] shadow-sm shadow-electric-500/20">
        <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:6px_6px]"></div>
          
          <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Stylized N path with connected network nodes */}
            <path
              d="M6 18V6L18 18V6"
              stroke="#60A5FA"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Electric Data Nodes */}
            <circle cx="6" cy="6" r="2" fill="#3B82F6" />
            <circle cx="18" cy="18" r="2" fill="#3B82F6" />
            <circle cx="12" cy="12" r="2.2" fill="#60A5FA" />
          </svg>
        </div>
      </div>

      {variant === 'icon-only' ? null : (
        <div className="flex flex-col">
          {variant === 'full' ? (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`font-bold tracking-tight text-lg ${isLight ? 'text-navy-900' : 'text-white'}`}>
                Newtech Unified Data
              </span>
              <span className="px-1.5 py-0.5 text-xs font-semibold rounded bg-electric-100 text-electric-700">
                N.U.D
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className={`font-black text-xl tracking-wider ${isLight ? 'text-navy-900' : 'text-white'}`}>
                N.U.D
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-electric-500 animate-pulse"></span>
            </div>
          )}

          {showTagline && (
            <span className={`text-[11px] font-medium tracking-wide ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              One Platform. Infinite Insights.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
