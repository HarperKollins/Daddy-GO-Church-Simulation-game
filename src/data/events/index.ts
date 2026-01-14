/**
 * Master Event Index
 * 
 * Combines all event sources into a single exportable collection.
 * This is the central hub for the event system.
 */

// Import all event collections
import { randomEvents } from './randomEvents';
import { nigerianLifeEvents } from './nigerianLifeEvents';
import { familyEvents } from './familyEvents';
import { universityEvents } from './universityEvents';

import type { GameEvent } from '@/types/game';

// ============================================================================
// COMBINED EVENT COLLECTIONS
// ============================================================================

/**
 * All static events combined
 */
export const ALL_EVENTS: GameEvent[] = [
    ...randomEvents,
    ...nigerianLifeEvents,
    ...familyEvents,
    ...universityEvents,
];

/**
 * Events by category
 */
export const EVENTS_BY_CATEGORY = {
    random: ALL_EVENTS.filter(e => e.category === 'random'),
    crisis: ALL_EVENTS.filter(e => e.category === 'crisis'),
    story: ALL_EVENTS.filter(e => e.category === 'story'),
    opportunity: ALL_EVENTS.filter(e => e.category === 'opportunity'),
};

/**
 * Events by type
 */
export const EVENTS_BY_TYPE = {
    nigerian: nigerianLifeEvents,
    family: familyEvents,
    university: universityEvents,
    general: randomEvents,
};

// ============================================================================
// EVENT STATISTICS
// ============================================================================

export const EVENT_STATS = {
    total: ALL_EVENTS.length,
    byCategory: {
        random: EVENTS_BY_CATEGORY.random.length,
        crisis: EVENTS_BY_CATEGORY.crisis.length,
        story: EVENTS_BY_CATEGORY.story.length,
        opportunity: EVENTS_BY_CATEGORY.opportunity.length,
    },
    byType: {
        nigerian: nigerianLifeEvents.length,
        family: familyEvents.length,
        university: universityEvents.length,
        general: randomEvents.length,
    },
    oneTimeEvents: ALL_EVENTS.filter(e => e.oneTime).length,
    repeatableEvents: ALL_EVENTS.filter(e => !e.oneTime).length,
};

// ============================================================================
// RE-EXPORTS
// ============================================================================

export { randomEvents } from './randomEvents';
export { nigerianLifeEvents } from './nigerianLifeEvents';
export { familyEvents } from './familyEvents';
export { universityEvents } from './universityEvents';
