import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Compass, CheckCircle2, ChevronRight, Sparkles, Clock, ShieldCheck, Zap } from 'lucide-react';
import { Hero3DModel } from '@/components/3d/Hero3DModel';
import { PromoVideoPanel } from '@/components/PromoVideoPanel';

interface MainLobbyViewProps {
  isPrimaryReplica?: boolean;
  onNavigateToCatalog: () => void;
  onOpenDocs: () => void;
}

export function MainLobbyView({
  isPrimaryReplica = true,
  onNavigateToCatalog,
  onOpenDocs,
}: MainLobbyViewProps) {
  // Interactive Service Estimator / Terminal state
  const [activePlan, setActivePlan] = useState<'basic' | 'interactive' | 'custom'>('interactive');
  const [terminalOutput, setTerminalOutput] = useState([
    'Welcome to AMA Website Services.',
    'Scope: From basic mockup to complex AI interactive with customer service & tour.',
    'Status: 100% affordable launch · Zero heavy agency overhead.',
    'Select a package below to inspect scope and turnaround.',
  ]);

  const handleSelectPackage = (plan: 'basic' | 'interactive' | 'custom') => {
    setActivePlan(plan);
    if (plan === 'basic') {
      setTerminalOutput([
        'Tier: 01. Basic Mockup & Fast Launch',
        'Turnaround: 48 to 72 hours',
        'Includes: Custom brand design, mobile responsive, high-speed CDN deployment',
        'Target: Startups and local businesses wanting affordable site launch without overhead.',
      ]);
    } else if (plan === 'interactive') {
      setTerminalOutput([
        'Tier: 02. Complex AI Interactive with Customer Service & Tour',
        'Includes: 24/7 AI customer service agent trained on your business',
        'Features: Automated step-by-step interactive website tour for visitors',
        '3D Elements: Integrated Jarvis guidance avatar and spatial responsiveness.',
      ]);
    } else if (plan === 'custom') {
      setTerminalOutput([
        'Tier: 03. Dynamic Website Design Catalogue',
        'Includes: Multi-section visual showcase, video embeds, and conversion funnels',
        'Maintenance: Low-overhead hosting setup and straightforward management.',
      ]);
    }
  };

  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <section className="relative flex items-center justify-center pt-28 sm:pt-36 pb-12 sm:pb-20 overflow-hidden">
        {/* Ambient radial glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#adff2f]/10 to-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6 py-4 sm:py-6 lg:py-0 text-left">
            
            {/* Status Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-neutral-300 font-mono shadow-[0_0_20px_rgba(255,255,255,0.02)] backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#adff2f] animate-pulse shadow-[0_0_8px_rgba(173,255,47,0.8)]" />
              <span>AMA Website Design & Launch</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">Zero Agency Overhead</span>
            </motion.div>

            {/* Bold Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-neutral-400 leading-[1.08] text-balance"
            >
              Designs by Jarvis 27
            </motion.h1>

            {/* Descriptive Subcopy: Directly fulfilling user's value proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed"
            >
              Affordable website design and launch services for those who want to create an exceptional online presence without the heavy overhead. From basic mockups to complex AI-interactive websites equipped with 24/7 customer service and automated website tours.
            </motion.p>

            {/* Dual Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto pt-2"
            >
              {/* Primary Button: Website Catalog in vibrant green-yellow */}
              <button
                onClick={onNavigateToCatalog}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#adff2f] text-black font-display font-bold text-sm hover:bg-[#9ee628] transition-all duration-300 hover:scale-[1.03] shadow-[0_0_20px_rgba(173,255,47,0.35)] hover:shadow-[0_0_30px_rgba(173,255,47,0.55)] flex items-center justify-center gap-2"
              >
                <span>Browse Website Catalog</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Secondary Button: Outlined border pill button */}
              <button
                onClick={onOpenDocs}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-transparent border border-white/20 text-white font-medium text-sm hover:bg-white/[0.08] hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>View Service Details</span>
              </button>
            </motion.div>

            {/* Unboxed Metadata Metrics */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-neutral-500 pt-4 pb-2 border-t border-white/5 w-full">
              <span>Basic Mockup to AI Core</span>
              <span aria-hidden="true">·</span>
              <span>24/7 Customer Service Bot</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#adff2f]">Affordable Fast Launch</span>
            </div>

          </div>

          {/* Right Hero Column: Interactive 3D Model */}
          <div className="lg:col-span-6 w-full">
            <Hero3DModel
              isPrimary={isPrimaryReplica}
              badgeLabel={isPrimaryReplica ? 'Jarvis Interactive Guide' : '60 FPS Replica Core'}
            />
          </div>

        </div>
      </section>

      {/* 2. 16:9 PROMO VIDEO PANEL: LIVE WEBSITE TOUR */}
      <div id="media-showcase">
        <PromoVideoPanel
          page="lobby"
          title="AMA Interactive Website Tour - Jarvis Live Demo"
          subtitle="Watch how an automated website tour and 24/7 AI customer service elevate visitor engagement."
        />
      </div>

      {/* 3. CORE SERVICE TIERS & PACKAGES */}
      <section id="services-tiers" className="py-20 border-t border-white/10 relative">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          
          <div className="mb-14 max-w-2xl text-left">
            <div className="text-xs font-mono text-[#adff2f] tracking-wider uppercase mb-2">
              Website Design & Launch Packages
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white mb-4">
              From basic mockup to complex AI interactive.
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed">
              We eliminate excessive agency overhead and billable hours. Choose the exact tier that fits your launch timeline and budget.
            </p>
          </div>

          {/* Bento Grid: 3 Tiers + Zero Overhead Guarantee */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Package 1: Basic Mockup */}
            <div className="p-7 rounded-3xl bg-neutral-950/80 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 text-[#adff2f]">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  01. Basic Mockup & Fast Launch
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Clean, modern website mockup converted into a live, high-converting launch page in 48-72 hours. Perfect for validating new offers quickly.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-neutral-500">
                Turnaround: 48-72h · Low Overhead
              </div>
            </div>

            {/* Package 2: Website Tour */}
            <div className="p-7 rounded-3xl bg-neutral-950/80 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 text-cyan-400">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  02. Automated Website Tour
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Interactive step-by-step walkthrough that guides new visitors through your product benefits, pricing, and features automatically.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-neutral-500">
                Increases Conversion & Onboarding
              </div>
            </div>

            {/* Package 3: AI Customer Service */}
            <div className="p-7 rounded-3xl bg-neutral-950/80 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 text-emerald-400">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  03. 24/7 AI Customer Service
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Bespoke intelligent assistant embedded directly into your website to resolve customer questions, capture leads, and book consultations around the clock.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-neutral-500">
                Zero Missed Leads · 24/7 Active
              </div>
            </div>

            {/* Package 4: Zero Overhead */}
            <div className="p-7 rounded-3xl bg-neutral-950/80 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 text-purple-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  04. Transparent Flat-Rate
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  No hidden agency markups, retainers, or bloated management fees. You receive a fully functional, beautiful website with complete ownership.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-neutral-500">
                100% Client Ownership
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE SERVICE ESTIMATOR */}
      <section className="py-20 border-t border-white/10 bg-neutral-950/40">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Selector */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/15 bg-black/90 p-5 sm:p-7 shadow-2xl text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#adff2f]" />
                  <span className="text-xs font-mono text-neutral-300 font-semibold">AMA Website Service Estimator</span>
                </div>
                <div className="text-xs font-mono text-[#adff2f] bg-[#adff2f]/10 px-2.5 py-1 rounded-full border border-[#adff2f]/20">
                  READY TO LAUNCH
                </div>
              </div>

              {/* Package selector tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => handleSelectPackage('basic')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    activePlan === 'basic'
                      ? 'bg-white/20 text-white border border-white/30 font-bold'
                      : 'bg-white/5 text-neutral-400 hover:text-white border border-white/5'
                  }`}
                >
                  Basic Mockup
                </button>
                <button
                  onClick={() => handleSelectPackage('interactive')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    activePlan === 'interactive'
                      ? 'bg-white/20 text-white border border-white/30 font-bold'
                      : 'bg-white/5 text-neutral-400 hover:text-white border border-white/5'
                  }`}
                >
                  Complex AI Interactive
                </button>
                <button
                  onClick={() => handleSelectPackage('custom')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    activePlan === 'custom'
                      ? 'bg-white/20 text-white border border-white/30 font-bold'
                      : 'bg-white/5 text-neutral-400 hover:text-white border border-white/5'
                  }`}
                >
                  Website Catalogue
                </button>
              </div>

              {/* Scope details */}
              <div className="space-y-2 font-mono text-xs text-neutral-300 min-h-[140px] bg-neutral-950/80 p-4 rounded-xl border border-white/5">
                {terminalOutput.map((line, idx) => (
                  <p key={idx} className="flex items-center gap-2">
                    <span className="text-[#adff2f] select-none">&gt;</span>
                    <span>{line}</span>
                  </p>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>AMA Alliance Digital Studio</span>
                <span className="text-[#adff2f]">Affordable Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* Right: Key Value Points */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div>
              <div className="text-xs font-mono text-[#adff2f] uppercase tracking-wider mb-2">
                Why Choose AMA Website Services
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                Speed, quality, and direct savings.
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Traditional agencies charge five-figure retainers with months of delays. We deliver production-grade websites and interactive AI tours directly to your audience.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-neutral-950/70 border border-white/10">
                <div className="text-3xl font-display font-bold text-white mb-1 tabular-nums">
                  48-72 <span className="text-xs font-mono text-[#adff2f]">HRS</span>
                </div>
                <div className="text-xs text-neutral-400 font-medium">Fast Mockup Launch</div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-950/70 border border-white/10">
                <div className="text-3xl font-display font-bold text-white mb-1 tabular-nums">
                  0 <span className="text-xs font-mono text-cyan-400">%</span>
                </div>
                <div className="text-xs text-neutral-400 font-medium">Agency Overhead</div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-950/70 border border-white/10">
                <div className="text-3xl font-display font-bold text-white mb-1 tabular-nums">
                  24/7 <span className="text-xs font-mono text-emerald-400">AI</span>
                </div>
                <div className="text-xs text-neutral-400 font-medium">Customer Support</div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-950/70 border border-white/10">
                <div className="text-3xl font-display font-bold text-white mb-1 tabular-nums">
                  100 <span className="text-xs font-mono text-purple-400">%</span>
                </div>
                <div className="text-xs text-neutral-400 font-medium">Custom Tailored</div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onNavigateToCatalog}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#adff2f] transition-colors"
              >
                <span>Explore the Website Design Catalogue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 5. CALL TO ACTION STRIP */}
      <section className="pt-20 pb-28 sm:pb-32 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#adff2f]/5 to-transparent pointer-events-none" />
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4">
            Browse the Complete Website Catalogue
          </h2>
          <p className="text-base text-neutral-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Discover our curated website designs, from sleek modern landing pages to complex AI-assisted customer service portals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onNavigateToCatalog}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#adff2f] text-black font-display font-bold text-sm hover:bg-[#9ee628] transition-all duration-300 shadow-[0_0_25px_rgba(173,255,47,0.4)] flex items-center justify-center gap-2"
            >
              <span>Explore Website Catalog</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              onClick={onOpenDocs}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-sm transition-colors"
            >
              <span>View Service Details</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
