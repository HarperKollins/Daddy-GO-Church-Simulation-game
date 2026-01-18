/**
 * Random Events Database - "The Spice of Life"
 * 
 * These events trigger randomly to keep gameplay fresh.
 * Each week should feel like a new adventure.
 * 
 * Categories:
 * - DRAMA: Church member conflicts, gossip, betrayals
 * - MONEY: Financial surprises (good and bad)
 * - MEDIA: Social media moments, interviews, exposés
 * - SPIRITUAL: Miracles, doubts, revelations
 * - LIFESTYLE: Personal life events
 * - SCANDAL: Potential reputation hits
 */

import type { GameEvent } from '@/types/game';

export const randomEvents: GameEvent[] = [
    // =========================================================================
    // DRAMA EVENTS
    // =========================================================================
    {
        id: 'RANDOM_CHOIR_DRAMA',
        title: '🎤 Choir Wahala',
        description: `The choir director and the keyboard player are not speaking. Apparently, Sister Amara said the sopranos were "off-key" and Brother Kenneth said her directing was "giving primary school."

Last Sunday's worship was TENSE. Members are choosing sides. Your fellowship group is now two factions.

How do you handle this?`,
        conditions: [{ type: 'week', operator: 'gte', value: 3 }],
        choices: [
            {
                id: 'CHOIR_PEACE',
                label: '🕊️ Mediate peacefully',
                resultText: `You sit them both down. You pray. You remind them that the enemy wants division.

After two hours of tears and accusations, they hug it out. Worship next Sunday is FIRE.`,
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 5 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 3 },
                ],
            },
            {
                id: 'CHOIR_FIRE',
                label: '🔥 Fire them both. Start fresh.',
                resultText: `"If your right hand causes you to sin, CUT IT OFF!"

You dissolve the entire music department. People are SHOCKED. But next Sunday, you lead worship yourself with just a tambourine.

It's raw. It's spiritual. Some people leave. But the ones who stay? They're LOYAL.`,
                effects: [
                    { type: 'members', operation: 'subtract', value: 15 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 10 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 5 },
                ],
            },
            {
                id: 'CHOIR_IGNORE',
                label: '😴 Let them sort it out',
                resultText: `You have bigger problems. Like eating.

The drama continues for weeks. Eventually, both of them leave and start their own fellowship. They take 20 members with them.`,
                effects: [
                    { type: 'members', operation: 'subtract', value: 20 },
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 5 },
                ],
            },
        ],
        isPermanent: false,
        priority: 40,
        oneTime: false,
        category: 'random',
    },

    {
        id: 'RANDOM_PREGNANCY_SCANDAL',
        title: '🤰 The Usher\'s Secret',
        description: `Sister Chidinma, your most dedicated usher, is pregnant. She's not married. She's been sneaking out of choir practice to cry.

The church mothers are already whispering. Someone posted on the fellowship WhatsApp group: "Some people should not be serving in the altar."

All eyes are on you.`,
        conditions: [{ type: 'week', operator: 'gte', value: 6 }],
        choices: [
            {
                id: 'PREGNANCY_GRACE',
                label: '❤️ Show grace. "Let him without sin..."',
                resultText: `You announce during service: "We will NOT stone our sisters. We will LOVE them."

Chidinma cries. Half the congregation cries. The church mothers are FUMING but silent.

Your church becomes known as "the one that doesn't judge."`,
                effects: [
                    { type: 'members', operation: 'add', value: 25 },
                    { type: 'stat', stat: 'integrity', operation: 'add', value: 20 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 5 },
                ],
            },
            {
                id: 'PREGNANCY_DISCIPLINE',
                label: '⚖️ Public confession and temporary suspension',
                resultText: `"The church has standards. Without discipline, we are just a social club."

Chidinma confesses publicly. She's suspended from service for 6 months. Some young people leave. But the elders nod approvingly.`,
                effects: [
                    { type: 'members', operation: 'subtract', value: 10 },
                    { type: 'stat', stat: 'scandal', operation: 'subtract', value: 5 },
                ],
            },
            {
                id: 'PREGNANCY_SHOTGUN',
                label: '💒 Force a wedding. Problem solved!',
                resultText: `You arrange an emergency wedding with the baby daddy (who is, awkwardly, your drummer).

The wedding is tense. Nobody claps during the kiss. But technically... no more scandal, right?`,
                effects: [
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 3 },
                    { type: 'stat', stat: 'integrity', operation: 'subtract', value: 10 },
                ],
            },
        ],
        isPermanent: false,
        priority: 35,
        oneTime: true,
        category: 'random',
    },

    // =========================================================================
    // MONEY EVENTS
    // =========================================================================
    {
        id: 'RANDOM_TITHE_CHEAT',
        title: '💸 The Fake Tithe',
        description: `Your accountant whispers to you after service: "Pastor, I counted the offering. Someone put MONOPOLY MONEY in the basket. ₦500,000 worth of fake notes."

The bag is heavy but worthless. Someone in your congregation is either pranking you or testing you.`,
        conditions: [{ type: 'week', operator: 'gte', value: 5 }],
        choices: [
            {
                id: 'TITHE_PREACH',
                label: '🔥 Preach FIRE about robbing God',
                resultText: `"YOU CANNOT MOCK GOD! Ananias and Sapphira DIED for this!"

The congregation is terrified. Next week, offering doubles. Nobody knows who did it, but nobody dares repeat it.`,
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'add', value: 10000 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 3 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 5 },
                ],
            },
            {
                id: 'TITHE_INVESTIGATE',
                label: '🔍 Quietly investigate',
                resultText: `You check the church CCTV (that one camera that barely works). You see a man in sunglasses. Never seen before. Never seen again.

Was it a test from God? An enemy? You'll never know.`,
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 2 },
                ],
            },
            {
                id: 'TITHE_IGNORE',
                label: '🤷 Keep it moving. God will deal with them.',
                resultText: `You don't have time for this. Bills are due.

You pawn the Monopoly money for actual ₦2,000 to a confused mallam who didn't look closely.`,
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'add', value: 2000 },
                    { type: 'stat', stat: 'integrity', operation: 'subtract', value: 5 },
                ],
            },
        ],
        isPermanent: false,
        priority: 30,
        oneTime: false,
        category: 'random',
    },

    {
        id: 'RANDOM_SURPRISE_DONATION',
        title: '💰 Anonymous Envelope',
        description: `After service, you find a plain brown envelope on the pulpit. No name. Just cash.

₦200,000. Fresh notes.

A sticky note inside says: "For the work. - A Friend"`,
        conditions: [],
        choices: [
            {
                id: 'DONATION_INVESTIGATE',
                label: '🤔 Try to find out who it\'s from',
                resultText: `You ask around discreetly. Nobody knows anything. The CCTV shows nothing useful.

You accept the mystery. God works in mysterious ways.`,
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'add', value: 200000 },
                ],
            },
            {
                id: 'DONATION_ACCEPT',
                label: '🙏 Praise God and move on',
                resultText: `You don't question blessings. This pays rent for the venue AND leaves extra for equipment.

Later, you notice a man in a Jeep watching your service through the window. He drives off when you look.`,
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'add', value: 200000 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 2 },
                ],
            },
        ],
        isPermanent: false,
        priority: 20,
        oneTime: false,
        category: 'random',
    },

    {
        id: 'RANDOM_VENUE_HIKE',
        title: '📈 Landlord Wahala',
        description: `Your venue landlord shows up unannounced. He's wearing new agbada and smiling too hard.

"Pastor, the economy is hard. Rent is now DOUBLE starting next month."

You know he's just bought a new car. He knows you have nowhere else to go.`,
        conditions: [{ type: 'week', operator: 'gte', value: 8 }],
        choices: [
            {
                id: 'LANDLORD_PAY',
                label: '💸 Pay the increased rent',
                resultText: `You swallow the bitter pill. The church budget is bleeding.

But where else will you go? This is the reality of ministry in Lagos.`,
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'subtract', value: 50000 },
                ],
            },
            {
                id: 'LANDLORD_NEGOTIATE',
                label: '🗣️ Negotiate with prayers',
                resultText: `"Sir, let me pray for your business instead of paying extra."

He laughs. "Pastor, NEPA doesn't accept prayers. But... okay. 25% increase, not double."

Small win.`,
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'subtract', value: 25000 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 2 },
                ],
            },
            {
                id: 'LANDLORD_LEAVE',
                label: '🚶 Start looking for new venue',
                resultText: `You refuse to be exploited. You announce to the church: "We are moving!"

Members scatter to find a new place. It takes 3 weeks. Some people don't return.`,
                effects: [
                    { type: 'members', operation: 'subtract', value: 15 },
                    { type: 'stat', stat: 'integrity', operation: 'add', value: 10 },
                ],
            },
        ],
        isPermanent: false,
        priority: 35,
        oneTime: false,
        category: 'random',
    },

    // =========================================================================
    // MEDIA EVENTS
    // =========================================================================
    {
        id: 'RANDOM_VIRAL_MOMENT',
        title: '📱 You\'re Trending!',
        description: `Someone recorded your last service and posted it online. Your "RECEIVE YOUR CAR KEYS!" prayer has gone VIRAL.

10,000 views. 2,000 shares. The comments are... mixed.

"This pastor is on FIRE! 🔥"
"Na juju be this 😂"
"Can someone tell me the church address?"`,
        conditions: [{ type: 'stat', stat: 'fame', operator: 'gte', value: 15 }],
        choices: [
            {
                id: 'VIRAL_EMBRACE',
                label: '🌟 Embrace the virality',
                resultText: `You repost the video. Add captions. Tag locations. Your Instagram goes from 200 followers to 5,000.

Sunday service is PACKED with people who came "to see the viral pastor."`,
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 25 },
                    { type: 'members', operation: 'add', value: 100 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 8 },
                ],
            },
            {
                id: 'VIRAL_HUMBLE',
                label: '🙏 Stay humble. Delete and move on.',
                resultText: `You ask the person to take it down. They do. The moment passes.

"Pastor doesn't want fame," they say. "He must be real."`,
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 10 },
                    { type: 'stat', stat: 'integrity', operation: 'add', value: 15 },
                ],
            },
            {
                id: 'VIRAL_MONETIZE',
                label: '💰 Monetize! Sell "Anointing Oil" online',
                resultText: `You set up a website. "Blessed Oil from the Viral Prayer Pastor - ₦5,000/bottle."

Orders flood in. You didn't expect this. You need to buy actual oil now.`,
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'add', value: 200000 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 20 },
                    { type: 'stat', stat: 'integrity', operation: 'subtract', value: 25 },
                ],
            },
        ],
        isPermanent: false,
        priority: 45,
        oneTime: false,
        category: 'random',
    },

    {
        id: 'RANDOM_BLOGGER_ATTACK',
        title: '📰 Blogger On Your Case',
        description: `A popular Lagos gossip blog just posted about you:

"EXPOSED: New Pastor Collecting Tithes from Unemployed Students. Is This God's Work or SCAM?"

The article is mostly speculation. But people are forwarding it in WhatsApp groups.`,
        conditions: [{ type: 'stat', stat: 'fame', operator: 'gte', value: 10 }],
        choices: [
            {
                id: 'BLOGGER_IGNORE',
                label: '😶 Ignore it. Let it die down.',
                resultText: `You don't engage. After 3 days, the internet moves on to the next scandal.

A few people leave. Most stay. "Pastor handled it like a man of God."`,
                effects: [
                    { type: 'members', operation: 'subtract', value: 5 },
                    { type: 'stat', stat: 'integrity', operation: 'add', value: 5 },
                ],
            },
            {
                id: 'BLOGGER_CLAP_BACK',
                label: '🔥 Clap back on social media',
                resultText: `"The same bloggers that crucified Jesus are still working today. MY ENEMIES SHALL SCATTER!"

Your response goes viral. Some people love it. Some call you "aggressive and unpastoral."`,
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 15 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 10 },
                ],
            },
            {
                id: 'BLOGGER_BRIBE',
                label: '💸 Pay the blogger to remove the post',
                resultText: `You slide into their DMs. "How much to delete?"

"₦50,000," they reply.

The post disappears. But you know they'll be back.`,
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'subtract', value: 50000 },
                    { type: 'stat', stat: 'integrity', operation: 'subtract', value: 10 },
                ],
            },
        ],
        isPermanent: false,
        priority: 40,
        oneTime: false,
        category: 'random',
    },

    // =========================================================================
    // SPIRITUAL EVENTS
    // =========================================================================
    {
        id: 'RANDOM_GENUINE_MIRACLE',
        title: '✨ The Real Deal',
        description: `During prayer, something shifts in the room. A woman who has been deaf for 20 years suddenly SCREAMS.

"I CAN HEAR! I CAN HEAR MY CHILDREN!"

Everyone is recording. Doctors in the congregation are stunned. This isn't arranged. This is REAL.

What do you do?`,
        conditions: [{ type: 'stat', stat: 'anointing', operator: 'gte', value: 40 }],
        choices: [
            {
                id: 'MIRACLE_HUMBLE',
                label: '🙏 Give all glory to God. Stay humble.',
                resultText: `"This is NOT my power. This is GOD.'

You refuse to let anyone record your face. The video spreads, but people talk about GOD, not you.

Your anointing deepens.`,
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 25 },
                    { type: 'stat', stat: 'integrity', operation: 'add', value: 20 },
                    { type: 'members', operation: 'add', value: 50 },
                ],
            },
            {
                id: 'MIRACLE_PROMOTE',
                label: '📢 Document everything. This is PROOF!',
                resultText: `You get the woman's testimony on video. Medical records. Before and after.

You upload it everywhere. "DEAF WOMAN HEALED IN LAGOS!"

Your church EXPLODES. But some pastors start calling you "attention-seeker."`,
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 50 },
                    { type: 'members', operation: 'add', value: 300 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 10 },
                ],
            },
        ],
        isPermanent: false,
        priority: 50,
        oneTime: true,
        category: 'random',
    },

    {
        id: 'RANDOM_DOUBT_CRISIS',
        title: '😔 Dark Night of the Soul',
        description: `3 AM. You're awake. Staring at the ceiling.

"Is this even real? Am I deceiving people? What if there's no God and I'm just... talking to the air?"

The doubt is crushing. You haven't felt this empty since before you started.`,
        conditions: [{ type: 'week', operator: 'gte', value: 10 }],
        choices: [
            {
                id: 'DOUBT_PRAY',
                label: '🛐 Pray through the darkness',
                resultText: `You get on your knees. You pray until sunrise. Nothing changes. But you keep praying.

At 6 AM, a text comes in: "Pastor, thank you. Your last message saved my marriage."

That's enough. You keep going.`,
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 15 },
                    { type: 'stat', stat: 'integrity', operation: 'add', value: 10 },
                    { type: 'stat', stat: 'health', operation: 'subtract', value: 10 },
                ],
            },
            {
                id: 'DOUBT_CONFESS',
                label: '🗣️ Confess to a trusted elder',
                resultText: `You call Deacon Chidi. You tell him everything.

He's silent for a long time. Then: "Pastor, every prophet doubts. Even Elijah wanted to die. Keep going."

The burden feels lighter.`,
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 10 },
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 5 },
                ],
            },
            {
                id: 'DOUBT_RETREAT',
                label: '🚪 Take a break from ministry',
                resultText: `You tell the congregation you're "fasting." In reality, you're watching Netflix and eating indomie.

After a week, you feel... okay. Not fixed, but functional. You return.`,
                effects: [
                    { type: 'stat', stat: 'health', operation: 'add', value: 20 },
                    { type: 'stat', stat: 'anointing', operation: 'subtract', value: 10 },
                    { type: 'members', operation: 'subtract', value: 10 },
                ],
            },
        ],
        isPermanent: false,
        priority: 30,
        oneTime: true,
        category: 'random',
    },

    // =========================================================================
    // LIFESTYLE EVENTS
    // =========================================================================
    {
        id: 'RANDOM_SICK_DAY',
        title: '🤒 Malaria Season',
        description: `You wake up shivering. Head pounding. Body on fire.

The doctor confirms: MALARIA. Again.

Service is tomorrow. The church is expecting you. But you can barely stand.`,
        conditions: [],
        choices: [
            {
                id: 'SICK_PREACH',
                label: '💪 Preach through the pain',
                resultText: `You drag yourself to the pulpit. Your voice cracks. You sweat through your shirt.

But your "How to Overcome Trials" message hits DIFFERENT when people can SEE you struggling.

Two people give their lives to Christ watching you fight.`,
                effects: [
                    { type: 'stat', stat: 'health', operation: 'subtract', value: 20 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 10 },
                    { type: 'members', operation: 'add', value: 5 },
                ],
            },
            {
                id: 'SICK_REST',
                label: '🛏️ Rest. Let an elder handle it.',
                resultText: `You stay home. Brother Femi leads the service. He's terrible, but the church survives.

You feel guilty, but your body thanks you.`,
                effects: [
                    { type: 'stat', stat: 'health', operation: 'add', value: 15 },
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 3 },
                ],
            },
            {
                id: 'SICK_STREAM',
                label: '📱 Live stream from bed',
                resultText: `"Good morning church! As you can see, your pastor is FIGHTING. But we will STILL WORSHIP!"

People love the authenticity. "Pastor is so real," they comment.`,
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 8 },
                    { type: 'stat', stat: 'health', operation: 'subtract', value: 5 },
                ],
            },
        ],
        isPermanent: false,
        priority: 25,
        oneTime: false,
        category: 'random',
    },

    {
        id: 'RANDOM_NEPA_CRISIS',
        title: '💡 NEPA Strikes Again',
        description: `Power cut. Mid-service. The generator fuel finished. The rented generator man has disappeared with your deposit.

300 people are sitting in the dark. It's HOT. Children are crying.

The instrumentalists can't play. The projector is dead. All you have is your voice.`,
        conditions: [],
        choices: [
            {
                id: 'NEPA_ACAPELLA',
                label: '🎵 Lead worship a cappella',
                resultText: `"WE DON'T NEED ELECTRICITY TO PRAISE GOD!"

You start "Way Maker" with just your voice. First it's weak. Then someone joins. Then everyone.

The harmonies in the darkness are MAGICAL. People record on their phones (using battery, of course). The video goes viral.`,
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 15 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 10 },
                ],
            },
            {
                id: 'NEPA_DISMISS',
                label: '🚶 Dismiss early. "Come back next week."',
                resultText: `"The enemy has attacked our power, but we will be back STRONGER!"

People grumble as they leave. Some never return.`,
                effects: [
                    { type: 'members', operation: 'subtract', value: 15 },
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 5 },
                ],
            },
            {
                id: 'NEPA_OFFERING',
                label: '💰 Take emergency offering for a new generator',
                resultText: `"Brothers and sisters, we need ₦150,000 for a generator. RIGHT NOW. Who will sow a seed?"

The buckets go around. People give sacrificially. A man donates his watch.

You raise ₦200,000 in 20 minutes. The generator man is never seen again, but you buy a better one.`,
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'add', value: 200000 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 5 },
                ],
            },
        ],
        isPermanent: false,
        priority: 30,
        oneTime: false,
        category: 'random',
    },

    {
        id: 'RANDOM_FAMILY_PRESSURE',
        title: '👨‍👩‍👧 Family Thanksgiving Interrogation',
        description: `Christmas vacation. You visit your village. Your uncles sit you down.

"So, this pastor thing... how much are you making? When will you get a REAL job? Your cousin is now a banker. He just bought land."

Your mother is crying in the kitchen. "My son is suffering for God," she tells the neighbors.`,
        conditions: [{ type: 'week', operator: 'gte', value: 40 }],
        choices: [
            {
                id: 'FAMILY_DEFEND',
                label: '🔥 Defend your calling',
                resultText: `"Uncle, when Jesus returns, will He ask about land or about souls?"

The room goes silent. Your grandmother whispers "Amen." Your uncle changes the subject to politics.`,
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 5 },
                    { type: 'stat', stat: 'integrity', operation: 'add', value: 10 },
                ],
            },
            {
                id: 'FAMILY_LIE',
                label: '🤥 Exaggerate your success',
                resultText: `"Actually, Uncle, we just bought a plot for the church auditorium. 500-seater."

His eyes widen. "Ah! The Lord is good o!"

You'll deal with the truth later.`,
                effects: [
                    { type: 'stat', stat: 'integrity', operation: 'subtract', value: 15 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 5 },
                ],
            },
            {
                id: 'FAMILY_CRY',
                label: '😢 Break down and confess the struggle',
                resultText: `You tell them everything. The hunger. The doubts. The tiny church.

Your mother hugs you. Your uncle quietly slips you ₦20,000 "for transport."

Maybe family isn't so bad.`,
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'add', value: 20000 },
                    { type: 'stat', stat: 'health', operation: 'add', value: 10 },
                ],
            },
        ],
        isPermanent: false,
        priority: 25,
        oneTime: false,
        category: 'random',
    },

    // =========================================================================
    // QUICK RANDOM MOMENTS (Low priority, add variety)
    // =========================================================================
    {
        id: 'RANDOM_FREE_FOOD',
        title: '🍚 Owambe Blessing',
        description: `A church member invited you to their wedding owambe. Open bar. Jollof rice. Small chops.

For once, you eat like a KING.`,
        conditions: [],
        choices: [
            {
                id: 'FOOD_ENJOY',
                label: '😋 Eat till you can\'t move',
                resultText: `You take two plates. Then souvenirs. Then pack some for tomorrow.

Your body thanks you.`,
                effects: [
                    { type: 'stat', stat: 'health', operation: 'add', value: 25 },
                ],
            },
        ],
        isPermanent: false,
        priority: 15,
        oneTime: false,
        category: 'random',
    },

    {
        id: 'RANDOM_DANFO_PREACHING',
        title: '🚌 Danfo Evangelism',
        description: `You're in a cramped danfo heading to the mainland. The conductor is shouting. A man with a megaphone starts preaching.

He's BAD. Really bad. People are annoyed.

But then he points at YOU: "My brother in the white shirt! Come and support the gospel!"`,
        conditions: [],
        choices: [
            {
                id: 'DANFO_PREACH',
                label: '🎤 Take the mic and DELIVER',
                resultText: `You grab the megaphone. What follows is 15 minutes of FIRE.

By the time you reach Yaba, three people are crying and asking for your church address.`,
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 5 },
                    { type: 'members', operation: 'add', value: 3 },
                    { type: 'stat', stat: 'stress', operation: 'add', value: 50 },
                ],
            },
            {
                id: 'DANFO_PRETEND',
                label: '😴 Pretend to be asleep',
                resultText: `You close your eyes. The man moves on.

You feel guilty for the rest of the day.`,
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'subtract', value: 3 },
                ],
            },
        ],
        isPermanent: false,
        priority: 20,
        oneTime: false,
        category: 'random',
    },

    {
        id: 'RANDOM_LOST_PHONE',
        title: '📱 Phone Wahala',
        description: `Your phone disappeared during church offering. All your sermons. All your contacts. Gone.

You suspect the new member who left early, but you have no proof.`,
        conditions: [],
        choices: [
            {
                id: 'PHONE_PRAY',
                label: '🙏 Pray for the thief\'s redemption',
                resultText: `"Lord, let that phone malfunction until they return it."

Two days later, someone drops it at your gate. Battery dead. But it's yours.`,
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 5 },
                ],
            },
            {
                id: 'PHONE_ANNOUNCE',
                label: '📢 Announce the theft during service',
                resultText: `"Whoever took my phone, you have 24 hours before God deals with you."

The phone appears in the offering basket that night. But you've embarrassed everyone.`,
                effects: [
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 5 },
                ],
            },
        ],
        isPermanent: false,
        priority: 15,
        oneTime: false,
        category: 'random',
    },
];

export default randomEvents;
