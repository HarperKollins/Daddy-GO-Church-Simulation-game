/**
 * Special Events - Crossover Night & Crusade Mode
 * 
 * These are the "massive events" that define Nigerian megachurch culture.
 * High-risk, high-reward gameplay moments.
 */

import type { GameEvent } from '@/types/game';

export const specialEvents: GameEvent[] = [
    // =========================================================================
    // CROSSOVER NIGHT - Dec 31st Special Event
    // =========================================================================
    {
        id: 'CROSSOVER_NIGHT_PREP',
        title: '🎆 Crossover Night is Coming!',
        description: `December 31st is approaching. Every Nigerian church goes ALL OUT for Crossover Night.

This is the night where destinies change. Where prayers at midnight break chains. Where you deliver your YEARLY PROPHECIES.

Your members are expecting something EPIC. How will you prepare?`,
        conditions: [
            { type: 'era', era: 'University' },
            { type: 'week', operator: 'gte', value: 48 }, // Near end of year
        ],
        choices: [
            {
                id: 'CROSSOVER_GO_BIG',
                label: '🏟️ Go BIG! Rent the biggest venue possible',
                resultText: `You rent out a stadium. Sound systems that shake foundations. LED screens. Live band. Generators for days.

The investment is MASSIVE. But when midnight strikes, and 50,000 people are shouting "FIRE!"...

It's worth every naira. This night will be remembered.`,
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'subtract', value: 500000 },
                    { type: 'members', operation: 'add', value: 500 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 30 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 10 },
                ],
                requirements: [
                    { type: 'stat', stat: 'churchCash', operator: 'gte', value: 500000 },
                ],
            },
            {
                id: 'CROSSOVER_MODEST',
                label: '🙏 Keep it spiritual. Intimate prayer session.',
                resultText: `Just you and the core members. Candles. Worship music. Genuine prayers from midnight to 6 AM.

No crowd. No hype. But something MOVES in the room.

Some cry. Some fall under the anointing. Some receive visions. This is the real thing.`,
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 25 },
                    { type: 'members', operation: 'add', value: 10 },
                    { type: 'stat', stat: 'integrity', operation: 'add', value: 15 },
                ],
            },
            {
                id: 'CROSSOVER_ONLINE',
                label: '📱 Go Viral! Live-stream the prophecies',
                resultText: `You set up cameras everywhere. "LIVE FROM LAGOS: PROPHECIES FOR 2027!"

Your "Yearly Prophecies" video gets 2 MILLION views. Some prophecies are bold. Some are vague. But people are SHARING.

"This pastor is different!" they say. The comments section is on fire.`,
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 50 },
                    { type: 'members', operation: 'add', value: 200 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 10 },
                ],
            },
        ],
        isPermanent: false,
        priority: 95,
        oneTime: false, // Repeats yearly
        category: 'story',
    },

    {
        id: 'YEARLY_PROPHECIES',
        title: '📜 Deliver Your Yearly Prophecies',
        description: `The clock strikes midnight. All eyes are on you. It's time to tell Nigeria what God says about the new year.

What kind of prophecies will you deliver?`,
        conditions: [
            { type: 'era', era: 'University' },
            { type: 'madeChoice', choiceId: 'CROSSOVER_GO_BIG' },
        ],
        choices: [
            {
                id: 'PROPHECY_BOLD',
                label: '⚡ BOLD: "A major politician will DIE!"',
                resultText: `The crowd gasps. Phones are recording. This prophecy will be everywhere by morning.

If it comes true, you become a LEGEND. If it doesn't... well, people have short memories, right?`,
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 40 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 20 },
                ],
            },
            {
                id: 'PROPHECY_SAFE',
                label: '✨ SAFE: "There will be economic challenges, BUT GOD..."',
                resultText: `Classic prosperity prophecy. Vague enough to be "accurate" no matter what happens.

"2027 will be a year of DOUBLE PORTION!" The crowd cheers. Nobody can fact-check vibes.`,
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 15 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 5 },
                ],
            },
            {
                id: 'PROPHECY_PERSONAL',
                label: '🎯 SPECIFIC: Call out members by name',
                resultText: `"I see someone whose name starts with... C! Yes, CHIOMA! God is about to OPEN DOORS for you!"

Chioma faints. Her family rushes forward. The testimony is already writing itself.

(You just guessed based on common names, but who's gonna know?)`,
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 25 },
                    { type: 'members', operation: 'add', value: 50 },
                    { type: 'stat', stat: 'integrity', operation: 'subtract', value: 15 },
                ],
            },
        ],
        isPermanent: false,
        priority: 90,
        oneTime: false,
        category: 'story',
    },

    // =========================================================================
    // CRUSADE MODE - High Stakes Mega Event
    // =========================================================================
    {
        id: 'CRUSADE_OPPORTUNITY',
        title: '⛺ Organize a Crusade?',
        description: `One of your deacons approaches you: "Pastor, the Lord has laid it on my heart... We should organize a CRUSADE."

A citywide outdoor revival. Thousands of souls. Miracles. Drama. But also: massive logistics, security concerns, and the ever-present threat of rain.

This could make you... or break you.`,
        conditions: [
            { type: 'era', era: 'University' },
            { type: 'stat', stat: 'fame', operator: 'gte', value: 20 },
            { type: 'week', operator: 'gte', value: 12 },
        ],
        choices: [
            {
                id: 'CRUSADE_FULL_SCALE',
                label: '🏟️ "Let\'s shake Lagos!" - Full-scale crusade',
                resultText: `Three nights. Tents. LED screens. Security. Sound that reaches the next state.

Night 1: Rain threatens but HOLDS OFF. "It's a miracle!"
Night 2: A woman claims healing from blindness. Video goes viral.
Night 3: The altar call brings 2,000 souls forward.

You are now a household name.`,
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'subtract', value: 1000000 },
                    { type: 'members', operation: 'add', value: 2000 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 60 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 20 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 8 },
                ],
                requirements: [
                    { type: 'stat', stat: 'churchCash', operator: 'gte', value: 1000000 },
                ],
            },
            {
                id: 'CRUSADE_BUDGET',
                label: '💰 "Start small" - Local community crusade',
                resultText: `One night. A field in your neighborhood. Basic sound. Volunteers handling security.

It's not glamorous, but 300 people come. 50 give their lives to Christ. 

Small beginnings, but genuine.`,
                effects: [
                    { type: 'stat', stat: 'churchCash', operation: 'subtract', value: 100000 },
                    { type: 'members', operation: 'add', value: 300 },
                    { type: 'stat', stat: 'fame', operation: 'add', value: 15 },
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 10 },
                ],
                requirements: [
                    { type: 'stat', stat: 'churchCash', operator: 'gte', value: 100000 },
                ],
            },
            {
                id: 'CRUSADE_DECLINE',
                label: '❌ "Not yet" - Focus on building the church first',
                resultText: `"Brother, the vision is good, but the timing is not right. Let us build our foundation first."

The deacon looks disappointed but nods. Perhaps he's right to wait. Or perhaps you just missed your moment.`,
                effects: [
                    { type: 'stat', stat: 'integrity', operation: 'add', value: 5 },
                ],
            },
        ],
        isPermanent: false,
        priority: 70,
        oneTime: true,
        category: 'opportunity',
    },

    {
        id: 'CRUSADE_DISASTER',
        title: '⚠️ CRUSADE CRISIS!',
        description: `Night 2 of the crusade. Everything is going well until...

STAMPEDE at the healing line! Someone yelled "FIRE!" and people are trampling each other. Cameras are recording. Police sirens in the distance.

How do you respond?`,
        conditions: [
            { type: 'madeChoice', choiceId: 'CRUSADE_FULL_SCALE' },
        ],
        choices: [
            {
                id: 'CRISIS_TAKE_CHARGE',
                label: '🏃 Run to the scene and take charge',
                resultText: `You grab the mic. "CALM DOWN IN THE NAME OF JESUS!"

Your voice cuts through the chaos. People stop. You direct the crowd. You personally help the injured.

The video of you heroically managing the crisis goes viral. "A true leader," they say.`,
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'add', value: 30 },
                    { type: 'stat', stat: 'integrity', operation: 'add', value: 20 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 10 },
                ],
            },
            {
                id: 'CRISIS_HIDE',
                label: '🚗 Escape through the back. Let security handle it.',
                resultText: `Your convoy speeds away. By morning, you're trending for the wrong reasons.

"Pastor abandoned his members during crisis!" The damage control is expensive.`,
                effects: [
                    { type: 'stat', stat: 'fame', operation: 'subtract', value: 20 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 35 },
                    { type: 'stat', stat: 'integrity', operation: 'subtract', value: 30 },
                ],
            },
            {
                id: 'CRISIS_PRAY',
                label: '🙏 Keep praying on stage. "The Lord is in control!"',
                resultText: `You continue the service as if nothing is happening. Some call it faith. Others call it denial.

The optics are mixed. Some praise your calm. Others question your humanity.`,
                effects: [
                    { type: 'stat', stat: 'anointing', operation: 'add', value: 10 },
                    { type: 'stat', stat: 'scandal', operation: 'add', value: 15 },
                ],
            },
        ],
        isPermanent: true,
        priority: 100,
        oneTime: true,
        category: 'crisis',
    },
];

export default specialEvents;
