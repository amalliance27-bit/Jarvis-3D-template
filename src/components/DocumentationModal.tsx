import React from 'react';
import { X, Layers, Bot, Compass, CheckCircle2, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCatalog: () => void;
}

export function DocumentationModal({ isOpen, onClose, onNavigateToCatalog }: DocumentationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-white/15 p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close service details modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-[#adff2f]/10 border border-[#adff2f]/30 flex items-center justify-center text-[#adff2f]">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              AMA Website Design & Launch Service Scope
            </h2>
            <p className="text-xs text-neutral-400 font-mono">
              Affordable custom website launch without the heavy agency overhead
            </p>
          </div>
        </div>

        <div className="my-6 h-[1px] bg-white/10" />

        {/* Service Tiers Content */}
        <div className="space-y-6 text-sm text-neutral-300 leading-relaxed">
          
          {/* Tier 1: Basic Mockup to Fast Launch */}
          <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#adff2f]" />
                01. Basic Mockup & Fast Site Launch
              </h3>
              <span className="text-xs font-mono text-[#adff2f] bg-[#adff2f]/10 px-2 py-0.5 rounded-full">
                Zero Heavy Overhead
              </span>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm mb-3">
              Designed for creators, startups, and local businesses who need an affordable, high-impact landing page or website mockup deployed quickly without bloated agency fees.
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-300 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#adff2f]" />
                <span>Clean bespoke design tailored to your brand identity</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#adff2f]" />
                <span>Ultra-fast responsive mobile and desktop layout</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#adff2f]" />
                <span>Rapid 48-to-72 hour turn-around launch option</span>
              </li>
            </ul>
          </div>

          {/* Tier 2: Dynamic Website Catalogue */}
          <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                02. Dynamic Catalogue & Showcases
              </h3>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">
                Full Production
              </span>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm mb-3">
              Comprehensive multi-section or multi-page digital catalog for services, products, and interactive portfolios. Includes custom video embeds, filtering, and conversion-focused CTAs.
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-300 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Interactive product/service gallery with live filtering</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Seamless hypnotic auto-scroll showcase modes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Direct customer inquiry forms and instant lead capture</span>
              </li>
            </ul>
          </div>

          {/* Tier 3: Complex AI Interactive with Customer Service & Tour */}
          <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Bot className="w-4 h-4 text-emerald-400" />
                03. Complex AI Interactive with Customer Service & Tour
              </h3>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                Next-Gen AI Core
              </span>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm mb-3">
              The flagship experience: a fully interactive website powered by an intelligent 24/7 customer service assistant, automated guided tours that walk visitors through your offerings, and 3D avatar interaction.
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-300 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>24/7 AI Customer Service agent trained on your business data</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Guided interactive website tour highlighting key features step-by-step</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Integrated 3D character guidance and real-time visitor assistance</span>
              </li>
            </ul>
          </div>

          {/* Delivery & Pricing Philosophy */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#adff2f] shrink-0 mt-0.5" />
            <div className="text-xs text-neutral-300 leading-relaxed">
              <span className="text-white font-semibold block mb-0.5">The AMA Value Guarantee</span>
              We eliminate traditional agency overhead, bloated billable hours, and complex maintenance contracts. You receive a fast, modern, and completely production-ready website with predictable, flat-rate pricing.
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onNavigateToCatalog();
            }}
            className="px-5 py-2.5 rounded-full bg-[#adff2f] hover:bg-[#9ee628] text-black text-xs font-bold transition-colors shadow-[0_0_15px_rgba(173,255,47,0.3)]"
          >
            Browse Website Catalog
          </button>
        </div>
      </div>
    </div>
  );
}
