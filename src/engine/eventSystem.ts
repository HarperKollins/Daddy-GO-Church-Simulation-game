/**
 * Event System Engine
 * 
 * This module handles the evaluation and triggering of game events.
 * Events are the primary way players experience the narrative through
 * choices that have lasting consequences.
 * 
 * Cultural Context:
 * Nigerian church culture is rich with dramatic events - miracles,
 * scandals, political maneuvering, and moral dilemmas. This system
 * is designed to capture that complexity while remaining mechanically fair.
 */

import type {
    GameEvent,
    EventCondition,
    EventChoice,
    PlayerState
} from '@/types/game';

// ============================================================================
// CONDITION EVALUATION
// ============================================================================

/**
 * Evaluates a single condition against the current game state
 */
export const evaluateCondition = (
    condition: EventCondition,
    state: PlayerState
): boolean => {
    switch (condition.type) {
        case 'stat': {
            const statValue = condition.stat in state.stats
                ? state.stats[condition.stat as keyof typeof state.stats]
                : state.hiddenFlags[condition.stat as keyof typeof state.hiddenFlags];

            if (typeof statValue === 'boolean') {
                return condition.operator === 'eq'
                    ? statValue === condition.value
                    : statValue !== condition.value;
            }

            const numValue = statValue as number;
            const targetValue = condition.value as number;

            switch (condition.operator) {
                case 'gte': return numValue >= targetValue;
                case 'lte': return numValue <= targetValue;
                case 'gt': return numValue > targetValue;
                case 'lt': return numValue < targetValue;
                case 'eq': return numValue === targetValue;
                case 'neq': return numValue !== targetValue;
                default: return false;
            }
        }

        case 'flag':
            return state.hiddenFlags[condition.flag] === condition.value;

        case 'location':
            return state.ministryLocation === condition.location;



        case 'week': {
            const weekValue = state.week;
            const targetWeek = condition.value;
            switch (condition.operator) {
                case 'gte': return weekValue >= targetWeek;
                case 'lte': return weekValue <= targetWeek;
                case 'gt': return weekValue > targetWeek;
                case 'lt': return weekValue < targetWeek;
                case 'eq': return weekValue === targetWeek;
                case 'neq': return weekValue !== targetWeek;
                default: return false;
            }
        }

        case 'madeChoice':
            return state.permanentChoices.some(c => c.choiceId === condition.choiceId);

        default:
            return false;
    }
};

/**
 * Evaluates all conditions for an event (AND logic)
 */
export const evaluateAllConditions = (
    conditions: EventCondition[],
    state: PlayerState
): boolean => {
    if (conditions.length === 0) return true;
    return conditions.every(condition => evaluateCondition(condition, state));
};

// ============================================================================
// EVENT FILTERING & SELECTION
// ============================================================================

/**
 * Filters available events based on current game state
 */
export const getAvailableEvents = (
    events: GameEvent[],
    state: PlayerState
): GameEvent[] => {
    return events.filter(event => {
        // Skip one-time events that have already triggered
        if (event.oneTime && state.triggeredEvents.includes(event.id)) {
            return false;
        }

        // Check all conditions
        return evaluateAllConditions(event.conditions, state);
    });
};

/**
 * Filters available choices for an event based on requirements
 */
export const getAvailableChoices = (
    event: GameEvent,
    state: PlayerState
): EventChoice[] => {
    return event.choices.filter(choice => {
        if (!choice.requirements) return true;
        return evaluateAllConditions(choice.requirements, state);
    });
};

/**
 * Selects a random event from available events, weighted by priority
 */
export const selectRandomEvent = (events: GameEvent[]): GameEvent | null => {
    if (events.length === 0) return null;

    // Weight by priority
    const totalWeight = events.reduce((sum, e) => sum + e.priority, 0);
    let random = Math.random() * totalWeight;

    for (const event of events) {
        random -= event.priority;
        if (random <= 0) return event;
    }

    return events[events.length - 1];
};

// ============================================================================
// EVENT QUEUE MANAGEMENT
// ============================================================================

/**
 * Event queue for managing multiple triggered events
 */
export class EventQueue {
    private queue: GameEvent[] = [];

    push(event: GameEvent): void {
        // Insert sorted by priority (higher first)
        const index = this.queue.findIndex(e => e.priority < event.priority);
        if (index === -1) {
            this.queue.push(event);
        } else {
            this.queue.splice(index, 0, event);
        }
    }

    pop(): GameEvent | undefined {
        return this.queue.shift();
    }

    peek(): GameEvent | undefined {
        return this.queue[0];
    }

    isEmpty(): boolean {
        return this.queue.length === 0;
    }

    clear(): void {
        this.queue = [];
    }

    get length(): number {
        return this.queue.length;
    }
}

// ============================================================================
// RANDOM EVENT ROLL
// ============================================================================

/**
 * Rolls for a random event based on probability.
 * Base chance is 30%, modified by various factors.
 */
export const rollForRandomEvent = (
    events: GameEvent[],
    state: PlayerState,
    baseChance: number = 0.3
): GameEvent | null => {
    // Random events based on certain conditions
    const randomEvents = events.filter(e => e.category === 'random');
    const availableRandom = getAvailableEvents(randomEvents, state);

    // Roll dice
    if (Math.random() > baseChance) return null;

    return selectRandomEvent(availableRandom);
};

/**
 * Gets the next story event that should trigger
 */
export const getNextStoryEvent = (
    events: GameEvent[],
    state: PlayerState
): GameEvent | null => {
    const storyEvents = events.filter(e => e.category === 'story');
    const available = getAvailableEvents(storyEvents, state);

    // Story events trigger in priority order
    if (available.length === 0) return null;

    return available.sort((a, b) => b.priority - a.priority)[0];
};
