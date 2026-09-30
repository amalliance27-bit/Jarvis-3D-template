import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'lobby' | 'catalog') => void;
  onOpenDocs?: () => void;
}

export function Footer({ onNavigate, onOpenDocs }: FooterProps) {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('lobby');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-black pt-16 pb-28 sm:pb-20 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 sm:gap-12 mb-14">
          
          {/* Brand Column (2 cols wide on desktop) */}
          <div className="md:col-span-2 flex flex-col items-start gap-4">
            <a
              href="#lobby"
              onClick={handleLogoClick}
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="AMA Alliance - Return to Main Lobby"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-black/60 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:border-[#adff2f]/60">
                <img
                  src="/ama-logo-red.png"
                  alt="AMA Alliance Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = 'https://raw.githubusercontent.com/amalliance27-bit/Ask247-Website-Promo/8d0bc66ac8734c4ffb18fd210369c4a1f6432629/ama%20logo%20red.png';
                  }}
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-white font-display font-bold text-lg tracking-tight">
                  Jarvis 27
                </span>
                <span className="text-[11px] text-neutral-400 font-mono tracking-wider uppercase">
                  AMA Website Design Services
                </span>
              </div>
            </a>

            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Affordable website launch and custom digital architectures for businesses looking to launch quickly without heavy agency overhead. From basic mockups to complex AI-interactive experiences with 24/7 customer service and automated website tours.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#adff2f]">
              <span className="w-2 h-2 rounded-full bg-[#adff2f] animate-pulse" />
              <span>AMA Production Engineering & Rapid Launch</span>
            </div>
          </div>

          {/* Column 1: Product / Services */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400 font-medium">
              <li>
                <button
                  onClick={() => {
                    onNavigate('lobby');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Main Lobby
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Website Catalog
                </button>
              </li>
              <li>
                <a href="#services-tiers" className="hover:text-white transition-colors">
                  Design Packages
                </a>
              </li>
              <li>
                <a href="#media-showcase" className="hover:text-white transition-colors">
                  Website Tour & Showcase
                </a>
              </li>
              {onOpenDocs && (
                <li>
                  <button
                    onClick={onOpenDocs}
                    className="hover:text-white transition-colors text-left"
                  >
                    Service Scope & SLA
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400 font-medium">
              <li>
                <span className="text-neutral-300">AMA Alliance</span>
              </li>
              <li>
                <span className="text-neutral-400">Jarvis 27 Design Studio</span>
              </li>
              <li>
                <span className="text-neutral-400">AI Customer Support Core</span>
              </li>
              <li>
                <span className="text-neutral-400">Rapid Launch Division</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal (Notice strictly NO Resources column) */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400 font-medium">
              <li>
                <span className="text-neutral-400">Privacy Policy</span>
              </li>
              <li>
                <span className="text-neutral-400">Service Terms</span>
              </li>
              <li>
                <span className="text-neutral-400">Quality Guarantee</span>
              </li>
              <li>
                <span className="text-neutral-400">Design IP Rights</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright row with active scroll to top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div className="flex items-center gap-3">
            <span>© 2026 AMA Alliance. All rights reserved.</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span>AMA Website Design & Launch Services</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
