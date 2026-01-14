/**
 * NPC Memory & Relationship System
 * 
 * MCU-style interconnected universe:
 * - NPCs remember past interactions
 * - Relationships evolve over time
 * - NPCs talk to each other (spreading intel)
 * - Recurring characters across events
 * - Rival, ally, neutral dynamics
 */

// ============================================================================
// NPC DEFINITIONS
// ============================================================================

export interface NPC {
    id: string;
    name: string;
    type: NPCType;
    relationship: number;           // -100 to 100
    disposition: 'ally' | 'neutral' | 'rival' | 'enemy';
    memories: NPCMemory[];
    secrets: string[];              // Secrets they know about player
    influence: number;              // How powerful they are
    lastInteraction: number;        // Week
    meetCount: number;
    traits: string[];
    canExpose: boolean;             // Can they expose player?
    isRecurring: boolean;           // Will they come back?
}

export type NPCType =
    | 'family_member'
    | 'church_member'
    | 'rival_pastor'
    | 'journalist'
    | 'politician'
    | 'businessperson'
    | 'efcc_agent'
    | 'former_member'
    | 'romantic_interest'
    | 'staff'
    | 'mentor';

export interface NPCMemory {
    id: string;
    week: number;
    eventType: string;
    playerAction: string;
    impact: 'very_positive' | 'positive' | 'neutral' | 'negative' | 'very_negative';
    emotionalWeight: number;        // How much this matters to them
    canReference: boolean;          // Will they bring this up?
    decayRate: number;              // How fast they forget
}

export interface RelationshipGraph {
    npcs: Record<string, NPC>;
    connections: NPCConnection[];   // Who knows who
    infoSpread: InfoSpread[];       // Gossip flowing between NPCs
}

export interface NPCConnection {
    npc1Id: string;
    npc2Id: string;
    relationship: 'family' | 'friends' | 'colleagues' | 'lovers' | 'enemies' | 'acquaintances';
    trustLevel: number;             // How much they share with each other
}

export interface InfoSpread {
    originNpcId: string;
    targetNpcId: string;
    info: string;
    week: number;
    spread: boolean;
}

// ============================================================================
// NPC DATABASE - RECURRING CHARACTERS
// ============================================================================

export const RECURRING_NPC_TEMPLATES: Partial<NPC>[] = [
    // Rival pastors
    {
        name: 'Pastor Ekechi Obi',
        type: 'rival_pastor',
        disposition: 'rival',
        traits: ['jealous', 'charismatic', 'ambitious'],
        influence: 7000,
        isRecurring: true
    },
    {
        name: 'Apostle Grace Makinde',
        type: 'rival_pastor',
        disposition: 'rival',
        traits: ['wealthy', 'politically_connected', 'vindictive'],
        influence: 8500,
        isRecurring: true
    },

    // Journalists
    {
        name: 'Kemi Adetola',
        type: 'journalist',
        disposition: 'neutral',
        traits: ['investigative', 'persistent', 'fair'],
        influence: 4000,
        isRecurring: true
    },
    {
        name: 'Blogger "PastorWatch"',
        type: 'journalist',
        disposition: 'enemy',
        traits: ['anonymous', 'relentless', 'connected'],
        influence: 6000,
        isRecurring: true
    },

    // Politicians
    {
        name: 'Senator Adamu Bello',
        type: 'politician',
        disposition: 'neutral',
        traits: ['corrupt', 'generous', 'pragmatic'],
        influence: 9000,
        isRecurring: true
    },
    {
        name: 'Governor\'s Wife Mrs. Okafor',
        type: 'politician',
        disposition: 'ally',
        traits: ['influential', 'religious', 'unpredictable'],
        influence: 8000,
        isRecurring: true
    },

    // Family
    {
        name: 'Uncle Chidi',
        type: 'family_member',
        disposition: 'neutral',
        traits: ['traditional', 'demanding', 'loving'],
        influence: 2000,
        isRecurring: true
    },
    {
        name: 'Mama',
        type: 'family_member',
        disposition: 'ally',
        traits: ['supportive', 'worried', 'prays_always'],
        influence: 1000,
        isRecurring: true
    },

    // EFCC
    {
        name: 'Agent Musa Ibrahim',
        type: 'efcc_agent',
        disposition: 'neutral',
        traits: ['incorruptible', 'patient', 'thorough'],
        influence: 7000,
        isRecurring: true
    },

    // Former members
    {
        name: 'Brother James (Former Accountant)',
        type: 'former_member',
        disposition: 'enemy',
        traits: ['knows_too_much', 'bitter', 'waiting'],
        influence: 3000,
        isRecurring: true
    }
];

// ============================================================================
// NPC FUNCTIONS
// ============================================================================

/**
 * Create a new NPC
 */
export function createNPC(
    name: string,
    type: NPCType,
    traits: string[] = [],
    influence: number = 1000
): NPC {
    return {
        id: `NPC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name,
        type,
        relationship: 0,
        disposition: 'neutral',
        memories: [],
        secrets: [],
        influence,
        lastInteraction: 0,
        meetCount: 0,
        traits,
        canExpose: false,
        isRecurring: false
    };
}

/**
 * Create NPC from template
 */
export function createNPCFromTemplate(template: Partial<NPC>): NPC {
    return {
        id: `NPC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: template.name || 'Unknown',
        type: template.type || 'church_member',
        relationship: 0,
        disposition: template.disposition || 'neutral',
        memories: [],
        secrets: [],
        influence: template.influence || 1000,
        lastInteraction: 0,
        meetCount: 0,
        traits: template.traits || [],
        canExpose: false,
        isRecurring: template.isRecurring || false
    };
}

/**
 * Record an interaction as memory
 */
export function recordNPCMemory(
    npc: NPC,
    week: number,
    eventType: string,
    playerAction: string,
    impact: NPCMemory['impact']
): NPC {
    const emotionalWeights: Record<NPCMemory['impact'], number> = {
        very_positive: 40,
        positive: 20,
        neutral: 5,
        negative: 25,
        very_negative: 50
    };

    const memory: NPCMemory = {
        id: `MEM_${Date.now()}`,
        week,
        eventType,
        playerAction,
        impact,
        emotionalWeight: emotionalWeights[impact],
        canReference: impact !== 'neutral',
        decayRate: 0.95  // Loses 5% significance per week
    };

    // Update relationship based on impact
    const relationshipChanges: Record<NPCMemory['impact'], number> = {
        very_positive: 25,
        positive: 10,
        neutral: 0,
        negative: -15,
        very_negative: -35
    };

    return {
        ...npc,
        memories: [...npc.memories, memory],
        relationship: Math.max(-100, Math.min(100, npc.relationship + relationshipChanges[impact])),
        lastInteraction: week,
        meetCount: npc.meetCount + 1
    };
}

/**
 * Get NPC's most significant memory
 */
export function getMostSignificantMemory(npc: NPC): NPCMemory | null {
    if (npc.memories.length === 0) return null;

    return npc.memories.reduce((prev, current) =>
        current.emotionalWeight > prev.emotionalWeight ? current : prev
    );
}

/**
 * Check if NPC will reference a past event
 */
export function willNPCReferPast(npc: NPC, currentWeek: number): { willRefer: boolean; memory: NPCMemory | null; narrative: string } {
    const referencableMemories = npc.memories.filter(m =>
        m.canReference && m.impact !== 'neutral'
    );

    if (referencableMemories.length === 0) {
        return { willRefer: false, memory: null, narrative: '' };
    }

    // Most emotional memories are most likely to be referenced
    const sortedByWeight = [...referencableMemories].sort((a, b) =>
        b.emotionalWeight - a.emotionalWeight
    );

    const topMemory = sortedByWeight[0];
    const weeksSince = currentWeek - topMemory.week;

    // Probability decreases with time but never fully goes away
    const referenceChance = topMemory.emotionalWeight * Math.pow(topMemory.decayRate, weeksSince);
    const willRefer = Math.random() * 100 < referenceChance;

    if (!willRefer) {
        return { willRefer: false, memory: null, narrative: '' };
    }

    const narratives = {
        very_positive: `"Remember when you ${topMemory.playerAction}? I will never forget that kindness."`,
        positive: `"I still appreciate what you did for me in ${topMemory.eventType}."`,
        neutral: '',
        negative: `"I haven't forgotten what you did. ${topMemory.playerAction}."`,
        very_negative: `"You think I forgot? ${topMemory.playerAction}. I remember EVERYTHING."`
    };

    return {
        willRefer: true,
        memory: topMemory,
        narrative: narratives[topMemory.impact]
    };
}

/**
 * Update NPC disposition based on relationship
 */
export function updateNPCDisposition(npc: NPC): NPC {
    let disposition: NPC['disposition'];

    if (npc.relationship >= 70) disposition = 'ally';
    else if (npc.relationship >= 20) disposition = 'neutral';
    else if (npc.relationship >= -30) disposition = 'rival';
    else disposition = 'enemy';

    return { ...npc, disposition };
}

/**
 * Add secret that NPC knows about player
 */
export function npcLearnsSecret(npc: NPC, secret: string): NPC {
    return {
        ...npc,
        secrets: [...npc.secrets, secret],
        canExpose: true
    };
}

// ============================================================================
// GOSSIP / INFO SPREAD SYSTEM
// ============================================================================

/**
 * Spread information between connected NPCs
 */
export function spreadGossip(
    graph: RelationshipGraph,
    originId: string,
    info: string,
    week: number
): RelationshipGraph {
    const origin = graph.npcs[originId];
    if (!origin) return graph;

    // Find connections
    const connections = graph.connections.filter(c =>
        c.npc1Id === originId || c.npc2Id === originId
    );

    const newSpreads: InfoSpread[] = [];

    for (const conn of connections) {
        const targetId = conn.npc1Id === originId ? conn.npc2Id : conn.npc1Id;

        // Chance of spreading based on trust level
        if (Math.random() * 100 < conn.trustLevel) {
            newSpreads.push({
                originNpcId: originId,
                targetNpcId: targetId,
                info,
                week,
                spread: true
            });

            // Target NPC learns the secret
            if (graph.npcs[targetId]) {
                graph.npcs[targetId] = npcLearnsSecret(graph.npcs[targetId], info);
            }
        }
    }

    return {
        ...graph,
        infoSpread: [...graph.infoSpread, ...newSpreads]
    };
}

/**
 * Check if player's secret has reached a dangerous NPC
 */
export function hasSecretReachedDanger(
    graph: RelationshipGraph,
    secret: string
): { reached: boolean; dangerousNPC: NPC | null } {
    const dangerousTypes: NPCType[] = ['journalist', 'efcc_agent', 'rival_pastor'];

    for (const npc of Object.values(graph.npcs)) {
        if (npc.secrets.includes(secret) &&
            (dangerousTypes.includes(npc.type) || npc.disposition === 'enemy')) {
            return { reached: true, dangerousNPC: npc };
        }
    }

    return { reached: false, dangerousNPC: null };
}

// ============================================================================
// EXPORTS
// ============================================================================

export function createEmptyRelationshipGraph(): RelationshipGraph {
    return {
        npcs: {},
        connections: [],
        infoSpread: []
    };
}
