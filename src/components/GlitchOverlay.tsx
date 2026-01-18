'use client';

import React, { useEffect, useState } from 'react';
import { useGameStore } from '@/store/useGameStore';

export default function GlitchOverlay() {
    const { stats, hiddenFlags, week } = useGameStore();
    const [active, setActive] = useState(false);
    const [intensity, setIntensity] = useState(0);

    // Trigger logic
    useEffect(() => {
        // Corruption calculation: High Scandal + Low Integrity + High Stress
        const corruption = (stats.scandal || 0) + (stats.stress / 2);

        // Thresholds for the glitch
        if (corruption > 8000) { // High corruption
            setIntensity(2); // Heavy glitch
            setActive(true);
        } else if (corruption > 5000) {
            setIntensity(1); // Mild glitch
            if (Math.random() < 0.1) setActive(true); // Random flashes
            else setActive(false);
        } else {
            setActive(false);
        }

        // "The Architect" interactions (Random nervous breakdown flashes)
        if (stats.stress > 9500 && Math.random() < 0.05) {
            setActive(true);
            setIntensity(3);
            setTimeout(() => setActive(false), 200);
        }

    }, [stats.scandal, stats.stress, week]); // Re-check on stat changes

    if (!active) return null;

    // Visuals
    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden mix-blend-difference">
            {/* Noise Layer */}
            <div className="absolute inset-0 opacity-20 animate-noise bg-[url('/noise.png')]"></div>

            {/* CRT Scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/10 to-transparent background-size-[100%_4px] animate-scanline"></div>

            {/* Text Glitches */}
            {intensity >= 2 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-black text-red-600 opacity-10 animate-pulse tracking-widest">
                    WAKE UP
                </div>
            )}

            {intensity >= 3 && (
                <div className="absolute inset-0 bg-red-900/20 animate-flash"></div>
            )}

            <style jsx>{`
            @keyframes noise {
                0%, 100% { transform: translate(0,0); }
                10% { transform: translate(-5%, -5%); }
                20% { transform: translate(-10%, 5%); }
                30% { transform: translate(5%, -10%); }
                40% { transform: translate(-5%, 15%); }
                50% { transform: translate(-10%, 5%); }
                60% { transform: translate(15%, 0); }
                70% { transform: translate(0, 10%); }
                80% { transform: translate(-15%, 0); }
                90% { transform: translate(10%, 5%); }
            }
            .animate-noise {
                animation: noise 0.2s infinite;
            }
            .animate-scanline {
                background: linear-gradient(to bottom, transparent 50%, rgba(0, 255, 0, 0.02) 51%);
                background-size: 100% 4px;
            }
            @keyframes flash {
                0%, 50%, 100% { opacity: 0; }
                25%, 75% { opacity: 1; }
            }
            .animate-flash {
                animation: flash 0.1s infinite;
            }
        `}</style>
        </div>
    );
}
