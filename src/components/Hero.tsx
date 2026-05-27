import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Eye, Compass } from 'lucide-react';
import { useSound } from './SoundDesign';
import { INITIAL_MEMORIES } from '../data/mockData';

interface HeroProps {
  onExplore: () => void;
  onEnterSanctum: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onEnterSanctum }) => {
  const { playInteraction } = useSound();
  const [activeBackgroundIndex, setActiveBackgroundIndex] = useState(0);

  // Curate 3 stunning background options for cinematic depth
  const ambientBackgrounds = [
    {
      url: INITIAL_MEMORIES[0].imageUrl,
      title: "The Golden Autumn in Vienna",
      era: "1978",
      quote: "The light that afternoon had a specific density—like liquid amber."
    },
    {
      url: INITIAL_MEMORIES[1].imageUrl,
      title: "The Last Gramophone Record",
      era: "1964",
      quote: "Synchronized silence, allowing the warmth of the heavy air to etch itself."
    },
    {
      url: INITIAL_MEMORIES[5].imageUrl,
      title: "Inheritance of the Silent Seasons",
      era: "2004",
      quote: "You could track the subtle evolution of our facial bone structures."
    }
  ];

  const currentBg = ambientBackgrounds[activeBackgroundIndex];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 overflow-hidden selection:bg-[#C5A46E]/30">
      
      {/* Cinematic Ambient Background with extremely smooth fade transitions */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBackgroundIndex}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 0.28, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={currentBg.url} 
              alt={currentBg.title}
              className="w-full h-full object-cover object-center animate-ambient" 
            />
            {/* Soft atmospheric gradient masks avoiding any generic look */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/70 to-[#0B0C0E]/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E] via-transparent to-[#0B0C0E]" />
          </motion.div>
        </AnimatePresence>

        {/* Ethereal color washes matching the emotional intelligence scheme */}
        <div className="absolute inset-0 bg-[#14171D]/40 mix-blend-color" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#E2843B]/05 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] rounded-full bg-[#2D6A68]/05 blur-3xl pointer-events-none" />
      </div>

      {/* Subtle floating background polaroid artifacts giving absolute 'living museum' feel */}
      <div className="absolute top-36 right-8 md:right-16 w-48 md:w-64 premium-glass-light p-2.5 pb-8 rounded-sm shadow-2xl rotate-3 animate-float hidden xl:block pointer-events-none">
        <div className="relative aspect-square overflow-hidden bg-[#25282E]/50">
          <img src={INITIAL_MEMORIES[4].imageUrl} alt="Memory" className="w-full h-full object-cover grayscale contrast-125" />
          <div className="absolute inset-0 bg-[#C5A46E]/10 mix-blend-overlay" />
        </div>
        <p className="mt-3 font-cinematic text-[11px] text-[#E6E4DF]/70 text-center italic tracking-wide">
          Dubrovnik, 1983
        </p>
      </div>

      <div className="absolute bottom-28 left-8 md:left-12 w-44 md:w-56 premium-glass-light p-2 pb-7 rounded-sm shadow-2xl -rotate-6 animate-float hidden xl:block pointer-events-none" style={{ animationDelay: '3s' }}>
        <div className="relative aspect-square overflow-hidden bg-[#25282E]/50">
          <img src={INITIAL_MEMORIES[3].imageUrl} alt="Memory" className="w-full h-full object-cover grayscale contrast-125" />
        </div>
        <p className="mt-2 font-cinematic text-[10px] text-[#E6E4DF]/60 text-center italic tracking-wide">
          Bremerhaven, 1956
        </p>
      </div>

      {/* Main Hero Content - Editorial & Breathtaking */}
      <div className="max-w-5xl mx-auto w-full mt-auto mb-12">
        
        {/* Subtle documentary prefix */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14171D]/80 border border-[#E6E4DF]/10 mb-6"
        >
          <Sparkles className="w-3 h-3 text-[#C5A46E]" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#E6E4DF]/80">
            A Living Archive of Human Existence
          </span>
        </motion.div>

        {/* Breathtaking Cinematic Headlines */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-cinematic text-5xl sm:text-7xl lg:text-8xl font-light text-[#F3EFEA] leading-[0.95] tracking-tight max-w-4xl"
        >
          Some memories <br />
          <span className="italic font-normal text-[#C5A46E]">deserve forever.</span>
        </motion.h1>

        {/* Editorial Spacing & Warm Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-8 text-lg sm:text-xl text-[#E6E4DF]/80 font-light max-w-2xl leading-relaxed tracking-wide"
        >
          A digital sanctuary designed to preserve the emotional essence, the voice waves, and the undocumented quiet moments of your family history. Far beyond raw data—a space designed for human legacy.
        </motion.p>

        {/* Elegant CTA Interaction Layer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
        >
          <button
            onClick={() => {
              playInteraction('deep');
              onExplore();
            }}
            onMouseEnter={() => playInteraction('hover')}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-[#F3EFEA] text-[#0B0C0E] rounded-full font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#C5A46E] hover:text-[#F3EFEA] shadow-xl"
          >
            <span>Explore the Living Archive</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => {
              playInteraction('select');
              onEnterSanctum();
            }}
            onMouseEnter={() => playInteraction('hover')}
            className="group flex items-center justify-center gap-3 px-8 py-4 premium-glass rounded-full text-[#E6E4DF] hover:text-[#F3EFEA] font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:border-[#C5A46E]/40"
          >
            <Compass className="w-4 h-4 text-[#C5A46E]" />
            <span>Enter Personal Sanctum</span>
          </button>
        </motion.div>

      </div>

      {/* Interactive Cinematic Scene Controller (Footer of Hero) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#E6E4DF]/10"
      >
        <div className="flex flex-col justify-between">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#8E9299]">
            // Atmospheric Focus
          </span>
          <div className="mt-2 flex items-center gap-2">
            {ambientBackgrounds.map((bg, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playInteraction('whisper');
                  setActiveBackgroundIndex(idx);
                }}
                onMouseEnter={() => playInteraction('hover')}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeBackgroundIndex === idx 
                    ? 'w-12 bg-[#C5A46E]' 
                    : 'w-4 bg-[#8E9299]/30 hover:bg-[#8E9299]/60'
                }`}
                title={`Scene: ${bg.title}`}
              />
            ))}
          </div>
          <p className="mt-2 text-xs font-medium text-[#E6E4DF] tracking-wide line-clamp-1">
            {currentBg.title} ({currentBg.era})
          </p>
        </div>

        <div className="md:col-span-2 flex items-center justify-between gap-4 bg-[#14171D]/40 px-4 py-3 rounded-lg border border-[#E6E4DF]/05">
          <div className="flex items-start gap-3">
            <Eye className="w-4 h-4 text-[#C5A46E] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-serif italic text-[#E6E4DF]/90 tracking-wide">
                "{currentBg.quote}"
              </p>
              <span className="text-[10px] font-mono text-[#8E9299] block mt-0.5">
                Cinematic memory index • Click focal bars to transition scenes
              </span>
            </div>
          </div>
        </div>

      </motion.div>

    </section>
  );
};
