/**
 * Nigerian Daily Life Events
 * 
 * These events capture the authentic Nigerian daily experience:
 * - NEPA/Power issues
 * - Traffic/Transportation
 * - Fuel scarcity
 * - Bank wahala
 * - Network issues
 * 
 * Cultural Authenticity: These are the struggles every Nigerian knows!
 */

import type { GameEvent } from '@/types/game';

// ============================================================================
// NEPA / POWER EVENTS
// ============================================================================

export const nepaEvents: GameEvent[] = [
    {
        id: 'NEPA_MID_SERVICE',
        title: '💡 NEPA Struck Again!',
        description: `Right in the middle of your "Fire! Fire!" moment, the power cuts out.
        
300 people in the dark. Generator fuel finished last week. 
The children are crying. Adults are fanning themselves in the heat.

"Is this attack of the enemy or just normal NEPA?" your assistant whispers.`,
        conditions: [
            { type: 'stat', stat: 'energy', operator: 'gte', value: 200 }
        ],
        choices: [
            {
                id: 'nepa_pray',
                label: '🙏 "Let us pray for PHCN!"',
                resultText: 'You turned the blackout into a spiritual moment. Some members are impressed by your composure.',
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 100 },
                    { type: 'members', operation: 'add', value: 5 }
                ]
            },
            {
                id: 'nepa_dismiss',
                label: '🏃 End service early',
                resultText: 'Members left sweating and disappointed. Some may not come back.',
                effects: [
                    { type: 'members', operation: 'subtract', value: 10 },
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 100 }
                ]
            },
            {
                id: 'nepa_buy_fuel',
                label: '⛽ Send someone for fuel (₦15,000)',
                resultText: 'Service resumed after 40 minutes. Professional move!',
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'subtract', value: 15000 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 50 }
                ]
            }
        ],
        isPermanent: false,
        priority: 6,
        oneTime: false,
        category: 'random'
    },
    {
        id: 'NEPA_CRAZY_BILL',
        title: '⚡ Crazy Light Bill',
        description: `IKEDC has sent a bill: ₦500,000 for this month.

"But we only had light for 3 days!" your accountant protests.

The meter reader shrugs: "Na estimated billing. Pay or we disconnect."

Your church members are watching how you handle this.`,
        conditions: [
            { type: 'stat', stat: 'churchCash', operator: 'gte', value: 100000 }
        ],
        choices: [
            {
                id: 'bill_pay',
                label: '💳 Pay the full bill',
                resultText: 'You paid ₦500K for 3 days of light. The system wins again.',
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'subtract', value: 500000 },
                    { type: 'stat', stat: 'stress', operation: 'add', value: 300 }
                ]
            },
            {
                id: 'bill_negotiate',
                label: '🤝 Negotiate (involves "settlement")',
                resultText: 'After "settling" the right people with ₦50K, the bill dropped to ₦80K. This is Nigeria.',
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'subtract', value: 130000 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 100 }
                ]
            },
            {
                id: 'bill_reject',
                label: '❌ Refuse to pay - go solar',
                resultText: 'You invested ₦2M in solar. No more NEPA wahala!',
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'subtract', value: 2000000 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 200 }
                ]
            }
        ],
        isPermanent: false,
        priority: 5,
        oneTime: false,
        category: 'random'
    },
    {
        id: 'TRANSFORMER_BURNT',
        title: '🔥 Transformer Exploded',
        description: `The community transformer exploded last night.

IKEDC says replacement will take "3-6 months" (Nigerian time = 1-2 years).

Your church needs power for services. Generator will cost ₦800K/month to run consistently.

Members are already talking about relocating to churches with better facilities.`,
        conditions: [
            { type: 'stat', stat: 'fame', operator: 'gte', value: 1000 }
        ],
        choices: [
            {
                id: 'transform_gen',
                label: '⛽ Buy industrial generator (₦3M)',
                resultText: 'You now have power independence. Fame boosted!',
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'subtract', value: 3000000 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 500 },
                    { type: 'members', operation: 'add', value: 50 }
                ]
            },
            {
                id: 'transform_community',
                label: '🤝 Rally community to contribute',
                resultText: 'You raised ₦5M from members and community. Leadership skills on display!',
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 1000 },
                    { type: 'stat', stat: 'influence', operation: 'add', value: 500 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 200 }
                ]
            },
            {
                id: 'transform_wait',
                label: '⏰ Wait for PHCN to fix it',
                resultText: '6 months later... still waiting. You lost 40% of members.',
                effects: [
                    { type: 'members', operation: 'multiply', value: 0.6 },
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 500 }
                ]
            }
        ],
        isPermanent: true,
        priority: 8,
        oneTime: true,
        category: 'crisis'
    }
];

// ============================================================================
// TRAFFIC / TRANSPORTATION EVENTS
// ============================================================================

export const trafficEvents: GameEvent[] = [
    {
        id: 'LAGOS_HOLDUP',
        title: '🚗 Lagos Traffic Madness',
        description: `You're stuck in Lekki traffic. Your crusade starts in 30 minutes.

The driver says: "Pastor, we don dey here 2 hours already. Na one accident cause am."

You can see your church billboard from here. So close, yet so far.

10,000 people are waiting for you.`,
        conditions: [
            { type: 'stat', stat: 'fame', operator: 'gte', value: 3000 }
        ],
        choices: [
            {
                id: 'traffic_okada',
                label: '🏍️ Take okada (risky but fast)',
                resultText: 'You arrived sweating and dusty, but you made it! The crowd went wild.',
                effects: [
                    { type: 'stat', stat: 'health', operation: 'subtract', value: 200 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 300 }
                ]
            },
            {
                id: 'traffic_wait',
                label: '⏰ Wait in traffic',
                resultText: 'You arrived 2 hours late. Half the crowd left. Disaster.',
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 500 },
                    { type: 'members', operation: 'subtract', value: 100 }
                ]
            },
            {
                id: 'traffic_live',
                label: '📱 Go Live from the car!',
                resultText: 'Your traffic sermon went viral! "Daddy G.O. preaches from go-slow" trending.',
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 800 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 100 }
                ]
            }
        ],
        isPermanent: false,
        priority: 7,
        oneTime: false,
        category: 'random'
    },
    {
        id: 'DANFO_BREAKDOWN',
        title: '🚌 Danfo Wahala',
        description: `The church bus broke down on Third Mainland Bridge.

45 church members are stranded. Some are elderly. The sun is brutal.

LASTMA is threatening to tow the bus. Mechanics are quoting ₦500K.

"Pastor, wetin we go do?" the driver calls you.`,
        conditions: [],
        choices: [
            {
                id: 'danfo_fix',
                label: '🔧 Pay for repairs (₦500K)',
                resultText: 'Bus fixed. Members grateful. Leadership demonstrated.',
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'subtract', value: 500000 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 200 },
                    { type: 'members', operation: 'add', value: 10 }
                ]
            },
            {
                id: 'danfo_rescue',
                label: '🚕 Send cars to rescue them',
                resultText: 'You mobilized 15 private cars to rescue everyone. Hero moment!',
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'subtract', value: 100000 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 500 }
                ]
            },
            {
                id: 'danfo_ignore',
                label: '😅 "Let them pray and trust God"',
                resultText: 'Members spent 6 hours on the bridge. They\'re not coming back.',
                effects: [
                    { type: 'members', operation: 'subtract', value: 40 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 300 }
                ]
            }
        ],
        isPermanent: false,
        priority: 6,
        oneTime: false,
        category: 'crisis'
    }
];

// ============================================================================
// FUEL SCARCITY EVENTS  
// ============================================================================

export const fuelEvents: GameEvent[] = [
    {
        id: 'FUEL_SCARCITY_CRISIS',
        title: '⛽ Fuel Scarcity!!!',
        description: `Fuel is now ₦1,500 per liter. Queues at stations are 6+ hours.

Your generator needs 100 liters per week for church activities.
Your personal car needs 50 liters.
Church buses need 200 liters.

Black market sellers are offering ₦2,000/liter. "Quality guaranteed, pastor!"`,
        conditions: [],
        choices: [
            {
                id: 'fuel_queue',
                label: '⏰ Join the queue like everyone',
                resultText: 'After 8 hours in queue, you got fuel at ₦1,500/liter. Your time wasted.',
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'subtract', value: 525000 },
                    { type: 'stat', stat: 'energy', operation: 'subtract', value: 400 },
                    { type: 'stat', stat: 'stress', operation: 'add', value: 500 }
                ]
            },
            {
                id: 'fuel_black_market',
                label: '💰 Buy from black market',
                resultText: 'You got adulterated fuel. Generator damaged. ₦800K repair bill.',
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'subtract', value: 1500000 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 50 }
                ]
            },
            {
                id: 'fuel_connections',
                label: '📞 Call your "connections"',
                resultText: 'A senator friend sent you 500 liters. The power of influence!',
                effects: [
                    { type: 'stat', stat: 'influence', operation: 'add', value: 200 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 100 }
                ],
                requirements: [
                    { type: 'stat', stat: 'influence', operator: 'gte', value: 500 }
                ]
            }
        ],
        isPermanent: false,
        priority: 7,
        oneTime: false,
        category: 'crisis'
    }
];

// ============================================================================
// BANK WAHALA EVENTS
// ============================================================================

export const bankEvents: GameEvent[] = [
    {
        id: 'BANK_HIDDEN_CHARGES',
        title: '🏦 Bank Wahala',
        description: `Your bank statement arrived. Hidden charges:
        
- SMS Alert: ₦4 per SMS × 200 = ₦800
- Stamp Duty: ₦50 × 300 = ₦15,000
- VAT on something: ₦8,500
- "Maintenance fee": ₦5,000
- Card issuance: ₦1,500

Total deducted: ₦30,800

"For wetin?" your accountant asks. Nobody knows.`,
        conditions: [],
        choices: [
            {
                id: 'bank_accept',
                label: '😔 Accept it (move on)',
                resultText: 'Another month, another bank robbery (legal version).',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 30800 },
                    { type: 'stat', stat: 'stress', operation: 'add', value: 100 }
                ]
            },
            {
                id: 'bank_complain',
                label: '📞 Call customer service',
                resultText: '2 hours on hold. "Your call is important to us." Nothing resolved.',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 30800 },
                    { type: 'stat', stat: 'energy', operation: 'subtract', value: 200 },
                    { type: 'stat', stat: 'stress', operation: 'add', value: 300 }
                ]
            },
            {
                id: 'bank_switch',
                label: '🏃 Switch to another bank',
                resultText: 'New bank, same wahala. But at least you made a statement.',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 30800 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 50 }
                ]
            }
        ],
        isPermanent: false,
        priority: 3,
        oneTime: false,
        category: 'random'
    },
    {
        id: 'ATM_EMPTY',
        title: '🏧 All ATMs Empty',
        description: `It's Saturday. Crusade offering needs transport to the bank.
        
All 7 ATMs in your area: "TEMPORARILY UNABLE TO DISPENSE CASH"

You have ₦5M in offering cash that needs to be deposited.
Armed robbers have been targeting churches lately.

The bank won't open until Monday.`,
        conditions: [
            { type: 'stat', stat: 'churchCash', operator: 'gte', value: 1000000 }
        ],
        choices: [
            {
                id: 'atm_secure',
                label: '🔒 Rent police escort + safe (₦100K)',
                resultText: 'Money secured until Monday. Professional move.',
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'subtract', value: 100000 }
                ]
            },
            {
                id: 'atm_home',
                label: '🏠 Keep it at your house',
                resultText: 'You barely slept. Money safe. Stress through the roof.',
                effects: [
                    { type: 'stat', stat: 'health', operation: 'subtract', value: 300 },
                    { type: 'stat', stat: 'stress', operation: 'add', value: 500 }
                ]
            },
            {
                id: 'atm_member',
                label: '🙏 Trust a senior member to keep it',
                resultText: 'They ran with ₦2M. Never trust anyone!',
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'subtract', value: 2000000 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 200 }
                ]
            }
        ],
        isPermanent: false,
        priority: 6,
        oneTime: false,
        category: 'crisis'
    },
    {
        id: 'TRANSFER_FAILED',
        title: '💸 Transfer Failed - Money Vanished',
        description: `You transferred ₦500,000 from church account to pay workers.

"Transaction successful" your phone said.

But the money never arrived. Your bank says "debited successfully."
Their bank says "no credit received."

Workers are angry. Some haven't eaten in 3 days.`,
        conditions: [
            { type: 'stat', stat: 'churchCash', operator: 'gte', value: 500000 }
        ],
        choices: [
            {
                id: 'transfer_trace',
                label: '📋 Lodge official complaint',
                resultText: 'After 2 weeks and 47 phone calls, money was reversed. Victory!',
                effects: [
                    { type: 'stat', stat: 'energy', operation: 'subtract', value: 300 },
                    { type: 'stat', stat: 'stress', operation: 'add', value: 400 }
                ]
            },
            {
                id: 'transfer_repay',
                label: '💳 Pay workers from personal cash',
                resultText: 'Workers paid. You\'ll sort the bank issue later. Leader!',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 500000 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 300 }
                ]
            },
            {
                id: 'transfer_delay',
                label: '⏰ Tell workers to wait',
                resultText: 'Two workers quit. The rest are resentful.',
                effects: [
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 200 },
                    { type: 'members', operation: 'subtract', value: 5 }
                ]
            }
        ],
        isPermanent: false,
        priority: 6,
        oneTime: false,
        category: 'crisis'
    }
];

// ============================================================================
// EXPORT ALL NIGERIAN LIFE EVENTS
// ============================================================================

export const nigerianLifeEvents: GameEvent[] = [
    ...nepaEvents,
    ...trafficEvents,
    ...fuelEvents,
    ...bankEvents,
];

export default nigerianLifeEvents;
