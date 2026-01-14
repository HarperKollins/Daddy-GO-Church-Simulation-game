/**
 * Testimony System Engine
 * 
 * Core church culture mechanic:
 * - Fabricate, collect, and share testimonies
 * - Verification risk (liars get exposed)
 * - Testimony believability scoring
 * - Testimony economy (currency for social status)
 */

// ============================================================================
// TESTIMONY DEFINITIONS
// ============================================================================

export interface Testimony {
    id: string;
    type: TestimonyType;
    title: string;
    description: string;
    week: number;
    truthPercentage: number;      // 0-100, how true is this testimony?
    embellishmentLevel: number;   // 0-100, how much was exaggerated
    believabilityScore: number;   // 0-100, how believable to audience
    verificationRisk: number;     // 0-100, risk of being exposed
    impactScore: number;          // How powerful was this testimony?
    witnesses: string[];          // NPCs who can confirm/deny
    timesShared: number;
    hasBeenExposed: boolean;
    exposureWeek?: number;
}

export type TestimonyType =
    | 'healing'
    | 'financial_breakthrough'
    | 'deliverance'
    | 'marriage'
    | 'visa_miracle'
    | 'job_promotion'
    | 'protection'
    | 'prophecy_fulfilled'
    | 'child_miracle'
    | 'enemy_defeated';

export interface TestimonyInventory {
    collected: Testimony[];
    fabricated: Testimony[];
    shared: string[];  // IDs of shared testimonies
    exposedCount: number;
    totalCredibility: number;  // Running score
}

// ============================================================================
// TESTIMONY TEMPLATES
// ============================================================================

const TESTIMONY_TEMPLATES: Record<TestimonyType, { titles: string[], descriptions: string[] }> = {
    healing: {
        titles: [
            'Cancer Disappeared After Prayer',
            'Blind Eye Opened in Service',
            'Diabetes Healed Instantly',
            'Wheelchair Bound Now Walking',
            'HIV Turned Negative'
        ],
        descriptions: [
            'The doctors said there was no hope, but after Daddy prayed...',
            'For 10 years I suffered, but that night of deliverance...',
            'They had scheduled surgery, but when I returned for tests...'
        ]
    },
    financial_breakthrough: {
        titles: [
            'From Broke to Millionaire in 3 Months',
            'Unexpected Contract Worth ₦50M',
            'Debt of ₦5M Mysteriously Cancelled',
            'Someone Paid My House Rent for 5 Years',
            'Found ₦2M on the Street'
        ],
        descriptions: [
            'I sowed my last ₦1,000 and within 2 weeks...',
            'After 40 days fasting, the call came...',
            'The moment I gave my tithe, the phone rang...'
        ]
    },
    deliverance: {
        titles: [
            'Marine Spirit Cast Out After 20 Years',
            'Ancestral Curse Finally Broken',
            'Night Husband Defeated',
            'Spirit of Poverty Destroyed',
            'Village Witches Lost Power Over Me'
        ],
        descriptions: [
            'Every night in my dreams, they would come. But after that vigil...',
            'My family had suffered for generations. Pastor laid hands and...',
            'The manifestation was violent, but the power of God was stronger...'
        ]
    },
    visa_miracle: {
        titles: [
            'US Visa Approved After 7 Rejections',
            'Canadian PR in 3 Weeks (Normally Takes 2 Years)',
            'UK Visa Officer Said "God Told Me to Approve You"',
            'Schengen Visa Despite Empty Account',
            'Green Card Through Divine Connection'
        ],
        descriptions: [
            'The embassy had rejected me 7 times. Pastor said this time is different...',
            'I had no bank statement, no travel history, but God...',
            'The officer looked at my file, then looked at me and smiled...'
        ]
    },
    marriage: {
        titles: [
            'Met My Husband Exactly As Pastor Prophesied',
            'Barren for 15 Years, Now Mother of Twins',
            'Divorce Papers Torn, Marriage Restored',
            'Cheating Husband Became Born Again',
            'Wedding After 10 Years of Waiting'
        ],
        descriptions: [
            'Pastor said "This time next year, you will carry your baby"...',
            'I had given up on love. Then at that conference...',
            'My husband was already with another woman, but prayer changed everything...'
        ]
    },
    prophecy_fulfilled: {
        titles: [
            'Pastor Called My Exact Salary Before I Got Job',
            'Word of Knowledge Revealed Hidden Sin',
            'Prophet Described My House Before I Bought It',
            'Name of Future Spouse Revealed in Dream',
            'Exact Date of Breakthrough Predicted'
        ],
        descriptions: [
            'He had never met me, but he said "Someone here whose name starts with..."',
            'The prophet pointed at me in a crowd of thousands...',
            'What he said seemed impossible, but exactly 90 days later...'
        ]
    },
    job_promotion: {
        titles: [
            'From Intern to Director in 2 Years',
            'Passed Interview I Never Applied For',
            'Boss Suddenly Resigned, I Got His Position',
            'Company Created New Role Just for Me',
            'Salary Tripled After Anointing Service'
        ],
        descriptions: [
            'My qualifications were the lowest, but favor spoke...',
            'The MD supposedly never promotes from within, but...',
            'Everyone expected the other candidate to win...'
        ]
    },
    protection: {
        titles: [
            'Survived Plane Crash That Killed 200',
            'Robbers Saw Fire Around My House',
            'Accident but Not a Scratch',
            'Poison Turned to Water in My Stomach',
            'Assassins Could Not Find My Door'
        ],
        descriptions: [
            'The doctors said I should be dead. Every bone should be broken, but...',
            'They came with guns, but something stopped them at the gate...',
            'I was the only survivor. They called it a miracle...'
        ]
    },
    child_miracle: {
        titles: [
            'Dead Baby Came Back to Life During Praise',
            'Son Accepted to School Despite Failed Exams',
            'Child Spoke After 7 Years of Muteness',
            'Autistic Child Healed During Crusade',
            'Kidnapped Child Found After Prayer'
        ],
        descriptions: [
            'The doctors had declared him dead. I refused to accept it...',
            'His admission letter said "rejected" but we prayed...',
            'For 7 years, he never spoke a word. Then Pastor touched his tongue...'
        ]
    },
    enemy_defeated: {
        titles: [
            'Enemy Who Swore to Kill Me Died Instead',
            'Family Member Who Cursed Me Came Begging',
            'Office Enemy Transferred to Another Country',
            'Witch Doctor Who Attacked Me Lost His Powers',
            'Court Case I Was Losing, Dismissed!'
        ],
        descriptions: [
            'They had vowed to destroy me. But what they planned for me...',
            'The same person who swore I would never make it...',
            'Every weapon they fashioned against me...'
        ]
    }
};

// ============================================================================
// TESTIMONY FUNCTIONS
// ============================================================================

/**
 * Generate a new testimony (real or fabricated)
 */
export function generateTestimony(
    type: TestimonyType,
    truthPercentage: number,
    week: number,
    playerFame: number,
    witnesses: string[] = []
): Testimony {
    const template = TESTIMONY_TEMPLATES[type];
    const title = template.titles[Math.floor(Math.random() * template.titles.length)];
    const description = template.descriptions[Math.floor(Math.random() * template.descriptions.length)];

    // Calculate embellishment (exaggeration)
    const embellishmentLevel = 100 - truthPercentage;

    // Believability depends on: fame, consistency, and embellishment
    // Higher fame = more believable (people trust famous pastors)
    const fameBonus = playerFame / 200;  // 0-50 points
    const consistencyBonus = truthPercentage * 0.3;  // 0-30 points
    const embellishmentPenalty = embellishmentLevel * 0.2;  // 0-20 penalty
    const believabilityScore = Math.min(100, Math.max(0,
        50 + fameBonus + consistencyBonus - embellishmentPenalty
    ));

    // Verification risk: low truth + witnesses = high risk
    const witnessRisk = witnesses.length > 0 ? (100 - truthPercentage) * 0.5 : 0;
    const verificationRisk = Math.min(100, (100 - truthPercentage) * 0.3 + witnessRisk);

    // Impact score (how viral will this be?)
    const impactScore = calculatedTestimonyImpact(type, embellishmentLevel, believabilityScore);

    return {
        id: `TESTIMONY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type,
        title,
        description,
        week,
        truthPercentage,
        embellishmentLevel,
        believabilityScore,
        verificationRisk,
        impactScore,
        witnesses,
        timesShared: 0,
        hasBeenExposed: false
    };
}

/**
 * Calculate testimony impact (virality)
 */
function calculatedTestimonyImpact(
    type: TestimonyType,
    embellishment: number,
    believability: number
): number {
    // More dramatic testimonies have higher impact
    const typeWeights: Record<TestimonyType, number> = {
        healing: 90,
        deliverance: 85,
        child_miracle: 95,
        protection: 80,
        enemy_defeated: 75,
        financial_breakthrough: 70,
        visa_miracle: 65,
        prophecy_fulfilled: 60,
        marriage: 55,
        job_promotion: 50
    };

    const baseImpact = typeWeights[type];
    // Bigger lies = more impact, but less believability
    const embellishmentBoost = embellishment * 0.2;
    const believabilityFactor = believability / 100;

    return Math.floor((baseImpact + embellishmentBoost) * believabilityFactor);
}

/**
 * Share a testimony publicly
 */
export function shareTestimony(
    testimony: Testimony,
    platform: 'church_service' | 'social_media' | 'crusade' | 'private',
    audienceSize: number
): { fameGain: number; scandalRisk: number; viralChance: number } {
    const platformMultipliers = {
        church_service: { fame: 1.0, scandal: 0.8, viral: 0.3 },
        social_media: { fame: 1.5, scandal: 1.5, viral: 0.8 },
        crusade: { fame: 2.0, scandal: 1.2, viral: 0.5 },
        private: { fame: 0.2, scandal: 0.1, viral: 0.05 }
    };

    const multiplier = platformMultipliers[platform];

    return {
        fameGain: Math.floor(testimony.impactScore * multiplier.fame * (audienceSize / 100)),
        scandalRisk: testimony.verificationRisk * multiplier.scandal,
        viralChance: (testimony.impactScore / 100) * multiplier.viral
    };
}

/**
 * Check if a testimony gets exposed
 */
export function checkTestimonyExposure(
    testimony: Testimony,
    weeksActive: number,
    hasOpponent: boolean
): { exposed: boolean; exposer: string; consequence: string } {
    // Risk increases over time
    const timeRisk = weeksActive * 2;
    // Opponents actively try to expose you
    const opponentRisk = hasOpponent ? 20 : 0;

    const totalRisk = testimony.verificationRisk + timeRisk + opponentRisk;
    const exposed = Math.random() * 100 < totalRisk / 10;

    if (exposed) {
        const exposers = [
            'investigative blogger',
            'jealous church member',
            'the "healed" person themselves',
            'a witness who disagreed',
            'medical records leak',
            'rival pastor'
        ];
        return {
            exposed: true,
            exposer: exposers[Math.floor(Math.random() * exposers.length)],
            consequence: testimony.impactScore > 70
                ? 'MAJOR_SCANDAL'
                : testimony.impactScore > 40
                    ? 'MODERATE_SCANDAL'
                    : 'MINOR_EMBARRASSMENT'
        };
    }

    return { exposed: false, exposer: '', consequence: '' };
}

/**
 * Collect a real testimony from a church member
 */
export function collectRealTestimony(
    memberName: string,
    claimedType: TestimonyType,
    memberCredibility: number,
    week: number
): Testimony {
    // Real testimonies from members have varying truth levels
    const truthPercentage = 40 + Math.floor(Math.random() * 40) + memberCredibility / 5;

    return generateTestimony(claimedType, Math.min(100, truthPercentage), week, 0, [memberName]);
}

// ============================================================================
// TESTIMONY INVENTORY MANAGEMENT
// ============================================================================

export function createEmptyTestimonyInventory(): TestimonyInventory {
    return {
        collected: [],
        fabricated: [],
        shared: [],
        exposedCount: 0,
        totalCredibility: 100
    };
}

/**
 * Calculate overall testimony credibility
 */
export function calculateTestimonyCredibility(inventory: TestimonyInventory): number {
    const exposurePenalty = inventory.exposedCount * 15;
    const fabricationRatio = inventory.fabricated.length / (inventory.collected.length + inventory.fabricated.length + 1);
    const fabricationPenalty = fabricationRatio * 30;

    return Math.max(0, 100 - exposurePenalty - fabricationPenalty);
}
