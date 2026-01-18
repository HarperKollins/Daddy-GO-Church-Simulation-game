import { Nemesis } from '@/types/game';

const RIVAL_NAMES = [
    'Pastor Simeon', 'Bishop David', 'Prophet Jeremiah', 'Rev. Dr. Paul',
    'Apostle Johnson', 'Pastor Tunde', 'Evangelist Chioma', 'Prophetess Sarah'
];

const CHURCH_SUFFIXES = [
    'Embassy', 'Assembly', 'Chapel', 'Ministries', 'International',
    'Tabernacle', 'Solution Center', 'Fire Ministries'
];

export const createNemesis = (playerFame: number): Nemesis => {
    const name = RIVAL_NAMES[Math.floor(Math.random() * RIVAL_NAMES.length)];
    const church = `${name.split(' ')[1]} ${CHURCH_SUFFIXES[Math.floor(Math.random() * CHURCH_SUFFIXES.length)]}`;

    // Choose archetype
    const archetypes = ['INTELLECTUAL', 'MIRACLE_WORKER', 'TRADITIONALIST', 'YOUNG_TURK'] as const;
    const archetype = archetypes[Math.floor(Math.random() * archetypes.length)];

    return {
        id: `nemesis_${Date.now()}`,
        name,
        churchName: church,
        archetype,
        powerLevel: Math.floor(playerFame * (0.8 + Math.random() * 0.4)), // Rel to player
        aggressiveness: 30 + Math.floor(Math.random() * 70), // 30-100
        isActive: true
    };
};

export const generateNemesisAction = (nemesis: Nemesis) => {
    const roll = Math.random();

    // Attack Types
    if (roll < 0.4) {
        // Media Attack
        return {
            type: 'MEDIA_ATTACK',
            description: `${nemesis.name} called you a "False Prophet" on Instagram Live.`,
            damage: { fame: -100, scandal: 50 }
        };
    } else if (roll < 0.7) {
        // Poach Members
        return {
            type: 'POACHING',
            description: `${nemesis.churchName} opened a branch right next to you!`,
            damage: { members: -50, churchCash: -10000 }
        };
    } else {
        // Spiritual Attack
        return {
            type: 'SPIRITUAL_WARFARE',
            description: `You found a charm buried at your church gate. It's from ${nemesis.name}.`,
            damage: { health: -50, anointing: -100 }
        };
    }
};
