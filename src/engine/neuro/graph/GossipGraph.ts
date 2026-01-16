import * as tf from '@tensorflow/tfjs';
import { GraphNode, GraphEdge, SignalPacket } from './GraphTypes';
import { VECTOR_SIZE, EmotionalState, VIBE_DIMENSIONS } from '../EmotionalState';
import { addVectors, scaleVector, normalize } from '@/lib/ml/VectorMath';

/**
 * The Gossip Graph Manager
 * Handles the Tensor operations for signal propagation.
 */
export class GossipGraph {
    private nodes: Map<string, GraphNode>;
    private edges: GraphEdge[];
    private tensorCache: {
        adjacency?: tf.Tensor2D;
        trust?: tf.Tensor2D;
    } = {};

    constructor(nodes: GraphNode[], edges: GraphEdge[]) {
        this.nodes = new Map(nodes.map(n => [n.id, n]));
        this.edges = edges;
    }

    /**
     * Propagate a Signal through the network using Matrix Multiplication
     * NewState = CurrentState + (Adjacency * SignalStrength * Trust)
     */
    public async propagateSignal(signal: SignalPacket, steps: number = 3): Promise<Map<string, EmotionalState>> {
        const nodeList = Array.from(this.nodes.values());
        const nodeIndex = new Map(nodeList.map((n, i) => [n.id, i]));
        const N = nodeList.length;

        if (N === 0) return new Map();

        // 1. Prepare Signal Injection Vector (N x 1)
        // Only the origin node starts with the signal
        const signalVector = tf.buffer([N, 1]);
        const originIdx = nodeIndex.get(signal.originNodeId);
        if (originIdx !== undefined) {
            signalVector.set(signal.strength, originIdx, 0);
        }
        let currentSignal = signalVector.toTensor() as tf.Tensor2D;

        // 2. Build Adjacency/Trust Matrix (N x N) if not cached
        // We use a simplified weighted adjacency where Weight = Trust * Influence
        if (!this.tensorCache.adjacency) {
            const adjBuffer = tf.buffer([N, N]);

            this.edges.forEach(edge => {
                const srcIdx = nodeIndex.get(edge.source);
                const tgtIdx = nodeIndex.get(edge.target);

                if (srcIdx !== undefined && tgtIdx !== undefined) {
                    // Propagate based on Influence of Source and Trust of Target
                    // If Target trusts Source, signal flows easily.
                    const sourceNode = this.nodes.get(edge.source);
                    const weight = (sourceNode?.influence || 0.5) * edge.trust;
                    adjBuffer.set(weight, tgtIdx, srcIdx); // Directed graph
                }
            });

            this.tensorCache.adjacency = adjBuffer.toTensor() as tf.Tensor2D;
        }

        const adjacency = this.tensorCache.adjacency;

        // 3. Simulation Loop (Diffusion)
        // Step t+1 = Adjacency * Step t * Decay
        for (let i = 0; i < steps; i++) {
            const nextStep = tf.matMul(adjacency, currentSignal);
            const decayed = nextStep.mul(signal.decayRate); // Apply decay

            // Add new activation to current (Accumulation)
            const accumulated = currentSignal.add(decayed);

            currentSignal.dispose();
            nextStep.dispose();
            currentSignal = accumulated as tf.Tensor2D;
        }

        // 4. Extract Results and Update Visual State
        const activationValues = await currentSignal.data();
        const affectedStates = new Map<string, EmotionalState>();

        // Apply the signal payload to affected nodes
        nodeList.forEach((node, i) => {
            const activation = activationValues[i];
            if (activation > 0.1) { // Threshold
                // Modulate the node's emotional state based on signal vector
                const impact = scaleVector(signal.vector, activation);
                const newVector = addVectors(node.emotionalState.vector, impact);

                // Create updated state
                affectedStates.set(node.id, {
                    ...node.emotionalState,
                    vector: normalize(newVector), // Normalize to keep sanity
                    intensity: Math.min(1, node.emotionalState.intensity + activation * 0.1)
                });
            } else {
                affectedStates.set(node.id, node.emotionalState);
            }
        });

        currentSignal.dispose();

        return affectedStates;
    }

    /**
     * Dispose tensors to free GPU memory
     */
    public dispose() {
        if (this.tensorCache.adjacency) {
            this.tensorCache.adjacency.dispose();
            this.tensorCache.adjacency = undefined;
        }
    }
}
