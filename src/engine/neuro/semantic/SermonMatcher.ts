import { Vector, normalize, addVectors, cosineSimilarity, randomVector } from "@/lib/ml/VectorMath";
import { EmotionalState, VIBE_DIMENSIONS, VECTOR_SIZE } from "../EmotionalState";

/**
 * The "Holy Vocabulary"
 * Maps keywords to Vibe Vectors.
 * [FAITH, GREED, FEAR, LOYALTY, SKEPTICISM, UNITY]
 */
const VOCAB: Record<string, Vector> = {
    // FAITH WORDS
    'miracle': [0.9, 0.2, 0.0, 0.3, -0.2, 0.4],
    'healing': [0.8, 0.1, -0.2, 0.4, -0.1, 0.3],
    'power': [0.7, 0.4, 0.2, 0.5, 0.0, 0.2],
    'breakthrough': [0.8, 0.6, 0.1, 0.3, 0.1, 0.2],
    'anointing': [0.9, 0.3, 0.0, 0.6, -0.3, 0.4],

    // GREED WORDS (Propsperity)
    'money': [0.1, 1.0, 0.2, 0.1, 0.3, 0.0],
    'wealth': [0.2, 0.9, 0.1, 0.2, 0.2, 0.1],
    'harvest': [0.4, 0.8, 0.0, 0.3, 0.1, 0.3],
    'millionaire': [0.1, 0.9, 0.1, 0.0, 0.4, 0.0],
    'seed': [0.5, 0.8, 0.0, 0.4, 0.2, 0.2],

    // FEAR WORDS (Warfare)
    'enemy': [0.3, 0.0, 1.0, 0.4, 0.0, 0.6],
    'attack': [0.2, 0.0, 0.9, 0.3, 0.0, 0.5],
    'witch': [0.4, 0.0, 0.9, 0.2, -0.1, 0.4],
    'destroy': [0.4, 0.0, 0.8, 0.3, 0.1, 0.4],
    'curse': [0.3, 0.0, 0.9, 0.2, 0.0, 0.3],

    // LOYALTY WORDS
    'honour': [0.5, 0.2, 0.0, 1.0, -0.2, 0.5],
    'father': [0.6, 0.1, 0.0, 0.9, -0.1, 0.4],
    'submit': [0.4, 0.0, 0.1, 0.9, 0.4, 0.2],
    'serve': [0.5, 0.0, 0.0, 0.8, -0.1, 0.6],

    // UNITY WORDS
    'love': [0.6, 0.0, -0.5, 0.4, -0.2, 1.0],
    'family': [0.5, 0.1, 0.0, 0.5, -0.1, 0.9],
    'together': [0.3, 0.0, 0.0, 0.3, 0.0, 0.9]
};

export class SermonMatcher {

    /**
     * Convert Sermon Text -> Vector
     */
    public embedText(text: string): Vector {
        const words = text.toLowerCase().split(/\W+/); // Tokenize
        let totalVector = Array(VECTOR_SIZE).fill(0);
        let matchCount = 0;

        words.forEach(word => {
            const vec = VOCAB[word];
            if (vec) {
                totalVector = addVectors(totalVector, vec);
                matchCount++;
            }
        });

        if (matchCount === 0) {
            // Fallback for unknown text: Random "Generic Sermon"
            return normalize(randomVector(VECTOR_SIZE));
        }

        return normalize(totalVector);
    }

    /**
     * Calculate Resonance Score
     * How well does the sermon match the crowd?
     * Returns -1.0 to 1.0
     */
    public calculateResonance(sermonText: string, crowdVibe: Vector): number {
        const sermonVec = this.embedText(sermonText);
        return cosineSimilarity(sermonVec, crowdVibe);
    }

    /**
     * Get Feedback String based on Resonance
     */
    public getFeedback(resonance: number): string {
        if (resonance > 0.8) return "PROPHETIC! The crowd is shaken.";
        if (resonance > 0.5) return "POWERFUL. They felt that.";
        if (resonance > 0.2) return "Solid message. Some nodding heads.";
        if (resonance > -0.2) return "A bit dry. People are checking phones.";
        if (resonance > -0.5) return "Awkward silence. Read the room!";
        return "CATASTROPHIC. They actively hated it.";
    }
}
