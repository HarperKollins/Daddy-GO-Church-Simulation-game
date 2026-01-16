import { Vector, randomVector } from "@/lib/ml/VectorMath";

/**
 * The 6 Dimensions of the Church Egregore
 * Every Agent and Event exists within this vector space.
 */
export const VIBE_DIMENSIONS = {
    FAITH: 0,      // Belief in the supernatural / miracles
    GREED: 1,      // Desire for material wealth
    FEAR: 2,       // Anxiety, response to threats
    LOYALTY: 3,    // Dedication to the leader (You)
    SKEPTICISM: 4, // Resistance to manipulation/lies
    UNITY: 5       // Cohesion with the group
} as const;

export const VECTOR_SIZE = 6;

/**
 * The Emotional State of an Agent or the Crowd
 */
export interface EmotionalState {
    vector: Vector; // [FAITH, GREED, FEAR, LOYALTY, SKEPTICISM, UNITY]
    dominantVibe: string;
    intensity: number;
}

/**
 * Create a fresh emotional state (Neutral)
 */
export function createNeutralState(): EmotionalState {
    return {
        vector: [0.5, 0.5, 0.1, 0.5, 0.2, 0.5],
        dominantVibe: 'NEUTRAL',
        intensity: 0.5
    };
}

/**
 * Create a random emotional state (Chaos)
 * Used for initializing diverse crowds.
 */
export function createRandomState(): EmotionalState {
    // Bias towards Faith/Greed for Nigerian Context realism
    const base = randomVector(VECTOR_SIZE);
    // Boost Greed and Faith slightly
    base[VIBE_DIMENSIONS.FAITH] += 0.3;
    base[VIBE_DIMENSIONS.GREED] += 0.3;

    return {
        vector: base,
        dominantVibe: getDominantVibe(base),
        intensity: Math.sqrt(base.reduce((acc, v) => acc + v * v, 0))
    };
}

/**
 * Determine the dominant vibe from a vector
 */
export function getDominantVibe(v: Vector): string {
    let maxIndex = 0;
    let maxValue = -Infinity;

    v.forEach((val, index) => {
        if (val > maxValue) {
            maxValue = val;
            maxIndex = index;
        }
    });

    return Object.keys(VIBE_DIMENSIONS)[maxIndex] || 'UNKNOWN';
}

/**
 * Pre-defined Vibe Archetypes
 */
export const VIBE_ARCHETYPES = {
    REVIVAL: [0.9, 0.1, 0.1, 0.8, 0.0, 0.9], // High Faith, Loyalty, Unity
    SCANDAL: [0.2, 0.4, 0.6, 0.1, 0.9, 0.1], // High Fear, Skepticism, Low Loyalty
    PROSPERITY: [0.7, 0.9, 0.2, 0.6, 0.3, 0.5], // High Faith, Greed
    WITCH_HUNT: [0.8, 0.1, 0.9, 0.7, 0.1, 0.4], // High Faith, Fear
    APATHY: [0.1, 0.1, 0.1, 0.1, 0.8, 0.0], // Low everything, High Skepticism
};
