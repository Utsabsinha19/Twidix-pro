import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SoundProvider } from './components/SoundDesign';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { LivingArchive } from './components/LivingArchive';
import { PersonalSanctum } from './components/PersonalSanctum';
import { AiIntimacyChat } from './components/AiIntimacyChat';
import { EmotionalAnalytics } from './components/EmotionalAnalytics';
import { FamilyGalaxy } from './components/FamilyGalaxy';
import { MemoryDetailModal } from './components/MemoryDetailModal';

import { INITIAL_MEMORIES } from './data/mockData';
import { Memory } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('story');
  const [memories, setMemories] = useState<Memory[]>(INITIAL_MEMORIES);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  // Scroll to top on tab change for genuine museum editorial progression
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleAddMemory = (newMem: Memory) => {
    setMemories(prev => [newMem, ...prev]);
  };

  const handleSelectNodeFilter = (authorName: string) => {
    // Navigate directly to the Living Archive and focus
    setActiveTab('archive');
    // For feedback, we can select their first memory if they have one!
    const authorMem = memories.find(m => m.author.includes(authorName) || m.relation.includes(authorName) || m.narrative.includes(authorName));
    if (authorMem) {
      setTimeout(() => {
        setSelectedMemory(authorMem);
      }, 600);
    }
  };

  return (
    <SoundProvider>
      {/* Fixed immersive film grain texture across the whole sanctuary */}
      <div className="film-grain-fixed" />

      {/* Persistent Elegant Header Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Orchestration */}
      <main className="min-h-screen relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Hero 
                onExplore={() => setActiveTab('archive')} 
                onEnterSanctum={() => setActiveTab('sanctum')} 
              />
            </motion.div>
          )}

          {activeTab === 'archive' && (
            <motion.div
              key="archive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <LivingArchive 
                onSelectMemory={(mem) => setSelectedMemory(mem)} 
              />
            </motion.div>
          )}

          {activeTab === 'sanctum' && (
            <motion.div
              key="sanctum"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <PersonalSanctum
                memories={memories}
                onAddMemory={handleAddMemory}
                onSelectMemory={(mem) => setSelectedMemory(mem)}
                onOpenChat={() => setActiveTab('intimacy')}
              />
            </motion.div>
          )}

          {activeTab === 'constellations' && (
            <motion.div
              key="constellations"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FamilyGalaxy 
                onSelectNodeFilter={handleSelectNodeFilter}
              />
            </motion.div>
          )}

          {activeTab === 'intimacy' && (
            <motion.div
              key="intimacy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AiIntimacyChat />
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <EmotionalAnalytics />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Deep Immersive Universal Footer */}
      <footer className="relative z-10 border-t border-[#E6E4DF]/05 bg-[#07080A] py-16 px-6 md:px-12 text-[#8E9299]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="md:col-span-2 space-y-4">
            <span className="font-cinematic text-xl text-[#F3EFEA] tracking-widest block">
              Twidix SANCTUARY
            </span>
            <p className="text-xs font-light max-w-sm leading-relaxed tracking-wide">
              A cinematic sanctuary designed as an eternal digital museum of human existence. Uniting physical archives, emotional frequencies, and ancestral voice patterns beyond the boundary of time.
            </p>
            <p className="text-[10px] font-mono text-[#C5A46E]">
              // Fully Native 432Hz Ambient Synthesis Active
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono text-[#E6E4DF] uppercase block tracking-wider mb-4">
              Sanctuary Portals
            </span>
            <ul className="space-y-2 text-xs">
              {(['story', 'archive', 'sanctum', 'constellations', 'intimacy', 'analytics'] as const).map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className="hover:text-[#F3EFEA] hover:underline transition-colors capitalize"
                  >
                    {tab === 'story' ? 'Futuristic Prologue' : tab === 'archive' ? 'Living Archive' : tab === 'sanctum' ? 'Personal Sanctum' : tab === 'constellations' ? 'Family Constellations' : tab === 'intimacy' ? 'AI Intimacy Chat' : 'Tonality Waves'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[10px] font-mono text-[#E6E4DF] uppercase block tracking-wider mb-4">
              Design Philosophy
            </span>
            <p className="text-[11px] font-light leading-relaxed">
              Crafted specifically to avoid standard administrative paradigms. Every micro-interaction, sound wave, and asymmetric layout honors the psychological gravity of human memory.
            </p>
            <div className="mt-4 pt-4 border-t border-[#E6E4DF]/05 text-[9px] font-mono text-[#8E9299]/60">
              © {new Date().getFullYear()} Twidix. All rights immortalized.
            </div>
          </div>

        </div>
      </footer>

      {/* Cinematic Detail Inspection Modal Overlay */}
      <MemoryDetailModal
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
      />

    </SoundProvider>
  );
}
