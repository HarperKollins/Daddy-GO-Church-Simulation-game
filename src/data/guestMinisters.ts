/**
 * Guest Ministers Database
 * 
 * Parody pastors that can be booked to boost church attendance.
 * Each has unique effects, costs, and risks.
 * 
 * Cultural Context:
 * Guest ministers are a huge part of Nigerian church culture.
 * Big-name pastors can fill stadiums overnight but often
 * bring controversy. The archetypes here satirize common patterns.
 */

import type { GuestMinister, VenueTier } from '@/types/game';

/**
 * Minister Archetypes:
 * - FIRE_BRAND: High energy, dramatic, miracle-focused
 * - PROSPERITY: Money-focused sermons, attracts wealthy
 * - DELIVERANCE: Casts out demons, high drama
 * - MOTIVATIONAL: Positive vibes, corporate Christians
 * - CONTROVERSIAL: Viral moments, risky but famous
 */

export const guestMinisters: GuestMinister[] = [
    // =========================================================================
    // TIER 1: LOCAL STARS (Classroom/Tent Level - Cheap, Low Risk)
    // These are the up-and-coming ministers for small churches
    // =========================================================================
    {
        id: 'BROTHER_TOCHI',
        name: 'Brother Tochi "The Fire"',
        archetype: 'MOTIVATIONAL',
        costToBook: 5000,
        effects: [
            { type: 'members', operation: 'add', value: 10 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 2 },
        ],
        scandalRisk: 0,
        fameBoost: 2,
        minVenue: 'CLASSROOM',
    },
    {
        id: 'SISTER_BLESSING',
        name: 'Sister Blessing Anointed',
        archetype: 'PROSPERITY',
        costToBook: 8000,
        effects: [
            { type: 'members', operation: 'add', value: 15 },
            { type: 'stat', stat: 'churchCash', operation: 'add', value: 5000 },
        ],
        scandalRisk: 2,
        fameBoost: 3,
        minVenue: 'CLASSROOM',
    },
    {
        id: 'EVANGELIST_MOSES',
        name: 'Evangelist Moses Thundervoice',
        archetype: 'FIRE_BRAND',
        costToBook: 10000,
        effects: [
            { type: 'members', operation: 'add', value: 25 },
            { type: 'stat', stat: 'anointing', operation: 'add', value: 5 },
        ],
        scandalRisk: 3,
        fameBoost: 5,
        minVenue: 'TENT',
    },
    {
        id: 'PASTOR_CHIDI_CAMPUS',
        name: 'Pastor Chidi "Campus Crusader"',
        archetype: 'MOTIVATIONAL',
        costToBook: 7000,
        effects: [
            { type: 'members', operation: 'add', value: 12 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 3 },
        ],
        scandalRisk: 1,
        fameBoost: 3,
        minVenue: 'CLASSROOM',
    },
    {
        id: 'PROPHETESS_MAMA_GRACE',
        name: 'Prophetess Mama Grace',
        archetype: 'DELIVERANCE',
        costToBook: 12000,
        effects: [
            { type: 'members', operation: 'add', value: 20 },
            { type: 'stat', stat: 'anointing', operation: 'add', value: 3 },
        ],
        scandalRisk: 4,
        fameBoost: 4,
        minVenue: 'TENT',
    },
    {
        id: 'PASTOR_EMEKA_HUSTLER',
        name: 'Pastor Emeka "Lagos Hustler"',
        archetype: 'PROSPERITY',
        costToBook: 15000,
        effects: [
            { type: 'members', operation: 'add', value: 25 },
            { type: 'stat', stat: 'churchCash', operation: 'add', value: 8000 },
        ],
        scandalRisk: 5,
        fameBoost: 5,
        minVenue: 'TENT',
    },
    {
        id: 'REVEREND_AKPAN_VILLAGE',
        name: 'Rev. Akpan "Village Champion"',
        archetype: 'FIRE_BRAND',
        costToBook: 6000,
        effects: [
            { type: 'members', operation: 'add', value: 15 },
            { type: 'stat', stat: 'anointing', operation: 'add', value: 4 },
        ],
        scandalRisk: 2,
        fameBoost: 2,
        minVenue: 'BUS_STOP',
    },

    // =========================================================================
    // TIER 2: RISING FLAMES (Warehouse Level - Moderate Cost, Moderate Risk)
    // Established ministers making a name for themselves
    // =========================================================================
    {
        id: 'PASTOR_SUCCESS_OKONKWO',
        name: 'Pastor Success Okonkwo',
        archetype: 'PROSPERITY',
        costToBook: 100000,
        effects: [
            { type: 'members', operation: 'add', value: 100 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 15 },
            { type: 'stat', stat: 'churchCash', operation: 'add', value: 50000 },
        ],
        scandalRisk: 5,
        fameBoost: 15,
        minVenue: 'WAREHOUSE',
    },
    {
        id: 'PROPHETESS_MAMA_FIRE',
        name: 'Prophetess Mama Fire',
        archetype: 'DELIVERANCE',
        costToBook: 150000,
        effects: [
            { type: 'members', operation: 'add', value: 150 },
            { type: 'stat', stat: 'anointing', operation: 'add', value: 10 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 10 },
        ],
        scandalRisk: 8,
        fameBoost: 10,
        minVenue: 'WAREHOUSE',
    },
    {
        id: 'APOSTLE_MIKE_BIZMAN',
        name: 'Apostle Mike "The Bizman"',
        archetype: 'PROSPERITY',
        costToBook: 120000,
        effects: [
            { type: 'members', operation: 'add', value: 120 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 12 },
            { type: 'stat', stat: 'personalCash', operation: 'add', value: 30000 },
        ],
        scandalRisk: 7,
        fameBoost: 12,
        minVenue: 'WAREHOUSE',
    },
    {
        id: 'BISHOP_NNAMDI_OVERFLOW',
        name: 'Bishop Nnamdi "Overflow"',
        archetype: 'FIRE_BRAND',
        costToBook: 180000,
        effects: [
            { type: 'members', operation: 'add', value: 180 },
            { type: 'stat', stat: 'anointing', operation: 'add', value: 12 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 14 },
        ],
        scandalRisk: 6,
        fameBoost: 14,
        minVenue: 'WAREHOUSE',
    },
    {
        id: 'PASTOR_FEMI_SMOOTH',
        name: 'Pastor Femi "Smooth Talker"',
        archetype: 'MOTIVATIONAL',
        costToBook: 90000,
        effects: [
            { type: 'members', operation: 'add', value: 80 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 18 },
        ],
        scandalRisk: 3,
        fameBoost: 18,
        minVenue: 'WAREHOUSE',
    },
    {
        id: 'REVEREND_DR_OKAFOR',
        name: 'Rev. Dr. Okafor PhD',
        archetype: 'MOTIVATIONAL',
        costToBook: 200000,
        effects: [
            { type: 'members', operation: 'add', value: 160 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 16 },
            { type: 'stat', stat: 'anointing', operation: 'add', value: 8 },
        ],
        scandalRisk: 4,
        fameBoost: 16,
        minVenue: 'WAREHOUSE',
    },
    {
        id: 'PASTOR_KUNLE_HASHTAG',
        name: 'Pastor Kunle "#Blessed"',
        archetype: 'CONTROVERSIAL',
        costToBook: 80000,
        effects: [
            { type: 'members', operation: 'add', value: 60 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 22 },
        ],
        scandalRisk: 12,
        fameBoost: 22,
        minVenue: 'WAREHOUSE',
    },

    // =========================================================================
    // TIER 3: GIANTS OF FAITH (Dome Level - High Cost, High Reward)
    // Well-known pastors with large followings
    // =========================================================================
    {
        id: 'BISHOP_GOLDCHAIN',
        name: 'Bishop Gold Chain',
        archetype: 'PROSPERITY',
        costToBook: 300000,
        effects: [
            { type: 'members', operation: 'add', value: 200 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 20 },
            { type: 'stat', stat: 'churchCash', operation: 'add', value: 200000 },
        ],
        scandalRisk: 10,
        fameBoost: 20,
        minVenue: 'DOME',
    },
    {
        id: 'PROPHET_LIQUID',
        name: 'Prophet Liquid Miracle',
        archetype: 'CONTROVERSIAL',
        costToBook: 500000,
        effects: [
            { type: 'members', operation: 'add', value: 500 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 50 },
        ],
        scandalRisk: 25,
        fameBoost: 50,
        minVenue: 'DOME',
    },
    {
        id: 'APOSTLE_ODUMEJE_THUNDER',
        name: 'Apostle Odumeje "The Lion"',
        archetype: 'CONTROVERSIAL',
        costToBook: 600000,
        effects: [
            { type: 'members', operation: 'add', value: 400 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 60 },
        ],
        scandalRisk: 35,
        fameBoost: 60,
        minVenue: 'DOME',
    },
    {
        id: 'PASTOR_CRYPTO',
        name: 'Pastor Crypto Blessings',
        archetype: 'CONTROVERSIAL',
        costToBook: 800000,
        effects: [
            { type: 'members', operation: 'add', value: 300 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 30 },
            { type: 'stat', stat: 'personalCash', operation: 'add', value: 500000 },
        ],
        scandalRisk: 40,
        fameBoost: 30,
        minVenue: 'DOME',
    },
    {
        id: 'ARCHBISHOP_BENSON_EAGLE',
        name: 'Archbishop Benson "Eagle Eyes"',
        archetype: 'FIRE_BRAND',
        costToBook: 450000,
        effects: [
            { type: 'members', operation: 'add', value: 350 },
            { type: 'stat', stat: 'anointing', operation: 'add', value: 20 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 25 },
        ],
        scandalRisk: 8,
        fameBoost: 25,
        minVenue: 'DOME',
    },
    {
        id: 'GENERAL_OVERSEER_TB_JAKES',
        name: 'G.O. T.B. Jakes',
        archetype: 'MOTIVATIONAL',
        costToBook: 700000,
        effects: [
            { type: 'members', operation: 'add', value: 450 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 35 },
            { type: 'stat', stat: 'anointing', operation: 'add', value: 15 },
        ],
        scandalRisk: 5,
        fameBoost: 35,
        minVenue: 'DOME',
    },
    {
        id: 'PROPHET_FUFEYIN_MIRACLE',
        name: 'Prophet Fufeyin "Miracle Money"',
        archetype: 'PROSPERITY',
        costToBook: 550000,
        effects: [
            { type: 'members', operation: 'add', value: 380 },
            { type: 'stat', stat: 'churchCash', operation: 'add', value: 400000 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 28 },
        ],
        scandalRisk: 18,
        fameBoost: 28,
        minVenue: 'DOME',
    },
    {
        id: 'BISHOP_OYAKHILOME_CHRIS',
        name: 'Bishop Chris "LoveWorld"',
        archetype: 'PROSPERITY',
        costToBook: 900000,
        effects: [
            { type: 'members', operation: 'add', value: 600 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 45 },
            { type: 'stat', stat: 'churchCash', operation: 'add', value: 500000 },
        ],
        scandalRisk: 12,
        fameBoost: 45,
        minVenue: 'DOME',
    },

    // =========================================================================
    // TIER 4: LEGENDS OF THE FAITH (Stadium Level - Premium, Massive Impact)
    // The biggest names in Nigerian Christianity
    // =========================================================================
    {
        id: 'APOSTLE_PRIVATE_JET',
        name: 'Apostle Johnson "Private Jet"',
        archetype: 'PROSPERITY',
        costToBook: 2000000,
        effects: [
            { type: 'members', operation: 'add', value: 1000 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 40 },
            { type: 'stat', stat: 'churchCash', operation: 'add', value: 1000000 },
        ],
        scandalRisk: 15,
        fameBoost: 40,
        minVenue: 'STADIUM',
    },
    {
        id: 'DADDY_GO_HUMBLE',
        name: 'Daddy G.O. Adeboye Humble',
        archetype: 'FIRE_BRAND',
        costToBook: 5000000,
        effects: [
            { type: 'members', operation: 'add', value: 2000 },
            { type: 'stat', stat: 'anointing', operation: 'add', value: 30 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 60 },
        ],
        scandalRisk: 3,
        fameBoost: 60,
        minVenue: 'STADIUM',
    },
    {
        id: 'BISHOP_OYEDEPO_WINGS',
        name: 'Bishop Oyedepo "Wings of Faith"',
        archetype: 'PROSPERITY',
        costToBook: 8000000,
        effects: [
            { type: 'members', operation: 'add', value: 3000 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 70 },
            { type: 'stat', stat: 'churchCash', operation: 'add', value: 3000000 },
        ],
        scandalRisk: 8,
        fameBoost: 70,
        minVenue: 'STADIUM',
    },
    {
        id: 'PASTOR_KUMUYI_HOLINESS',
        name: 'Pastor Kumuyi "Holiness Standard"',
        archetype: 'FIRE_BRAND',
        costToBook: 3000000,
        effects: [
            { type: 'members', operation: 'add', value: 1500 },
            { type: 'stat', stat: 'anointing', operation: 'add', value: 40 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 35 },
        ],
        scandalRisk: 1,
        fameBoost: 35,
        minVenue: 'STADIUM',
    },
    {
        id: 'APOSTLE_SULEIMAN_OMEGA',
        name: 'Apostle Suleiman "Omega Fire"',
        archetype: 'DELIVERANCE',
        costToBook: 4000000,
        effects: [
            { type: 'members', operation: 'add', value: 1800 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 55 },
            { type: 'stat', stat: 'anointing', operation: 'add', value: 25 },
        ],
        scandalRisk: 20,
        fameBoost: 55,
        minVenue: 'STADIUM',
    },
    {
        id: 'PASTOR_IBIYEOMIE_SALVATION',
        name: 'Pastor Ibiyeomie "Salvation"',
        archetype: 'PROSPERITY',
        costToBook: 3500000,
        effects: [
            { type: 'members', operation: 'add', value: 1600 },
            { type: 'stat', stat: 'churchCash', operation: 'add', value: 2000000 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 45 },
        ],
        scandalRisk: 10,
        fameBoost: 45,
        minVenue: 'STADIUM',
    },
    {
        id: 'PROPHET_TB_JOSHUA_EMMANUEL',
        name: 'Prophet T.B. Joshua "Emmanuel TV"',
        archetype: 'DELIVERANCE',
        costToBook: 10000000,
        effects: [
            { type: 'members', operation: 'add', value: 5000 },
            { type: 'stat', stat: 'anointing', operation: 'add', value: 50 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 80 },
        ],
        scandalRisk: 5,
        fameBoost: 80,
        minVenue: 'STADIUM',
    },
    {
        id: 'ARCHBISHOP_ORITSEJAFOR_CAN',
        name: 'Archbishop Oritsejafor "CAN Chairman"',
        archetype: 'PROSPERITY',
        costToBook: 6000000,
        effects: [
            { type: 'members', operation: 'add', value: 2500 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 50 },
            { type: 'stat', stat: 'churchCash', operation: 'add', value: 2500000 },
        ],
        scandalRisk: 15,
        fameBoost: 50,
        minVenue: 'STADIUM',
    },

    // =========================================================================
    // TIER 5: VIRAL PROPHETS (Special - High Risk, Viral Fame)
    // Internet sensation pastors known for controversy
    // =========================================================================
    {
        id: 'PROPHET_ODUMEJE_INDABOSKI',
        name: 'Prophet Odumeje "Indaboski"',
        archetype: 'CONTROVERSIAL',
        costToBook: 400000,
        effects: [
            { type: 'members', operation: 'add', value: 250 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 70 },
        ],
        scandalRisk: 45,
        fameBoost: 70,
        minVenue: 'WAREHOUSE',
    },
    {
        id: 'PASTOR_BIODUN_FATOYINBO',
        name: 'Pastor Biodun "COZA Vibes"',
        archetype: 'MOTIVATIONAL',
        costToBook: 1500000,
        effects: [
            { type: 'members', operation: 'add', value: 800 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 40 },
        ],
        scandalRisk: 30,
        fameBoost: 40,
        minVenue: 'DOME',
    },
    {
        id: 'PROPHET_CHUKWUEMEKA_OHANAEMERE',
        name: 'Prophet Chukwuemeka "Bulldozer"',
        archetype: 'CONTROVERSIAL',
        costToBook: 350000,
        effects: [
            { type: 'members', operation: 'add', value: 200 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 55 },
        ],
        scandalRisk: 50,
        fameBoost: 55,
        minVenue: 'WAREHOUSE',
    },
    {
        id: 'PASTOR_PAUL_ENENCHE',
        name: 'Pastor Paul Enenche "Dunamis"',
        archetype: 'FIRE_BRAND',
        costToBook: 2500000,
        effects: [
            { type: 'members', operation: 'add', value: 1200 },
            { type: 'stat', stat: 'anointing', operation: 'add', value: 22 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 38 },
        ],
        scandalRisk: 6,
        fameBoost: 38,
        minVenue: 'STADIUM',
    },
    {
        id: 'BISHOP_TD_JAKES_NIGERIA',
        name: 'Bishop T.D. Jakes (Nigerian Tour)',
        archetype: 'MOTIVATIONAL',
        costToBook: 15000000,
        effects: [
            { type: 'members', operation: 'add', value: 8000 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 90 },
            { type: 'stat', stat: 'anointing', operation: 'add', value: 35 },
        ],
        scandalRisk: 2,
        fameBoost: 90,
        minVenue: 'STADIUM',
    },
    {
        id: 'PASTOR_JERRY_EZE_STREAMS',
        name: 'Pastor Jerry Eze "NSPPD"',
        archetype: 'FIRE_BRAND',
        costToBook: 1800000,
        effects: [
            { type: 'members', operation: 'add', value: 900 },
            { type: 'stat', stat: 'anointing', operation: 'add', value: 28 },
            { type: 'stat', stat: 'fame', operation: 'add', value: 42 },
        ],
        scandalRisk: 4,
        fameBoost: 42,
        minVenue: 'DOME',
    },
];

/**
 * Get ministers available for the player's current venue
 */
export const getAvailableMinisters = (currentVenue: VenueTier): GuestMinister[] => {
    const venueTierOrder: VenueTier[] = [
        'BUS_STOP', 'CLASSROOM', 'TENT', 'WAREHOUSE', 'DOME', 'STADIUM', 'CITY_STATE'
    ];

    const currentTierIndex = venueTierOrder.indexOf(currentVenue);

    return guestMinisters.filter(minister => {
        const minTierIndex = venueTierOrder.indexOf(minister.minVenue);
        return minTierIndex <= currentTierIndex;
    });
};

/**
 * Get a random scandal event for a controversial minister
 */
export const rollMinisterScandal = (minister: GuestMinister): string | null => {
    const roll = Math.random() * 100;

    if (roll < minister.scandalRisk) {
        const scandals: Record<string, string[]> = {
            'CONTROVERSIAL': [
                `${minister.name} jumped on a pregnant woman during deliverance. Video goes viral.`,
                `${minister.name} claimed to resurrect the dead. The "dead" man later gave interview.`,
                `${minister.name} drove his car into the altar. "The Spirit took over the wheel."`,
            ],
            'PROSPERITY': [
                `${minister.name}'s private jet was seen at a casino resort.`,
                `${minister.name} asked members to sow "₦1 million seeds" for miracles.`,
                `Bloggers expose ${minister.name}'s ₦500M mansion built with tithes.`,
            ],
            'DELIVERANCE': [
                `${minister.name}'s "deliverance" sent someone to the hospital.`,
                `Video shows ${minister.name} slapping "demons" out of a child.`,
                `Former member claims ${minister.name}'s deliverances are staged.`,
            ],
            'FIRE_BRAND': [
                `${minister.name} cursed a rival pastor on live TV.`,
                `${minister.name} prophesied election results. They were wrong.`,
            ],
            'MOTIVATIONAL': [
                `${minister.name}'s "motivational quotes" traced to plagiarism.`,
            ],
        };

        const options = scandals[minister.archetype] || [];
        if (options.length > 0) {
            return options[Math.floor(Math.random() * options.length)];
        }
    }

    return null;
};

export default guestMinisters;
