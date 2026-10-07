'use client';

import React, { useState } from 'react';
import { Logo } from '../ui/Logo';
import { useData } from '@/context/data-context';
import {
  ArrowRight,
  Sparkles,
  UploadCloud,
  PieChart as PieIcon,
  TrendingUp,
  MessageSquareText,
  FileBarChart2,
  CheckCircle2,
  Store,
  Rocket,
  ShoppingBag,
  Users2,
  Briefcase,
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap,
  Info,
  X,
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export function LandingPage({ onEnterApp }: LandingPageProps) {
  const { loadDemoData, setIsAuthModalOpen } = useData();
  const [showAboutModal, setShowAboutModal] = useState(false);

  const handleGetStarted = () => {
    setIsAuthModalOpen(true);
  };

  const handleSeeHowItWorks = () => {
    loadDemoData();
    onEnterApp();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-electric-500 selection:text-white">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Logo variant="full" showTagline={true} />

        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <a href="#how-it-works" className="hover:text-electric-600 transition">How It Works</a>
          <a href="#features" className="hover:text-electric-600 transition">Features</a>
          <a href="#who-is-it-for" className="hover:text-electric-600 transition">Who It's For</a>
          <a href="#why-nud" className="hover:text-electric-600 transition">Why N.U.D</a>
          <button onClick={() => setShowAboutModal(true)} className="hover:text-electric-600 transition">About</button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSeeHowItWorks}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-navy-900 hover:bg-slate-100 rounded-xl transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-electric-600" />
            <span>Try Demo</span>
          </button>
          <button
            onClick={handleGetStarted}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-navy-900 hover:bg-navy-850 text-white shadow-xs transition flex items-center gap-1.5"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-electric-50 border border-electric-200 text-electric-700 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-electric-600 animate-pulse"></span>
          <span>Simple AI-Powered Business Data Workspace</span>
        </div>

        {/* Hero Headings */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-[1.15]">
          Turn Your Business Data <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 via-electric-600 to-electric-500">
            Into Better Decisions.
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Newtech Unified Data (N.U.D) helps you bring your data together, understand it easily, and discover useful business insights.
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={handleGetStarted}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-electric-600 hover:bg-electric-700 text-white font-bold text-sm shadow-lg shadow-electric-600/25 transition flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleSeeHowItWorks}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-sm shadow-xs transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-electric-600" />
            <span>See How It Works (Demo)</span>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> No data skills required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Free instant demo
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> CSV & Excel ready
          </span>
        </div>

        {/* Visual representation of N.U.D Dashboard (Clean, non-futuristic SaaS preview) */}
        <div className="mt-12 relative rounded-2xl bg-white p-3 sm:p-5 shadow-2xl border border-slate-200/90 max-w-5xl mx-auto text-left overflow-hidden">
          {/* Mock Dashboard Window Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
              <span className="text-[11px] font-semibold text-slate-400 ml-2">N.U.D Workspace • Retail_Sales_2024.csv</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Health: 92/100
            </span>
          </div>

          {/* Mock KPI Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-500 font-medium">Total Revenue</span>
              <p className="text-lg font-bold text-navy-900 mt-0.5">₹24.8L</p>
              <span className="text-[10px] text-emerald-600 font-semibold">+14.2%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-500 font-medium">Orders</span>
              <p className="text-lg font-bold text-navy-900 mt-0.5">1,284</p>
              <span className="text-[10px] text-slate-400 font-medium">Clean records</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-500 font-medium">Customers</span>
              <p className="text-lg font-bold text-navy-900 mt-0.5">856</p>
              <span className="text-[10px] text-emerald-600 font-semibold">Active buyers</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-500 font-medium">Top Product</span>
              <p className="text-sm font-bold text-navy-900 mt-1 truncate">Cloud Ultra Laptop</p>
              <span className="text-[10px] text-electric-600 font-semibold">₹11.2L revenue</span>
            </div>
          </div>

          {/* Mock Chart & Ask N.U.D teaser */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                <span>Revenue Growth Curve</span>
                <span className="text-electric-600">Jan – Jun</span>
              </div>
              <div className="h-28 flex items-end gap-2 pt-2">
                {[35, 45, 40, 65, 80, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-electric-600 to-electric-400"
                      style={{ height: `${h}%` }}
                    ></div>
                    <span className="text-[9px] text-slate-400">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-navy-900 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-electric-400 font-bold uppercase">
                  <Sparkles className="w-3 h-3" />
                  <span>Ask N.U.D</span>
                </div>
                <p className="text-xs font-medium text-slate-200 mt-2">
                  "What are my top 5 products?"
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Answers generated in plain language with instant charts.
                </p>
              </div>

              <button
                onClick={handleSeeHowItWorks}
                className="mt-3 w-full py-1.5 rounded-lg bg-electric-600 hover:bg-electric-500 text-white text-[11px] font-bold text-center transition"
              >
                Explore Live Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-electric-600 uppercase tracking-wider">
            Simple 3-Step Journey
          </span>
          <h2 className="text-3xl font-bold text-navy-900 mt-1">How It Works</h2>
          <p className="text-sm text-slate-500 mt-2">
            No engineering required. Get from raw business files to actionable answers in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-navy-900 text-white font-bold flex items-center justify-center mb-5 text-sm shadow-xs">
              1
            </div>
            <h3 className="text-lg font-bold text-navy-900">Connect</h3>
            <p className="text-xs font-semibold text-electric-600 mt-0.5">Upload your business data</p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Drag and drop your existing CSV or Excel spreadsheet. N.U.D inspects the rows and columns automatically.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-electric-600 text-white font-bold flex items-center justify-center mb-5 text-sm shadow-xs">
              2
            </div>
            <h3 className="text-lg font-bold text-navy-900">Understand</h3>
            <p className="text-xs font-semibold text-electric-600 mt-0.5">N.U.D organizes and analyzes it</p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              We calculate your data quality score, verify missing values, and configure KPIs and charts instantly.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center mb-5 text-sm shadow-xs">
              3
            </div>
            <h3 className="text-lg font-bold text-navy-900">Decide</h3>
            <p className="text-xs font-semibold text-electric-600 mt-0.5">Get clear insights to make better decisions</p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Review automatically generated findings, ask questions in plain English, and export executive reports.
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHAT YOU CAN DO */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-slate-100/70 rounded-3xl my-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-electric-600 uppercase tracking-wider">
            Capabilities
          </span>
          <h2 className="text-3xl font-bold text-navy-900 mt-1">What You Can Do With N.U.D</h2>
          <p className="text-sm text-slate-500 mt-2">
            Everything a business owner needs to understand their numbers without complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-electric-50 text-electric-600 flex items-center justify-center mb-4">
              <UploadCloud className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-navy-900 text-base">Understand your data</h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Automated data health checks score your dataset, identify missing values, and flag duplicate entries.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <PieIcon className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-navy-900 text-base">Create dashboards</h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Instant KPI cards, revenue curves, product rankings, and category breakdowns ready out of the box.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-navy-900 text-base">Find important trends</h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Automated intelligence cards detect growing lines, highlight top sellers, and warn of declining items.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <MessageSquareText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-navy-900 text-base">Ask questions about your data</h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Ask "What was my highest revenue product?" in plain language and get concise answers with charts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <FileBarChart2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-navy-900 text-base">Generate reports</h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Compile formal executive briefs with a single click. Download or print directly to clean PDF sheets.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-navy-900 text-base">Isolated and secure</h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Your business figures are strictly scoped to your private session. No data is shared or exposed.
            </p>
          </div>
        </div>
      </section>

      {/* 4. WHO IS IT FOR? */}
      <section id="who-is-it-for" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-electric-600 uppercase tracking-wider">
            Target Audience
          </span>
          <h2 className="text-3xl font-bold text-navy-900 mt-1">Who Is N.U.D For?</h2>
          <p className="text-sm text-slate-500 mt-2">
            Tailored specifically for businesses that want clarity without hiring a data science team.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-navy-900 flex items-center justify-center mx-auto mb-3">
              <Store className="w-5 h-5 text-electric-600" />
            </div>
            <h4 className="font-bold text-xs text-navy-900">Small Businesses</h4>
            <p className="text-[11px] text-slate-500 mt-1">Understand store sales and customer trends easily.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-navy-900 flex items-center justify-center mx-auto mb-3">
              <Rocket className="w-5 h-5 text-electric-600" />
            </div>
            <h4 className="font-bold text-xs text-navy-900">Startups</h4>
            <p className="text-[11px] text-slate-500 mt-1">Track key metrics and product adoption curves.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-navy-900 flex items-center justify-center mx-auto mb-3">
              <Briefcase className="w-5 h-5 text-electric-600" />
            </div>
            <h4 className="font-bold text-xs text-navy-900">Retail</h4>
            <p className="text-[11px] text-slate-500 mt-1">Spot inventory velocity and top revenue items.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-navy-900 flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="w-5 h-5 text-electric-600" />
            </div>
            <h4 className="font-bold text-xs text-navy-900">E-Commerce</h4>
            <p className="text-[11px] text-slate-500 mt-1">Analyze order values, geography, and margins.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center col-span-2 sm:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-navy-900 flex items-center justify-center mx-auto mb-3">
              <Users2 className="w-5 h-5 text-electric-600" />
            </div>
            <h4 className="font-bold text-xs text-navy-900">Teams</h4>
            <p className="text-[11px] text-slate-500 mt-1">Collaborate on clean, printable performance reports.</p>
          </div>
        </div>
      </section>

      {/* 5. WHY N.U.D? */}
      <section id="why-nud" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-electric-600 uppercase tracking-wider">
            Core Advantage
          </span>
          <h2 className="text-3xl font-bold text-navy-900 mt-1">Why N.U.D?</h2>
          <p className="text-sm text-slate-500 mt-2">
            Designed from day one for business operators, not data engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-navy-900 text-sm mb-2">
              <CheckCircle2 className="w-4 h-4 text-electric-600" />
              <span>Easy to use</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              No SQL queries, complex dashboards, or nested formulas. Just drop your file and start seeing insights.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-navy-900 text-sm mb-2">
              <CheckCircle2 className="w-4 h-4 text-electric-600" />
              <span>No advanced data skills required</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              If you know basic Excel, you already know how to use N.U.D. We translate numbers into plain English.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-navy-900 text-sm mb-2">
              <CheckCircle2 className="w-4 h-4 text-electric-600" />
              <span>Fast insights</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Immediate answers to questions like "What are my top products?" with accompanying visual charts in seconds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-navy-900 text-sm mb-2">
              <CheckCircle2 className="w-4 h-4 text-electric-600" />
              <span>One simple workspace</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Upload, inspect data health, view dashboard charts, ask questions, and print reports in one clean app.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-navy-900 text-sm mb-2">
              <CheckCircle2 className="w-4 h-4 text-electric-600" />
              <span>Designed for growing businesses</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Built to grow alongside your business without requiring costly enterprise software contracts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-navy-900 text-sm mb-2">
              <CheckCircle2 className="w-4 h-4 text-electric-600" />
              <span>Zero-risk exploration</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Test all features instantly with realistic demo retail data before uploading your own files.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-850 text-white rounded-3xl p-10 sm:p-14 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to understand your data better?
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Join business owners who use N.U.D to uncover sales trends, track top performers, and make informed choices every day.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleGetStarted}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-bold text-sm shadow-md shadow-electric-600/30 transition flex items-center justify-center gap-2"
              >
                <span>Start With N.U.D</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleSeeHowItWorks}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-electric-400" />
                <span>Explore Demo Mode</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <Logo variant="full" showTagline={true} />
            <p className="text-[11px] text-slate-400 mt-1">
              Simple AI-powered data workspace for growing businesses.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-navy-900 transition">Product</a>
            <a href="#who-is-it-for" className="hover:text-navy-900 transition">Solutions</a>
            <button onClick={handleSeeHowItWorks} className="hover:text-navy-900 transition">Pricing</button>
            <button onClick={() => setShowAboutModal(true)} className="hover:text-navy-900 transition">About</button>
            <button onClick={() => alert('Support email: support@nud.workspace')} className="hover:text-navy-900 transition">Contact</button>
            <button onClick={() => alert('All uploaded records are processed in secure memory and never shared.')} className="hover:text-navy-900 transition">Privacy</button>
            <button onClick={() => alert('N.U.D MVP is licensed for business evaluation and trial use.')} className="hover:text-navy-900 transition">Terms</button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Newtech Unified Data (N.U.D). All rights reserved.</p>
          <p>Tagline: One Platform. Infinite Insights.</p>
        </div>
      </footer>

      {/* About N.U.D Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-7">
            <button
              onClick={() => setShowAboutModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
            <Logo variant="full" showTagline={true} />
            <h3 className="text-xl font-bold text-navy-900 mt-4">About Newtech Unified Data (N.U.D)</h3>
            <blockquote className="my-4 p-3.5 bg-slate-50 border-l-4 border-electric-600 text-xs text-slate-700 italic font-medium">
              "Newtech Unified Data (N.U.D) is building a simpler way for businesses to understand and use their data."
            </blockquote>
            <p className="text-xs text-slate-600 leading-relaxed space-y-2">
              Business data shouldn't be trapped behind complicated engineering consoles, nested query languages, or expensive consulting contracts. N.U.D gives retailers, founders, and operators instant clarity through automatic ingestion, health verification, and conversational answers.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowAboutModal(false)}
                className="px-4 py-2 bg-navy-900 hover:bg-navy-850 text-white rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
