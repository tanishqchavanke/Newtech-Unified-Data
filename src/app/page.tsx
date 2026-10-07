'use client';

import React, { useState } from 'react';
import { useData } from '@/context/data-context';
import { LandingPage } from '@/components/landing/LandingPage';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { UploadSection } from '@/components/upload/UploadSection';
import { InsightsView } from '@/components/insights/InsightsView';
import { AskNudView } from '@/components/ask/AskNudView';
import { ReportsView } from '@/components/reports/ReportsView';
import { PricingView } from '@/components/pricing/PricingView';
import { SettingsView } from '@/components/settings/SettingsView';

export default function Home() {
  const { activeTab, user } = useData();
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If user is authenticated, direct them directly to workspace
  const isWorkspace = viewMode === 'app' || user.isAuthenticated;

  if (!isWorkspace) {
    return (
      <LandingPage
        onEnterApp={() => {
          setViewMode('app');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onGoHome={() => setViewMode('landing')}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Navbar */}
        <Navbar onToggleSidebar={() => setSidebarOpen(true)} />

        {/* Dynamic Tab Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && <DashboardOverview />}
          {activeTab === 'data' && <UploadSection />}
          {activeTab === 'insights' && <InsightsView />}
          {activeTab === 'ask' && <AskNudView />}
          {activeTab === 'reports' && <ReportsView />}
          {activeTab === 'pricing' && <PricingView />}
          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
}
