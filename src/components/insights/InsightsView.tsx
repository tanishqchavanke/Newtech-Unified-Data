'use client';

import React from 'react';
import { useData } from '@/context/data-context';
import { formatCurrency } from '@/lib/data-analyzer';
import {
  TrendingUp,
  Award,
  AlertTriangle,
  Users,
  ArrowRight,
  Sparkles,
  BarChart3,
  Calendar,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export function InsightsView() {
  const { dataset, analysis, setActiveTab, loadDemoData } = useData();

  if (!analysis || !dataset) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center py-20 bg-white rounded-2xl border border-slate-200">
        <Sparkles className="w-10 h-10 text-electric-600 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-navy-900 mb-2">No active dataset for insights</h2>
        <p className="text-xs text-slate-500 mb-6">
          Load demo data or upload your business CSV/XLSX to automatically generate key business findings.
        </p>
        <button
          onClick={loadDemoData}
          className="px-4 py-2 rounded-xl bg-electric-600 hover:bg-electric-700 text-white font-semibold text-xs transition"
        >
          Load Demo Data
        </button>
      </div>
    );
  }

  const { insights, kpis, topProducts, timeSeries } = analysis;

  const getInsightIcon = (category: string) => {
    switch (category) {
      case 'growth':
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      case 'best-seller':
        return <Award className="w-5 h-5 text-electric-600" />;
      case 'attention':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'trend':
        return <Users className="w-5 h-5 text-indigo-600" />;
      default:
        return <BarChart3 className="w-5 h-5 text-slate-500" />;
    }
  };

  const getCardBorder = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'border-l-4 border-l-emerald-500';
      case 'warning':
        return 'border-l-4 border-l-amber-500';
      default:
        return 'border-l-4 border-l-electric-500';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-bold text-electric-600 uppercase tracking-wider">
            Automated Intelligence
          </span>
          <h1 className="text-2xl font-bold text-navy-900 mt-0.5">Your Key Insights</h1>
          <p className="text-xs text-slate-500 mt-1">
            N.U.D highlights critical revenue patterns, top drivers, and attention points without technical jargon.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('ask')}
          className="px-4 py-2 rounded-xl bg-electric-600 hover:bg-electric-700 text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Ask questions about these insights</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Insight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((item) => (
          <div
            key={item.id}
            className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition flex flex-col justify-between ${getCardBorder(
              item.impact
            )}`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {getInsightIcon(item.category)}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900 text-base">{item.title}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {item.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>

                {item.metricHighlight && (
                  <span
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                      item.impact === 'positive'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.impact === 'warning'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-electric-50 text-electric-700 border border-electric-200'
                    }`}
                  >
                    {item.metricHighlight}
                  </span>
                )}
              </div>

              <p className="text-slate-600 text-xs leading-relaxed mb-4">{item.description}</p>
            </div>

            {/* Embedded Mini-chart for each insight */}
            {item.chartType === 'line' && timeSeries.length > 0 && (
              <div className="h-28 w-full mt-2 pt-2 border-t border-slate-100">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeries} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <XAxis dataKey="period" stroke="#94A3B8" fontSize={10} tickLine={false} />
                    <Tooltip
                      formatter={(val: any) => [formatCurrency(Number(val)), 'Sales']}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '11px' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10B981"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: '#10B981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {item.chartType === 'bar' && item.chartData && (
              <div className="h-28 w-full mt-2 pt-2 border-t border-slate-100">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={item.chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <XAxis
                      dataKey={item.chartData[0]?.product ? 'product' : 'name'}
                      stroke="#94A3B8"
                      fontSize={10}
                      tickLine={false}
                      tickFormatter={(v) => (v.length > 10 ? v.slice(0, 10) + '..' : v)}
                    />
                    <Tooltip
                      formatter={(val: any) => [formatCurrency(Number(val)), 'Revenue']}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '11px' }}
                    />
                    <Bar
                      dataKey="revenue"
                      fill={item.impact === 'warning' ? '#F59E0B' : '#3B82F6'}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {item.chartType === 'metric' && (
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Total Customer Reach:</span>
                <span className="font-bold text-navy-900">{kpis.totalCustomers} Accounts</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Business Action Plan Box */}
      <div className="bg-navy-900 text-white p-6 rounded-2xl border border-navy-800 shadow-sm">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-electric-400" />
          <span>Recommended Next Actions for Your Business</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
          <div className="p-3.5 rounded-xl bg-navy-850 border border-navy-800">
            <span className="text-electric-400 font-bold block mb-1">1. Capitalize on Growth</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Double down on {kpis.topCategory.name}, which represents your highest sales density.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-navy-850 border border-navy-800">
            <span className="text-electric-400 font-bold block mb-1">2. Inventory Optimization</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Ensure adequate stock for {kpis.topProduct.name} to avoid fulfillment stockouts.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-navy-850 border border-navy-800">
            <span className="text-electric-400 font-bold block mb-1">3. Bundle Slower Items</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Bundle declining products with top sellers to clear inventory with healthy margins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
