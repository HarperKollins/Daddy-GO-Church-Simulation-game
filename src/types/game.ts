/**
 * Core type definitions for Daddy G.O. Simulator
 * 
 * This file defines all the TypeScript interfaces for the game's state,
 * events, and mechanics. Designed to be extensible for future content.
 */

// ============================================================================
// CORE GAME STATE TYPES
// ============================================================================

/**
 * The five core stats that drive the game.
 * These are visible to the player in the UI stats bar.
 */
export interface CoreStats {
    /** Player's health/hunger (0-100). At 0 = Death/Faint */
    health: number;
    /** Personal wallet - siphoned from church, used for lifestyle */
    personalCash: number;
    /** Church wallet - earned from offerings, used for ministry */
    churchCash: number;
    /** Spiritual power. Hard to gain, unlocks miracles. (0-100) */
    anointing: number;
    /** Public hype/fame. Easy to gain, attracts members. (0-100) */
    fame: number;
    /** Risk meter. At 100 = Game Over/Jail (0-100) */
    scandal: number;
    /** Current Energy. Actions cost energy. Resets weekly. (0-100) */
    energy: number;
}

/**
 * Hidden flags that track permanent consequences and unlock paths.
 * These affect gameplay but are not shown directly to the player.
 */
export interface HiddenFlags {
    /** Moral integrity - affects late game outcomes */
    integrity: number;
    /** If true, real miracles are locked (chose arrangee path) */
    miracleLock: boolean;
    /** If true, player has taken church money for personal use */
    embezzlementUnlocked: boolean;
    /** If true, player chose the Yahoo path */
    yahooPath: boolean;
    /** If true, player sowed the seed instead of eating it */
    sowedTheSeed: boolean;
}

/**
 * Church progression state
 */
export interface ChurchState {
    /** Total church members */
    members: number;
    /** Current venue tier */
    venue: VenueTier;
    /** Church reputation (affects member growth) */
    reputation: number;
}

/**
 * Venue progression tiers
 */
export type VenueTier =
    | 'BUS_STOP'      // Starting point - no venue
    | 'CLASSROOM'     // First upgrade - rented classroom
    | 'TENT'          // Crusade tent
    | 'WAREHOUSE'     // Converted warehouse
    | 'DOME'          // Proper church building
    | 'STADIUM'       // Mega church
    | 'CITY_STATE';   // End game - owns entire district

/**
 * Game progression acts
 */
export type GameAct =
    | 'SURVIVAL'      // Act 1: University student, preaching at bus stops
    | 'THE_RISE'      // Act 2: First church, building foundation
    | 'THE_EMPIRE'    // Act 3: Mega church expansion
    | 'THE_KINGDOM';  // Act 4: Global power, political influence

/**
 * Education status for venue restrictions
 */
export type EducationStatus = 'Student' | 'Graduate' | 'Dropout';

/**
 * Ministry location affecting difficulty and resources
 */
export type MinistryLocation = 'Campus' | 'Village' | 'City';

// ============================================================================
// EVENT SYSTEM TYPES
// ============================================================================

/**
 * Condition types for event triggers
 */
export type ConditionOperator = 'gte' | 'lte' | 'eq' | 'neq' | 'gt' | 'lt';

export interface StatCondition {
    type: 'stat';
    stat: keyof CoreStats | keyof HiddenFlags;
    operator: ConditionOperator;
    value: number | boolean;
}

export interface FlagCondition {
    type: 'flag';
    flag: keyof HiddenFlags;
    value: boolean;
}

export interface ActCondition {
    type: 'act';
    act: GameAct;
}

export interface WeekCondition {
    type: 'week';
    operator: ConditionOperator;
    value: number;
}

export interface ChoiceCondition {
    type: 'madeChoice';
    choiceId: string;
}

export interface LocationCondition {
    type: 'location';
    location: MinistryLocation;
}

export type EventCondition =
    | StatCondition
    | FlagCondition
    | ActCondition
    | LocationCondition
    | WeekCondition
    | ChoiceCondition;

/**
 * Effects that choices can have on the game state
 */
export interface StatEffect {
    type: 'stat';
    stat: keyof CoreStats | keyof HiddenFlags;
    operation: 'add' | 'subtract' | 'set' | 'multiply';
    value: number;
}

export interface FlagEffect {
    type: 'flag';
    flag: keyof HiddenFlags;
    value: boolean;
}

export interface MemberEffect {
    type: 'members';
    operation: 'add' | 'subtract' | 'multiply';
    value: number;
}

export interface VenueEffect {
    type: 'venue';
    venue: VenueTier;
}

export interface ActEffect {
    type: 'act';
    act: GameAct;
}

export type EventEffect =
    | StatEffect
    | FlagEffect
    | MemberEffect
    | VenueEffect
    | ActEffect;

/**
 * A choice the player can make during an event
 */
export interface EventChoice {
    id: string;
    label: string;
    /** Flavor text shown after selection */
    resultText: string;
    /** Effects applied when this choice is made */
    effects: EventEffect[];
    /** Optional: requires specific conditions to be available */
    requirements?: EventCondition[];
    /** Optional: path this choice unlocks */
    unlocksPath?: string;
    /** Optional: triggers another event after this one */
    triggersEvent?: string;
}

/**
 * A game event that can be triggered
 */
export interface GameEvent {
    id: string;
    title: string;
    description: string;
    /** Conditions that must be met for this event to trigger */
    conditions: EventCondition[];
    /** Choices available to the player */
    choices: EventChoice[];
    /** If true, this event's choice is recorded permanently */
    isPermanent: boolean;
    /** Priority for event queue (higher = more likely to trigger first) */
    priority: number;
    /** If true, this event can only happen once per playthrough */
    oneTime: boolean;
    /** Category for organization */
    category: 'story' | 'random' | 'crisis' | 'opportunity';
}

// ============================================================================
// PLAYER STATE TYPES
// ============================================================================

/**
 * A permanent choice the player has made
 */
export interface PermanentChoice {
    eventId: string;
    choiceId: string;
    week: number;
}

export interface Partner {
    id: string;
    name: string;
    archetype: 'FAITHFUL_SISTER' | 'SLAY_QUEEN' | 'PASTOR_DAUGHTER' | 'CHOIR_MISTRESS';
    looks: number;
    spirituality: number;
    smarts: number;
    craziness: number;
    maintenanceCost: number;
    isWife?: boolean;
    description?: string;
}

export interface BabyMama {
    name: string;
    childName: string;
    weeklySupport: number;
    scandalThreat: number;
}

/**
 * The complete player state
 */
export interface PlayerState {
    name: string;
    age: number;
    week: number;
    isAlive: boolean;
    currentAct: GameAct;
    stats: CoreStats;
    hiddenFlags: HiddenFlags;
    church: ChurchState;
    permanentChoices: PermanentChoice[];
    /** IDs of one-time events that have been triggered */
    triggeredEvents: string[];
    /** Owned assets (vehicles, properties, investments) */
    assets: Asset[];
    /** Current romantic partner/spouse */
    partner: Partner | null;
    /** Baby Mamas / Children born out of wedlock */
    babyMamas: BabyMama[];
    /** Current main occupation (starts as Student) */
    occupation: 'Student' | 'Full-Time Pastor' | 'Graduate' | 'Dropout';
    /** Ministry location (affects difficulty and resources) */
    ministryLocation: MinistryLocation;
    /** Weeks spent at 0 health (death after 104 weeks / 2 years) */
    weeksAtZeroHealth: number;
    /** University year (200L = Year 2, 500L = Final Year) */
    uniYear: '200L' | '300L' | '400L' | '500L' | 'Graduate';
    /** Relationship status */
    relationshipStatus: 'Single' | 'Dating' | 'Engaged' | 'Married';
    /** Weeks in current relationship */
    relationshipWeeks: number;
    /** Skills for pastor development */
    skills: PastorSkills;
    /** Social media presence */
    socialMedia: SocialMediaPresence;
}

/**
 * Pastor skill levels (1-10 each)
 */
export interface PastorSkills {
    preaching: number;   // Cash from sermons
    healing: number;     // Miracle success rate
    charisma: number;    // Member recruitment
    business: number;    // Investment returns
    politics: number;    // Scandal resistance
}

/**
 * Social media presence
 */
export interface SocialMediaPresence {
    youtubeSubscribers: number;
    spotifyListeners: number;
    sermonsUploaded: number;
    weeklyViews: number;
}

// ============================================================================
// ASSET & CONTENT TYPES (For Phase 4)
// ============================================================================

/**
 * Guest minister archetype
 */
export interface GuestMinister {
    id: string;
    name: string;
    archetype: 'FIRE_BRAND' | 'PROSPERITY' | 'DELIVERANCE' | 'MOTIVATIONAL' | 'CONTROVERSIAL';
    costToBook: number;
    effects: EventEffect[];
    scandalRisk: number;
    fameBoost: number;
    /** Minimum venue tier required to book */
    minVenue: VenueTier;
}

/**
 * Asset types the player can own
 */
export interface Asset {
    id: string;
    name: string;
    category: 'vehicle' | 'property' | 'investment';
    cost: number;
    weeklyMaintenance: number;
    fameBonus: number;
    /** For investments: volatility rating 0-100 */
    volatility?: number;
    /** For investments: rug pull probability 0-1 */
    rugPullChance?: number;
}

/**
 * Relationship partner
 */
export interface Partner {
    id: string;
    name: string;
    archetype: 'FAITHFUL_SISTER' | 'SLAY_QUEEN' | 'PASTOR_DAUGHTER' | 'CHOIR_MISTRESS';
    looks: number;        // 0-100
    spirituality: number; // 0-100
    smarts: number;       // 0-100
    craziness: number;    // 0-100 (hidden volatility)
    maintenanceCost: number;
}
