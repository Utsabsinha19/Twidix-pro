import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Layers, Clock, Heart } from 'lucide-react';
import { Memory, EmotionType } from '../types';
import { useSound } from './SoundDesign';
import { INITIAL_MEMORIES } from '../data/mockData';

interface LivingArchiveProps {
  onSelectMemory: (memory: Memory) => void;
}

const moodStyles: Record<EmotionType | 'all', { accent: string; glow: string; motion: number; label: string }> = {
  all: { accent: '#C5A46E', glow: 'rgba(197, 164, 110, 0.08)', motion: -8, label: 'Balanced archive light' },
  nostalgia: { accent: '#C5A46E', glow: 'rgba(197, 164, 110, 0.14)', motion: -5, label: 'Warm nostalgic tones' },
  warmth: { accent: '#E2843B', glow: 'rgba(226, 132, 59, 0.12)', motion: -6, label: 'Soft domestic warmth' },
  intimacy: { accent: '#D98880', glow: 'rgba(217, 136, 128, 0.12)', motion: -4, label: 'Gentle intimate motion' },
  legacy: { accent: '#2D6A68', glow: 'rgba(45, 106, 104, 0.12)', motion: -3, label: 'Steady legacy cadence' },
  wonder: { accent: '#7FA6C7', glow: 'rgba(127, 166, 199, 0.12)', motion: -10, label: 'Curious exploratory lift' },
  solitude: { accent: '#6F8FAF', glow: 'rgba(111, 143, 175, 0.1)', motion: -2, label: 'Quiet softened motion' },
  joy: { accent: '#F2C14E', glow: 'rgba(242, 193, 78, 0.16)', motion: -12, label: 'Celebratory kinetic lift' },
};

export const LivingArchive: React.FC<LivingArchiveProps> = ({ onSelectMemory }) => {
  const { playInteraction } = useSound();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'asymmetrical' | 'chronological'>('asymmetrical');
  const activeMood = moodStyles[selectedEmotion];

  const emotions: { id: EmotionType | 'all'; label: string }[] = [
    { id: 'all', label: 'All Spectrum' },
    { id: 'nostalgia', label: 'Nostalgia' },
    { id: 'intimacy', label: 'Intimacy' },
    { id: 'legacy', label: 'Legacy' },
    { id: 'warmth', label: 'Warmth' },
    { id: 'wonder', label: 'Wonder' },
  ];

  const categories = [
    { id: 'all', label: 'All Artifacts' },
    { id: 'polaroid', label: 'Polaroids' },
    { id: 'cinematic', label: 'Cinematic' },
    { id: 'letter', label: 'Letters' },
    { id: 'audio-reel', label: 'Audio Reels' },
    { id: 'artifact', label: 'Objects' },
  ];

  // Filter logic
  const filteredMemories = INITIAL_MEMORIES.filter((mem) => {
    const matchesSearch = 
      mem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mem.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mem.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mem.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesEmotion = selectedEmotion === 'all' || mem.emotion === selectedEmotion;
    const matchesCategory = selectedCategory === 'all' || mem.category === selectedCategory;

    return matchesSearch && matchesEmotion && matchesCategory;
  });

  return (
    <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative">
      <motion.div
        className="absolute inset-x-6 top-24 h-72 rounded-full blur-3xl pointer-events-none"
        animate={{ backgroundColor: activeMood.glow }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Header framing */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E6E4DF]/10">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#C5A46E] uppercase block mb-2">
            // Preserved Fragments
          </span>
          <h1 className="font-cinematic text-4xl md:text-6xl font-light text-[#F3EFEA] tracking-tight">
            The Living Archive
          </h1>
          <p className="text-sm md:text-base text-[#8E9299] mt-2 max-w-xl font-light">
            Tactile glimpses into unrepeatable moments. Hover to examine physical grain, click to step inside the complete historical memory space.
          </p>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-[#14171D] p-1.5 rounded-lg border border-[#E6E4DF]/05">
          <button
            onClick={() => {
              playInteraction('hover');
              setViewMode('asymmetrical');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs tracking-wider uppercase transition-colors ${
              viewMode === 'asymmetrical' 
                ? 'bg-[#25282E] text-[#F3EFEA]' 
                : 'text-[#8E9299] hover:text-[#E6E4DF]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Editorial Gallery</span>
          </button>
          <button
            onClick={() => {
              playInteraction('hover');
              setViewMode('chronological');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs tracking-wider uppercase transition-colors ${
              viewMode === 'chronological' 
                ? 'bg-[#25282E] text-[#F3EFEA]' 
                : 'text-[#8E9299] hover:text-[#E6E4DF]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Chronological</span>
          </button>
        </div>
      </div>

      {/* Controls & Emotional filters */}
      <div className="mt-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        
        {/* Subtle Input search */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9299]" />
          <input
            type="text"
            placeholder="Search moments, locations, notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#14171D] text-sm text-[#F3EFEA] placeholder-[#8E9299]/60 pl-10 pr-4 py-2.5 rounded-lg border border-[#E6E4DF]/10 focus:outline-none focus:border-[#C5A46E]/50 transition-colors"
          />
        </div>

        {/* Filters Matrix */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Category Dropdown */}
          <div className="flex items-center gap-2 bg-[#14171D] px-3 py-1.5 rounded-lg border border-[#E6E4DF]/05">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A46E]" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                playInteraction('whisper');
                setSelectedCategory(e.target.value);
              }}
              className="bg-transparent text-xs text-[#E6E4DF] uppercase tracking-wider focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-[#0B0C0E] text-[#E6E4DF]">
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Emotion Spectrum Pills */}
          <div className="flex flex-wrap items-center gap-1">
            {emotions.map((emo) => (
              <button
                key={emo.id}
                onClick={() => {
                  playInteraction('whisper');
                  setSelectedEmotion(emo.id);
                }}
                className={`px-3 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all duration-300 ${
                  selectedEmotion === emo.id
                    ? 'text-[#0B0C0E] font-medium'
                    : 'bg-[#14171D] text-[#8E9299] hover:text-[#E6E4DF] border border-[#E6E4DF]/05'
                }`}
                style={selectedEmotion === emo.id ? { backgroundColor: activeMood.accent } : undefined}
              >
                {emo.label}
              </button>
            ))}
          </div>

        </div>

      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-[#14171D]/70 border border-[#E6E4DF]/05 px-4 py-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E9299]">
          Emotionally Adaptive UI
        </span>
        <span className="text-[10px] font-mono uppercase" style={{ color: activeMood.accent }}>
          {activeMood.label}
        </span>
      </div>

      {/* Memory Content Visualization */}
      <div className="mt-12">
        {filteredMemories.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-cinematic text-xl text-[#8E9299]">No memory artifacts resonate with this precise configuration.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedEmotion('all');
                setSelectedCategory('all');
              }}
              className="mt-4 text-xs font-mono text-[#C5A46E] underline tracking-widest uppercase"
            >
              Reset Archive Criteria
            </button>
          </div>
        ) : viewMode === 'asymmetrical' ? (
          
          /* Asymmetrical Editorial Grid matching premium museum/Apple feel */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <AnimatePresence>
              {filteredMemories.map((memory, index) => {
                // Apply asymmetrical heights & rotations for handcrafted editorial quality
                const isTall = index % 4 === 0 || index % 4 === 3;
                const rotation = index % 3 === 0 ? '-rotate-1' : index % 3 === 1 ? 'rotate-1' : 'rotate-0';
                
                return (
                  <motion.div
                    layout
                    key={memory.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    onClick={() => {
                      playInteraction('deep');
                      onSelectMemory(memory);
                    }}
                    onMouseEnter={() => playInteraction('hover')}
                    whileHover={{ y: activeMood.motion }}
                    className={`group cursor-pointer flex flex-col ${rotation} transition-all duration-500`}
                  >
                    {/* Polaroid or classic framed image box */}
                    <div className={`relative w-full overflow-hidden rounded-sm premium-glass p-3 pb-10 shadow-2xl transition-all duration-500 group-hover:border-[#C5A46E]/30 ${
                      isTall ? 'aspect-[3/4]' : 'aspect-square'
                    }`}>
                      <div className="relative w-full h-full overflow-hidden bg-[#0B0C0E]">
                        <img
                          src={memory.imageUrl}
                          alt={memory.title}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Film filter tint */}
                        <div className="absolute inset-0 bg-[#0B0C0E]/10 group-hover:bg-transparent transition-colors duration-500" />
                        
                        {/* Subtle heart rate or audio badge */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#0B0C0E]/80 backdrop-blur-md text-[9px] font-mono tracking-widest uppercase text-[#E6E4DF]">
                            {memory.era}
                          </span>
                          {memory.heartRateSignature && (
                            <span className="px-2 py-0.5 rounded bg-[#D98880]/20 backdrop-blur-md text-[9px] font-mono text-[#D98880] flex items-center gap-1">
                              <Heart className="w-2 h-2 fill-current" />
                              {memory.heartRateSignature}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Tactile handwritten footer feel inside polaroid */}
                      <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between">
                        <span className="font-cinematic text-xs text-[#E6E4DF]/70 italic tracking-wide line-clamp-1">
                          {memory.title}
                        </span>
                        <span className="text-[9px] font-mono text-[#C5A46E] uppercase">
                          {memory.category}
                        </span>
                      </div>
                    </div>

                    {/* Exterior metadata typography */}
                    <div className="mt-4 px-1">
                      <div className="flex items-center justify-between text-xs font-mono text-[#8E9299]">
                        <span>{memory.date}</span>
                        <span>{memory.location}</span>
                      </div>
                      <h3 className="font-cinematic text-xl text-[#F3EFEA] mt-1 group-hover:text-[#C5A46E] transition-colors">
                        {memory.title}
                      </h3>
                      <p className="text-xs text-[#8E9299] font-light mt-1 line-clamp-2">
                        {memory.subtitle}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        ) : (

          /* Chronological River Mode */
          <div className="relative border-l border-[#E6E4DF]/10 ml-4 md:ml-32 pl-6 md:pl-12 space-y-16">
            <AnimatePresence>
              {filteredMemories.map((memory, index) => (
                <motion.div
                  layout
                  key={memory.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative group"
                >
                  {/* Timeline node */}
                  <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-3 h-3 rounded-full bg-[#0B0C0E] border-2 border-[#C5A46E] group-hover:bg-[#C5A46E] transition-colors" />
                  
                  {/* Era Tag on the left for large screens */}
                  <div className="hidden md:block absolute -left-32 top-0.5 w-20 text-right">
                    <span className="text-xs font-mono tracking-widest text-[#C5A46E] block">
                      {memory.era}
                    </span>
                    <span className="text-[10px] font-mono text-[#8E9299] block">
                      {memory.date.split(',')[1]?.trim() || memory.date}
                    </span>
                  </div>

                  <div 
                    onClick={() => {
                      playInteraction('deep');
                      onSelectMemory(memory);
                    }}
                    onMouseEnter={() => playInteraction('hover')}
                    style={{ borderColor: `${activeMood.accent}30` }}
                    className="cursor-pointer grid grid-cols-1 lg:grid-cols-3 gap-6 premium-glass p-6 rounded-lg transition-all duration-300 hover:bg-[#14171D]/80"
                  >
                    <div className="relative aspect-video lg:aspect-auto overflow-hidden rounded">
                      <img src={memory.imageUrl} alt={memory.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0B0C0E]/80 text-[9px] font-mono text-[#C5A46E] uppercase">
                        {memory.category}
                      </div>
                    </div>

                    <div className="lg:col-span-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-xs font-mono text-[#8E9299]">
                          <span className="md:hidden text-[#C5A46E]">{memory.era}</span>
                          <span>{memory.location}</span>
                          <span>•</span>
                          <span>Resonance: {memory.emotionalResonance}%</span>
                        </div>

                        <h3 className="font-cinematic text-2xl text-[#F3EFEA] mt-2 group-hover:text-[#C5A46E] transition-colors">
                          {memory.title}
                        </h3>

                        <p className="text-sm text-[#E6E4DF]/80 font-light mt-2 italic">
                          "{memory.subtitle}"
                        </p>

                        <p className="text-xs text-[#8E9299] mt-3 line-clamp-2 leading-relaxed">
                          {memory.narrative}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#E6E4DF]/05 flex items-center justify-between text-[11px] font-mono text-[#8E9299]">
                        <span>Preserved by {memory.author}</span>
                        <span className="text-[#C5A46E] group-hover:underline">Examine Artifact →</span>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        )}
      </div>

    </section>
  );
};
