import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Eye, Flame, Layers, TrendingDown, TrendingUp } from 'lucide-react';
import { EMOTIONAL_AGING_METRICS, EMOTIONAL_METRICS } from '../data/mockData';
import { useSound } from './SoundDesign';

type Point = [number, number];

// Helper to get properties of a line
const line = (pointA: Point, pointB: Point) => {
  const lengthX = pointB[0] - pointA[0];
  const lengthY = pointB[1] - pointA[1];
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  };
};

// Helper to get the position of a control point for a smooth curve
const controlPoint = (current: Point, previous: Point | undefined, next: Point | undefined, reverse?: boolean): Point => {
  const p = previous || current;
  const n = next || current;
  const smoothing = 0.2;
  const o = line(p, n);
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing;
  const x = current[0] + Math.cos(angle) * length;
  const y = current[1] + Math.sin(angle) * length;
  return [x, y];
};

const bezierCommand = (point: Point, i: number, a: Point[]): string => {
  const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point);
  const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true);
  return `C ${cpsX.toFixed(2)},${cpsY.toFixed(2)} ${cpeX.toFixed(2)},${cpeY.toFixed(2)} ${point[0].toFixed(2)},${point[1].toFixed(2)}`;
};

export const EmotionalAnalytics: React.FC = () => {
  const { playInteraction } = useSound();
  const [activeMonthIndex, setActiveMonthIndex] = useState(4); // Default to May
  const [activeAgingIndex, setActiveAgingIndex] = useState(EMOTIONAL_AGING_METRICS.length - 1);

  const currentMetric = EMOTIONAL_METRICS[activeMonthIndex];
  const currentAgingMetric = EMOTIONAL_AGING_METRICS[activeAgingIndex];

  // Map emotion colors beautifully
  const emotionColors = {
    nostalgia: '#C5A46E',
    warmth: '#E2843B',
    legacy: '#2D6A68',
    intimacy: '#D98880',
  };

  const waveConfig = {
    nostalgia: { strokeWidth: '2', delay: 0, opacity: 0.8, fillOpacity: 0.35 },
    legacy: { strokeWidth: '2.5', delay: 0.2, opacity: 0.9, fillOpacity: 0.25 },
    intimacy: { strokeWidth: '1.5', delay: 0.4, opacity: 0.7, fillOpacity: 0.3 },
    warmth: { strokeWidth: '2', delay: 0.6, opacity: 0.75, fillOpacity: 0.3 },
  };

  const agingColors = {
    attachment: '#D98880',
    nostalgia: '#C5A46E',
    sadness: '#6F8FAF',
    importance: '#2D6A68',
  };

  const buildAgingPath = (key: keyof typeof agingColors) =>
    EMOTIONAL_AGING_METRICS.map((metric, idx) => {
      const x = 40 + (idx / (EMOTIONAL_AGING_METRICS.length - 1)) * 920;
      const y = 260 - metric[key] * 2.2;
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

  const buildWavePoints = (key: keyof typeof emotionColors): Point[] => {
    const data = EMOTIONAL_METRICS;
    const width = 1000;
    const height = 300;
    const paddingY = 40;

    return data.map((metric, i) => {
      const x = (i / (data.length - 1)) * width;
      // Invert Y axis and apply padding
      const y = (height - paddingY * 2) * (1 - metric[key] / 100) + paddingY;
      return [x, y];
    });
  };

  return (
    <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E6E4DF]/10">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#C5A46E] uppercase block mb-2">
            // Psychological Topography
          </span>
          <h1 className="font-cinematic text-4xl md:text-6xl font-light text-[#F3EFEA] tracking-tight">
            Emotional Tonality Waves
          </h1>
          <p className="text-sm md:text-base text-[#8E9299] mt-2 max-w-xl font-light">
            A visual symphony mapping the resonance of your preserved legacy. Explore the flowing streams of intimacy, legacy, and raw human connection over time.
          </p>
        </div>

        {/* Core summary indicator */}
        <div className="flex items-center gap-6 premium-glass px-6 py-3 rounded-xl border border-[#E6E4DF]/05 self-start md:self-auto">
          <div>
            <span className="text-[10px] font-mono text-[#8E9299] uppercase block">Dominant Wave</span>
            <span className="font-cinematic text-xl text-[#C5A46E]">Legacy Resonance</span>
          </div>
          <div className="h-8 w-px bg-[#E6E4DF]/10" />
          <div>
            <span className="text-[10px] font-mono text-[#8E9299] uppercase block">Constellation Coherence</span>
            <span className="font-cinematic text-xl text-[#F3EFEA]">94.2%</span>
          </div>
        </div>
      </div>

      {/* Flowing Emotional Waves Canvas */}
      <div className="mt-12 premium-glass p-8 md:p-12 rounded-2xl border border-[#E6E4DF]/10 relative overflow-hidden">
        
        {/* Absolute labels */}
        <div className="absolute top-6 left-8 flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#C5A46E]" />
          <span className="text-xs font-mono text-[#E6E4DF] uppercase tracking-wider">
            Continuous River of Sentience
          </span>
        </div>

        {/* Emotion Spectrum Toggles */}
        <div className="absolute top-6 right-8 hidden sm:flex items-center gap-4">
          {Object.entries(emotionColors).map(([key, color]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[10px] font-mono text-[#8E9299] uppercase">{key}</span>
            </div>
          ))}
        </div>

        {/* Artistic SVG Flowing Emotional Waves */}
        <div className="mt-12 relative h-72 w-full">
          
          {/* Background framing lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
            <div className="w-full border-b border-[#E6E4DF]" />
            <div className="w-full border-b border-[#E6E4DF]" />
            <div className="w-full border-b border-[#E6E4DF]" />
            <div className="w-full border-b border-[#E6E4DF]" />
          </div>

          <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 300" preserveAspectRatio="none">
            {/* Defs for absolute sublime non-linear translucent gradients */}
            <defs>
              {Object.keys(waveConfig).map(key => (
                <linearGradient key={key} id={`${key}Grad`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={emotionColors[key as keyof typeof emotionColors]} stopOpacity={waveConfig[key as keyof typeof waveConfig].fillOpacity} />
                  <stop offset="100%" stopColor={emotionColors[key as keyof typeof emotionColors]} stopOpacity="0.0" />
                </linearGradient>
              ))}
            </defs>

            {Object.keys(waveConfig).map(keyStr => {
              const key = keyStr as keyof typeof waveConfig;
              const points = buildWavePoints(key);
              const pathData = points.reduce((acc, point, i, a) => i === 0
                ? `M ${point[0].toFixed(2)},${point[1].toFixed(2)}`
                : `${acc} ${bezierCommand(point, i, a)}`
              , '');
              const fillPathData = `${pathData} L 1000 300 L 0 300 Z`;
              const config = waveConfig[key];

              return (
                <React.Fragment key={key}>
                  <motion.path
                    d={fillPathData}
                    fill={`url(#${key}Grad)`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: config.delay }}
                  />
                  <motion.path
                    d={pathData}
                    fill="none"
                    stroke={emotionColors[key]}
                    strokeWidth={config.strokeWidth}
                    strokeOpacity={config.opacity}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: config.delay, ease: 'easeOut' }}
                  />
                </React.Fragment>
              );
            })}

            {/* Interactive node indicator based on selected month */}
            {EMOTIONAL_METRICS.map((m, idx) => {
              const xPos = (idx / (EMOTIONAL_METRICS.length - 1)) * 900 + 50;
              const isActive = activeMonthIndex === idx;
              return (
                <g key={m.month} className="cursor-pointer" onClick={() => {
                  playInteraction('whisper');
                  setActiveMonthIndex(idx);
                }}>
                  <line 
                    x1={xPos} 
                    y1="20" 
                    x2={xPos} 
                    y2="280" 
                    stroke={isActive ? "#C5A46E" : "#8E9299"} 
                    strokeWidth={isActive ? "1.5" : "0.5"}
                    strokeDasharray={isActive ? "none" : "4 4"}
                    opacity={isActive ? "0.8" : "0.3"}
                  />
                  {Object.keys(emotionColors).map(keyStr => {
                    const key = keyStr as keyof typeof emotionColors;
                    const height = 300;
                    const paddingY = 40;
                    const yPos = (height - paddingY * 2) * (1 - m[key] / 100) + paddingY;
                    return (
                      <circle 
                        key={key}
                        cx={xPos} 
                        cy={yPos} 
                        r={isActive ? "6" : "3"} 
                        fill={emotionColors[key]} 
                      />
                    )
                  })}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Timeline Months Selector */}
        <div className="mt-6 flex items-center justify-between relative z-10">
          {EMOTIONAL_METRICS.map((metric, idx) => {
            const isActive = activeMonthIndex === idx;
            return (
              <button
                key={metric.month}
                onClick={() => {
                  playInteraction('whisper');
                  setActiveMonthIndex(idx);
                }}
                className={`flex flex-col items-center gap-1.5 py-2 px-3 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#25282E] text-[#F3EFEA] scale-105' 
                    : 'text-[#8E9299] hover:text-[#E6E4DF]'
                }`}
              >
                <span className="text-xs font-mono uppercase tracking-wider">{metric.month}</span>
                {isActive && <span className="w-1 h-1 rounded-full bg-[#C5A46E]" />}
              </button>
            );
          })}
        </div>

        {/* Focused Poetic Output Metrics */}
        <motion.div
          key={currentMetric.month}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 pt-8 border-t border-[#E6E4DF]/10 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: emotionColors.nostalgia }} />
              <span className="text-[10px] font-mono text-[#8E9299] uppercase">Nostalgia Density</span>
            </div>
            <p className="font-cinematic text-3xl font-light text-[#F3EFEA] mt-1">
              {currentMetric.nostalgia}%
            </p>
            <span className="text-[9px] font-mono text-[#8E9299]">Silver Gelatin Saturation</span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: emotionColors.legacy }} />
              <span className="text-[10px] font-mono text-[#8E9299] uppercase">Legacy Resonance</span>
            </div>
            <p className="font-cinematic text-3xl font-light text-[#F3EFEA] mt-1">
              {currentMetric.legacy}%
            </p>
            <span className="text-[9px] font-mono text-[#8E9299]">Lineage Preservation Index</span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: emotionColors.intimacy }} />
              <span className="text-[10px] font-mono text-[#8E9299] uppercase">Intimacy Frequency</span>
            </div>
            <p className="font-cinematic text-3xl font-light text-[#F3EFEA] mt-1">
              {currentMetric.intimacy}%
            </p>
            <span className="text-[9px] font-mono text-[#8E9299]">Heart Rate & Letters</span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: emotionColors.warmth }} />
              <span className="text-[10px] font-mono text-[#8E9299] uppercase">Warmth Aura</span>
            </div>
            <p className="font-cinematic text-3xl font-light text-[#F3EFEA] mt-1">
              {currentMetric.warmth}%
            </p>
            <span className="text-[9px] font-mono text-[#8E9299]">Tactile Emulsion Warmth</span>
          </div>
        </motion.div>

      </div>

      {/* Emotional Aging: longitudinal memory evolution */}
      <div className="mt-12 premium-glass p-8 md:p-12 rounded-2xl border border-[#E6E4DF]/10 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#C5A46E] uppercase block mb-2">
              // Emotional Evolution Analytics
            </span>
            <h2 className="font-cinematic text-3xl md:text-5xl font-light text-[#F3EFEA] tracking-tight">
              Emotional Aging of Memories
            </h2>
            <p className="text-sm text-[#8E9299] mt-2 max-w-2xl font-light leading-relaxed">
              Twidix tracks how attachment, nostalgia, sadness, and symbolic importance evolve as memories are retold, inherited, and reinterpreted across years.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 min-w-full sm:min-w-[360px] lg:min-w-[420px]">
            <div className="bg-[#0B0C0E]/60 border border-[#E6E4DF]/05 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#C5A46E]" />
                <span className="text-[10px] font-mono text-[#8E9299] uppercase">Nostalgia Drift</span>
              </div>
              <p className="font-cinematic text-3xl text-[#F3EFEA] mt-1">+62%</p>
              <span className="text-[10px] text-[#8E9299] font-mono">1956 to 2026</span>
            </div>
            <div className="bg-[#0B0C0E]/60 border border-[#E6E4DF]/05 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-[#6F8FAF]" />
                <span className="text-[10px] font-mono text-[#8E9299] uppercase">Sadness Decay</span>
              </div>
              <p className="font-cinematic text-3xl text-[#F3EFEA] mt-1">-63%</p>
              <span className="text-[10px] text-[#8E9299] font-mono">Acute grief softens</span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 xl:grid-cols-5 gap-8">
          <div className="xl:col-span-3">
            <div className="relative h-80 rounded-xl bg-[#0B0C0E]/40 border border-[#E6E4DF]/05 p-4 overflow-hidden">
              <div className="absolute left-4 right-4 top-6 bottom-10 flex flex-col justify-between opacity-10 pointer-events-none">
                <div className="border-b border-[#E6E4DF]" />
                <div className="border-b border-[#E6E4DF]" />
                <div className="border-b border-[#E6E4DF]" />
                <div className="border-b border-[#E6E4DF]" />
              </div>

              <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 300" preserveAspectRatio="none">
                {Object.entries(agingColors).map(([key, color]) => (
                  <motion.path
                    key={key}
                    d={buildAgingPath(key as keyof typeof agingColors)}
                    fill="none"
                    stroke={color}
                    strokeWidth={key === 'importance' ? '3' : '2'}
                    strokeOpacity={key === 'sadness' ? '0.75' : '0.9'}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                ))}

                {EMOTIONAL_AGING_METRICS.map((metric, idx) => {
                  const x = 40 + (idx / (EMOTIONAL_AGING_METRICS.length - 1)) * 920;
                  const isActive = idx === activeAgingIndex;
                  return (
                    <g
                      key={metric.year}
                      className="cursor-pointer"
                      onClick={() => {
                        playInteraction('whisper');
                        setActiveAgingIndex(idx);
                      }}
                    >
                      <line
                        x1={x}
                        y1="20"
                        x2={x}
                        y2="280"
                        stroke={isActive ? '#C5A46E' : '#8E9299'}
                        strokeWidth={isActive ? '1.5' : '0.5'}
                        strokeDasharray={isActive ? 'none' : '4 4'}
                        opacity={isActive ? '0.8' : '0.28'}
                      />
                      <circle cx={x} cy={260 - metric.importance * 2.2} r={isActive ? '7' : '4'} fill={agingColors.importance} />
                      <circle cx={x} cy={260 - metric.nostalgia * 2.2} r={isActive ? '6' : '3'} fill={agingColors.nostalgia} />
                      <circle cx={x} cy={260 - metric.sadness * 2.2} r={isActive ? '6' : '3'} fill={agingColors.sadness} />
                    </g>
                  );
                })}
              </svg>

              <div className="absolute left-4 right-4 bottom-3 flex items-center justify-between">
                {EMOTIONAL_AGING_METRICS.map((metric, idx) => (
                  <button
                    key={metric.year}
                    onClick={() => {
                      playInteraction('whisper');
                      setActiveAgingIndex(idx);
                    }}
                    className={`text-[10px] font-mono rounded px-2 py-1 transition-colors ${
                      activeAgingIndex === idx
                        ? 'bg-[#25282E] text-[#F3EFEA]'
                        : 'text-[#8E9299] hover:text-[#E6E4DF]'
                    }`}
                  >
                    {metric.year}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              {Object.entries(agingColors).map(([key, color]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-[10px] font-mono text-[#8E9299] uppercase">{key}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            key={currentAgingMetric.year}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="xl:col-span-2 bg-[#0B0C0E]/50 border border-[#E6E4DF]/05 rounded-xl p-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E6E4DF]/05">
              <div>
                <span className="text-[10px] font-mono text-[#8E9299] uppercase">Selected Year</span>
                <p className="font-cinematic text-4xl text-[#F3EFEA]">{currentAgingMetric.year}</p>
              </div>
              <span className="text-[10px] font-mono text-[#C5A46E] uppercase">AI Inference</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                ['Attachment', currentAgingMetric.attachment, agingColors.attachment],
                ['Nostalgia', currentAgingMetric.nostalgia, agingColors.nostalgia],
                ['Sadness', currentAgingMetric.sadness, agingColors.sadness],
                ['Importance', currentAgingMetric.importance, agingColors.importance],
              ].map(([label, value, color]) => (
                <div key={label as string}>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase">
                    <span className="text-[#8E9299]">{label}</span>
                    <span className="text-[#F3EFEA]">{value}%</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-[#25282E] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 0.7 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: color as string }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[#E6E4DF]/05">
              <span className="text-[10px] font-mono text-[#C5A46E] uppercase tracking-widest">
                Evolution Reading
              </span>
              <p className="text-sm text-[#E6E4DF]/80 font-light leading-relaxed mt-2">
                {currentAgingMetric.note}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Secondary Analytics: Memory Constellations Heatmap */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Constellation Heatmap Cluster */}
        <div className="premium-glass p-8 rounded-xl border border-[#E6E4DF]/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A46E]">
                // Constellation Matrix
              </span>
              <Layers className="w-4 h-4 text-[#8E9299]" />
            </div>
            <h3 className="font-cinematic text-2xl text-[#F3EFEA] mt-2 font-light">
              Temporal Constellations
            </h3>
            <p className="text-xs text-[#8E9299] mt-1 font-light">
              Distribution of artifacts categorized by emotional gravity.
            </p>
          </div>

          {/* Artistic visual cluster */}
          <div className="my-8 py-4 flex flex-wrap gap-3 justify-center items-center">
            {[
              { label: '1950s Transatlantic', weight: 'w-24 h-24', bg: 'bg-[#2D6A68]/20', border: 'border-[#2D6A68]' },
              { label: '1960s Farewells', weight: 'w-32 h-32', bg: 'bg-[#D98880]/20', border: 'border-[#D98880]' },
              { label: '1970s Vienna', weight: 'w-28 h-28', bg: 'bg-[#C5A46E]/20', border: 'border-[#C5A46E]' },
              { label: '1980s Recovery', weight: 'w-20 h-20', bg: 'bg-[#E2843B]/20', border: 'border-[#E2843B]' },
              { label: '2000s Lineage', weight: 'w-36 h-36', bg: 'bg-[#F3EFEA]/10', border: 'border-[#F3EFEA]/30' },
            ].map((node, i) => (
              <div
                key={i}
                className={`${node.weight} ${node.bg} border ${node.border} rounded-full flex items-center justify-center p-3 text-center transition-transform hover:scale-110 cursor-pointer`}
              >
                <span className="text-[10px] font-mono text-[#E6E4DF] leading-tight">
                  {node.label}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E6E4DF]/05 flex items-center justify-between text-xs font-mono text-[#8E9299]">
            <span>Primary Focus: 1960s Farewells</span>
            <span className="text-[#C5A46E]">Explore Galaxy Cluster →</span>
          </div>
        </div>

        {/* Emotion Rivers Narrative View */}
        <div className="premium-glass p-8 rounded-xl border border-[#E6E4DF]/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A46E]">
                // Emotional Rivers
              </span>
              <Flame className="w-4 h-4 text-[#E2843B]" />
            </div>
            <h3 className="font-cinematic text-2xl text-[#F3EFEA] mt-2 font-light">
              Atmospheric Warmth Pulse
            </h3>
            <p className="text-xs text-[#8E9299] mt-1 font-light">
              The continuous psychological temperature tracked through written correspondence.
            </p>
          </div>

          {/* Artistic timeline pulse */}
          <div className="my-8 space-y-4">
            {[
              { era: '1951 - Blueprints', val: 88, color: '#C5A46E' },
              { era: '1964 - The Last Dance', val: 98, color: '#D98880' },
              { era: '1978 - Autumn Emigration', val: 94, color: '#2D6A68' },
              { era: '1991 - Bedside Maps', val: 89, color: '#E2843B' },
            ].map((pulse) => (
              <div key={pulse.era} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#E6E4DF]">{pulse.era}</span>
                  <span className="text-[#8E9299]">{pulse.val}% Peak</span>
                </div>
                <div className="h-1.5 w-full bg-[#0B0C0E] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pulse.val}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: pulse.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded bg-[#0B0C0E]/50 border border-[#E6E4DF]/05 flex items-center gap-3">
            <Eye className="w-4 h-4 text-[#C5A46E]" />
            <p className="text-[11px] font-light text-[#E6E4DF]/80">
              Peak warmth corresponds perfectly with physical ink artifacts rather than typed modern transcripts.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};
