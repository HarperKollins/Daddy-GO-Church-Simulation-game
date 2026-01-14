/**
 * Seed Faith & Manipulation Engine
 * 
 * The prosperity gospel mechanics:
 * - Promise specific returns for specific amounts
 * - Create urgency and FOMO
 * - Use testimonies as social proof
 * - Psychological manipulation tactics
 */

// ============================================================================
// SEED FAITH CAMPAIGNS
// ============================================================================

export interface SeedFaithCampaign {
    id: string;
    name: string;
    theme: SeedTheme;
    targetAmount: number;
    promisedReturn: string;
    promisedMultiplier: number;
    testimoniesUsed: number;
    urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
    durationWeeks: number;
    startWeek: number;
    totalCollected: number;
    participantCount: number;
    successfulTestimonies: number;
    failedTestimonies: number;  // Hidden from congregation
}

export type SeedTheme =
    | 'breakthrough'
    | 'debt_cancellation'
    | 'visa_miracle'
    | 'marriage'
    | 'healing'
    | 'enemy_destruction'
    | 'business_growth'
    | 'protection'
    | 'generational_curse_breaking';

// ============================================================================
// MANIPULATION TACTICS
// ============================================================================

export interface ManipulationTactic {
    id: string;
    name: string;
    type: 'urgency' | 'social_proof' | 'scarcity' | 'authority' | 'reciprocity' | 'commitment';
    effectiveness: number;      // 0-100
    ethicalCost: number;       // How much morality it costs
    description: string;
    scriptLine: string;        // What pastor says
}

export const MANIPULATION_TACTICS: ManipulationTactic[] = [
    // Urgency tactics
    {
        id: 'LAST_CHANCE',
        name: 'Last Chance Framing',
        type: 'urgency',
        effectiveness: 85,
        ethicalCost: 30,
        description: 'Create artificial deadline',
        scriptLine: 'This is your LAST CHANCE! After today, the grace lifts!'
    },
    {
        id: 'NOW_OR_NEVER',
        name: 'Now or Never',
        type: 'urgency',
        effectiveness: 80,
        ethicalCost: 25,
        description: 'Emphasize missed opportunity',
        scriptLine: 'Some of you will regret not sowing this seed forever!'
    },
    {
        id: 'PROPHETIC_WINDOW',
        name: 'Prophetic Window',
        type: 'urgency',
        effectiveness: 90,
        ethicalCost: 40,
        description: 'Claim divine timing is limited',
        scriptLine: 'God showed me there is a 7-day window. After that, the door closes!'
    },

    // Social proof tactics
    {
        id: 'TESTIMONY_PARADE',
        name: 'Testimony Parade',
        type: 'social_proof',
        effectiveness: 75,
        ethicalCost: 20,
        description: 'Parade previous "successes"',
        scriptLine: 'Sister Grace sowed ₦50,000 and got a job in Dubai within 2 weeks!'
    },
    {
        id: 'BIG_MEN_GIVE',
        name: 'Big Men Reference',
        type: 'social_proof',
        effectiveness: 70,
        ethicalCost: 15,
        description: 'Reference wealthy givers',
        scriptLine: 'Senator Adamu didn\'t become wealthy without obeying this principle!'
    },
    {
        id: 'QUEUE_FORMING',
        name: 'Queue Forming',
        type: 'social_proof',
        effectiveness: 65,
        ethicalCost: 10,
        description: 'Show others already giving',
        scriptLine: 'Look at the altar! See how many are already standing in faith!'
    },

    // Scarcity tactics
    {
        id: 'LIMITED_SLOTS',
        name: 'Limited Slots',
        type: 'scarcity',
        effectiveness: 80,
        ethicalCost: 35,
        description: 'Claim limited blessings',
        scriptLine: 'God showed me only 50 people will receive this blessing today!'
    },
    {
        id: 'FIRST_FRUITS',
        name: 'First Fruits Priority',
        type: 'scarcity',
        effectiveness: 75,
        ethicalCost: 25,
        description: 'First givers get more',
        scriptLine: 'The first 20 to sow will receive DOUBLE the blessing!'
    },

    // Authority tactics
    {
        id: 'DIRECT_FROM_GOD',
        name: 'Direct Revelation',
        type: 'authority',
        effectiveness: 90,
        ethicalCost: 50,
        description: 'Claim divine instruction',
        scriptLine: 'As I was praying at 3am, God specifically told me to tell you...'
    },
    {
        id: 'CURSE_FOR_DISOBEDIENCE',
        name: 'Curse Warning',
        type: 'authority',
        effectiveness: 85,
        ethicalCost: 60,
        description: 'Threaten divine punishment',
        scriptLine: 'Those who refuse to sow are robbing God! Malachi 3:8-9!'
    },
    {
        id: 'ANOINTING_TRANSFER',
        name: 'Anointing Requires Seed',
        type: 'authority',
        effectiveness: 88,
        ethicalCost: 45,
        description: 'Link giving to spiritual power',
        scriptLine: 'Elijah could not release power until the widow gave her last!'
    },

    // Reciprocity tactics
    {
        id: 'I_GAVE_FIRST',
        name: 'Pastor\'s Sacrifice',
        type: 'reciprocity',
        effectiveness: 60,
        ethicalCost: 15,
        description: 'Highlight your own giving',
        scriptLine: 'I have sown ₦10 million into this campaign. Now it\'s your turn!'
    },
    {
        id: 'FREE_GIFT_HOOK',
        name: 'Free Gift First',
        type: 'reciprocity',
        effectiveness: 55,
        ethicalCost: 10,
        description: 'Give free item, then ask',
        scriptLine: 'I gave you this free anointing oil. Now sow a seed of appreciation!'
    },

    // Commitment tactics
    {
        id: 'STAND_UP_COMMIT',
        name: 'Public Commitment',
        type: 'commitment',
        effectiveness: 85,
        ethicalCost: 30,
        description: 'Make them stand up publicly',
        scriptLine: 'If God has been speaking to you, STAND UP now!'
    },
    {
        id: 'VOW_BEFORE_LEAVING',
        name: 'Pledge Before Exit',
        type: 'commitment',
        effectiveness: 70,
        ethicalCost: 25,
        description: 'Get commitment before leaving',
        scriptLine: 'Write down your pledge amount. This is a covenant!'
    }
];

// ============================================================================
// CAMPAIGN FUNCTIONS
// ============================================================================

/**
 * Create a seed faith campaign
 */
export function createSeedCampaign(
    name: string,
    theme: SeedTheme,
    targetAmount: number,
    duration: number,
    startWeek: number
): SeedFaithCampaign {
    const multipliers: Record<SeedTheme, number> = {
        breakthrough: 10,
        debt_cancellation: 7,
        visa_miracle: 20,
        marriage: 5,
        healing: 3,
        enemy_destruction: 15,
        business_growth: 12,
        protection: 4,
        generational_curse_breaking: 8
    };

    const promises: Record<SeedTheme, string> = {
        breakthrough: 'Your breakthrough will be 10-fold!',
        debt_cancellation: 'Every debt will be supernaturally cancelled!',
        visa_miracle: 'Doors will open to any nation you desire!',
        marriage: 'Your life partner will appear within months!',
        healing: 'No sickness will prosper against you!',
        enemy_destruction: 'Every enemy will fall before you!',
        business_growth: 'Your business will explode with customers!',
        protection: 'No weapon formed against you will prosper!',
        generational_curse_breaking: 'Every chain from your fathers is broken!'
    };

    return {
        id: `CAMPAIGN_${Date.now()}`,
        name,
        theme,
        targetAmount,
        promisedReturn: promises[theme],
        promisedMultiplier: multipliers[theme],
        testimoniesUsed: 0,
        urgencyLevel: 'medium',
        durationWeeks: duration,
        startWeek,
        totalCollected: 0,
        participantCount: 0,
        successfulTestimonies: 0,
        failedTestimonies: 0
    };
}

/**
 * Run a giving session
 */
export function runGivingSession(
    campaign: SeedFaithCampaign,
    tacticsUsed: ManipulationTactic[],
    audienceSize: number,
    audienceWealth: number,  // Average wealth level
    audienceFaith: number    // How believing they are
): {
    amountRaised: number;
    participants: number;
    averageGift: number;
    ethicalCost: number;
    effectiveness: number;
} {
    // Calculate total effectiveness
    const tacticsEffectiveness = tacticsUsed.reduce((sum, t) => sum + t.effectiveness, 0) / tacticsUsed.length;
    const totalEthicalCost = tacticsUsed.reduce((sum, t) => sum + t.ethicalCost, 0);

    // More faith = more giving
    const faithMultiplier = audienceFaith / 50;
    // Wealthy audiences give more
    const wealthMultiplier = audienceWealth / 5000;

    // Campaign theme affects giving
    const themeMultipliers: Record<SeedTheme, number> = {
        breakthrough: 1.2,
        debt_cancellation: 1.3,
        visa_miracle: 1.5,  // People desperate for visa
        marriage: 1.1,
        healing: 1.0,
        enemy_destruction: 1.4,
        business_growth: 1.2,
        protection: 1.0,
        generational_curse_breaking: 1.3
    };

    // Calculate participation rate (what % of audience gives)
    const participationRate = Math.min(0.8,
        0.1 + (tacticsEffectiveness / 200) + (faithMultiplier * 0.2)
    );

    const participants = Math.floor(audienceSize * participationRate);

    // Base giving amount
    const baseGift = 5000 + (audienceWealth * 0.1) + (tacticsEffectiveness * 100);
    const averageGift = baseGift * wealthMultiplier * faithMultiplier * themeMultipliers[campaign.theme];
    const amountRaised = Math.floor(participants * averageGift);

    return {
        amountRaised,
        participants,
        averageGift: Math.floor(averageGift),
        ethicalCost: totalEthicalCost,
        effectiveness: tacticsEffectiveness
    };
}

/**
 * Check if seed produced "results"
 */
export function checkSeedResults(
    amountSowed: number,
    theme: SeedTheme,
    faith: number
): { produced: boolean; result: string; canTestify: boolean } {
    // Bigger seeds = higher "faith" = higher "result" expectation
    // But actual results are mostly random + confirmation bias

    // Base chance of something happening that can be attributed
    const baseChance = 0.3;  // 30% something happens naturally
    const faithBonus = faith / 200;  // More faith = more likely to attribute

    const produced = Math.random() < (baseChance + faithBonus);

    if (!produced) {
        return {
            produced: false,
            result: 'Nothing obviously happened yet.',
            canTestify: false
        };
    }

    // Generate a result they can testify about
    const results: Record<SeedTheme, string[]> = {
        breakthrough: [
            'Got unexpected money from relative',
            'Won small prize in lottery',
            'Received bonus at work'
        ],
        debt_cancellation: [
            'Creditor forgot about a debt',
            'Debt was negotiated down',
            'Found money they didn\'t know they had'
        ],
        visa_miracle: [
            'Visa was approved',
            'Got interview date quickly',
            'Met someone with connections'
        ],
        marriage: [
            'Met someone new',
            'Ex came back',
            'Got introduced to a "serious" person'
        ],
        healing: [
            'Pain reduced',
            'Doctor gave good news',
            'Felt better overall'
        ],
        enemy_destruction: [
            'Boss who hated them got transferred',
            'Rival had misfortune',
            'Felt peace about enemies'
        ],
        business_growth: [
            'Got new customer',
            'Business picked up slightly',
            'New opportunity emerged'
        ],
        protection: [
            'Avoided accident',
            'Survived scary situation',
            'Felt protected'
        ],
        generational_curse_breaking: [
            'Old problem stopped',
            'Family drama reduced',
            'Felt "free" spiritually'
        ]
    };

    const themeResults = results[theme];
    const result = themeResults[Math.floor(Math.random() * themeResults.length)];

    return {
        produced: true,
        result,
        canTestify: true
    };
}

// ============================================================================
// SPECIAL SEED AMOUNTS
// ============================================================================

export interface SpecialSeedAmount {
    amount: number;
    name: string;
    significance: string;
    bonusClaim: string;
}

export const SPECIAL_SEED_AMOUNTS: SpecialSeedAmount[] = [
    { amount: 1000, name: 'Seed of Faith', significance: 'Basic step of obedience', bonusClaim: 'Opens the door' },
    { amount: 3000, name: 'Trinity Seed', significance: 'Father, Son, Holy Spirit', bonusClaim: '3x anointing' },
    { amount: 5000, name: 'Grace Seed', significance: 'Number of grace', bonusClaim: 'Unmerited favor' },
    { amount: 7000, name: 'Perfection Seed', significance: 'Complete number', bonusClaim: 'Perfect blessing' },
    { amount: 10000, name: 'Tithe Seed', significance: 'Tithe principle', bonusClaim: '10x return' },
    { amount: 12000, name: 'Apostolic Seed', significance: '12 apostles', bonusClaim: 'Apostolic power' },
    { amount: 21000, name: 'Daniel Seed', significance: '21 days breakthrough', bonusClaim: 'Breakthrough guaranteed' },
    { amount: 40000, name: 'Wilderness Seed', significance: '40 days trial', bonusClaim: 'End of suffering' },
    { amount: 50000, name: 'Jubilee Seed', significance: 'Year of Jubilee', bonusClaim: 'Total freedom' },
    { amount: 70000, name: 'Elders Seed', significance: '70 elders of Israel', bonusClaim: 'Elder-level blessing' },
    { amount: 100000, name: 'Centennial Seed', significance: 'Fullness', bonusClaim: '100-fold return' },
    { amount: 500000, name: 'Kingdom Seed', significance: 'Kingdom investment', bonusClaim: 'Kingdom keys' },
    { amount: 1000000, name: 'Millionaire Seed', significance: 'Millionaire anointing', bonusClaim: 'Millionaire within 1 year' }
];

/**
 * Get special meaning for seed amount
 */
export function getSeedSignificance(amount: number): SpecialSeedAmount | null {
    return SPECIAL_SEED_AMOUNTS.find(s => s.amount === amount) || null;
}

// ============================================================================
// EXPORTS
// ============================================================================

export function calculateCampaignReturn(campaign: SeedFaithCampaign): {
    roi: number;
    successRate: number;
    reputation: number;
} {
    const roi = campaign.totalCollected / (campaign.targetAmount || 1);
    const successRate = campaign.successfulTestimonies /
        (campaign.successfulTestimonies + campaign.failedTestimonies + 1);
    const reputation = successRate * 100;

    return { roi, successRate, reputation };
}
