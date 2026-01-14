'use client';

/**
 * Death Screen Component
 * 
 * Displayed when the player dies. Shows:
 * - Death cause and epitaph
 * - Timeline of key events
 * - Stats summary
 * - Ribbons earned
 * - Share button
 */

import React from 'react';

interface DeathScreenProps {
    playerName: string;
    age: number;
    weeksPlayed: number;
    deathCause: 'scandal' | 'health' | 'old_age' | 'efcc';
    stats: {
        fame: number;
        anointing: number;
        members: number;
        personalCash: number;
        churchCash: number;
    };
    ribbons: Array<{ id: string; name: string; emoji: string }>;
    timeline: Array<{ week: number; event: string; impact: string }>;
    onRestart: () => void;
    onShare: () => void;
}

const DEATH_MESSAGES: Record<string, { title: string; subtitle: string; emoji: string }> = {
    scandal: {
        title: 'DISGRACED',
        subtitle: 'Your sins caught up with you',
        emoji: '📰',
    },
    health: {
        title: 'REST IN PEACE',
        subtitle: 'The body could not continue',
        emoji: '🙏',
    },
    old_age: {
        title: 'A LIFE WELL LIVED',
        subtitle: 'You completed your course',
        emoji: '👴',
    },
    efcc: {
        title: 'ARRESTED',
        subtitle: 'EFCC finally caught you',
        emoji: '👮',
    },
};

export default function DeathScreen({
    playerName,
    age,
    weeksPlayed,
    deathCause,
    stats,
    ribbons,
    timeline,
    onRestart,
    onShare,
}: DeathScreenProps) {
    const death = DEATH_MESSAGES[deathCause] || DEATH_MESSAGES.health;
    const years = Math.floor(weeksPlayed / 52);

    // Generate epitaph based on stats
    const getEpitaph = () => {
        if (stats.anointing >= 8000 && stats.fame >= 8000) {
            return 'A true legend of faith and fame';
        }
        if (stats.anointing >= 8000) {
            return 'A genuine servant of God';
        }
        if (stats.fame >= 8000) {
            return 'Famous, but at what cost?';
        }
        if (stats.personalCash >= 100000000) {
            return 'Died rich, but did they die right?';
        }
        if (stats.members >= 10000) {
            return 'Built a ministry that outlived them';
        }
        return 'Their story will be remembered';
    };

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="max-w-lg w-full text-center text-white py-8">
                {/* Death Header */}
                <div className="mb-8 animate-fade-in">
                    <div className="text-6xl mb-4">{death.emoji}</div>
                    <h1 className="text-4xl font-bold text-red-500 mb-2">{death.title}</h1>
                    <p className="text-xl text-white/70">{death.subtitle}</p>
                </div>

                {/* Epitaph */}
                <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10">
                    <div className="text-2xl font-bold mb-2">Pastor {playerName}</div>
                    <div className="text-white/60">
                        Age {age} • Ministered for {years} years
                    </div>
                    <div className="text-lg text-yellow-400 italic mt-4">
                        &quot;{getEpitaph()}&quot;
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-2xl">⛪</div>
                        <div className="text-lg font-bold">{stats.members.toLocaleString()}</div>
                        <div className="text-xs text-white/60">Members</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-2xl">⭐</div>
                        <div className="text-lg font-bold">{Math.floor(stats.fame / 100)}</div>
                        <div className="text-xs text-white/60">Fame Level</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-2xl">✨</div>
                        <div className="text-lg font-bold">{Math.floor(stats.anointing / 100)}</div>
                        <div className="text-xs text-white/60">Anointing</div>
                    </div>
                </div>

                {/* Net Worth */}
                <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-4 mb-6">
                    <div className="text-sm text-white/60">Net Worth at Death</div>
                    <div className="text-3xl font-bold text-green-400">
                        ₦{(stats.personalCash + stats.churchCash).toLocaleString()}
                    </div>
                </div>

                {/* Ribbons */}
                {ribbons.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-3">🎖️ Ribbons Earned</h3>
                        <div className="flex flex-wrap justify-center gap-2">
                            {ribbons.map(ribbon => (
                                <div
                                    key={ribbon.id}
                                    className="bg-white/10 rounded-full px-4 py-2 flex items-center gap-2"
                                >
                                    <span>{ribbon.emoji}</span>
                                    <span className="text-sm">{ribbon.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Key Moments Timeline */}
                {timeline.length > 0 && (
                    <div className="mb-6 text-left">
                        <h3 className="text-lg font-bold mb-3 text-center">📜 Key Moments</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                            {timeline.slice(-5).map((entry, i) => (
                                <div
                                    key={i}
                                    className={`rounded-lg p-2 text-sm ${entry.impact === 'positive'
                                            ? 'bg-green-900/30'
                                            : entry.impact === 'negative'
                                                ? 'bg-red-900/30'
                                                : 'bg-white/5'
                                        }`}
                                >
                                    <span className="text-white/60">Week {entry.week}:</span>{' '}
                                    {entry.event}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={onShare}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:from-purple-500 hover:to-pink-500 transition flex items-center justify-center gap-2"
                    >
                        📱 Share My Legacy
                    </button>
                    <button
                        onClick={onRestart}
                        className="w-full py-4 bg-yellow-500 text-black rounded-xl font-bold hover:bg-yellow-400 transition"
                    >
                        🔄 Start New Ministry
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-8 text-white/40 text-sm">
                    Daddy G.O. Simulator • A satirical life simulation
                </div>
            </div>
        </div>
    );
}
