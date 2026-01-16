import { EmotionalState } from "../EmotionalState";

export type NodeType = 'PASTOR' | 'MEMBER' | 'POLITICIAN' | 'MEDIA' | 'RIVAL';

export interface GraphNode {
    id: string;
    type: NodeType;
    name: string;

    // The "Hidden State" of the node (Tensor-ready)
    emotionalState: EmotionalState;

    // Static stats that influence processing
    gullibility: number;  // 0-1: How easily they believe rumors
    influence: number;    // 0-1: How much they affect neighbors
    resistance: number;   // 0-1: How hard they fight back against signals
}

export interface GraphEdge {
    source: string;
    target: string;

    // Relationship Vectors
    trust: number;        // 0-1: How much Target trusts Source
    fear: number;         // 0-1: How much Target fears Source
    debt: number;         // 0-1: Financial/Moral leverage

    // Dynamic Flow
    lastInteraction: number; // Week number
}

export interface SignalPacket {
    id: string;
    type: 'SCANDAL' | 'MIRACLE' | 'PROPHECY' | 'BRIBE';

    // The "Virus" Payload
    vector: number[]; // Dimensionally compatible with EmotionalState
    strength: number; // Initial viral load

    originNodeId: string;
    decayRate: number; // How fast it dies out
}
