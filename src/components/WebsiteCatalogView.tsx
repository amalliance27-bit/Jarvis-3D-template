import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Eye, Check, X, Bot, Compass, Clock, Sparkles } from 'lucide-react';
import { Hero3DModel } from '@/components/3d/Hero3DModel';
import { PromoVideoPanel } from '@/components/PromoVideoPanel';

interface WebsiteCatalogViewProps {
  isPrimaryReplica?: boolean;
  onNavigateToLobby: () => void;
  onOpenDocs: () => void;
}

interface CatalogItem {
  id: string;
  title: string;
  category: 'Fast Launch Websites' | 'AI Customer Service & Tours' | 'Catalog & E-Commerce' | '3D & Immersive Design';
  tagline: string;
  description: string;
  stack: string[];
  metrics: string;
  accentColor: string;
  features: string[];
}

const catalogData: CatalogItem[] = [
  {
    id: 'ai-interactive-tour',
    title: 'AI-Interactive Website & Automated Tour',
    category: 'AI Customer Service & Tours',
    tagline: 'Guided walkthrough of your business combined with 24/7 AI customer assistance',
    description: 'A cutting-edge web architecture where visitors are automatically guided through your key offerings, pricing, and value points, backed by an embedded AI concierge answering questions instantly.',
    stack: ['AI Agent Integration', 'Interactive Tour Engine', 'React 19 & Tailwind'],
    metrics: '24/7 Live Customer Desk',
    accentColor: '#adff2f',
    features: ['Automated visitor tour flow', '24/7 customer service chat', 'Zero-friction lead qualification'],
  },
  {
    id: 'rapid-mockup-launch',
    title: 'Rapid Mockup & Fast Site Launch',
    category: 'Fast Launch Websites',
    tagline: 'Affordable, clean website launch without the heavy agency overhead',
    description: 'Transform your brand concept or wireframe into a live, professional digital presence in 48-72 hours. Built with ultra-clean code and mobile-first responsiveness.',
    stack: ['High-Speed CDN', 'Mobile Optimization', 'Conversion Layout'],
    metrics: '48-72 Hour Delivery',
    accentColor: '#38bdf8',
    features: ['Zero heavy agency overhead', 'Tailored to your branding', 'Lightning-fast load times'],
  },
  {
    id: 'dynamic-product-catalogue',
    title: 'Dynamic Product & Service Catalogue',
    category: 'Catalog & E-Commerce',
    tagline: 'High-impact multi-category showcase with instant filtering and hypnotic scroll',
    description: 'Engineered for businesses showcasing multiple services, portfolios, or collections. Features fluid category filtering, hypnotic scroll presentations, and direct inquiry capture.',
    stack: ['Category Filtering', 'Hypnotic Scroll Engine', 'Lead Forms'],
    metrics: 'Unlimited Item Capacity',
    accentColor: '#22c35e',
    features: ['Instant category switching', 'Bespoke item detail cards', 'One-click client contact'],
  },
  {
    id: 'spatial-3d-experience',
    title: 'Interactive 3D Avatar Experience',
    category: '3D & Immersive Design',
    tagline: 'Spline 3D character guidance paired with 60 FPS performance fallback core',
    description: 'Elevate visitor retention with real-time 3D models that respond to visitor gestures and mouse pointers, backed by an optimized 60 FPS core that avoids browser lag.',
    stack: ['Spline 3D Runtime', 'WebGL 2.0 / Canvas Core', 'Kinetic Physics'],
    metrics: '60 FPS Continuous Lock',
    accentColor: '#a855f7',
    features: ['Cursor kinematic tracking', 'Sub-millisecond frame dispatch', 'Resilient 2D/3D fallbacks'],
  },
  {
    id: 'minimalist-dark-portal',
    title: 'High-Converting Business Landing Page',
    category: 'Fast Launch Websites',
    tagline: 'Sleek high-contrast layout built with anti-slop typographic discipline',
    description: 'A commanding dark-mode digital presence crafted for professional consultants, agencies, and tech founders who demand maximum credibility and zero fluff.',
    stack: ['Pure Black Canvas', 'Frosted Glass Aesthetics', 'WCAG AAA Accessible'],
    metrics: 'Sub-Second Page Paint',
    accentColor: '#eab308',
    features: ['Unboxed clean typography', 'Zero bloated dependencies', '100% mobile perfection'],
  },
  {
    id: 'ai-concierge-portal',
    title: 'Autonomous 24/7 Customer Desk Portal',
    category: 'AI Customer Service & Tours',
    tagline: 'Knowledge-trained AI customer support agent integrated directly into your site',
    description: 'Trained specifically on your FAQs, product rates, and availability. Answers prospect inquiries around the clock, captures client information, and handles initial onboarding.',
    stack: ['Context Engine', 'Automated Lead Routing', 'Interactive UI Widget'],
    metrics: '100% Query Handling',
    accentColor: '#f43f5e',
    features: ['Custom business knowledge', 'Direct appointment scheduling', 'Multi-device responsive'],
  },
];

export function WebsiteCatalogView({
  isPrimaryReplica = true,
  onNavigateToLobby,
  onOpenDocs,
}: WebsiteCatalogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Packages');
  const [activeItem, setActiveItem] = useState<CatalogItem | null>(null);

  const categories = [
    'All Packages',
    'Fast Launch Websites',
    'AI Customer Service & Tours',
    'Catalog & E-Commerce',
    '3D & Immersive Design',
  ];

  const filteredItems = selectedCategory === 'All Packages'
    ? catalogData
    : catalogData.filter(item => item.category === selectedCategory);

  const scrollToGrid = () => {
    const el = document.getElementById('catalog-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <section className="relative flex items-center justify-center pt-28 sm:pt-36 pb-12 sm:pb-20 overflow-hidden">
        {/* Ambient radial glows */}
        <div className="absolute top-1/4 left-1/3 w-[520px] h-[520px] bg-gradient-to-br from-emerald-500/10 to-[#adff2f]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-12 right-1/4 w-[420px] h-[420px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />

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
              <span>AMA Website Catalogue</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">Affordable Site Launch</span>
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

            {/* Descriptive Subcopy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed"
            >
              Curated collection of website designs and launch packages for those seeking an affordable, standout web presence without heavy agency overhead. From basic mockups to complex AI interactive experiences with customer service and automated website tours.
            </motion.p>

            {/* Dual Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto pt-2"
            >
              {/* Primary Button: Main Lobby in vibrant green-yellow */}
              <button
                onClick={onNavigateToLobby}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#adff2f] text-black font-display font-bold text-sm hover:bg-[#9ee628] transition-all duration-300 hover:scale-[1.03] shadow-[0_0_20px_rgba(173,255,47,0.35)] hover:shadow-[0_0_30px_rgba(173,255,47,0.55)] flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Main Lobby</span>
              </button>

              {/* Secondary Button: Outlined border pill button */}
              <button
                onClick={scrollToGrid}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-transparent border border-white/20 text-white font-medium text-sm hover:bg-white/[0.08] hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Explore Packages</span>
              </button>
            </motion.div>

            {/* Unboxed Metadata Metrics */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-neutral-500 pt-4 pb-2 border-t border-white/5 w-full">
              <span>6 Production Packages</span>
              <span aria-hidden="true">·</span>
              <span>Automated Website Tours</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#adff2f]">Hypnotic Auto-Scroll Preview</span>
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

      {/* 2. 16:9 PROMO VIDEO PANEL: ARCHITECTURE & LAUNCH SHOWCASE */}
      <div id="media-showcase">
        <PromoVideoPanel
          page="catalog"
          title="AMA Website Design Catalogue - Live Architecture Showcase"
          subtitle="Explore our complete catalogue of affordable, modern website designs built without heavy overhead."
        />
      </div>

      {/* 3. CURATED CATALOG SHOWCASES */}
      <section id="catalog-grid" className="py-20 border-t border-white/10 relative">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
            <div>
              <div className="text-xs font-mono text-[#adff2f] tracking-wider uppercase mb-2">
                Service Catalog & Deployments
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Curated Website Design Catalogue
              </h2>
              <p className="text-sm text-neutral-400 mt-2 max-w-xl">
                Select from our complete range of website design and launch solutions, custom-calibrated for your brand without bloated agency fees.
              </p>
            </div>

            {/* Interactive Filter Control Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-950 rounded-2xl border border-white/10">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="rounded-3xl bg-neutral-950/80 border border-white/10 hover:border-white/25 transition-all duration-300 p-6 flex flex-col justify-between text-left group hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              >
                <div>
                  {/* Category and Benchmark row */}
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-neutral-400 mb-4 pb-3 border-b border-white/5">
                    <span className="text-[#adff2f]">{item.category}</span>
                    <span className="text-neutral-500 tabular-nums">{item.metrics}</span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-neutral-100 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-medium mb-3">
                    {item.tagline}
                  </p>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Feature checklist */}
                  <ul className="space-y-1.5 mb-6 text-xs text-neutral-300">
                    {item.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#adff2f] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {/* Clean unboxed stack metadata with bullet separators */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-neutral-500 pt-4 border-t border-white/5 mb-4">
                    {item.stack.map((tech, tidx) => (
                      <React.Fragment key={tidx}>
                        <span>{tech}</span>
                        {tidx < item.stack.length - 1 && <span aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Action button to open detailed preview */}
                  <button
                    onClick={() => setActiveItem(item)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 text-white text-xs font-semibold font-mono flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#adff2f]" />
                    <span>Inspect Package Details</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. CALL TO ACTION STRIP */}
      <section className="pt-20 pb-28 sm:pb-32 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#adff2f]/5 to-transparent pointer-events-none" />
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4">
            Return to the Main Lobby
          </h2>
          <p className="text-base text-neutral-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Transition back to the primary entrance to experience the interactive website tour demo and service estimator.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onNavigateToLobby}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#adff2f] text-black font-display font-bold text-sm hover:bg-[#9ee628] transition-all duration-300 shadow-[0_0_25px_rgba(173,255,47,0.4)] flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Back to Main Lobby</span>
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

      {/* Item Detail Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl rounded-3xl bg-neutral-950 border border-white/15 p-6 sm:p-8 shadow-2xl text-left"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close package modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-xs font-mono text-[#adff2f] uppercase tracking-wider mb-2">
                {activeItem.category}
              </div>
              <h3 className="text-2xl font-bold font-display text-white mb-2">
                {activeItem.title}
              </h3>
              <p className="text-sm text-neutral-300 font-medium mb-4">
                {activeItem.tagline}
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                {activeItem.description}
              </p>

              <div className="mb-6 p-4 rounded-2xl bg-black border border-white/10">
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Package Deliverables
                </div>
                <ul className="space-y-2 text-xs text-neutral-300">
                  {activeItem.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#adff2f]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span>Delivery Standard:</span>
                  <span className="text-white">{activeItem.metrics}</span>
                </div>
                <button
                  onClick={() => setActiveItem(null)}
                  className="px-5 py-2 rounded-full bg-[#adff2f] hover:bg-[#9ee628] text-black font-bold font-display transition-colors"
                >
                  Close Details
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
