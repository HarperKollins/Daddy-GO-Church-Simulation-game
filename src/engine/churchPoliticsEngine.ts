/**
 * Church Split & Internal Politics Engine
 * 
 * The drama of church leadership:
 * - Factions forming in your church
 * - Dissent and murmuring
 * - Coup attempts by ambitious pastors
 * - Member exodus events
 * - Reconciliation mechanics
 */

// ============================================================================
// FACTION SYSTEM
// ============================================================================

export interface ChurchFaction {
    id: string;
    name: string;
    leader: string;
    leaderType: 'pastor' | 'elder' | 'deacon' | 'wealthy_member' | 'founder_family';
    memberCount: number;
    loyalty: number;           // 0-100 to main pastor
    grievance: string;
    power: number;             // Political power in church
    openlyDefiant: boolean;
    weekFormed: number;
}

export interface ChurchPolitics {
    factions: ChurchFaction[];
    overallUnity: number;      // 0-100
    publicScandals: number;
    suppressedDissent: number;
    lastSplit: number;         // Week of last split
    splitHistory: ChurchSplit[];
}

export interface ChurchSplit {
    week: number;
    factionName: string;
    membersLost: number;
    reason: string;
    newChurchName: string;
    stillRival: boolean;
}

// ============================================================================
// GRIEVANCE TEMPLATES
// ============================================================================

const GRIEVANCE_TYPES = [
    'Financial opacity - Where is the money going?',
    'Pastor\'s lifestyle is too extravagant',
    'Not enough focus on youth ministry',
    'Too much focus on prosperity, not salvation',
    'Pastor is never available for counseling',
    'Branch pastors are being neglected',
    'Women are not given leadership roles',
    'The worship style is too worldly',
    'The worship style is too boring',
    'Favorites are being promoted unfairly',
    'The pastor\'s wife has too much power',
    'Doctrine has drifted from our roots',
    'Too political, should focus on gospel',
    'Not political enough, church should influence society',
    'Elder Okonkwo was treated unfairly'
];

// ============================================================================
// FACTION FUNCTIONS
// ============================================================================

/**
 * Check conditions for faction formation
 */
export function checkFactionFormation(
    members: number,
    scandal: number,
    leadershipSatisfaction: number,
    weeksWithoutCrisis: number
): { willForm: boolean; reason: string } {
    // Factions form when:
    // 1. Church is big enough (needs critical mass)
    // 2. There's dissatisfaction
    // 3. There hasn't been a recent crisis (unifying event)

    if (members < 200) {
        return { willForm: false, reason: 'Church too small for factions' };
    }

    const formationChance =
        (scandal / 10000) * 0.3 +
        ((100 - leadershipSatisfaction) / 100) * 0.4 +
        (weeksWithoutCrisis > 20 ? 0.1 : 0);

    if (Math.random() < formationChance) {
        return {
            willForm: true,
            reason: GRIEVANCE_TYPES[Math.floor(Math.random() * GRIEVANCE_TYPES.length)]
        };
    }

    return { willForm: false, reason: '' };
}

/**
 * Create a new faction
 */
export function createFaction(
    leaderName: string,
    leaderType: ChurchFaction['leaderType'],
    grievance: string,
    initialMembers: number,
    week: number
): ChurchFaction {
    return {
        id: `FACTION_${Date.now()}`,
        name: `${leaderName}'s Group`,
        leader: leaderName,
        leaderType,
        memberCount: initialMembers,
        loyalty: 40,  // Start with some loyalty
        grievance,
        power: initialMembers / 10 + (leaderType === 'wealthy_member' ? 20 : 0),
        openlyDefiant: false,
        weekFormed: week
    };
}

/**
 * Update faction weekly
 */
export function updateFaction(
    faction: ChurchFaction,
    pastoralResponse: 'ignore' | 'address' | 'suppress' | 'negotiate',
    scandalThisWeek: boolean
): ChurchFaction {
    let loyaltyChange = 0;
    let powerChange = 0;
    let defiant = faction.openlyDefiant;

    switch (pastoralResponse) {
        case 'ignore':
            loyaltyChange = -5;
            powerChange = 2;
            if (faction.loyalty < 30) defiant = true;
            break;
        case 'address':
            loyaltyChange = 10;
            powerChange = -3;
            break;
        case 'suppress':
            loyaltyChange = -15;
            powerChange = scandalThisWeek ? 10 : -5;
            defiant = true;
            break;
        case 'negotiate':
            loyaltyChange = 5;
            powerChange = 5;  // They gain power but stay loyal
            break;
    }

    // Scandals always reduce loyalty
    if (scandalThisWeek) {
        loyaltyChange -= 10;
        powerChange += 5;
    }

    return {
        ...faction,
        loyalty: Math.max(0, Math.min(100, faction.loyalty + loyaltyChange)),
        power: Math.max(0, faction.power + powerChange),
        openlyDefiant: defiant
    };
}

/**
 * Check if faction will split
 */
export function checkSplitRisk(faction: ChurchFaction): {
    willSplit: boolean;
    type: 'peaceful' | 'hostile' | 'scandal';
    negotiable: boolean;
} {
    if (faction.loyalty > 40) {
        return { willSplit: false, type: 'peaceful', negotiable: true };
    }

    const splitChance = (100 - faction.loyalty) / 100 * (faction.power / 50);

    if (Math.random() < splitChance) {
        const type = faction.openlyDefiant
            ? 'hostile'
            : faction.power > 30
                ? 'scandal'
                : 'peaceful';

        return {
            willSplit: true,
            type,
            negotiable: type === 'peaceful'
        };
    }

    return { willSplit: false, type: 'peaceful', negotiable: true };
}

/**
 * Execute church split
 */
export function executeChurchSplit(
    faction: ChurchFaction,
    totalMembers: number,
    splitType: 'peaceful' | 'hostile' | 'scandal'
): ChurchSplit {
    // Calculate members lost
    let membersLost = faction.memberCount;

    // In hostile splits, they take more people
    if (splitType === 'hostile') {
        membersLost += Math.floor(totalMembers * 0.1);  // Additional 10%
    }

    // Scandal splits are the worst
    if (splitType === 'scandal') {
        membersLost += Math.floor(totalMembers * 0.15);
    }

    const newChurchName = generateSplitChurchName(faction.leader);

    return {
        week: 0,  // Will be set by caller
        factionName: faction.name,
        membersLost,
        reason: faction.grievance,
        newChurchName,
        stillRival: splitType !== 'peaceful'
    };
}

/**
 * Generate realistic split church name
 */
function generateSplitChurchName(leaderName: string): string {
    const prefixes = [
        'True Faith', 'New Covenant', 'Living Word', 'Greater Grace',
        'Deeper Life', 'Higher Calling', 'Pure Gospel', 'Original'
    ];
    const suffixes = [
        'Ministries', 'International', 'Church', 'Assembly', 'Fellowship',
        'Bible Church', 'Worship Centre'
    ];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return `${prefix} ${suffix}` + (Math.random() > 0.5 ? ` (${leaderName})` : '');
}

// ============================================================================
// COUP ATTEMPTS
// ============================================================================

export interface CoupAttempt {
    id: string;
    leaderId: string;
    leaderName: string;
    plotWeek: number;
    executionWeek: number;
    conspirators: string[];
    method: 'vote_of_no_confidence' | 'financial_expose' | 'moral_scandal' | 'board_takeover' | 'member_petition';
    successChance: number;
    detected: boolean;
}

/**
 * Detect coup plotting
 */
export function detectCoupPlot(
    factions: ChurchFaction[],
    trustInFellowship: number,
    hasLoyalists: boolean
): CoupAttempt | null {
    // Find factions that might coup
    const potentialCoupers = factions.filter(f => f.loyalty < 30 && f.power > 20);

    if (potentialCoupers.length === 0) return null;

    const mastermind = potentialCoupers.reduce((prev, curr) =>
        curr.power > prev.power ? curr : prev
    );

    const coupChance = (mastermind.power / 100) * (1 - mastermind.loyalty / 100);

    if (Math.random() < coupChance * 0.3) {  // 30% max chance
        const methods: CoupAttempt['method'][] = [
            'vote_of_no_confidence', 'financial_expose', 'moral_scandal',
            'board_takeover', 'member_petition'
        ];

        return {
            id: `COUP_${Date.now()}`,
            leaderId: mastermind.id,
            leaderName: mastermind.leader,
            plotWeek: 0,  // Set by caller
            executionWeek: 0,  // Set by caller
            conspirators: [],
            method: methods[Math.floor(Math.random() * methods.length)],
            successChance: mastermind.power / 2,
            detected: hasLoyalists && Math.random() > 0.5
        };
    }

    return null;
}

/**
 * Respond to coup attempt
 */
export function respondToCoup(
    coup: CoupAttempt,
    response: 'ignore' | 'confront' | 'negotiate' | 'preemptive_strike' | 'purge'
): { success: boolean; result: string; consequences: Record<string, number> } {
    const results = {
        ignore: {
            success: Math.random() < coup.successChance / 100,
            result: 'You let it play out...',
            consequences: { stress: 50, scandal: 30 }
        },
        confront: {
            success: Math.random() < 0.6,
            result: 'Public confrontation in church!',
            consequences: { scandal: 40, unity: -20 }
        },
        negotiate: {
            success: Math.random() < 0.7,
            result: 'Backroom deal reached.',
            consequences: { power: -10, money: -5000000 }
        },
        preemptive_strike: {
            success: Math.random() < 0.5,
            result: 'You struck first!',
            consequences: { scandal: 20, reputation: -10, churchSize: -5 }
        },
        purge: {
            success: Math.random() < 0.4,
            result: 'Mass dismissals!',
            consequences: { scandal: 50, unity: -40, churchSize: -15 }
        }
    };

    return results[response];
}

// ============================================================================
// RECONCILIATION
// ============================================================================

/**
 * Attempt to reconcile with split faction
 */
export function attemptReconciliation(
    split: ChurchSplit,
    weeksSinceSplit: number,
    offeringPackage: number
): { success: boolean; membersReturned: number; narrative: string } {
    // Harder to reconcile as time passes
    const timeFactor = Math.max(0.1, 1 - (weeksSinceSplit / 52));
    // Money talks
    const moneyFactor = Math.min(1, offeringPackage / 10000000);
    // Hostile splits are harder
    const hostileFactor = split.stillRival ? 0.5 : 1;

    const successChance = timeFactor * 0.4 + moneyFactor * 0.4 + hostileFactor * 0.2;

    if (Math.random() < successChance) {
        const returned = Math.floor(split.membersLost * 0.3);  // At most 30% return
        return {
            success: true,
            membersReturned: returned,
            narrative: `After negotiations, ${returned} members have returned. The body of Christ is healing.`
        };
    }

    return {
        success: false,
        membersReturned: 0,
        narrative: split.stillRival
            ? `They rejected your offer. ${split.newChurchName} is growing stronger.`
            : 'They politely declined. They\'ve found a new home.'
    };
}

// ============================================================================
// EXPORTS
// ============================================================================

export function createDefaultPolitics(): ChurchPolitics {
    return {
        factions: [],
        overallUnity: 100,
        publicScandals: 0,
        suppressedDissent: 0,
        lastSplit: 0,
        splitHistory: []
    };
}

export function calculateUnity(politics: ChurchPolitics): number {
    const factionDrain = politics.factions.reduce((sum, f) =>
        sum + (100 - f.loyalty) / 10, 0
    );
    const scandalDrain = politics.publicScandals * 5;
    const splitDrain = politics.splitHistory.length * 10;

    return Math.max(0, 100 - factionDrain - scandalDrain - splitDrain);
}
