/**
 * Emotional Events Engine
 * 
 * Events that MOVE the player emotionally:
 * - Guilt-inducing scenarios
 * - Joy and triumph moments
 * - Grief and loss
 * - Fear and tension
 * - Shame and regret
 */

// ============================================================================
// STANDALONE TYPES (not using GameEvent to allow flexible effects)
// ============================================================================

export interface EmotionalChoice {
    id: string;
    label: string;
    effects: Record<string, number>;  // Flexible stat effects
}

export interface EmotionalEvent {
    id: string;
    title: string;
    description: string;
    emotionalCore: EmotionType;
    intensity: number;              // 1-10
    lingering: boolean;             // Does this haunt the player?
    lingeringWeeks?: number;
    triggerMemory?: string;         // What NPC might reference later
    choices: EmotionalChoice[];
}

export type EmotionType =
    | 'guilt'
    | 'joy'
    | 'grief'
    | 'fear'
    | 'shame'
    | 'triumph'
    | 'love'
    | 'betrayal'
    | 'regret'
    | 'relief'
    | 'anger';

// ============================================================================
// GUILT EVENTS - Make player feel bad
// ============================================================================


export const GUILT_EVENTS: Partial<EmotionalEvent>[] = [
    {
        id: 'GUILT_MAMA_DIED',
        title: 'Mama\'s Last Words',
        description: `Your mother is dying in the village hospital. You were too busy with the church crusade to visit. She\'s been calling your name for days.

The doctor says she has hours left. She kept saying "Tell my pastor son I\'m proud of him. Tell him I understand why he couldn\'t come."

She understood. But do you?`,
        emotionalCore: 'guilt',
        intensity: 10,
        lingering: true,
        lingeringWeeks: 52,
        triggerMemory: 'mama_death',
        choices: [
            {
                id: 'remember_love',
                label: '😢 She was the only one who believed in me from the start',
                effects: { health: -500, anointing: -200, stress: 1000 }
            },
            {
                id: 'justify',
                label: '🙏 The crusade saved 200 souls. She would want that.',
                effects: { anointing: -100, morality: -50, stress: 500 }
            },
            {
                id: 'break_down',
                label: '💔 I should have been there... I should have...',
                effects: { health: -800, stress: 2000, fame: -100 }
            }
        ]
    },
    {
        id: 'GUILT_FAKE_HEALING',
        title: 'The Child Died',
        description: `Remember the child you "healed" at last month\'s crusade? The one with cancer? The mother believed you. She stopped the chemotherapy because you said God had healed him.

He died this morning. The mother is at your gate, screaming.

The news cameras are arriving.`,
        emotionalCore: 'guilt',
        intensity: 9,
        lingering: true,
        lingeringWeeks: 104,
        triggerMemory: 'child_died_fake_healing',
        choices: [
            {
                id: 'face_her',
                label: '😰 I have to face her. This is on me.',
                effects: { scandal: 2000, morality: 100, fame: -1000 }
            },
            {
                id: 'blame_faith',
                label: '🙏 "Her faith wavered. That\'s why the healing didn\'t manifest."',
                effects: { scandal: 1500, morality: -200, anointing: -300 }
            },
            {
                id: 'escape',
                label: '🚗 Tell security to send her away. Use the back exit.',
                effects: { scandal: 1000, morality: -300, stress: 800 }
            }
        ]
    },
    {
        id: 'GUILT_BETRAYED_FRIEND',
        title: 'Pastor Emeka\'s Funeral',
        description: `Pastor Emeka died penniless. The same Pastor Emeka who gave you your first chance to preach when nobody believed in you. 

You haven\'t spoken to him in 5 years. When he called asking for help with his hospital bills, your secretary said you were "too busy."

Now you\'re sitting at his funeral, wearing a ₦2 million suit.`,
        emotionalCore: 'guilt',
        intensity: 8,
        lingering: true,
        lingeringWeeks: 26,
        triggerMemory: 'emeka_funeral',
        choices: [
            {
                id: 'grand_gesture',
                label: '💰 Donate ₦10 million to his family publicly',
                effects: { cash: -10000000, fame: 500, morality: 0 }
            },
            {
                id: 'quiet_support',
                label: '🤫 Send money quietly. No cameras.',
                effects: { cash: -5000000, morality: 50 }
            },
            {
                id: 'nothing',
                label: '😶 What\'s done is done. Leave after the service.',
                effects: { morality: -100, stress: 200 }
            }
        ]
    }
];

// ============================================================================
// GRIEF EVENTS - Loss and sorrow
// ============================================================================

export const GRIEF_EVENTS: Partial<EmotionalEvent>[] = [
    {
        id: 'GRIEF_FIRSTBORN',
        title: 'The Firstborn',
        description: `Your firstborn son was in a car accident. The doctors tried for six hours. 

He didn\'t make it.

He was 12 years old. Last week he said he wanted to be a pastor like you. You told him to study hard first. You didn\'t have time to talk more.

You never had time.`,
        emotionalCore: 'grief',
        intensity: 10,
        lingering: true,
        lingeringWeeks: 104,
        choices: [
            {
                id: 'faith_test',
                label: '🙏 "The Lord gives and takes away. Blessed be His name."',
                effects: { health: -500, anointing: 200, stress: 1500 }
            },
            {
                id: 'rage',
                label: '😡 WHY? I SERVED YOU MY WHOLE LIFE! WHY HIM?',
                effects: { anointing: -500, health: -800, stress: 2000, scandal: 500 }
            },
            {
                id: 'numbness',
                label: '😶 ...I don\'t feel anything. Is something wrong with me?',
                effects: { health: -300, empathy: -100, stress: 1000 }
            }
        ]
    },
    {
        id: 'GRIEF_MENTOR',
        title: 'The General Has Fallen',
        description: `Your spiritual father, the one who ordained you, is gone. He died in his sleep at 82. 

In his final letter to you, he wrote: "I saw what you became. I hoped for better. But I still love you like a son. Make it right before your own time comes."

The letter is in your hands. Your tears are falling on his handwriting.`,
        emotionalCore: 'grief',
        intensity: 9,
        lingering: true,
        lingeringWeeks: 52,
        choices: [
            {
                id: 'honor',
                label: '🕯️ I will honor his memory. I will change.',
                effects: { morality: 100, anointing: 100, stress: 500 }
            },
            {
                id: 'dismiss',
                label: '📜 He didn\'t understand the realities of ministry today.',
                effects: { morality: -50, stress: 200 }
            },
            {
                id: 'weep',
                label: '😭 Cancel all engagements for a month. I need to mourn.',
                effects: { fame: -200, health: 100, stress: -300 }
            }
        ]
    }
];

// ============================================================================
// TRIUMPH EVENTS - Joy and success
// ============================================================================

export const TRIUMPH_EVENTS: Partial<EmotionalEvent>[] = [
    {
        id: 'TRIUMPH_CRUSADE',
        title: 'The Night of a Thousand Souls',
        description: `Tonight\'s crusade exceeded everything. 50,000 people came. The worship was electric. You preached for 90 minutes and felt the words flowing from somewhere beyond yourself.

When you gave the altar call, 8,000 people streamed forward. The altar couldn\'t contain them. People were crying, falling, encountering God.

Local and international media are calling it a revival. You just saw it happen through your hands.`,
        emotionalCore: 'triumph',
        intensity: 10,
        lingering: true,
        lingeringWeeks: 12,
        choices: [
            {
                id: 'humble',
                label: '🙏 "All glory to God. I\'m just a vessel."',
                effects: { anointing: 500, fame: 800, morality: 50 }
            },
            {
                id: 'proud',
                label: '💪 This is what I was born for. I AM anointed.',
                effects: { fame: 1000, anointing: 200, morality: -50, hubris: 100 }
            },
            {
                id: 'strategic',
                label: '📱 Get the social media clips. This is momentum.',
                effects: { fame: 1200, subscribers: 50000 }
            }
        ]
    }
];

// ============================================================================
// FEAR EVENTS - Tension and danger
// ============================================================================

export const FEAR_EVENTS: Partial<EmotionalEvent>[] = [
    {
        id: 'FEAR_EFCC_RAID',
        title: 'They\'re Here',
        description: `6 AM. Your phone is ringing. It\'s your security:

"Daddy, EFCC is at the gate. They have a warrant. They\'re asking for your financial records."

You hear vehicles outside. Sirens. Commands being barked.

In your office safe, there are documents that could end everything.`,
        emotionalCore: 'fear',
        intensity: 10,
        lingering: true,
        lingeringWeeks: 52,
        choices: [
            {
                id: 'cooperate',
                label: '🤝 Open the gate. Let them come. I have nothing to hide.',
                effects: { scandal: Math.random() > 0.5 ? 2000 : 500 }
            },
            {
                id: 'delay',
                label: '📞 Stall them. Call Senator Adamu. He owes me.',
                effects: { influence: -500, stress: 1500 }
            },
            {
                id: 'destroy',
                label: '🔥 The incinerator in the back. 5 minutes. I need 5 minutes.',
                effects: { morality: -200, stress: 2000, scandal: 500, obstruction: 1 }
            }
        ]
    },
    {
        id: 'FEAR_KIDNAP',
        title: 'The Call',
        description: `Unknown number. You answer.

"Good evening, Daddy G.O. We have something that belongs to you."

Your wife\'s voice comes through, sobbing. "Please do what they say."

"₦200 million by Friday. No police. Or we send her back in pieces."

Click.`,
        emotionalCore: 'fear',
        intensity: 10,
        lingering: true,
        lingeringWeeks: 26,
        choices: [
            {
                id: 'pay',
                label: '💰 The money is nothing. Get my wife back.',
                effects: { cash: -200000000, stress: 2000 }
            },
            {
                id: 'negotiate',
                label: '📞 Try to negotiate. Stall for time.',
                effects: { stress: 2500, risk: 80 }
            },
            {
                id: 'police',
                label: '👮 This is bigger than me. Call the DSS.',
                effects: { stress: 3000, fame: 500, risk: 50 }
            }
        ]
    }
];

// ============================================================================
// SHAME EVENTS - Public humiliation
// ============================================================================

export const SHAME_EVENTS: Partial<EmotionalEvent>[] = [
    {
        id: 'SHAME_VIDEO_LEAK',
        title: 'The Video',
        description: `Instagram, Twitter, WhatsApp - everywhere. A video of you in a hotel room with a woman who is NOT your wife.

The video is clear. The timestamps are from last month\'s "prayer retreat."

Your wife saw it. Your children saw it. Your 80,000 member church is seeing it right now.

Your phone has 378 missed calls.`,
        emotionalCore: 'shame',
        intensity: 10,
        lingering: true,
        lingeringWeeks: 104,
        choices: [
            {
                id: 'deny',
                label: '🤖 "That video is AI-generated by enemies of the gospel!"',
                effects: { scandal: 2000, morality: -200, believers: 30 }
            },
            {
                id: 'confess',
                label: '😔 "I have sinned. I take full responsibility."',
                effects: { scandal: 3000, morality: 100, fame: -2000, anointing: -500 }
            },
            {
                id: 'disappear',
                label: '✈️ Go somewhere. Anywhere. Don\'t answer any calls.',
                effects: { scandal: 2500, stress: 2000, health: -500 }
            }
        ]
    }
];

// ============================================================================
// DOUBT EVENTS - Crisis of faith
// ============================================================================

export const DOUBT_EVENTS: Partial<EmotionalEvent>[] = [
    {
        id: 'DOUBT_MIDNIGHT',
        title: 'At 3 AM',
        description: `You can\'t sleep again. The question keeps coming back:

What if none of this is real?

What if you\'ve built your whole life on a story? The healings that may have been coincidence. The prophecies so vague they could mean anything. The "anointing" that might just be charisma.

What if you\'re just a very good storyteller with a large audience?

The ceiling stares back at you. The question doesn\'t go away.`,
        emotionalCore: 'regret',
        intensity: 8,
        lingering: true,
        lingeringWeeks: 12,
        choices: [
            {
                id: 'pray_away',
                label: '🙏 "Get behind me, Satan! I rebuke these thoughts!"',
                effects: { anointing: 50, doubt: -50, stress: 200 }
            },
            {
                id: 'sit_with_it',
                label: '😶 Maybe these questions deserve honest answers.',
                effects: { doubt: 100, morality: 50, stress: 500 }
            },
            {
                id: 'distraction',
                label: '📱 Open Instagram. Reply to some comments. Don\'t think.',
                effects: { stress: 100, doubt: 20 }
            }
        ]
    },
    {
        id: 'DOUBT_EMPTY_SERVICE',
        title: 'The Sunday You Felt Nothing',
        description: `You preached for an hour. The congregation wept, shouted, praised. Testimonies poured in after.

But you felt nothing.

Not during worship. Not during prayer. Not even when you laid hands on the sick.

Everyone else felt God\'s presence. You stood in the pulpit, performed all the right moves, said all the right words...

...and it was just performance. Empty. Mechanical.

Is this what ministry becomes?`,
        emotionalCore: 'regret',
        intensity: 7,
        lingering: false,
        choices: [
            {
                id: 'fake_it',
                label: '🎭 The show must go on. They can\'t see you doubt.',
                effects: { stress: 300, morality: -30 }
            },
            {
                id: 'retreat',
                label: '⛰️ Book a private retreat. Reconnect with God.',
                effects: { cash: -500000, anointing: 200, stress: -200 }
            },
            {
                id: 'confide',
                label: '👥 Talk to your spiritual mentor about this.',
                effects: { vulnerability: 50, stress: -100 }
            }
        ]
    }
];

// ============================================================================
// COMBINE ALL EMOTIONAL EVENTS
// ============================================================================

export const ALL_EMOTIONAL_EVENTS: Partial<EmotionalEvent>[] = [
    ...GUILT_EVENTS,
    ...GRIEF_EVENTS,
    ...TRIUMPH_EVENTS,
    ...FEAR_EVENTS,
    ...SHAME_EVENTS,
    ...DOUBT_EVENTS
];

// ============================================================================
// FUNCTIONS
// ============================================================================

/**
 * Get event by emotional type
 */
export function getEmotionalEventsByType(type: EmotionType): Partial<EmotionalEvent>[] {
    return ALL_EMOTIONAL_EVENTS.filter(e => e.emotionalCore === type);
}

/**
 * Check if player should experience lingering effect
 */
export function checkLingeringEffect(
    memory: string,
    weeksSince: number,
    maxWeeks: number
): { active: boolean; intensity: number; narrative: string } {
    if (weeksSince > maxWeeks) {
        return { active: false, intensity: 0, narrative: '' };
    }

    const fadeRate = weeksSince / maxWeeks;
    const intensity = (1 - fadeRate) * 100;

    const narratives: Record<string, string> = {
        'mama_death': 'You remember Mama\'s last words. The guilt hasn\'t faded.',
        'child_died_fake_healing': 'The mother\'s screams still echo in your head.',
        'emeka_funeral': 'Pastor Emeka believed in you when no one did. And you abandoned him.',
    };

    return {
        active: true,
        intensity,
        narrative: narratives[memory] || 'The memory of past choices lingers...'
    };
}
