'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useData } from '@/context/data-context';
import { formatCurrency } from '@/lib/data-analyzer';
import {
  MessageSquareText,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  TrendingUp,
  BarChart2,
  HelpCircle,
  Loader2,
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
  CartesianGrid,
} from 'recharts';

export function AskNudView() {
  const { dataset, chatMessages, askQuestion, loadDemoData } = useData();
  const [inputText, setInputText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    'What are my top 5 products?',
    'Show me the sales trend.',
    'What is my total sales & orders?',
    'Which product generated the most revenue?',
    'Which products are performing poorly?',
    'What is my data health score?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isSubmitting]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isSubmitting) return;
    setIsSubmitting(true);
    setInputText('');
    await askQuestion(text);
    setIsSubmitting(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputText);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-electric-500 animate-pulse"></span>
            <span className="text-xs font-bold text-electric-600 uppercase tracking-wider">
              Natural Language Assistant
            </span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900">Ask N.U.D</h1>
          <p className="text-xs text-slate-500 mt-1">
            Ask questions about your business data in plain language.
          </p>
        </div>

        {dataset && (
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium self-center sm:self-auto">
            Context: <span className="font-bold text-navy-900">{dataset.name}</span>
          </div>
        )}
      </div>

      {/* Suggested Questions Pills */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 px-1">
          <Sparkles className="w-3.5 h-3.5 text-electric-500" />
          <span>Try asking one of these:</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleSend(sug)}
              disabled={isSubmitting}
              className="text-xs font-medium px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-electric-400 hover:text-electric-700 text-slate-700 shadow-xs transition active:scale-95 disabled:opacity-50 text-left"
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-6 min-h-[380px] max-h-[550px] overflow-y-auto space-y-6">
        {chatMessages.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Bot className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-semibold text-slate-600">No conversation yet</p>
            <p className="text-xs text-slate-400 mt-1">
              Ask a question above or type your own question below.
            </p>
          </div>
        ) : (
          chatMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-navy-900 text-electric-400 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-electric-600 text-white rounded-tr-xs shadow-xs'
                      : 'bg-slate-50 border border-slate-200/90 text-slate-800 rounded-tl-xs shadow-xs'
                  }`}
                >
                  {/* Message Text with simple markdown formatting */}
                  <div className="space-y-1.5 whitespace-pre-line font-normal">
                    {msg.text.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx}>
                        {paragraph.split('**').map((chunk, cIdx) =>
                          cIdx % 2 === 1 ? <strong key={cIdx} className="font-bold">{chunk}</strong> : chunk
                        )}
                      </p>
                    ))}
                  </div>

                  {/* Summary Metric Pills */}
                  {msg.metrics && msg.metrics.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-slate-200/60 flex flex-wrap gap-2">
                      {msg.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px]"
                        >
                          <span className="text-slate-500 mr-1.5">{m.label}:</span>
                          <span className="font-bold text-navy-900">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Dynamic Chart Attachment */}
                  {msg.chart && (
                    <div className="mt-4 pt-3 border-t border-slate-200/60 bg-white p-3 rounded-xl border border-slate-200">
                      <p className="text-[11px] font-bold text-navy-900 mb-2">{msg.chart.title}</p>
                      <div className="h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          {msg.chart.type === 'line' ? (
                            <LineChart data={msg.chart.data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                              <XAxis dataKey={msg.chart.xKey} stroke="#94A3B8" fontSize={10} tickLine={false} />
                              <YAxis
                                stroke="#94A3B8"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => `₹${val >= 100000 ? (val / 100000).toFixed(0) + 'L' : (val / 1000).toFixed(0) + 'k'}`}
                              />
                              <Tooltip
                                formatter={(val: any) => [formatCurrency(Number(val)), 'Revenue']}
                                contentStyle={{ borderRadius: '8px', fontSize: '11px' }}
                              />
                              <Line
                                type="monotone"
                                dataKey={msg.chart.yKey}
                                stroke="#2563EB"
                                strokeWidth={2.5}
                                dot={{ r: 3, fill: '#2563EB' }}
                              />
                            </LineChart>
                          ) : (
                            <BarChart data={msg.chart.data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                              <XAxis
                                dataKey={msg.chart.xKey}
                                stroke="#94A3B8"
                                fontSize={10}
                                tickLine={false}
                                tickFormatter={(v) => (String(v).length > 12 ? String(v).slice(0, 12) + '..' : v)}
                              />
                              <YAxis
                                stroke="#94A3B8"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => `₹${val >= 100000 ? (val / 100000).toFixed(0) + 'L' : (val / 1000).toFixed(0) + 'k'}`}
                              />
                              <Tooltip
                                formatter={(val: any) => [formatCurrency(Number(val)), 'Revenue']}
                                contentStyle={{ borderRadius: '8px', fontSize: '11px' }}
                              />
                              <Bar dataKey={msg.chart.yKey} fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          )}
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-electric-100 text-electric-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })
        )}

        {isSubmitting && (
          <div className="flex gap-3.5 items-center text-slate-400 text-xs">
            <div className="w-8 h-8 rounded-xl bg-navy-900 text-electric-400 flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <span>Analyzing dataset records...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Ask something about your data..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isSubmitting}
          className="w-full pl-5 pr-14 py-3.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-electric-500/20 focus:border-electric-500 text-slate-800 transition"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isSubmitting}
          className="absolute right-2.5 top-2.5 p-2 rounded-xl bg-navy-900 hover:bg-electric-600 disabled:opacity-30 disabled:hover:bg-navy-900 text-white transition shadow-xs"
          aria-label="Send question"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
