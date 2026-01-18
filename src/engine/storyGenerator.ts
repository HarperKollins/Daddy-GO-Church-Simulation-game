/**
 * Story Generator - The Infinity Engine
 * 
 * Procedural Event Generation System V2
 * 
 * Capability:
 * - Era-specific event filtering
 * - Dynamic variable injection based on context
 * - "Template Mixing" for infinite variations
 * - Yearly Event Batching
 */

import type { GameEvent, EventChoice, GameEra } from '@/types/game';

// ============================================================================
// 1. CONTEXTUAL VARIABLE POOLS
// ============================================================================

const VARIABLE_POOLS = {
    // People
    familyMember: [
        'your mother', 'your father', 'Uncle Chidi', 'Aunty Nkechi',
        'your younger brother Emeka', 'your cousin Obinna', 'Grandma',
        'your sister Chidinma', 'your in-law', 'your late father\'s friend'
    ],
    churchMember: [
        'Sister Blessing', 'Deacon Okafor', 'Brother Tunde', 'Elder Adeyemi',
        'Sister Grace', 'the choir leader', 'a founding member', 'your protocol officer',
        'the women\'s leader', 'a wealthy businessman member'
    ],

    // University Era Variables
    lecturer: ['Dr. Uche', 'Prof. Balogun', 'the HOD', 'the Dean', 'that strict invigilator'],
    campusLocation: ['Lecture Hall 3', 'the hostel', 'the SUG building', 'Love Garden', 'the library'],
    campusCrisis: ['missing scripts', 'cultist clash', 'SUG riot', 'ASUU strike', 'hostel raiding'],

    // City/Empire Era Variables
    location: [
        'Lagos', 'Abuja', 'Port Harcourt', 'Enugu', 'Ibadan',
        'Kano', 'Benin City', 'Calabar', 'the village', 'London', 'Houston'
    ],
    mediaOutlet: [
        'Instablog9ja', 'Linda Ikeji Blog', 'Sahara Reporters', 'The Punch',
        'Nairaland', 'a popular Twitter influencer', 'a YouTube exposé channel'
    ],
    scandal: [
        'leaked voice note', 'viral video', 'anonymous letter', 'WhatsApp screenshots',
        'bank statement leak', 'confession from an insider'
    ],

    // Generic
    moneyAmount: [50000, 100000, 200000, 500000, 1000000, 5000000, 10000000],
    reason: [
        'hospital bills', 'school fees', 'business capital', 'rent issues',
        'wedding expenses', 'funeral costs', 'visa processing'
    ],
    blessing: [
        'a wealthy diaspora member', 'a senator', 'a bank MD', 'a tech billionaire',
        'an oil magnate', 'a Nollywood actress', 'a music star'
    ],
    accusation: [
        'stealing church funds', 'having an affair', 'faking miracles',
        'being a ritualist', 'practicing yahoo', 'embezzlement',
        'impregnating a choir member', 'buying a fake degree'
    ]
};

// ============================================================================
// 2. TEMPLATE INTERFACES
// ============================================================================

export interface EventTemplate {
    id: string;
    titlePattern: string;
    descriptionPattern: string;
    allowedEras: GameEra[];
    category: 'money' | 'scandal' | 'opportunity' | 'family' | 'spiritual' | 'crisis' | 'campus';
    choiceTemplates: ChoiceTemplate[];
    priority: number; // Higher = more likely if conditions met
    oneTime: boolean;
    conditions?: {
        minFame?: number;
        minScandal?: number;
        minCash?: number;
    };
}

interface ChoiceTemplate {
    id: string;
    labelPattern: string;
    resultTextPattern: string;
    effects: {
        stat: string; // matches keys in CoreStats
        operation: 'add' | 'subtract';
        valueRange: [number, number];
    }[];
}

// ============================================================================
// 3. THE TEMPLATE VAULT
// ============================================================================

const EVENT_TEMPLATES: EventTemplate[] = [
    // -------------------------------------------------------------------------
    // UNIVERSITY ERA EVENTS
    // -------------------------------------------------------------------------
    {
        id: 'CAMPUS_FELLOWSHIP_CRISIS',
        titlePattern: '🔥 Fellowship Drama at {campusLocation}',
        descriptionPattern: `Chaos in the fellowship!
        
        {lecturer} has threatened to ban your gathering at {campusLocation} because of "noise pollution".
        
        The students are angry. They want to protest.
        "Pastor, should we spiritualize it or radicalize it?"`,
        allowedEras: ['University'],
        category: 'campus',
        priority: 5,
        oneTime: false,
        choiceTemplates: [
            {
                id: 'protest',
                labelPattern: '✊ Aluta Continua! (Protest)',
                resultTextPattern: 'The students marched. The school bowed. You are a hero, but the school hates you.',
                effects: [
                    { stat: 'fame', operation: 'add', valueRange: [20, 50] },
                    { stat: 'stress', operation: 'add', valueRange: [10, 20] }
                ]
            },
            {
                id: 'pray',
                labelPattern: '🙏 Night Vigil Warfare',
                resultTextPattern: 'You prayed till dawn. The lecturer fell sick the next day. Fear gripped everyone.',
                effects: [
                    { stat: 'anointing', operation: 'add', valueRange: [30, 60] },
                    { stat: 'influence', operation: 'add', valueRange: [10, 30] }
                ]
            },
            {
                id: 'bribe',
                labelPattern: '💰 "Sort" the Lecturer',
                resultTextPattern: 'Money solved it quietly. But your treasurer gave you a side eye.',
                effects: [
                    { stat: 'personalCash', operation: 'subtract', valueRange: [20000, 50000] },
                    { stat: 'scandal', operation: 'add', valueRange: [5, 15] }
                ]
            }
        ]
    },
    {
        id: 'MISSING_FUNDS_UNI',
        titlePattern: '💸 Treasury Issues',
        descriptionPattern: `The fellowship treasurer reports that ₦{moneyAmount} is missing.
        
        They claim it was "spiritual attack" on the offering box.
        Everyone is looking at you.`,
        allowedEras: ['University'],
        category: 'money',
        priority: 6,
        oneTime: false,
        choiceTemplates: [
            {
                id: 'audit',
                labelPattern: '🔍 Public Audit',
                resultTextPattern: 'You exposed them. It was ugly, but trust was restored.',
                effects: [
                    { stat: 'stress', operation: 'add', valueRange: [20, 40] },
                    { stat: 'influence', operation: 'add', valueRange: [20, 50] }
                ]
            },
            {
                id: 'cover',
                labelPattern: '🤫 Cover it up (Pay it yourself)',
                resultTextPattern: 'You depleted your savings to save face. "God will replenish."',
                effects: [
                    { stat: 'personalCash', operation: 'subtract', valueRange: ([5000, 20000] as [number, number]) }, // Smaller amounts for uni
                    { stat: 'anointing', operation: 'add', valueRange: [10, 20] }
                ]
            }
        ]
    },

    // -------------------------------------------------------------------------
    // CITY & EMPIRE ERA EVENTS
    // -------------------------------------------------------------------------
    {
        id: 'MONEY_REQUEST',
        titlePattern: '📞 {familyMember} Calling...',
        descriptionPattern: `{familyMember} is crying on the phone.
        
        "They want to kill me! I need ₦{moneyAmount} for {reason} right now!"
        
        They know you have the money.`,
        allowedEras: ['City', 'Empire', 'Ultimate'],
        category: 'money',
        priority: 4,
        oneTime: false,
        choiceTemplates: [
            {
                id: 'pay_full',
                labelPattern: '💳 Send everything',
                resultTextPattern: 'You sent the money. They blessed you. Your bank account wept.',
                effects: [
                    { stat: 'personalCash', operation: 'subtract', valueRange: [0, 0] }, // Dynamic in code
                    { stat: 'anointing', operation: 'add', valueRange: [50, 100] }
                ]
            },
            {
                id: 'block',
                labelPattern: '🚫 Block Number',
                resultTextPattern: 'You chose peace. The family group chat is on fire though.',
                effects: [
                    { stat: 'stress', operation: 'subtract', valueRange: [10, 30] },
                    { stat: 'scandal', operation: 'add', valueRange: [10, 20] }
                ]
            }
        ]
    },
    {
        id: 'MEDIA_SCANDAL_V2',
        titlePattern: '📱 Trending: {mediaOutlet}',
        descriptionPattern: `Bad news. {mediaOutlet} just dropped a bombshell.
        
        "Popular Pastor accused of {accusation}!"
        
        It's trending #1. Your phone is vibrating off the table.`,
        allowedEras: ['City', 'Empire', 'Ultimate'], // Not uni
        category: 'scandal',
        priority: 8,
        oneTime: false,
        conditions: { minFame: 2000 },
        choiceTemplates: [
            {
                id: 'deny',
                labelPattern: '😤 Deny & Threaten Lawsuit',
                resultTextPattern: 'Your lawyers spoke grammar. The blog deleted it, but the screenshots remain.',
                effects: [
                    { stat: 'personalCash', operation: 'subtract', valueRange: [500000, 2000000] },
                    { stat: 'scandal', operation: 'subtract', valueRange: [100, 300] }
                ]
            },
            {
                id: 'silence',
                labelPattern: '😶 Ignore it',
                resultTextPattern: '"The Lord will fight for me." The internet dragged you for a week then forgot.',
                effects: [
                    { stat: 'scandal', operation: 'add', valueRange: [200, 500] },
                    { stat: 'stress', operation: 'add', valueRange: [50, 100] }
                ]
            }
        ]
    },
    {
        id: 'POLITICAL_PROPHESY',
        titlePattern: '🗳️ Election Year Prophesy',
        descriptionPattern: `The Governor visited your church.
        
        He wants a "special prophesy" for the upcoming election. 
        He dropped a "seed" of ₦{moneyAmount}.`,
        allowedEras: ['City', 'Empire', 'Ultimate'],
        category: 'scandal',
        priority: 7,
        oneTime: false,
        conditions: { minFame: 5000 },
        choiceTemplates: [
            {
                id: 'endorse',
                labelPattern: '📢 Prophesy Victory',
                resultTextPattern: 'You declared him winner. He won. You are now a "State Prophet".',
                effects: [
                    { stat: 'churchCash', operation: 'add', valueRange: [0, 0] }, // Uses dynamic amount
                    { stat: 'influence', operation: 'add', valueRange: [500, 1000] },
                    { stat: 'scandal', operation: 'add', valueRange: [100, 300] }
                ]
            },
            {
                id: 'reject',
                labelPattern: '❌ "I see what I see"',
                resultTextPattern: 'You refused to be bought. He lost. Now his boys are watching you.',
                effects: [
                    { stat: 'anointing', operation: 'add', valueRange: [200, 500] },
                    { stat: 'stress', operation: 'add', valueRange: [100, 200] }
                ]
            }
        ]
    },

    // -------------------------------------------------------------------------
    // NEW TEMPLATES (EXPANSION)
    // -------------------------------------------------------------------------
    {
        id: 'EXAM_MALPRACTICE',
        titlePattern: '📝 The "Expo" Offer',
        descriptionPattern: `Exam week is here. {lecturer} is setting "Format".
        
        Your fellowship members have contributed ₦{moneyAmount} to "sort" the paper.
        "Pastor, we need a miracle... or a leak."`,
        allowedEras: ['University'],
        category: 'campus',
        priority: 6,
        oneTime: false,
        choiceTemplates: [
            {
                id: 'pay',
                labelPattern: '💸 Pay for the "Leak"',
                resultTextPattern: 'Everyone passed. The fellowship grew. But your conscience is heavy.',
                effects: [
                    { stat: 'personalCash', operation: 'subtract', valueRange: [10000, 20000] },
                    { stat: 'influence', operation: 'add', valueRange: [20, 50] },
                    { stat: 'anointing', operation: 'subtract', valueRange: [50, 100] }
                ]
            },
            {
                id: 'prayer',
                labelPattern: '🙏 "Read your books!"',
                resultTextPattern: 'Half the fellowship failed. They said your God does not save.',
                effects: [
                    { stat: 'influence', operation: 'subtract', valueRange: [30, 60] },
                    { stat: 'stress', operation: 'add', valueRange: [20, 40] }
                ]
            }
        ]
    },
    {
        id: 'LAND_DISPUTE_LAGOS',
        titlePattern: '🏗️ Omo Onile Attack',
        descriptionPattern: `You bought land for the new headquarters in {location}.
        
        The 'Omo Onile' (Land Grabbers) are here properly. 
        They are demanding ₦{moneyAmount} settlement or they will bulldoze the foundation.`,
        allowedEras: ['City', 'Empire'],
        category: 'crisis',
        priority: 7,
        oneTime: false,
        conditions: { minCash: 1000000 },
        choiceTemplates: [
            {
                id: 'settle',
                labelPattern: '💰 Pay them off',
                resultTextPattern: 'They praised you as "Baba for the boys". Construction continued.',
                effects: [
                    { stat: 'churchCash', operation: 'subtract', valueRange: [0, 0] },
                    { stat: 'stress', operation: 'add', valueRange: [20, 50] }
                ]
            },
            {
                id: 'police',
                labelPattern: '👮 Call the Commissioner',
                resultTextPattern: 'The Police arrested them. But now you owe the Commissioner a favor.',
                effects: [
                    { stat: 'influence', operation: 'add', valueRange: [100, 200] },
                    { stat: 'churchCash', operation: 'subtract', valueRange: [100000, 200000] }
                ]
            },
            {
                id: 'spiritual',
                labelPattern: '🔥 Holy Ghost Fire (Curse Them)',
                resultTextPattern: 'Their leader fell sick instantly. They fled. The testimony was massive.',
                effects: [
                    { stat: 'anointing', operation: 'add', valueRange: [200, 400] },
                    { stat: 'fame', operation: 'add', valueRange: [100, 300] }
                ]
            }
        ]
    },
    {
        id: 'JET_SCANDAL',
        titlePattern: '✈️ The Private Jet Debate',
        descriptionPattern: `You just unveiled your new Private Jet. 
        
        {mediaOutlet} writes: "Pastor flies luxury while members trek to church."
        
        The public is outraged.`,
        allowedEras: ['Empire', 'Ultimate'],
        category: 'scandal',
        priority: 8,
        oneTime: false,
        conditions: { minFame: 10000 },
        choiceTemplates: [
            {
                id: 'defend',
                labelPattern: '🎤 "It is for Evangelism!"',
                resultTextPattern: 'You quoted scripture. The core members cheered. The public jeered.',
                effects: [
                    { stat: 'scandal', operation: 'add', valueRange: [200, 400] },
                    { stat: 'anointing', operation: 'add', valueRange: [100, 200] }
                ]
            },
            {
                id: 'charity',
                labelPattern: '🏥 "I use it for Medical Aid"',
                resultTextPattern: 'Visible PR stunt. You flew a sick child abroad. The heat died down.',
                effects: [
                    { stat: 'personalCash', operation: 'subtract', valueRange: [5000000, 10000000] },
                    { stat: 'fame', operation: 'add', valueRange: [500, 1000] },
                    { stat: 'scandal', operation: 'subtract', valueRange: [200, 400] }
                ]
            }
        ]
    },
    {
        id: 'TRANSHUMANISM_OFFER',
        titlePattern: '🧬 The Eternal Upload',
        descriptionPattern: 'Tech billionaire Elon Musk (aged 109) offers to upload your consciousness to the Cloud. "Immortality," he promises. "But you leave your body behind."',
        allowedEras: ['Ultimate'],
        category: 'opportunity',
        priority: 100, // Guarantees it appears if condition met
        oneTime: true, // Only happens once
        conditions: { minCash: 100000000000 },
        choiceTemplates: [
            {
                id: 'accept_upload',
                labelPattern: '⚡ Upload Consciousness (Become an AI God)',
                resultTextPattern: 'Flesh is weak. You are now pure data. The church is infinite.',
                effects: [
                    { stat: 'anointing', operation: 'add', valueRange: [10000, 10000] }, // Infinite power
                    { stat: 'health', operation: 'add', valueRange: [100000, 100000] } // Digital life
                ]
            },
            {
                id: 'reject_upload',
                labelPattern: '🛑 Refuse. Flesh is Sacred.',
                resultTextPattern: 'You chose humanity. You will die one day, but you will die a man.',
                effects: [
                    { stat: 'anointing', operation: 'add', valueRange: [50, 100] }
                ]
            }
        ]
    }
];

// ============================================================================
// 4. ENGINE LOGIC
// ============================================================================

function randomFrom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillTemplate(pattern: string, variables: Record<string, string | number>): string {
    let result = pattern;
    for (const [key, value] of Object.entries(variables)) {
        result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
    }
    return result;
}

/**
 * Generates variables relevant to the template and current era
 */
function generateVariables(era: GameEra): Record<string, string | number> {
    const isUni = era === 'University';

    return {
        // People
        familyMember: randomFrom(VARIABLE_POOLS.familyMember),
        churchMember: randomFrom(VARIABLE_POOLS.churchMember),
        lecturer: randomFrom(VARIABLE_POOLS.lecturer),

        // Locations
        location: randomFrom(VARIABLE_POOLS.location),
        campusLocation: randomFrom(VARIABLE_POOLS.campusLocation),

        // Issues
        reason: randomFrom(VARIABLE_POOLS.reason),
        accusation: randomFrom(VARIABLE_POOLS.accusation),
        campusCrisis: randomFrom(VARIABLE_POOLS.campusCrisis),
        mediaOutlet: randomFrom(VARIABLE_POOLS.mediaOutlet),

        // Money (Scale based on Era)
        moneyAmount: isUni
            ? randomFrom([5000, 10000, 20000, 50000])
            : randomFrom(VARIABLE_POOLS.moneyAmount),

        blessing: randomFrom(VARIABLE_POOLS.blessing),
    };
}

/**
 * Creates a playable GameEvent from a template
 */
export function instantiateEvent(template: EventTemplate, era: GameEra): GameEvent {
    const variables = generateVariables(era);
    const uniqueId = `${template.id}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

    const choices: EventChoice[] = template.choiceTemplates.map(ct => ({
        id: `${ct.id}_${uniqueId}`,
        label: fillTemplate(ct.labelPattern, variables),
        resultText: fillTemplate(ct.resultTextPattern, variables),
        effects: ct.effects.map(e => ({
            type: 'stat' as const,
            stat: e.stat as any,
            operation: e.operation,
            value: (e.stat === 'personalCash' || e.stat === 'churchCash') && e.valueRange[0] === 0
                ? variables.moneyAmount as number
                : randomInRange(e.valueRange[0], e.valueRange[1])
        }))
    }));

    return {
        id: uniqueId,
        title: fillTemplate(template.titlePattern, variables),
        description: fillTemplate(template.descriptionPattern, variables),
        conditions: [],
        choices,
        isPermanent: false,
        priority: template.priority,
        oneTime: template.oneTime,
        category: template.category === 'money' ? 'random' :
            template.category === 'scandal' ? 'crisis' :
                template.category as any,
    };
}

export const generateEventFromTemplate = instantiateEvent;


// ============================================================================
// 5. PUBLIC API
// ============================================================================

/**
 * Generates a batch of events for a simulation year
 * @param era Current Game Era
 * @param count Number of events to generate (default 3)
 * @param context Additional context (fame, scandal, cash) to weight events
 */
export function generateYearlyEvents(
    era: GameEra,
    count: number = 3,
    context: { fame: number, scandal: number, cash: number }
): GameEvent[] {
    // 1. Filter templates by Era and Conditions
    const validTemplates = EVENT_TEMPLATES.filter(t => {
        const eraMatch = t.allowedEras.includes(era);
        if (!eraMatch) return false;

        if (t.conditions) {
            if (t.conditions.minFame && context.fame < t.conditions.minFame) return false;
            if (t.conditions.minScandal && context.scandal < t.conditions.minScandal) return false;
        }
        return true;
    });

    if (validTemplates.length === 0) return [];

    // 2. Select Weighted Templates
    const selectedEvents: GameEvent[] = [];

    for (let i = 0; i < count; i++) {
        // Simple random selection for now - could be improved with weights
        const template = randomFrom(validTemplates);
        selectedEvents.push(instantiateEvent(template, era));
    }

    return selectedEvents;
}

export { EVENT_TEMPLATES, VARIABLE_POOLS };
