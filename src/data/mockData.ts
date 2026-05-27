import {
  AmbientMemoryCue,
  AuthenticityCheck,
  ChatMessage,
  ConstellationNode,
  CulturalPreservationItem,
  DigitalHeir,
  EmotionalAgingMetric,
  EmotionalMetric,
  FamilyContribution,
  GriefSupportProfile,
  LegacyPreservationScore,
  LifeInsight,
  LifePhaseChapter,
  Memory,
  MemoryRecoveryAction,
  OfflineVaultOption,
  PrivateMemoryMode,
  RelationshipStrength,
} from '../types';

export const INITIAL_MEMORIES: Memory[] = [
  {
    id: 'mem-1',
    title: 'The Golden Autumn in Vienna',
    subtitle: 'A single unrepeatable afternoon preserved in silver gelatin.',
    date: 'October 14, 1978',
    era: 'Late 1970s',
    location: 'Vienna, Austria',
    category: 'polaroid',
    imageUrl:
      'https://images.pexels.com/photos/6565243/pexels-photo-6565243.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    narrative:
      'My grandfather always held this photograph with a slightly trembling thumb. He said the light that afternoon had a specific density—like liquid amber—that he never saw again. They had just decided to move across the Atlantic, leaving behind their ancestral home.',
    emotion: 'nostalgia',
    emotionalResonance: 94,
    heartRateSignature: '62 BPM',
    author: 'Elena Vance',
    relation: 'Grandmother',
    tags: ['Emigration', 'Autumn', 'Vienna', 'Kodachrome'],
  },
  {
    id: 'mem-2',
    title: 'The Last Gramophone Record',
    subtitle: 'Dancing before the early morning train to the northern ports.',
    date: 'August 22, 1964',
    era: 'Mid 1960s',
    location: 'Marseille, France',
    category: 'cinematic',
    imageUrl:
      'https://images.pexels.com/photos/8090451/pexels-photo-8090451.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    narrative:
      'The needle scratched a profound rhythm into the quiet room. Neither of them spoke of the upcoming separation. Instead, they moved in synchronized silence, allowing the warmth of the worn velvet couch and the heavy air to etch itself into their nervous systems.',
    emotion: 'intimacy',
    emotionalResonance: 98,
    heartRateSignature: '74 BPM',
    author: 'Julian Thorne',
    relation: 'Grandfather',
    audioDuration: '03:12',
    tags: ['Music', 'Farewells', 'Marseille', 'Silence'],
  },
  {
    id: 'mem-3',
    title: 'Midnight Cartography',
    subtitle: 'Reading maps of forgotten merchant routes by bedside lamp.',
    date: 'November 03, 1991',
    era: 'Early 1990s',
    location: 'Edinburgh, Scotland',
    category: 'artifact',
    imageUrl:
      'https://images.pexels.com/photos/10387562/pexels-photo-10387562.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    narrative:
      'He would wake me up just after the floorboards settled. "Look at the ink," he would whisper. We traced the old sea paths where our ancestors once transported wool and salt. In those hours, the ceiling disappeared, replaced by infinite constellations of human curiosity.',
    emotion: 'wonder',
    emotionalResonance: 89,
    heartRateSignature: '58 BPM',
    author: 'Arthur Pendelton',
    relation: 'Great-Uncle',
    tags: ['Childhood', 'Maps', 'Lineage', 'Whispers'],
  },
  {
    id: 'mem-4',
    title: 'The Eve of the Great Crossing',
    subtitle: 'Two minds looking toward an unwritten horizon.',
    date: 'May 11, 1956',
    era: '1950s',
    location: 'Bremerhaven, Germany',
    category: 'letter',
    imageUrl:
      'https://images.pexels.com/photos/6041623/pexels-photo-6041623.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    narrative:
      'Found tucked inside a leather-bound copy of Rilke. The paper still holds the faint aroma of dried lavender and engine oil. "We carry nothing but our names and the rhythm of our mother tongue," she wrote on the final evening before the steamer departed.',
    emotion: 'legacy',
    emotionalResonance: 91,
    author: 'Clara Mendel',
    relation: 'Great-Grandmother',
    tags: ['Letters', 'Transatlantic', 'Courage'],
  },
  {
    id: 'mem-5',
    title: 'Letters from the Adriatic Coast',
    subtitle: 'Faded ink capturing the scent of salt and pine forests.',
    date: 'July 29, 1983',
    era: '1980s',
    location: 'Dubrovnik, Croatia',
    category: 'polaroid',
    imageUrl:
      'https://images.pexels.com/photos/4115552/pexels-photo-4115552.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    narrative:
      'A bundle of four instantly developed frames. The emulsion has cracked slightly in the lower left corner, creating a beautiful golden vein. These were sent week by week to reassure the family that the seaside air was healing his lungs.',
    emotion: 'warmth',
    emotionalResonance: 85,
    author: 'Marcus Vance',
    relation: 'Father',
    tags: ['Summer', 'Recovery', 'Adriatic', 'Polaroid'],
  },
  {
    id: 'mem-6',
    title: 'Inheritance of the Silent Seasons',
    subtitle: 'Three generations gathered around the physical weight of time.',
    date: 'December 24, 2004',
    era: '2000s',
    location: 'Quebec, Canada',
    category: 'cinematic',
    imageUrl:
      'https://images.pexels.com/photos/8848777/pexels-photo-8848777.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    narrative:
      'The heavy binding of the family ledger was only opened on the winter solstice. As each hand turned the stiff cotton pages, you could track the subtle evolution of our facial bone structures—the same brow line recurring across a span of 140 years.',
    emotion: 'legacy',
    emotionalResonance: 96,
    heartRateSignature: '65 BPM',
    author: 'Sarah Pendelton',
    relation: 'Mother',
    tags: ['Generations', 'Winter', 'Archives', 'Lineage'],
  },
  {
    id: 'mem-7',
    title: 'Super 8mm: Summer in Provence',
    subtitle: 'Light leaking through the mechanical shutter of an amateur lens.',
    date: 'June 18, 1972',
    era: 'Early 1970s',
    location: 'Aix-en-Provence, France',
    category: 'audio-reel',
    imageUrl:
      'https://images.pexels.com/photos/34084909/pexels-photo-34084909.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    narrative:
      'Eighteen seconds of overexposed footage showing my mother spinning in a field of wild fennel. The mechanical whir of the projector is permanently imprinted on my childhood memory, acting as a direct conduit to an era before digital permanence.',
    emotion: 'joy',
    emotionalResonance: 93,
    audioDuration: '00:18',
    author: 'Henri Laurent',
    relation: 'Grandfather',
    tags: ['Super8', 'Film Reel', 'Provence', 'Sunlight'],
  },
  {
    id: 'mem-8',
    title: "Grandfather's Architectural Drafts",
    subtitle: 'The precise geometries of a home that was never constructed.',
    date: 'March 04, 1951',
    era: '1950s',
    location: 'Chicago, USA',
    category: 'artifact',
    imageUrl:
      'https://images.pexels.com/photos/28941717/pexels-photo-28941717.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    narrative:
      'Drawn with a 2H graphite pencil on heavy vellum. He spent three winters designing this sanctuary. Though the foundation was never poured, examining these elevations feels like walking through the rooms of his ultimate, uncompromised mind.',
    emotion: 'solitude',
    emotionalResonance: 88,
    author: 'Julian Thorne',
    relation: 'Grandfather',
    tags: ['Architecture', 'Blueprints', 'Dreams', 'Graphite'],
  },
  {
    id: 'MEM001',
    title: 'Durga Puja 1998',
    subtitle: 'A vibrant Durga Puja celebration in Bagbazar, Kolkata.',
    date: '1998-10-05',
    era: '1990s',
    location: 'Bagbazar, Kolkata',
    category: 'polaroid',
    imageUrl:
      'https://images.pexels.com/photos/15610037/pexels-photo-15610037/free-photo-of-idol-of-hindu-goddess-durga.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    narrative:
      'A vibrant Durga Puja celebration where three generations gathered together for cultural rituals and family bonding.',
    emotion: 'nostalgia',
    emotionalResonance: 96,
    author: 'Anirban Chatterjee',
    relation: 'Father',
    tags: ['festival', 'family', 'durga puja', 'tradition', 'nostalgia'],
  },
  {
    id: 'MEM002',
    title: 'First Bharatanatyam Performance',
    subtitle: 'An emotional debut Bharatanatyam performance in Thrissur, Kerala.',
    date: '2001-08-19',
    era: '2000s',
    location: 'Thrissur, Kerala',
    category: 'cinematic',
    imageUrl:
      'https://images.pexels.com/photos/9890346/pexels-photo-9890346.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    narrative:
      'An emotional debut Bharatanatyam performance filled with nervous excitement and family pride.',
    emotion: 'joy',
    emotionalResonance: 91,
    author: 'Meera Nair',
    relation: 'Classical Dancer',
    tags: ['dance', 'performance', 'culture', 'achievement'],
  },
  {
    id: 'MEM003',
    title: 'Farewell Before Deployment',
    subtitle: 'An emotionally intense farewell at Jaipur Railway Station.',
    date: '2014-03-11',
    era: '2010s',
    location: 'Jaipur Railway Station',
    category: 'letter',
    imageUrl:
      'https://images.pexels.com/photos/163975/pexels-photo-163975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    narrative:
      'An emotionally intense farewell moment before military deployment, capturing sacrifice and love.',
    emotion: 'intimacy',
    emotionalResonance: 93,
    author: 'Rajveer Singh Rathore',
    relation: 'Army Officer',
    tags: ['army', 'farewell', 'family', 'emotion', 'sacrifice'],
  },
];

export const CONSTELLATION_NODES: ConstellationNode[] = [
  {
    id: 'node-1',
    name: 'Julian Thorne',
    relation: 'Patriarch • Grandfather',
    birthYear: '1912',
    deathYear: '1998',
    memoryCount: 14,
    primaryEmotion: 'intimacy',
    x: 50,
    y: 25,
    connections: ['node-2', 'node-3', 'node-4'],
    avatarUrl:
      'https://images.pexels.com/photos/8090451/pexels-photo-8090451.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
    bioSnippet:
      'Architect and amateur cellist. Believed that spaces hold the emotional frequency of their inhabitants.',
  },
  {
    id: 'node-2',
    name: 'Elena Vance',
    relation: 'Matriarch • Grandmother',
    birthYear: '1918',
    deathYear: '2005',
    memoryCount: 19,
    primaryEmotion: 'nostalgia',
    x: 32,
    y: 42,
    connections: ['node-1', 'node-5', 'node-6'],
    avatarUrl:
      'https://images.pexels.com/photos/6565243/pexels-photo-6565243.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
    bioSnippet:
      'Botanist who cataloged the flora of the old empire. Kept meticulous physical diaries written in violet ink.',
  },
  {
    id: 'node-3',
    name: 'Arthur Pendelton',
    relation: 'Great-Uncle',
    birthYear: '1924',
    deathYear: '2011',
    memoryCount: 8,
    primaryEmotion: 'wonder',
    x: 68,
    y: 38,
    connections: ['node-1', 'node-7'],
    avatarUrl:
      'https://images.pexels.com/photos/10387562/pexels-photo-10387562.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
    bioSnippet:
      'Merchant marine and astronomer. Left behind a collection of brass navigation instruments and starry maps.',
  },
  {
    id: 'node-4',
    name: 'Clara Mendel',
    relation: 'Great-Grandmother',
    birthYear: '1890',
    deathYear: '1973',
    memoryCount: 11,
    primaryEmotion: 'legacy',
    x: 55,
    y: 65,
    connections: ['node-1', 'node-5'],
    avatarUrl:
      'https://images.pexels.com/photos/6041623/pexels-photo-6041623.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
    bioSnippet:
      'Emigrated alone at age twenty. Her original steamer trunk remains the centerpiece of the family archive.',
  },
  {
    id: 'node-5',
    name: 'Marcus Vance',
    relation: 'Father',
    birthYear: '1948',
    memoryCount: 22,
    primaryEmotion: 'warmth',
    x: 25,
    y: 68,
    connections: ['node-2', 'node-4', 'node-8'],
    avatarUrl:
      'https://images.pexels.com/photos/4115552/pexels-photo-4115552.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
    bioSnippet:
      'Photographer and conservator. Documented the final analog decades before the advent of digital media.',
  },
  {
    id: 'node-6',
    name: 'Sarah Pendelton',
    relation: 'Mother',
    birthYear: '1952',
    memoryCount: 17,
    primaryEmotion: 'legacy',
    x: 75,
    y: 70,
    connections: ['node-2', 'node-8'],
    avatarUrl:
      'https://images.pexels.com/photos/8848777/pexels-photo-8848777.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
    bioSnippet:
      'Curator of the physical archives. Transcribed over four thousand pages of ancestral correspondence.',
  },
  {
    id: 'node-7',
    name: 'Henri Laurent',
    relation: 'Grandfather (Maternal)',
    birthYear: '1920',
    deathYear: '1994',
    memoryCount: 9,
    primaryEmotion: 'joy',
    x: 85,
    y: 45,
    connections: ['node-3'],
    avatarUrl:
      'https://images.pexels.com/photos/34084909/pexels-photo-34084909.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
    bioSnippet:
      'Cinema projectionist in southern France. Captured everyday poetry on 8mm Kodak reversal film.',
  },
  {
    id: 'node-8',
    name: 'You (The Custodian)',
    relation: 'Current Generation',
    birthYear: '1988',
    memoryCount: 5,
    primaryEmotion: 'intimacy',
    x: 50,
    y: 90,
    connections: ['node-5', 'node-6'],
    avatarUrl:
      'https://images.pexels.com/photos/33362148/pexels-photo-33362148.png?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
    bioSnippet:
      'Synthesizing physical heritage with digital permanence. Creating the eternal sanctuary.',
  },
  {
    id: 'USR001',
    name: 'Anirban Chatterjee',
    relation: 'History Professor',
    birthYear: '1968',
    memoryCount: 1,
    primaryEmotion: 'nostalgia',
    x: 50,
    y: 15,
    connections: ['USR002', 'USR003'],
    avatarUrl:
      'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bioSnippet:
      'A passionate history professor who documented family traditions and old Bengali festivals.',
  },
  {
    id: 'USR002',
    name: 'Meera Nair',
    relation: 'Classical Dancer',
    birthYear: '1979',
    memoryCount: 1,
    primaryEmotion: 'warmth',
    x: 30,
    y: 80,
    connections: ['USR001'],
    avatarUrl:
      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bioSnippet:
      'A Bharatanatyam dancer preserving performances, emotions, and family traditions.',
  },
  {
    id: 'USR003',
    name: 'Rajveer Singh Rathore',
    relation: 'Army Officer',
    birthYear: '1985',
    memoryCount: 1,
    primaryEmotion: 'legacy',
    x: 70,
    y: 80,
    connections: ['USR001'],
    avatarUrl:
      'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bioSnippet:
      'Army officer documenting family sacrifices and journeys across India.',
  },
];

export const RELATIONSHIP_STRENGTHS: RelationshipStrength[] = [
  {
    sourceId: 'node-1',
    targetId: 'node-2',
    warmth: 94,
    connectivity: 91,
    influence: 88,
    evolution: 'deepening',
  },
  {
    sourceId: 'node-1',
    targetId: 'node-4',
    warmth: 86,
    connectivity: 79,
    influence: 92,
    evolution: 'rediscovered',
  },
  {
    sourceId: 'node-2',
    targetId: 'node-5',
    warmth: 89,
    connectivity: 84,
    influence: 77,
    evolution: 'steady',
  },
  {
    sourceId: 'node-4',
    targetId: 'node-5',
    warmth: 73,
    connectivity: 68,
    influence: 81,
    evolution: 'fading',
  },
  {
    sourceId: 'node-5',
    targetId: 'node-8',
    warmth: 97,
    connectivity: 93,
    influence: 95,
    evolution: 'deepening',
  },
  {
    sourceId: 'node-6',
    targetId: 'node-8',
    warmth: 92,
    connectivity: 96,
    influence: 98,
    evolution: 'deepening',
  },
  {
    sourceId: 'node-3',
    targetId: 'node-7',
    warmth: 67,
    connectivity: 61,
    influence: 70,
    evolution: 'rediscovered',
  },
  {
    sourceId: 'USR001',
    targetId: 'USR002',
    warmth: 80,
    connectivity: 75,
    influence: 85,
    evolution: 'steady',
  },
  {
    sourceId: 'USR001',
    targetId: 'USR003',
    warmth: 78,
    connectivity: 82,
    influence: 88,
    evolution: 'steady',
  },
];

export const EMOTIONAL_METRICS: EmotionalMetric[] = [
  { month: 'Jan', nostalgia: 82, warmth: 64, legacy: 91, intimacy: 70 },
  { month: 'Feb', nostalgia: 88, warmth: 70, legacy: 89, intimacy: 75 },
  { month: 'Mar', nostalgia: 75, warmth: 85, legacy: 93, intimacy: 82 },
  { month: 'Apr', nostalgia: 91, warmth: 88, legacy: 94, intimacy: 89 },
  { month: 'May', nostalgia: 95, warmth: 92, legacy: 96, intimacy: 94 },
  { month: 'Jun', nostalgia: 89, warmth: 96, legacy: 98, intimacy: 97 },
];

export const EMOTIONAL_AGING_METRICS: EmotionalAgingMetric[] = [
  {
    year: '1956',
    attachment: 88,
    nostalgia: 34,
    sadness: 81,
    importance: 72,
    note:
      'Immediate separation dominates the archive; grief is vivid and factual details remain sharp.',
  },
  {
    year: '1964',
    attachment: 91,
    nostalgia: 48,
    sadness: 73,
    importance: 79,
    note: 'Farewell artifacts begin shifting from pain into ritual significance.',
  },
  {
    year: '1978',
    attachment: 86,
    nostalgia: 67,
    sadness: 58,
    importance: 84,
    note:
      'Distance softens the wound; remembered light becomes stronger than sequence accuracy.',
  },
  {
    year: '1991',
    attachment: 93,
    nostalgia: 82,
    sadness: 39,
    importance: 91,
    note:
      'Family retellings compress timelines, but emotional meaning becomes more stable.',
  },
  {
    year: '2004',
    attachment: 96,
    nostalgia: 91,
    sadness: 24,
    importance: 96,
    note:
      'The memory ages into inheritance; sadness recedes while custodial importance peaks.',
  },
  {
    year: '2026',
    attachment: 94,
    nostalgia: 96,
    sadness: 18,
    importance: 98,
    note:
      'AI synthesis detects high symbolic value, low acute grief, and strong lineage continuity.',
  },
];

export const LIFE_PHASE_CHAPTERS: LifePhaseChapter[] = [
  {
    id: 'phase-childhood',
    phase: 'childhood',
    title: 'Your Wonder Years',
    years: '1972 - 1983',
    emotionalSignature: 'curiosity, motion, sensory imprint',
    summary:
      'The archive remembers this period through light, movement, and adults speaking softly nearby. These memories hold less exact chronology, but unusually vivid atmosphere.',
    dominantEmotion: 'wonder',
    resonance: 89,
  },
  {
    id: 'phase-teenage',
    phase: 'teenage',
    title: 'Your Becoming Years',
    years: '1984 - 1990',
    emotionalSignature: 'privacy, restlessness, first separation',
    summary:
      'A quieter chapter with fewer artifacts. The missingness itself is meaningful: fewer preserved objects, more emotional privacy, and a growing wish to define yourself.',
    dominantEmotion: 'solitude',
    resonance: 72,
  },
  {
    id: 'phase-college',
    phase: 'college',
    title: 'Your Exploration Years',
    years: '1991 - 1997',
    emotionalSignature: 'maps, mentors, widening worlds',
    summary:
      'Travel, study, and inherited curiosity become visible here. The archive sees strong intellectual warmth around Arthur and the merchant-route maps.',
    dominantEmotion: 'wonder',
    resonance: 86,
  },
  {
    id: 'phase-career',
    phase: 'career',
    title: 'Your Building Era',
    years: '1998 - 2008',
    emotionalSignature: 'responsibility, craft, continuity',
    summary:
      'This phase gathers practical ambition around preservation. The memories become less episodic and more architectural, as if life started organizing itself into rooms.',
    dominantEmotion: 'legacy',
    resonance: 91,
  },
  {
    id: 'phase-parenthood',
    phase: 'parenthood',
    title: 'Your Family Era',
    years: '2009 - 2021',
    emotionalSignature: 'care, repetition, inherited rituals',
    summary:
      'The emotional center shifts toward stewardship. Small repeated moments matter more than dramatic events, and family language becomes the archive’s strongest signal.',
    dominantEmotion: 'warmth',
    resonance: 94,
  },
  {
    id: 'phase-retirement',
    phase: 'retirement',
    title: 'Your Custodian Years',
    years: '2022 - Present',
    emotionalSignature: 'reflection, repair, transmission',
    summary:
      'The current chapter is about giving memories a future. The system detects high legacy intent, careful restoration behavior, and a wish to leave the archive usable for others.',
    dominantEmotion: 'intimacy',
    resonance: 96,
  },
  {
    id: 'phase-indian-1998',
    phase: 'career',
    title: 'Peak of Joy',
    years: '1998',
    emotionalSignature: 'High joy during family festivals.',
    summary:
      'The year 1998 was marked by a dominant emotion of Joy, with a strength of 91, likely centered around the Durga Puja celebration.',
    dominantEmotion: 'joy',
    resonance: 91,
  },
  {
    id: 'phase-indian-2001',
    phase: 'career',
    title: 'A Milestone of Achievement',
    years: '2001',
    emotionalSignature: 'Confidence and family pride.',
    summary:
      'A significant personal achievement in 2001, Meera Nair\'s debut performance, brought a strong sense of joy and accomplishment.',
    dominantEmotion: 'joy',
    resonance: 88,
  },
  {
    id: 'phase-indian-2014',
    phase: 'career',
    title: 'A Moment of Sacrifice',
    years: '2014',
    emotionalSignature: 'A blend of love, anxiety, and hope.',
    summary:
      'A year of profound emotional intensity, marked by Rajveer Singh Rathore\'s deployment, highlighting themes of sacrifice and deep family love.',
    dominantEmotion: 'legacy',
    resonance: 84,
  },
];

export const LEGACY_PRESERVATION_SCORE: LegacyPreservationScore = {
  overall: 87,
  archiveCompleteness: 82,
  emotionalRichness: 94,
  generationCoverage: 78,
  memoryDiversity: 91,
  voicePreservation: 73,
  missingGenerations: [
    'Paternal great-grandparents',
    'Early teenage years',
    'Maternal cousins after 1988',
  ],
};

export const MEMORY_RECOVERY_ACTIONS: MemoryRecoveryAction[] = [
  {
    id: 'recover-photo',
    label: 'Restore and Color Balance Faded Photos',
    target: 'photo',
    status: 'ready',
    confidence: 88,
    description:
      'Repairs emulsion fading, restores edge contrast, and gently colorizes black-and-white scans.',
  },
  {
    id: 'recover-audio',
    label: 'Enhance Broken Recordings',
    target: 'audio',
    status: 'in-progress',
    confidence: 74,
    description:
      'Reduces hiss, isolates voices, and reconstructs clipped pauses without inventing speech.',
  },
  {
    id: 'recover-video',
    label: 'Stabilize Old Film and Blurry Video',
    target: 'video',
    status: 'ready',
    confidence: 81,
    description:
      'Stabilizes shake, improves frame clarity, and preserves analog grain instead of over-smoothing.',
  },
  {
    id: 'recover-timeline',
    label: 'Reconstruct Damaged Timelines',
    target: 'timeline',
    status: 'complete',
    confidence: 69,
    description:
      'Links letters, locations, and repeated names into a probable sequence with uncertainty clearly marked.',
  },
  {
    id: 'RST001',
    label: 'Old Photograph Restoration (Color Fade)',
    target: 'photo',
    status: 'complete',
    confidence: 91,
    description: 'Enhanced facial clarity and restored color tones.',
  },
];

export const LIFE_INSIGHTS: LifeInsight[] = [
  {
    id: 'happiest-period',
    label: 'Gentlest Joy',
    value: 'Early 1970s Provence',
    reflection:
      'The happiest signal is not loud. It appears in sunlight, motion, and the repeated return to summer imagery.',
  },
  {
    id: 'active-years',
    label: 'Most Active Years',
    value: '1978 - 1983',
    reflection:
      'Travel and correspondence cluster here, suggesting a life widening through letters, coastlines, and relocation.',
  },
  {
    id: 'friendship',
    label: 'Strongest Friendship Pattern',
    value: 'Arthur and Henri',
    reflection:
      'Their connection reads as shared curiosity rather than constant presence: maps, film, routes, and patient attention.',
  },
  {
    id: 'growth',
    label: 'Emotional Growth',
    value: 'From departure to stewardship',
    reflection:
      'Across the archive, grief gradually becomes care. The story does not become simpler; it becomes more generous.',
  },
];

export const DIGITAL_HEIRS: DigitalHeir[] = [
  {
    id: 'heir-1',
    name: 'Maya Vance',
    relation: 'Daughter',
    accessLevel: 'curator',
    vault: 'Family Letters and Voice Notes',
    permissions: [
      'approve restorations',
      'add annotations',
      'share selected memories',
    ],
  },
  {
    id: 'heir-2',
    name: 'Jonah Pendelton',
    relation: 'Nephew',
    accessLevel: 'view-only',
    vault: 'Travel Archive',
    permissions: ['view memories', 'download approved media'],
  },
  {
    id: 'heir-3',
    name: 'Clara Vance Trust',
    relation: 'Family Vault',
    accessLevel: 'full-transfer',
    vault: 'Complete Sanctuary Transfer',
    permissions: [
      'inherit archive',
      'manage heirs',
      'preserve original files',
    ],
  },
  {
    id: 'heir-4',
    name: 'Ritwik Chatterjee',
    relation: 'Son',
    accessLevel: 'full-transfer',
    vault: 'Anirban Chatterjee Legacy',
    permissions: ['full access to vault'],
  },
  {
    id: 'heir-5',
    name: 'Priya Rathore',
    relation: 'Spouse',
    accessLevel: 'view-only',
    vault: 'Rajveer S. Rathore Archive',
    permissions: ['view only access'],
  },
];

export const PRIVATE_MEMORY_MODES: PrivateMemoryMode[] = [
  {
    id: 'private-secret',
    label: 'Secret Vault',
    mode: 'secret-vault',
    protectedCount: 12,
    description:
      'Hidden memories visible only to approved custodians with explicit vault access.',
  },
  {
    id: 'private-emotion',
    label: 'Emotion-Locked',
    mode: 'emotion-locked',
    protectedCount: 7,
    description:
      'Sensitive memories open only after a gentle confirmation step and supportive context.',
  },
  {
    id: 'private-future',
    label: 'Future-Only',
    mode: 'future-only',
    protectedCount: 5,
    description:
      'Letters, recordings, and wishes held until a chosen year, age, or family milestone.',
  },
  {
    id: 'private-biometric',
    label: 'Biometric Protected',
    mode: 'biometric',
    protectedCount: 3,
    description:
      'Highest-sensitivity records reserved for local device authentication.',
  },
];

export const GRIEF_SUPPORT_PROFILES: GriefSupportProfile[] = [
  {
    person: 'Julian Thorne',
    status: 'active',
    tone: 'slower pacing, fewer prompts, no celebratory motion',
    remembranceSpace: 'The Marseille Listening Room',
    safeguards: [
      'No impersonation of the deceased',
      'Gentle language around final records',
      'Anniversary prompts stay opt-in',
    ],
  },
  {
    person: 'Clara Mendel',
    status: 'available',
    tone: 'respectful archival warmth',
    remembranceSpace: 'The Crossing Letters',
    safeguards: [
      'Keeps uncertain details marked',
      'Preserves original wording',
      'Avoids speculative closure',
    ],
  },
  {
    person: 'Arthur Pendelton',
    status: 'available',
    tone: 'adventurous, curious, gentle wonder',
    remembranceSpace: 'The Midnight Cartography',
    safeguards: [
      'Focus on wonder and discovery',
      'Avoids finality, emphasizes legacy of curiosity',
      'Highlights connections to astronomy and sea travel',
    ],
  },
];

export const FAMILY_CONTRIBUTIONS: FamilyContribution[] = [
  {
    id: 'contrib-1',
    contributor: 'Maya Vance',
    relation: 'Daughter',
    memory: 'The Golden Autumn in Vienna',
    contribution:
      'She remembers Elena calling that light gentle, not golden, which slightly changes the emotional reading.',
    type: 'emotional-context',
  },
  {
    id: 'contrib-2',
    contributor: 'Jonah Pendelton',
    relation: 'Nephew',
    memory: 'Midnight Cartography',
    contribution:
      'He added that the bedside map was kept folded behind a brass compass case.',
    type: 'missing-detail',
  },
  {
    id: 'contrib-3',
    contributor: 'Sarah Pendelton',
    relation: 'Mother',
    memory: 'Inheritance of the Silent Seasons',
    contribution:
      'She says the ledger was opened after dinner, not before, and everyone grew quiet at the same page.',
    type: 'perspective',
  },
];

export const AMBIENT_MEMORY_CUES: AmbientMemoryCue[] = [
  {
    id: 'cue-1',
    date: 'May 26',
    label: 'Late-spring archive review',
    reflection:
      'This week often surfaces travel memories and letters written before departures.',
    sensitivity: 'gentle',
  },
  {
    id: 'cue-2',
    date: 'August 22',
    label: 'Marseille record anniversary',
    reflection:
      'Today marks another year since the gramophone recording. Twidix can keep the interface quiet if you visit it.',
    sensitivity: 'private',
  },
  {
    id: 'cue-3',
    date: 'October 14',
    label: 'Vienna photograph anniversary',
    reflection:
      'A warm prompt may be appropriate: this memory tends to carry gratitude more than grief.',
    sensitivity: 'celebratory',
  },
  {
    id: 'REC001',
    date: 'October 5',
    label: 'Anniversary: Durga Puja 1998',
    reflection:
      'Today marks 26 years since your memorable Durga Puja celebration.',
    sensitivity: 'celebratory',
  },
];

export const AUTHENTICITY_CHECKS: AuthenticityCheck[] = [
  {
    id: 'auth-1',
    artifact: 'The Golden Autumn in Vienna',
    status: 'verified',
    confidence: 92,
    signals: [
      'EXIF-era scan pattern is consistent',
      'Paper grain matches family album set',
      'No face manipulation detected',
    ],
  },
  {
    id: 'auth-2',
    artifact: 'The Last Gramophone Record',
    status: 'needs-review',
    confidence: 71,
    signals: [
      'Audio splice detected near final seven seconds',
      'Voice contour remains internally consistent',
      'Catalog label matches handwriting sample',
    ],
  },
  {
    id: 'auth-3',
    artifact: 'Super 8mm: Summer in Provence',
    status: 'verified',
    confidence: 86,
    signals: [
      'Frame cadence matches Super 8 capture',
      'No synthetic interpolation artifacts detected',
      'Color fade is chemically plausible',
    ],
  },
];

export const OFFLINE_VAULT_OPTIONS: OfflineVaultOption[] = [
  {
    id: 'offline-1',
    label: 'Encrypted Local Backup',
    status: 'encrypted',
    description:
      'Stores a device-local archive copy with recovery keys held by approved heirs.',
  },
  {
    id: 'offline-2',
    label: 'Offline Memory Capsules',
    status: 'scheduled',
    description:
      'Bundles selected letters, audio, and notes into dated family capsules.',
  },
  {
    id: 'offline-3',
    label: 'Physical Archive Export',
    status: 'ready',
    description:
      'Prepares print indexes, QR references, and checksum manifests for a non-cloud archive.',
  },
];

export const CULTURAL_PRESERVATION_ITEMS: CulturalPreservationItem[] = [
  {
    id: 'culture-1',
    category: 'ritual',
    title: 'Winter Ledger Evening',
    steward: 'Sarah Pendelton',
    description:
      'The family practice of opening the ledger near the winter solstice and reading one page aloud.',
  },
  {
    id: 'culture-2',
    category: 'dialect',
    title: 'Mother Tongue Phrases',
    steward: 'Clara Mendel',
    description:
      'Short migration-era expressions preserved with pronunciation notes and emotional context.',
  },
  {
    id: 'culture-3',
    category: 'recipe',
    title: 'Adriatic Recovery Soup',
    steward: 'Marcus Vance',
    description:
      'A family recipe tied to recovery letters from the coast, with ingredient substitutions by decade.',
  },
  {
    id: 'culture-4',
    category: 'story',
    title: 'Merchant Route Bedtime Maps',
    steward: 'Arthur Pendelton',
    description:
      'A recurring oral story pattern about wool, salt, and night navigation.',
  },
  {
    id: 'culture-indian-1',
    category: 'ritual',
    title: 'Durga Puja',
    steward: 'Anirban Chatterjee',
    description:
      'A major Hindu festival celebrating the goddess Durga, preserved by the Chatterjee family.',
  },
  {
    id: 'culture-indian-2',
    category: 'tradition',
    title: 'Poila Boishakh',
    steward: 'Anirban Chatterjee',
    description:
      'The celebration of the Bengali New Year, a core family tradition.',
  },
  {
    id: 'culture-indian-3',
    category: 'recipe',
    title: 'Family Recipe Archive',
    steward: 'Anirban Chatterjee',
    description:
      'An archive of family recipes passed down through generations.',
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'Twidix' as const,
    text:
      "Welcome back. I have been quietly resting in the archives. I noticed you spent time reviewing Julian's Marseille records from 1964. Would you like to hear the unedited ambient audio from that morning, or explore the letters Clara sent to him?",
    timestamp: 'Just now',
    emotionShift: 'intimacy' as const,
    audioWave: [
      12, 45, 21, 67, 89, 43, 23, 65, 78, 90, 54, 32, 12, 8, 45, 67, 34, 21,
    ],
    memoryConfidence: {
      percentage: 73,
      missingContext: [
        'No complete room recording survives',
        "Clara's reply letter is undated",
      ],
      reconstructedAssumptions: [
        'Marseille records are being linked by handwriting cadence and catalog timing',
      ],
    },
    voiceTexture: {
      pausePattern: 'brief reflective pauses before uncertain claims',
      emotionalTone: 'soft archival warmth',
      certainty: 'tentative' as const,
    },
    memoryDecay: {
      integrity: 64,
      fadedMetadata: [
        'Room layout is incomplete',
        'Ambient voices are partially clipped',
      ],
      fragments: [
        'record needle drag',
        'two handwritten catalog marks',
        'a reference to morning light',
      ],
      restorationActions: [
        'stabilized audio hiss',
        'reconstructed likely sequence from catalog timing',
      ],
    },
    aiTransparency: {
      reasoning:
        'Twidix connected recent archive activity with Julian and Clara records, then softened the prompt because the underlying audio is incomplete.',
      confidenceInputs: [
        'surviving catalog marks',
        'partial room audio',
        'Clara correspondence references',
      ],
      influencedBy: ['The Last Gramophone Record', 'The Eve of the Great Crossing'],
    },
  },
  {
    id: 'msg-2',
    sender: 'user' as const,
    text: 'Show my happiest family festival memories',
    timestamp: '2 mins ago',
  },
  {
    id: 'msg-3',
    sender: 'Twidix' as const,
    text:
      "Of course. The 'Durga Puja 1998' memory has a joy score of 91 and high nostalgia. It seems to be a very cherished moment.",
    timestamp: '1 min ago',
    emotionShift: 'joy' as const,
  },
  {
    id: 'msg-4',
    sender: 'user' as const,
    text: 'Find emotional moments before military deployment',
    timestamp: '30 secs ago',
  },
  {
    id: 'msg-5',
    sender: 'Twidix' as const,
    text:
      "I've found the 'Farewell Before Deployment' memory. It has a very high 'love' emotional signature of 93. It's a powerful memory of sacrifice and family bonds.",
    timestamp: 'Just now',
    emotionShift: 'intimacy' as const,
  },
];

// New data exports
export const USER_LEGACY_SCORES: any[] = [
  {
    user_id: 'USR001',
    legacy_preservation_score: 89,
    voice_preservation_score: 73,
    family_connection_score: 91,
    cultural_preservation_score: 97,
    missing_memory_risk: 'Low',
  },
  {
    user_id: 'USR002',
    legacy_preservation_score: 93,
    voice_preservation_score: 81,
    family_connection_score: 88,
    cultural_preservation_score: 99,
    missing_memory_risk: 'Very Low',
  },
];

export const TIME_CAPSULES: any[] = [
  {
    capsule_id: 'CAP001',
    user_id: 'USR002',
    title: 'Message for Future Daughter',
    created_on: '2022-01-11',
    unlock_date: '2035-01-11',
    capsule_type: 'Video + Letter',
    emotional_intensity: 94,
    privacy_mode: 'Private Family Access',
  },
];
