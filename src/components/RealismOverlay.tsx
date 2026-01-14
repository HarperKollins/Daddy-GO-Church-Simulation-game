'use client';

import React, { useState, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { createAudioManager } from '@/engine/audioManager';
import ThreeDEmoji from './ThreeDEmoji';

// Fallback for missing types in current dev context
interface RealismEvent {
    id: string;
    type: 'nepa_failure' | 'police_stop' | 'fuel_scarcity' | 'traffic_jam' | 'japa_opportunity';
    severity: number;
    description: string;
    choices: {
        id: string;
        label: string;
        cost?: number;
        consequence: string;
    }[];
}

// Sample events (for prototype, usually comes from store)
const SAMPLE_EVENTS: RealismEvent[] = [
    {
        id: 'NEPA_001',
        type: 'nepa_failure',
        severity: 0.8,
        description: "NEPA has taken the light! The church is now operating in darkness. The generator is making a funny noise.",
        choices: [
            { id: 'gen', label: 'Buy Fuel & Run Gen', cost: 50000, consequence: 'Light restored. -50k Cash' },
            { id: 'dark', label: 'Hold Vigil in Darkness', cost: 0, consequence: 'Atmosphere intensified! +Spirit, -Comfort' },
            { id: 'solar', label: 'Install Solar (Expensive)', cost: 5000000, consequence: 'Permanent Power Solution!' }
        ]
    }
];

export default function RealismOverlay() {
    const { engine, stats, modifyStat } = useGameStore();
    const [audioManager] = useState(() => createAudioManager());
    const [activeEvent, setActiveEvent] = useState<RealismEvent | null>(null);

    // Watch for triggers (Mock logic: trigger NEPA if no power)
    // In real integration, we'd watch engine.realism.activeEvents
    useEffect(() => {
        // Mock trigger for testing: 1% chance per second if not engaged
        const interval = setInterval(() => {
            if (!activeEvent && Math.random() < 0.005) { // 0.5% chance tick
                const event = SAMPLE_EVENTS[0]; // Just use NEPA for now
                setActiveEvent(event);
                audioManager.playEffect('EVENT_CRISIS');
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [activeEvent, audioManager]);

    const handleChoice = (choice: any) => {
        audioManager.playEffect('UI_CLICK');

        if (choice.cost && stats.personalCash < choice.cost) {
            audioManager.playEffect('UI_ERROR');
            return; // Can't afford
        }

        if (choice.cost) {
            modifyStat('personalCash', -choice.cost);
        }

        // Apply logic (simplified)
        if (choice.id === 'gen') {
            audioManager.playEffect('UI_SUCCESS');
        }

        setActiveEvent(null); // Close
    };

    if (!activeEvent) return null;

    // specialized styling based on event type
    const isNepa = activeEvent.type === 'nepa_failure';
    const bgClass = isNepa ? 'bg-black/95' : 'bg-blue-900/90';

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 transition-all duration-1000 ${bgClass} backdrop-blur-sm`}>
            <div className="max-w-xl w-full bg-white rounded-2xl p-8 shadow-2xl relative overflow-hidden text-center animate-bounce-in">

                {/* Visual Header */}
                <div className="mb-6 flex justify-center relative">
                    {isNepa && (
                        <>
                            <div className="absolute inset-0 bg-yellow-500/20 blur-xl animate-pulse" />
                            <ThreeDEmoji icon="alert" fallback="⚡" size={80} animate={true} />
                        </>
                    )}
                </div>

                <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">
                    {activeEvent.type.replace('_', ' ')}!
                </h2>

                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    {activeEvent.description}
                </p>

                <div className="space-y-3">
                    {activeEvent.choices.map(choice => (
                        <button
                            key={choice.id}
                            onClick={() => handleChoice(choice)}
                            className="w-full p-4 rounded-xl border-2 border-gray-100 hover:border-black hover:bg-gray-50 transition-all flex items-center justify-between group"
                        >
                            <span className="font-bold text-gray-800">{choice.label}</span>
                            {choice.cost && (
                                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-mono group-hover:bg-red-200">
                                    -₦{choice.cost.toLocaleString()}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <p className="mt-6 text-xs text-gray-400">
                    NIGERIAN REALITY ENGINE v1.0
                </p>
            </div>
        </div>
    );
}
