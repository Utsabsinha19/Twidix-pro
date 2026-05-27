import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Heart, Disc, Tag, User, Wand2 } from 'lucide-react';
import { EmotionType, Memory } from '../types';
import { useSound } from './SoundDesign';
import { MEMORY_RECOVERY_ACTIONS } from '../data/mockData';

interface MemoryDetailModalProps {
  memory: Memory | null;
  onClose: () => void;
}

const modalMoodStyles: Record<EmotionType, { accent: string; glow: string; transition: number; description: string }> = {
  nostalgia: { accent: '#C5A46E', glow: 'rgba(197, 164, 110, 0.18)', transition: 0.65, description: 'warm nostalgic restoration' },
  warmth: { accent: '#E2843B', glow: 'rgba(226, 132, 59, 0.14)', transition: 0.55, description: 'soft familial warmth' },
  intimacy: { accent: '#D98880', glow: 'rgba(217, 136, 128, 0.15)', transition: 0.75, description: 'quiet intimate pacing' },
  legacy: { accent: '#2D6A68', glow: 'rgba(45, 106, 104, 0.16)', transition: 0.8, description: 'steady inheritance cadence' },
  wonder: { accent: '#7FA6C7', glow: 'rgba(127, 166, 199, 0.13)', transition: 0.45, description: 'curious exploratory motion' },
  solitude: { accent: '#6F8FAF', glow: 'rgba(111, 143, 175, 0.12)', transition: 0.9, description: 'softened solitary pacing' },
  joy: { accent: '#F2C14E', glow: 'rgba(242, 193, 78, 0.18)', transition: 0.35, description: 'brighter celebratory motion' },
};

export const MemoryDetailModal: React.FC<MemoryDetailModalProps> = ({ memory, onClose }) => {
  const { playInteraction } = useSound();

  if (!memory) return null;
  const mood = modalMoodStyles[memory.emotion];
  const recoveryActions = MEMORY_RECOVERY_ACTIONS.filter((action) =>
    memory.category === 'polaroid' || memory.category === 'letter'
      ? action.target === 'photo' || action.target === 'timeline'
      : memory.category === 'audio-reel'
      ? action.target === 'audio' || action.target === 'video'
      : memory.category === 'cinematic'
      ? action.target === 'video' || action.target === 'audio'
      : action.target === 'timeline'
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        
        {/* Deep immersive cinematic backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => {
            playInteraction('hover');
            onClose();
          }}
          className="fixed inset-0 bg-[#0B0C0E]/90 backdrop-blur-xl"
        />

        <motion.div
          className="fixed inset-x-10 top-20 h-72 rounded-full blur-3xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, backgroundColor: mood.glow }}
          exit={{ opacity: 0 }}
          transition={{ duration: mood.transition }}
        />

        {/* Modal Container - Premium editorial feel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: mood.transition, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#14171D] border border-[#E6E4DF]/10 rounded-xl overflow-hidden shadow-2xl z-10 my-auto"
          style={{ boxShadow: `0 24px 90px ${mood.glow}` }}
        >
          {/* Close trigger */}
          <button
            onClick={() => {
              playInteraction('hover');
              onClose();
            }}
            className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-[#0B0C0E]/60 text-[#E6E4DF]/70 hover:text-[#F3EFEA] hover:bg-[#0B0C0E] transition-all duration-300 border border-[#E6E4DF]/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Visual Media Section */}
            <div className="relative aspect-square lg:aspect-auto lg:h-full bg-[#0B0C0E] overflow-hidden group">
              <img
                src={memory.imageUrl}
                alt={memory.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Subtle film grain layer specifically for image immersion */}
              <div className="absolute inset-0 bg-[#C5A46E]/05 mix-blend-overlay pointer-events-none" />
              
              {/* Category indicator badge */}
              <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-[#0B0C0E]/80 backdrop-blur-md border border-[#E6E4DF]/10">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A46E]">
                  {memory.category}
                </span>
              </div>

              <div className="absolute top-6 right-20 px-3 py-1 rounded-full bg-[#0B0C0E]/80 backdrop-blur-md border border-[#E6E4DF]/10">
                <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: mood.accent }}>
                  {mood.description}
                </span>
              </div>

              {/* Simulated Audio playback overlay if audio-reel */}
              {memory.audioDuration && (
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-[#0B0C0E]/85 backdrop-blur-md border border-[#E6E4DF]/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Disc className="w-5 h-5 text-[#C5A46E] animate-spin" style={{ animationDuration: '8s' }} />
                    <div>
                      <p className="text-xs font-medium text-[#F3EFEA]">Original Tape Frequency</p>
                      <p className="text-[10px] text-[#8E9299] font-mono">Duration: {memory.audioDuration}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => playInteraction('whisper')}
                    className="px-3 py-1 bg-[#C5A46E] hover:bg-[#C5A46E]/80 text-[#0B0C0E] text-xs font-medium rounded transition-colors"
                  >
                    Listen
                  </button>
                </div>
              )}
            </div>

            {/* Editorial Content & Metadata Section */}
            <div className="p-8 md:p-12 flex flex-col justify-between max-h-[85vh] overflow-y-auto custom-scrollbar">
              
              <div>
                {/* Meta header */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8E9299] pb-4 border-b border-[#E6E4DF]/05">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A46E]" />
                    <span>{memory.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A46E]" />
                    <span>{memory.location}</span>
                  </div>
                </div>

                {/* Main Titles */}
                <h2 className="font-cinematic text-3xl md:text-4xl font-light text-[#F3EFEA] mt-6 tracking-tight">
                  {memory.title}
                </h2>
                <p className="text-sm font-serif italic text-[#C5A46E] mt-2">
                  "{memory.subtitle}"
                </p>

                {/* Narrative core */}
                <div className="mt-8 prose prose-invert">
                  <p className="text-sm md:text-base text-[#E6E4DF]/90 font-light leading-relaxed tracking-wide whitespace-pre-line">
                    {memory.narrative}
                  </p>
                </div>

                {/* Psychological stats matrix */}
                <div className="mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-[#E6E4DF]/05">
                  <div>
                    <span className="text-[10px] font-mono text-[#8E9299] uppercase block tracking-wider">
                      Emotional Resonance
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-light font-cinematic text-[#F3EFEA]">
                        {memory.emotionalResonance}%
                      </span>
                      <span className="text-[10px] font-mono text-[#C5A46E]">
                        {memory.emotion}
                      </span>
                    </div>
                  </div>

                  {memory.heartRateSignature && (
                    <div>
                      <span className="text-[10px] font-mono text-[#8E9299] uppercase block tracking-wider">
                        Heart Rate Signature
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <Heart className="w-4 h-4 text-[#D98880] inline shrink-0" />
                        <span className="text-2xl font-light font-cinematic text-[#F3EFEA]">
                          {memory.heartRateSignature}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Memory Recovery AI */}
                <div className="mt-8 pt-6 border-t border-[#E6E4DF]/05">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-[#8E9299] uppercase block tracking-wider">
                        Memory Recovery AI
                      </span>
                      <p className="text-xs text-[#E6E4DF]/75 mt-1">
                        Repair options are simulated with uncertainty preserved.
                      </p>
                    </div>
                    <Wand2 className="w-4 h-4" style={{ color: mood.accent }} />
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {recoveryActions.map((action) => (
                      <div key={action.id} className="rounded-lg bg-[#0B0C0E]/45 border border-[#E6E4DF]/05 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs text-[#F3EFEA] leading-tight">{action.label}</span>
                          <span className="text-[9px] font-mono uppercase" style={{ color: mood.accent }}>
                            {action.confidence}%
                          </span>
                        </div>
                        <p className="text-[11px] text-[#8E9299] leading-relaxed mt-2">{action.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Custodian & Tags Footer */}
              <div className="mt-12 pt-6 border-t border-[#E6E4DF]/05 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs text-[#8E9299]">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    <span>Preserved by: <strong className="text-[#E6E4DF] font-normal">{memory.author}</strong></span>
                  </div>
                  <span>Relation: <strong className="text-[#E6E4DF] font-normal">{memory.relation}</strong></span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <Tag className="w-3 h-3 text-[#8E9299] mr-1" />
                  {memory.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-[#25282E] text-[10px] font-mono text-[#E6E4DF]/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
