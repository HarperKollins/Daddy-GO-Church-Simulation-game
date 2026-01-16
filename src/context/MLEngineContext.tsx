"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { EmotionalState, createNeutralState, createRandomState } from '@/engine/neuro/EmotionalState';
import { Vector } from '@/lib/ml/VectorMath';
import { GossipGraph } from '@/engine/neuro/graph/GossipGraph';
import { CongregationGenetics } from '@/engine/neuro/evolution/CongregationGenetics';

interface MLEngineContextType {
    isReady: boolean;
    backend: string;
    globalVibe: EmotionalState;
    graph: GossipGraph | null;
    genetics: CongregationGenetics | null;
    showVisualizer: boolean;
    setShowVisualizer: (show: boolean) => void;
    updateVibe: (newVibe: EmotionalState) => void;
    injectChaos: () => void;
}

const MLEngineContext = createContext<MLEngineContextType | null>(null);

export function MLEngineProvider({ children }: { children: React.ReactNode }) {
    const [isReady, setIsReady] = useState(false);
    const [backend, setBackend] = useState<string>('none');
    const [globalVibe, setGlobalVibe] = useState<EmotionalState>(createNeutralState());

    // Engine Subsystems (Refs for persistence)
    const graphRef = useRef<GossipGraph | null>(null);
    const geneticsRef = useRef<CongregationGenetics | null>(null);

    const [showVisualizer, setShowVisualizer] = useState(false);

    useEffect(() => {
        const initTF = async () => {
            try {
                await tf.ready();

                // Try to use WebGL for GPU acceleration
                if (tf.findBackend('webgl')) {
                    await tf.setBackend('webgl');
                } else {
                    console.warn("WebGL backend not found, falling back to CPU");
                    await tf.setBackend('cpu');
                }

                setBackend(tf.getBackend());

                // Initialize Subsystems
                graphRef.current = new GossipGraph([], []);
                geneticsRef.current = new CongregationGenetics();

                setIsReady(true);
                console.log("🧠 Neuro-Simulation Engine Initialized. Backend:", tf.getBackend());
            } catch (err) {
                console.error("Failed to initialize TF.js:", err);
            }
        };

        initTF();
    }, []);

    const updateVibe = (newVibe: EmotionalState) => {
        setGlobalVibe(newVibe);
    };

    const injectChaos = () => {
        const chaos = createRandomState();
        setGlobalVibe(chaos);
        console.log("🌪️ Chaos Injected into the System:", chaos.dominantVibe);
    };

    return (
        <MLEngineContext.Provider value={{
            isReady,
            backend,
            globalVibe,
            graph: graphRef.current,
            genetics: geneticsRef.current,
            showVisualizer,
            setShowVisualizer,
            updateVibe,
            injectChaos
        }}>
            {children}
        </MLEngineContext.Provider>
    );
}

export function useMLEngine() {
    const context = useContext(MLEngineContext);
    if (!context) {
        throw new Error("useMLEngine must be used within an MLEngineProvider");
    }
    return context;
}
