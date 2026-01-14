/**
 * Story Generator - Procedural Event Generation
 * 
 * This creates infinite unique events by:
 * - Using template patterns with variable substitution
 * - Generating dynamic amounts, names, and scenarios
 * - Combining elements for emergent storytelling
 */

import type { GameEvent, EventChoice } from '@/types/game';

// ============================================================================
// VARIABLE POOLS
// ============================================================================

const VARIABLE_POOLS = {
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
    moneyAmount: [
        50000, 100000, 200000, 350000, 500000, 800000, 1000000, 2000000, 5000000
    ],
    reason: [
        'hospital bills', 'school fees', 'business capital', 'rent issues',
        'wedding expenses', 'funeral costs', 'visa processing', 'car repairs',
        'debt payment', 'emergency surgery'
    ],
    location: [
        'Lagos', 'Abuja', 'Port Harcourt', 'Enugu', 'Ibadan',
        'Kano', 'Benin City', 'Calabar', 'the village', 'overseas'
    ],
    accusation: [
        'stealing church funds', 'having an affair', 'faking miracles',
        'being a ritualist', 'practicing yahoo', 'embezzlement',
        'impregnating a choir member', 'buying a fake degree'
    ],
    mediaOutlet: [
        'Instablog9ja', 'Linda Ikeji Blog', 'Sahara Reporters', 'The Punch',
        'Nairaland', 'a popular Twitter influencer', 'a YouTube exposé channel'
    ],
    scandal: [
        'leaked voice note', 'viral video', 'anonymous letter', 'WhatsApp screenshots',
        'bank statement leak', 'confession from an insider'
    ],
    blessing: [
        'a wealthy diaspora member', 'a senator', 'a bank MD', 'a tech billionaire',
        'an oil magnate', 'a Nollywood actress', 'a music star'
    ],
    crisis: [
        'flooding', 'fire outbreak', 'robbery attack', 'cult clash',
        'epidemic', 'kidnapping', 'building collapse'
    ]
};

// ============================================================================
// EVENT TEMPLATES
// ============================================================================

interface EventTemplate {
    id: string;
    titlePattern: string;
    descriptionPattern: string;
    category: 'money' | 'scandal' | 'opportunity' | 'family' | 'spiritual' | 'crisis';
    choiceTemplates: ChoiceTemplate[];
    priority: number;
    oneTime: boolean;
}

interface ChoiceTemplate {
    id: string;
    labelPattern: string;
    resultTextPattern: string;
    effects: {
        stat: string;
        operation: 'add' | 'subtract';
        valueRange: [number, number];
    }[];
}

const EVENT_TEMPLATES: EventTemplate[] = [
    // Money request template
    {
        id: 'MONEY_REQUEST',
        titlePattern: '💸 {familyMember} Needs Help',
        descriptionPattern: `{familyMember} just called you.

"My child, I need your help urgently. The issue is {reason}. 
I need ₦{moneyAmount} by this week or else...!"

They are crying on the phone. You can hear the desperation in their voice.`,
        category: 'money',
        priority: 6,
        oneTime: false,
        choiceTemplates: [
            {
                id: 'send_full',
                labelPattern: '💳 Send the full amount',
                resultTextPattern: '{familyMember} thanked you with tears. "God will bless you!"',
                effects: [
                    { stat: 'personalCash', operation: 'subtract', valueRange: [0, 0] },
                    { stat: 'anointing', operation: 'add', valueRange: [100, 300] }
                ]
            },
            {
                id: 'send_half',
                labelPattern: '💰 Send half',
                resultTextPattern: 'They accepted it gratefully. "It is still help."',
                effects: [
                    { stat: 'personalCash', operation: 'subtract', valueRange: [0, 0] },
                    { stat: 'stress', operation: 'add', valueRange: [100, 200] }
                ]
            },
            {
                id: 'refuse',
                labelPattern: '❌ "I don\'t have money now"',
                resultTextPattern: 'Long silence. Then they hung up. The relationship may never recover.',
                effects: [
                    { stat: 'stress', operation: 'add', valueRange: [300, 500] }
                ]
            }
        ]
    },

    // Scandal template
    {
        id: 'MEDIA_SCANDAL',
        titlePattern: '📰 Scandal Alert: {mediaOutlet}',
        descriptionPattern: `Your phone is blowing up!

{mediaOutlet} just posted: "BREAKING: Famous pastor accused of {accusation}"

A {scandal} has gone viral. Your face is everywhere.
Church members are calling. Family is panicking. Sponsors are waiting.

Comments are pouring in. #PastorExposed is trending.`,
        category: 'scandal',
        priority: 9,
        oneTime: false,
        choiceTemplates: [
            {
                id: 'deny',
                labelPattern: '🙅 Deny everything publicly',
                resultTextPattern: '"It is the attack of the enemy!" Some believed. Some didn\'t.',
                effects: [
                    { stat: 'scandal', operation: 'add', valueRange: [200, 400] },
                    { stat: 'fame', operation: 'add', valueRange: [100, 300] }
                ]
            },
            {
                id: 'confess',
                labelPattern: '😢 Confess and apologize',
                resultTextPattern: 'You cried on live video. The internet was divided. Some called it manipulation.',
                effects: [
                    { stat: 'scandal', operation: 'subtract', valueRange: [100, 300] },
                    { stat: 'anointing', operation: 'add', valueRange: [200, 400] }
                ]
            },
            {
                id: 'sue',
                labelPattern: '⚖️ Threaten to sue',
                resultTextPattern: 'Your lawyers sent a letter. They took down the post. But screenshots are forever.',
                effects: [
                    { stat: 'personalCash', operation: 'subtract', valueRange: [500000, 2000000] },
                    { stat: 'scandal', operation: 'add', valueRange: [100, 200] }
                ]
            }
        ]
    },

    // Big opportunity template
    {
        id: 'BIG_OPPORTUNITY',
        titlePattern: '✨ {blessing} Wants to Join',
        descriptionPattern: `{blessing} attended your service last Sunday.

They were moved by the spirit. They want to join your church AND support your ministry.

They're talking about:
- Monthly donations of ₦{moneyAmount}
- Connections to powerful people in {location}
- A new church project

But they have... "conditions." They want influence.`,
        category: 'opportunity',
        priority: 7,
        oneTime: true,
        choiceTemplates: [
            {
                id: 'accept_all',
                labelPattern: '✅ Accept everything',
                resultTextPattern: 'The money flowed. So did the complications.',
                effects: [
                    { stat: 'churchCash', operation: 'add', valueRange: [1000000, 5000000] },
                    { stat: 'influence', operation: 'add', valueRange: [500, 1000] },
                    { stat: 'anointing', operation: 'subtract', valueRange: [200, 400] }
                ]
            },
            {
                id: 'negotiate',
                labelPattern: '🤝 Negotiate terms',
                resultTextPattern: 'You reached a compromise. Less money, more independence.',
                effects: [
                    { stat: 'churchCash', operation: 'add', valueRange: [500000, 2000000] },
                    { stat: 'influence', operation: 'add', valueRange: [200, 400] }
                ]
            },
            {
                id: 'refuse',
                labelPattern: '❌ "My ministry is not for sale"',
                resultTextPattern: 'They left. Others respected your stance. The money went to your rival.',
                effects: [
                    { stat: 'anointing', operation: 'add', valueRange: [300, 500] },
                    { stat: 'fame', operation: 'subtract', valueRange: [100, 300] }
                ]
            }
        ]
    },

    // Community crisis template
    {
        id: 'COMMUNITY_CRISIS',
        titlePattern: '🚨 Crisis in {location}',
        descriptionPattern: `A {crisis} just happened in {location}.

Hundreds are affected. Some are your church members.
The community is looking to you for leadership.

"Pastor, what will the church do? People are suffering!"

The media is watching. Your response will define your ministry.`,
        category: 'crisis',
        priority: 8,
        oneTime: false,
        choiceTemplates: [
            {
                id: 'major_help',
                labelPattern: '💪 Lead major relief effort',
                resultTextPattern: 'Your church became a beacon of hope. Media coverage was massive.',
                effects: [
                    { stat: 'churchCash', operation: 'subtract', valueRange: [500000, 2000000] },
                    { stat: 'fame', operation: 'add', valueRange: [500, 1000] },
                    { stat: 'anointing', operation: 'add', valueRange: [300, 500] }
                ]
            },
            {
                id: 'prayer_only',
                labelPattern: '🙏 Organize prayer and vigil',
                resultTextPattern: 'The prayer was powerful. But some said "prayer without action is dead."',
                effects: [
                    { stat: 'anointing', operation: 'add', valueRange: [200, 400] },
                    { stat: 'fame', operation: 'subtract', valueRange: [100, 300] }
                ]
            },
            {
                id: 'ignore',
                labelPattern: '💬 Issue statement only',
                resultTextPattern: '"We stand with the victims." Twitter was not impressed.',
                effects: [
                    { stat: 'scandal', operation: 'add', valueRange: [100, 300] }
                ]
            }
        ]
    }
];

// ============================================================================
// STORY GENERATION FUNCTIONS
// ============================================================================

/**
 * Select random item from array
 */
function randomFrom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Select random number in range
 */
function randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Fill template with random variables
 */
function fillTemplate(pattern: string, variables: Record<string, string | number>): string {
    let result = pattern;
    for (const [key, value] of Object.entries(variables)) {
        result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
    }
    return result;
}

/**
 * Generate a unique event from template
 */
export function generateEventFromTemplate(template: EventTemplate): GameEvent {
    // Generate random variables
    const variables: Record<string, string | number> = {
        familyMember: randomFrom(VARIABLE_POOLS.familyMember),
        churchMember: randomFrom(VARIABLE_POOLS.churchMember),
        moneyAmount: randomFrom(VARIABLE_POOLS.moneyAmount),
        reason: randomFrom(VARIABLE_POOLS.reason),
        location: randomFrom(VARIABLE_POOLS.location),
        accusation: randomFrom(VARIABLE_POOLS.accusation),
        mediaOutlet: randomFrom(VARIABLE_POOLS.mediaOutlet),
        scandal: randomFrom(VARIABLE_POOLS.scandal),
        blessing: randomFrom(VARIABLE_POOLS.blessing),
        crisis: randomFrom(VARIABLE_POOLS.crisis),
    };

    // Generate unique ID
    const uniqueId = `${template.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Generate choices
    const choices: EventChoice[] = template.choiceTemplates.map(ct => {
        const effects = ct.effects.map(e => ({
            type: 'stat' as const,
            stat: e.stat as 'personalCash',
            operation: e.operation,
            value: e.stat === 'personalCash' && e.valueRange[0] === 0
                ? variables.moneyAmount as number
                : randomInRange(e.valueRange[0], e.valueRange[1])
        }));

        return {
            id: `${ct.id}_${uniqueId}`,
            label: fillTemplate(ct.labelPattern, variables),
            resultText: fillTemplate(ct.resultTextPattern, variables),
            effects,
        };
    });

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
                template.category as 'story' | 'random' | 'crisis' | 'opportunity',
    };
}

/**
 * Generate random event based on game state
 */
export function generateProceduralEvent(
    fame: number,
    scandal: number,
    week: number
): GameEvent {
    // Weight templates based on game state
    const weights: Record<string, number> = {
        MONEY_REQUEST: 1.0,
        MEDIA_SCANDAL: scandal > 3000 ? 1.5 : 0.5,
        BIG_OPPORTUNITY: fame > 5000 ? 1.5 : 0.3,
        COMMUNITY_CRISIS: fame > 3000 ? 1.0 : 0.3,
    };

    // Simple weighted selection
    const templates = EVENT_TEMPLATES.filter(t => Math.random() < (weights[t.id] || 0.5));
    const selectedTemplate = templates.length > 0 ? randomFrom(templates) : EVENT_TEMPLATES[0];

    return generateEventFromTemplate(selectedTemplate);
}

export { EVENT_TEMPLATES, VARIABLE_POOLS };
