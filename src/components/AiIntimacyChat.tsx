import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Disc, Radio, Send, Sparkles, User, Wand2 } from 'lucide-react';
import { ChatMessage, EmotionType } from '../types';
import { useSound } from './SoundDesign';
import { INITIAL_CHAT_MESSAGES } from '../data/mockData';

const buildMemoryConfidence = (
  percentage: number,
  missingContext: string[],
  reconstructedAssumptions: string[]
): ChatMessage['memoryConfidence'] => ({
  percentage,
  missingContext,
  reconstructedAssumptions,
});

const buildMemoryDecay = (
  integrity: number,
  fadedMetadata: string[],
  fragments: string[],
  restorationActions: string[]
): ChatMessage['memoryDecay'] => ({
  integrity,
  fadedMetadata,
  fragments,
  restorationActions,
});

const buildVoiceTexture = (
  emotionalTone: string,
  certainty: NonNullable<ChatMessage['voiceTexture']>['certainty'] = 'tentative'
): ChatMessage['voiceTexture'] => ({
  pausePattern: 'natural hesitation before reconstructed details',
  emotionalTone,
  certainty,
});

const buildTransparency = (
  reasoning: string,
  confidenceInputs: string[],
  influencedBy: string[]
): ChatMessage['aiTransparency'] => ({
  reasoning,
  confidenceInputs,
  influencedBy,
});

export const AiIntimacyChat: React.FC = () => {
  const { playInteraction } = useSound();

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentEmotionFocus, setCurrentEmotionFocus] = useState<EmotionType>('intimacy');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest response
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle conversational generation
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    playInteraction('whisper');

    // Synthesize personal AI response while surfacing memory uncertainty.
    setTimeout(() => {
      let aiReply = '';
      let emotionShift: EmotionType = 'intimacy';
      let memoryConfidence = buildMemoryConfidence(
        58,
        ['The prompt does not identify a single source artifact', 'No matching date stamp has been isolated yet'],
        ['Emotional resonance is inferred from nearby family ledger language']
      );
      let memoryDecay = buildMemoryDecay(
        52,
        ['Date anchors are weak', 'Speaker identities are not yet confirmed'],
        ['ledger margin notes', 'a repeated winter phrase', 'one incomplete voice contour'],
        ['restored fragment order', 'estimated emotional timeline from adjacent records']
      );
      let voiceTexture = buildVoiceTexture('quiet uncertainty with a gentle reflective cadence');
      let aiTransparency = buildTransparency(
        'Twidix found a weak emotional pattern, then avoided a firm conclusion because the query did not point to one stable artifact.',
        ['broad family ledger language', 'current emotional resonance state', 'missing date anchor'],
        ['Inheritance of the Silent Seasons', 'Family constellation proximity']
      );

      const lower = userMsg.text.toLowerCase();

      if (lower.includes('julian') || lower.includes('recording') || lower.includes('marseille')) {
        aiReply = "You can hear it for a second... then it almost disappears. I think this may have been one of Julian's most tender pauses. Maybe Clara was near him, maybe not quite in view, but the room seems to gather around her. I do not want to overstate it: the needle drag suggests humidity, while the feeling comes from the silence after the music.";
        emotionShift = 'intimacy';
        memoryConfidence = buildMemoryConfidence(
          68,
          ['No photograph confirms Julian\'s eye line', 'Room humidity is inferred from audio drag, not a sensor record'],
          ['A Mediterranean weather front may explain the recording texture', 'The final pause is treated as an interpersonal cue']
        );
        memoryDecay = buildMemoryDecay(
          61,
          ['Exact room temperature is gone', 'The final spoken phrase is clipped', 'Object placement cannot be confirmed'],
          ['needle drag', 'one softened laugh', 'Clara\'s name on the record sleeve'],
          ['reduced surface hiss', 'reconstructed probable room sequence', 'enhanced the final seven seconds']
        );
        voiceTexture = buildVoiceTexture('low, intimate, and careful around uncertain visual details', 'soft');
        aiTransparency = buildTransparency(
          'The answer combines audio texture, catalog context, and relationship proximity, but marks the visual claim as uncertain.',
          ['needle drag', 'record sleeve handwriting', 'Julian-Clara bond strength'],
          ['The Last Gramophone Record', 'The Eve of the Great Crossing']
        );
      } else if (lower.includes('clara') || lower.includes('crossing') || lower.includes('1956')) {
        aiReply = "I think Clara was afraid, but not only afraid. There is steadiness in the letter... almost practiced courage. She may have been holding herself together for everyone else. The ink and sentence pressure support that reading, but the amber beads are still only a family echo, not a fact I can fully prove.";
        emotionShift = 'legacy';
        memoryConfidence = buildMemoryConfidence(
          74,
          ['The steamer trunk inventory has one torn corner', 'Only the final page of the letter is fully legible'],
          ['Writing pressure is standing in for emotional state', 'Amber beads are linked from later family recollections']
        );
        memoryDecay = buildMemoryDecay(
          69,
          ['Boarding time is smudged', 'One trunk inventory line is missing', 'The middle paragraph has ink bloom'],
          ['lavender scent note', 'upper drawer reference', 'three pressure-heavy final sentences'],
          ['stabilized ink bleed', 'rebuilt crossing timeline from ship logs', 'linked object mentions across later recollections']
        );
        voiceTexture = buildVoiceTexture('restrained, compassionate, and slightly hesitant', 'tentative');
        aiTransparency = buildTransparency(
          'Twidix weighted writing pressure and legibility against later family recollections, then separated confirmed evidence from inherited association.',
          ['ink analysis', 'letter pressure changes', 'torn trunk inventory'],
          ['The Eve of the Great Crossing', 'Clara family recollections']
        );
      } else if (lower.includes('elena') || lower.includes('vienna') || lower.includes('autumn')) {
        aiReply = "You smiled a lot during this trip... or at least, the archive keeps returning to that kind of light. I think this was one of Elena's happiest remembered afternoons, maybe because everyone was together again before life changed shape. The emotion is clearer than the schedule now, which feels very human.";
        emotionShift = 'nostalgia';
        memoryConfidence = buildMemoryConfidence(
          81,
          ['No continuous custody log exists for the photograph', 'The exact hour of the image is missing'],
          ['Diary mentions are being merged into a seasonal carrying pattern', 'Color warmth is treated as both optical data and remembered feeling']
        );
        memoryDecay = buildMemoryDecay(
          76,
          ['Exact hour is absent', 'Several diary dates are approximate', 'Photo edges have chemical fading'],
          ['liquid amber phrase', 'coat pocket reference', 'warm emulsion shift'],
          ['rebalanced faded color channel', 'aligned diary references into a probable seasonal arc', 'restored edge contrast']
        );
        voiceTexture = buildVoiceTexture('warm, slow, and gently nostalgic', 'soft');
        aiTransparency = buildTransparency(
          'Twidix emphasized repeated warmth signals over exact chronology because the photograph is strong but the custody timeline is incomplete.',
          ['warm color shift', 'repeated diary references', 'Vienna date match'],
          ['The Golden Autumn in Vienna', 'Elena diary references']
        );
      } else if (lower.includes('durga') || lower.includes('puja') || lower.includes('anirban')) {
        aiReply = "The 1998 Durga Puja in Bagbazar... a truly vibrant memory. The AI summary notes a gathering of three generations. The emotional analysis shows immense joy (91%) and nostalgia (96%). I can almost hear the dhunuchi naach and smell the incense from the 48 photos and 6 video clips preserved.";
        emotionShift = 'nostalgia';
        memoryConfidence = buildMemoryConfidence(
          94,
          ['Exact guest list beyond immediate family is inferred.', 'Timestamps for all 48 photos are not available.'],
          ['Emotional analysis is based on facial expressions and the content of Anirban\'s voice notes.']
        );
        memoryDecay = buildMemoryDecay(
          85,
          ['Slight color fade on some older photos.', 'Ambient sound in videos is occasionally muffled by crowd noise.'],
          ['dhunuchi naach recordings', 'family gathering photos', 'Anirban\'s voice notes'],
          ['Color restoration applied to 2 photos.', 'Audio from one video enhanced.']
        );
        voiceTexture = buildVoiceTexture('warm, reflective, with a sense of communal joy', 'steady');
        aiTransparency = buildTransparency(
          'Twidix synthesized this from MEM001, prioritizing the high joy and nostalgia scores from the emotion analysis and cross-referencing with the media counts.',
          ['MEM001 emotion_analysis', 'photo_count', 'voice_notes'],
          ['Durga Puja 1998']
        );
      } else if (lower.includes('meera') || lower.includes('bharatanatyam') || lower.includes('dance')) {
        aiReply = "Meera Nair's first Bharatanatyam performance in 2001 was a moment of profound achievement. The records show a mix of nervous excitement and immense family pride. Her confidence score was 91%, despite the natural stress of a debut. It's a cornerstone of her cultural legacy archive.";
        emotionShift = 'joy';
        memoryConfidence = buildMemoryConfidence(
          97,
          ['Audience reaction shots are limited.', 'The specific ragas performed are not listed in metadata.'],
          ['Family pride is inferred from voice notes of her parents, Lakshmi and Suresh Nair.']
        );
        memoryDecay = buildMemoryDecay(
          92,
          ['Video has minor analog tape artifacts.', 'One voice note has slight audio hiss.'],
          ['Full performance video', 'Backstage photos', 'Parental voice notes'],
          ['Video color stabilization complete.', 'Audio hiss reduction applied.']
        );
        voiceTexture = buildVoiceTexture('proud, emotional, with an undercurrent of artistic dedication', 'steady');
        aiTransparency = buildTransparency(
          'This response is built from MEM002, which has a very high memory confidence score. The AI focused on the blend of confidence and stress in the emotion analysis.',
          ['MEM002 memory_confidence_score', 'emotion_analysis (confidence, stress)'],
          ['First Bharatanatyam Performance']
        );
      } else if (lower.includes('rajveer') || lower.includes('deployment') || lower.includes('farewell')) {
        aiReply = "The farewell for Rajveer Singh Rathore in 2014 is one of the most emotionally intense fragments. The analysis shows profound love (93%) and hope (78%) mixed with sadness and anxiety. The voice notes from the Jaipur station capture a moment of deep sacrifice and unspoken promises.";
        emotionShift = 'intimacy';
        memoryConfidence = buildMemoryConfidence(
          89,
          ['The full voice conversation is fragmented across multiple short notes.', 'The identity of all background speakers is unknown.'],
          ['The emotional weight is derived from tonal analysis of the voice notes and the context of military deployment.']
        );
        memoryDecay = buildMemoryDecay(
          80,
          ['Voice notes contain significant background noise from the railway station.', 'Some photos are slightly blurred due to movement.'],
          ['Voice notes between Rajveer, Priya, and Arjun', 'Photos of the embrace', 'A single short video clip'],
          ['Background noise reduction attempted on voice notes.', 'Image sharpening applied to 3 photos.']
        );
        voiceTexture = buildVoiceTexture('heavy with emotion, a mix of love and sorrow, yet steady', 'soft');
        aiTransparency = buildTransparency(
          'Twidix drew from MEM003, focusing on the complex emotional profile. The high "love" score was prioritized as the core of the memory, despite the sadness.',
          ['MEM003 emotion_analysis (love, sadness, anxiety)', 'voice_notes'],
          ['Farewell Before Deployment']
        );
      } else {
        aiReply = 'I may be wrong about the sequence... but I can feel a pattern forming. The factual thread is incomplete, while the emotional echo around the silent winter seasons is clearer. I can try to restore the damaged timeline, but some of it may stay fragmentary, and I would rather leave a gap than pretend certainty.';
        emotionShift = 'warmth';
      }

      const replyMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'Twidix',
        text: aiReply,
        timestamp: 'Just now',
        emotionShift,
        memoryConfidence,
        memoryDecay,
        voiceTexture,
        aiTransparency,
        // Generate beautiful live voice waves
        audioWave: Array.from({ length: 24 }, () => Math.floor(Math.random() * 80) + 10),
      };

      setCurrentEmotionFocus(emotionShift);
      setMessages((prev) => [...prev, replyMsg]);
      setIsTyping(false);
      playInteraction('select');
    }, 2000);
  };

  // Preset emotional queries
  const presetQueries = [
    "Tell me about the Durga Puja memory from 1998.",
    "Describe Meera's first dance performance.",
    "What was the mood during Rajveer's farewell?",
    "Synthesize the sensory details of Elena's Vienna Polaroid",
  ];

  return (
    <section className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
      {/* Header Intimacy Framing */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E6E4DF]/10">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#C5A46E] uppercase block mb-2">
            // Neural Memory Interlocutor
          </span>
          <h1 className="font-cinematic text-4xl md:text-6xl font-light text-[#F3EFEA] tracking-tight">
            AI Intimacy Presence
          </h1>
          <p className="text-sm md:text-base text-[#8E9299] mt-2 max-w-xl font-light">
            A real-time dialogue space synthesized with family letters, spatial blueprints, and audio waveforms. Speak directly to the sanctuary.
          </p>
        </div>

        {/* Live Ambient Resonance Aura Indicator */}
        <div className="flex items-center gap-4 premium-glass px-4 py-2 rounded-full">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#C5A46E] animate-pulse" />
            <span className="text-xs font-mono text-[#E6E4DF]">Twidix Synthesis</span>
          </div>
          <div className="h-4 w-px bg-[#E6E4DF]/10" />
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase text-[#8E9299]">Resonance:</span>
            <span className="text-xs font-mono uppercase text-[#C5A46E]">{currentEmotionFocus}</span>
          </div>
        </div>
      </div>

      {/* Main Conversation Canvas */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Preset Context Triggers & Live Frequency visualizer */}
        <div className="lg:col-span-1 space-y-6">
          {/* Live Audio Waves Representation */}
          <div className="premium-glass p-6 rounded-xl border border-[#E6E4DF]/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#8E9299]">
                // Output Waveform
              </span>
              <Disc className="w-3.5 h-3.5 text-[#C5A46E] animate-spin" style={{ animationDuration: '12s' }} />
            </div>

            {/* Custom SVG Voice wave animations */}
            <div className="h-16 flex items-end justify-between gap-1 pt-2">
              {Array.from({ length: 16 }).map((_, idx) => {
                const height = isTyping
                  ? Math.floor(Math.random() * 85) + 15
                  : Math.sin(idx * 0.8) * 20 + 35;
                return (
                  <motion.div
                    key={idx}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.2, repeat: isTyping ? Infinity : 0, repeatType: 'reverse' }}
                    className={`w-full rounded-t-sm ${
                      isTyping ? 'bg-[#C5A46E]' : 'bg-[#8E9299]/40'
                    }`}
                  />
                );
              })}
            </div>

            <p className="text-[10px] font-mono text-[#8E9299] text-center mt-3 tracking-wider">
              {isTyping ? 'Synthesizing Family Matrix...' : 'Twidix Rest State (432Hz)'}
            </p>
          </div>

          {/* Preset Inquiries */}
          <div className="premium-glass p-6 rounded-xl border border-[#E6E4DF]/10 space-y-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A46E] block mb-2">
              // Echoes to Explore
            </span>
            {presetQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputText(query);
                  playInteraction('hover');
                }}
                className="w-full text-left p-2.5 rounded bg-[#0B0C0E]/50 hover:bg-[#0B0C0E] border border-[#E6E4DF]/05 text-xs text-[#E6E4DF]/80 hover:text-[#F3EFEA] transition-all duration-300 font-light leading-relaxed block"
              >
                "{query}"
              </button>
            ))}
          </div>

          {/* Emotional guidance note */}
          <div className="p-4 rounded-lg bg-[#14171D] border border-[#E6E4DF]/05">
            <div className="flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A46E] shrink-0 mt-0.5" />
              <p className="text-[11px] font-light text-[#8E9299] leading-relaxed">
                The presence adapts its vocabulary directly to your grandfather's surviving journals and maternal voice archives.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Active Chat Stream */}
        <div className="lg:col-span-3 flex flex-col justify-between premium-glass rounded-xl border border-[#E6E4DF]/10 h-[650px] overflow-hidden">
          {/* Chat Messages Scrolling Flow */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6 custom-scrollbar h-full">
            <AnimatePresence>
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <motion.div
                    layout
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-mono uppercase text-[#8E9299]">
                        {isUser ? 'Custodian' : 'Twidix Presence'}
                      </span>
                      <span className="text-[#8E9299]">&bull;</span>
                      <span className="text-[9px] font-mono text-[#8E9299]">{msg.timestamp}</span>
                    </div>

                    <div className={`max-w-xl p-5 rounded-xl border ${
                      isUser
                        ? 'bg-[#25282E] text-[#F3EFEA] border-[#E6E4DF]/10 rounded-br-none'
                        : 'bg-[#0B0C0E] text-[#E6E4DF] border-[#C5A46E]/20 rounded-bl-none'
                    }`}>
                      <p className={`text-sm md:text-base font-light leading-relaxed tracking-wide ${
                        !isUser ? 'font-serif text-[#F3EFEA]' : ''
                      }`}>
                        {msg.text}
                      </p>

                      {msg.voiceTexture && (
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="rounded bg-[#14171D]/80 border border-[#E6E4DF]/05 px-3 py-2">
                            <span className="text-[9px] font-mono uppercase text-[#8E9299] block">Pause Pattern</span>
                            <span className="text-[11px] text-[#E6E4DF]/75 leading-relaxed">{msg.voiceTexture.pausePattern}</span>
                          </div>
                          <div className="rounded bg-[#14171D]/80 border border-[#E6E4DF]/05 px-3 py-2">
                            <span className="text-[9px] font-mono uppercase text-[#8E9299] block">Emotional Tone</span>
                            <span className="text-[11px] text-[#E6E4DF]/75 leading-relaxed">{msg.voiceTexture.emotionalTone}</span>
                          </div>
                          <div className="rounded bg-[#14171D]/80 border border-[#E6E4DF]/05 px-3 py-2">
                            <span className="text-[9px] font-mono uppercase text-[#8E9299] block">Certainty</span>
                            <span className="text-[11px] text-[#C5A46E] uppercase font-mono">{msg.voiceTexture.certainty}</span>
                          </div>
                        </div>
                      )}

                      {msg.memoryConfidence && (
                        <div className="mt-4 pt-4 border-t border-[#E6E4DF]/05">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-3.5 h-3.5 text-[#C5A46E]" />
                              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A46E]">
                                Memory Confidence
                              </span>
                            </div>
                            <span className="text-xs font-mono text-[#F3EFEA]">
                              {msg.memoryConfidence.percentage}%
                            </span>
                          </div>

                          <div className="h-1.5 rounded-full bg-[#25282E] overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${msg.memoryConfidence.percentage}%` }}
                              transition={{ duration: 0.7, ease: 'easeOut' }}
                              className="h-full bg-[#C5A46E]"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            <div>
                              <p className="text-[9px] font-mono uppercase tracking-widest text-[#8E9299] mb-2">
                                Missing Context
                              </p>
                              <ul className="space-y-1.5">
                                {msg.memoryConfidence.missingContext.map((item) => (
                                  <li key={item} className="text-[11px] leading-relaxed text-[#E6E4DF]/70">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-[9px] font-mono uppercase tracking-widest text-[#8E9299] mb-2">
                                Reconstructed Assumptions
                              </p>
                              <ul className="space-y-1.5">
                                {msg.memoryConfidence.reconstructedAssumptions.map((item) => (
                                  <li key={item} className="text-[11px] leading-relaxed text-[#E6E4DF]/70">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {msg.memoryDecay && (
                        <div className="mt-4 pt-4 border-t border-[#E6E4DF]/05">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2">
                              <Wand2 className="w-3.5 h-3.5 text-[#C5A46E]" />
                              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A46E]">
                                Memory Decay Simulation
                              </span>
                            </div>
                            <span className="text-xs font-mono text-[#F3EFEA]">
                              Integrity {msg.memoryDecay.integrity}%
                            </span>
                          </div>

                          <div className="relative h-2 rounded-full bg-[#25282E] overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${msg.memoryDecay.integrity}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              className="h-full bg-[#2D6A68]"
                            />
                            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_8px,rgba(230,228,223,0.12)_8px,rgba(230,228,223,0.12)_9px)]" />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                            <div>
                              <p className="text-[9px] font-mono uppercase tracking-widest text-[#8E9299] mb-2">
                                Faded Metadata
                              </p>
                              <ul className="space-y-1.5">
                                {msg.memoryDecay.fadedMetadata.map((item) => (
                                  <li key={item} className="text-[11px] leading-relaxed text-[#E6E4DF]/70">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-[9px] font-mono uppercase tracking-widest text-[#8E9299] mb-2">
                                Surviving Fragments
                              </p>
                              <ul className="space-y-1.5">
                                {msg.memoryDecay.fragments.map((item) => (
                                  <li key={item} className="text-[11px] leading-relaxed text-[#E6E4DF]/70">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-[9px] font-mono uppercase tracking-widest text-[#8E9299] mb-2">
                                Restoration
                              </p>
                              <ul className="space-y-1.5">
                                {msg.memoryDecay.restorationActions.map((item) => (
                                  <li key={item} className="text-[11px] leading-relaxed text-[#E6E4DF]/70">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {msg.aiTransparency && (
                        <div className="mt-4 pt-4 border-t border-[#E6E4DF]/05">
                          <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle className="w-3.5 h-3.5 text-[#C5A46E]" />
                            <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A46E]">
                              Emotional AI Transparency
                            </span>
                          </div>
                          <p className="text-[11px] leading-relaxed text-[#E6E4DF]/75">
                            {msg.aiTransparency.reasoning}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            <div>
                              <p className="text-[9px] font-mono uppercase tracking-widest text-[#8E9299] mb-2">
                                Confidence Inputs
                              </p>
                              <ul className="space-y-1.5">
                                {msg.aiTransparency.confidenceInputs.map((item) => (
                                  <li key={item} className="text-[11px] leading-relaxed text-[#E6E4DF]/70">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-[9px] font-mono uppercase tracking-widest text-[#8E9299] mb-2">
                                Influenced By
                              </p>
                              <ul className="space-y-1.5">
                                {msg.aiTransparency.influencedBy.map((item) => (
                                  <li key={item} className="text-[11px] leading-relaxed text-[#E6E4DF]/70">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Render localized audio waves if returned */}
                      {msg.audioWave && (
                        <div className="mt-4 pt-3 border-t border-[#E6E4DF]/05 flex items-center gap-3">
                          <div className="flex items-center gap-0.5 h-4">
                            {msg.audioWave.map((val, i) => (
                              <span
                                key={i}
                                className="w-0.5 bg-[#C5A46E]/60 inline-block"
                                style={{ height: `${val}%` }}
                              />
                            ))}
                          </div>
                          <span className="text-[9px] font-mono text-[#C5A46E] uppercase">
                            Resonance Peak Imprinted
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-xs font-mono text-[#C5A46E]"
              >
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span className="animate-pulse">Twidix is formulating an archival response...</span>
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Interface */}
          <div className="p-4 bg-[#0B0C0E] border-t border-[#E6E4DF]/10">
            <form onSubmit={handleSend} className="relative flex items-center">
              <User className="absolute left-4 w-4 h-4 text-[#8E9299]" />
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about family records, hidden subtexts, or ambient sound profiles..."
                className="w-full bg-[#14171D] text-sm text-[#F3EFEA] placeholder-[#8E9299]/60 pl-11 pr-12 py-3 rounded-lg border border-[#E6E4DF]/10 focus:outline-none focus:border-[#C5A46E]/50 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`absolute right-3 p-2 rounded-md transition-colors ${
                  inputText.trim()
                    ? 'bg-[#C5A46E] text-[#0B0C0E]'
                    : 'text-[#8E9299] cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
