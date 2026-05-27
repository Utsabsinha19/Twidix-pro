import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundContextType {
  isMuted: boolean;
  toggleSound: () => void;
  playInteraction: (type: 'hover' | 'select' | 'deep' | 'whisper' | 'confirm' | 'alert' | 'transition') => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: true,
  toggleSound: () => {},
  playInteraction: () => {},
});

export const useSound = () => useContext(SoundContext);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const activeOscsRef = useRef<OscillatorNode[]>([]);

  // Initialize Audio Context on demand
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      
      // Create master ambient gain
      const gainNode = audioCtxRef.current.createGain();
      gainNode.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      gainNode.connect(audioCtxRef.current.destination);
      ambientGainRef.current = gainNode;

      // Start a complex, incredibly subtle museum ambient hum
      // Layer 1: Low deep room tone
      const osc1 = audioCtxRef.current.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(73.42, audioCtxRef.current.currentTime); // D2

      // Layer 2: Warm mid ethereal tone
      const osc2 = audioCtxRef.current.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(110, audioCtxRef.current.currentTime); // A2

      // Layer 3: High faint harmonic
      const osc3 = audioCtxRef.current.createOscillator();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(220, audioCtxRef.current.currentTime); // A3

      // Filter to keep it deeply cinematic and warm
      const filter = audioCtxRef.current.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, audioCtxRef.current.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(gainNode);

      osc1.start();
      osc2.start();
      osc3.start();

      activeOscsRef.current = [osc1, osc2, osc3];
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const toggleSound = () => {
    setIsMuted((prev) => {
      const nextMuted = !prev;
      if (!nextMuted) {
        initAudio();
        // Fade in ambient tone
        if (ambientGainRef.current && audioCtxRef.current) {
          ambientGainRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
          ambientGainRef.current.gain.setTargetAtTime(0.015, audioCtxRef.current.currentTime, 2);
        }
      } else {
        // Fade out
        if (ambientGainRef.current && audioCtxRef.current) {
          ambientGainRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
          ambientGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
        }
      }
      return nextMuted;
    });
  };

  const playInteraction = (type: 'hover' | 'select' | 'deep' | 'whisper' | 'confirm' | 'alert' | 'transition') => {
    if (isMuted || !audioCtxRef.current) return;

    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'hover') {
      // Extremely subtle tactile click
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
      gain.gain.setValueAtTime(0.008, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'select') {
      // Warm elegant chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === 'deep') {
      // Resonant memory access chime
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(146.83, now); // D3
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      
      // Layer a high bell
      const bell = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bell.type = 'sine';
      bell.frequency.setValueAtTime(1174.66, now); // D6
      bellGain.gain.setValueAtTime(0.01, now);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      bell.connect(bellGain);
      bellGain.connect(ctx.destination);
      bell.start(now);
      bell.stop(now + 1.5);

      osc.start(now);
      osc.stop(now + 1.2);
    } else if (type === 'whisper') {
      // Soft digital tape sweep
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(150, now + 0.3);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'confirm') {
      // Gentle, positive confirmation sound for actions like saving a memory
      osc.type = 'sine';
      osc.frequency.setValueAtTime(783.99, now); // G5
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(987.77, now + 0.1); // B5
      gain2.gain.setValueAtTime(0.01, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.6);
    } else if (type === 'alert') {
      // Soft, low-frequency warning for sensitive actions
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now); // A2
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.4);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'transition') {
      // Subtle whoosh for UI transitions like opening a modal
      const noise = ctx.createBufferSource();
      const bufferSize = ctx.sampleRate * 0.3; // 0.3 second noise
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.value = 1;
      filter.frequency.setValueAtTime(1500, now);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.25);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

      noise.connect(filter);
      filter.connect(gain);
      noise.start(now);
      noise.stop(now + 0.3);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <SoundContext.Provider value={{ isMuted, toggleSound, playInteraction }}>
      {children}
    </SoundContext.Provider>
  );
};

export const SoundToggle: React.FC = () => {
  const { isMuted, toggleSound } = useSound();

  return (
    <button
      onClick={toggleSound}
      className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full premium-glass hover:border-[#C5A46E]/40 transition-all duration-300 text-xs tracking-wider uppercase text-[#E6E4DF]/70 hover:text-[#F3EFEA]"
      title={isMuted ? "Enable Cinematic Soundscape" : "Mute Soundscape"}
    >
      <span className="relative flex h-2 w-2">
        {!isMuted && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A46E] opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${isMuted ? 'bg-[#8E9299]/50' : 'bg-[#C5A46E]'}`}></span>
      </span>
      
      <span className="font-mono">{isMuted ? 'Audio: Off' : 'Audio: Ambient'}</span>
      
      {isMuted ? (
        <VolumeX className="w-3.5 h-3.5 text-[#8E9299]" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-[#C5A46E] animate-pulse" />
      )}

      {/* Subtle indicator tooltip */}
      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#0B0C0E] border border-[#E6E4DF]/10 rounded text-[10px] text-[#E6E4DF]/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {isMuted ? "Enable Spatial Museum Room-Tone" : "Active 432Hz Sine Matrix"}
      </span>
    </button>
  );
};
