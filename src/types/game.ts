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
 * Core stats that drive the game (0-10000 scale for granular progression)
 * These are visible to the player in the UI stats bar.
 * 
 * Scale Reference:
 * - 0-500: Critical/Very Low
 * - 500-2000: Low
 * - 2000-4000: Below Average
 * - 4000-6000: Average
 * - 6000-8000: Above Average
 * - 8000-9500: High
 * - 9500-10000: Maximum/Elite
 */
export interface CoreStats {
    /** Player's health/hunger (0-10000). At 0 = Death/Faint */
    health: number;
    /** Personal wallet - siphoned from church, used for lifestyle (unlimited Naira) */
    personalCash: number;
    /** Church wallet - earned from offerings, used for ministry (unlimited Naira) */
    churchCash: number;
    /** Spiritual power. Hard to gain, unlocks miracles. (0-10000) */
    anointing: number;
    /** Public hype/fame. Easy to gain, attracts members. (0-10000) */
    fame: number;
    /** Risk meter. At 10000 = Game Over/Jail (0-10000) */
    scandal: number;
    /** Current Energy. Actions cost energy. Resets weekly. (0-1000) */
    energy: number;
    /** Stress level - affects health decay and decision quality (0-10000) */
    stress: number;
    /** Political/Social influence (0-10000) - unlocks political connections */
    influence: number;
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

    /** CORE ENGINE STATE (Meta Expansion) */
    engine: EngineState;
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

// ============================================================================
// KARMA & CAUSALITY SYSTEM (Mega Expansion)
// ============================================================================

/**
 * Hidden karma tracking - every action has consequences
 */
export interface KarmaLedger {
    positiveKarma: KarmaEntry[];
    negativeKarma: KarmaEntry[];
    netKarma: number;  // Running total (-10000 to +10000)
}

export interface KarmaEntry {
    action: string;
    week: number;
    karmaValue: number;
    resolved: boolean;
    consequenceEventId?: string;
}

/**
 * Causality System - delayed consequences for actions
 */
export interface ConsequenceChain {
    triggerId: string;
    triggerWeek: number;
    triggerAction: string;
    consequences: PendingConsequence[];
}

export interface PendingConsequence {
    id: string;
    delayWeeks: number;
    probability: number;
    severity: 'minor' | 'moderate' | 'major' | 'catastrophic';
    eventTemplate: string;
    modifiedBy: string[];
    fired: boolean;
}

// ============================================================================
// FAMILY SYSTEM (Mega Expansion)
// ============================================================================

/**
 * Complete family tree tracking
 */
export interface FamilyTree {
    immediate: {
        mother: FamilyMember;
        father: FamilyMember;
        siblings: FamilyMember[];
    };
    extended: {
        uncles: FamilyMember[];
        aunties: FamilyMember[];
        grandparents: FamilyMember[];
        cousins: FamilyMember[];
    };
    created: {
        spouse: FamilyMember | null;
        children: FamilyMember[];
        inLaws: FamilyMember[];
    };
}

export interface FamilyMember {
    id: string;
    name: string;
    relationship: string;
    gender: 'male' | 'female';
    personality: FamilyPersonality;
    healthStatus: 'healthy' | 'sick' | 'critical' | 'deceased';
    financialStatus: 'wealthy' | 'stable' | 'struggling' | 'poor';
    relationshipWithPlayer: number;  // -100 to +100
    hasRequestedMoney: boolean;
    pendingFavor: string | null;
    lastInteractionWeek: number;
}

export interface FamilyPersonality {
    supportiveness: number;   // 0-100
    greediness: number;       // 0-100
    religiosity: number;      // 0-100
    dramaLevel: number;       // 0-100
}

// ============================================================================
// PERSONALITY & ML-LITE ENGINE (Mega Expansion)
// ============================================================================

/**
 * Player personality profiling - calculated from choices
 */
export interface PlayerPersonality {
    morality: number;        // -100 (evil) to +100 (saint)
    ambition: number;        // 0 (content) to 100 (power-hungry)
    spirituality: number;    // 0 (fake) to 100 (genuine)
    riskTolerance: number;   // 0 (safe) to 100 (reckless)
    empathy: number;         // 0 (selfish) to 100 (selfless)
    choiceHistory: ChoiceRecord[];
    dominantTraits: string[];
}

export interface ChoiceRecord {
    eventId: string;
    choiceId: string;
    week: number;
    category: string;
    moralWeight: number;
    outcome: 'positive' | 'negative' | 'neutral';
}

// ============================================================================
// NIGERIAN LIFE SIMULATION (Mega Expansion)
// ============================================================================

/**
 * Daily struggles that affect gameplay
 */
export interface DailyStruggles {
    power: number;           // 0-100 (power availability)
    traffic: number;         // 0-100 (congestion level)
    fuelPrice: number;       // Current naira per liter
    bankWorking: boolean;    // Is banking system functional?
    networkSignal: number;   // 0-100 (MTN reliability)
}

/**
 * Location-specific modifiers
 */
export type CityLocation = 'Lagos' | 'Abuja' | 'PortHarcourt' | 'Village' | 'Ibadan';

export interface LocationModifiers {
    costMultiplier: number;
    memberGrowthRate: number;
    scandalSpreadRate: number;
    politicalAccess: number;
    cultPressure: number;
}

// ============================================================================
// ACHIEVEMENTS & RIBBONS (Mega Expansion)
// ============================================================================

/**
 * Hidden achievements players can unlock
 */
export interface Achievement {
    id: string;
    name: string;
    description: string;
    condition: string;
    unlocked: boolean;
    unlockedWeek?: number;
    secret: boolean;
}

/**
 * End-game ribbons awarded based on gameplay
 */
export interface Ribbon {
    id: string;
    name: string;
    emoji: string;
    condition: string;
}

/**
 * Timeline entry for ministry history
 */
export interface TimelineEntry {
    week: number;
    event: string;
    category: 'milestone' | 'scandal' | 'miracle' | 'family' | 'financial';
    impact: 'positive' | 'negative' | 'neutral';
}

// ============================================================================
// ENHANCED PLAYER STATE (Mega Expansion)
// ============================================================================

/**
 * Extended state for mega expansion features
 */
export interface ExtendedPlayerState extends PlayerState {
    engine: EngineState;
    karma: KarmaLedger;
    family: FamilyTree;
    personality: PlayerPersonality;
    consequenceChains: ConsequenceChain[];
    pendingConsequences: PendingConsequence[];
    timeline: TimelineEntry[];
    achievements: Achievement[];
    dailyStruggles: DailyStruggles;
    cityLocation: CityLocation;
    hasCompletedOnboarding: boolean; // NEW: Track if player completed onboarding
}

// ============================================================================
// ENGINE STATE TYPES (Added for Meta Expansion)
// ============================================================================

// TESTIMONY SYSTEM
export interface Testimony {
    id: string;
    type: TestimonyType;
    title: string;
    description: string;
    week: number;
    truthPercentage: number;
    embellishmentLevel: number;
    believabilityScore: number;
    verificationRisk: number;
    impactScore: number;
    witnesses: string[];
    timesShared: number;
    hasBeenExposed: boolean;
    exposureWeek?: number;
}

export type TestimonyType = 'healing' | 'financial_breakthrough' | 'deliverance' | 'marriage' | 'visa_miracle' | 'job_promotion' | 'protection' | 'prophecy_fulfilled' | 'child_miracle' | 'enemy_defeated';

export interface TestimonyInventory {
    collected: Testimony[];
    fabricated: Testimony[];
    shared: string[];
    exposedCount: number;
    totalCredibility: number;
}

// PROPHECY SYSTEM
export interface Prophecy {
    id: string;
    type: ProphecyType;
    specificity: 'vague' | 'moderate' | 'specific' | 'extremely_specific';
    content: string;
    targetPerson?: string;
    targetNation?: string;
    predictedWeek?: number;
    givenWeek: number;
    status: 'pending' | 'fulfilled' | 'failed' | 'expired' | 'covered_up';
    fulfillmentWeek?: number;
    verifiable: boolean;
    witnesses: string[];
    publiclyShared: boolean;
    reputationAtStake: number;
}

export type ProphecyType = 'personal_blessing' | 'warning' | 'healing' | 'marriage' | 'financial' | 'political' | 'national' | 'death' | 'disaster' | 'election';

export interface PropheticTrackRecord {
    totalProphecies: number;
    fulfilled: number;
    failed: number;
    pending: number;
    coveredUp: number;
    publicAccuracy: number;
    actualAccuracy: number;
    reputation: number;
}

// NPC & RELATIONSHIP SYSTEM
export interface NPC {
    id: string;
    name: string;
    type: NPCType;
    relationship: number; // -100 to 100
    disposition: 'ally' | 'neutral' | 'rival' | 'enemy';
    memories: NPCMemory[];
    secrets: string[];
    influence: number;
    lastInteraction: number;
    meetCount: number;
    traits: string[];
    canExpose: boolean;
    isRecurring: boolean;
}

export type NPCType = 'family_member' | 'church_member' | 'rival_pastor' | 'journalist' | 'politician' | 'businessperson' | 'efcc_agent' | 'former_member' | 'romantic_interest' | 'staff' | 'mentor';

export interface NPCMemory {
    id: string;
    week: number;
    eventType: string;
    playerAction: string;
    impact: 'very_positive' | 'positive' | 'neutral' | 'negative' | 'very_negative';
    emotionalWeight: number;
    canReference: boolean;
    decayRate: number;
}

export interface RelationshipGraph {
    npcs: Record<string, NPC>;
    connections: NPCConnection[];
    infoSpread: InfoSpread[];
}

export interface NPCConnection {
    npc1Id: string;
    npc2Id: string;
    relationship: 'family' | 'friends' | 'colleagues' | 'lovers' | 'enemies' | 'acquaintances';
    trustLevel: number;
}

export interface InfoSpread {
    originNpcId: string;
    targetNpcId: string;
    info: string;
    week: number;
    spread: boolean;
}

// TITLE PROGRESSION
export interface PastoralTitle {
    id: string;
    name: string;
    prefix: string;
    tier: number;
    requirements: TitleRequirements;
    perks: TitlePerks;
    socialWeight: number;
    description: string;
}

export interface TitleRequirements {
    minMembers?: number;
    minAnointing?: number;
    minFame?: number;
    minWeeks?: number;
    ordainedBy?: string;
    bibleSchool?: boolean;
    propheciesGiven?: number;
    churchesPlanted?: number;
}

export interface TitlePerks {
    fameMultiplier: number;
    offeringMultiplier: number;
    credibilityBonus: number;
    unlockedActions: string[];
}

export interface AnointingState {
    currentLevel: number;
    peakLevel: number;
    withdrawalLevel: number;
    lastHighWeek: number;
    addictionLevel: number;
    tolerance: number;
}

// PSYCHOLOGICAL HOOKS
export interface LoginStreak {
    currentStreak: number;
    longestStreak: number;
    lastLoginDate: string;
    totalLogins: number;
    missedDays: number;
    streakProtections: number;
}

export interface DailyReward {
    day: number;
    type: 'cash' | 'anointing' | 'fame' | 'energy' | 'mystery' | 'premium';
    baseAmount: number;
    multiplier: number;
    description: string;
}

export interface FOMOEvent {
    id: string;
    name: string;
    description: string;
    expiresInWeeks: number;
    reward: Record<string, number>;
    cost: number;
    risk: number;
    urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface PendingResult {
    id: string;
    type: 'prophecy' | 'investment' | 'healing' | 'application' | 'court_case';
    description: string;
    submittedWeek: number;
    revealWeek: number;
    possibleOutcomes: string[];
    suspenseLevel: number;
}

export interface SunkCostTrap {
    id: string;
    name: string;
    totalInvested: number;
    timeInvested: number;
    emotionalInvestment: number;
    currentValue: number;
    abandonPenalty: string;
    continueMessage: string;
}

// CHURCH POLITICS
export interface ChurchPolitics {
    factions: ChurchFaction[];
    overallUnity: number;
    publicScandals: number;
    suppressedDissent: number;
    lastSplit: number;
    splitHistory: ChurchSplit[];
}

export interface ChurchFaction {
    id: string;
    name: string;
    leader: string;
    leaderType: 'pastor' | 'elder' | 'deacon' | 'wealthy_member' | 'founder_family';
    memberCount: number;
    loyalty: number;
    grievance: string;
    power: number;
    openlyDefiant: boolean;
    weekFormed: number;
}

export interface ChurchSplit {
    week: number;
    factionName: string;
    membersLost: number;
    reason: string;
    newChurchName: string;
    stillRival: boolean;
}

// SEED FAITH
export interface SeedFaithCampaign {
    id: string;
    name: string;
    theme: SeedTheme;
    targetAmount: number;
    promisedReturn: string;
    promisedMultiplier: number;
    testimoniesUsed: number;
    urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
    durationWeeks: number;
    startWeek: number;
    totalCollected: number;
    participantCount: number;
    successfulTestimonies: number;
    failedTestimonies: number;
}

export type SeedTheme = 'breakthrough' | 'debt_cancellation' | 'visa_miracle' | 'marriage' | 'healing' | 'enemy_destruction' | 'business_growth' | 'protection' | 'generational_curse_breaking';

// DYNASTY & SUCCESSION
export interface Dynasty {
    founderName: string;
    foundedWeek: number;
    currentGeneration: number;
    peakMembers: number;
    peakWealth: number;
    totalWeeks: number;
    successors: Successor[];
    chosenSuccessor: string | null;
    successionPlan: SuccessionPlan | null;
    legacy: LegacyItem[];
}

export interface Successor {
    id: string;
    name: string;
    relationship: 'child' | 'spiritual_son' | 'trusted_pastor' | 'family_member' | 'outsider';
    age: number;
    competence: number;
    loyalty: number;
    publicImage: number;
    spiritualGifts: string[];
    education: string[];
    yearsInMinistry: number;
    approved: boolean;
    congregationApproval: number;
    boardApproval: number;
    scandalRisk: number;
    hiddenAgenda: string | null;
}

export interface SuccessionPlan {
    type: 'immediate' | 'gradual' | 'post_death' | 'contested';
    transitionWeeks: number;
    powerSharing: boolean;
    conflictRisk: number;
    publicAnnounced: boolean;
}

export interface LegacyItem {
    id: string;
    type: 'institution' | 'building' | 'doctrine' | 'scandal' | 'achievement';
    name: string;
    description: string;
    impact: number;
    weekCreated: number;
}

export interface PastorChild {
    id: string;
    name: string;
    gender: 'male' | 'female';
    birthWeek: number;
    currentAge: number;
    personality: ChildPersonality;
    inMinistry: boolean;
    rebelling: boolean;
    publicScandal: boolean;
    education: 'none' | 'primary' | 'secondary' | 'university' | 'bible_school' | 'abroad';
    careerPath: 'ministry' | 'business' | 'professional' | 'undecided' | 'reject_all';
    relationshipWithDaddy: number;
}

export interface ChildPersonality {
    spirituality: number;
    ambition: number;
    obedience: number;
    charisma: number;
    integrity: number;
}

// SPIRITUAL WARFARE
export interface SpiritualState {
    protectionLevel: number;
    vulnerabilities: string[];
    activeBlessing: Blessing | null;
    activeCurse: Curse | null;
    prayerPower: number;
    fastingBonus: number;
    lastDeliverance: number;
    demonsFought: string[];
    demonsDefeated: string[];
}

export interface DemonEntity {
    id: string;
    name: string;
    tier: 'minor' | 'major' | 'principality' | 'territorial';
    domain: string;
    strength: number;
    weakness: string[];
    unlockCondition: string;
}

export interface Blessing {
    id: string;
    name: string;
    source: string;
    strength: number;
    duration: number;
    effects: Record<string, number>;
}

export interface Curse {
    id: string;
    name: string;
    source: string;
    strength: number;
    breakCondition: string;
    effects: Record<string, number>;
}

// ECONOMY & CRYPTO
export interface CryptoAsset {
    id: string;
    name: string;
    symbol: string;
    priceNGN: number;
    volatility: number;
    category: 'major' | 'altcoin' | 'memecoin' | 'scam';
    description: string;
    riskLevel: number;
}

export interface CryptoPortfolio {
    holdings: CryptoHolding[];
    totalInvested: number;
    realizedGains: number;
    unrealizedGains: number;
}

export interface CryptoHolding {
    assetId: string;
    amount: number;
    buyPrice: number;
    buyWeek: number;
}

export interface EconomicState {
    nairaToUSD: number;
    inflationRate: number;
    fuelPrice: number;
    electricityTariff: number;
    minimumWage: number;
    unemploymentRate: number;
    cryptoBan: boolean;
}

export interface Investment {
    id: string;
    name: string;
    category: 'stocks' | 'real_estate' | 'bonds' | 'business' | 'crypto' | 'ponzi';
    minimumAmount: number;
    expectedReturn: number;
    risk: number;
    lockupWeeks: number;
    description: string;
}

// PERSONAL DEVELOPMENT
export interface DevelopmentState {
    booksRead: string[];
    currentlyReading: ReadingProgress[];
    podcastsSubscribed: string[];
    coursesCompleted: string[];
    currentCourses: Array<{ courseId: string; startWeek: number; progress: number }>;
    totalReadingHours: number;
    skillBoosts: Record<string, number>;
}

export interface ReadingProgress {
    bookId: string;
    startWeek: number;
    currentPage: number;
    totalPages: number;
    completed: boolean;
    completedWeek?: number;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    category: 'spiritual' | 'business' | 'leadership' | 'psychology' | 'health' | 'controversial';
    cost: number;
    readingWeeks: number;
    effects: Record<string, number>;
    prerequisite?: string;
    description: string;
}

export interface Podcast {
    id: string;
    name: string;
    host: string;
    category: 'ministry' | 'business' | 'motivation' | 'news' | 'entertainment';
    weeklyListeningHours: number;
    weeklyEffects: Record<string, number>;
    description: string;
}

export interface Course {
    id: string;
    name: string;
    provider: string;
    category: 'theology' | 'business' | 'counseling' | 'media' | 'tech';
    cost: number;
    durationWeeks: number;
    certification: boolean;
    effects: Record<string, number>;
    unlocks?: string[];
    description: string;
}

// REALISM & EVENTS
export interface OwambeEvent {
    id: string;
    type: 'wedding' | 'burial' | 'chieftaincy' | 'thanksgiving' | 'launch' | 'birthday';
    host: string;
    venue: string;
    estimatedGuests: number;
    dressCode: string;
    networkingPotential: number;
    cost: number;
    politicalImportance: number;
    description: string;
}

export interface ConstructionProject {
    id: string;
    type: 'auditorium' | 'parsonage' | 'school' | 'hospital' | 'university';
    estimatedCost: number;
    actualCost: number;
    estimatedWeeks: number;
    actualWeeks: number;
    progress: number;
    contractorReliability: number;
    problemsEncountered: ConstructionProblem[];
    fundingGap: number;
}

export interface ConstructionProblem {
    type: 'stolen_materials' | 'land_dispute' | 'contractor_fled' | 'government_seal' | 'cost_overrun' | 'structural_issue' | 'community_opposition';
    week: number;
    cost: number;
    description: string;
    resolved: boolean;
}

export interface ChoirDrama {
    id: string;
    type: 'power_tussle' | 'affair' | 'resignation' | 'song_conflict' | 'dress_code' | 'jealousy' | 'spiritual_pride';
    description: string;
    severity: 'minor' | 'major' | 'church_splitting';
    involvedParties: string[];
    publicKnowledge: boolean;
}



export interface ThanksgivingService {
    id: string;
    hostName: string;
    reason: string;
    plannedDonation: number;
    actualDonation: number;
    publicExpectation: number;
    pressureApplied: boolean;
    embarrassed: boolean;
    testimonyClaimed: string;
    testimonyVerifiable: boolean;
}

export interface ChurchStaff {
    id: string;
    name: string;
    position: string;
    salary: number;
    yearsOfService: number;
    competence: number;
    loyalty: number;
    ambition: number;
    hasGrievance: boolean;
    grievanceType: string | null;
    informant: boolean;
}


export interface ChurchMother {
    id: string;
    name: string;
    powerLevel: number; // 0-100 influence
    wealth: 'wealthy' | 'comfortable' | 'average';
    demands: string[];
    isHappy: boolean;
    giftHistory: number; // Total value of gifts given by her
    scandalKnowledge: string[];

    // Merged fields
    yearsInChurch: number;
    loyaltyToPastor: number;
    loyaltyToWife: number;
    faction: string | null;
    specialPowers: string[];
}

export interface StaffDrama {
    type: 'salary_complaint' | 'favoritism' | 'embezzlement' | 'coup_planning' | 'affair_with_member' | 'power_grab' | 'sabotage';
    involvedStaff: string[];
    description: string;
    evidence: boolean;
    actionRequired: 'ignore' | 'warn' | 'fire' | 'compensate' | 'promote';
}

// ADVANCED ML ENGINE
export interface DeepPlayerProfile {
    engagementScore: number;
    churnRisk: number;
    monetizationPotential: number;
    sessionPatterns: SessionPattern[];
    primaryArchetype: PlayerArchetype;
    secondaryArchetype: PlayerArchetype | null;
    archetypalStrength: number;
    predictedEndWeek: number;
    predictedEnding: string;
    predictedMemberCount: number;
    currentDifficulty: number;
    frustrationLevel: number;
    longestStreak: number;
    averageSessionLength: number;
    preferredEventTypes: string[];
    avoidedEventTypes: string[];
}

export interface PlayerBehaviorPattern {
    pattern: string;
    confidence: number;
    firstDetected: number;
    occurrences: number;
    prediction: string;
}

export interface SessionPattern {
    dayOfWeek: number;
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    averageActions: number;
}

export type PlayerArchetype = 'THE_SAINT' | 'THE_HUSTLER' | 'THE_POLITICIAN' | 'THE_CELEBRITY' | 'THE_FAMILY_MAN' | 'THE_CHAMELEON' | 'THE_RISK_TAKER' | 'THE_CONSERVATIVE' | 'THE_EXPLOITER';

// ===================================
// MASTER ENGINE STATE
// ===================================

export interface EngineState {
    testimony: {
        inventory: TestimonyInventory;
    };
    prophecy: {
        trackRecord: PropheticTrackRecord;
        activeProphecies: Prophecy[];
    };
    npc: {
        graph: RelationshipGraph;
    };
    title: {
        current: PastoralTitle;
        anointing: AnointingState;
    };
    psychology: {
        loginStreak: LoginStreak;
        pendingResults: PendingResult[];
        sunkCostTraps: SunkCostTrap[];
    };
    politics: {
        state: ChurchPolitics;
    };
    seedFaith: {
        activeCampaign: SeedFaithCampaign | null;
    };
    dynasty: {
        state: Dynasty;
    };
    spiritual: {
        state: SpiritualState;
    };
    economy: {
        portfolio: CryptoPortfolio;
        marketState: EconomicState;
        activeInvestments: Investment[];
        cryptoAssets: CryptoAsset[]; // Added this
    };
    development: {
        state: DevelopmentState;
    };
    realism: {
        activeConstruction: ConstructionProject | null;
        activeStaff: ChurchStaff[];
        activeMothers: ChurchMother[];
        upcomingOwambes: OwambeEvent[];
    };
    ml: {
        profile: DeepPlayerProfile;
        patterns: PlayerBehaviorPattern[];
    };
}
