import { EmotionalState, getDominantVibe, VIBE_DIMENSIONS } from '../EmotionalState';

/**
 * Neuro-Grammar Engine
 * 
 * A lightweight, CPU-friendly alternative to LLMs for generating context-aware text.
 * It uses the Global Vibe Vector to weight probability of word selection.
 */

// 1. VOCABULARY BANKS (Vibe-Coded)
type VocabBank = {
    neutral: string[];
    [key: string]: string[]; // 'GREED' | 'FEAR' | 'FAITH' etc.
};

const ACTORS: VocabBank = {
    neutral: ['member', 'visitor', 'deacon', 'usher', 'choir member'],
    GREED: ['businessman', 'contractor', 'mmmbop investor', 'treasurer', 'debtor'],
    FEAR: ['widow', 'refugee', 'trembling youth', 'accused witch', 'night-runner'],
    FAITH: ['prayer warrior', 'prophetess', 'miracle seeker', 'crusader', 'disciple'],
    LOYALTY: ['armor bearer', 'protocol officer', 'daughter of zion', 'son of the prophet', 'fanatic'],
    SKEPTICISM: ['journalist', 'blogger', 'unbeliever', 'professor', 'critic'],
    UNITY: ['family', 'committee', 'prayer cell', 'fellowship group', 'tribe']
};

const VERBS: VocabBank = {
    neutral: ['saw', 'heard', 'mentioned', 'noticed', 'felt'],
    GREED: ['grabbed', 'calculated', 'counted', 'invested', 'siphoned'],
    FEAR: ['fled from', 'hid from', 'whispered about', 'shivered at', 'warned of'],
    FAITH: ['declared', 'prophesied', 'commanded', 'received', 'anointed'],
    LOYALTY: ['defended', 'praised', 'guarded', 'honored', 'served'],
    SKEPTICISM: ['questioned', 'investigated', 'doubted', 'mocked', 'exposed'],
    UNITY: ['shared', 'embraced', 'gathered', 'agreed with', 'joined']
};

const OBJECTS: VocabBank = {
    neutral: ['the altar', 'the microphone', 'the seat', 'the bible', 'the offering bucket'],
    GREED: ['the money bag', 'the luxury car', 'the bank alert', 'the gold chain', 'the contract'],
    FEAR: ['the shadows', 'the strange owl', 'the bad dream', 'the curse', 'the empty seat'],
    FAITH: ['the anointing oil', 'the mantles', 'the vision', 'the breakthrough', 'the miracle'],
    LOYALTY: ['your picture', 'your sticker', 'your chair', 'your shoes', 'your car'],
    SKEPTICISM: ['the financial report', 'the sermon notes', 'the conflicting story', 'the hidden camera', 'the blog post'],
    UNITY: ['the communion', 'the feast', 'the song', 'the burden', 'the vision']
};

const ADJECTIVES: VocabBank = {
    neutral: ['quiet', 'loud', 'normal', 'busy', 'blue'],
    GREED: ['expensive', 'golden', 'lavish', 'profitable', 'broke'],
    FEAR: ['demonic', 'dark', 'haunted', 'cursed', 'terrifying'],
    FAITH: ['divine', 'glorious', 'supernatural', 'anointed', 'holy'],
    LOYALTY: ['faithful', 'dedicated', 'obedient', 'submissive', 'devoted'],
    SKEPTICISM: ['fake', 'doctored', 'suspicious', 'manipulative', 'illogical'],
    UNITY: ['united', 'harmonious', 'peaceful', 'loving', 'connected']
};

// 2. TEMPLATES
const TEMPLATES = [
    "The [ACTOR] [VERB] [OBJECT] in a [ADJECTIVE] way.",
    "I saw a [ADJECTIVE] [ACTOR] who [VERB] [OBJECT].",
    "Why did the [ACTOR] [VERB] [OBJECT]? It seemed [ADJECTIVE].",
    "There is a [ADJECTIVE] spirit here; even the [ACTOR] [VERB] [OBJECT].",
    "The [OBJECT] was [VERB] by the [ACTOR] with [ADJECTIVE] intent."
];

/**
 * Select a word from the bank based on the Vibe
 */
function selectWord(bank: VocabBank, dominantVibe: string, intensity: number): string {
    // 1. Determine if we use the Vibe word or Neutral word
    // Higher intensity = higher chance of using the themed word
    const useThemed = Math.random() < intensity; // 0.0 to 1.0

    const list = (useThemed && bank[dominantVibe]) ? bank[dominantVibe] : bank['neutral'];
    return list[Math.floor(Math.random() * list.length)];
}

/**
 * Generate a Narrative String
 */
export function generateNeuroNarrative(
    vibe: EmotionalState,
    context: 'gossip' | 'testimony' | 'observation' = 'observation'
): string {
    const dominant = getDominantVibe(vibe.vector);
    const intensity = Math.min(1.0, vibe.intensity * 1.5); // Boost intensity slightly for effect

    // select template (could also be vibe-based later)
    const template = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];

    return template.replace(/\[(\w+)\]/g, (match, token) => {
        switch (token) {
            case 'ACTOR': return selectWord(ACTORS, dominant, intensity);
            case 'VERB': return selectWord(VERBS, dominant, intensity);
            case 'OBJECT': return selectWord(OBJECTS, dominant, intensity);
            case 'ADJECTIVE': return selectWord(ADJECTIVES, dominant, intensity);
            default: return token;
        }
    });
}
