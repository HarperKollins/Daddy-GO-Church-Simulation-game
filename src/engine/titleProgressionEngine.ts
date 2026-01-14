/**
 * Title & Status Progression System
 * 
 * The title obsession:
 * - Brother → Pastor → Apostle → Prophet → Bishop → Daddy G.O.
 * - Each title has requirements
 * - NPCs react differently based on title
 * - Title affects available actions
 */

// ============================================================================
// TITLE DEFINITIONS
// ============================================================================

export interface PastoralTitle {
    id: string;
    name: string;
    prefix: string;
    tier: number;           // 1-10
    requirements: TitleRequirements;
    perks: TitlePerks;
    socialWeight: number;   // Respect level
    description: string;
}

export interface TitleRequirements {
    minMembers?: number;
    minAnointing?: number;
    minFame?: number;
    minWeeks?: number;
    ordainedBy?: string;    // Who must ordain you
    bibleSchool?: boolean;
    propheciesGiven?: number;
    churchesPlanted?: number;
}

export interface TitlePerks {
    fameMultiplier: number;
    offeringMultiplier: number;
    credibilityBonus: number;
    unlockedActions: string[];
}

// ============================================================================
// TITLE HIERARCHY
// ============================================================================

export const TITLE_HIERARCHY: PastoralTitle[] = [
    {
        id: 'BROTHER',
        name: 'Brother/Sister',
        prefix: 'Bro.',
        tier: 1,
        requirements: {},
        perks: {
            fameMultiplier: 1.0,
            offeringMultiplier: 1.0,
            credibilityBonus: 0,
            unlockedActions: ['pray', 'witness']
        },
        socialWeight: 10,
        description: 'Basic church member.'
    },
    {
        id: 'WORKER',
        name: 'Church Worker',
        prefix: 'Worker',
        tier: 2,
        requirements: {
            minWeeks: 12,
            minAnointing: 1000
        },
        perks: {
            fameMultiplier: 1.1,
            offeringMultiplier: 1.0,
            credibilityBonus: 5,
            unlockedActions: ['usher', 'choir']
        },
        socialWeight: 20,
        description: 'Active service in church.'
    },
    {
        id: 'DEACON',
        name: 'Deacon/Deaconess',
        prefix: 'Deacon',
        tier: 3,
        requirements: {
            minWeeks: 52,
            minAnointing: 2000,
            minMembers: 50
        },
        perks: {
            fameMultiplier: 1.2,
            offeringMultiplier: 1.1,
            credibilityBonus: 10,
            unlockedActions: ['counsel', 'lead_prayer']
        },
        socialWeight: 35,
        description: 'Ordained church elder.'
    },
    {
        id: 'PASTOR',
        name: 'Pastor',
        prefix: 'Pastor',
        tier: 4,
        requirements: {
            minWeeks: 104,
            minAnointing: 3500,
            minMembers: 100,
            bibleSchool: true
        },
        perks: {
            fameMultiplier: 1.5,
            offeringMultiplier: 1.3,
            credibilityBonus: 25,
            unlockedActions: ['preach', 'ordain_workers', 'conduct_wedding']
        },
        socialWeight: 60,
        description: 'Shepherd of a flock.'
    },
    {
        id: 'SENIOR_PASTOR',
        name: 'Senior Pastor',
        prefix: 'Senior Pastor',
        tier: 5,
        requirements: {
            minWeeks: 156,
            minAnointing: 5000,
            minMembers: 500,
            minFame: 3000
        },
        perks: {
            fameMultiplier: 1.8,
            offeringMultiplier: 1.5,
            credibilityBonus: 40,
            unlockedActions: ['ordain_pastors', 'start_branch']
        },
        socialWeight: 75,
        description: 'Head of a significant church.'
    },
    {
        id: 'REVEREND',
        name: 'Reverend',
        prefix: 'Rev.',
        tier: 6,
        requirements: {
            minWeeks: 260,
            minAnointing: 6000,
            minMembers: 1000,
            bibleSchool: true
        },
        perks: {
            fameMultiplier: 2.0,
            offeringMultiplier: 1.8,
            credibilityBonus: 55,
            unlockedActions: ['theological_degree', 'media_appearances']
        },
        socialWeight: 82,
        description: 'Academic and spiritual authority.'
    },
    {
        id: 'PROPHET',
        name: 'Prophet',
        prefix: 'Prophet',
        tier: 7,
        requirements: {
            minAnointing: 7000,
            minFame: 5000,
            propheciesGiven: 50
        },
        perks: {
            fameMultiplier: 2.5,
            offeringMultiplier: 2.0,
            credibilityBonus: 70,
            unlockedActions: ['give_prophecy', 'prophetic_school']
        },
        socialWeight: 88,
        description: 'Claims to hear directly from God.'
    },
    {
        id: 'APOSTLE',
        name: 'Apostle',
        prefix: 'Apostle',
        tier: 8,
        requirements: {
            minAnointing: 8000,
            minMembers: 5000,
            minFame: 7000,
            churchesPlanted: 5
        },
        perks: {
            fameMultiplier: 3.0,
            offeringMultiplier: 2.5,
            credibilityBonus: 85,
            unlockedActions: ['apostolic_covering', 'ordain_apostles']
        },
        socialWeight: 93,
        description: 'Overseer of multiple churches.'
    },
    {
        id: 'BISHOP',
        name: 'Bishop',
        prefix: 'Bishop',
        tier: 9,
        requirements: {
            minAnointing: 9000,
            minMembers: 10000,
            minFame: 8000,
            churchesPlanted: 10
        },
        perks: {
            fameMultiplier: 4.0,
            offeringMultiplier: 3.0,
            credibilityBonus: 95,
            unlockedActions: ['episcopal_authority', 'political_endorsement']
        },
        socialWeight: 97,
        description: 'Denominational leader.'
    },
    {
        id: 'DADDY_GO',
        name: 'Daddy G.O.',
        prefix: 'Daddy',
        tier: 10,
        requirements: {
            minAnointing: 9500,
            minMembers: 50000,
            minFame: 9500,
            minWeeks: 520
        },
        perks: {
            fameMultiplier: 5.0,
            offeringMultiplier: 4.0,
            credibilityBonus: 100,
            unlockedActions: ['everything']
        },
        socialWeight: 100,
        description: 'The ultimate Nigerian pastor title.'
    }
];

// ============================================================================
// CUSTOM TITLES
// ============================================================================

export const CUSTOM_TITLE_PREFIXES = [
    'Arch',           // Archbishop
    'Grand',          // Grand Apostle
    'Senior',         // Senior Prophet
    'General',        // General Overseer
    'Supreme',        // Supreme Bishop
    'International',  // International Bishop
    'Most Senior',    // Most Senior Apostle
    'His Eminence',   // His Eminence
    'Papa',           // Papa Bishop
];

// ============================================================================
// TITLE FUNCTIONS
// ============================================================================

/**
 * Check if player qualifies for a title
 */
export function checkTitleEligibility(
    title: PastoralTitle,
    stats: {
        members: number;
        anointing: number;
        fame: number;
        weeks: number;
        hasBibleSchool: boolean;
        propheciesGiven: number;
        churchesPlanted: number;
    }
): { eligible: boolean; missingReqs: string[] } {
    const missing: string[] = [];
    const req = title.requirements;

    if (req.minMembers && stats.members < req.minMembers) {
        missing.push(`Need ${req.minMembers} members (have ${stats.members})`);
    }
    if (req.minAnointing && stats.anointing < req.minAnointing) {
        missing.push(`Need ${req.minAnointing} anointing (have ${stats.anointing})`);
    }
    if (req.minFame && stats.fame < req.minFame) {
        missing.push(`Need ${req.minFame} fame (have ${stats.fame})`);
    }
    if (req.minWeeks && stats.weeks < req.minWeeks) {
        missing.push(`Need ${req.minWeeks} weeks ministry (have ${stats.weeks})`);
    }
    if (req.bibleSchool && !stats.hasBibleSchool) {
        missing.push('Need Bible School certificate');
    }
    if (req.propheciesGiven && stats.propheciesGiven < req.propheciesGiven) {
        missing.push(`Need ${req.propheciesGiven} prophecies (have ${stats.propheciesGiven})`);
    }
    if (req.churchesPlanted && stats.churchesPlanted < req.churchesPlanted) {
        missing.push(`Need ${req.churchesPlanted} churches planted (have ${stats.churchesPlanted})`);
    }

    return { eligible: missing.length === 0, missingReqs: missing };
}

/**
 * Get highest eligible title
 */
export function getHighestEligibleTitle(
    stats: {
        members: number;
        anointing: number;
        fame: number;
        weeks: number;
        hasBibleSchool: boolean;
        propheciesGiven: number;
        churchesPlanted: number;
    }
): PastoralTitle {
    // Check from highest to lowest
    for (let i = TITLE_HIERARCHY.length - 1; i >= 0; i--) {
        const result = checkTitleEligibility(TITLE_HIERARCHY[i], stats);
        if (result.eligible) {
            return TITLE_HIERARCHY[i];
        }
    }
    return TITLE_HIERARCHY[0]; // Return Brother if nothing else
}

/**
 * Calculate NPC reaction based on title
 */
export function calculateTitleReaction(
    playerTitle: PastoralTitle,
    npcTitle: PastoralTitle | null
): { respect: number; deference: boolean; jealousy: number } {
    const npcWeight = npcTitle?.socialWeight || 30;
    const playerWeight = playerTitle.socialWeight;

    const tierDiff = playerWeight - npcWeight;

    return {
        respect: Math.min(100, 50 + tierDiff),
        deference: tierDiff > 20,
        jealousy: tierDiff > 0 && tierDiff < 30 ? 30 + tierDiff : 0
    };
}

/**
 * Generate title address options
 */
export function generateTitleAddress(title: PastoralTitle): string[] {
    const addresses = [
        `${title.prefix}`,
        `${title.name}`,
        `The ${title.name}`,
    ];

    // Add custom variations for higher titles
    if (title.tier >= 7) {
        CUSTOM_TITLE_PREFIXES.forEach(prefix => {
            addresses.push(`${prefix} ${title.name}`);
        });
    }

    return addresses;
}

// ============================================================================
// ANOINTING ADDICTION SYSTEM
// ============================================================================

export interface AnointingState {
    currentLevel: number;           // 0-10000
    peakLevel: number;              // Highest ever achieved
    withdrawalLevel: number;        // 0-100 (how bad withdrawal is)
    lastHighWeek: number;           // Last spiritual "high"
    addictionLevel: number;         // 0-100
    tolerance: number;              // How much needed for same effect
}

/**
 * Process anointing addiction
 */
export function processAnointingAddiction(state: AnointingState, currentWeek: number): {
    state: AnointingState;
    emotionalEffect: 'euphoria' | 'stable' | 'anxious' | 'depressed' | 'desperate';
    narrative: string;
} {
    const weeksSinceHigh = currentWeek - state.lastHighWeek;

    // Withdrawal kicks in after 2 weeks without spiritual high
    let withdrawalLevel = 0;
    if (weeksSinceHigh > 2) {
        withdrawalLevel = Math.min(100, (weeksSinceHigh - 2) * 10);
    }

    // Addiction increases with more highs
    const addictionLevel = Math.min(100, state.addictionLevel + (state.currentLevel > state.peakLevel * 0.8 ? 2 : 0));

    // Tolerance builds up
    const tolerance = Math.min(200, state.tolerance + (state.currentLevel > 5000 ? 1 : 0));

    // Emotional effect based on gap between peak and current
    const gap = (state.peakLevel - state.currentLevel) / state.peakLevel;
    let emotionalEffect: 'euphoria' | 'stable' | 'anxious' | 'depressed' | 'desperate';
    let narrative: string;

    if (state.currentLevel >= state.peakLevel * 0.9) {
        emotionalEffect = 'euphoria';
        narrative = 'You feel the power of God coursing through you. This is what you live for!';
    } else if (gap < 0.2) {
        emotionalEffect = 'stable';
        narrative = 'Your spiritual life is steady. But you remember the highs...';
    } else if (gap < 0.4) {
        emotionalEffect = 'anxious';
        narrative = 'Something is missing. The anointing feels distant. You need more prayer time.';
    } else if (gap < 0.6) {
        emotionalEffect = 'depressed';
        narrative = 'The heavens feel like brass. Has God left you? The doubt creeps in...';
    } else {
        emotionalEffect = 'desperate';
        narrative = 'You would do ANYTHING to feel that power again. Anything.';
    }

    return {
        state: {
            ...state,
            withdrawalLevel,
            addictionLevel,
            tolerance,
            peakLevel: Math.max(state.peakLevel, state.currentLevel),
            lastHighWeek: state.currentLevel > state.peakLevel * 0.8 ? currentWeek : state.lastHighWeek
        },
        emotionalEffect,
        narrative
    };
}

// ============================================================================
// EXPORTS
// ============================================================================

export function getNextTitle(currentTitle: PastoralTitle): PastoralTitle | null {
    const currentIndex = TITLE_HIERARCHY.findIndex(t => t.id === currentTitle.id);
    if (currentIndex === -1 || currentIndex === TITLE_HIERARCHY.length - 1) {
        return null;
    }
    return TITLE_HIERARCHY[currentIndex + 1];
}

export function createDefaultAnointingState(): AnointingState {
    return {
        currentLevel: 2000,
        peakLevel: 2000,
        withdrawalLevel: 0,
        lastHighWeek: 0,
        addictionLevel: 0,
        tolerance: 100
    };
}
