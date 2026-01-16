"use client";

import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { useMLEngine } from '@/context/MLEngineContext';
import { RLDirector } from './rl/RLDirector';
import { GraphNode } from './graph/GraphTypes';
import { createNeutralState, getDominantVibe } from './EmotionalState';

/**
 * NeuroBridge
 * 
 * Connects the "Game World" (Zustand) to the "Neural World" (TF.js).
 * Runs on every game tick (week change).
 */
export default function NeuroBridge() {
    const {
        week,
        stats,
        church, // Correctly pulling church state
        engine,
    } = useGameStore();

    const {
        isReady,
        graph,
        genetics,
        globalVibe,
        updateVibe,
        injectChaos
    } = useMLEngine();

    // Persist the RL Director Agent across renders
    const directorRef = useRef<RLDirector>(new RLDirector());

    // 1. Sync Game State to Neural Graph
    useEffect(() => {
        if (!isReady || !graph) return;

        // Initialize Synthetic Graph if Empty (Visualization Support)
        const initSyntheticGraph = async () => {
            const nodes: GraphNode[] = [];
            const count = Math.max(20, Math.min(50, (stats.churchCash / 1000) + 20));

            for (let i = 0; i < count; i++) {
                nodes.push({
                    id: `node_${i}`,
                    type: i === 0 ? 'PASTOR' : 'MEMBER',
                    name: i === 0 ? 'Daddy G.O.' : `Member ${i}`,
                    emotionalState: createNeutralState(),
                    gullibility: Math.random(),
                    influence: i === 0 ? 1.0 : Math.random() * 0.3,
                    resistance: Math.random()
                });
            }
        };

        initSyntheticGraph();

    }, [isReady, graph, stats.churchCash]);


    // 2. The RL Director Loop (Runs on Week Change)
    useEffect(() => {
        if (!isReady || !globalVibe) return;

        const agent = directorRef.current;
        const actionResult = agent.decide(stats, globalVibe, week);
        const actionName = agent.getActionName(actionResult.action);

        if (actionResult.action !== 0) { // 0 is WAIT
            console.log(`🤖 RL DIRECTOR ACTION: ${actionName} (Prob: ${actionResult.probability.toFixed(2)})`);

            if (actionName === 'TRIGGER_CRISIS') {
                console.log("%c CRIMSON SKY PROTOCOL ACTIVATED", "color: red; font-size: 20px");
                injectChaos();
            } else if (actionName === 'TRIGGER_MIRACLE') {
                console.log("%c DIVINE INTERVENTION PROTOCOL", "color: gold; font-size: 20px");
                updateVibe(createNeutralState());
            }
        }

    }, [week, isReady, globalVibe, injectChaos, updateVibe, stats]);

    // 3. EVOLUTION STEP (Genetics) & FEEDBACK LOOP
    useEffect(() => {
        // Guard clause needs to cover all used variables
        if (!genetics || !globalVibe || !church) return;

        // Correctly using church.members
        const memberCount = church.members;
        const evoEvents = genetics.evolve(globalVibe.vector, memberCount);

        if (evoEvents.length > 0) {
            console.log("🧬 EVOLUTION EVENTS:", evoEvents);
        }

        // PHASE D: THE INVISIBLE FEEDBACK LOOP
        // The Congregation's "Collective Soul" pushes back against your influence.

        const collectiveDNA = genetics.getCollectiveDNA();
        // Blend: 90% Current Vibe, 10% Congregation Inertia
        const BLEND_FACTOR = 0.1;

        const newVector = globalVibe.vector.map((val, i) => {
            return val * (1 - BLEND_FACTOR) + collectiveDNA[i] * BLEND_FACTOR;
        });

        // Update the global state silently
        updateVibe({
            vector: newVector,
            intensity: globalVibe.intensity, // Keep intensity for now
            dominantVibe: getDominantVibe(newVector) // Recalculate dominant vibe
        });

    }, [week, isReady, globalVibe, genetics, church, updateVibe]);

    return null; // Logic component
}
