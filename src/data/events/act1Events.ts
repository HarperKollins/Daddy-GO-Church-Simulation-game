/**
 * Act 1: Survival Mode Events
 * 
 * Theme: "Will you eat the seed?"
 * 
 * These events establish the core moral framework of the game.
 * The player is a broke 200L university student trying to start a ministry.
 * Every choice here has rippling consequences through the entire game.
 * 
 * Cultural Context:
 * - "Bus stop preaching" is a real phenomenon in Lagos
 * - "Yahoo" refers to internet fraud, a controversial path for desperate youth
 * - "Sowing seed" vs "eating seed" is prosperity gospel terminology
 * - "Arrangee" miracles are staged healings - an open secret in some circles
 */

import type { GameEvent } from '@/types/game';

export const act1Events: GameEvent[] = [
    // =========================================================================
    // THE BUS STOP MORNING CRY
    // First event - establishes preaching mechanic
    // =========================================================================
    {
        id: 'BUS_STOP_MORNING_CRY',
        title: 'The Morning Cry',
        description: `It is 5:00 AM at Yaba bus stop. The danfo drivers are shouting destinations, conductors are fighting for passengers, and your stomach is singing a different hymn entirely.

You haven't eaten since yesterday. Your megaphone is heavy in your hands. The crowd rushes past, nobody looking at the skinny student with the worn Bible.

What will you preach today?`,
        conditions: [
            { type: 'act', act: 'SURVIVAL' },
            { type: 'week', operator: 'gte', value: 1 },
        ],
        choices: [
            {
                id: 'PREACH_FIRE',
                label: '🔥 Preach Fire & Brimstone!',
                resultText: `"REPENT! THE KINGDOM IS AT HAND!"

You scream until your voice cracks. Spittle flies. The bus conductors pause their shouting to watch this madman. A few people actually stop. One woman is crying.

This is what it means to be called.`,
                effects: [
                    { type: 'stat', stat: 'health', operation: 'subtract', value: 10 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 5 },
                    { type: 'members', operation: 'add', value: 2 },
                ],
            },
            {
                id: 'PREACH_PROSPERITY',
                label: '💰 Preach Prosperity & Blessings',
                resultText: `"God will BUTTER your bread today! Your enemies will BOW! Money is coming!"

The drivers cheer "Amen!" and spray you small small naira notes. One man shakes your hand and says "Pastor, you understand the assignment."

Your stomach will eat today. But something feels... off.`,
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'add', value: 500 },
                    { type: 'stat', stat: 'anointing', operation: 'subtract', value: 3 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 2 },
                ],
            },
            {
                id: 'SLEEP_IN',
                label: '😴 Stay in Bed (Skip Preaching)',
                resultText: `You pull the thin blanket over your head. The call can wait. The hunger can wait. Everything can wait.

But your conscience won't let you sleep. You stare at the ceiling until noon, the weight of your inaction heavier than hunger.`,
                effects: [
                    { type: 'stat', stat: 'health', operation: 'subtract', value: 5 },
                    { type: 'stat', stat: 'anointing', operation: 'subtract', value: 5 },
                    { type: 'stat', stat: 'integrity', operation: 'subtract', value: 10 },
                ],
            },
        ],
        isPermanent: false,
        priority: 100,
        oneTime: true,  // Changed to true so random events can trigger after first week
        category: 'story',
    },

    // =========================================================================
    // THE ROOMMATE'S OFFER (Yahoo Temptation)
    // Critical branching point - can lock player out of miracles
    // =========================================================================
    {
        id: 'ROOMMATES_OFFER',
        title: "The Roommate's Offer",
        description: `Your roommate Segun - everyone calls him "Wire" - just pulled up in a brand new Benz. 

He finds you in the room, soaking garri with groundnuts. No sugar. The way he looks at you... it's not pity. It's opportunity.

"Bros, you too dey suffer. This your ministry hustle, e no dey pay. Make I show you better way? Small laptop work, you go change your story in one month."

You know what "laptop work" means.`,
        conditions: [
            { type: 'act', act: 'SURVIVAL' },
            { type: 'week', operator: 'gte', value: 3 },
            { type: 'stat', stat: 'personalCash', operator: 'lt', value: 1000 },
        ],
        choices: [
            {
                id: 'JOIN_YAHOO',
                label: '🖥️ "Wire, teach me the way..."',
                resultText: `You stop going to bus stops. You start going to cafes. The "work" is easier than you thought. Money comes faster than any offering basket.

But at night, when you try to pray, the words won't come. Something has been traded that cannot be bought back.

Your anointing is now locked. The miracles you could have performed... that door is closed forever.`,
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'add', value: 500000 },
                    { type: 'stat', stat: 'anointing', operation: 'set', value: 0 },
                    { type: 'flag', flag: 'yahooPath', value: true },
                    { type: 'flag', flag: 'miracleLock', value: true },
                    { type: 'stat', stat: 'integrity', operation: 'set', value: 0 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 20 },
                ],
            },
            {
                id: 'REJECT_YAHOO',
                label: '✋ "Get thee behind me, Segun!"',
                resultText: `Segun laughs so hard he almost chokes on his shawarma. "Na wa for you o! Na hunger go kill you!"

He sprays you ₦1,000 for "data" and leaves, shaking his head. The money burns in your pocket. You give it to the fellowship offering the next day.

Your integrity remains. But your stomach still growls.`,
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'add', value: 1000 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 10 },
                    { type: 'stat', stat: 'integrity', operation: 'add', value: 20 },
                ],
            },
        ],
        isPermanent: true,
        priority: 90,
        oneTime: true,
        category: 'story',
    },

    // =========================================================================
    // THE OFFERING BASKET TEMPTATION
    // Core moral fork - determines early game path
    // =========================================================================
    {
        id: 'OFFERING_BASKET_TEMPTATION',
        title: 'The Offering Basket',
        description: `Your first real fellowship meeting. A classroom in the Faculty of Arts. Seven people attended. One of them was lost and looking for a tutorial class.

The offering basket comes back with ₦2,500. It sits there on the table. Your landlord's boy came by yesterday, talking about rent "or else."

You haven't eaten properly in three days. The money could feed you for two weeks. Or... you could use it to rent a better venue for next week.

The other members have left. It's just you and the money.`,
        conditions: [
            { type: 'act', act: 'SURVIVAL' },
            { type: 'week', operator: 'gte', value: 4 },
            { type: 'stat', stat: 'churchCash', operator: 'lt', value: 5000 },
        ],
        choices: [
            {
                id: 'EAT_THE_SEED',
                label: '🍽️ Eat the Seed (Take the money)',
                resultText: `"The ox that treads the corn must eat," you whisper to yourself. The words feel hollow.

You buy four wraps of Amala and Ewedu. You eat like a man just freed from prison. For one night, you are full.

But something has shifted. A door has opened that may never fully close. The church money... it feels more accessible now.`,
                effects: [
                    { type: 'stat', stat: 'personalCash', operation: 'add', value: 2500 },
                    { type: 'stat', stat: 'health', operation: 'add', value: 40 },
                    { type: 'stat', stat: 'anointing', operation: 'subtract', value: 15 },
                    { type: 'stat', stat: 'integrity', operation: 'subtract', value: 30 },
                    { type: 'flag', flag: 'embezzlementUnlocked', value: true },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 5 },
                ],
            },
            {
                id: 'SOW_THE_SEED',
                label: '🌱 Sow the Seed (Invest in the ministry)',
                resultText: `You take the money to the faculty secretary. You book the classroom for next Sunday. With the remaining ₦500, you buy chalk and a small board.

That night, you drink water to fill your stomach. You sleep with hunger pangs. But your dreams... your dreams are of cathedrals.

The next Sunday, fifteen people come. Word is spreading.`,
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'add', value: 2500 },
                    { type: 'stat', stat: 'health', operation: 'subtract', value: 15 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 20 },
                    { type: 'stat', stat: 'integrity', operation: 'add', value: 20 },
                    { type: 'flag', flag: 'sowedTheSeed', value: true },
                    { type: 'members', operation: 'add', value: 8 },
                    { type: 'venue', venue: 'CLASSROOM' },
                ],
            },
        ],
        isPermanent: true,
        priority: 85,
        oneTime: true,
        category: 'story',
    },

    // =========================================================================
    // THE FIRST MIRACLE
    // Anointing test - real vs fake healing
    // =========================================================================
    {
        id: 'THE_FIRST_MIRACLE',
        title: 'The First Miracle',
        description: `A student limps into your classroom service. His name is Chidi. Childhood polio left him with a withered leg. He's been to every church in Lagos.

Everyone is watching. The air is thick with expectation. Your fellowship members are whispering: "This is it. This is where we see if God is truly with Pastor."

You can feel something stirring. Or is it just the pressure? Emeka from the Drama department is in the back row. He catches your eye and gives you a knowing look. He could fall under the anointing convincingly. He's done it before.

What do you do?`,
        conditions: [
            { type: 'act', act: 'SURVIVAL' },
            { type: 'week', operator: 'gte', value: 6 },
            { type: 'stat', stat: 'anointing', operator: 'gte', value: 30 },
            { type: 'flag', flag: 'miracleLock', value: false },
        ],
        choices: [
            {
                id: 'PRAY_REAL_MIRACLE',
                label: '🙏 Pray for Chidi (Trust God)',
                resultText: `You lay hands on Chidi. You pray. The words come from somewhere deeper than your throat. The room is silent.

Nothing happens. 

Then... Chidi takes a step. His leg straightens. He takes another step. He's crying. Everyone is crying. Phones are out, recording.

By morning, the video has 50,000 views. Your life will never be the same.`,
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 30 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 40 },
                    { type: 'members', operation: 'add', value: 200 },
                    { type: 'stat', stat: 'integrity', operation: 'add', value: 20 },
                ],
                requirements: [
                    { type: 'stat', stat: 'anointing', operator: 'gte', value: 40 },
                ],
            },
            {
                id: 'ARRANGEE_MIRACLE',
                label: '🎭 The Arrangee (Signal Emeka)',
                resultText: `You give Emeka the signal. He stumbles forward, falls dramatically, thrashes on the ground, and rises "healed" of his non-existent affliction.

The crowd goes wild. Chidi watches silently, still limping. He leaves before the service ends.

Emeka texts you later: "Pastor, we move. But you know this thing... it costs extra next time."

You now have a business partner. And a blackmailer.`,
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 20 },
                    { type: 'stat', stat: 'anointing', operation: 'subtract', value: 20 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 15 },
                    { type: 'members', operation: 'add', value: 50 },
                    { type: 'stat', stat: 'integrity', operation: 'subtract', value: 40 },
                    { type: 'flag', flag: 'miracleLock', value: true },
                ],
            },
            {
                id: 'HONEST_PRAYER',
                label: '💬 Be Honest (Pray without expectations)',
                resultText: `"I don't know if God will heal you today, Chidi. But I will pray with all my heart."

You pray. Nothing visible happens. Chidi's leg remains withered. But he smiles through his tears. "Pastor, this is the first time someone in a church was honest with me."

He becomes your first deacon. His faith is stronger than anyone who can walk.`,
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 15 },
                    { type: 'stat', stat: 'integrity', operation: 'add', value: 30 },
                    { type: 'members', operation: 'add', value: 10 },
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 5 },
                ],
            },
        ],
        isPermanent: true,
        priority: 80,
        oneTime: true,
        category: 'story',
    },

    // =========================================================================
    // RANDOM EVENTS - These can repeat
    // =========================================================================
    {
        id: 'RANDOM_GENEROUS_BUSINESSMAN',
        title: 'The Generous Businessman',
        description: `A man in a Jeep stops at your bus stop preaching. He listens for five minutes. His driver looks impatient.

"Young man, I like your energy. Here." He hands you an envelope. "Use it for the work of God."

Inside is ₦50,000. No strings attached. Or are there?`,
        conditions: [
            { type: 'act', act: 'SURVIVAL' },
            { type: 'stat', stat: 'anointing', operator: 'gte', value: 20 },
        ],
        choices: [
            {
                id: 'ACCEPT_GIFT',
                label: '✅ Accept with gratitude',
                resultText: `"Thank you, sir. God bless you."

The money goes into the church fund. You resist the urge to count it as personal. This is seed for the ministry.`,
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'add', value: 50000 },
                ],
            },
            {
                id: 'REFUSE_GIFT',
                label: '❌ Refuse politely',
                resultText: `"Thank you, sir, but I cannot accept. Let me earn my congregation."

The man looks surprised, then impressed. "Interesting. Very interesting." He drives off.

You wonder if you just made a mistake. But your conscience is clear.`,
                effects: [
                    { type: 'stat', stat: 'integrity', operation: 'add', value: 15 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 5 },
                ],
            },
        ],
        isPermanent: false,
        priority: 30,
        oneTime: false,
        category: 'random',
    },

    {
        id: 'RANDOM_HECKLER',
        title: 'The Campus Atheist',
        description: `A Philosophy student interrupts your open-air preaching. He's loud, articulate, and has clearly been waiting for this opportunity.

"Where was your God during the slave trade? Why does your pastor need a private jet? Can God create a rock so heavy He can't lift it?"

Your small crowd is watching. This could make or break your campus reputation.`,
        conditions: [
            { type: 'act', act: 'SURVIVAL' },
        ],
        choices: [
            {
                id: 'DEBATE_HECKLER',
                label: '🗣️ Engage in debate',
                resultText: `You take a deep breath and engage. Three hours later, you're both sitting on the grass, still arguing, but now sharing groundnuts.

Neither of you changed your mind. But something happened. Respect, maybe.`,
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 5 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 3 },
                ],
            },
            {
                id: 'REBUKE_HECKLER',
                label: '🔥 Rebuke the spirit of doubt',
                resultText: `"I BIND THE SPIRIT OF INTELLECTUALISM! THE WISDOM OF MAN IS FOOLISHNESS TO GOD!"

The crowd cheers. The Philosophy student looks stunned, then hurt, then angry. He leaves, but he'll be back. And next time, he won't be alone.`,
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 10 },
                    { type: 'stat', stat: 'anointing', operation: 'subtract', value: 5 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 3 },
                ],
            },
            {
                id: 'IGNORE_HECKLER',
                label: '🙈 Ignore and continue',
                resultText: `You pretend he doesn't exist. He eventually gets bored and leaves.

But the crowd noticed. Some of them wondered: doesn't a man of God have answers?`,
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 5 },
                    { type: 'members', operation: 'subtract', value: 2 },
                ],
            },
        ],
        isPermanent: false,
        priority: 25,
        oneTime: false,
        category: 'random',
    },

    // =========================================================================
    // UNIVERSITY CONTEXT EVENTS (Student Life)
    // =========================================================================
    {
        id: 'CARRY_OVER_CRISIS',
        title: 'Exam vs Revival',
        description: `Your 'Introduction to Organic Chemistry' exam is tomorrow morning. It's a 3-unit course. If your GP drops again, you're on probation.

But Mrs. Okafor just called. Her daughter has been possessed by a strange spirit since morning. She's screaming your name. "Pastor, only you can help us! The girl is levitating!"

The exam is 8 AM. The deliverance could take all night.`,
        conditions: [
            { type: 'act', act: 'SURVIVAL' },
            { type: 'week', operator: 'gte', value: 7 },
        ],
        choices: [
            {
                id: 'STUDY_FOR_EXAM',
                label: '📚 Study for Exam (God understands)',
                resultText: `You turn off your phone. You study mechanisms and reactions until your eyes bleed.

You pass the exam with a B. But when you turn on your phone, you see 15 missed calls. Mrs. Okafor called another pastor. "He is a true man of God," she tells the campus fellowship group later. "He didn't abandon his sheep for chemistry."`,
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 10 },
                    { type: 'stat', stat: 'integrity', operation: 'add', value: 5 },
                    { type: 'members', operation: 'subtract', value: 5 },
                ],
            },
            {
                id: 'DO_DELIVERANCE',
                label: '✝️ Go for Deliverance (Faith over F9)',
                resultText: `You rush to the Okafor's house. It is a battle. The girl is strong, breaking chairs and speaking Latin. You pray until 4 AM. She is finally free.

You stumble into the exam hall at 8 AM, smelling of olive oil and sweat. You stare at the paper. The Benzene rings look like demons.

You probably failed. But next Sunday, Mrs. Okafor testifies. The church is FULL.`,
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 25 },
                    { type: 'members', operation: 'add', value: 40 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 10 },
                    { type: 'stat', stat: 'health', operation: 'subtract', value: 15 },
                ],
            },
        ],
        isPermanent: false,
        priority: 50,
        oneTime: true,
        category: 'story',
    },

    {
        id: 'LECTURER_BRIBE',
        title: 'The Sadist Lecturer',
        description: `Dr. 'Terror' Banjo called you to his office. He's holding your assignment. It's marked 3/30.

"I see you are a pastor now," he sneers. "You are making noise every morning at the bus stop. Disturbing the peace."

He leans forward. "If you want to pass my course, you need to sow a seed. Into my life. ₦20,000. Cash. Or you can explain to your congregation why their pastor is a dropout."`,
        conditions: [
            { type: 'act', act: 'SURVIVAL' },
            { type: 'week', operator: 'gte', value: 10 },
        ],
        choices: [
            {
                id: 'PAY_BRIBE',
                label: '💸 Pay the bribe (Wisdom not foolishness)',
                resultText: `You take money from the church offering box. You hand it to him in an envelope. He smiles like a shark.

"Good boy. Go and sin no more."

You pass the course. But you feel dirty.`,
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'add', value: -20000 },
                    { type: 'stat', stat: 'integrity', operation: 'subtract', value: 20 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 10 },
                ],
                requirements: [
                    { type: 'stat', stat: 'churchCash', operator: 'gte', value: 20000 },
                ],
            },
            {
                id: 'REFUSE_BRIBE',
                label: '🚫 Refuse and Quote Scripture',
                resultText: `"Better is a little with righteousness than great revenues without right!" you declare.

Dr. Banjo laughs. "Amen o. Let us see if righteousness can calculate stoichiometry."

You get an F. You have to carry the course over. But word gets out. The Christian Union awards you "Student of Integrity."`,
                effects: [
                    { type: 'stat', stat: 'integrity', operation: 'add', value: 15 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 10 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 5 },
                ],
            },
        ],
        isPermanent: true,
        priority: 45,
        oneTime: true,
        category: 'story',
    },
];

export default act1Events;
