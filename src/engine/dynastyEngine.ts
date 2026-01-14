/**
 * Dynasty & Succession Engine
 * 
 * End game mechanics:
 * - Pass church to children/successor
 * - Legacy building
 * - Generational wealth transfer
 * - Empire continuation
 */

// ============================================================================
// DYNASTY DEFINITIONS
// ============================================================================

export interface Successor {
    id: string;
    name: string;
    relationship: 'child' | 'spiritual_son' | 'trusted_pastor' | 'family_member' | 'outsider';
    age: number;
    competence: number;         // 0-100
    loyalty: number;            // 0-100
    publicImage: number;        // 0-100
    spiritualGifts: string[];
    education: string[];
    yearsInMinistry: number;
    approved: boolean;          // Has daddy approved them?
    congregationApproval: number; // 0-100
    boardApproval: number;      // 0-100
    scandalRisk: number;        // 0-100
    hiddenAgenda: string | null;
}

export interface Dynasty {
    founderName: string;
    foundedWeek: number;
    currentGeneration: number;
    peakMembers: number;
    peakWealth: number;
    totalWeeks: number;
    successors: Successor[];
    chosenSuccessor: string | null;  // ID
    successionPlan: SuccessionPlan | null;
    legacy: LegacyItem[];
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

// ============================================================================
// CHILDREN SYSTEM
// ============================================================================

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
    relationshipWithDaddy: number;  // -100 to 100
}

export interface ChildPersonality {
    spirituality: number;   // 0-100
    ambition: number;
    obedience: number;
    charisma: number;
    integrity: number;
}

// ============================================================================
// SUCCESSOR GENERATION
// ============================================================================

/**
 * Generate potential successor
 */
export function generateSuccessor(
    name: string,
    relationship: Successor['relationship'],
    yearsInMinistry: number
): Successor {
    const baseCompetence = 30 + Math.random() * 40 + yearsInMinistry * 2;
    const baseLoyalty = relationship === 'child' ? 70 : 50 + Math.random() * 30;

    return {
        id: `SUCCESSOR_${Date.now()}`,
        name,
        relationship,
        age: 25 + Math.floor(Math.random() * 30),
        competence: Math.min(100, baseCompetence),
        loyalty: Math.min(100, baseLoyalty),
        publicImage: 40 + Math.floor(Math.random() * 40),
        spiritualGifts: generateRandomGifts(),
        education: generateRandomEducation(),
        yearsInMinistry,
        approved: false,
        congregationApproval: 30 + Math.floor(Math.random() * 40),
        boardApproval: 30 + Math.floor(Math.random() * 40),
        scandalRisk: 10 + Math.floor(Math.random() * 40),
        hiddenAgenda: Math.random() > 0.7 ? generateHiddenAgenda() : null
    };
}

function generateRandomGifts(): string[] {
    const gifts = ['preaching', 'teaching', 'healing', 'prophecy', 'administration', 'evangelism', 'worship', 'counseling'];
    const count = 1 + Math.floor(Math.random() * 3);
    const selected: string[] = [];
    for (let i = 0; i < count; i++) {
        const gift = gifts[Math.floor(Math.random() * gifts.length)];
        if (!selected.includes(gift)) selected.push(gift);
    }
    return selected;
}

function generateRandomEducation(): string[] {
    const edu = ['Bible School', 'Theology Degree', 'MBA', 'PhD', 'Seminary', 'Foreign Training'];
    const count = Math.floor(Math.random() * 3);
    return edu.slice(0, count);
}

function generateHiddenAgenda(): string {
    const agendas = [
        'Wants to sell church assets',
        'Plans to change doctrine dramatically',
        'Has secret family abroad',
        'Connected to rival pastor',
        'Financial impropriety',
        'Will fire most staff',
        'Secretly doesn\'t believe'
    ];
    return agendas[Math.floor(Math.random() * agendas.length)];
}

// ============================================================================
// CHILD DEVELOPMENT
// ============================================================================

/**
 * Generate pastor's child
 */
export function generatePastorChild(
    name: string,
    gender: 'male' | 'female',
    birthWeek: number
): PastorChild {
    return {
        id: `CHILD_${Date.now()}`,
        name,
        gender,
        birthWeek,
        currentAge: 0,
        personality: {
            spirituality: 50,
            ambition: 50,
            obedience: 70,
            charisma: 50,
            integrity: 60
        },
        inMinistry: false,
        rebelling: false,
        publicScandal: false,
        education: 'none',
        careerPath: 'undecided',
        relationshipWithDaddy: 80  // Start positive
    };
}

/**
 * Update child weekly
 */
export function updateChild(
    child: PastorChild,
    currentWeek: number,
    daddyAttention: 'high' | 'medium' | 'low' | 'none',
    churchScandal: boolean
): PastorChild {
    // Calculate current age
    const ageInWeeks = currentWeek - child.birthWeek;
    const currentAge = Math.floor(ageInWeeks / 52);

    // Relationship changes based on attention
    let relationshipChange = 0;
    switch (daddyAttention) {
        case 'high': relationshipChange = 2; break;
        case 'medium': relationshipChange = 0; break;
        case 'low': relationshipChange = -1; break;
        case 'none': relationshipChange = -3; break;
    }

    // Church scandals affect children
    if (churchScandal) {
        relationshipChange -= 5;
        if (Math.random() > 0.8) child.rebelling = true;
    }

    // Age-based changes
    if (currentAge >= 13 && currentAge <= 19) {
        // Teenage years - higher rebellion risk
        if (child.relationshipWithDaddy < 30 && Math.random() > 0.8) {
            child.rebelling = true;
        }
    }

    // Education progression
    if (currentAge >= 6 && child.education === 'none') {
        child.education = 'primary';
    } else if (currentAge >= 12 && child.education === 'primary') {
        child.education = 'secondary';
    }

    return {
        ...child,
        currentAge,
        relationshipWithDaddy: Math.max(-100, Math.min(100,
            child.relationshipWithDaddy + relationshipChange
        ))
    };
}

/**
 * Child chooses career path
 */
export function childChoosesPath(child: PastorChild): PastorChild {
    if (child.currentAge < 18) return child;

    let path: PastorChild['careerPath'];

    if (child.rebelling || child.relationshipWithDaddy < 0) {
        path = 'reject_all';
    } else if (child.personality.spirituality > 70 && child.relationshipWithDaddy > 50) {
        path = 'ministry';
    } else if (child.personality.ambition > 70) {
        path = 'business';
    } else {
        path = 'professional';
    }

    return { ...child, careerPath: path };
}

// ============================================================================
// SUCCESSION MECHANICS
// ============================================================================

/**
 * Evaluate successor readiness
 */
export function evaluateSuccessorReadiness(
    successor: Successor,
    churchSize: number,
    churchComplexity: number
): { ready: boolean; score: number; gaps: string[] } {
    const gaps: string[] = [];

    if (successor.competence < 60) gaps.push('Needs more training');
    if (successor.loyalty < 70) gaps.push('Loyalty concerns');
    if (successor.congregationApproval < 50) gaps.push('Congregation skeptical');
    if (successor.boardApproval < 50) gaps.push('Board not convinced');
    if (successor.yearsInMinistry < 5) gaps.push('Needs more experience');
    if (successor.publicImage < 40) gaps.push('Public image issues');

    const score = (
        successor.competence * 0.25 +
        successor.loyalty * 0.2 +
        successor.congregationApproval * 0.2 +
        successor.boardApproval * 0.15 +
        successor.publicImage * 0.1 +
        Math.min(100, successor.yearsInMinistry * 10) * 0.1
    );

    return {
        ready: gaps.length === 0 && score > 70,
        score,
        gaps
    };
}

/**
 * Execute succession
 */
export function executeSuccession(
    dynasty: Dynasty,
    successor: Successor,
    type: SuccessionPlan['type']
): {
    success: boolean;
    memberRetention: number;  // % who stay
    wealthRetention: number;
    narrative: string;
    newProblems: string[];
} {
    let memberRetention = 0.8;  // Base 80%
    let wealthRetention = 0.9;  // Base 90%
    const problems: string[] = [];

    // Adjustments based on successor and type
    if (successor.relationship === 'child') {
        memberRetention += 0.1;  // Family succession is accepted
    } else if (successor.relationship === 'outsider') {
        memberRetention -= 0.15; // Outsiders face resistance
        problems.push('Old guard resisting new leadership');
    }

    if (type === 'contested') {
        memberRetention -= 0.2;
        problems.push('Church split between factions');
    }

    if (successor.hiddenAgenda) {
        problems.push('Successor has hidden agenda that may emerge');
    }

    if (successor.congregationApproval < 40) {
        memberRetention -= 0.15;
        problems.push('Many members leaving due to low approval');
    }

    // Calculate success
    const readiness = evaluateSuccessorReadiness(successor, 0, 0);
    const success = readiness.ready && memberRetention > 0.5;

    return {
        success,
        memberRetention: Math.max(0.3, memberRetention),
        wealthRetention: Math.max(0.4, wealthRetention),
        narrative: success
            ? `${successor.name} has taken over the ministry. A new era begins.`
            : `The transition was troubled. The church is in crisis.`,
        newProblems: problems
    };
}

// ============================================================================
// LEGACY SYSTEM
// ============================================================================

/**
 * Calculate legacy score
 */
export function calculateLegacy(dynasty: Dynasty): {
    score: number;
    title: string;
    description: string;
} {
    const institutionPoints = dynasty.legacy.filter(l => l.type === 'institution').length * 20;
    const buildingPoints = dynasty.legacy.filter(l => l.type === 'building').length * 15;
    const doctrinePoints = dynasty.legacy.filter(l => l.type === 'doctrine').length * 10;
    const achievementPoints = dynasty.legacy.filter(l => l.type === 'achievement').length * 25;
    const scandalPenalty = dynasty.legacy.filter(l => l.type === 'scandal').length * 30;

    const peakBonus = (dynasty.peakMembers / 10000) + (dynasty.peakWealth / 1000000000);
    const generationBonus = dynasty.currentGeneration * 20;

    const score = Math.max(0,
        institutionPoints + buildingPoints + doctrinePoints + achievementPoints - scandalPenalty +
        peakBonus + generationBonus
    );

    let title: string;
    let description: string;

    if (score > 150) {
        title = 'Legendary Dynasty';
        description = 'Your ministry will be remembered for generations. History books will tell your story.';
    } else if (score > 100) {
        title = 'Great Ministry';
        description = 'You built something significant. Many lives were changed.';
    } else if (score > 50) {
        title = 'Notable Work';
        description = 'Your ministry made an impact, though mixed.';
    } else if (score > 0) {
        title = 'Forgotten Pastor';
        description = 'Within years, few will remember you.';
    } else {
        title = 'Cautionary Tale';
        description = 'Your story will be told as a warning to others.';
    }

    return { score, title, description };
}

// ============================================================================
// EXPORTS
// ============================================================================

export function createEmptyDynasty(founderName: string, startWeek: number): Dynasty {
    return {
        founderName,
        foundedWeek: startWeek,
        currentGeneration: 1,
        peakMembers: 0,
        peakWealth: 0,
        totalWeeks: 0,
        successors: [],
        chosenSuccessor: null,
        successionPlan: null,
        legacy: []
    };
}

export function addLegacyItem(
    dynasty: Dynasty,
    type: LegacyItem['type'],
    name: string,
    description: string,
    impact: number,
    week: number
): Dynasty {
    return {
        ...dynasty,
        legacy: [...dynasty.legacy, {
            id: `LEGACY_${Date.now()}`,
            type,
            name,
            description,
            impact,
            weekCreated: week
        }]
    };
}
