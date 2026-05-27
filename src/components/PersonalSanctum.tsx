import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Archive, Brain, Crown, Fingerprint, Lock, Plus, Search, ShieldAlert, ShieldCheck, Sparkles, Users, Wand2 } from 'lucide-react';
import { Memory, EmotionType } from '../types';
import { useSound } from './SoundDesign';
import {
  AMBIENT_MEMORY_CUES,
  AUTHENTICITY_CHECKS,
  CULTURAL_PRESERVATION_ITEMS,
  DIGITAL_HEIRS,
  FAMILY_CONTRIBUTIONS,
  GRIEF_SUPPORT_PROFILES,
  LEGACY_PRESERVATION_SCORE,
  LIFE_INSIGHTS,
  LIFE_PHASE_CHAPTERS,
  MEMORY_RECOVERY_ACTIONS,
  OFFLINE_VAULT_OPTIONS,
  PRIVATE_MEMORY_MODES,
} from '../data/mockData';

interface PersonalSanctumProps {
  memories: Memory[];
  onAddMemory: (newMemory: Memory) => void;
  onSelectMemory: (memory: Memory) => void;
  onOpenChat: () => void;
}

export const PersonalSanctum: React.FC<PersonalSanctumProps> = ({
  memories,
  onAddMemory,
  onSelectMemory,
  onOpenChat,
}) => {
  const { playInteraction } = useSound();
  const [activePhaseId, setActivePhaseId] = useState(LIFE_PHASE_CHAPTERS[0].id);
  const activePhase = LIFE_PHASE_CHAPTERS.find((phase) => phase.id === activePhaseId) || LIFE_PHASE_CHAPTERS[0];

  // Adaptive Theme State
  const [sanctumTheme, setSanctumTheme] = useState<'obsidian' | 'ivory' | 'sepia' | 'midnight'>('obsidian');

  // New Memory creation state
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newNarrative, setNewNarrative] = useState('');
  const [newCategory, setNewCategory] = useState<'polaroid' | 'letter' | 'audio-reel' | 'artifact'>('polaroid');
  const [newEmotion, setNewEmotion] = useState<EmotionType>('nostalgia');
  const [newEra, setNewEra] = useState('1980s');

  const [isConfirming, setIsConfirming] = useState(false);
  const [pendingMemory, setPendingMemory] = useState<Memory | null>(null);
  const [heirSearchTerm, setHeirSearchTerm] = useState('');

  // Animation for Legacy Score bars
  const legacyScoreRef = useRef(null);
  const isInView = useInView(legacyScoreRef, { once: true, amount: 0.5 });

  // Premium ambient themes mapping
  const themeStyles = {
    obsidian: {
      bg: 'bg-[#0B0C0E]',
      text: 'text-[#E6E4DF]',
      accent: 'text-[#C5A46E]',
      border: 'border-[#E6E4DF]/10',
      card: 'bg-[#14171D]/60',
    },
    ivory: {
      bg: 'bg-[#F3EFEA]',
      text: 'text-[#0B0C0E]',
      accent: 'text-[#2D6A68]',
      border: 'border-[#0B0C0E]/10',
      card: 'bg-[#E6E4DF]/60',
    },
    sepia: {
      bg: 'bg-[#211B15]',
      text: 'text-[#E5DC CF]',
      accent: 'text-[#E2843B]',
      border: 'border-[#E5DCCF]/10',
      card: 'bg-[#2E251D]/60',
    },
    midnight: {
      bg: 'bg-[#0A1118]',
      text: 'text-[#D0D9E0]',
      accent: 'text-[#D98880]',
      border: 'border-[#D0D9E0]/10',
      card: 'bg-[#101A24]/60',
    },
  };

  const currentStyle = themeStyles[sanctumTheme];

  const handleCreateMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newNarrative.trim()) return;

    const created: Memory = {
      id: `mem-${Date.now()}`,
      title: newTitle,
      subtitle: newSubtitle || 'Preserved from personal accounts.',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      era: newEra,
      location: 'Personal Custodian Archive',
      category: newCategory,
      // Provide beautiful random stock image mapping
      imageUrl: newCategory === 'polaroid' 
        ? 'https://images.pexels.com/photos/6565249/pexels-photo-6565249.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        : newCategory === 'letter'
        ? 'https://images.pexels.com/photos/6041623/pexels-photo-6041623.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
        : 'https://images.pexels.com/photos/33362148/pexels-photo-33362148.png?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      narrative: newNarrative,
      emotion: newEmotion,
      emotionalResonance: Math.floor(Math.random() * 15) + 85,
      author: 'You (The Custodian)',
      relation: 'Current Generation',
      tags: ['Personal Sanctum', newEmotion, newEra],
    };

    setPendingMemory(created);
    setIsConfirming(true);
    playInteraction('alert');
  };

  const executeCreateMemory = () => {
    if (!pendingMemory) return;

    playInteraction('confirm');
    onAddMemory(pendingMemory);
    
    // Reset form
    setNewTitle('');
    setNewSubtitle('');
    setNewNarrative('');
    setIsAdding(false);
    setIsConfirming(false);
    setPendingMemory(null);
  };

  const cancelCreateMemory = () => {
    playInteraction('transition');
    setIsConfirming(false);
    setPendingMemory(null);
  };

  const filteredHeirs = DIGITAL_HEIRS.filter(
    (heir) =>
      heir.name.toLowerCase().includes(heirSearchTerm.toLowerCase()) ||
      heir.relation.toLowerCase().includes(heirSearchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${currentStyle.bg} ${currentStyle.text} pt-32 pb-24`}>
      <AnimatePresence>
        {isConfirming && pendingMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={cancelCreateMemory}
              className="fixed inset-0 bg-[#0B0C0E]/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`relative z-10 max-w-md w-full p-8 rounded-xl border ${currentStyle.border} ${currentStyle.card}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full bg-current/5 border ${currentStyle.border}`}>
                  <ShieldAlert className={`w-6 h-6 ${currentStyle.accent}`} />
                </div>
                <div>
                  <h3 className="font-cinematic text-2xl font-light">Confirm Preservation</h3>
                  <p className="text-sm opacity-75 mt-2 font-light">
                    You are about to etch a new memory fragment into the Sanctuary. This action is permanent and will become part of the living archive.
                  </p>
                  <div className={`mt-4 p-3 rounded-lg bg-current/5 border ${currentStyle.border} text-xs opacity-80`}>
                    <p><strong>Title:</strong> {pendingMemory.title}</p>
                    <p><strong>Emotion:</strong> {pendingMemory.emotion}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={cancelCreateMemory}
                  className="px-4 py-2 rounded-lg text-xs tracking-wider uppercase opacity-70 hover:opacity-100 transition-opacity"
                >
                  Cancel
                </button>
                <button
                  onClick={executeCreateMemory}
                  className={`px-5 py-2 rounded-lg text-xs tracking-wider uppercase font-medium bg-[#C5A46E] text-[#0B0C0E] hover:bg-[#C5A46E]/80 transition-colors`}
                >
                  Preserve Fragment
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Upper Dashboard Narrative Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-12 border-b border-current/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase">
              <span className={currentStyle.accent}>// Welcome back, Custodian</span>
              <span>•</span>
              <span className="opacity-60">Atmosphere: Deep Intimacy</span>
            </div>
            <h1 className="font-cinematic text-4xl md:text-6xl font-light mt-2 tracking-tight">
              Your Personal Sanctum
            </h1>
            <p className="text-sm md:text-base opacity-75 mt-2 max-w-2xl font-light">
              This space mirrors your active memory lineage. Configure your emotional theme, log newly uncovered heritage, or interact with the intimate family intelligence.
            </p>
          </div>

          {/* Emotional Theme Switcher */}
          <div className="flex flex-col gap-2 bg-current/5 p-3 rounded-xl border border-current/10 self-start lg:self-auto">
            <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">
              Adaptive Lighting Theme
            </span>
            <div className="flex items-center gap-2">
              {(['obsidian', 'ivory', 'sepia', 'midnight'] as const).map((theme) => (
                <button
                  key={theme}
                  onClick={() => {
                    playInteraction('whisper');
                    setSanctumTheme(theme);
                  }}
                  className={`px-3 py-1 rounded text-xs tracking-wider uppercase transition-all ${
                    sanctumTheme === theme 
                      ? 'bg-current text-[#0B0C0E] font-medium' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Intelligence Layer: life chapters, preservation, recovery, heirs */}
        <div className="mt-10 grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className={`xl:col-span-2 p-6 rounded-xl border ${currentStyle.border} ${currentStyle.card}`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A46E] block">
                  // Life Phase Intelligence
                </span>
                <h2 className="font-cinematic text-2xl font-light mt-1">Emotional Chapter Summaries</h2>
              </div>
              <Brain className="w-5 h-5 opacity-60" />
            </div>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
              {LIFE_PHASE_CHAPTERS.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => {
                    playInteraction('whisper');
                    setActivePhaseId(phase.id);
                  }}
                  className={`shrink-0 px-3 py-2 rounded text-[10px] font-mono uppercase transition-colors ${
                    activePhase.id === phase.id
                      ? 'bg-[#C5A46E] text-[#0B0C0E]'
                      : 'bg-current/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  {phase.phase}
                </button>
              ))}
            </div>

            <motion.div
              key={activePhase.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 group"
            >
              <div className="md:col-span-2 rounded-lg bg-current/5 border border-current/10 p-4 group-hover:bg-current/10 transition-colors">
                <span className="text-[10px] font-mono opacity-60 uppercase">{activePhase.years}</span>
                <h3 className="font-cinematic text-3xl font-light mt-1">{activePhase.title}</h3>
                <p className="text-xs opacity-75 mt-2 leading-relaxed font-light">{activePhase.summary}</p>
              </div>
              <div className="rounded-lg bg-current/5 border border-current/10 p-4 group-hover:bg-current/10 transition-colors group-hover:-translate-y-1">
                <span className="text-[10px] font-mono uppercase opacity-60 block">Signature</span>
                <p className="text-xs mt-1 leading-relaxed">{activePhase.emotionalSignature}</p>
                <div className="mt-4 h-1.5 rounded-full bg-current/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${activePhase.resonance}%` }}
                    transition={{ duration: 0.7 }}
                    className="h-full bg-[#C5A46E]"
                  />
                </div>
                <span className="text-[10px] font-mono text-[#C5A46E] uppercase mt-2 block">
                  {activePhase.dominantEmotion} / {activePhase.resonance}%
                </span>
              </div>
            </motion.div>
          </div>

          <div ref={legacyScoreRef} className={`p-6 rounded-xl border ${currentStyle.border} ${currentStyle.card}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A46E]">
                // Legacy Score
              </span>
              <ShieldCheck className="w-5 h-5 opacity-60" />
            </div>
            <p className="font-cinematic text-5xl font-light mt-4">{LEGACY_PRESERVATION_SCORE.overall}</p>
            <p className="text-xs opacity-70 mt-1">Archive health, emotional depth, and transfer readiness.</p>
            <div className="mt-5 space-y-2">
              {[
                ['Completeness', LEGACY_PRESERVATION_SCORE.archiveCompleteness],
                ['Richness', LEGACY_PRESERVATION_SCORE.emotionalRichness],
                ['Generations', LEGACY_PRESERVATION_SCORE.generationCoverage],
                ['Diversity', LEGACY_PRESERVATION_SCORE.memoryDiversity],
                ['Voice Quality', LEGACY_PRESERVATION_SCORE.voicePreservation],
              ].map(([label, value], index) => (
                <div key={label as string}>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase">
                    <span className="opacity-60">{label}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="mt-1 h-1 bg-current/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#C5A46E]"
                      initial={{ width: '0%' }}
                      animate={{ width: isInView ? `${value}%` : '0%' }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-6 rounded-xl border ${currentStyle.border} ${currentStyle.card}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A46E]">
                // Digital Heirs
              </span>
              <Crown className="w-5 h-5 opacity-60" />
            </div>
            <div className="relative mt-4">
              <input
                type="text"
                placeholder="Search heirs by name or relation..."
                value={heirSearchTerm}
                onChange={(e) => setHeirSearchTerm(e.target.value)}
                className={`w-full bg-current/5 border ${currentStyle.border} rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-current/30 pl-8 transition-colors`}
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-40" />
            </div>
            <div className="mt-3 space-y-3 h-48 overflow-y-auto custom-scrollbar pr-1">
              <AnimatePresence>
                {filteredHeirs.map((heir) => (
                  <motion.div
                    key={heir.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="rounded-lg bg-current/5 border border-current/10 p-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">{heir.name}</p>
                        <p className="text-[10px] font-mono uppercase opacity-60">{heir.relation}</p>
                      </div>
                      <span className="text-[9px] font-mono uppercase text-[#C5A46E] shrink-0">{heir.accessLevel}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-[11px] opacity-70">
                      <Lock className="w-3 h-3" />
                      <span>{heir.vault}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredHeirs.length === 0 && (
                <div className="flex items-center justify-center h-full text-center"><p className="text-xs opacity-60">No heirs found.</p></div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`p-6 rounded-xl border ${currentStyle.border} ${currentStyle.card}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A46E]">
                // Memory Recovery AI
              </span>
              <Wand2 className="w-5 h-5 opacity-60" />
            </div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MEMORY_RECOVERY_ACTIONS.map((action) => (
                <div key={action.id} className="rounded-lg bg-current/5 border border-current/10 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-medium leading-tight">{action.label}</span>
                    <span className="text-[9px] font-mono uppercase text-[#C5A46E]">{action.status}</span>
                  </div>
                  <p className="text-[11px] opacity-70 leading-relaxed mt-2">{action.description}</p>
                  <div className="mt-3 h-1.5 bg-current/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2D6A68]" style={{ width: `${action.confidence}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative p-6 rounded-xl border ${currentStyle.border} ${currentStyle.card} overflow-hidden group`}>
            <div className={`absolute inset-0 ${currentStyle.accent} bg-current opacity-5 blur-2xl transition-opacity duration-500 group-hover:opacity-10`} />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A46E]">
                  // AI Life Insights
                </span>
                <Brain className="w-5 h-5 opacity-60" />
              </div>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {LIFE_INSIGHTS.map((insight) => (
                  <div key={insight.id} className={`rounded-lg bg-current/5 border ${currentStyle.border} p-4 transition-all hover:bg-current/10 hover:border-current/20`}>
                    <span className="text-[10px] font-mono uppercase opacity-60">{insight.label}</span>
                    <p className={`font-cinematic text-2xl font-light mt-1 ${currentStyle.accent}`}>{insight.value}</p>
                    <p className="text-xs opacity-75 leading-relaxed mt-2 font-light">{insight.reflection}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust, privacy, and cultural stewardship */}
        <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className={`p-6 rounded-xl border ${currentStyle.border} ${currentStyle.card}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A46E]">
                // Private Memory Modes
              </span>
              <Fingerprint className="w-5 h-5 opacity-60" />
            </div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRIVATE_MEMORY_MODES.map((mode) => (
                <div key={mode.id} className="rounded-lg bg-current/5 border border-current/10 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-medium">{mode.label}</span>
                    <span className="text-[10px] font-mono text-[#C5A46E]">{mode.protectedCount}</span>
                  </div>
                  <p className="text-[11px] opacity-70 leading-relaxed mt-2">{mode.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-6 rounded-xl border ${currentStyle.border} ${currentStyle.card}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A46E]">
                // Grief Support Mode
              </span>
              <ShieldAlert className="w-5 h-5 opacity-60" />
            </div>
            <div className="mt-5 space-y-3">
              {GRIEF_SUPPORT_PROFILES.map((profile) => (
                <div key={profile.person} className="rounded-lg bg-current/5 border border-current/10 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{profile.person}</p>
                      <p className="text-[10px] font-mono uppercase opacity-60">{profile.remembranceSpace}</p>
                    </div>
                    <span className="text-[9px] font-mono uppercase text-[#C5A46E]">{profile.status}</span>
                  </div>
                  <p className="text-[11px] opacity-70 mt-2">{profile.tone}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-6 rounded-xl border ${currentStyle.border} ${currentStyle.card}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A46E]">
                // Ambient Intelligence
              </span>
              <Sparkles className="w-5 h-5 opacity-60" />
            </div>
            <div className="mt-5 space-y-3">
              {AMBIENT_MEMORY_CUES.map((cue) => (
                <div key={cue.id} className="rounded-lg bg-current/5 border border-current/10 p-4">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase">
                    <span className="text-[#C5A46E]">{cue.date}</span>
                    <span className="opacity-60">{cue.sensitivity}</span>
                  </div>
                  <p className="text-sm font-medium mt-1">{cue.label}</p>
                  <p className="text-[11px] opacity-70 leading-relaxed mt-1">{cue.reflection}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className={`xl:col-span-2 p-6 rounded-xl border ${currentStyle.border} ${currentStyle.card}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A46E]">
                // Family Collaboration Memories
              </span>
              <Users className="w-5 h-5 opacity-60" />
            </div>
            <div className="mt-5 space-y-3">
              {FAMILY_CONTRIBUTIONS.map((contribution) => (
                <div key={contribution.id} className="rounded-lg bg-current/5 border border-current/10 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{contribution.contributor}</p>
                      <p className="text-[10px] font-mono uppercase opacity-60">
                        {contribution.relation} / {contribution.type}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-[#C5A46E]">{contribution.memory}</span>
                  </div>
                  <p className="text-[11px] opacity-75 leading-relaxed mt-2">{contribution.contribution}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-6 rounded-xl border ${currentStyle.border} ${currentStyle.card}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A46E]">
                // Authenticity
              </span>
              <ShieldCheck className="w-5 h-5 opacity-60" />
            </div>
            <div className="mt-5 space-y-3">
              {AUTHENTICITY_CHECKS.map((check) => (
                <div key={check.id} className="rounded-lg bg-current/5 border border-current/10 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-medium leading-tight">{check.artifact}</span>
                    <span className="text-[9px] font-mono uppercase text-[#C5A46E]">{check.status}</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-current/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2D6A68]" style={{ width: `${check.confidence}%` }} />
                  </div>
                  <p className="text-[10px] opacity-60 mt-2">{check.signals[0]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-6 rounded-xl border ${currentStyle.border} ${currentStyle.card}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A46E]">
                // Offline Vault
              </span>
              <Archive className="w-5 h-5 opacity-60" />
            </div>
            <div className="mt-5 space-y-3">
              {OFFLINE_VAULT_OPTIONS.map((option) => (
                <div key={option.id} className="rounded-lg bg-current/5 border border-current/10 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-medium">{option.label}</span>
                    <span className="text-[9px] font-mono uppercase text-[#C5A46E]">{option.status}</span>
                  </div>
                  <p className="text-[11px] opacity-70 leading-relaxed mt-2">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-6 p-6 rounded-xl border ${currentStyle.border} ${currentStyle.card}`}>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A46E] block">
            // Cultural Preservation Layer
          </span>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {CULTURAL_PRESERVATION_ITEMS.map((item) => (
              <div key={item.id} className="rounded-lg bg-current/5 border border-current/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-mono uppercase text-[#C5A46E]">{item.category}</span>
                  <span className="text-[10px] font-mono opacity-60">{item.steward}</span>
                </div>
                <p className="font-cinematic text-xl font-light mt-2">{item.title}</p>
                <p className="text-[11px] opacity-70 leading-relaxed mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Interactive Matrix */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: AI Shortcut & Contribution Portal */}
          <div className="space-y-8">
            
            {/* Floating AI Assistant Shortcut */}
            <div className={`p-8 rounded-xl border ${currentStyle.border} ${currentStyle.card} relative overflow-hidden group`}>
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles className="w-24 h-24" />
              </div>
              
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A46E] block mb-1">
                // Intimate Presence
              </span>
              <h3 className="font-cinematic text-2xl font-light">Twidix Intelligence</h3>
              
              <p className="text-xs opacity-80 mt-3 leading-relaxed font-light">
                "I have finished cross-referencing Clara's 1956 Bremerhaven steamship logs with Julian's architectural elevations. A profound emotional parallel exists."
              </p>

              <button
                onClick={() => {
                  playInteraction('select');
                  onOpenChat();
                }}
                className="mt-6 w-full py-2.5 bg-current text-[#0B0C0E] rounded-lg font-medium text-xs tracking-wider uppercase transition-transform hover:scale-[1.02]"
              >
                Converse with Archives
              </button>
            </div>

            {/* Contribution Portal */}
            <div className={`p-8 rounded-xl border ${currentStyle.border} ${currentStyle.card}`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-60 block">
                    // Heritage Insertion
                  </span>
                  <h3 className="font-cinematic text-xl font-light mt-1">Preserve a Fragment</h3>
                </div>
                <button
                  onClick={() => {
                    playInteraction('hover');
                    setIsAdding(!isAdding);
                  }}
                  className={`p-2 rounded-full border ${currentStyle.border} transition-transform ${isAdding ? 'rotate-45' : ''}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {isAdding ? (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 space-y-4 pt-4 border-t border-current/10"
                  onSubmit={handleCreateMemory}
                >
                  <div>
                    <label className="block text-[10px] font-mono uppercase opacity-70 mb-1">Memory Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. The Winter Solstice Ledger"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-current/5 border border-current/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-current/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase opacity-70 mb-1">Poetic Subtitle</label>
                    <input
                      type="text"
                      placeholder="e.g. Bound in thick cotton and quiet winter hours."
                      value={newSubtitle}
                      onChange={(e) => setNewSubtitle(e.target.value)}
                      className="w-full bg-current/5 border border-current/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-current/30"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase opacity-70 mb-1">Format</label>
                      <select
                        value={newCategory}
                        onChange={(e: unknown) => setNewCategory((e as React.ChangeEvent<HTMLSelectElement>).target.value as 'polaroid' | 'letter' | 'audio-reel' | 'artifact')}
                        className="w-full bg-current/5 border border-current/10 rounded px-2 py-1.5 text-xs focus:outline-none"
                      >
                        <option value="polaroid" className="bg-[#0B0C0E] text-[#E6E4DF]">Polaroid</option>
                        <option value="letter" className="bg-[#0B0C0E] text-[#E6E4DF]">Letter</option>
                        <option value="audio-reel" className="bg-[#0B0C0E] text-[#E6E4DF]">Audio Reel</option>
                        <option value="artifact" className="bg-[#0B0C0E] text-[#E6E4DF]">Physical Object</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase opacity-70 mb-1">Primary Resonance</label>
                      <select
                        value={newEmotion}
                        onChange={(e: unknown) => setNewEmotion((e as React.ChangeEvent<HTMLSelectElement>).target.value as EmotionType)}
                        className="w-full bg-current/5 border border-current/10 rounded px-2 py-1.5 text-xs focus:outline-none"
                      >
                        <option value="nostalgia" className="bg-[#0B0C0E] text-[#E6E4DF]">Nostalgia</option>
                        <option value="intimacy" className="bg-[#0B0C0E] text-[#E6E4DF]">Intimacy</option>
                        <option value="legacy" className="bg-[#0B0C0E] text-[#E6E4DF]">Legacy</option>
                        <option value="warmth" className="bg-[#0B0C0E] text-[#E6E4DF]">Warmth</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase opacity-70 mb-1">Era</label>
                    <input
                      type="text"
                      placeholder="e.g. Late 1960s"
                      value={newEra}
                      onChange={(e) => setNewEra(e.target.value)}
                      className="w-full bg-current/5 border border-current/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-current/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase opacity-70 mb-1">Core Narrative</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe the atmosphere, the ambient lighting, the specific grain of the memory..."
                      value={newNarrative}
                      onChange={(e) => setNewNarrative(e.target.value)}
                      className="w-full bg-current/5 border border-current/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-current/30"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-[#C5A46E] text-[#0B0C0E] font-medium text-xs tracking-wider uppercase rounded hover:bg-[#C5A46E]/80 transition-colors"
                  >
                    Etch into Sanctuary
                  </button>
                </motion.form>
              ) : (
                <p className="text-xs opacity-60 mt-2 font-light">
                  Click the plus icon to safely immortalize physical accounts, scanned letters, or audio files into the continuous chain.
                </p>
              )}
            </div>

            {/* Quick stats vignette */}
            <div className={`p-6 rounded-xl border ${currentStyle.border} flex items-center justify-between`}>
              <div>
                <span className="text-[10px] font-mono uppercase opacity-60 block">Sanctuary Depth</span>
                <span className="font-cinematic text-2xl">{memories.length} Artifacts</span>
              </div>
              <div className="h-8 w-px bg-current/10" />
              <div>
                <span className="text-[10px] font-mono uppercase opacity-60 block">Lineage Nodes</span>
                <span className="font-cinematic text-2xl">8 Custodians</span>
              </div>
            </div>

          </div>

          {/* Right Columns: The Emotional Timeline River */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="flex items-center justify-between">
              <h3 className="font-cinematic text-2xl font-light">Emotional Timeline River</h3>
              <span className="text-xs font-mono opacity-60">Continuous Flow</span>
            </div>

            {/* Horizontal Flow River */}
            <div className="relative">
              
              {/* Fade masks */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-current/5 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-current/5 to-transparent z-10 pointer-events-none" />

              <div className="flex gap-6 overflow-x-auto pb-6 pt-2 custom-scrollbar">
                {memories.map((mem) => (
                  <div
                    key={mem.id}
                    onClick={() => {
                      playInteraction('deep');
                      onSelectMemory(mem);
                    }}
                    className={`shrink-0 w-72 md:w-80 rounded-lg border ${currentStyle.border} ${currentStyle.card} overflow-hidden cursor-pointer group hover:-translate-y-1 transition-all duration-300`}
                  >
                    <div className="relative aspect-video overflow-hidden bg-[#0B0C0E]">
                      <img
                        src={mem.imageUrl}
                        alt={mem.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#0B0C0E]/80 text-[9px] font-mono text-[#C5A46E] uppercase">
                        {mem.emotion}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between text-[10px] font-mono opacity-60">
                        <span>{mem.era}</span>
                        <span>{mem.location}</span>
                      </div>
                      
                      <h4 className="font-cinematic text-lg mt-1 group-hover:text-[#C5A46E] transition-colors line-clamp-1">
                        {mem.title}
                      </h4>
                      
                      <p className="text-xs opacity-75 mt-1 line-clamp-2 font-light">
                        {mem.subtitle}
                      </p>

                      <div className="mt-4 pt-3 border-t border-current/10 flex items-center justify-between text-[10px] font-mono">
                        <span className="opacity-60">By {mem.author}</span>
                        <span className="text-[#C5A46E]">Resonance {mem.emotionalResonance}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cinematic Ambient Quote Vignettes */}
            <div className={`p-8 rounded-xl border ${currentStyle.border} ${currentStyle.card} mt-12`}>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A46E] block mb-2">
                // Psychological Framing
              </span>
              <p className="font-cinematic text-xl md:text-2xl font-light italic leading-relaxed">
                "We carry nothing but our names and the rhythm of our mother tongue."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-6 h-px bg-[#C5A46E]" />
                <span className="text-xs font-mono uppercase tracking-wider opacity-60">
                  Clara Mendel, May 11, 1956
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
