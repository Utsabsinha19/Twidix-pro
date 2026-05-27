import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SoundToggle, useSound } from './SoundDesign';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { playInteraction } = useSound();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { id: 'story', label: 'Prologue' },
    { id: 'archive', label: 'Living Archive' },
    { id: 'sanctum', label: 'Personal Sanctum' },
    { id: 'constellations', label: 'Constellations' },
    { id: 'intimacy', label: 'AI Intimacy' },
    { id: 'analytics', label: 'Tonality Waves' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-3 bg-[#0B0C0E]/85 backdrop-blur-md border-b border-[#E6E4DF]/05' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Cinematic Logo */}
        <button
          onClick={() => {
            playInteraction('select');
            setActiveTab('story');
          }}
          className="flex items-baseline gap-2 text-left group"
        >
          <span className="font-cinematic text-2xl md:text-3xl font-light tracking-widest text-[#F3EFEA] group-hover:text-[#C5A46E] transition-colors duration-300">
            Twidix
          </span>
          <span className="text-[9px] font-mono tracking-widest uppercase text-[#8E9299] hidden sm:inline-block">
            // Sanctuary
          </span>
        </button>

        {/* Editorial Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#14171D]/40 p-1 rounded-full border border-[#E6E4DF]/05 backdrop-blur-md">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (!isActive) {
                    playInteraction('select');
                    setActiveTab(tab.id);
                  }
                }}
                onMouseEnter={() => playInteraction('hover')}
                className={`relative px-5 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 ${
                  isActive 
                    ? 'text-[#F3EFEA] font-medium' 
                    : 'text-[#8E9299] hover:text-[#E6E4DF]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-[#25282E] rounded-full -z-10 border border-[#E6E4DF]/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Audio Design Toggle & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <SoundToggle />

          {/* Minimalist Mobile Menu trigger */}
          <div className="md:hidden flex items-center">
            <select
              value={activeTab}
              onChange={(e) => {
                playInteraction('select');
                setActiveTab(e.target.value);
              }}
              className="bg-[#14171D] text-[#F3EFEA] border border-[#E6E4DF]/10 rounded-full px-3 py-1 text-xs uppercase tracking-wider focus:outline-none"
            >
              {tabs.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </motion.header>
  );
};
