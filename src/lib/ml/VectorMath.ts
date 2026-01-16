/**
 * Vector Mathematics Library for "Protocol Genesis"
 * 
 * This library handles the 6-dimensional "Vibe Space" math.
 * We use simple arrays `number[]` to represent vectors for performance.
 */

export type Vector = number[];

/**
 * Calculate Dot Product of two vectors
 * A . B = |A||B|cos(theta)
 */
export function dotProduct(a: Vector, b: Vector): number {
    if (a.length !== b.length) throw new Error("Vector dimension mismatch");
    return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

/**
 * Calculate Magnitude (Length) of a vector
 * |A| = sqrt(sum(a_i^2))
 */
export function magnitude(v: Vector): number {
    return Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
}

/**
 * Calculate Cosine Similarity
 * The "Vibe Check" function.
 * Returns 1.0 (Identical vibe) to -1.0 (Opposite vibe).
 */
export function cosineSimilarity(a: Vector, b: Vector): number {
    const magA = magnitude(a);
    const magB = magnitude(b);
    if (magA === 0 || magB === 0) return 0; // Neutral if empty
    return dotProduct(a, b) / (magA * magB);
}

/**
 * Add two vectors
 * Result = A + B
 */
export function addVectors(a: Vector, b: Vector): Vector {
    if (a.length !== b.length) throw new Error("Vector dimension mismatch");
    return a.map((val, i) => val + b[i]);
}

/**
 * Subtract vectors
 * Result = A - B
 */
export function subtractVectors(a: Vector, b: Vector): Vector {
    if (a.length !== b.length) throw new Error("Vector dimension mismatch");
    return a.map((val, i) => val - b[i]);
}

/**
 * Scale a vector by a scalar
 * Result = v * s
 */
export function scaleVector(v: Vector, scalar: number): Vector {
    return v.map(val => val * scalar);
}

/**
 * Normalize a vector to unit length
 * Used to keep emotional states from exploding to infinity.
 */
export function normalize(v: Vector): Vector {
    const mag = magnitude(v);
    if (mag === 0) return v;
    return v.map(val => val / mag);
}

/**
 * Linear Interpolation (Lerp) between two vectors
 * Used for gradual mood shifts.
 */
export function lerpVector(start: Vector, end: Vector, t: number): Vector {
    const clampedT = Math.max(0, Math.min(1, t));
    return start.map((val, i) => val + (end[i] - val) * clampedT);
}

/**
 * Generate a random normalized vector of dimension N
 */
export function randomVector(dimension: number): Vector {
    const v = Array(dimension).fill(0).map(() => Math.random() * 2 - 1);
    return normalize(v);
}
