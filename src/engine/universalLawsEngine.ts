/**
 * Universal Laws Engine
 * 
 * Implements real-world laws that govern the game:
 * 
 * PHYSICS LAWS:
 * - Newton's Laws (action/reaction, momentum, inertia)
 * - Law of Entropy (things decay)
 * - Conservation of Energy (can't create from nothing)
 * 
 * BIBLICAL LAWS:
 * - Law of Sowing and Reaping (Galatians 6:7)
 * - Law of Increase (give and it shall be given)
 * - Law of Persecution (the righteous suffer)
 * - Law of Generational Blessing/Curse
 * 
 * LIFE LAWS:
 * - Murphy's Law (what can go wrong will)
 * - Pareto Principle (80/20 rule)
 * - Law of Diminishing Returns
 * - Peter Principle (rise to incompetence)
 */

import type { CoreStats, KarmaLedger } from '@/types/game';

// ============================================================================
// NEWTON'S LAWS
// ============================================================================

/**
 * Newton's First Law: Inertia
 * Objects in motion stay in motion, objects at rest stay at rest
 */
export function applyInertia(
    previousTrend: 'rising' | 'falling' | 'stable',
    currentValue: number,
    targetValue: number,
    resistance: number = 0.3
): number {
    const change = targetValue - currentValue;

    // Momentum makes it harder to reverse direction
    if (previousTrend === 'rising' && change < 0) {
        return currentValue + (change * (1 - resistance));
    }
    if (previousTrend === 'falling' && change > 0) {
        return currentValue + (change * (1 - resistance));
    }

    // Same direction gets boost
    if ((previousTrend === 'rising' && change > 0) ||
        (previousTrend === 'falling' && change < 0)) {
        return currentValue + (change * (1 + resistance * 0.5));
    }

    return targetValue;
}

/**
 * Newton's Second Law: Force = Mass × Acceleration
 * Bigger entities are harder to change
 */
export function applyF_MA(
    mass: number,        // Church size, fame level, etc.
    force: number,       // The action/event impact
    maxMass: number = 10000
): number {
    // Normalize mass (0-1)
    const normalizedMass = Math.min(1, mass / maxMass);

    // Bigger mass = smaller acceleration
    const acceleration = force / (1 + normalizedMass * 2);

    return acceleration;
}

/**
 * Newton's Third Law: Action/Reaction
 * Every action has an equal and opposite reaction
 */
export function applyActionReaction(
    action: { type: string; magnitude: number },
    karmaLedger: KarmaLedger
): { reactionType: string; reactionMagnitude: number; delay: number } {
    // Positive actions build up positive karma, which eventually returns
    // Negative actions build up negative karma, which eventually punishes

    const karmaMultiplier = 1 + Math.abs(karmaLedger.netKarma) / 10000;

    if (action.magnitude > 0) {
        // Good action
        return {
            reactionType: action.type === 'financial' ? 'financial_blessing' : 'spiritual_blessing',
            reactionMagnitude: action.magnitude * karmaMultiplier,
            delay: Math.floor(Math.random() * 20) + 5, // 5-25 weeks
        };
    } else {
        // Bad action
        return {
            reactionType: action.type === 'financial' ? 'financial_loss' : 'scandal',
            reactionMagnitude: Math.abs(action.magnitude) * karmaMultiplier,
            delay: Math.floor(Math.random() * 30) + 10, // 10-40 weeks
        };
    }
}

// ============================================================================
// BIBLICAL LAWS
// ============================================================================

/**
 * Law of Sowing and Reaping (Galatians 6:7)
 * "Whatsoever a man soweth, that shall he also reap"
 */
export function applyReapWhatYouSow(
    seedActions: Array<{ type: string; value: number; week: number }>,
    currentWeek: number,
    harvestMultiplier: number = 3
): Array<{ type: string; harvest: number }> {
    const harvests: Array<{ type: string; harvest: number }> = [];

    for (const seed of seedActions) {
        // Harvest comes after 10-50 weeks
        const harvestWeek = seed.week + Math.floor(seed.value / 100) + 10;

        if (currentWeek >= harvestWeek) {
            harvests.push({
                type: seed.type,
                harvest: seed.value * harvestMultiplier,
            });
        }
    }

    return harvests;
}

/**
 * Law of Increase (Luke 6:38)
 * "Give, and it will be given to you... pressed down, shaken together"
 */
export function applyLawOfIncrease(
    givenAmount: number,
    anointing: number,
    faith: number = 50
): number {
    // Higher anointing and faith = higher return multiplier
    const faithMultiplier = 1 + (faith / 100);
    const anointingMultiplier = 1 + (anointing / 10000);

    // Returns between 1x and 10x
    const returnMultiplier = Math.min(10, faithMultiplier * anointingMultiplier * (1 + Math.random()));

    return Math.floor(givenAmount * returnMultiplier);
}

/**
 * Law of Persecution (2 Timothy 3:12)
 * "All who desire to live godly... will suffer persecution"
 */
export function calculatePersecutionRisk(
    anointing: number,
    fame: number,
    integrity: number
): number {
    // High anointing + high integrity = more persecution
    // High fame = more visibility = more targets

    const righteousnessScore = (anointing / 10000) * (integrity / 100);
    const visibilityScore = fame / 10000;

    // Persecution probability increases with righteousness
    return righteousnessScore * visibilityScore * 100;
}

/**
 * Law of Generational Effects (Exodus 20:5-6)
 * Blessings and curses pass through generations
 */
export interface GenerationalEffect {
    type: 'blessing' | 'curse';
    source: string;
    strength: number;
    generationsRemaining: number;
}

export function processGenerationalEffects(
    effects: GenerationalEffect[],
    stats: CoreStats
): CoreStats {
    let modifiedStats = { ...stats };

    for (const effect of effects) {
        const modifier = effect.type === 'blessing' ? 1 : -1;
        const impact = effect.strength * (effect.generationsRemaining / 4);

        if (effect.source === 'financial') {
            modifiedStats.personalCash += modifier * impact * 1000;
        } else if (effect.source === 'spiritual') {
            modifiedStats.anointing += modifier * impact * 100;
        } else if (effect.source === 'health') {
            modifiedStats.health += modifier * impact * 100;
        }
    }

    return modifiedStats;
}

// ============================================================================
// MURPHY'S LAW & LIFE LAWS
// ============================================================================

/**
 * Murphy's Law: What can go wrong, will go wrong
 * Applies when player is "too comfortable"
 */
export function applyMurphysLaw(
    weeksWithoutCrisis: number,
    currentLuck: number
): { shouldTriggerCrisis: boolean; severity: number } {
    // The longer without crisis, the higher the chance
    const crisisChance = Math.min(0.8, weeksWithoutCrisis * 0.05);

    if (Math.random() < crisisChance) {
        // Bad luck compounds
        const severity = Math.min(100, (weeksWithoutCrisis * 5) + (100 - currentLuck));
        return { shouldTriggerCrisis: true, severity };
    }

    return { shouldTriggerCrisis: false, severity: 0 };
}

/**
 * Pareto Principle (80/20 Rule)
 * 20% of members give 80% of offerings
 */
export function applyParetoToOfferings(
    totalMembers: number,
    baseOfferingPerMember: number
): number {
    const topGivers = Math.floor(totalMembers * 0.2);
    const regularGivers = totalMembers - topGivers;

    // Top 20% give 4x the average
    const topGiversTotal = topGivers * baseOfferingPerMember * 4;
    // Bottom 80% give 0.25x the average
    const regularGiversTotal = regularGivers * baseOfferingPerMember * 0.25;

    return topGiversTotal + regularGiversTotal;
}

/**
 * Law of Diminishing Returns
 * More of the same action gives less benefit
 */
export function applyDiminishingReturns(
    actionCount: number,
    baseEffect: number,
    halfLifeCount: number = 5
): number {
    // Effect halves every halfLifeCount repetitions
    const diminishFactor = Math.pow(0.5, actionCount / halfLifeCount);
    return Math.floor(baseEffect * diminishFactor);
}

/**
 * Peter Principle: Rise to your level of incompetence
 */
export function checkPeterPrinciple(
    currentVenueIndex: number,
    skills: { preaching: number; business: number; politics: number }
): { struggling: boolean; suggestedAction: string } {
    const averageSkill = (skills.preaching + skills.business + skills.politics) / 3;
    const requiredSkill = currentVenueIndex * 2; // Higher venues need more skill

    if (averageSkill < requiredSkill) {
        return {
            struggling: true,
            suggestedAction: 'Train skills or delegate responsibilities'
        };
    }

    return { struggling: false, suggestedAction: '' };
}

// ============================================================================
// COMPOUND EFFECTS
// ============================================================================

/**
 * Law of Compound Interest (applied to fame, anointing, scandal)
 */
export function applyCompoundGrowth(
    currentValue: number,
    weeklyRate: number,  // e.g., 0.02 for 2%
    weeks: number
): number {
    return Math.floor(currentValue * Math.pow(1 + weeklyRate, weeks));
}

/**
 * Law of Entropy (Second Law of Thermodynamics)
 * Everything decays without energy input
 */
export function applyEntropy(
    stats: CoreStats,
    maintenanceLevel: number  // 0-100, how much effort player puts in
): CoreStats {
    const decayRate = (100 - maintenanceLevel) / 1000;

    return {
        ...stats,
        health: Math.max(0, stats.health - (stats.health * decayRate)),
        anointing: Math.max(0, stats.anointing - (stats.anointing * decayRate * 1.5)),
        fame: Math.max(0, stats.fame - (stats.fame * decayRate * 0.5)),
        // Scandal doesn't decay - it compounds!
        scandal: stats.scandal,
        energy: stats.energy,
        personalCash: stats.personalCash,
        churchCash: stats.churchCash,
        stress: Math.min(10000, stats.stress + (stats.stress * decayRate * 0.3)),
        influence: Math.max(0, stats.influence - (stats.influence * decayRate * 0.7)),
    };
}

// ============================================================================
// QUICK HELPERS
// ============================================================================

export const LAWS = {
    newton: {
        inertia: applyInertia,
        fma: applyF_MA,
        actionReaction: applyActionReaction,
    },
    biblical: {
        reapWhatYouSow: applyReapWhatYouSow,
        lawOfIncrease: applyLawOfIncrease,
        persecution: calculatePersecutionRisk,
        generational: processGenerationalEffects,
    },
    life: {
        murphy: applyMurphysLaw,
        pareto: applyParetoToOfferings,
        diminishingReturns: applyDiminishingReturns,
        peter: checkPeterPrinciple,
    },
    physics: {
        compound: applyCompoundGrowth,
        entropy: applyEntropy,
    },
};
