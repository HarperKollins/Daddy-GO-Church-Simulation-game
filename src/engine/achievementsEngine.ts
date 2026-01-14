/**
 * Achievements & Ribbons System
 * 
 * Hidden achievements that players can unlock through gameplay.
 * Ribbons are end-game awards based on how the player lived.
 */

import type { Achievement, Ribbon } from '@/types/game';

// ============================================================================
// HIDDEN ACHIEVEMENTS
// ============================================================================

export const ACHIEVEMENTS: Achievement[] = [
    // Success achievements
    {
        id: 'FIRST_HUNDRED',
        name: 'First Hundred Souls',
        description: 'Reach 100 church members',
        condition: 'members >= 100',
        unlocked: false,
        secret: false,
    },
    {
        id: 'MEGA_CHURCH',
        name: 'Mega Church Status',
        description: 'Reach 1,000 church members',
        condition: 'members >= 1000',
        unlocked: false,
        secret: false,
    },
    {
        id: 'NATIONAL_FIGURE',
        name: 'National Figure',
        description: 'Reach 5,000 fame',
        condition: 'fame >= 5000',
        unlocked: false,
        secret: false,
    },
    {
        id: 'PRIVATE_JET_OWNER',
        name: 'Private Jet Club',
        description: 'Buy a private jet',
        condition: 'assets.includes(private_jet)',
        unlocked: false,
        secret: false,
    },
    {
        id: 'BILLIONAIRE_PASTOR',
        name: 'Billionaire Pastor',
        description: 'Accumulate ₦1 billion in personal cash',
        condition: 'personalCash >= 1000000000',
        unlocked: false,
        secret: false,
    },

    // Spiritual achievements
    {
        id: 'TRUE_ANOINTING',
        name: 'True Anointing',
        description: 'Reach maximum anointing (10,000)',
        condition: 'anointing >= 10000',
        unlocked: false,
        secret: false,
    },
    {
        id: 'NIGHT_OWL',
        name: 'Night Owl',
        description: 'Hold 50 night vigils',
        condition: 'nightVigils >= 50',
        unlocked: false,
        secret: true,
    },
    {
        id: 'MARATHON_PRAYER',
        name: 'Marathon Prayer Warrior',
        description: 'Pray away all your energy in one session',
        condition: 'prayedMaxEnergy',
        unlocked: false,
        secret: true,
    },

    // Dark achievements
    {
        id: 'EFCC_SURVIVOR',
        name: 'EFCC Survivor',
        description: 'Survive an EFCC investigation',
        condition: 'survivedEFCC',
        unlocked: false,
        secret: true,
    },
    {
        id: 'BABY_MAMA_DRAMA',
        name: 'Baby Mama Drama',
        description: 'Have 3 or more baby mamas',
        condition: 'babyMamas >= 3',
        unlocked: false,
        secret: true,
    },
    {
        id: 'MASTER_EMBEZZLER',
        name: 'Master Embezzler',
        description: 'Siphon ₦100M from church funds',
        condition: 'embezzled >= 100000000',
        unlocked: false,
        secret: true,
    },
    {
        id: 'SCANDAL_SURVIVOR',
        name: 'Scandal Survivor',
        description: 'Survive with scandal above 8000 for 10 weeks',
        condition: 'highScandalWeeks >= 10',
        unlocked: false,
        secret: true,
    },

    // Cultural achievements
    {
        id: 'INDABOSKI',
        name: 'Indaboski Style',
        description: 'Do a dramatic deliverance move',
        condition: 'dramaticDeliverance',
        unlocked: false,
        secret: true,
    },
    {
        id: 'OIL_MERCHANT',
        name: 'Anointing Oil Merchant',
        description: 'Sell 1,000 bottles of anointing oil',
        condition: 'oilSold >= 1000',
        unlocked: false,
        secret: true,
    },
    {
        id: 'DADDY_FREEZE',
        name: 'Daddy Freeze Mode',
        description: 'Publicly question tithing doctrine',
        condition: 'questionedTithing',
        unlocked: false,
        secret: true,
    },
    {
        id: 'TWITTER_WARRIOR',
        name: 'Twitter Warrior',
        description: 'Win 10 online controversies',
        condition: 'onlineWins >= 10',
        unlocked: false,
        secret: true,
    },

    // Family achievements
    {
        id: 'FAMILY_HERO',
        name: 'Family Hero',
        description: 'Help 5 family members financially',
        condition: 'familyHelped >= 5',
        unlocked: false,
        secret: false,
    },
    {
        id: 'VILLAGE_CHAMPION',
        name: 'Village Champion',
        description: 'Build a project for your village',
        condition: 'villageProject',
        unlocked: false,
        secret: false,
    },

    // Rare achievements
    {
        id: 'CULT_DEFEATER',
        name: 'Cult Defeater',
        description: 'Successfully resist cult recruitment with pure faith',
        condition: 'defeatedCult',
        unlocked: false,
        secret: true,
    },
    {
        id: 'GENUINE_MIRACLE',
        name: 'Genuine Miracle',
        description: 'Perform a real miracle with maximum anointing',
        condition: 'genuineMiracle',
        unlocked: false,
        secret: true,
    },
    {
        id: 'CELIBATE_PASTOR',
        name: 'Celibate Pastor',
        description: 'Reach age 50 without ever marrying',
        condition: 'age >= 50 && !everMarried',
        unlocked: false,
        secret: true,
    },
];

// ============================================================================
// END-GAME RIBBONS
// ============================================================================

export const RIBBONS: Ribbon[] = [
    // Success ribbons
    {
        id: 'GOLDEN_PASTOR',
        name: 'Golden Pastor',
        emoji: '🏆',
        condition: 'members > 50000 && scandal < 1000',
    },
    {
        id: 'GLOBAL_LEGEND',
        name: 'Global Legend',
        emoji: '🌍',
        condition: 'fame >= 9500',
    },
    {
        id: 'PROSPERITY_ICON',
        name: 'Prosperity Icon',
        emoji: '💰',
        condition: 'personalCash >= 500000000',
    },
    {
        id: 'STADIUM_FILLER',
        name: 'Stadium Filler',
        emoji: '🏟️',
        condition: "venue === 'STADIUM'",
    },

    // Spiritual ribbons
    {
        id: 'TRUE_PROPHET',
        name: 'True Prophet',
        emoji: '✨',
        condition: 'anointing >= 9000 && integrity >= 80',
    },
    {
        id: 'HUMBLE_SERVANT',
        name: 'Humble Servant',
        emoji: '🙏',
        condition: 'members < 500 && anointing >= 8000',
    },
    {
        id: 'MIRACLE_WORKER',
        name: 'Miracle Worker',
        emoji: '⚡',
        condition: 'genuineMiracles >= 10',
    },

    // Infamy ribbons
    {
        id: 'EFCC_GUEST',
        name: 'EFCC Guest',
        emoji: '👮',
        condition: 'arrestedByEFCC',
    },
    {
        id: 'SERIAL_SCANDAL',
        name: 'Serial Scandal',
        emoji: '🔥',
        condition: 'scandalsSurvived >= 10',
    },
    {
        id: 'MONEY_DISAPPEARER',
        name: 'Money Disappearer',
        emoji: '💸',
        condition: 'embezzled >= 50000000',
    },

    // Weird ribbons
    {
        id: 'SPEEDRUN',
        name: 'Speedrun',
        emoji: '⏱️',
        condition: 'died && week < 52',
    },
    {
        id: 'SURVIVOR',
        name: 'Survivor',
        emoji: '🛡️',
        condition: 'alive && week >= 2600', // 50 years
    },
    {
        id: 'CONTROVERSIAL',
        name: 'Controversial King',
        emoji: '🎭',
        condition: 'fame >= 8000 && scandal >= 5000',
    },

    // Secret ribbons
    {
        id: 'SECRET_SAINT',
        name: '???',
        emoji: '❓',
        condition: 'anointing >= 10000 && personalCash < 50000 && members >= 1000',
    },
    {
        id: 'SECRET_VILLAIN',
        name: '???',
        emoji: '❓',
        condition: 'embezzled >= 1000000000 && !caught',
    },
    {
        id: 'SECRET_BALANCED',
        name: '???',
        emoji: '❓',
        condition: 'all stats between 4000-6000 at death',
    },
];

// ============================================================================
// ACHIEVEMENT CHECKING FUNCTIONS
// ============================================================================

/**
 * Check a single achievement condition
 */
export function checkAchievement(
    achievement: Achievement,
    gameState: Record<string, unknown>
): boolean {
    // Simple condition parsing - in production would use a proper parser
    const condition = achievement.condition;

    // Handle common patterns
    if (condition.includes('>=')) {
        const [key, value] = condition.split('>=').map(s => s.trim());
        return (gameState[key] as number) >= parseInt(value);
    }
    if (condition.includes('<=')) {
        const [key, value] = condition.split('<=').map(s => s.trim());
        return (gameState[key] as number) <= parseInt(value);
    }
    if (condition.includes('>')) {
        const [key, value] = condition.split('>').map(s => s.trim());
        return (gameState[key] as number) > parseInt(value);
    }
    if (condition.includes('<')) {
        const [key, value] = condition.split('<').map(s => s.trim());
        return (gameState[key] as number) < parseInt(value);
    }

    // Boolean conditions
    if (gameState[condition] === true) return true;

    return false;
}

/**
 * Check all achievements against current state
 */
export function checkAllAchievements(
    achievements: Achievement[],
    gameState: Record<string, unknown>,
    currentWeek: number
): Achievement[] {
    return achievements.map(achievement => {
        if (achievement.unlocked) return achievement;

        const isUnlocked = checkAchievement(achievement, gameState);
        if (isUnlocked) {
            return {
                ...achievement,
                unlocked: true,
                unlockedWeek: currentWeek,
            };
        }
        return achievement;
    });
}

/**
 * Get newly unlocked achievements
 */
export function getNewlyUnlocked(
    before: Achievement[],
    after: Achievement[]
): Achievement[] {
    return after.filter(a => a.unlocked && !before.find(b => b.id === a.id)?.unlocked);
}

/**
 * Calculate ribbon eligibility at end of game
 */
export function calculateRibbons(gameState: Record<string, unknown>): Ribbon[] {
    return RIBBONS.filter(ribbon => {
        // Would use proper condition evaluation in production
        try {
            return checkAchievement(
                { ...ribbon, unlocked: false, secret: false, description: '' } as unknown as Achievement,
                gameState
            );
        } catch {
            return false;
        }
    });
}

// ============================================================================
// MILESTONE DEFINITIONS
// ============================================================================

export const MILESTONES = [
    { threshold: 100, name: 'First Hundred Souls', emoji: '🎉' },
    { threshold: 500, name: 'Half Thousand', emoji: '🌟' },
    { threshold: 1000, name: 'Mega Church Status', emoji: '🏆' },
    { threshold: 5000, name: 'Movement Status', emoji: '🔥' },
    { threshold: 10000, name: 'National Recognition', emoji: '📺' },
    { threshold: 50000, name: 'Generational Ministry', emoji: '🌍' },
    { threshold: 100000, name: 'Centennial Glory', emoji: '✨' },
];

/**
 * Check for member milestone
 */
export function checkMemberMilestone(
    previousMembers: number,
    currentMembers: number
): { reached: boolean; milestone?: typeof MILESTONES[0] } {
    for (const milestone of MILESTONES) {
        if (previousMembers < milestone.threshold && currentMembers >= milestone.threshold) {
            return { reached: true, milestone };
        }
    }
    return { reached: false };
}
