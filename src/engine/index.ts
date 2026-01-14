/**
 * Master Engine Index
 * 
 * Exports all game engines from a single point.
 */

// Causality System
export {
    registerConsequence,
    processPendingConsequences,
    calculateKarmaImpact,
    addKarmaEntry,
    getKarmaTier,
    generateNearMiss,
    createEmptyKarmaLedger,
    CONSEQUENCE_CHAINS,
} from './causalityEngine';

// Personality Engine
export {
    createEmptyPersonality,
    recordChoiceAndUpdatePersonality,
    calculateEventWeight,
    detectStoryArc,
    getEndingType,
    getPersonalitySummary,
} from './personalityEngine';

// Achievements Engine
export {
    ACHIEVEMENTS,
    RIBBONS,
    MILESTONES,
    checkAchievement,
    checkAllAchievements,
    getNewlyUnlocked,
    calculateRibbons,
    checkMemberMilestone,
} from './achievementsEngine';

// Story Generator
export {
    generateEventFromTemplate,
    generateProceduralEvent,
    EVENT_TEMPLATES,
    VARIABLE_POOLS,
} from './storyGenerator';

// Event System (existing)
export {
    evaluateCondition,
    getAvailableEvents,
    selectRandomEvent,
    EventQueue,
} from './eventSystem';

// Advanced ML Engine
export {
    detectBehaviorPatterns,
    classifyPlayerArchetype,
    calculateAdaptiveDifficulty,
    calculateFrustration,
    calculateEngagement,
    predictChurnRisk,
    generateOptimalEvent,
    createDeepProfile,
} from './advancedMLEngine';

// Universal Laws Engine
export {
    applyInertia,
    applyF_MA,
    applyActionReaction,
    applyReapWhatYouSow,
    applyLawOfIncrease,
    calculatePersecutionRisk,
    processGenerationalEffects,
    applyMurphysLaw,
    applyParetoToOfferings,
    applyDiminishingReturns,
    checkPeterPrinciple,
    applyCompoundGrowth,
    applyEntropy,
    LAWS,
} from './universalLawsEngine';

// Spiritual Warfare Engine
export {
    DEMONS,
    JUJU_OPTIONS,
    fightDemon,
    generateDeliveranceSession,
    conductDeliverance,
    processJujuConsequences,
    calculatePrayerPower,
    createDefaultSpiritualState,
} from './spiritualWarfareEngine';

// Economy Engine (2026)
export {
    CRYPTO_ASSETS,
    INVESTMENTS,
    ECONOMY_2026,
    simulateCryptoPrices,
    buyCrypto,
    calculatePortfolioValue,
    applyInflation,
    calculateInvestmentReturn,
    getBlackMarketRate,
    buyDollarsBlackMarket,
    createEmptyPortfolio,
} from './economyEngine';

// Nightlife Engine
export {
    NIGHTLIFE_VENUES,
    CLUB_ACTIVITIES,
    LIFESTYLE_ITEMS,
    processClubNight,
    processSecretRelationship,
    getUnlockedVenues,
} from './nightlifeEngine';

// Ministry Hosting Engine
export {
    SERVICE_TYPES,
    SERMON_TEMPLATES,
    runService,
    generateHostingEvent,
    getAvailableServices,
} from './ministryHostingEngine';

// Personal Development Engine
export {
    BOOKS,
    PODCASTS,
    COURSES,
    progressReading,
    calculateWeeklyDevelopmentEffects,
    createEmptyDevelopmentState,
    getAvailableCourses,
} from './personalDevelopmentEngine';

// Audio Manager
export {
    SOUND_EFFECTS,
    SOUND_TRIGGERS,
    createAudioManager,
    getSoundForEvent,
    createDefaultAudioState,
} from './audioManager';

// Gatekept Actions Engine
export {
    ACTION_GATES,
    isActionUnlocked,
    getUnlockedActions,
    getAlmostUnlockedActions,
    getActionsByCategory,
} from './gatekeptActionsEngine';

// Testimony System
export {
    generateTestimony,
    shareTestimony,
    checkTestimonyExposure,
    collectRealTestimony,
    createEmptyTestimonyInventory,
    calculateTestimonyCredibility,
} from './testimonyEngine';

// Prophecy System
export {
    generateProphecy,
    generateSafeProphecy,
    generateRiskyProphecy,
    checkProphecyFulfillment,
    coverUpProphecy,
    createEmptyTrackRecord,
    calculatePropheticReputation,
    propheticDuel,
} from './prophecyEngine';

// NPC Memory System
export {
    createNPC,
    createNPCFromTemplate,
    recordNPCMemory,
    getMostSignificantMemory,
    willNPCReferPast,
    updateNPCDisposition,
    npcLearnsSecret,
    spreadGossip,
    hasSecretReachedDanger,
    createEmptyRelationshipGraph,
    RECURRING_NPC_TEMPLATES,
} from './npcMemoryEngine';

// Title Progression
export {
    TITLE_HIERARCHY,
    checkTitleEligibility,
    getHighestEligibleTitle,
    calculateTitleReaction,
    generateTitleAddress,
    processAnointingAddiction,
    getNextTitle,
    createDefaultAnointingState,
} from './titleProgressionEngine';

// Psychological Hooks
export {
    processDailyLogin,
    getStreakMultiplier,
    generateFOMOEvent,
    generateNearMissEvent,
    createSunkCostTrap,
    calculateSunkCostPressure,
    createPendingResult,
    checkPendingResults,
    getLeaderboardPosition,
    createDefaultStreak,
    FOMO_EVENTS,
} from './psychologicalHooksEngine';

// Church Politics
export {
    checkFactionFormation,
    createFaction,
    updateFaction,
    checkSplitRisk,
    executeChurchSplit,
    detectCoupPlot,
    respondToCoup,
    attemptReconciliation,
    createDefaultPolitics,
    calculateUnity,
} from './churchPoliticsEngine';

// Seed Faith Mini-Game
export {
    createSeedCampaign,
    runGivingSession,
    checkSeedResults,
    getSeedSignificance,
    calculateCampaignReturn,
    MANIPULATION_TACTICS,
    SPECIAL_SEED_AMOUNTS,
} from './seedFaithEngine';

// Dynasty & Succession
export {
    generateSuccessor,
    generatePastorChild,
    updateChild,
    childChoosesPath,
    evaluateSuccessorReadiness,
    executeSuccession,
    calculateLegacy,
    createEmptyDynasty,
    addLegacyItem,
} from './dynastyEngine';

// Emotional Events
export {
    getEmotionalEventsByType,
    checkLingeringEffect,
    ALL_EMOTIONAL_EVENTS,
    GUILT_EVENTS,
    GRIEF_EVENTS,
    TRIUMPH_EVENTS,
    FEAR_EVENTS,
    SHAME_EVENTS,
    DOUBT_EVENTS,
} from './emotionalEventsEngine';

// Nigerian Realism
export {
    rsvpToOwambe,
    generateConstructionProblem,
    generateMotherConflict,
    processThanksgivingDonation,
    generateStaffDrama,
    generateOwambeInvitation,
    OWAMBE_TYPES,
    CHOIR_DRAMA_TEMPLATES,
    CHURCH_MOTHER_POWERS,
} from './nigerianRealismEngine';
