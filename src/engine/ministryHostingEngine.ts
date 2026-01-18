/**
 * Ministry Hosting Events System
 * 
 * Comprehensive hosting service events:
 * - Weekly services with dynamic outcomes
 * - Special programs (conventions, crusades)
 * - Guest minister bookings
 * - Healing services
 * - Deliverance nights
 * - Youth/Women/Men programs
 */

import type { CoreStats, VenueTier } from '@/types/game';

// ============================================================================
// SERVICE TYPES
// ============================================================================

export interface ServiceType {
    id: string;
    name: string;
    category: 'regular' | 'special' | 'mega' | 'healing' | 'deliverance' | 'demographic';
    baseAttendanceMultiplier: number;
    baseTithingMultiplier: number;
    // energyCost removed
    preparationWeeks: number;
    cooldownWeeks: number;
    requirements: Record<string, number>;
    description: string;
}

export const SERVICE_TYPES: ServiceType[] = [
    // Regular services
    {
        id: 'SUNDAY_SERVICE',
        name: 'Sunday Service',
        category: 'regular',
        baseAttendanceMultiplier: 1.0,
        baseTithingMultiplier: 1.0,

        preparationWeeks: 0,
        cooldownWeeks: 0,
        requirements: {},
        description: 'Standard weekly service.'
    },
    {
        id: 'MIDWEEK_SERVICE',
        name: 'Wednesday Bible Study',
        category: 'regular',
        baseAttendanceMultiplier: 0.4,
        baseTithingMultiplier: 0.3,

        preparationWeeks: 0,
        cooldownWeeks: 0,
        requirements: {},
        description: 'Midweek teaching service.'
    },
    {
        id: 'FRIDAY_VIGIL',
        name: 'Friday Night Vigil',
        category: 'regular',
        baseAttendanceMultiplier: 0.3,
        baseTithingMultiplier: 0.2,

        preparationWeeks: 0,
        cooldownWeeks: 0,
        requirements: { anointing: 2000 },
        description: 'All-night prayer. Builds anointing.'
    },

    // Special programs
    {
        id: 'ANNUAL_CONVENTION',
        name: 'Annual Convention',
        category: 'mega',
        baseAttendanceMultiplier: 5.0,
        baseTithingMultiplier: 4.0,

        preparationWeeks: 8,
        cooldownWeeks: 52,
        requirements: { members: 500, churchCash: 5000000 },
        description: 'Yearly mega event. Expensive but impactful.'
    },
    {
        id: 'CRUSADE',
        name: 'Citywide Crusade',
        category: 'mega',
        baseAttendanceMultiplier: 10.0,
        baseTithingMultiplier: 2.0,

        preparationWeeks: 12,
        cooldownWeeks: 26,
        requirements: { members: 1000, churchCash: 20000000, fame: 5000 },
        description: 'Open-air evangelism. Maximum exposure.'
    },
    {
        id: 'REVIVAL_WEEK',
        name: 'Revival Week',
        category: 'special',
        baseAttendanceMultiplier: 2.0,
        baseTithingMultiplier: 1.5,

        preparationWeeks: 2,
        cooldownWeeks: 13,
        requirements: { anointing: 4000 },
        description: '7 days of intense spiritual activity.'
    },

    // Healing & Deliverance
    {
        id: 'HEALING_SERVICE',
        name: 'Miracle & Healing Service',
        category: 'healing',
        baseAttendanceMultiplier: 3.0,
        baseTithingMultiplier: 2.0,

        preparationWeeks: 1,
        cooldownWeeks: 4,
        requirements: { anointing: 5000 },
        description: 'People come expecting miracles.'
    },
    {
        id: 'DELIVERANCE_NIGHT',
        name: 'Deliverance Night',
        category: 'deliverance',
        baseAttendanceMultiplier: 1.5,
        baseTithingMultiplier: 1.2,

        preparationWeeks: 1,
        cooldownWeeks: 2,
        requirements: { anointing: 4000, prayerPower: 3000 },
        description: 'Cast out demons. High anointing required.'
    },

    // Demographic programs
    {
        id: 'YOUTH_CONVENTION',
        name: 'Youth Explosion Conference',
        category: 'demographic',
        baseAttendanceMultiplier: 2.5,
        baseTithingMultiplier: 0.8,

        preparationWeeks: 4,
        cooldownWeeks: 26,
        requirements: { members: 200, fame: 3000 },
        description: 'Young people, loud worship, social media buzz.'
    },
    {
        id: 'WOMEN_CONF',
        name: 'Women of Destiny Conference',
        category: 'demographic',
        baseAttendanceMultiplier: 2.0,
        baseTithingMultiplier: 1.8,

        preparationWeeks: 4,
        cooldownWeeks: 26,
        requirements: { members: 300 },
        description: 'Women give generously.'
    },
    {
        id: 'SINGLES_CONFERENCE',
        name: 'Singles & Ready Summit',
        category: 'demographic',
        baseAttendanceMultiplier: 1.8,
        baseTithingMultiplier: 1.2,

        preparationWeeks: 2,
        cooldownWeeks: 13,
        requirements: { members: 200, fame: 2000 },
        description: 'Catch them before they leave for wedding churches.'
    }
];

// ============================================================================
// SERVICE OUTCOME CALCULATIONS
// ============================================================================

export interface ServiceOutcome {
    attendance: number;
    firstTimers: number;
    offerings: number;
    tithes: number;
    specialSeeds: number;
    membersGained: number;
    membersLost: number;
    fameChange: number;
    anointingChange: number;
    scandalRisk: number;
    highlights: string[];
}

/**
 * Run a service and calculate all outcomes
 */
export function runService(
    serviceType: ServiceType,
    currentMembers: number,
    stats: CoreStats,
    venue: VenueTier,
    weeksSinceLastService: number,
    guestMinister: boolean = false
): ServiceOutcome {
    // Base attendance
    let baseAttendance = currentMembers * serviceType.baseAttendanceMultiplier;

    // Venue capacity affects attendance
    const venueCapacities: Record<VenueTier, number> = {
        'BUS_STOP': 20,
        'CLASSROOM': 50,
        'TENT': 200,
        'WAREHOUSE': 500,
        'DOME': 2000,
        'STADIUM': 20000,
        'CITY_STATE': 100000
    };
    baseAttendance = Math.min(baseAttendance, venueCapacities[venue]);

    // Anointing attracts people
    const anointingBonus = 1 + (stats.anointing / 10000) * 0.3;
    baseAttendance *= anointingBonus;

    // Fame attracts people
    const fameBonus = 1 + (stats.fame / 10000) * 0.2;
    baseAttendance *= fameBonus;

    // Guest minister bonus
    if (guestMinister) baseAttendance *= 1.5;

    // Random variance ±20%
    const variance = 0.8 + Math.random() * 0.4;
    const attendance = Math.floor(baseAttendance * variance);

    // First timers (5-15% of attendance)
    const firstTimers = Math.floor(attendance * (0.05 + Math.random() * 0.1));

    // Financial calculations
    const avgOffering = 500 + (stats.fame / 10); // Fame = richer members
    const offerings = Math.floor(attendance * avgOffering * serviceType.baseTithingMultiplier);
    const tithes = Math.floor(attendance * avgOffering * 2 * serviceType.baseTithingMultiplier * 0.3);

    // Special seeds (big donations)
    const specialSeeds = Math.random() > 0.8
        ? Math.floor(Math.random() * 5000000) + 500000
        : 0;

    // Member changes
    const conversionRate = 0.3 + (stats.anointing / 10000) * 0.3;
    const membersGained = Math.floor(firstTimers * conversionRate);
    const membersLost = Math.floor(currentMembers * 0.01 * (1 - stats.anointing / 10000));

    // Fame and anointing changes
    const fameChange = serviceType.category === 'mega'
        ? Math.floor(attendance * 0.05)
        : Math.floor(attendance * 0.01);

    const anointingChange = serviceType.category === 'healing' || serviceType.category === 'deliverance'
        ? 100 + Math.floor(Math.random() * 200)
        : 20 + Math.floor(Math.random() * 50);

    // Generate highlights
    const highlights: string[] = [];
    if (firstTimers > attendance * 0.1) highlights.push('Exceptional visitor turnout!');
    if (specialSeeds > 1000000) highlights.push('A surprise seed of ₦' + specialSeeds.toLocaleString() + '!');
    if (serviceType.category === 'healing' && Math.random() > 0.5) {
        highlights.push('Testimonies of healing reported!');
    }
    if (serviceType.category === 'deliverance' && Math.random() > 0.4) {
        highlights.push('Dramatic deliverance! The crowd was amazed.');
    }

    return {
        attendance,
        firstTimers,
        offerings,
        tithes,
        specialSeeds,
        membersGained,
        membersLost,
        fameChange,
        anointingChange,
        scandalRisk: serviceType.category === 'healing' || serviceType.category === 'deliverance' ? 20 : 5,
        highlights
    };
}

// ============================================================================
// SERMON SYSTEM
// ============================================================================

export interface Sermon {
    id: string;
    title: string;
    topic: 'prosperity' | 'salvation' | 'deliverance' | 'marriage' | 'faith' | 'controversial';
    preparation: number;  // Hours
    impact: number;       // 1-100
    scandalRisk: number;  // 0-100
}

export const SERMON_TEMPLATES: Sermon[] = [
    {
        id: 'PROSPERITY_SEED',
        title: 'Your Seed Will Speak!',
        topic: 'prosperity',
        preparation: 2,
        impact: 70,
        scandalRisk: 30
    },
    {
        id: 'BORN_AGAIN',
        title: 'You Must Be Born Again',
        topic: 'salvation',
        preparation: 3,
        impact: 80,
        scandalRisk: 5
    },
    {
        id: 'CHAINS_BROKEN',
        title: 'Breaking Every Chain',
        topic: 'deliverance',
        preparation: 4,
        impact: 85,
        scandalRisk: 15
    },
    {
        id: 'MARRIAGE_SECRETS',
        title: 'Secrets to Lasting Marriage',
        topic: 'marriage',
        preparation: 3,
        impact: 75,
        scandalRisk: 10
    },
    {
        id: 'CONTROVERSIAL_TITHE',
        title: 'If You Don\'t Tithe, You\'re Cursed!',
        topic: 'controversial',
        preparation: 1,
        impact: 90,
        scandalRisk: 50
    },
    {
        id: 'CONTROVERSIAL_POLITICS',
        title: 'Let\'s Talk About The Election',
        topic: 'controversial',
        preparation: 1,
        impact: 95,
        scandalRisk: 70
    }
];

// ============================================================================
// HOSTING EVENT GENERATOR
// ============================================================================

export interface HostingEvent {
    type: 'during_service' | 'after_service' | 'visitor_issue' | 'technical' | 'miracle';
    description: string;
    choices: Array<{
        id: string;
        label: string;
        effects: Record<string, number>;
    }>;
}

export function generateHostingEvent(
    serviceType: ServiceType,
    attendance: number,
    anointing: number
): HostingEvent | null {
    // 60% chance of a special event during service
    if (Math.random() > 0.6) return null;

    const events: HostingEvent[] = [
        {
            type: 'during_service',
            description: 'A woman starts screaming during worship. The whole church is watching.',
            choices: [
                { id: 'cast_out', label: '⚡ "Come out in Jesus name!"', effects: { fame: 200, anointing: 100, scandalRisk: 20 } },
                { id: 'ushers', label: '👥 Signal ushers to remove her', effects: { fame: -50, scandal: 20 } },
                { id: 'counsel', label: '🙏 Pause service to counsel her', effects: { anointing: 50, attendanceLoss: 10 } }
            ]
        },
        {
            type: 'visitor_issue',
            description: 'A wealthy-looking first-timer wants to sit in the front row. It\'s reserved for elders.',
            choices: [
                { id: 'vip', label: '🌟 Give them VIP treatment', effects: { donations: 500000, eldersFrustration: 30 } },
                { id: 'protocol', label: '📋 Follow protocol strictly', effects: { donations: -100000, eldersHappy: 20 } },
                { id: 'personal', label: '🤝 You personally welcome them', effects: { fame: 50, stress: 50 } }
            ]
        },
        {
            type: 'miracle',
            description: 'A crippled man claims he was healed during the service. The crowd is waiting.',
            choices: [
                { id: 'verify', label: '🔍 Verify before announcing', effects: { anointing: 50, fame: 0 } },
                { id: 'proclaim', label: '📣 Announce the miracle loudly!', effects: { fame: 500, scandalRisk: 40 } },
                { id: 'downplay', label: '🤫 "Let\'s not rush to conclusions"', effects: { anointing: 30, fame: -50 } }
            ]
        },
        {
            type: 'technical',
            description: 'Power cut during your sermon! NEPA struck at the climax.',
            choices: [
                { id: 'continue', label: '💪 Preach louder without mic!', effects: { fame: 100, health: -100, anointingBoost: 50 } },
                { id: 'wait', label: '⏳ Wait for gen to come on', effects: { attendanceLoss: 20, stress: 50 } },
                { id: 'joke', label: '😂 Make a joke about Nigeria', effects: { fame: 50, relatability: 30 } }
            ]
        }
    ];

    return events[Math.floor(Math.random() * events.length)];
}

// ============================================================================
// EXPORTS
// ============================================================================

export function getAvailableServices(
    members: number,
    churchCash: number,
    fame: number,
    anointing: number
): ServiceType[] {
    return SERVICE_TYPES.filter(service => {
        const req = service.requirements;
        if (req.members && members < req.members) return false;
        if (req.churchCash && churchCash < req.churchCash) return false;
        if (req.fame && fame < req.fame) return false;
        if (req.anointing && anointing < req.anointing) return false;
        return true;
    });
}
