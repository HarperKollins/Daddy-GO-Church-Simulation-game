/**
 * Sound Manager Hook - Game Audio System
 * 
 * Provides centralized audio control for the game including:
 * - Background music (looping)
 * - Sound effects for UI actions
 * - Event-specific sounds
 * - Volume and mute controls
 * 
 * Uses Web Audio API for efficient playback
 */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Sound effect definitions with free CDN-hosted audio
// These are royalty-free sounds from freesound.org and similar sources
const SOUND_EFFECTS = {
    // UI Sounds
    click: 'https://cdn.freesound.org/previews/220/220206_4100837-lq.mp3',
    success: 'https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3',
    error: 'https://cdn.freesound.org/previews/142/142608_1840739-lq.mp3',
    modal_open: 'https://cdn.freesound.org/previews/256/256116_3263906-lq.mp3',
    modal_close: 'https://cdn.freesound.org/previews/256/256113_3263906-lq.mp3',

    // Game Actions
    preach: 'https://cdn.freesound.org/previews/456/456966_6142149-lq.mp3', // Crowd cheering
    pray: 'https://cdn.freesound.org/previews/352/352517_4019029-lq.mp3', // Peaceful chime
    money: 'https://cdn.freesound.org/previews/515/515643_6660167-lq.mp3', // Cash register
    level_up: 'https://cdn.freesound.org/previews/270/270304_5123851-lq.mp3', // Achievement

    // Alerts
    danger: 'https://cdn.freesound.org/previews/159/159408_2803580-lq.mp3', // Warning
    scandal: 'https://cdn.freesound.org/previews/411/411460_5121236-lq.mp3', // Dramatic hit
    notification: 'https://cdn.freesound.org/previews/411/411749_5121236-lq.mp3', // Notification ding

    // Events
    event_start: 'https://cdn.freesound.org/previews/270/270404_5123851-lq.mp3', // Event popup
    hookup: 'https://cdn.freesound.org/previews/397/397355_4284968-lq.mp3', // Kiss sound
    heartbreak: 'https://cdn.freesound.org/previews/421/421003_4284968-lq.mp3', // Sad tone

    // Special
    death: 'https://cdn.freesound.org/previews/445/445958_1676145-lq.mp3', // Game over
    new_game: 'https://cdn.freesound.org/previews/270/270316_5123851-lq.mp3', // Start fresh
} as const;

// Background music tracks
const MUSIC_TRACKS = {
    main: 'https://cdn.freesound.org/previews/519/519178_6890937-lq.mp3', // Calm African loop
    tense: 'https://cdn.freesound.org/previews/460/460588_5885134-lq.mp3', // Suspenseful
} as const;

export type SoundEffect = keyof typeof SOUND_EFFECTS;
export type MusicTrack = keyof typeof MUSIC_TRACKS;

interface SoundManagerState {
    isMuted: boolean;
    sfxVolume: number;
    musicVolume: number;
    isMusicPlaying: boolean;
}

interface SoundManagerReturn extends SoundManagerState {
    playSound: (sound: SoundEffect) => void;
    playMusic: (track: MusicTrack) => void;
    stopMusic: () => void;
    toggleMute: () => void;
    setSfxVolume: (volume: number) => void;
    setMusicVolume: (volume: number) => void;
}

// Get stored audio preferences
const getStoredPrefs = (): Partial<SoundManagerState> => {
    if (typeof window === 'undefined') return {};
    try {
        const stored = localStorage.getItem('audio-prefs');
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
};

// Save audio preferences
const savePrefs = (prefs: SoundManagerState) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem('audio-prefs', JSON.stringify(prefs));
    } catch {
        // Ignore storage errors
    }
};

export function useSoundManager(): SoundManagerReturn {
    const [state, setState] = useState<SoundManagerState>(() => ({
        isMuted: false,
        sfxVolume: 0.5,
        musicVolume: 0.3,
        isMusicPlaying: false,
        ...getStoredPrefs(),
    }));

    const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());
    const musicRef = useRef<HTMLAudioElement | null>(null);

    // Preload commonly used sounds
    useEffect(() => {
        const preloadSounds = ['click', 'success', 'error', 'notification'] as SoundEffect[];
        preloadSounds.forEach(sound => {
            const audio = new Audio(SOUND_EFFECTS[sound]);
            audio.preload = 'auto';
            audioCache.current.set(sound, audio);
        });

        return () => {
            audioCache.current.forEach(audio => {
                audio.pause();
                audio.src = '';
            });
            audioCache.current.clear();
        };
    }, []);

    // Save preferences when they change
    useEffect(() => {
        savePrefs(state);
    }, [state]);

    const playSound = useCallback((sound: SoundEffect) => {
        if (state.isMuted) return;

        try {
            let audio = audioCache.current.get(sound);

            if (!audio) {
                audio = new Audio(SOUND_EFFECTS[sound]);
                audioCache.current.set(sound, audio);
            }

            audio.volume = state.sfxVolume;
            audio.currentTime = 0;
            audio.play().catch(() => {
                // Ignore autoplay restrictions
            });
        } catch (error) {
            console.warn('Sound playback failed:', error);
        }
    }, [state.isMuted, state.sfxVolume]);

    const playMusic = useCallback((track: MusicTrack) => {
        if (state.isMuted) return;

        try {
            // Stop current music
            if (musicRef.current) {
                musicRef.current.pause();
                musicRef.current.src = '';
            }

            const audio = new Audio(MUSIC_TRACKS[track]);
            audio.loop = true;
            audio.volume = state.musicVolume;
            musicRef.current = audio;

            audio.play().catch(() => {
                // Ignore autoplay restrictions
            });

            setState(prev => ({ ...prev, isMusicPlaying: true }));
        } catch (error) {
            console.warn('Music playback failed:', error);
        }
    }, [state.isMuted, state.musicVolume]);

    const stopMusic = useCallback(() => {
        if (musicRef.current) {
            musicRef.current.pause();
            musicRef.current.src = '';
            musicRef.current = null;
        }
        setState(prev => ({ ...prev, isMusicPlaying: false }));
    }, []);

    const toggleMute = useCallback(() => {
        setState(prev => {
            const newMuted = !prev.isMuted;
            if (newMuted && musicRef.current) {
                musicRef.current.pause();
            } else if (!newMuted && musicRef.current) {
                musicRef.current.play().catch(() => { });
            }
            return { ...prev, isMuted: newMuted };
        });
    }, []);

    const setSfxVolume = useCallback((volume: number) => {
        setState(prev => ({ ...prev, sfxVolume: Math.max(0, Math.min(1, volume)) }));
    }, []);

    const setMusicVolume = useCallback((volume: number) => {
        const clampedVolume = Math.max(0, Math.min(1, volume));
        if (musicRef.current) {
            musicRef.current.volume = clampedVolume;
        }
        setState(prev => ({ ...prev, musicVolume: clampedVolume }));
    }, []);

    return {
        ...state,
        playSound,
        playMusic,
        stopMusic,
        toggleMute,
        setSfxVolume,
        setMusicVolume,
    };
}

// Create a context for global sound access
import { createContext, useContext, ReactNode } from 'react';

const SoundContext = createContext<SoundManagerReturn | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
    const soundManager = useSoundManager();

    return (
        <SoundContext.Provider value={soundManager}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
}

// Simplified hook for components that just want to play sounds
export function useSoundEffect() {
    const { playSound, isMuted } = useSound();
    return { playSound, isMuted };
}
