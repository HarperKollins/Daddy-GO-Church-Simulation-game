/**
 * Psychological Hooks Engine
 * 
 * Addiction mechanics for player retention:
 * - Daily login rewards (variable ratio)
 * - Streak system with loss aversion
 * - FOMO events (time-limited)
 * - Near-miss events (tension)
 * - Sunk cost traps
 * - Uncertainty loops
 */

// ============================================================================
// DAILY REWARDS SYSTEM
// ============================================================================

export interface DailyReward {
    day: number;            // 1-7, then resets
    type: 'cash' | 'anointing' | 'fame' | 'health' | 'mystery' | 'premium';
    baseAmount: number;
    multiplier: number;     // Streak multiplier
    description: string;
}

export interface LoginStreak {
    currentStreak: number;
    longestStreak: number;
    lastLoginDate: string;  // ISO date
    totalLogins: number;
    missedDays: number;
    streakProtections: number;  // Free passes to miss a day
}

const DAILY_REWARDS: DailyReward[] = [
    { day: 1, type: 'cash', baseAmount: 10000, multiplier: 1.0, description: '₦10,000 blessing' },
    { day: 2, type: 'anointing', baseAmount: 50, multiplier: 1.2, description: 'Anointing boost' },
    { day: 3, type: 'health', baseAmount: 500, multiplier: 1.3, description: 'Divine Health' },
    { day: 4, type: 'fame', baseAmount: 100, multiplier: 1.4, description: 'Fame boost' },
    { day: 5, type: 'cash', baseAmount: 50000, multiplier: 1.5, description: '₦50,000 breakthrough' },
    { day: 6, type: 'mystery', baseAmount: 0, multiplier: 2.0, description: 'Mystery box!' },
    { day: 7, type: 'premium', baseAmount: 200000, multiplier: 3.0, description: '🔥 MEGA REWARD!' }
];

/**
 * Process daily login
 */
export function processDailyLogin(
    streak: LoginStreak,
    currentDate: string
): { reward: DailyReward; newStreak: LoginStreak; streakBroken: boolean; narrative: string } {
    const lastLogin = new Date(streak.lastLoginDate);
    const today = new Date(currentDate);
    const daysDiff = Math.floor((today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));

    let newStreak = { ...streak };
    let streakBroken = false;
    let narrative = '';

    if (daysDiff === 0) {
        // Already logged in today
        return {
            reward: DAILY_REWARDS[0],
            newStreak: streak,
            streakBroken: false,
            narrative: 'You already claimed today\'s reward!'
        };
    }

    if (daysDiff === 1) {
        // Consecutive day - streak continues!
        newStreak.currentStreak++;
        newStreak.longestStreak = Math.max(newStreak.longestStreak, newStreak.currentStreak);
        narrative = `🔥 ${newStreak.currentStreak} day streak! Keep it going!`;
    } else if (daysDiff === 2 && streak.streakProtections > 0) {
        // Missed one day but has protection
        newStreak.streakProtections--;
        newStreak.currentStreak++;
        narrative = `⚡ Streak protected! ${newStreak.streakProtections} protections left.`;
    } else {
        // Streak broken
        streakBroken = true;
        newStreak.missedDays += daysDiff - 1;
        newStreak.currentStreak = 1;
        narrative = `💔 Your ${streak.currentStreak} day streak was broken! Starting fresh...`;
    }

    newStreak.lastLoginDate = currentDate;
    newStreak.totalLogins++;

    // Get today's reward
    const rewardDay = ((newStreak.currentStreak - 1) % 7) + 1;
    const reward = DAILY_REWARDS.find(r => r.day === rewardDay) || DAILY_REWARDS[0];

    return { reward, newStreak, streakBroken, narrative };
}

/**
 * Calculate streak multiplier for all rewards
 */
export function getStreakMultiplier(currentStreak: number): number {
    if (currentStreak < 7) return 1.0;
    if (currentStreak < 14) return 1.5;
    if (currentStreak < 30) return 2.0;
    if (currentStreak < 60) return 3.0;
    return 5.0;  // 60+ days = 5x multiplier!
}

// ============================================================================
// FOMO EVENTS (Time-Limited)
// ============================================================================

export interface FOMOEvent {
    id: string;
    name: string;
    description: string;
    expiresInWeeks: number;
    reward: Record<string, number>;
    cost: number;
    risk: number;
    urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
}

export const FOMO_EVENTS: FOMOEvent[] = [
    {
        id: 'POLITICIAN_OFFER',
        name: 'Senator Wants to Meet',
        description: 'Senator Adamu is in town for 3 weeks only. He wants to "bless" your ministry.',
        expiresInWeeks: 3,
        reward: { cash: 50000000, influence: 500 },
        cost: 0,
        risk: 40,
        urgencyLevel: 'high'
    },
    {
        id: 'CRUSADE_GROUND',
        name: 'Prime Crusade Ground Available',
        description: 'The best crusade ground in Lagos is available, but only for 2 weeks.',
        expiresInWeeks: 2,
        reward: { fame: 1000, members: 500 },
        cost: 10000000,
        risk: 20,
        urgencyLevel: 'critical'
    },
    {
        id: 'MEDIA_INTERVIEW',
        name: 'TV Interview Offer',
        description: 'Channels TV wants you for prime time. They need an answer by next week.',
        expiresInWeeks: 1,
        reward: { fame: 800 },
        cost: 0,
        risk: 30,
        urgencyLevel: 'critical'
    },
    {
        id: 'PROPHECY_CONFERENCE',
        name: 'Prophets Convention Invitation',
        description: 'Top prophets meeting. Your invitation expires in 4 weeks.',
        expiresInWeeks: 4,
        reward: { anointing: 300, connections: 200 },
        cost: 2000000,
        risk: 10,
        urgencyLevel: 'medium'
    },
    {
        id: 'LAND_DEAL',
        name: 'Church Land at 50% Off',
        description: 'Prime Lekki land. Owner traveling, needs cash in 2 weeks.',
        expiresInWeeks: 2,
        reward: { asset: 1 },
        cost: 100000000,
        risk: 25,
        urgencyLevel: 'high'
    },
    {
        id: 'CELEBRITY_WEDDING',
        name: 'Celebrity Wants You to Officiate',
        description: 'A-list celebrity wedding. Answer needed in 1 week.',
        expiresInWeeks: 1,
        reward: { fame: 2000, cash: 5000000 },
        cost: 0,
        risk: 35,
        urgencyLevel: 'critical'
    }
];

/**
 * Generate FOMO event
 */
export function generateFOMOEvent(currentWeek: number, playerFame: number): FOMOEvent | null {
    // Higher fame = more FOMO opportunities
    const chance = 0.1 + (playerFame / 10000) * 0.2;
    if (Math.random() > chance) return null;

    const event = FOMO_EVENTS[Math.floor(Math.random() * FOMO_EVENTS.length)];
    return { ...event, id: `${event.id}_${currentWeek}` };
}

// ============================================================================
// NEAR-MISS EVENTS
// ============================================================================

export interface NearMiss {
    type: 'scandal' | 'efcc' | 'exposure' | 'death' | 'betrayal';
    description: string;
    whatSavedYou: string;
    tensionLevel: number;  // 1-10
    stillDangerous: boolean;
}

const NEAR_MISS_TEMPLATES: NearMiss[] = [
    {
        type: 'scandal',
        description: 'A blogger was about to publish your scandal...',
        whatSavedYou: 'Their website crashed from a DDoS attack. Coincidence?',
        tensionLevel: 9,
        stillDangerous: true
    },
    {
        type: 'scandal',
        description: 'Church member was taking pictures of you at the club...',
        whatSavedYou: 'Their phone was stolen that same night.',
        tensionLevel: 8,
        stillDangerous: false
    },
    {
        type: 'efcc',
        description: 'EFCC had your name on a list...',
        whatSavedYou: 'A bigger fish was caught first. They got distracted.',
        tensionLevel: 10,
        stillDangerous: true
    },
    {
        type: 'efcc',
        description: 'Your accountant was questioned...',
        whatSavedYou: 'They stayed loyal. But they looked nervous.',
        tensionLevel: 7,
        stillDangerous: true
    },
    {
        type: 'exposure',
        description: 'Your baby mama was coming to church to expose you...',
        whatSavedYou: 'She got a call about an emergency at home.',
        tensionLevel: 9,
        stillDangerous: true
    },
    {
        type: 'death',
        description: 'There was something in your food...',
        whatSavedYou: 'You weren\'t hungry that day. The dog ate it and got sick.',
        tensionLevel: 10,
        stillDangerous: true
    },
    {
        type: 'betrayal',
        description: 'Your PA was meeting with your rival pastor...',
        whatSavedYou: 'Traffic made them miss the meeting. For now.',
        tensionLevel: 6,
        stillDangerous: true
    }
];

/**
 * Generate near-miss event
 */
export function generateNearMissEvent(
    scandalLevel: number,
    negativeKarma: number,
    hasEnemies: boolean
): NearMiss | null {
    // More scandal/karma/enemies = more near-misses
    const chance = (scandalLevel / 10000) * 0.3 + (negativeKarma / 1000) * 0.2 + (hasEnemies ? 0.1 : 0);

    if (Math.random() > chance) return null;

    return NEAR_MISS_TEMPLATES[Math.floor(Math.random() * NEAR_MISS_TEMPLATES.length)];
}

// ============================================================================
// SUNK COST SYSTEM
// ============================================================================

export interface SunkCostTrap {
    id: string;
    name: string;
    totalInvested: number;      // Money
    timeInvested: number;       // Weeks
    emotionalInvestment: number; // 0-100
    currentValue: number;        // What you can recover
    abandonPenalty: string;
    continueMessage: string;
}

/**
 * Create sunk cost situation
 */
export function createSunkCostTrap(
    name: string,
    invested: number,
    weeks: number,
    currentValue: number
): SunkCostTrap {
    const emotionalInvestment = Math.min(100, weeks * 5 + (invested > 10000000 ? 30 : 0));
    const lossRatio = (invested - currentValue) / invested;

    return {
        id: `SUNK_${Date.now()}`,
        name,
        totalInvested: invested,
        timeInvested: weeks,
        emotionalInvestment,
        currentValue,
        abandonPenalty: lossRatio > 0.5
            ? `You will lose ${Math.floor(lossRatio * 100)}% of your investment!`
            : 'You can still recover most of it.',
        continueMessage: `You've already invested ₦${invested.toLocaleString()} over ${weeks} weeks. Are you really going to give up now?`
    };
}

/**
 * Calculate psychological pressure to continue
 */
export function calculateSunkCostPressure(trap: SunkCostTrap): {
    pressure: number;
    narrative: string;
} {
    const financialPressure = (trap.totalInvested - trap.currentValue) / trap.totalInvested * 50;
    const timePressure = Math.min(30, trap.timeInvested);
    const emotionalPressure = trap.emotionalInvestment * 0.2;

    const pressure = Math.min(100, financialPressure + timePressure + emotionalPressure);

    let narrative = '';
    if (pressure > 80) {
        narrative = `After ${trap.timeInvested} weeks and ₦${trap.totalInvested.toLocaleString()}, you can't stop now. Everyone is watching.`;
    } else if (pressure > 50) {
        narrative = `It's been a long journey. The finish line must be close... right?`;
    } else {
        narrative = `You could walk away, but what would people say?`;
    }

    return { pressure, narrative };
}

// ============================================================================
// UNCERTAINTY LOOPS
// ============================================================================

export interface PendingResult {
    id: string;
    type: 'prophecy' | 'investment' | 'healing' | 'application' | 'court_case';
    description: string;
    submittedWeek: number;
    revealWeek: number;      // When result will be known
    possibleOutcomes: string[];
    suspenseLevel: number;   // 1-10
}

/**
 * Create pending result (uncertainty)
 */
export function createPendingResult(
    type: PendingResult['type'],
    description: string,
    currentWeek: number,
    waitWeeks: number
): PendingResult {
    const outcomesByType: Record<PendingResult['type'], string[]> = {
        prophecy: ['Fulfilled exactly!', 'Partially fulfilled', 'Still pending', 'Did not come to pass'],
        investment: ['3x returns!', '2x returns', 'Broke even', 'Lost 50%', 'Total loss'],
        healing: ['Complete healing!', 'Improvement', 'No change', 'Condition worsened'],
        application: ['Approved!', 'Approved with conditions', 'Pending more documents', 'Rejected'],
        court_case: ['Case dismissed!', 'Won with damages', 'Settled', 'Lost', 'Appealing']
    };

    return {
        id: `PENDING_${Date.now()}`,
        type,
        description,
        submittedWeek: currentWeek,
        revealWeek: currentWeek + waitWeeks,
        possibleOutcomes: outcomesByType[type],
        suspenseLevel: Math.min(10, Math.floor(waitWeeks / 2) + 3)
    };
}

/**
 * Check if result should be revealed
 */
export function checkPendingResults(
    pending: PendingResult[],
    currentWeek: number
): { ready: PendingResult[]; stillWaiting: PendingResult[] } {
    return {
        ready: pending.filter(p => currentWeek >= p.revealWeek),
        stillWaiting: pending.filter(p => currentWeek < p.revealWeek)
    };
}

// ============================================================================
// SOCIAL COMPARISON
// ============================================================================

export interface PastorLeaderboard {
    rank: number;
    name: string;
    members: number;
    fame: number;
    netWorth: number;
    title: string;
}

const RIVAL_PASTORS: Omit<PastorLeaderboard, 'rank'>[] = [
    { name: 'Pastor Bisi Adaramola', members: 15000, fame: 8500, netWorth: 2000000000, title: 'Senior Pastor' },
    { name: 'Apostle Johnson Miracle', members: 50000, fame: 9200, netWorth: 10000000000, title: 'General Overseer' },
    { name: 'Bishop Grace Anointing', members: 8000, fame: 7000, netWorth: 500000000, title: 'Bishop' },
    { name: 'Prophet T.T. Fire', members: 25000, fame: 8800, netWorth: 3000000000, title: 'Prophet' },
    { name: 'Rev. Dr. Emmanuel Success', members: 100000, fame: 9500, netWorth: 50000000000, title: 'Daddy G.O.' }
];

/**
 * Get player's ranking compared to rivals
 */
export function getLeaderboardPosition(
    playerName: string,
    playerMembers: number,
    playerFame: number,
    playerNetWorth: number,
    playerTitle: string
): { leaderboard: PastorLeaderboard[]; playerRank: number; nearestRival: PastorLeaderboard } {
    const allPastors: PastorLeaderboard[] = [
        { rank: 0, name: playerName, members: playerMembers, fame: playerFame, netWorth: playerNetWorth, title: playerTitle },
        ...RIVAL_PASTORS.map(p => ({ ...p, rank: 0 }))
    ];

    // Sort by combined score
    allPastors.sort((a, b) => {
        const scoreA = a.members * 100 + a.fame + a.netWorth / 1000000;
        const scoreB = b.members * 100 + b.fame + b.netWorth / 1000000;
        return scoreB - scoreA;
    });

    // Assign ranks
    allPastors.forEach((p, i) => p.rank = i + 1);

    const playerRank = allPastors.findIndex(p => p.name === playerName) + 1;
    const nearestRival = allPastors.find(p => p.rank === playerRank + 1) || allPastors[allPastors.length - 1];

    return { leaderboard: allPastors, playerRank, nearestRival };
}

// ============================================================================
// EXPORTS
// ============================================================================

export function createDefaultStreak(): LoginStreak {
    return {
        currentStreak: 0,
        longestStreak: 0,
        lastLoginDate: new Date().toISOString().split('T')[0],
        totalLogins: 0,
        missedDays: 0,
        streakProtections: 1
    };
}
