/**
 * University Phase Events
 * 
 * Deep university life simulation covering:
 * - Academic challenges (exams, lecturers, carryovers)
 * - Fellowship drama (choir politics, leadership, night vigils)
 * - Social life (roommates, relationships, peer pressure)
 * - Cult pressure (recruitment, intimidation, protection)
 * - Survival (food, power, money, health)
 */

import type { GameEvent } from '@/types/game';

// ============================================================================
// ACADEMIC EVENTS
// ============================================================================

export const academicEvents: GameEvent[] = [
    {
        id: 'EXAM_HELL_WEEK',
        title: '📚 Exam Hell Week',
        description: `Exam week is here. You have 5 courses to write in 3 days.

But you spent the whole semester preaching at bus stops instead of studying.
Your textbooks are still wrapped in nylon. CHM 201 is tomorrow.

Your roommate offers you "WAEC runs" for ₦20,000.
"Just the answers. Nobody will know."`,
        conditions: [
            { type: 'era', era: 'University' }
        ],
        choices: [
            {
                id: 'exam_cheat',
                label: '📝 Buy the runs',
                resultText: 'You passed with B+. But integrity took a hit. And someone saw you...',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 20000 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 200 },
                    { type: 'flag', flag: 'integrity', value: false }
                ]
            },
            {
                id: 'exam_cram',
                label: '📖 All-night reading marathon',
                resultText: 'You crammed 4 months of work in 12 hours. Got a C. Survived!',
                effects: [
                    { type: 'stat', stat: 'health', operation: 'subtract', value: 500 },
                    { type: 'stat', stat: 'stress', operation: 'add', value: 800 }
                ]
            },
            {
                id: 'exam_faith',
                label: '🙏 Pray and trust God',
                resultText: 'You wrote what you knew. Carryover in CHM 201. But your conscience is clear.',
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 200 },
                    { type: 'stat', stat: 'stress', operation: 'add', value: 400 }
                ]
            }
        ],
        isPermanent: false,
        priority: 8,
        oneTime: false,
        category: 'crisis'
    },
    {
        id: 'LECTURER_BRIBE',
        title: '👨‍🏫 Sorting the Lecturer',
        description: `Dr. Okonkwo failed you. 38 marks. You needed 40 to pass.

He called you to his office.
"Young man, you're a known preacher. Your mates are doing better. 
This 38... it can become 58. But you know what you need to do."

He slides a paper across: ₦50,000.

If you fail this course, you carry it over. Graduation delays by 1 year.`,
        conditions: [
            { type: 'era', era: 'University' },
            { type: 'stat', stat: 'personalCash', operator: 'gte', value: 30000 }
        ],
        choices: [
            {
                id: 'sort_pay',
                label: '💰 Pay the ₦50,000',
                resultText: 'You passed. But every time you preach about integrity, you remember.',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 50000 },
                    { type: 'stat', stat: 'anointing', operation: 'subtract', value: 300 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 100 }
                ]
            },
            {
                id: 'sort_refuse',
                label: '❌ Refuse and report him',
                resultText: 'The faculty sided with him. You got an extra year. But you stood for truth.',
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 500 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 300 }
                ]
            },
            {
                id: 'sort_negotiate',
                label: '🤝 Negotiate: ₦20,000 + special prayer',
                resultText: 'He accepted. You prayed for him. He felt blessed. Everyone wins?',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 20000 },
                    { type: 'stat', stat: 'anointing', operation: 'subtract', value: 100 }
                ]
            }
        ],
        isPermanent: true,
        priority: 7,
        oneTime: true,
        category: 'crisis'
    },
    {
        id: 'PROJECT_DEFENSE',
        title: '🎓 Final Year Project Defense',
        description: `Your project defense is today. Topic: "The Role of Faith in Academic Success"

The external examiner is Professor Adeyemi - a known atheist.
Your supervisor warned you: "He eats religious students for breakfast."

He's looking at your laptop. Frowning.
"So you're saying prayer affects grades? Where's your scientific evidence?"`,
        conditions: [
            { type: 'era', era: 'University' },
            { type: 'stat', stat: 'fame', operator: 'gte', value: 1000 }
        ],
        choices: [
            {
                id: 'defense_academic',
                label: '📊 Defend with data and logic',
                resultText: 'Your statistical analysis was solid. He gave you 68. Respectable!',
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 200 }
                ]
            },
            {
                id: 'defense_spiritual',
                label: '✝️ Start preaching about faith',
                resultText: 'He walked out. You got 45. Barely passed. The department is talking.',
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 300 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 200 }
                ]
            },
            {
                id: 'defense_charm',
                label: '😊 Use your charisma',
                resultText: 'You made him laugh. He respected your confidence. 72 marks!',
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 400 }
                ]
            }
        ],
        isPermanent: true,
        priority: 8,
        oneTime: true,
        category: 'story'
    }
];

// ============================================================================
// FELLOWSHIP DRAMA EVENTS
// ============================================================================

export const fellowshipEvents: GameEvent[] = [
    {
        id: 'FELLOWSHIP_ELECTION',
        title: '🗳️ Fellowship President Election',
        description: `The NIFES fellowship is electing a new president. You've been nominated.

Your opponent is Brother Chijioke - a 400L student with more experience.
The choir members support you. The Bible study group supports him.

It's 50-50. Some are suggesting you "mobilize" your supporters with "refreshments."`,
        conditions: [
            { type: 'era', era: 'University' }
        ],
        choices: [
            {
                id: 'election_fair',
                label: '✓ Run a clean campaign',
                resultText: 'You lost by 3 votes. But you maintained your integrity. Chijioke respects you now.',
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 300 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 100 }
                ]
            },
            {
                id: 'election_mobilize',
                label: '🍕 Spend ₦15,000 on "refreshments"',
                resultText: 'You won! Now you lead 200 members. But some call it "stomach infrastructure."',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 15000 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 500 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 100 },
                    { type: 'members', operation: 'add', value: 50 }
                ]
            },
            {
                id: 'election_withdraw',
                label: '🕊️ Withdraw and endorse Chijioke',
                resultText: '"This man is humble!" They made you Vice President. Best of both worlds.',
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 200 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 300 },
                    { type: 'members', operation: 'add', value: 30 }
                ]
            }
        ],
        isPermanent: true,
        priority: 7,
        oneTime: true,
        category: 'story'
    },
    {
        id: 'NIGHT_VIGIL_INCIDENT',
        title: '🌙 Night Vigil Gone Wrong',
        description: `Your fellowship night vigil is happening. 80 students in the lecture hall.

At 2 AM, campus security arrived.
"You people don't have permit! DSA will hear about this!"

They're threatening to arrest you. Some students are panicking.
The security man is eyeing your "appreciation" possibilities.`,
        conditions: [
            { type: 'era', era: 'University' }
        ],
        choices: [
            {
                id: 'vigil_bribe',
                label: '💵 "Settle" them (₦10,000)',
                resultText: 'They left. Vigil continued. But the precedent is set.',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 10000 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 50 }
                ]
            },
            {
                id: 'vigil_comply',
                label: '📋 Show them your (forged) permit',
                resultText: 'Risky! But it worked. They didn\'t check properly.',
                effects: [
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 150 }
                ]
            },
            {
                id: 'vigil_end',
                label: '🙏 End the vigil peacefully',
                resultText: 'Members were disappointed. "So security is stronger than God?" Awkward.',
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 200 },
                    { type: 'members', operation: 'subtract', value: 10 }
                ]
            },
            {
                id: 'vigil_pray',
                label: '⚡ "LET US PRAYYYY!" louder',
                resultText: 'The security man felt "the power" and ran. Legend status achieved!',
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 500 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 300 },
                    { type: 'members', operation: 'add', value: 20 }
                ],
                requirements: [
                    { type: 'stat', stat: 'anointing', operator: 'gte', value: 3000 }
                ]
            }
        ],
        isPermanent: false,
        priority: 6,
        oneTime: false,
        category: 'random'
    },
    {
        id: 'CHOIR_DRAMA',
        title: '🎵 Choir Leadership Wahala',
        description: `The choir leader Sister Adaeze and worship leader Brother Tunde are fighting.

"He changed the song list without telling me!"
"She's always controlling everything!"

The choir is splitting into factions. Sunday service is tomorrow.
Both are threatening to resign.`,
        conditions: [],
        choices: [
            {
                id: 'choir_adaeze',
                label: '👩 Side with Sister Adaeze',
                resultText: 'Tunde left with 5 singers. But Adaeze is loyal to you now.',
                effects: [
                    { type: 'members', operation: 'subtract', value: 5 },
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 100 }
                ]
            },
            {
                id: 'choir_tunde',
                label: '👨 Side with Brother Tunde',
                resultText: 'Adaeze left with 8 singers. Tunde is grateful.',
                effects: [
                    { type: 'members', operation: 'subtract', value: 8 },
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 150 }
                ]
            },
            {
                id: 'choir_mediate',
                label: '🤝 Mediate and reconcile',
                resultText: 'After 3 hours of "counseling," they hugged. Crisis averted!',
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 200 },
                    { type: 'stat', stat: 'stress', operation: 'add', value: 300 }
                ]
            }
        ],
        isPermanent: false,
        priority: 5,
        oneTime: false,
        category: 'random'
    }
];

// ============================================================================
// CULT PRESSURE EVENTS
// ============================================================================

export const cultEvents: GameEvent[] = [
    {
        id: 'CULT_RECRUITMENT',
        title: '💀 The Confraternity Approach',
        description: `You were walking back to your hostel at 9 PM.

Three figures stepped out of the shadows.
"Omo pastor, we've been watching you. You have... influence.
Black Axe needs a chaplain. Join us, and nobody touches your fellowship.
Refuse, and... well, campus can be dangerous at night."

The leader smiled. His scar glinted in the moonlight.`,
        conditions: [
            { type: 'era', era: 'University' },
            { type: 'stat', stat: 'fame', operator: 'gte', value: 2000 }
        ],
        choices: [
            {
                id: 'cult_join',
                label: '💀 Accept their "protection"',
                resultText: 'You\'re now connected. Your members are safe. But your soul? That\'s another matter.',
                effects: [
                    { type: 'stat', stat: 'influence', operation: 'add', value: 1000 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 500 },
                    { type: 'stat', stat: 'anointing', operation: 'subtract', value: 1000 },
                    { type: 'flag', flag: 'yahooPath', value: true }
                ]
            },
            {
                id: 'cult_refuse_bravely',
                label: '✝️ "The blood of Jesus protects me!"',
                resultText: 'They laughed. But something in your eyes made them pause. "We\'ll see," they said.',
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 500 },
                    { type: 'stat', stat: 'stress', operation: 'add', value: 800 }
                ]
            },
            {
                id: 'cult_negotiate',
                label: '🤝 "Pray with me instead"',
                resultText: 'Shockingly, the leader agreed. You prayed for 10 minutes. He left confused.',
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 800 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 300 }
                ],
                requirements: [
                    { type: 'stat', stat: 'anointing', operator: 'gte', value: 4000 }
                ]
            }
        ],
        isPermanent: true,
        priority: 10,
        oneTime: true,
        category: 'crisis'
    },
    {
        id: 'CULT_INTIMIDATION',
        title: '⚠️ Anonymous Warning',
        description: `You found a note under your hostel door:

"STOP YOUR NIGHT VIGILS IN OBI HALL.
WE CONTROL THIS CAMPUS. NOT YOUR GOD.
FINAL WARNING."

A small axe symbol was drawn at the bottom.

Your roommate is terrified. Some fellowship members want to relocate.`,
        conditions: [
            { type: 'era', era: 'University' },
            { type: 'stat', stat: 'fame', operator: 'gte', value: 1500 }
        ],
        choices: [
            {
                id: 'threat_comply',
                label: '📍 Move vigils to another location',
                resultText: 'Vigils now happen in the chapel. Fewer attendees, but safer.',
                effects: [
                    { type: 'members', operation: 'subtract', value: 15 },
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 200 }
                ]
            },
            {
                id: 'threat_defy',
                label: '⚡ Announce louder vigils in Obi Hall',
                resultText: 'Nothing happened! They were bluffing. Your boldness attracted 30 new members.',
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 600 },
                    { type: 'members', operation: 'add', value: 30 },
                    { type: 'stat', stat: 'stress', operation: 'add', value: 500 }
                ]
            },
            {
                id: 'threat_report',
                label: '🚔 Report to campus security',
                resultText: 'Security is complicit. They "lost" your report. Welcome to Nigeria.',
                effects: [
                    { type: 'stat', stat: 'stress', operation: 'add', value: 400 }
                ]
            }
        ],
        isPermanent: false,
        priority: 8,
        oneTime: true,
        category: 'crisis'
    },
    {
        id: 'ROOMMATE_CULTIST',
        title: '🏠 Roommate Revelation',
        description: `You came back late and caught your roommate Chuka in a meeting.

5 guys in black. Red berets. Candles. Strange symbols.
They froze when they saw you.

"Pastor... you didn't see anything, right?"
Chuka's eyes were pleading. But also threatening.

You share this room. You share everything.`,
        conditions: [
            { type: 'era', era: 'University' }
        ],
        choices: [
            {
                id: 'roommate_silent',
                label: '🤐 Pretend you saw nothing',
                resultText: 'Chuka now "owes" you. He keeps other cults away from your fellowship.',
                effects: [
                    { type: 'stat', stat: 'influence', operation: 'add', value: 300 },
                    { type: 'stat', stat: 'anointing', operation: 'subtract', value: 200 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 100 }
                ]
            },
            {
                id: 'roommate_confront',
                label: '⚡ "IN JESUS NAME, LEAVE THIS ROOM!"',
                resultText: 'They scattered! Chuka was delivered. He now leads your prayer warriors.',
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 800 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 400 },
                    { type: 'members', operation: 'add', value: 5 }
                ],
                requirements: [
                    { type: 'stat', stat: 'anointing', operator: 'gte', value: 3000 }
                ]
            },
            {
                id: 'roommate_relocate',
                label: '🏃 Request hostel transfer immediately',
                resultText: 'You moved to a safer hostel. But people say you ran. Mixed reactions.',
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 200 },
                    { type: 'stat', stat: 'stress', operation: 'subtract', value: 300 }
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
// HOSTEL SURVIVAL EVENTS
// ============================================================================

export const survivalEvents: GameEvent[] = [
    {
        id: 'NO_FOOD_WEEK',
        title: '🍚 The Hungry Week',
        description: `It's been 4 days since you had a proper meal.

The garri is finished. The beans are finished. Your account is ₦200.
Your roommate offered you a plate of rice... for ₦500 you don't have.

You have a fellowship meeting tonight. You're supposed to preach.
Your stomach is making the loudest sounds.`,
        conditions: [
            { type: 'era', era: 'University' },
            { type: 'stat', stat: 'personalCash', operator: 'lte', value: 500 }
        ],
        choices: [
            {
                id: 'hunger_fast',
                label: '🙏 Call it a spiritual fast',
                resultText: '"I\'m fasting for breakthrough!" Your preaching was fire. But you almost fainted.',
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 400 },
                    { type: 'stat', stat: 'health', operation: 'subtract', value: 800 }
                ]
            },
            {
                id: 'hunger_beg',
                label: '🙏 Ask fellowship members for help',
                resultText: 'They collected ₦5,000 for you. Humbling, but you ate.',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'add', value: 5000 },
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 100 }
                ]
            },
            {
                id: 'hunger_hustle',
                label: '💼 Do "runs" for a lecturer',
                resultText: 'You typed assignments for ₦3,000. Survived another week.',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'add', value: 3000 },
                    { type: 'stat', stat: 'stress', operation: 'add', value: 400 }
                ]
            }
        ],
        isPermanent: false,
        priority: 7,
        oneTime: false,
        category: 'crisis'
    },
    {
        id: 'BEDBUG_INFESTATION',
        title: '🐜 The Bedbug Empire',
        description: `The bedbugs have taken over your room.

You wake up with new bites every morning. Your mattress is infested.
Fumigation costs ₦8,000. A new mattress is ₦15,000.

The bites are visible. People at fellowship are asking questions.
"Pastor, is that a rash or...?"`,
        conditions: [
            { type: 'era', era: 'University' }
        ],
        choices: [
            {
                id: 'bugs_fumigate',
                label: '💨 Pay for fumigation (₦8,000)',
                resultText: 'Room fumigated. Bugs died. You slept well for the first time in weeks.',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 8000 },
                    { type: 'stat', stat: 'health', operation: 'add', value: 500 }
                ]
            },
            {
                id: 'bugs_endure',
                label: '😫 Endure and pray',
                resultText: 'Your faith is strong. Your skin is not. The scars remain.',
                effects: [
                    { type: 'stat', stat: 'health', operation: 'subtract', value: 400 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 100 }
                ]
            },
            {
                id: 'bugs_sleep_chapel',
                label: '⛪ Sleep in the chapel instead',
                resultText: 'You became known as "the pastor who lives in church." Dedication or desperation?',
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 200 },
                    { type: 'stat', stat: 'health', operation: 'add', value: 200 }
                ]
            }
        ],
        isPermanent: false,
        priority: 4,
        oneTime: false,
        category: 'random'
    },
    {
        id: 'STOLEN_BELONGINGS',
        title: '🔓 Thief in the Night',
        description: `You returned from fellowship to find your room ransacked.

Gone: Your laptop (₦150,000), your phone (₦80,000), and your Bible.
Yes, they stole your BIBLE. The one with all your notes.

Your roommate claims he was "at the library."
But he's wearing new shoes...`,
        conditions: [
            { type: 'era', era: 'University' }
        ],
        choices: [
            {
                id: 'theft_accuse',
                label: '👆 Confront your roommate',
                resultText: 'He confessed. He sold your things for initiation fees. The cult got him.',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 230000 },
                    { type: 'stat', stat: 'stress', operation: 'add', value: 600 }
                ]
            },
            {
                id: 'theft_forgive',
                label: '🙏 Forgive and move on',
                resultText: 'You bought a small phone for ₦15,000. Starting over with God.',
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 245000 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 500 }
                ]
            },
            {
                id: 'theft_spiritual',
                label: '⚡ Announce "spiritual consequences"',
                resultText: 'You prayed publicly. The thief\'s leg swelled. Things were returned.',
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 800 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 200 }
                ],
                requirements: [
                    { type: 'stat', stat: 'anointing', operator: 'gte', value: 3500 }
                ]
            }
        ],
        isPermanent: true,
        priority: 7,
        oneTime: true,
        category: 'crisis'
    }
];

// ============================================================================
// EXPORT ALL UNIVERSITY EVENTS
// ============================================================================

export const universityEvents: GameEvent[] = [
    ...academicEvents,
    ...fellowshipEvents,
    ...cultEvents,
    ...survivalEvents,
];

export default universityEvents;
