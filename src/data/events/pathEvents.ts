import { GameEvent } from '@/types/game';

export const pathEvents: GameEvent[] = [
    // VILLAGE EVENTS
    {
        id: 'village_rainstorm',
        title: 'Tropical Rainstorm',
        description: 'A heavy downpour has battered the village. Your humble venue is leaking, and sound equipment is at risk.',
        category: 'random',
        priority: 5,
        oneTime: false,
        isPermanent: false,
        conditions: [
            { type: 'location', location: 'Village' }
        ],
        choices: [
            {
                id: 'repair',
                label: 'Emergency Repairs (₦50,000)',
                resultText: 'You fixed the roof. The equipment is safe, but your wallet hurts.',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 50000 }
                ]
            },
            {
                id: 'ignore',
                label: 'Pray it Stops',
                resultText: 'The rain stopped, but some speakers are damaged. The service quality dropped.',
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 5 },
                    { type: 'stat', stat: 'anointing', operation: 'subtract', value: 5 }
                ]
            }
        ]
    },
    {
        id: 'village_feud',
        title: 'Community Dispute',
        description: 'Two local families are fighting over land boundaries. They want you to mediate.',
        category: 'random',
        priority: 5,
        oneTime: false,
        isPermanent: false,
        conditions: [
            { type: 'location', location: 'Village' }
        ],
        choices: [
            {
                id: 'mediate',
                label: 'Mediate with Wisdom',
                resultText: 'You successfully brokered peace. The community respects you more.',
                requirements: [{ type: 'stat', stat: 'anointing', operator: 'gte', value: 30 }],
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 10 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 5 }
                ]
            },
            {
                id: 'stay_out',
                label: 'Stay Neutral',
                resultText: 'You stayed out of it. The fighting continues, and people think you are cowardly.',
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 5 }
                ]
            }
        ]
    },

    // CITY EVENTS
    {
        id: 'city_tax',
        title: 'LIRS Tax Demand',
        description: 'The Lagos State Internal Revenue Service has sent a "demand notice" for personal income tax. They claim you owe ₦500,000.',
        category: 'random',
        priority: 6,
        oneTime: false,
        isPermanent: false,
        conditions: [
            { type: 'location', location: 'City' }
        ],
        choices: [
            {
                id: 'pay',
                label: 'Pay Full Amount (₦500k)',
                resultText: 'You paid. It hurts, but you are compliant. "Give unto Caesar..."',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 500000 },
                    { type: 'flag', flag: 'integrity', value: true }
                ]
            },
            {
                id: 'bribe',
                label: 'Settle "Off Record" (₦100k)',
                resultText: 'You "sorted" the agents. They left smiling, but your conscience is heavy.',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 100000 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 10 },
                    { type: 'flag', flag: 'integrity', value: false }
                ]
            }
        ]
    },
    {
        id: 'city_collab',
        title: 'Mega-Church Invite',
        description: 'A famous Bishop in the city wants you to speak at his "Youth Fire" conference. It is a huge opportunity.',
        category: 'random',
        priority: 7,
        oneTime: true,
        isPermanent: false,
        conditions: [
            { type: 'location', location: 'City' },
            { type: 'stat', stat: 'fame', operator: 'gte', value: 50 }
        ],
        choices: [
            {
                id: 'accept',
                label: 'Accept & Prepare',
                resultText: 'You preached up a storm! Your popularity has exploded in the city.',
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 15 },
                    { type: 'stat', stat: 'personalCash', operation: 'add', value: 200000 }
                ]
            },
            {
                id: 'decline',
                label: 'Decline (Focus on Home)',
                resultText: 'You focused on your own flock. They appreciate your dedication.',
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 5 }
                ]
            }
        ]
    }
];
