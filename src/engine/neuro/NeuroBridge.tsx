"use client";

import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/useGameStore';
// Temporarily disabled to prevent infinite loop crashes
// import { useMLEngine } from '@/context/MLEngineContext';
// import { RLDirector } from './rl/RLDirector';
// import { GraphNode } from './graph/GraphTypes';
// import { createNeutralState, getDominantVibe } from './EmotionalState';

/**
 * NeuroBridge
 * 
 * TEMPORARILY DISABLED: The ML engine integration was causing infinite re-render loops.
 * The RL Director and genetics evolution systems need to be refactored to use:
 * 1. Stable function references (useCallback)
 * 2. Ref-based state updates instead of context state
 * 3. Proper dependency management in useEffect
 * 
 * Re-enable after fixing the architectural issues.
 */
export default function NeuroBridge() {
    // TEMPORARY: Return null to disable all ML features and prevent crashes
    return null;

    // Original code disabled below
    /*
    const {
        week,
        stats,
        church,
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

    const directorRef = useRef<RLDirector>(new RLDirector());

    // ... rest of original code disabled
    */
}
