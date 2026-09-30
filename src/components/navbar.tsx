import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { HeaderTicker } from '@/components/HeaderTicker';

interface NavbarProps {
  currentPage: 'lobby' | 'catalog';
  onNavigate: (page: 'lobby' | 'catalog') => void;
  onOpenDocs?: () => void;
  isAutoScrollActive?: boolean;
  onToggleAutoScroll?: () => void;
}

export function Navbar({
  currentPage,
  onNavigate,
  onOpenDocs,
  isAutoScrollActive,
  onToggleAutoScroll,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('lobby');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (page: 'lobby' | 'catalog', sectionId?: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
      
      {/* 1. TOP TICKER: Connected directly to header with NO space */}
      <HeaderTicker
        isAutoScrollActive={isAutoScrollActive}
        onToggleAutoScroll={onToggleAutoScroll}
      />

      {/* 2. MAIN NAVIGATION BAR: Directly attached below ticker with NO gap/space */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
        
        {/* Brand Zone: AMA Red Medallion Logo acting as active link to Main Lobby */}
        <a
          href="#lobby"
          onClick={handleLogoClick}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#adff2f]"
          aria-label="AMA Alliance - Return to Main Lobby"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/15 bg-black/60 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:border-[#adff2f]/50">
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
            <span className="text-white font-display font-bold text-base sm:text-lg tracking-tight leading-none group-hover:text-neutral-100 transition-colors">
              Jarvis 27
            </span>
            <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase mt-0.5">
              AMA Website Services
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => handleNavClick('lobby')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              currentPage === 'lobby'
                ? 'text-white bg-white/10 font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Main Lobby
          </button>

          <button
            onClick={() => handleNavClick('catalog')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              currentPage === 'catalog'
                ? 'text-white bg-white/10 font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Website Catalog
          </button>

          <button
            onClick={() => handleNavClick(currentPage, 'services-tiers')}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Services & Tiers
          </button>

          <button
            onClick={() => handleNavClick(currentPage, 'media-showcase')}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Website Tour & Showcase
          </button>

          {onOpenDocs && (
            <button
              onClick={onOpenDocs}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Service Details
            </button>
          )}
        </nav>

        {/* Action Zone: Primary CTA Button in vibrant green-yellow */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentPage === 'lobby' ? (
            <button
              onClick={() => handleNavClick('catalog')}
              className="relative inline-flex h-9 sm:h-10 items-center justify-center rounded-full bg-[#adff2f] px-4 sm:px-5 text-xs sm:text-sm font-bold text-black shadow-[0_0_20px_rgba(173,255,47,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(173,255,47,0.55)] focus:outline-none focus:ring-2 focus:ring-[#adff2f]"
            >
              <span>Website Catalog</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 stroke-[2.5]" />
            </button>
          ) : (
            <button
              onClick={() => handleNavClick('lobby')}
              className="relative inline-flex h-9 sm:h-10 items-center justify-center rounded-full bg-[#adff2f] px-4 sm:px-5 text-xs sm:text-sm font-bold text-black shadow-[0_0_20px_rgba(173,255,47,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(173,255,47,0.55)] focus:outline-none focus:ring-2 focus:ring-[#adff2f]"
            >
              <span>Main Lobby</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 stroke-[2.5]" />
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-2xl p-5 shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('lobby')}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentPage === 'lobby' ? 'bg-white/10 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Main Lobby
              </button>

              <button
                onClick={() => handleNavClick('catalog')}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentPage === 'catalog' ? 'bg-white/10 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Website Catalog
              </button>

              <button
                onClick={() => handleNavClick(currentPage, 'services-tiers')}
                className="text-left px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-400 hover:text-white"
              >
                Services & Tiers
              </button>

              <button
                onClick={() => handleNavClick(currentPage, 'media-showcase')}
                className="text-left px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-400 hover:text-white"
              >
                Website Tour & Showcase
              </button>

              {onOpenDocs && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenDocs();
                  }}
                  className="text-left px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-400 hover:text-white"
                >
                  Service Details
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
