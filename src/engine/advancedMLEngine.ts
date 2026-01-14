/**
 * Advanced ML Engine - Deep Learning-Inspired Systems
 * 
 * This goes beyond ML-lite to implement:
 * - Neural network-style weight adjustments
 * - Pattern recognition for player behavior
 * - Predictive event generation
 * - Adaptive difficulty curves
 * - Player engagement tracking
 * - Churn prediction
 */

import type { PlayerPersonality, ChoiceRecord } from '@/types/game';

// ============================================================================
// NEURAL NETWORK-INSPIRED WEIGHTS
// ============================================================================

/**
 * Player behavior patterns detected through choice analysis
 */
export interface PlayerBehaviorPattern {
    pattern: string;
    confidence: number;  // 0-1
    firstDetected: number;  // Week
    occurrences: number;
    prediction: string;
}

/**
 * Deep player profile built from all interactions
 */
export interface DeepPlayerProfile {
    // Core ML metrics
    engagementScore: number;        // 0-100 how engaged
    churnRisk: number;              // 0-100 likelihood to quit
    monetizationPotential: number;  // 0-100 if this was F2P
    sessionPatterns: SessionPattern[];

    // Behavioral clusters
    primaryArchetype: PlayerArchetype;
    secondaryArchetype: PlayerArchetype | null;
    archetypalStrength: number;     // 0-100

    // Predictive metrics
    predictedEndWeek: number;
    predictedEnding: string;
    predictedMemberCount: number;

    // Adaptive difficulty
    currentDifficulty: number;      // 0.5-2.0 multiplier
    frustrationLevel: number;       // 0-100

    // Engagement tracking
    longestStreak: number;
    averageSessionLength: number;
    preferredEventTypes: string[];
    avoidedEventTypes: string[];
}

type PlayerArchetype =
    | 'THE_SAINT'           // Pure spiritual focus
    | 'THE_HUSTLER'         // Money optimization
    | 'THE_POLITICIAN'      // Power and influence
    | 'THE_CELEBRITY'       // Fame chaser
    | 'THE_FAMILY_MAN'      // Relationships focused
    | 'THE_CHAMELEON'       // Adapts to situations
    | 'THE_RISK_TAKER'      // High-risk choices
    | 'THE_CONSERVATIVE'    // Safe choices
    | 'THE_EXPLOITER';      // Min-maxes systems

interface SessionPattern {
    dayOfWeek: number;
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    averageActions: number;
}

// ============================================================================
// PATTERN RECOGNITION
// ============================================================================

/**
 * Analyze choice history to detect behavioral patterns
 */
export function detectBehaviorPatterns(
    choiceHistory: ChoiceRecord[],
    currentWeek: number
): PlayerBehaviorPattern[] {
    const patterns: PlayerBehaviorPattern[] = [];

    // Pattern: Always chooses money
    const moneyChoices = choiceHistory.filter(c =>
        c.choiceId.includes('money') ||
        c.choiceId.includes('cash') ||
        c.choiceId.includes('pay') ||
        c.choiceId.includes('siphon')
    );
    if (moneyChoices.length > choiceHistory.length * 0.4) {
        patterns.push({
            pattern: 'MONEY_MOTIVATED',
            confidence: moneyChoices.length / choiceHistory.length,
            firstDetected: moneyChoices[0]?.week || currentWeek,
            occurrences: moneyChoices.length,
            prediction: 'Will prioritize financial gains over spiritual growth'
        });
    }

    // Pattern: Always chooses spiritual options
    const spiritualChoices = choiceHistory.filter(c =>
        c.choiceId.includes('pray') ||
        c.choiceId.includes('faith') ||
        c.choiceId.includes('anoint')
    );
    if (spiritualChoices.length > choiceHistory.length * 0.4) {
        patterns.push({
            pattern: 'SPIRITUALLY_FOCUSED',
            confidence: spiritualChoices.length / choiceHistory.length,
            firstDetected: spiritualChoices[0]?.week || currentWeek,
            occurrences: spiritualChoices.length,
            prediction: 'Will maintain high anointing but may struggle financially'
        });
    }

    // Pattern: Risk taker
    const riskyChoices = choiceHistory.filter(c =>
        c.moralWeight < -5 ||
        c.choiceId.includes('risk') ||
        c.choiceId.includes('dangerous')
    );
    if (riskyChoices.length > choiceHistory.length * 0.3) {
        patterns.push({
            pattern: 'RISK_SEEKER',
            confidence: riskyChoices.length / choiceHistory.length,
            firstDetected: riskyChoices[0]?.week || currentWeek,
            occurrences: riskyChoices.length,
            prediction: 'Will face more scandals but potentially higher rewards'
        });
    }

    // Pattern: Family focused
    const familyChoices = choiceHistory.filter(c =>
        c.category === 'family' ||
        c.choiceId.includes('family') ||
        c.choiceId.includes('mama') ||
        c.choiceId.includes('papa')
    );
    if (familyChoices.length > choiceHistory.length * 0.25) {
        patterns.push({
            pattern: 'FAMILY_ORIENTED',
            confidence: familyChoices.length / choiceHistory.length,
            firstDetected: familyChoices[0]?.week || currentWeek,
            occurrences: familyChoices.length,
            prediction: 'Will receive family support in crisis moments'
        });
    }

    return patterns;
}

// ============================================================================
// ARCHETYPE CLASSIFICATION
// ============================================================================

/**
 * Classify player into archetype using weighted scoring
 */
export function classifyPlayerArchetype(
    personality: PlayerPersonality,
    patterns: PlayerBehaviorPattern[],
    stats: { fame: number; anointing: number; personalCash: number; influence: number }
): { primary: PlayerArchetype; secondary: PlayerArchetype | null; strength: number } {
    const scores: Record<PlayerArchetype, number> = {
        'THE_SAINT': 0,
        'THE_HUSTLER': 0,
        'THE_POLITICIAN': 0,
        'THE_CELEBRITY': 0,
        'THE_FAMILY_MAN': 0,
        'THE_CHAMELEON': 0,
        'THE_RISK_TAKER': 0,
        'THE_CONSERVATIVE': 0,
        'THE_EXPLOITER': 0,
    };

    // Score based on personality
    scores['THE_SAINT'] += personality.spirituality * 0.5 + personality.morality * 0.5;
    scores['THE_HUSTLER'] += personality.ambition * 0.7 - personality.morality * 0.3;
    scores['THE_POLITICIAN'] += personality.ambition * 0.3 + (stats.influence / 100) * 0.7;
    scores['THE_CELEBRITY'] += (stats.fame / 100) * 0.8 + personality.riskTolerance * 0.2;
    scores['THE_FAMILY_MAN'] += personality.empathy * 0.8 - personality.ambition * 0.2;
    scores['THE_RISK_TAKER'] += personality.riskTolerance * 0.9;
    scores['THE_CONSERVATIVE'] += (100 - personality.riskTolerance) * 0.9;

    // Adjust based on detected patterns
    for (const pattern of patterns) {
        if (pattern.pattern === 'MONEY_MOTIVATED') {
            scores['THE_HUSTLER'] += pattern.confidence * 30;
            scores['THE_EXPLOITER'] += pattern.confidence * 20;
        }
        if (pattern.pattern === 'SPIRITUALLY_FOCUSED') {
            scores['THE_SAINT'] += pattern.confidence * 40;
        }
        if (pattern.pattern === 'RISK_SEEKER') {
            scores['THE_RISK_TAKER'] += pattern.confidence * 40;
        }
        if (pattern.pattern === 'FAMILY_ORIENTED') {
            scores['THE_FAMILY_MAN'] += pattern.confidence * 40;
        }
    }

    // Find top 2
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const primary = sorted[0][0] as PlayerArchetype;
    const secondary = sorted[1][1] > 30 ? sorted[1][0] as PlayerArchetype : null;
    const strength = Math.min(100, sorted[0][1]);

    return { primary, secondary, strength };
}

// ============================================================================
// ADAPTIVE DIFFICULTY
// ============================================================================

/**
 * Calculate optimal difficulty based on player performance
 */
export function calculateAdaptiveDifficulty(
    recentOutcomes: ('win' | 'loss' | 'neutral')[],
    currentDifficulty: number,
    frustrationLevel: number
): number {
    const recentWins = recentOutcomes.filter(o => o === 'win').length;
    const recentLosses = recentOutcomes.filter(o => o === 'loss').length;
    const winRate = recentOutcomes.length > 0 ? recentWins / recentOutcomes.length : 0.5;

    let newDifficulty = currentDifficulty;

    // Adjust based on win rate
    if (winRate > 0.7) {
        // Too easy, increase difficulty
        newDifficulty = Math.min(2.0, currentDifficulty + 0.1);
    } else if (winRate < 0.3) {
        // Too hard, decrease difficulty
        newDifficulty = Math.max(0.5, currentDifficulty - 0.15);
    }

    // Emergency adjustment for high frustration
    if (frustrationLevel > 80) {
        newDifficulty = Math.max(0.5, currentDifficulty - 0.2);
    }

    return newDifficulty;
}

/**
 * Calculate frustration level from recent gameplay
 */
export function calculateFrustration(
    recentOutcomes: ('win' | 'loss' | 'neutral')[],
    healthHistory: number[],
    scandalHistory: number[]
): number {
    let frustration = 0;

    // Consecutive losses
    let consecutiveLosses = 0;
    for (let i = recentOutcomes.length - 1; i >= 0; i--) {
        if (recentOutcomes[i] === 'loss') consecutiveLosses++;
        else break;
    }
    frustration += consecutiveLosses * 15;

    // Low health trend
    if (healthHistory.length >= 3) {
        const recent = healthHistory.slice(-3);
        if (recent.every((h, i) => i === 0 || h <= recent[i - 1])) {
            frustration += 20;
        }
        if (recent[recent.length - 1] < 3000) {
            frustration += 25;
        }
    }

    // High scandal trend
    if (scandalHistory.length >= 3) {
        const recent = scandalHistory.slice(-3);
        if (recent[recent.length - 1] > 7000) {
            frustration += 30;
        }
    }

    return Math.min(100, frustration);
}

// ============================================================================
// ENGAGEMENT SCORING
// ============================================================================

/**
 * Calculate player engagement score
 */
export function calculateEngagement(
    weeksPlayed: number,
    decisionsPerWeek: number[],
    eventVariety: number,
    achievementsUnlocked: number,
    totalAchievements: number
): number {
    let score = 0;

    // Longevity score (up to 30 points)
    score += Math.min(30, weeksPlayed * 0.5);

    // Activity score (up to 30 points)
    const avgDecisions = decisionsPerWeek.reduce((a, b) => a + b, 0) / decisionsPerWeek.length;
    score += Math.min(30, avgDecisions * 5);

    // Exploration score (up to 20 points)
    score += Math.min(20, eventVariety * 2);

    // Achievement hunting (up to 20 points)
    const achievementRate = totalAchievements > 0 ? achievementsUnlocked / totalAchievements : 0;
    score += achievementRate * 20;

    return Math.round(score);
}

/**
 * Predict churn risk
 */
export function predictChurnRisk(
    lastPlayedWeeksAgo: number,
    engagementScore: number,
    frustrationLevel: number,
    weeksPlayed: number
): number {
    let risk = 0;

    // Time since last play
    risk += lastPlayedWeeksAgo * 10;

    // Low engagement
    if (engagementScore < 30) risk += 30;
    else if (engagementScore < 50) risk += 15;

    // High frustration
    risk += frustrationLevel * 0.4;

    // Very short playtime
    if (weeksPlayed < 10) risk += 20;

    return Math.min(100, risk);
}

// ============================================================================
// PREDICTIVE GENERATION
// ============================================================================

/**
 * Predict and generate optimal next event
 */
export function generateOptimalEvent(
    profile: DeepPlayerProfile,
    recentEvents: string[],
    currentStats: { fame: number; scandal: number; anointing: number }
): { eventType: string; priority: number; reason: string } {
    // Avoid repetition
    const avoidTypes = new Set(recentEvents.slice(-5));

    // Check for frustration - give a win
    if (profile.frustrationLevel > 60) {
        return {
            eventType: 'opportunity',
            priority: 10,
            reason: 'Player frustrated, offering positive opportunity'
        };
    }

    // Match preferred event types
    const preferred = profile.preferredEventTypes.filter(t => !avoidTypes.has(t));
    if (preferred.length > 0 && Math.random() > 0.3) {
        return {
            eventType: preferred[0],
            priority: 7,
            reason: 'Matching player preferences'
        };
    }

    // Archetype-based selection
    switch (profile.primaryArchetype) {
        case 'THE_SAINT':
            return { eventType: 'spiritual', priority: 7, reason: 'Spiritual challenge for saint archetype' };
        case 'THE_HUSTLER':
            return { eventType: 'financial', priority: 7, reason: 'Money opportunity for hustler' };
        case 'THE_CELEBRITY':
            return { eventType: 'media', priority: 7, reason: 'Fame event for celebrity archetype' };
        case 'THE_POLITICIAN':
            return { eventType: 'political', priority: 7, reason: 'Power event for politician' };
        case 'THE_FAMILY_MAN':
            return { eventType: 'family', priority: 7, reason: 'Family event for family-focused player' };
        default:
            return { eventType: 'random', priority: 5, reason: 'Standard random event' };
    }
}

// ============================================================================
// EXPORTS
// ============================================================================

export function createDeepProfile(): DeepPlayerProfile {
    return {
        engagementScore: 50,
        churnRisk: 20,
        monetizationPotential: 50,
        sessionPatterns: [],
        primaryArchetype: 'THE_CHAMELEON',
        secondaryArchetype: null,
        archetypalStrength: 0,
        predictedEndWeek: 520, // 10 years
        predictedEnding: 'UNKNOWN',
        predictedMemberCount: 1000,
        currentDifficulty: 1.0,
        frustrationLevel: 0,
        longestStreak: 0,
        averageSessionLength: 0,
        preferredEventTypes: [],
        avoidedEventTypes: [],
    };
}
