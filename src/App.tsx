import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { MainLobbyView } from '@/components/MainLobbyView';
import { WebsiteCatalogView } from '@/components/WebsiteCatalogView';
import { DocumentationModal } from '@/components/DocumentationModal';
import { Footer } from '@/components/Footer';
import { useHypnoticAutoScroll } from '@/hooks/useHypnoticAutoScroll';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'lobby' | 'catalog'>('lobby');
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  // Hypnotic background auto-scroll hook with zero bottom screen intrusion
  const { isAutoScrollActive, toggleAutoScroll } = useHypnoticAutoScroll({
    currentPage,
    speedMultiplier: 1,
  });

  // Sync hash state with currentPage
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#catalog') {
        setCurrentPage('catalog');
      } else {
        setCurrentPage('lobby');
        if (hash !== '#lobby') {
          window.location.hash = '#lobby';
        }
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'lobby' | 'catalog') => {
    setCurrentPage(page);
    window.location.hash = `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#adff2f]/30 selection:text-white font-sans overflow-x-hidden relative">
      
      {/* Header with Connected Ticker (Time, Date, Temp, Gemini Retrograde, Life Path, Theme, Aspiration) */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenDocs={() => setIsDocsOpen(true)}
        isAutoScrollActive={isAutoScrollActive}
        onToggleAutoScroll={toggleAutoScroll}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        {currentPage === 'lobby' ? (
          <div className="flex flex-col">
            {/* Primary Replica */}
            <div id="replica-primary" className="relative w-full">
              <MainLobbyView
                isPrimaryReplica={true}
                onNavigateToCatalog={() => navigateTo('catalog')}
                onOpenDocs={() => setIsDocsOpen(true)}
              />
            </div>

            {/* Duplicate Replica for Continuous Scroll (60 FPS Canvas Fallback Core) */}
            <div id="replica-secondary" className="relative w-full border-t border-white/10 pt-12">
              <div className="max-w-[1360px] mx-auto px-6 mb-8">
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#adff2f]" />
                  <span>Continuous Scroll Stream Replica · 60 FPS Core Mode</span>
                </div>
              </div>
              <MainLobbyView
                isPrimaryReplica={false}
                onNavigateToCatalog={() => navigateTo('catalog')}
                onOpenDocs={() => setIsDocsOpen(true)}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Catalog Page: Hypnotic bounce from top hero to the end of page and back */}
            <div id="catalog-content" className="relative w-full">
              <WebsiteCatalogView
                isPrimaryReplica={true}
                onNavigateToLobby={() => navigateTo('lobby')}
                onOpenDocs={() => setIsDocsOpen(true)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Documentation Modal */}
      <DocumentationModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
        onNavigateToCatalog={() => navigateTo('catalog')}
      />

      {/* Minimalist Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenDocs={() => setIsDocsOpen(true)}
      />
    </div>
  );
}
