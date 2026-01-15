'use client';

import React, { useState, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { createAudioManager } from '@/engine/audioManager';
import ThreeDEmoji from './ThreeDEmoji';

import { checkInfrastructureFailure, RealismEvent } from '@/engine/nigerianRealismEngine';

export default function RealismOverlay() {
    const { engine, stats, modifyStat, week } = useGameStore();
    const [audioManager] = useState(() => createAudioManager());
    const [activeEvent, setActiveEvent] = useState<RealismEvent | null>(null);

    // Watch for triggers (1% chance per tick to check for realism events)
    useEffect(() => {
        const interval = setInterval(() => {
            if (!activeEvent && Math.random() < 0.01) {
                // Determine season (Wet: April-Oct, Dry: Nov-March)
                // Simplified: Weeks 1-26 Dry, 27-52 Wet
                const currentWeekMod = (week || 1) % 52;
                const season = (currentWeekMod >= 16 && currentWeekMod <= 42) ? 'rainy' : 'dry';

                const event = checkInfrastructureFailure(season);

                if (event) {
                    setActiveEvent(event);
                    audioManager.playEffect('EVENT_CRISIS');
                }
            }
        }, 3000); // Check every 3 seconds

        return () => clearInterval(interval);
    }, [activeEvent, week, audioManager]);

    const handleChoice = (choice: { id: string, cost?: number, consequence: string }) => {
        audioManager.playEffect('UI_CLICK');

        // Apply financial cost
        if (choice.cost) {
            if (stats.personalCash >= choice.cost) {
                modifyStat('personalCash', -choice.cost);
            } else if (stats.churchCash >= choice.cost) {
                modifyStat('churchCash', -choice.cost); // Steal from church if broke
            } else {
                // Cant afford
                audioManager.playEffect('UI_ERROR');
                return;
            }
        }

        // Apply stat consequences based on keywords (Simplified logic)
        if (choice.consequence.includes('+Spirit')) modifyStat('anointing', 50);
        if (choice.consequence.includes('-Health')) modifyStat('health', -10);
        if (choice.consequence.includes('-Energy')) modifyStat('energy', -20);
        if (choice.consequence.includes('-Integrity')) modifyStat('scandal', 200); // Corruption risk

        setActiveEvent(null);
    };



    if (!activeEvent) return null;

    // specialized styling based on event type
    const isNepa = activeEvent.type === 'nepa_failure';
    // Inline styles for fixed overlay to ensure visibility
    const overlayStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isNepa ? 'rgba(0,0,0,0.95)' : 'rgba(30,58,138,0.9)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        transition: 'all 1s ease'
    };

    return (
        <div style={overlayStyle}>
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
            </div>
        </div>
    );
}

