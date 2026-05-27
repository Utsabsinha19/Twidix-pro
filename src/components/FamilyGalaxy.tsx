import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, HeartPulse, Layers, Network, Sparkles } from 'lucide-react';
import { CONSTELLATION_NODES, RELATIONSHIP_STRENGTHS } from '../data/mockData';
import { ConstellationNode, RelationshipStrength } from '../types';
import { useSound } from './SoundDesign';

interface FamilyGalaxyProps {
  onSelectNodeFilter: (authorName: string) => void;
}

export const FamilyGalaxy: React.FC<FamilyGalaxyProps> = ({ onSelectNodeFilter }) => {
  const { playInteraction } = useSound();
  
  const [selectedNode, setSelectedNode] = useState<ConstellationNode | null>(CONSTELLATION_NODES[0]);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const findRelationship = (sourceId: string, targetId: string) =>
    RELATIONSHIP_STRENGTHS.find((relationship) =>
      (relationship.sourceId === sourceId && relationship.targetId === targetId) ||
      (relationship.sourceId === targetId && relationship.targetId === sourceId)
    );

  const getNodeRelationships = (nodeId: string): RelationshipStrength[] =>
    RELATIONSHIP_STRENGTHS.filter((relationship) =>
      relationship.sourceId === nodeId || relationship.targetId === nodeId
    );

  const strongestRelationship = [...RELATIONSHIP_STRENGTHS].sort((a, b) => b.warmth - a.warmth)[0];
  const selectedRelationships = selectedNode ? getNodeRelationships(selectedNode.id) : [];
  const selectedWarmth = selectedRelationships.length
    ? Math.round(selectedRelationships.reduce((sum, relationship) => sum + relationship.warmth, 0) / selectedRelationships.length)
    : 0;

  // Helper to draw custom connections beautifully
  const renderConnections = () => {
    return CONSTELLATION_NODES.map((node) => {
      return node.connections.map((targetId) => {
        const targetNode = CONSTELLATION_NODES.find((n) => n.id === targetId);
        if (!targetNode) return null;
        const relationship = findRelationship(node.id, targetId);
        const warmth = relationship?.warmth ?? 45;
        const connectivity = relationship?.connectivity ?? 40;

        // Check if this specific line should glow based on hover or selection
        const isHighlighted = 
          node.id === hoveredNodeId || 
          targetId === hoveredNodeId ||
          node.id === selectedNode?.id ||
          targetId === selectedNode?.id;

        return (
          <line
            key={`${node.id}-${targetId}`}
            x1={`${node.x}%`}
            y1={`${node.y}%`}
            x2={`${targetNode.x}%`}
            y2={`${targetNode.y}%`}
            stroke={isHighlighted ? "#C5A46E" : "#8E9299"}
            strokeWidth={isHighlighted ? `${1.2 + connectivity / 55}` : `${0.4 + connectivity / 120}`}
            strokeOpacity={isHighlighted ? `${0.35 + warmth / 150}` : `${0.08 + warmth / 400}`}
            strokeDasharray={isHighlighted ? "none" : "4 4"}
            className="transition-all duration-500"
          />
        );
      });
    });
  };

  return (
    <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative">
      
      {/* Editorial Space Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E6E4DF]/10">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#C5A46E] uppercase block mb-2">
            // Lineage Mapping
          </span>
          <h1 className="font-cinematic text-4xl md:text-6xl font-light text-[#F3EFEA] tracking-tight">
            The Family Constellation
          </h1>
          <p className="text-sm md:text-base text-[#8E9299] mt-2 max-w-xl font-light">
            An interactive emotional galaxy mapping the threads of kinship. Click any luminous node to explore their specific heritage resonance and surviving memory collection.
          </p>
        </div>

        {/* Legend pills */}
        <div className="flex flex-wrap items-center gap-4 bg-[#14171D] p-3 rounded-xl border border-[#E6E4DF]/05 self-start md:self-auto">
          <span className="text-[10px] font-mono text-[#8E9299] uppercase">Kinship Tones:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C5A46E]" />
            <span className="text-[10px] font-mono text-[#E6E4DF]">Patriarch/Matriarch</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#E2843B]" />
            <span className="text-[10px] font-mono text-[#E6E4DF]">Direct Line</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2D6A68]" />
            <span className="text-[10px] font-mono text-[#E6E4DF]">Custodian</span>
          </div>
        </div>
      </div>

      {/* Relationship Strength Analysis */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="premium-glass p-6 rounded-xl border border-[#E6E4DF]/10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A46E]">
              // Relationship Warmth
            </span>
            <HeartPulse className="w-4 h-4 text-[#D98880]" />
          </div>
          <p className="font-cinematic text-3xl text-[#F3EFEA] mt-3">{selectedWarmth}%</p>
          <p className="text-xs text-[#8E9299] mt-1 font-light">
            Average warmth around {selectedNode?.name || 'selected custodian'} based on shared artifacts and emotional co-presence.
          </p>
        </div>

        <div className="premium-glass p-6 rounded-xl border border-[#E6E4DF]/10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A46E]">
              // Strongest Bond
            </span>
            <Network className="w-4 h-4 text-[#2D6A68]" />
          </div>
          <p className="font-cinematic text-2xl text-[#F3EFEA] mt-3">
            {CONSTELLATION_NODES.find((node) => node.id === strongestRelationship.sourceId)?.name}
          </p>
          <p className="text-xs text-[#8E9299] mt-1">
            with {CONSTELLATION_NODES.find((node) => node.id === strongestRelationship.targetId)?.name} at {strongestRelationship.warmth}% warmth
          </p>
        </div>

        <div className="premium-glass p-6 rounded-xl border border-[#E6E4DF]/10">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A46E]">
            // Life Influence Map
          </span>
          <div className="mt-4 space-y-3">
            {selectedRelationships.slice(0, 3).map((relationship) => {
              const otherId = relationship.sourceId === selectedNode?.id ? relationship.targetId : relationship.sourceId;
              const otherNode = CONSTELLATION_NODES.find((node) => node.id === otherId);
              return (
                <div key={`${relationship.sourceId}-${relationship.targetId}`} className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#E6E4DF]">{otherNode?.name}</span>
                    <span className="text-[#8E9299]">{relationship.evolution}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#0B0C0E] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${relationship.influence}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-[#C5A46E]"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* The Interactive Galaxy Matrix Canvas */}
      <div className="mt-12 relative w-full h-[600px] md:h-[700px] premium-glass rounded-2xl border border-[#E6E4DF]/10 overflow-hidden select-none">
        
        {/* Ambient star backdrop avoiding plain SaaS feel */}
        <div className="absolute inset-0 bg-[#0B0C0E]">
          {/* Subtle noise and light pools */}
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#C5A46E]/05 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-[#2D6A68]/05 blur-3xl" />
          
          {/* Subtle grid coordinates */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#14171D_1px,transparent_1px),linear-gradient(to_bottom,#14171D_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
        </div>

        {/* SVG Live Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {renderConnections()}
        </svg>

        {/* Luminous Family Nodes */}
        {CONSTELLATION_NODES.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          const isHovered = hoveredNodeId === node.id;
          
          // Color based on primary emotion
          const glowColor = 
            node.primaryEmotion === 'intimacy' ? 'rgba(217, 136, 128, 0.4)' :
            node.primaryEmotion === 'nostalgia' ? 'rgba(197, 164, 110, 0.4)' :
            node.primaryEmotion === 'legacy' ? 'rgba(45, 106, 104, 0.4)' :
            'rgba(226, 132, 59, 0.4)';

          const borderColor = 
            node.primaryEmotion === 'intimacy' ? '#D98880' :
            node.primaryEmotion === 'nostalgia' ? '#C5A46E' :
            node.primaryEmotion === 'legacy' ? '#2D6A68' :
            '#E2843B';

          return (
            <motion.div
              key={node.id}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => {
                playInteraction('hover');
                setHoveredNodeId(node.id);
              }}
              onMouseLeave={() => setHoveredNodeId(null)}
              onClick={() => {
                playInteraction('select');
                setSelectedNode(node);
              }}
            >
              {/* Radial Aura Effect */}
              <div 
                className={`absolute inset-0 rounded-full blur-md transition-all duration-500 ${
                  isSelected || isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-0'
                }`}
                style={{ backgroundColor: glowColor }}
              />

              {/* Node Circular Image Core */}
              <div 
                className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-[#0B0C0E] border-2 transition-all duration-300 ${
                  isSelected 
                    ? 'scale-110 ring-4 ring-[#C5A46E]/30' 
                    : 'group-hover:scale-105'
                }`}
                style={{ borderColor }}
              >
                <img 
                  src={node.avatarUrl} 
                  alt={node.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                
                {/* Node overlay label for mobile or non-hover */}
                <div className="absolute inset-0 bg-[#0B0C0E]/20 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Node Title Overlay */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 flex flex-col items-center pointer-events-none">
                <span className={`text-xs font-medium tracking-wide whitespace-nowrap transition-colors ${
                  isSelected ? 'text-[#C5A46E]' : 'text-[#E6E4DF] group-hover:text-[#F3EFEA]'
                }`}>
                  {node.name}
                </span>
                <span className="text-[9px] font-mono text-[#8E9299] whitespace-nowrap">
                  {node.birthYear}{node.deathYear ? ` - ${node.deathYear}` : ' - Present'}
                </span>
              </div>

              {/* Pulse indicator for the primary focused node */}
              {isSelected && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A46E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C5A46E]"></span>
                </span>
              )}
            </motion.div>
          );
        })}

        {/* HUD Controls inside Galaxy Canvas */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 z-30 pointer-events-none">
          <div className="bg-[#0B0C0E]/80 backdrop-blur-md px-4 py-2 rounded-lg border border-[#E6E4DF]/10 pointer-events-auto">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A46E]" />
              <span className="text-[10px] font-mono text-[#E6E4DF] uppercase">
                Active Mapping: {CONSTELLATION_NODES.length} Core Nodes
              </span>
            </div>
          </div>

          <div className="bg-[#0B0C0E]/80 backdrop-blur-md px-4 py-2 rounded-lg border border-[#E6E4DF]/10 pointer-events-auto flex items-center gap-3">
            <Compass className="w-3.5 h-3.5 text-[#8E9299]" />
            <span className="text-[10px] font-mono text-[#8E9299]">
              Drag layout points deactivated to maintain physical historical alignment
            </span>
          </div>
        </div>

      </div>

      {/* Selected Node In-Depth Legacy Drawer */}
      <AnimatePresence mode="wait">
        {selectedNode && (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="mt-8 premium-glass p-8 rounded-xl border border-[#E6E4DF]/10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
          >
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-[#0B0C0E] shrink-0 border border-[#C5A46E]/40">
                <img src={selectedNode.avatarUrl} alt={selectedNode.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#C5A46E] uppercase block tracking-widest">
                  {selectedNode.relation}
                </span>
                <h3 className="font-cinematic text-3xl text-[#F3EFEA] font-light tracking-tight">
                  {selectedNode.name}
                </h3>
                <p className="text-xs font-mono text-[#8E9299] mt-0.5">
                  Lineage: {selectedNode.birthYear} — {selectedNode.deathYear || 'Present'}
                </p>
              </div>
            </div>

            <div className="border-t lg:border-t-0 lg:border-x border-[#E6E4DF]/05 py-4 lg:py-0 lg:px-8">
              <span className="text-[10px] font-mono text-[#8E9299] uppercase block mb-1">
                // Archival Biography
              </span>
              <p className="text-xs md:text-sm text-[#E6E4DF]/90 font-light leading-relaxed italic">
                "{selectedNode.bioSnippet}"
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[#8E9299] uppercase block">Surviving Artifacts</span>
                  <span className="font-cinematic text-2xl text-[#F3EFEA]">
                    {selectedNode.memoryCount} Preserved
                  </span>
                </div>
                <div className="h-8 w-px bg-[#E6E4DF]/10" />
                <div>
                  <span className="text-[10px] font-mono text-[#8E9299] uppercase block">Primary Resonance</span>
                  <span className="text-xs font-mono text-[#C5A46E] uppercase block mt-1">
                    {selectedNode.primaryEmotion}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  ['Warmth', selectedWarmth],
                  [
                    'Connectivity',
                    selectedRelationships.length
                      ? Math.round(selectedRelationships.reduce((sum, relationship) => sum + relationship.connectivity, 0) / selectedRelationships.length)
                      : 0,
                  ],
                  [
                    'Influence',
                    selectedRelationships.length
                      ? Math.round(selectedRelationships.reduce((sum, relationship) => sum + relationship.influence, 0) / selectedRelationships.length)
                      : 0,
                  ],
                ].map(([label, value]) => (
                  <div key={label as string} className="rounded bg-[#0B0C0E]/50 border border-[#E6E4DF]/05 p-2">
                    <span className="text-[9px] font-mono text-[#8E9299] uppercase block">{label}</span>
                    <span className="font-cinematic text-xl text-[#F3EFEA]">{value}%</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  playInteraction('deep');
                  // Filter the Living Archive component for this author or relation!
                  onSelectNodeFilter(selectedNode.name);
                }}
                className="w-full py-2 bg-[#25282E] hover:bg-[#C5A46E] hover:text-[#0B0C0E] text-[#F3EFEA] rounded text-xs font-medium tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>View Author's Archive</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
