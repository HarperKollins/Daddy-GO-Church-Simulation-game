/**
 * Sound Effects & Audio Manager
 * 
 * Manages all game audio:
 * - UI sounds (clicks, transitions)
 * - Event sounds (alerts, notifications)
 * - Ambient sounds (church, city, nature)
 * - Music (worship, tense, celebratory)
 * - Voice cues (Nigerian pastor phrases)
 */

// ============================================================================
// SOUND EFFECTS DEFINITIONS
// ============================================================================

export interface SoundEffect {
    id: string;
    name: string;
    category: 'ui' | 'event' | 'ambient' | 'music' | 'voice';
    path: string;
    volume: number;     // 0-1
    loop: boolean;
    duration?: number;
    description: string;
}

export const SOUND_EFFECTS: SoundEffect[] = [
    // UI Sounds
    { id: 'UI_CLICK', name: 'Button Click', category: 'ui', path: '/sounds/ui/click.mp3', volume: 0.5, loop: false, description: 'Generic button press' },
    { id: 'UI_SUCCESS', name: 'Success Chime', category: 'ui', path: '/sounds/ui/success.mp3', volume: 0.6, loop: false, description: 'Positive action complete' },
    { id: 'UI_ERROR', name: 'Error Sound', category: 'ui', path: '/sounds/ui/error.mp3', volume: 0.5, loop: false, description: 'Something went wrong' },
    { id: 'UI_TRANSITION', name: 'Page Transition', category: 'ui', path: '/sounds/ui/whoosh.mp3', volume: 0.4, loop: false, description: 'Screen change' },
    { id: 'UI_COIN', name: 'Coin Sound', category: 'ui', path: '/sounds/ui/coin.mp3', volume: 0.6, loop: false, description: 'Money gained' },
    { id: 'UI_MONEY_LOSS', name: 'Money Loss', category: 'ui', path: '/sounds/ui/money-drop.mp3', volume: 0.6, loop: false, description: 'Money lost' },
    { id: 'UI_LEVEL_UP', name: 'Level Up', category: 'ui', path: '/sounds/ui/levelup.mp3', volume: 0.7, loop: false, description: 'Achievement or milestone' },
    { id: 'UI_NOTIFICATION', name: 'Notification', category: 'ui', path: '/sounds/ui/notify.mp3', volume: 0.5, loop: false, description: 'New message/event' },

    // Event Sounds
    { id: 'EVENT_SCANDAL', name: 'Scandal Alert', category: 'event', path: '/sounds/events/scandal.mp3', volume: 0.7, loop: false, description: 'Drama incoming' },
    { id: 'EVENT_MIRACLE', name: 'Miracle Happening', category: 'event', path: '/sounds/events/miracle.mp3', volume: 0.8, loop: false, description: 'Spiritual breakthrough' },
    { id: 'EVENT_CRISIS', name: 'Crisis Alert', category: 'event', path: '/sounds/events/alarm.mp3', volume: 0.7, loop: false, description: 'Something bad happened' },
    { id: 'EVENT_EFCC', name: 'EFCC Raid', category: 'event', path: '/sounds/events/police.mp3', volume: 0.8, loop: false, description: 'Trouble with authorities' },
    { id: 'EVENT_DEATH', name: 'Game Over', category: 'event', path: '/sounds/events/death.mp3', volume: 0.6, loop: false, description: 'Death/end game' },
    { id: 'EVENT_PHONE', name: 'Phone Ring', category: 'event', path: '/sounds/events/phone.mp3', volume: 0.6, loop: false, description: 'Someone calling' },
    { id: 'EVENT_CROWD_CHEER', name: 'Crowd Cheering', category: 'event', path: '/sounds/events/cheer.mp3', volume: 0.7, loop: false, description: 'Successful event' },

    // Ambient Sounds
    { id: 'AMBIENT_CHURCH', name: 'Church Ambience', category: 'ambient', path: '/sounds/ambient/church.mp3', volume: 0.3, loop: true, description: 'Quiet church atmosphere' },
    { id: 'AMBIENT_LAGOS', name: 'Lagos Traffic', category: 'ambient', path: '/sounds/ambient/traffic.mp3', volume: 0.3, loop: true, description: 'City sounds' },
    { id: 'AMBIENT_WORSHIP', name: 'Worship Background', category: 'ambient', path: '/sounds/ambient/worship-bg.mp3', volume: 0.4, loop: true, description: 'Soft worship music' },
    { id: 'AMBIENT_NIGHT', name: 'Night Vigil', category: 'ambient', path: '/sounds/ambient/night.mp3', volume: 0.3, loop: true, description: 'Night prayer atmosphere' },
    { id: 'AMBIENT_CLUB', name: 'Club Atmosphere', category: 'ambient', path: '/sounds/ambient/club.mp3', volume: 0.4, loop: true, description: 'Nightlife vibes' },

    // Music Tracks
    { id: 'MUSIC_WORSHIP', name: 'Worship Music', category: 'music', path: '/sounds/music/worship.mp3', volume: 0.5, loop: true, description: 'Uplifting worship' },
    { id: 'MUSIC_TENSE', name: 'Tension Music', category: 'music', path: '/sounds/music/tense.mp3', volume: 0.4, loop: true, description: 'Something\'s wrong' },
    { id: 'MUSIC_VICTORY', name: 'Victory Theme', category: 'music', path: '/sounds/music/victory.mp3', volume: 0.6, loop: false, description: 'Celebration music' },
    { id: 'MUSIC_PRAYER', name: 'Prayer Background', category: 'music', path: '/sounds/music/prayer.mp3', volume: 0.4, loop: true, description: 'Instrumental prayer music' },
    { id: 'MUSIC_CRUSADE', name: 'Crusade Energy', category: 'music', path: '/sounds/music/crusade.mp3', volume: 0.6, loop: true, description: 'High energy worship' },

    // Voice Cues (Nigerian Pastor Phrases)
    { id: 'VOICE_HALLELUJAH', name: 'Hallelujah!', category: 'voice', path: '/sounds/voice/hallelujah.mp3', volume: 0.7, loop: false, description: 'Praise exclamation' },
    { id: 'VOICE_RECEIVE', name: 'Receive It!', category: 'voice', path: '/sounds/voice/receive.mp3', volume: 0.7, loop: false, description: 'Blessing declaration' },
    { id: 'VOICE_FIRE', name: 'Fire! Fire! Fire!', category: 'voice', path: '/sounds/voice/fire.mp3', volume: 0.8, loop: false, description: 'Spiritual intensity' },
    { id: 'VOICE_NONSENSE', name: 'What Nonsense!', category: 'voice', path: '/sounds/voice/nonsense.mp3', volume: 0.7, loop: false, description: 'Disappointment/anger' },
    { id: 'VOICE_SOMEBODY', name: 'Somebody Shout!', category: 'voice', path: '/sounds/voice/shout.mp3', volume: 0.8, loop: false, description: 'Crowd engagement' }
];

// ============================================================================
// AUDIO MANAGER
// ============================================================================

export interface AudioState {
    masterVolume: number;        // 0-1
    musicVolume: number;         // 0-1
    effectsVolume: number;       // 0-1
    voiceVolume: number;         // 0-1
    muted: boolean;
    currentMusic: string | null;
    currentAmbient: string | null;
}

export interface AudioManager {
    // Plays short sound effect
    playEffect: (soundId: string) => void;

    // Plays looping background music
    playMusic: (musicId: string) => void;
    stopMusic: () => void;

    // Plays ambient sound
    playAmbient: (ambientId: string) => void;
    stopAmbient: () => void;

    // Voice cues
    playVoice: (voiceId: string) => void;

    // Volume controls
    setMasterVolume: (volume: number) => void;
    setMusicVolume: (volume: number) => void;
    setEffectsVolume: (volume: number) => void;
    toggleMute: () => void;
}

/**
 * Create audio manager (client-side only)
 */
export function createAudioManager(): AudioManager {
    const state: AudioState = {
        masterVolume: 0.7,
        musicVolume: 0.5,
        effectsVolume: 0.8,
        voiceVolume: 0.8,
        muted: false,
        currentMusic: null,
        currentAmbient: null
    };

    // Audio elements cache
    const audioCache: Record<string, HTMLAudioElement> = {};
    let currentMusicEl: HTMLAudioElement | null = null;
    let currentAmbientEl: HTMLAudioElement | null = null;

    const getAudio = (soundId: string): HTMLAudioElement | null => {
        if (typeof window === 'undefined') return null;

        if (!audioCache[soundId]) {
            const sound = SOUND_EFFECTS.find(s => s.id === soundId);
            if (!sound) return null;

            const audio = new Audio(sound.path);
            audio.loop = sound.loop;
            audio.volume = sound.volume * state.masterVolume;
            audioCache[soundId] = audio;
        }

        return audioCache[soundId];
    };

    return {
        playEffect: (soundId: string) => {
            if (state.muted) return;
            const audio = getAudio(soundId);
            if (audio) {
                audio.currentTime = 0;
                audio.volume = state.effectsVolume * state.masterVolume;
                audio.play().catch(() => { });
            }
        },

        playMusic: (musicId: string) => {
            if (currentMusicEl) {
                currentMusicEl.pause();
            }
            currentMusicEl = getAudio(musicId);
            if (currentMusicEl && !state.muted) {
                currentMusicEl.volume = state.musicVolume * state.masterVolume;
                currentMusicEl.play().catch(() => { });
                state.currentMusic = musicId;
            }
        },

        stopMusic: () => {
            if (currentMusicEl) {
                currentMusicEl.pause();
                currentMusicEl = null;
                state.currentMusic = null;
            }
        },

        playAmbient: (ambientId: string) => {
            if (currentAmbientEl) {
                currentAmbientEl.pause();
            }
            currentAmbientEl = getAudio(ambientId);
            if (currentAmbientEl && !state.muted) {
                currentAmbientEl.volume = state.effectsVolume * state.masterVolume * 0.5;
                currentAmbientEl.play().catch(() => { });
                state.currentAmbient = ambientId;
            }
        },

        stopAmbient: () => {
            if (currentAmbientEl) {
                currentAmbientEl.pause();
                currentAmbientEl = null;
                state.currentAmbient = null;
            }
        },

        playVoice: (voiceId: string) => {
            if (state.muted) return;
            const audio = getAudio(voiceId);
            if (audio) {
                audio.volume = state.voiceVolume * state.masterVolume;
                audio.play().catch(() => { });
            }
        },

        setMasterVolume: (volume: number) => {
            state.masterVolume = Math.max(0, Math.min(1, volume));
        },

        setMusicVolume: (volume: number) => {
            state.musicVolume = Math.max(0, Math.min(1, volume));
            if (currentMusicEl) {
                currentMusicEl.volume = state.musicVolume * state.masterVolume;
            }
        },

        setEffectsVolume: (volume: number) => {
            state.effectsVolume = Math.max(0, Math.min(1, volume));
        },

        toggleMute: () => {
            state.muted = !state.muted;
            if (state.muted) {
                currentMusicEl?.pause();
                currentAmbientEl?.pause();
            } else {
                currentMusicEl?.play().catch(() => { });
                currentAmbientEl?.play().catch(() => { });
            }
        }
    };
}

// ============================================================================
// SOUND TRIGGER MAPPINGS
// ============================================================================

export const SOUND_TRIGGERS: Record<string, string> = {
    // UI triggers
    'button_click': 'UI_CLICK',
    'action_success': 'UI_SUCCESS',
    'action_error': 'UI_ERROR',
    'money_gained': 'UI_COIN',
    'money_lost': 'UI_MONEY_LOSS',
    'level_up': 'UI_LEVEL_UP',
    'new_event': 'UI_NOTIFICATION',

    // Event triggers
    'scandal_start': 'EVENT_SCANDAL',
    'miracle_happened': 'EVENT_MIRACLE',
    'crisis_event': 'EVENT_CRISIS',
    'efcc_raid': 'EVENT_EFCC',
    'player_died': 'EVENT_DEATH',
    'phone_call': 'EVENT_PHONE',
    'crowd_reaction': 'EVENT_CROWD_CHEER',

    // Scene triggers
    'enter_church': 'AMBIENT_CHURCH',
    'enter_city': 'AMBIENT_LAGOS',
    'enter_club': 'AMBIENT_CLUB',
    'start_worship': 'AMBIENT_WORSHIP',
    'night_vigil': 'AMBIENT_NIGHT',

    // Music triggers
    'service_start': 'MUSIC_WORSHIP',
    'tension_scene': 'MUSIC_TENSE',
    'victory_achieved': 'MUSIC_VICTORY',
    'prayer_time': 'MUSIC_PRAYER',
    'crusade_start': 'MUSIC_CRUSADE',

    // Voice triggers
    'deliverance': 'VOICE_FIRE',
    'blessing': 'VOICE_RECEIVE',
    'praise': 'VOICE_HALLELUJAH',
    'angry': 'VOICE_NONSENSE',
    'hype': 'VOICE_SOMEBODY'
};

/**
 * Get sound ID for a game event
 */
export function getSoundForEvent(eventType: string): string | null {
    return SOUND_TRIGGERS[eventType] || null;
}

// ============================================================================
// EXPORTS
// ============================================================================

export function createDefaultAudioState(): AudioState {
    return {
        masterVolume: 0.7,
        musicVolume: 0.5,
        effectsVolume: 0.8,
        voiceVolume: 0.8,
        muted: false,
        currentMusic: null,
        currentAmbient: null
    };
}
