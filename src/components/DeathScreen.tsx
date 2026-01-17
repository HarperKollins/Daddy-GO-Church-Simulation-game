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
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

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
    onShare?: () => void;
    isAlive?: boolean;
}

const DEATH_MESSAGES: Record<string, { title: string; subtitle: string; emoji: string; color: string }> = {
    scandal: {
        title: 'DISGRACED',
        subtitle: 'Your sins caught up with you',
        emoji: '📰',
        color: 'text-danger'
    },
    health: {
        title: 'REST IN PEACE',
        subtitle: 'The body could not continue',
        emoji: '🙏',
        color: 'text-purple-400'
    },
    old_age: {
        title: 'A LIFE WELL LIVED',
        subtitle: 'You completed your course',
        emoji: '👴',
        color: 'text-amber-400'
    },
    efcc: {
        title: 'ARRESTED',
        subtitle: 'EFCC finally caught you',
        emoji: '👮',
        color: 'text-orange-500'
    },
};

export default function DeathScreen({
    playerName,
    age,
    weeksPlayed,
    deathCause = 'health',
    stats,
    ribbons = [],
    timeline = [],
    onRestart,
    onShare,
    isAlive = true,
}: DeathScreenProps) {
    if (isAlive || !stats) return null;

    const death = DEATH_MESSAGES[deathCause] || DEATH_MESSAGES.health;
    const years = Math.floor((weeksPlayed || 0) / 52);

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
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 z-[200] overflow-y-auto">
            <div className="max-w-lg w-full text-center py-8 animate-in slide-in-from-bottom-8 duration-700">
                {/* Death Header */}
                <div className="mb-8 space-y-2">
                    <div className="text-6xl mb-4 animate-bounce">{death.emoji}</div>
                    <h1 className={`text-5xl font-black ${death.color} tracking-tighter`}>{death.title}</h1>
                    <p className="text-xl text-white/70 font-medium">{death.subtitle}</p>
                </div>

                {/* Epitaph */}
                <Card className="bg-white/5 border-white/10 p-6 mb-6">
                    <div className="text-2xl font-bold text-white mb-2">Pastor {playerName}</div>
                    <div className="text-white/60 text-sm font-medium uppercase tracking-wide">
                        Age {age} • Ministered for {years} years
                    </div>
                    <div className="text-lg text-amber-400 italic mt-4 font-serif">
                        &quot;{getEpitaph()}&quot;
                    </div>
                </Card>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <Card className="bg-white/5 border-white/10 p-3 flex flex-col items-center">
                        <div className="text-2xl mb-1">⛪</div>
                        <div className="text-lg font-bold text-white">{stats.members.toLocaleString()}</div>
                        <div className="text-[10px] uppercase font-bold text-white/50">Members</div>
                    </Card>
                    <Card className="bg-white/5 border-white/10 p-3 flex flex-col items-center">
                        <div className="text-2xl mb-1">⭐</div>
                        <div className="text-lg font-bold text-white">{Math.floor(stats.fame / 100)}</div>
                        <div className="text-[10px] uppercase font-bold text-white/50">Fame Level</div>
                    </Card>
                    <Card className="bg-white/5 border-white/10 p-3 flex flex-col items-center">
                        <div className="text-2xl mb-1">✨</div>
                        <div className="text-lg font-bold text-white">{Math.floor(stats.anointing / 100)}</div>
                        <div className="text-[10px] uppercase font-bold text-white/50">Anointing</div>
                    </Card>
                </div>

                {/* Net Worth */}
                <Card className="bg-gradient-to-r from-emerald-900/40 to-emerald-800/40 border-emerald-500/30 p-4 mb-6">
                    <div className="text-[10px] uppercase font-bold text-emerald-400/80 mb-1">Net Worth at Death</div>
                    <div className="text-3xl font-black text-emerald-400">
                        ₦{(stats.personalCash + stats.churchCash).toLocaleString()}
                    </div>
                </Card>

                {/* Ribbons */}
                {ribbons.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">🎖️ Ribbons Earned</h3>
                        <div className="flex flex-wrap justify-center gap-2">
                            {ribbons.map(ribbon => (
                                <Badge key={ribbon.id} className="bg-white/10 text-white hover:bg-white/20 border-white/10 py-1.5 px-3">
                                    <span className="mr-2">{ribbon.emoji}</span>
                                    {ribbon.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Key Moments Timeline */}
                {timeline.length > 0 && (
                    <div className="mb-8 text-left">
                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 text-center">📜 Key Moments</h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                            {timeline.slice(-5).map((entry, i) => (
                                <div
                                    key={i}
                                    className={`rounded-lg p-3 text-sm border ${entry.impact === 'positive'
                                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-100'
                                        : entry.impact === 'negative'
                                            ? 'bg-rose-500/10 border-rose-500/20 text-rose-100'
                                            : 'bg-white/5 border-white/10 text-gray-300'
                                        }`}
                                >
                                    <span className="font-mono opacity-50 mr-2 text-xs">Wk {entry.week}:</span>
                                    {entry.event}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Button
                        onClick={onShare}
                        variant="secondary"
                        className="w-full h-14 font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0"
                    >
                        📱 Share My Legacy
                    </Button>
                    <Button
                        onClick={onRestart}
                        size="lg"
                        className="w-full h-14 font-bold bg-amber-400 text-black hover:bg-amber-300 border-0"
                    >
                        🔄 Start New Ministry
                    </Button>
                </div>

                {/* Footer */}
                <div className="mt-8 text-white/20 text-[10px] font-mono uppercase">
                    Daddy G.O. Simulator • A satirical life simulation
                </div>
            </div>
        </div>
    );
}
