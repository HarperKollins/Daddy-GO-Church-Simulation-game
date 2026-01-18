/**
 * Family Event Templates
 * 
 * These events capture the authentic Nigerian family dynamics:
 * - Money requests from all directions
 * - Marriage pressure
 * - Family success expectations
 * - Village politics
 * - Extended family drama
 */

import type { GameEvent } from '@/types/game';

// ============================================================================
// FAMILY MONEY REQUEST EVENTS
// ============================================================================

export const familyMoneyEvents: GameEvent[] = [
    {
        id: 'MAMA_SICK',
        title: '💔 Mama is Sick',
        description: `Your mother just called. She's in the hospital.

"My son, they say I need operation. ₦800,000. 
Your father is not working. Your siblings are still in school.

You are the one that 'made it.' You are my only hope."

She coughs weakly into the phone. Your heart breaks.`,
        conditions: [],
        choices: [
            {
                id: 'mama_full',
                label: '💳 Send the full ₦800,000',
                resultText: 'Mama\'s surgery was successful. "God bless you my son. You will never lack."',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 800000 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 500 },
                    { type: 'stat', stat: 'stress', operation: 'subtract', value: 300 }
                ]
            },
            {
                id: 'mama_half',
                label: '💰 Send half (₦400K) and pray',
                resultText: 'The hospital accepted a payment plan. Mama is stable.',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 400000 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 200 }
                ]
            },
            {
                id: 'mama_fundraise',
                label: '📢 Ask church to contribute',
                resultText: 'Church raised ₦1.2M! Mama treated at best hospital. But some whisper you exploited them.',
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 300 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 150 }
                ]
            },
            {
                id: 'mama_delay',
                label: '😔 "I don\'t have it right now"',
                resultText: 'Mama\'s condition worsened. The family will never forget this.',
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'subtract', value: 500 },
                    { type: 'stat', stat: 'stress', operation: 'add', value: 800 }
                ]
            }
        ],
        isPermanent: true,
        priority: 10,
        oneTime: true,
        category: 'crisis'
    },
    {
        id: 'PAPA_LAND_DISPUTE',
        title: '⚖️ Papa\'s Land Problem',
        description: `Your father called, voice shaking with anger.

"Those Umuezes are trying to take our family land! The one your grandfather cleared!
The court case needs ₦2,000,000 for lawyers. And some 'motivation' for the judge.

If we lose this land, we have nothing. Our ancestors will curse us!"

Village honor is at stake.`,
        conditions: [
            { type: 'stat', stat: 'personalCash', operator: 'gte', value: 500000 }
        ],
        choices: [
            {
                id: 'land_fund',
                label: '💳 Fund the full case (₦2M+)',
                resultText: 'The case was won! Your family is heroes in the village.',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 2500000 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 800 },
                    { type: 'stat', stat: 'influence', operation: 'add', value: 500 }
                ]
            },
            {
                id: 'land_partial',
                label: '💰 Contribute what you can (₦500K)',
                resultText: 'Combined with other contributions, the case continues. Outcome uncertain.',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 500000 },
                    { type: 'stat', stat: 'stress', operation: 'add', value: 300 }
                ]
            },
            {
                id: 'land_settle',
                label: '🤝 Negotiate with the Umuezes',
                resultText: 'You brokered peace. Land was split. Some respect you, others see you as weak.',
                effects: [
                    { type: 'stat', stat: 'influence', operation: 'add', value: 300 },
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 200 }
                ]
            }
        ],
        isPermanent: true,
        priority: 7,
        oneTime: true,
        category: 'crisis'
    },
    {
        id: 'SIBLING_SCHOOL_FEES',
        title: '📚 Sibling Needs School Fees',
        description: `Your younger brother Emeka is about to be sent home.

"Bros, they said if I don't pay ₦650,000 by Friday, they will withdraw me.
I'm in my final year! WAEC is next month!

Please, I beg you in God's name. I will pay you back."

You know he won't pay you back. But he's your blood.`,
        conditions: [],
        choices: [
            {
                id: 'fees_pay',
                label: '💳 Pay the full fees',
                resultText: 'Emeka graduated with 7 A1s. "Thank you bros, I will make you proud!"',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 650000 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 200 }
                ]
            },
            {
                id: 'fees_half',
                label: '💰 Give him half',
                resultText: 'School accepted. Emeka is on probation but still in.',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 325000 }
                ]
            },
            {
                id: 'fees_scholarship',
                label: '📝 Help him apply for scholarship',
                resultText: 'He got a church scholarship! Now he owes the church, not you.',
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'subtract', value: 650000 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 100 }
                ]
            },
            {
                id: 'fees_refuse',
                label: '❌ "I don\'t have money"',
                resultText: 'Emeka dropped out. He now sells groundnut. The family blames you.',
                effects: [
                    { type: 'stat', stat: 'stress', operation: 'add', value: 600 },
                    { type: 'stat', stat: 'anointing', operation: 'subtract', value: 300 }
                ]
            }
        ],
        isPermanent: false,
        priority: 6,
        oneTime: false,
        category: 'random'
    }
];

// ============================================================================
// MARRIAGE PRESSURE EVENTS
// ============================================================================

export const marriagePressureEvents: GameEvent[] = [
    {
        id: 'UNCLE_WHEN_MARRY',
        title: '💍 "When Will You Marry?"',
        description: `Christmas dinner. Uncle Chidi corners you.

"Ehn, pastor! You are now 30. All your mates have 3 children already!
A man of God without a wife? How can you counsel married people?

That fine Sister Grace, she's still waiting for you o. Her mother is asking."

The whole family is listening. Aunty Nkechi is already planning the wedding.`,
        conditions: [
            { type: 'stat', stat: 'fame', operator: 'gte', value: 2000 }
        ],
        choices: [
            {
                id: 'marry_promise',
                label: '💍 "God is working on it..."',
                resultText: 'They gave you 6 more months. The clock is ticking.',
                effects: [
                    { type: 'stat', stat: 'stress', operation: 'add', value: 400 }
                ]
            },
            {
                id: 'marry_focus',
                label: '⛪ "I\'m focused on ministry first"',
                resultText: '"Shebi Paul was also single... okay o." Disapproval hangs in the air.',
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 100 },
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 100 }
                ]
            },
            {
                id: 'marry_confront',
                label: '😤 "My life, my decision!"',
                resultText: 'Aunty Nkechi gasped. "This boy has changed!" Family drama incoming.',
                effects: [
                    { type: 'stat', stat: 'stress', operation: 'subtract', value: 200 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 100 }
                ]
            }
        ],
        isPermanent: false,
        priority: 4,
        oneTime: false,
        category: 'random'
    },
    {
        id: 'MAMA_GRANDCHILDREN',
        title: '👶 "I Want to Carry Grandchildren!"',
        description: `Your mother called you at midnight.

"My son, I had a dream. I was carrying a baby... YOUR baby.
I am not getting younger. Before I die, let me see my grandchildren.

Why are you keeping that Sister Blessing waiting? She's 28 already!
In my time, I had you at 19. What is stopping you?"

She's crying now.`,
        conditions: [],
        choices: [
            {
                id: 'grand_soon',
                label: '💕 "Mama, very soon..."',
                resultText: 'She calmed down. But the pressure isn\'t going anywhere.',
                effects: [
                    { type: 'stat', stat: 'stress', operation: 'add', value: 300 }
                ]
            },
            {
                id: 'grand_private',
                label: '🔒 "I\'ll handle it in my own time"',
                resultText: '"Oya na. But don\'t wait until I\'m in the grave o!"',
                effects: [
                    { type: 'stat', stat: 'stress', operation: 'add', value: 200 }
                ]
            },
            {
                id: 'grand_pray',
                label: '🙏 "Let\'s pray about it together"',
                resultText: 'You prayed for 30 minutes. She felt better. You didn\'t.',
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 50 },
                    { type: 'stat', stat: 'stress', operation: 'add', value: 200 }
                ]
            }
        ],
        isPermanent: false,
        priority: 4,
        oneTime: false,
        category: 'random'
    }
];

// ============================================================================
// EXTENDED FAMILY DRAMA EVENTS
// ============================================================================

export const extendedFamilyEvents: GameEvent[] = [
    {
        id: 'VILLAGE_MEETING',
        title: '🏘️ Village Meeting About You',
        description: `News reached you: The village elders are meeting about YOU.

"That boy, he's now a big pastor but has not contributed to community development.
His mates are building boreholes, but he only builds churches.

If he doesn't bring something by Independence Day, we will invoke the ancestors."

This is serious. The village can make your life very difficult.`,
        conditions: [
            { type: 'stat', stat: 'fame', operator: 'gte', value: 5000 }
        ],
        choices: [
            {
                id: 'village_borehole',
                label: '💧 Build a borehole (₦3M)',
                resultText: 'The village now has clean water. You are celebrated as a true son of the soil!',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 3000000 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 1000 },
                    { type: 'stat', stat: 'influence', operation: 'add', value: 800 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 300 }
                ]
            },
            {
                id: 'village_fund',
                label: '💰 Donate ₦1M to community fund',
                resultText: 'Elders are satisfied for now. But they\'ll be back.',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 1000000 },
                    { type: 'stat', stat: 'influence', operation: 'add', value: 300 }
                ]
            },
            {
                id: 'village_challenge',
                label: '⚡ "Those traditions are outdated!"',
                resultText: 'The elders cursed you publicly. Strange things start happening...',
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'subtract', value: 500 },
                    { type: 'stat', stat: 'stress', operation: 'add', value: 700 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 300 }
                ]
            }
        ],
        isPermanent: true,
        priority: 8,
        oneTime: true,
        category: 'crisis'
    },
    {
        id: 'COUSIN_VISA',
        title: '✈️ Cousin Wants Visa Sponsorship',
        description: `Cousin Obinna just showed up at your church office.

"Bros, I need to japa o. This country is finished.
Canada immigration needs proof of funds - ₦10,000,000 in my account.

You don't have to give me the money. Just let it stay there for 3 months for the embassy to see.
I swear to God, I won't touch it!"

He's always been... creative with money.`,
        conditions: [
            { type: 'stat', stat: 'personalCash', operator: 'gte', value: 10000000 }
        ],
        choices: [
            {
                id: 'visa_help',
                label: "✅ Let's do it properly",
                resultText: 'Obinna got his visa. He made it to Canada. The family celebrates you.',
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 300 }
                ]
            },
            {
                id: 'visa_refuse',
                label: '❌ "I can\'t risk my ministry"',
                resultText: 'Obinna was angry. He told the village you\'re stingy. Mixed reactions.',
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 200 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 100 }
                ]
            },
            {
                id: 'visa_alternative',
                label: '🎓 Help him get a scholarship instead',
                resultText: 'You connected him with a church program. He went to Ghana for Bible school.',
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 200 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 100 }
                ]
            }
        ],
        isPermanent: false,
        priority: 5,
        oneTime: true,
        category: 'random'
    }
];

// ============================================================================
// EXPORT ALL FAMILY EVENTS
// ============================================================================

export const familyEvents: GameEvent[] = [
    ...familyMoneyEvents,
    ...marriagePressureEvents,
    ...extendedFamilyEvents,
];

export default familyEvents;
