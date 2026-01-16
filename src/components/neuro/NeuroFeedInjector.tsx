"use client";

import { useEffect, useRef } from 'react';
import { useMLEngine } from '@/context/MLEngineContext';
import { useGameStore } from '@/store/useGameStore';
import { getDominantVibe } from '@/engine/neuro/EmotionalState';
import { generateNeuroNarrative } from '@/engine/neuro/semantic/SmartNarrativeEngine';

export default function NeuroFeedInjector() {
    const { globalVibe, isReady } = useMLEngine();
    const { addTimelineEvent, week } = useGameStore();
    const lastVibeRef = useRef<string | null>(null);

    useEffect(() => {
        if (!isReady || !globalVibe) return;

        const currentDominant = getDominantVibe(globalVibe.vector);

        // Inject Thought Bubble on Vibe Shift
        if (lastVibeRef.current !== currentDominant) {
            // GEN 2: NEURO-GRAMMAR ENGINE
            // Instead of static templates, we generate a unique sentence
            const thoughts = [];

            // 1. Explicit reasoning (The "Why")
            thoughts.push(`Detected Vibe: ${currentDominant} (${globalVibe.intensity.toFixed(2)})`);

            // 2. Procedural Narrative (The "What")
            thoughts.push(generateNeuroNarrative(globalVibe, 'observation'));

            addTimelineEvent({
                id: `neuro-${Date.now()}`,
                title: 'Collective Consciousness',
                description: thoughts.join(' '),
                timestamp: Date.now(),
                type: 'spiritual',
                icon: '💭'
            });

            lastVibeRef.current = currentDominant;
        }

    }, [globalVibe, isReady, addTimelineEvent, week]);

    return null;
}
