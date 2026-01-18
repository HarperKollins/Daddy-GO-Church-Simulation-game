import * as tf from '@tensorflow/tfjs';
import { EmotionalState } from '../EmotionalState';
import { CoreStats } from '@/types/game';

/**
 * 🤖 RL DIRECTOR AGENT ("The Dopamine Modulator")
 * 
 * A reduced-complexity Policy Gradient agent.
 * Goal: Maximize "Engagement" (Session Length / Weeks Played).
 * 
 * Inputs (Observation Space):
 * - Normalized Game Stats (Cash, Fame, Stress, etc.)
 * - Normalized Global Vibe (6D Vector)
 * - Recent Churn Rate (Members leaving)
 * 
 * Outputs (Action Space):
 * - 0: WAIT (Do nothing)
 * - 1: TRIGGER_CRISIS (Introduce tension)
 * - 2: TRIGGER_MIRACLE (Relieve tension)
 * - 3: SEND_GIFT (Reward player)
 * - 4: SPAWN_RIVAL (Challenge player)
 */

const INPUT_SIZE = 15; // 8 stats + 6 vibe + 1 churn
const ACTION_SIZE = 5;

export class RLDirector {
    private model: tf.LayersModel;
    private memory: {
        states: tf.Tensor[];
        actions: number[];
        rewards: number[];
    };
    private lastActionWeek: number = 0;

    constructor() {
        this.memory = { states: [], actions: [], rewards: [] };
        // Initialize simple 2-layer Dense Network
        this.model = this.createModel();
        console.log("🤖 RL Director: Agent Initialized");
    }

    private createModel(): tf.LayersModel {
        const model = tf.sequential();

        // Input -> Hidden Layer 1 (Relu)
        model.add(tf.layers.dense({
            units: 16,
            activation: 'relu',
            inputShape: [INPUT_SIZE]
        }));

        // Hidden Layer 2
        model.add(tf.layers.dense({
            units: 8,
            activation: 'relu'
        }));

        // Output Layer (Softmax: Probability of each action)
        model.add(tf.layers.dense({
            units: ACTION_SIZE,
            activation: 'softmax'
        }));

        // Compile with Adam optimizer
        model.compile({
            optimizer: tf.train.adam(0.01),
            loss: 'categoricalCrossentropy'
        });

        return model;
    }

    /**
     * DECIDE ACTION (Inference)
     * Runs forward pass to choose an action based on probability.
     */
    public decide(
        stats: CoreStats,
        vibe: EmotionalState,
        week: number
    ): { action: number; probability: number } {

        // 1. Preprocess State into Tensor
        const stateVector = this.preprocessState(stats, vibe);
        const inputTensor = tf.tensor2d([stateVector], [1, INPUT_SIZE]);

        // 2. Predict Probabilities
        const prediction = this.model.predict(inputTensor) as tf.Tensor;
        const probabilities = prediction.dataSync() as Float32Array;

        // 3. Sample Action (Weighted Random)
        const action = this.sampleAction(probabilities);

        // Store memory for Training later
        // In a real PPO, we store log_probs, values etc.
        // Here we just store state for simple Policy Gradient replay
        // tf.tidy needed? We need to keep some tensors. 
        // For simple usage, we just clean up inputTensor.
        inputTensor.dispose();
        prediction.dispose();

        return { action, probability: probabilities[action] };
    }

    /**
     * TRAIN (Learning Step)
     * Called when a "Session" ends or periodically.
     * We assume positive reward if player kept playing.
     */
    public async train(reward: number) {
        // Simple mock training visual log for now
        // In production: Use `model.fit()` with collected batch
        console.log(`🤖 RL Director: Learning... Reward: ${reward}`);

        // For MVP: We don't actually run backprop on the client to save battery.
        // We pretend to learn by logging specific feedback.
        // If we wanted to run it:
        // const xs = tf.tensor2d(this.memory.states);
        // const ys = ... (compute biased labels based on reward)
        // await this.model.fit(xs, ys);
    }

    // ===================================
    // HELPERS
    // ===================================

    private preprocessState(stats: CoreStats, vibe: EmotionalState): number[] {
        // Normalize 0-10000 stats to 0-1
        return [
            stats.health / 10000,
            Math.min(1, stats.personalCash / 10000000), // Cap at 10m for norm
            Math.min(1, stats.churchCash / 50000000),
            stats.anointing / 10000,
            stats.fame / 10000,
            stats.scandal / 10000,
            // energy removed
            stats.stress / 10000,
            stats.influence / 10000,
            // Vibe Vector (6 dims)
            ...vibe.vector,
            // Extra: Day of week?
            0.5
        ];
    }

    private sampleAction(probs: Float32Array): number {
        const rand = Math.random();
        let cumulative = 0;
        for (let i = 0; i < probs.length; i++) {
            cumulative += probs[i];
            if (rand < cumulative) return i;
        }
        return 0; // Fallback
    }

    public getActionName(actionId: number): string {
        switch (actionId) {
            case 0: return 'WAIT';
            case 1: return 'TRIGGER_CRISIS';
            case 2: return 'TRIGGER_MIRACLE';
            case 3: return 'SEND_GIFT';
            case 4: return 'SPAWN_RIVAL';
            default: return 'UNKNOWN';
        }
    }
}
