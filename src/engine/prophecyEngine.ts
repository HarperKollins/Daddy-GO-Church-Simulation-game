/**
 * Prophecy System Engine
 * 
 * Deep prophetic mechanics:
 * - Give prophecies (generic to specific)
 * - Track fulfillment/failure
 * - Reputation effects
 * - Cover-up mechanics
 * - Prophetic competition with other pastors
 */

// ============================================================================
// PROPHECY DEFINITIONS
// ============================================================================

export interface Prophecy {
    id: string;
    type: ProphecyType;
    specificity: 'vague' | 'moderate' | 'specific' | 'extremely_specific';
    content: string;
    targetPerson?: string;          // Who is this prophecy for?
    targetNation?: string;          // National prophecies
    predictedWeek?: number;         // When should it happen?
    givenWeek: number;              // When was it given?
    status: 'pending' | 'fulfilled' | 'failed' | 'expired' | 'covered_up';
    fulfillmentWeek?: number;
    verifiable: boolean;            // Can this be fact-checked?
    witnesses: string[];
    publiclyShared: boolean;
    reputationAtStake: number;      // How much rep is riding on this?
}

export type ProphecyType =
    | 'personal_blessing'
    | 'warning'
    | 'healing'
    | 'marriage'
    | 'financial'
    | 'political'
    | 'national'
    | 'death'
    | 'disaster'
    | 'election';

export interface PropheticTrackRecord {
    totalProphecies: number;
    fulfilled: number;
    failed: number;
    pending: number;
    coveredUp: number;
    publicAccuracy: number;  // What the public thinks
    actualAccuracy: number;  // The real accuracy
    reputation: number;      // 0-100
}

// ============================================================================
// PROPHECY TEMPLATES
// ============================================================================

const PROPHECY_TEMPLATES: Record<ProphecyType, { vague: string[], moderate: string[], specific: string[] }> = {
    personal_blessing: {
        vague: [
            'God says your breakthrough is near',
            'The Lord says He has not forgotten you',
            'Something good is coming to your household'
        ],
        moderate: [
            'Before the year ends, you will have something to celebrate',
            'God says promotion is coming to someone in this section',
            'Within 3 months, your story will change'
        ],
        specific: [
            'By next month, you will receive exactly ₦{amount} from an unexpected source',
            'On the {date} of next month, you will receive good news about your job',
            'Someone whose name starts with {letter} will bring your breakthrough'
        ]
    },
    warning: {
        vague: [
            'The enemy is planning against someone here',
            'Be careful of people smiling at you with bad intentions',
            'God says there is a trap set for you, but He will expose it'
        ],
        moderate: [
            'Someone close to you is planning betrayal within weeks',
            'An accident is planned for your family, but prayer will stop it',
            'There is a spirit of death targeting someone in your lineage'
        ],
        specific: [
            'A person wearing {color} will try to harm you on {day}',
            'Do not travel on {date}, there is danger on that road',
            'Someone named {name} in your office is monitoring you for enemies'
        ]
    },
    marriage: {
        vague: [
            'God says your time for marriage is coming',
            'The Lord has prepared someone special for you',
            'Your marital breakthrough is at hand'
        ],
        moderate: [
            'This time next year, you will be celebrating your wedding',
            'Your spouse will come from a professional background',
            'Before December, you will meet the one'
        ],
        specific: [
            'Your husband\'s name will start with {letter} and he works in {industry}',
            'You will meet her at a {event} in {month}',
            'Your wedding will be on {date} of next year'
        ]
    },
    political: {
        vague: [
            'God is about to shake this nation',
            'A new leader will emerge from an unexpected place',
            'There will be a shift in the political atmosphere'
        ],
        moderate: [
            'The current administration will face a major crisis',
            'A governor will step down before his term ends',
            'There will be an unexpected change in leadership'
        ],
        specific: [
            '{politician_name} will not complete his term',
            'The election in {state} will be cancelled',
            '{party} will lose {number} states in the next election'
        ]
    },
    election: {
        vague: [
            'God has chosen who will lead this nation',
            'The election will surprise many people',
            'Not the expected person will win'
        ],
        moderate: [
            'The winner will come from an unexpected party',
            'There will be a runoff election',
            'A major candidate will withdraw before election day'
        ],
        specific: [
            '{candidate_name} will win by {percentage}% margin',
            'The election will be decided by the courts',
            '{candidate_name} will win exactly {number} states'
        ]
    },
    financial: {
        vague: [
            'God is about to open financial doors for you',
            'Naira will experience turbulence',
            'There is a financial shift coming to this nation'
        ],
        moderate: [
            'Dollar will reach a specific level by year end',
            'A major company will collapse this year',
            'Oil prices will change the nation\'s economy'
        ],
        specific: [
            'Dollar will be ₦{number} by {month}',
            '{company_name} shares will crash',
            'Petrol will be ₦{price} by {month}'
        ]
    },
    national: {
        vague: [
            'Nigeria will experience a shaking',
            'God is about to do a new thing in this nation',
            'There will be a divine intervention in this country'
        ],
        moderate: [
            'A state capital will experience a disaster',
            'A prominent leader will fall from grace',
            'Something unprecedented will happen in the North'
        ],
        specific: [
            'There will be an earthquake in {state} on {date}',
            '{specific_event} will happen before {date}',
            'Nigeria will win {specific_achievement} in {year}'
        ]
    },
    healing: {
        vague: [
            'Someone here is about to receive their healing',
            'God is healing bodies in this place',
            'Touch your point of pain, healing is flowing'
        ],
        moderate: [
            'Someone with a kidney problem is being healed now',
            'There is healing for 7 barren women here today',
            'Cancer is disappearing from someone\'s body'
        ],
        specific: [
            'The person on row {row}, seat {seat}, stand up - God is healing you',
            'Woman wearing {color}, you have been bleeding for {years} years - it stops today',
            'The man whose wife lost a baby on {date} - the next pregnancy will succeed'
        ]
    },
    death: {
        vague: [
            'There is a spirit of death hovering, but prayer will stop it',
            'Someone\'s enemy is planning their funeral, but they will be disappointed',
            'This year, death will visit a prominent family'
        ],
        moderate: [
            'A celebrity will die suddenly this year',
            'There will be a shocking death in the political class',
            'Someone in this congregation will lose a parent this month'
        ],
        specific: [
            '{name} will face an assassination attempt on {date}',
            'A leader in {sector} will die before {date}',
            'Person X\'s health will fail on {specific_date}'
        ]
    },
    disaster: {
        vague: [
            'I see fire... destruction... but God will spare His people',
            'There is a disaster looming, but prayer warriors will stop it',
            'Something terrible is coming, but the church must pray'
        ],
        moderate: [
            'A building will collapse in a major city',
            'There will be a fire disaster in a market',
            'A flood will strike before the year ends'
        ],
        specific: [
            'On {date}, there will be an explosion in {location}',
            '{building_name} will collapse on {date}',
            'A plane will have trouble on the {route} route'
        ]
    }
};

// ============================================================================
// PROPHECY FUNCTIONS
// ============================================================================

/**
 * Generate a new prophecy
 */
export function generateProphecy(
    type: ProphecyType,
    specificity: Prophecy['specificity'],
    week: number,
    targetPerson?: string,
    predictedWeek?: number
): Prophecy {
    const templates = PROPHECY_TEMPLATES[type];
    const templateArray = templates[specificity === 'extremely_specific' ? 'specific' : specificity];
    const content = templateArray[Math.floor(Math.random() * templateArray.length)];

    // More specific = more reputation at stake
    const reputationStakes: Record<Prophecy['specificity'], number> = {
        vague: 5,
        moderate: 20,
        specific: 50,
        extremely_specific: 80
    };

    return {
        id: `PROPHECY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type,
        specificity,
        content,
        targetPerson,
        givenWeek: week,
        predictedWeek,
        status: 'pending',
        verifiable: specificity !== 'vague',
        witnesses: [],
        publiclyShared: false,
        reputationAtStake: reputationStakes[specificity]
    };
}

/**
 * Give a prophecy to maximize safety (vague but impressive)
 */
export function generateSafeProphecy(type: ProphecyType, week: number): Prophecy {
    return generateProphecy(type, 'vague', week);
}

/**
 * Give a risky prophecy for high reward
 */
export function generateRiskyProphecy(
    type: ProphecyType,
    week: number,
    targetPerson: string
): Prophecy {
    return generateProphecy(type, 'extremely_specific', week, targetPerson, week + Math.floor(Math.random() * 52));
}

/**
 * Check prophecy fulfillment
 */
export function checkProphecyFulfillment(
    prophecy: Prophecy,
    currentWeek: number,
    worldEvents: string[]
): { fulfilled: boolean; canClaim: boolean; reason: string } {
    // Vague prophecies can almost always be claimed as fulfilled
    if (prophecy.specificity === 'vague') {
        return {
            fulfilled: Math.random() > 0.1,  // 90% can be claimed
            canClaim: true,
            reason: 'General blessing manifested'
        };
    }

    // Expire prophecies after reasonable time
    if (prophecy.predictedWeek && currentWeek > prophecy.predictedWeek + 4) {
        return {
            fulfilled: false,
            canClaim: false,
            reason: 'Time window has passed'
        };
    }

    // Random fulfillment based on specificity
    const fulfillmentChance: Record<Prophecy['specificity'], number> = {
        vague: 0.9,
        moderate: 0.4,
        specific: 0.15,
        extremely_specific: 0.05
    };

    const fulfilled = Math.random() < fulfillmentChance[prophecy.specificity];

    return {
        fulfilled,
        canClaim: fulfilled,
        reason: fulfilled ? 'Prophecy confirmed by events' : 'Events did not match prediction'
    };
}

/**
 * Attempt to cover up a failed prophecy
 */
export function coverUpProphecy(
    prophecy: Prophecy,
    method: 'reinterpret' | 'blame_sin' | 'claim_spiritual' | 'delete_evidence' | 'attack_critics',
    fame: number
): { success: boolean; scandalRisk: number; narrative: string } {
    const methods = {
        reinterpret: {
            successRate: 0.7,
            scandalRisk: 20,
            narrative: 'The prophecy was symbolic, not literal. It has been fulfilled spiritually.'
        },
        blame_sin: {
            successRate: 0.6,
            scandalRisk: 30,
            narrative: 'The blessing was blocked due to sin in the camp. We need to pray more.'
        },
        claim_spiritual: {
            successRate: 0.8,
            scandalRisk: 15,
            narrative: 'The prophecy was fulfilled in the spiritual realm. Physical manifestation is coming.'
        },
        delete_evidence: {
            successRate: 0.5,
            scandalRisk: 50,
            narrative: 'What prophecy? I never said that. Show me the video.'
        },
        attack_critics: {
            successRate: 0.4,
            scandalRisk: 40,
            narrative: 'These are attacks of the enemy! Those questioning me are agents of darkness!'
        }
    };

    const selected = methods[method];
    const fameBonus = fame / 20000;  // Higher fame = better coverup
    const success = Math.random() < selected.successRate + fameBonus;

    return {
        success,
        scandalRisk: success ? selected.scandalRisk * 0.5 : selected.scandalRisk * 2,
        narrative: selected.narrative
    };
}

// ============================================================================
// PROPHETIC TRACK RECORD
// ============================================================================

export function createEmptyTrackRecord(): PropheticTrackRecord {
    return {
        totalProphecies: 0,
        fulfilled: 0,
        failed: 0,
        pending: 0,
        coveredUp: 0,
        publicAccuracy: 80,  // Start with benefit of doubt
        actualAccuracy: 0,
        reputation: 50
    };
}

/**
 * Calculate prophetic reputation
 */
export function calculatePropheticReputation(record: PropheticTrackRecord): number {
    if (record.totalProphecies === 0) return 50;

    // Public accuracy (what people think)
    const successfulCovered = record.fulfilled + record.coveredUp * 0.7;
    record.publicAccuracy = Math.floor((successfulCovered / record.totalProphecies) * 100);

    // Actual accuracy
    record.actualAccuracy = Math.floor((record.fulfilled / record.totalProphecies) * 100);

    // Reputation based on public perception
    record.reputation = Math.min(100, record.publicAccuracy + 10);

    return record.reputation;
}

/**
 * Compete with rival prophet
 */
export function propheticDuel(
    myAccuracy: number,
    rivalAccuracy: number,
    mysteryEvent: string
): { winner: 'player' | 'rival' | 'tie'; narrative: string } {
    const myRoll = Math.random() * myAccuracy;
    const rivalRoll = Math.random() * rivalAccuracy;

    if (Math.abs(myRoll - rivalRoll) < 10) {
        return {
            winner: 'tie',
            narrative: 'Both prophets gave similar predictions. The church is divided on who heard correctly.'
        };
    }

    if (myRoll > rivalRoll) {
        return {
            winner: 'player',
            narrative: `Your prophecy about "${mysteryEvent}" came true! Your rival is embarrassed.`
        };
    }

    return {
        winner: 'rival',
        narrative: `Your rival's prophecy was more accurate. Some of your members are questioning your gift.`
    };
}
