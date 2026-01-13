/**
 * Relationships Database
 * 
 * Procedurally generated partners with stats and archetypes.
 * The "Wife Algorithm" generates potential partners based on
 * player's current status.
 * 
 * Cultural Context:
 * In Nigerian church culture, there's immense pressure for
 * pastors to marry. The "Mummy G.O." role is almost as important
 * as the pastor himself. Different partner types carry different
 * risks and rewards.
 */

import type { Partner } from '@/types/game';

// Partner name pools for procedural generation
const firstNames = [
    'Chioma', 'Blessing', 'Favour', 'Grace', 'Joy', 'Faith', 'Hope',
    'Mercy', 'Peace', 'Precious', 'Divine', 'Gift', 'Praise', 'Glory',
    'Victoria', 'Jessica', 'Sandra', 'Angela', 'Patricia', 'Catherine'
];

const lastNames = [
    'Okonkwo', 'Adeyemi', 'Chukwu', 'Nwosu', 'Okoro', 'Eze', 'Obiora',
    'Adeleke', 'Balogun', 'Oladipo', 'Nnadi', 'Ugwu', 'Igwe', 'Anyanwu'
];

/**
 * Generate a random partner based on archetype
 */
export const generatePartner = (archetype?: Partner['archetype']): Partner => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    const selectedArchetype = archetype ||
        (['FAITHFUL_SISTER', 'SLAY_QUEEN', 'PASTOR_DAUGHTER', 'CHOIR_MISTRESS'] as const)[
        Math.floor(Math.random() * 4)
        ];

    // Base stats by archetype
    const archetypeStats: Record<Partner['archetype'], Partial<Partner>> = {
        'FAITHFUL_SISTER': {
            looks: 40 + Math.floor(Math.random() * 30),
            spirituality: 80 + Math.floor(Math.random() * 20),
            smarts: 60 + Math.floor(Math.random() * 30),
            craziness: 10 + Math.floor(Math.random() * 20),
            maintenanceCost: 5000 + Math.floor(Math.random() * 10000),
        },
        'SLAY_QUEEN': {
            looks: 80 + Math.floor(Math.random() * 20),
            spirituality: 20 + Math.floor(Math.random() * 30),
            smarts: 50 + Math.floor(Math.random() * 30),
            craziness: 60 + Math.floor(Math.random() * 40),
            maintenanceCost: 50000 + Math.floor(Math.random() * 100000),
        },
        'PASTOR_DAUGHTER': {
            looks: 50 + Math.floor(Math.random() * 30),
            spirituality: 70 + Math.floor(Math.random() * 20),
            smarts: 70 + Math.floor(Math.random() * 25),
            craziness: 30 + Math.floor(Math.random() * 30),
            maintenanceCost: 20000 + Math.floor(Math.random() * 30000),
        },
        'CHOIR_MISTRESS': {
            looks: 60 + Math.floor(Math.random() * 25),
            spirituality: 60 + Math.floor(Math.random() * 25),
            smarts: 55 + Math.floor(Math.random() * 30),
            craziness: 40 + Math.floor(Math.random() * 30),
            maintenanceCost: 15000 + Math.floor(Math.random() * 25000),
        },
    };

    const stats = archetypeStats[selectedArchetype];

    return {
        id: `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${Date.now()}`,
        name: `${firstName} ${lastName}`,
        archetype: selectedArchetype,
        looks: stats.looks || 50,
        spirituality: stats.spirituality || 50,
        smarts: stats.smarts || 50,
        craziness: stats.craziness || 50,
        maintenanceCost: stats.maintenanceCost || 20000,
    };
};

/**
 * Generate a pool of potential partners
 */
export const generatePartnerPool = (count: number = 3): Partner[] => {
    // Ensure variety - at least one of each type if count >= 4
    const pool: Partner[] = [];
    const archetypes: Partner['archetype'][] = ['FAITHFUL_SISTER', 'SLAY_QUEEN', 'PASTOR_DAUGHTER', 'CHOIR_MISTRESS'];

    if (count >= 4) {
        archetypes.forEach(archetype => {
            pool.push(generatePartner(archetype));
        });
        for (let i = 4; i < count; i++) {
            pool.push(generatePartner());
        }
    } else {
        for (let i = 0; i < count; i++) {
            pool.push(generatePartner());
        }
    }

    return pool;
};

/**
 * Calculate relationship drama probability based on craziness
 */
export const calculateDramaProbability = (partner: Partner): number => {
    // Base 5% + craziness percentage
    return 0.05 + (partner.craziness / 200);
};

/**
 * Get archetype description
 */
export const getArchetypeDescription = (archetype: Partner['archetype']): string => {
    const descriptions: Record<Partner['archetype'], string> = {
        'FAITHFUL_SISTER': 'Low risk, stable. Will support your ministry quietly. Boring but reliable.',
        'SLAY_QUEEN': 'High maintenance, high visibility. Great for "Couple Goals" posts. High drama risk.',
        'PASTOR_DAUGHTER': 'Comes with connections. Her father might help or control your ministry.',
        'CHOIR_MISTRESS': 'Talented and spiritual. Moderate everything. Balanced choice.',
    };
    return descriptions[archetype];
};

/**
 * Random drama events that can happen in relationships
 */
export const relationshipDramaEvents = [
    { text: 'She slapped a deaconess during Bible study.', scandalIncrease: 15, type: 'SLAY_QUEEN' },
    { text: 'She posted your argument on Instagram Live.', scandalIncrease: 20, type: 'SLAY_QUEEN' },
    { text: 'Her father is interfering in church decisions.', scandalIncrease: 5, type: 'PASTOR_DAUGHTER' },
    { text: 'Members are gossiping about her expensive lifestyle.', scandalIncrease: 10, type: 'SLAY_QUEEN' },
    { text: 'She caught you looking at another woman\'s DMs.', scandalIncrease: 25, type: 'ALL' },
    { text: 'She\'s demanding a bigger house.', scandalIncrease: 0, type: 'SLAY_QUEEN' },
    { text: 'She led a powerful worship session. Members love her.', scandalIncrease: -5, type: 'CHOIR_MISTRESS' },
    { text: 'She organized women\'s fellowship. Church growing.', scandalIncrease: -3, type: 'FAITHFUL_SISTER' },
];

export default { generatePartner, generatePartnerPool };
