export type EmotionType = 'nostalgia' | 'warmth' | 'intimacy' | 'legacy' | 'wonder' | 'solitude' | 'joy';

export interface Memory {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  era: string;
  location: string;
  category: 'audio-reel' | 'polaroid' | 'letter' | 'artifact' | 'cinematic';
  imageUrl: string;
  narrative: string;
  emotion: EmotionType;
  emotionalResonance: number; // 0 to 100
  heartRateSignature?: string; // e.g. "68 BPM"
  author: string;
  relation: string;
  audioDuration?: string;
  tags: string[];
}

export interface ConstellationNode {
  id: string;
  name: string;
  relation: string;
  birthYear: string;
  deathYear?: string;
  memoryCount: number;
  primaryEmotion: EmotionType;
  x: number; // percentage layout
  y: number; // percentage layout
  connections: string[]; // IDs of connected nodes
  avatarUrl: string;
  bioSnippet: string;
}

export interface RelationshipStrength {
  sourceId: string;
  targetId: string;
  warmth: number;
  connectivity: number;
  influence: number;
  evolution: 'deepening' | 'steady' | 'fading' | 'rediscovered';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'Twidix';
  text: string;
  timestamp: string;
  emotionShift?: EmotionType;
  audioWave?: number[]; // Simulating active voice frequency
  memoryConfidence?: {
    percentage: number;
    missingContext: string[];
    reconstructedAssumptions: string[];
  };
  voiceTexture?: {
    pausePattern: string;
    emotionalTone: string;
    certainty: 'soft' | 'tentative' | 'steady';
  };
  memoryDecay?: {
    integrity: number;
    fadedMetadata: string[];
    fragments: string[];
    restorationActions: string[];
  };
  aiTransparency?: {
    reasoning: string;
    confidenceInputs: string[];
    influencedBy: string[];
  };
}

export interface EmotionalMetric {
  month: string;
  nostalgia: number;
  warmth: number;
  legacy: number;
  intimacy: number;
}

export interface EmotionalAgingMetric {
  year: string;
  attachment: number;
  nostalgia: number;
  sadness: number;
  importance: number;
  note: string;
}

export interface LifePhaseChapter {
  id: string;
  phase: 'childhood' | 'teenage' | 'college' | 'career' | 'parenthood' | 'retirement';
  title: string;
  years: string;
  emotionalSignature: string;
  summary: string;
  dominantEmotion: EmotionType;
  resonance: number;
}

export interface LegacyPreservationScore {
  overall: number;
  archiveCompleteness: number;
  emotionalRichness: number;
  generationCoverage: number;
  memoryDiversity: number;
  voicePreservation: number;
  missingGenerations: string[];
}

export interface MemoryRecoveryAction {
  id: string;
  label: string;
  target: 'photo' | 'audio' | 'video' | 'timeline';
  status: 'ready' | 'in-progress' | 'complete';
  confidence: number;
  description: string;
}

export interface LifeInsight {
  id: string;
  label: string;
  value: string;
  reflection: string;
}

export interface DigitalHeir {
  id: string;
  name: string;
  relation: string;
  accessLevel: 'view-only' | 'curator' | 'full-transfer';
  vault: string;
  permissions: string[];
}

export interface PrivateMemoryMode {
  id: string;
  label: string;
  mode: 'secret-vault' | 'emotion-locked' | 'future-only' | 'biometric';
  protectedCount: number;
  description: string;
}

export interface GriefSupportProfile {
  person: string;
  status: 'active' | 'available';
  tone: string;
  remembranceSpace: string;
  safeguards: string[];
}

export interface FamilyContribution {
  id: string;
  contributor: string;
  relation: string;
  memory: string;
  contribution: string;
  type: 'perspective' | 'missing-detail' | 'emotional-context';
}

export interface AmbientMemoryCue {
  id: string;
  date: string;
  label: string;
  reflection: string;
  sensitivity: 'gentle' | 'private' | 'celebratory';
}

export interface AuthenticityCheck {
  id: string;
  artifact: string;
  status: 'verified' | 'needs-review' | 'altered';
  confidence: number;
  signals: string[];
}

export interface OfflineVaultOption {
  id: string;
  label: string;
  status: 'ready' | 'scheduled' | 'encrypted';
  description: string;
}

export interface CulturalPreservationItem {
  id: string;
  category: 'tradition' | 'ritual' | 'dialect' | 'story' | 'recipe' | 'ancestry';
  title: string;
  steward: string;
  description: string;
}
