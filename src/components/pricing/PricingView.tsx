'use client';

import React, { useState } from 'react';
import { Check, Sparkles, Shield, Zap, ArrowRight } from 'lucide-react';
import { useData } from '@/context/data-context';

export function PricingView() {
  const { user, setIsAuthModalOpen } = useData();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      description: 'Ideal for small shops and individuals experimenting with data.',
      features: [
        'Demo business datasets',
        'Up to 3 CSV/Excel uploads/month',
        'Basic KPIs and visual charts',
        'Standard data quality health score',
        'Community support',
      ],
      popular: false,
      cta: 'Current Plan',
      isCurrent: true,
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? '₹999' : '₹799',
      period: 'per month',
      description: 'Designed for growing businesses looking for clear automated insights.',
      features: [
        'Unlimited CSV & Excel uploads',
        'Automated business insights & alerts',
        'Full executive report generator',
        'Ask N.U.D natural language assistant',
        'Print & export PDF briefs',
        'Priority email assistance',
      ],
      popular: true,
      cta: 'Upgrade to Pro',
      isCurrent: false,
    },
    {
      name: 'Business',
      price: 'Custom',
      period: 'tailored',
      description: 'For multi-store retailers, franchise chains, and scaling teams.',
      features: [
        'Multi-user team workspace',
        'Higher file size limits (100MB+)',
        'Custom KPI definitions',
        'Scheduled automated reports',
        'Dedicated onboarding manager',
        'Enterprise SLA guarantee',
      ],
      popular: false,
      cta: 'Contact Sales',
      isCurrent: false,
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-electric-600 uppercase tracking-wider">
          Transparent Plans
        </span>
        <h1 className="text-3xl font-extrabold text-navy-900 mt-1">Simple Pricing for Growing Businesses</h1>
        <p className="text-sm text-slate-500 mt-2">
          Start for free, understand your business data, and upgrade as your team expands.
        </p>

        {/* Billing cycle toggle */}
        <div className="mt-6 inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition ${
              billingCycle === 'monthly'
                ? 'bg-white text-navy-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
              billingCycle === 'yearly'
                ? 'bg-white text-navy-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Yearly</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl bg-white p-7 border transition-all flex flex-col justify-between ${
              plan.popular
                ? 'border-electric-500 shadow-xl ring-2 ring-electric-500/20'
                : 'border-slate-200 shadow-xs hover:border-slate-300'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-electric-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                Most Popular
              </div>
            )}

            <div>
              <h3 className="text-lg font-bold text-navy-900">{plan.name}</h3>
              <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.description}</p>

              <div className="mt-5 mb-6 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-navy-900">{plan.price}</span>
                <span className="text-xs text-slate-400 font-medium">/ {plan.period}</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                if (user.isDemo) {
                  setIsAuthModalOpen(true);
                } else {
                  alert(`Thank you for your interest in the ${plan.name} plan! An advisor will reach out shortly.`);
                }
              }}
              className={`w-full mt-8 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                plan.popular
                  ? 'bg-electric-600 hover:bg-electric-700 text-white shadow-sm'
                  : plan.isCurrent
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-navy-900 hover:bg-navy-850 text-white'
              }`}
            >
              <span>{plan.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-electric-600 flex-shrink-0" />
          <div>
            <p className="font-bold text-navy-900">Zero Lock-in & Secure Data Isolation</p>
            <p className="text-slate-500 text-[11px]">
              Your uploaded records remain strictly yours. No external AI training or cross-account leakage.
            </p>
          </div>
        </div>
        <div className="text-[11px] font-semibold text-slate-500">
          Have custom data requirements? Contact us at support@nud.workspace
        </div>
      </div>
    </div>
  );
}
