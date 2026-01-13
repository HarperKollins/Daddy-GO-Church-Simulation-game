/**
 * Daddy G.O. Simulator - Central Game Store
 * 
 * This Zustand store manages all game state including:
 * - Player stats (health, cash, anointing, fame, scandal)
 * - Church state (members, venue, reputation)
 * - Hidden flags (integrity, paths unlocked)
 * - Permanent choices tracking
 * 
 * Cultural Context:
 * The two-wallet system (personal vs church cash) reflects the Nigerian
 * megachurch reality where pastors often struggle with the line between
 * ministry funds and personal wealth. This is a core satirical mechanic.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
    CoreStats,
    HiddenFlags,
    ChurchState,
    PlayerState,
    GameAct,
    VenueTier,
    PermanentChoice,
    EventEffect,
    Asset,
    Partner,
    PastorSkills,
    SocialMediaPresence,
    MinistryLocation,
    BabyMama
} from '@/types/game';
import { simulateInvestmentReturn } from '@/data/assets';

// ============================================================================
// INITIAL STATE DEFAULTS
// ============================================================================

const DEFAULT_STATS: CoreStats = {
    health: 70,           // Starting hungry but alive
    personalCash: 500,    // Just enough for a week of garri
    churchCash: 0,        // No church funds initially
    anointing: 20,        // Some spiritual foundation
    fame: 0,              // Nobody knows you yet
    scandal: 0,           // Clean slate
    energy: 100,          // Fresh start
};

const DEFAULT_FLAGS: HiddenFlags = {
    integrity: 100,       // Start with full integrity
    miracleLock: false,   // Can still perform real miracles
    embezzlementUnlocked: false,
    yahooPath: false,
    sowedTheSeed: false,
};

const DEFAULT_CHURCH: ChurchState = {
    members: 0,
    venue: 'BUS_STOP',
    reputation: 50,
};

const DEFAULT_PLAYER: PlayerState = {
    name: 'Pastor',
    age: 20,              // 200L student
    week: 1,
    isAlive: true,
    currentAct: 'SURVIVAL',
    stats: DEFAULT_STATS,
    hiddenFlags: DEFAULT_FLAGS,
    church: DEFAULT_CHURCH,
    permanentChoices: [],
    triggeredEvents: [],
    assets: [],
    partner: null,
    babyMamas: [],
    occupation: 'Student',
    ministryLocation: 'Campus',
    weeksAtZeroHealth: 0,
    uniYear: '200L',
    relationshipStatus: 'Single',
    relationshipWeeks: 0,
    skills: {
        preaching: 1,
        healing: 1,
        charisma: 1,
        business: 1,
        politics: 1,
    },
    socialMedia: {
        youtubeSubscribers: 0,
        spotifyListeners: 0,
        sermonsUploaded: 0,
        weeklyViews: 0,
    },
};



// ============================================================================
// STORE INTERFACE
// ============================================================================

interface GameActions {
    // Core game loop
    advanceWeek: () => void;

    // Stat management
    modifyStat: (stat: keyof CoreStats, amount: number, operation?: 'add' | 'set') => void;
    modifyHiddenFlag: (flag: keyof HiddenFlags, value: number | boolean) => void;

    // Church management
    addMembers: (count: number) => void;
    upgradeVenue: (venue: VenueTier) => void;

    // Event handling
    recordChoice: (eventId: string, choiceId: string) => void;
    markEventTriggered: (eventId: string) => void;
    hasTriggeredEvent: (eventId: string) => boolean;
    hasMadeChoice: (choiceId: string) => boolean;

    // Progression
    progressToAct: (act: GameAct) => void;

    // Effect application
    applyEffects: (effects: EventEffect[]) => void;

    // Game control
    resetGame: () => void;
    setPlayerName: (name: string) => void;
    spendEnergy: (amount: number) => boolean;
    getDate: () => string;

    // Assets & Partner
    addAsset: (asset: Asset) => void;
    removeAsset: (assetId: string) => void;
    setPartner: (partner: Partner | null) => void;

    // NEW: Relationship Flow
    startDating: (partner: Partner) => void;
    propose: () => void;
    marry: () => void;
    breakup: () => void;
    hookup: (type: 'church' | 'random' | 'uni') => { pregnant: boolean; babyName?: string; mamaName?: string; scandal: number };

    // NEW: Skills
    upgradeSkill: (skill: keyof PastorSkills, amount: number) => void;
    trainSkill: (skill: keyof PastorSkills) => { success: boolean; energyCost: number; skillGain: number };

    // NEW: Social Media
    uploadSermon: () => void;
    updateSocialMedia: () => void;

    // NEW: Education & Graduation
    graduate: (location: 'Village' | 'City') => void;
    dropout: () => void;
}

interface GameStore extends PlayerState, GameActions { }

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Clamps a value between min and max
 */
const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
};

/**
 * Calculates weekly offering based on members and venue
 * Cultural note: Nigerian churches typically collect offerings multiple times
 * per service. This is simplified to a weekly aggregate.
 * NOW INCLUDES: Village/City path modifiers
 */
const calculateWeeklyOffering = (members: number, venue: VenueTier, location: MinistryLocation): number => {
    const baseOffering = 200; // Average offering per member per week (₦)
    const venueMultiplier: Record<VenueTier, number> = {
        'BUS_STOP': 0.5,      // People drop small change
        'CLASSROOM': 1,       // Normal offerings
        'TENT': 1.5,         // Crusade atmosphere increases giving
        'WAREHOUSE': 2,      // Growing prosperity
        'DOME': 3,           // Megachurch giving
        'STADIUM': 5,        // Elite congregation
        'CITY_STATE': 10,    // Cult-level commitment
    };

    // Path modifiers
    const locationMultiplier: Record<MinistryLocation, number> = {
        'Campus': 0.8,   // Students are broke
        'Village': 0.3,  // Poor community (tough!)
        'City': 2.0,     // Wealthy urban givers
    };

    return Math.floor(members * baseOffering * venueMultiplier[venue] * locationMultiplier[location]);
};

/**
 * Calculates weekly expenses based on venue and lifestyle
 */
const calculateWeeklyExpenses = (venue: VenueTier, personalCash: number): number => {
    const venueRent: Record<VenueTier, number> = {
        'BUS_STOP': 0,
        'CLASSROOM': 5000,
        'TENT': 20000,
        'WAREHOUSE': 100000,
        'DOME': 500000,
        'STADIUM': 2000000,
        'CITY_STATE': 5000000,
    };

    // Lifestyle creep: spend more as you have more
    const lifestyleCost = Math.floor(personalCash * 0.05);

    return venueRent[venue] + lifestyleCost;
};

const calculateAssetMaintenance = (assets: Asset[]): number => {
    return assets.reduce((total, asset) => total + asset.weeklyMaintenance, 0);
};

const calculatePartnerMaintenance = (partner: Partner | null): number => {
    return partner ? partner.maintenanceCost : 0;
};

// ============================================================================
// THE STORE
// ============================================================================

export const useGameStore = create<GameStore>()(
    persist(
        (set, get) => ({
            // Initial state
            ...DEFAULT_PLAYER,

            // ======================================================================
            // CORE GAME LOOP
            // ======================================================================

            /**
             * Advances the game by one week.
             * This is the "heartbeat" of the game - called when player clicks [HOLD SERVICE]
             * 
             * Handles:
             * 1. Stat decay (health decreases, anointing fades)
             * 2. Passive income from offerings
             * 3. Expenses (rent, lifestyle)
             * 4. Age progression
             * 5. Death checks
             */
            advanceWeek: () => {
                const state = get();
                if (!state.isAlive) return;

                // Calculate changes
                const offering = calculateWeeklyOffering(state.church.members, state.church.venue, state.ministryLocation);
                const venueExpenses = calculateWeeklyExpenses(state.church.venue, state.stats.personalCash);
                const assetMaintenance = calculateAssetMaintenance(state.assets);
                const partnerMaintenance = calculatePartnerMaintenance(state.partner);

                // Baby Mama Support: Sum of all weekly support costs
                const babyMamaSupport = state.babyMamas?.reduce((total, bm) => total + bm.weeklySupport, 0) || 0;

                const totalExpenses = venueExpenses + assetMaintenance + partnerMaintenance + babyMamaSupport;

                // Process Asset Value Changes (Investments/Depreciation)
                const updatedAssets = state.assets.map(asset => {
                    if (asset.category === 'investment') {
                        const { newValue, rugPulled } = simulateInvestmentReturn(asset, asset.cost);
                        // If rug pulled, value becomes 0 (or technically close to it, loop handles it)
                        // In a real app we might want to notify user here, but store just updates state
                        return { ...asset, cost: newValue };
                    }
                    return asset; // Real estate/Cars static for now or add depreciation later
                });

                // Health decay (hunger catches up)
                // In Act 1, this is aggressive to create tension
                const healthDecay = state.currentAct === 'SURVIVAL' ? 8 : 3;

                // Anointing decay (spiritual discipline required)
                const anointingDecay = 2;

                // Fame decay (public forgets quickly)
                const fameDecay = state.stats.fame > 50 ? 3 : 1;

                // Apply changes
                set((s) => {
                    const newHealth = clamp(s.stats.health - healthDecay, 0, 100);
                    const newPersonalCash = s.stats.personalCash - totalExpenses;
                    const newChurchCash = Math.max(0, s.stats.churchCash + offering);
                    const newAnointing = clamp(s.stats.anointing - anointingDecay, 0, 100);
                    const newFame = clamp(s.stats.fame - fameDecay, 0, 100);

                    // Track weeks at zero health (grace period of 2 years = 104 weeks)
                    const newWeeksAtZeroHealth = newHealth <= 0 ? (s.weeksAtZeroHealth || 0) + 1 : 0;

                    // Death: Scandal 100+ OR starving for 2 years straight
                    const isDead = s.stats.scandal >= 100 || newWeeksAtZeroHealth >= 104;

                    // Age up every 52 weeks (1 year)
                    const newAge = s.week % 52 === 0 ? s.age + 1 : s.age;

                    // University progression - graduate after 4 years (208 weeks)
                    const uniYears: ('200L' | '300L' | '400L' | '500L' | 'Graduate')[] = ['200L', '300L', '400L', '500L', 'Graduate'];
                    const yearIndex = Math.min(4, Math.floor(s.week / 52));
                    const newUniYear = s.occupation === 'Student' ? uniYears[yearIndex] : s.uniYear;
                    const newOccupation = newUniYear === 'Graduate' ? 'Full-Time Pastor' as const : s.occupation;

                    // Relationship weeks progress
                    const newRelationshipWeeks = s.relationshipStatus !== 'Single' ? s.relationshipWeeks + 1 : 0;

                    return {
                        week: s.week + 1,
                        age: newAge,
                        isAlive: !isDead,
                        weeksAtZeroHealth: newWeeksAtZeroHealth,
                        uniYear: newUniYear,
                        occupation: newOccupation,
                        relationshipWeeks: newRelationshipWeeks,
                        stats: {
                            ...s.stats,
                            health: newHealth,
                            personalCash: newPersonalCash,
                            churchCash: newChurchCash,
                            anointing: newAnointing,
                            fame: newFame,
                            energy: 100, // Reset energy weekly
                        },
                        assets: updatedAssets,
                    };
                });

                // Update social media passive income
                get().updateSocialMedia();
            },

            // ======================================================================
            // STAT MANAGEMENT
            // ======================================================================

            modifyStat: (stat, amount, operation = 'add') => {
                set((s) => {
                    const currentValue = s.stats[stat];
                    const newValue = operation === 'add'
                        ? currentValue + amount
                        : amount;

                    // Cash can go negative (debt), other stats clamped 0-100
                    const clampedValue = stat === 'personalCash' || stat === 'churchCash'
                        ? newValue
                        : clamp(newValue, 0, 100);

                    return {
                        stats: {
                            ...s.stats,
                            [stat]: clampedValue,
                        },
                    };
                });
            },

            modifyHiddenFlag: (flag, value) => {
                set((s) => ({
                    hiddenFlags: {
                        ...s.hiddenFlags,
                        [flag]: typeof value === 'number'
                            ? clamp(value, 0, 100)
                            : value,
                    },
                }));
            },

            // ======================================================================
            // CHURCH MANAGEMENT
            // ======================================================================

            addMembers: (count) => {
                set((s) => ({
                    church: {
                        ...s.church,
                        members: Math.max(0, s.church.members + count),
                    },
                }));
            },

            upgradeVenue: (venue) => {
                set((s) => ({
                    church: {
                        ...s.church,
                        venue,
                    },
                }));
            },

            // ======================================================================
            // EVENT HANDLING
            // ======================================================================

            recordChoice: (eventId, choiceId) => {
                set((s) => ({
                    permanentChoices: [
                        ...s.permanentChoices,
                        { eventId, choiceId, week: s.week },
                    ],
                }));
            },

            markEventTriggered: (eventId) => {
                set((s) => ({
                    triggeredEvents: [...s.triggeredEvents, eventId],
                }));
            },

            hasTriggeredEvent: (eventId) => {
                return get().triggeredEvents.includes(eventId);
            },

            hasMadeChoice: (choiceId) => {
                return get().permanentChoices.some((c) => c.choiceId === choiceId);
            },

            // ======================================================================
            // PROGRESSION
            // ======================================================================

            progressToAct: (act) => {
                set({ currentAct: act });
            },

            // ======================================================================
            // EFFECT APPLICATION
            // ======================================================================

            /**
             * Applies an array of effects from an event choice.
             * This is the bridge between the event system and state changes.
             */
            applyEffects: (effects) => {
                effects.forEach((effect) => {
                    switch (effect.type) {
                        case 'stat': {
                            const current = get().stats[effect.stat as keyof CoreStats] ??
                                get().hiddenFlags[effect.stat as keyof HiddenFlags];

                            if (typeof current === 'number') {
                                let newValue: number;
                                switch (effect.operation) {
                                    case 'add':
                                        newValue = current + effect.value;
                                        break;
                                    case 'subtract':
                                        newValue = current - effect.value;
                                        break;
                                    case 'multiply':
                                        newValue = current * effect.value;
                                        break;
                                    case 'set':
                                    default:
                                        newValue = effect.value;
                                }

                                if (effect.stat in get().stats) {
                                    get().modifyStat(effect.stat as keyof CoreStats, newValue, 'set');
                                } else {
                                    get().modifyHiddenFlag(effect.stat as keyof HiddenFlags, newValue);
                                }
                            }
                            break;
                        }

                        case 'flag':
                            get().modifyHiddenFlag(effect.flag, effect.value);
                            break;

                        case 'members': {
                            const current = get().church.members;
                            let newValue: number = current;
                            if (effect.operation === 'add') {
                                newValue = current + effect.value;
                            } else if (effect.operation === 'subtract') {
                                newValue = current - effect.value;
                            } else if (effect.operation === 'multiply') {
                                newValue = Math.floor(current * effect.value);
                            }
                            set((s) => ({
                                church: { ...s.church, members: Math.max(0, newValue) },
                            }));
                            break;
                        }

                        case 'venue':
                            get().upgradeVenue(effect.venue);
                            break;

                        case 'act':
                            get().progressToAct(effect.act);
                            break;
                    }
                });
            },

            // ======================================================================
            // GAME CONTROL
            // ======================================================================

            resetGame: () => {
                set(DEFAULT_PLAYER);
            },

            setPlayerName: (name) => {
                set({ name });
            },

            spendEnergy: (amount) => {
                const { energy } = get().stats;
                if (energy >= amount) {
                    get().modifyStat('energy', -amount, 'add');
                    return true;
                }
                return false;
            },

            getDate: () => {
                const { week } = get();
                const startDate = new Date('2026-01-01');
                const currentDate = new Date(startDate.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000);

                return currentDate.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });
            },

            addAsset: (asset) => {
                set((s) => ({ assets: [...s.assets, asset] }));
            },

            removeAsset: (assetId) => {
                set((s) => ({ assets: s.assets.filter(a => a.id !== assetId) }));
            },

            setPartner: (partner) => {
                set({ partner });
            },

            // ======================================================================
            // RELATIONSHIP FLOW
            // ======================================================================

            startDating: (partner) => {
                set({
                    partner,
                    relationshipStatus: 'Dating',
                    relationshipWeeks: 0
                });
            },

            propose: () => {
                const state = get();
                if (state.relationshipWeeks >= 12 && state.stats.fame >= 20) {
                    set({ relationshipStatus: 'Engaged' });
                }
            },

            marry: () => {
                const state = get();
                if (state.relationshipWeeks >= 20 && state.church.members >= 30) {
                    set({ relationshipStatus: 'Married' });
                }
            },

            breakup: () => {
                const state = get();
                const scandalAmount = state.relationshipStatus === 'Married' ? 40 :
                    state.relationshipStatus === 'Engaged' ? 20 : 10;
                set((s) => ({
                    partner: null,
                    relationshipStatus: 'Single',
                    relationshipWeeks: 0,
                    stats: { ...s.stats, scandal: Math.min(100, s.stats.scandal + scandalAmount) }
                }));
            },

            hookup: (type) => {
                const state = get();

                // Scandal and pregnancy chances by type
                const hookupData = {
                    'church': { scandal: 35, pregnancy: 0.40, cost: 40 },
                    'random': { scandal: 15, pregnancy: 0.25, cost: 30 },
                    'uni': { scandal: 5, pregnancy: 0.15, cost: 20 }
                };

                const data = hookupData[type];
                const scandalAmount = data.scandal;
                const pregnancyRoll = Math.random();

                // Apply base effects
                set((s) => ({
                    stats: {
                        ...s.stats,
                        scandal: Math.min(100, s.stats.scandal + scandalAmount),
                        health: Math.max(0, s.stats.health - 5) // Toll on body
                    }
                }));

                // Check for pregnancy
                if (pregnancyRoll < data.pregnancy) {
                    // PREGNANCY! Add baby mama
                    const babyMamaNames = [
                        'Sister Blessing', 'Sister Grace', 'Sister Joy', 'Sister Peace',
                        'Chioma', 'Ngozi', 'Amara', 'Funke', 'Tola', 'Jennifer'
                    ];
                    const childNames = ['Junior', 'David', 'Esther', 'Mary', 'Samuel', 'Isaac'];

                    const mamaName = babyMamaNames[Math.floor(Math.random() * babyMamaNames.length)];
                    const childName = childNames[Math.floor(Math.random() * childNames.length)];

                    const newBabyMama: BabyMama = {
                        name: mamaName,
                        childName: childName,
                        weeklySupport: 5000 + (state.babyMamas.length * 2000), // Escalating costs
                        scandalThreat: type === 'church' ? 40 : 20
                    };

                    set((s) => ({
                        babyMamas: [...(s.babyMamas || []), newBabyMama]
                    }));

                    return { pregnant: true, babyName: childName, mamaName: mamaName, scandal: scandalAmount };
                }

                return { pregnant: false, scandal: scandalAmount };
            },

            // ======================================================================
            // SKILLS
            // ======================================================================

            upgradeSkill: (skill, amount) => {
                set((s) => ({
                    skills: {
                        ...s.skills,
                        [skill]: Math.min(10, s.skills[skill] + amount)
                    }
                }));
            },

            trainSkill: (skill) => {
                const state = get();
                const currentLevel = state.skills[skill];

                // Calculate energy cost based on skill level (harder to train at high levels)
                let energyCost = 30;
                if (currentLevel >= 7) energyCost = 50;
                else if (currentLevel >= 4) energyCost = 40;

                // Check if player has enough energy
                if (state.stats.energy < energyCost) {
                    return { success: false, energyCost, skillGain: 0 };
                }

                // Calculate skill gain with diminishing returns
                let skillGain = 0.3;
                if (currentLevel >= 7) skillGain = 0.1;
                else if (currentLevel >= 4) skillGain = 0.2;

                // Max level is 10
                if (currentLevel >= 10) {
                    return { success: false, energyCost: 0, skillGain: 0 };
                }

                // Spend energy and increase skill
                get().spendEnergy(energyCost);
                get().upgradeSkill(skill, skillGain);

                return { success: true, energyCost, skillGain };
            },

            // ======================================================================
            // SOCIAL MEDIA
            // ======================================================================

            uploadSermon: () => {
                const state = get();
                const subGain = Math.floor((state.stats.fame / 10) * 100 + Math.random() * 200);
                const listenerGain = Math.floor((state.stats.anointing / 10) * 50 + Math.random() * 100);

                set((s) => ({
                    socialMedia: {
                        ...s.socialMedia,
                        sermonsUploaded: s.socialMedia.sermonsUploaded + 1,
                        youtubeSubscribers: s.socialMedia.youtubeSubscribers + subGain,
                        spotifyListeners: s.socialMedia.spotifyListeners + listenerGain,
                        weeklyViews: s.socialMedia.weeklyViews + Math.floor(subGain * 0.3)
                    }
                }));
            },

            updateSocialMedia: () => {
                // Called weekly to add passive income and grow based on fame
                const state = get();
                const youtubeIncome = Math.floor((state.socialMedia.youtubeSubscribers / 1000) * 500);
                const spotifyIncome = Math.floor((state.socialMedia.spotifyListeners / 100) * 200);
                const passiveGrowth = Math.floor(state.stats.fame * 5);

                set((s) => ({
                    stats: { ...s.stats, personalCash: s.stats.personalCash + youtubeIncome + spotifyIncome },
                    socialMedia: {
                        ...s.socialMedia,
                        youtubeSubscribers: s.socialMedia.youtubeSubscribers + passiveGrowth,
                        weeklyViews: Math.floor(s.socialMedia.youtubeSubscribers * 0.1)
                    }
                }));
            },

            // ======================================================================
            // EDUCATION & GRADUATION
            // ======================================================================

            graduate: (location) => {
                set({
                    occupation: 'Graduate',
                    uniYear: 'Graduate',
                    ministryLocation: location,
                });
            },

            dropout: () => {
                set((s) => ({
                    occupation: 'Dropout',
                    uniYear: 'Graduate', // No longer tracking uni year
                    ministryLocation: 'Village', // Auto-assigned to village
                    stats: {
                        ...s.stats,
                        scandal: Math.min(100, s.stats.scandal + 30),
                        anointing: Math.min(80, s.stats.anointing) // Cap at 80 immediately
                    },
                    hiddenFlags: {
                        ...s.hiddenFlags,
                        integrity: Math.max(0, s.hiddenFlags.integrity - 20) // Permanent integrity hit
                    }
                }));
            },
        }),
        {
            name: 'daddy-go-simulator-save',
        }
    )
);

export type { GameStore };
