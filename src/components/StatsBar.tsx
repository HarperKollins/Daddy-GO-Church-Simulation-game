/**
 * StatsBar Component - Matching Reference Design
 * Dark theme with date/age header, status badges, and progress bars.
 * Updated to include PHASE D: Spiritual Atmosphere (Vibe) Indicator.
 */

'use client';

import { useGameStore } from '@/store/useGameStore';
import { useMLEngine } from '@/context/MLEngineContext';
import { getDominantVibe } from '@/engine/neuro/EmotionalState';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';

import { formatCurrency, formatNumber } from '@/utils/formatters';

interface StatsBarProps {
    onSettingsClick?: () => void;
}

export default function StatsBar({ onSettingsClick }: StatsBarProps) {
    const { stats, week, church, age, relationshipStatus, isAlive } = useGameStore();

    const { globalVibe } = useMLEngine();
    const dominantVibe = globalVibe ? getDominantVibe(globalVibe.vector) : 'NEUTRAL';

    // Calculate date from weeks
    const startDate = new Date(2026, 0, 1); // Jan 1, 2026
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + (week * 7));
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const dateString = `${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    // Fame Level
    const getFameLevel = () => {
        if (stats.fame >= 10000) return 'S';
        if (stats.fame >= 5000) return 'A';
        if (stats.fame >= 2000) return 'B';
        if (stats.fame >= 500) return 'C';
        if (stats.fame >= 100) return 'D';
        return 'F';
    };

    // Relationship status
    const getRelationshipStatus = () => {
        return relationshipStatus ? relationshipStatus.toUpperCase() : 'SINGLE';
    };

    // University level (simplified)
    const getUniversityLevel = () => {
        const yearInUni = Math.floor(week / 52);
        if (yearInUni >= 4) return 'GRAD';
        if (yearInUni >= 3) return '400L';
        if (yearInUni >= 2) return '300L';
        if (yearInUni >= 1) return '200L';
        return '100L';
    };



    if (!isAlive) return null;

    return (
        <Card className="rounded-none border-t-0 border-x-0 border-b border-border-subtle bg-surface/50 backdrop-blur-md sticky top-0 z-50">
            <div className="p-4 space-y-4">
                {/* Row 1: Date | Age | Money | Settings */}
                <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="font-mono">{dateString}</Badge>

                    <div className="flex items-center gap-2 text-text-secondary text-sm">
                        <span>👤</span>
                        <span className="font-semibold text-text-primary">AGE {age || 20}</span>
                    </div>

                    {/* VIBE INDICATOR */}
                    <Badge variant="outline" className={`border ${getVibeColor(dominantVibe)}`}>
                        <span className="mr-1">🛐</span> {dominantVibe}
                    </Badge>

                    <div className="flex-1" />

                    {/* Money Badge */}
                    <Badge variant="success" className="mr-2">
                        💵 {formatCurrency(stats.personalCash + stats.churchCash)}
                    </Badge>

                    {/* Settings */}
                    <button
                        onClick={onSettingsClick}
                        className="p-2 rounded-md hover:bg-surface-hover text-text-secondary transition-colors"
                    >
                        ⚙️
                    </button>
                </div>

                {/* Row 2: University & Relationship */}
                <div className="flex gap-2">
                    <Badge variant="default" className="bg-brand/10 text-brand border border-brand/20 hover:bg-brand/20">
                        📚 {getUniversityLevel()}
                    </Badge>
                    <Badge variant="default" className="bg-pink-500/10 text-pink-500 border border-pink-500/20 hover:bg-pink-500/20">
                        ❤️ {getRelationshipStatus()}
                    </Badge>
                </div>

                {/* Row 3: Stat Bars */}
                <div className="grid grid-cols-2 gap-3">
                    {/* HP */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-danger font-bold w-6">HP</span>
                        <div className="flex-1">
                            <ProgressBar value={stats.health} max={100} variant="danger" className="h-1.5" />
                        </div>
                    </div>



                    {/* SPIRIT */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-brand font-bold w-6">SPI</span>
                        <div className="flex-1">
                            <ProgressBar value={stats.anointing} max={100} variant="default" className="h-1.5" />
                        </div>
                    </div>

                    {/* SCANDAL */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-brand-secondary font-bold w-6 text-orange-500">SCD</span>
                        <div className="flex-1">
                            <ProgressBar value={stats.scandal} max={100} variant="default" className="h-1.5 bg-surface-active" />
                            {/* Custom gradient override for scandal if needed */}
                            <div className="h-1.5 rounded-full bg-surface-active overflow-hidden mt-[-6px]">
                                <div style={{ width: `${Math.min(100, stats.scandal)}%` }} className="h-full bg-gradient-to-r from-orange-500 to-red-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 4: KPI Tickers */}
                <div className="flex justify-between items-center pt-2 border-t border-border-subtle">
                    <div className="flex items-center gap-1.5">
                        <span className="text-warning text-sm">⭐</span>
                        <span className="text-xs font-bold text-text-secondary">{getFameLevel()} FAME</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <span className="text-info text-sm">👥</span>
                        <span className="text-xs font-bold text-text-primary">{formatNumber(church.members)} MEMBERS</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}

// ... helper implementation


// Helper for Vibe Styling
// Using Tailwind Classes here since we are inside basic strings, 
// ensuring they match the game's dark neon aesthetic.
function getVibeColor(vibe: string) {
    switch (vibe) {
        case 'GREED': return 'bg-emerald-900/50 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
        case 'FEAR': return 'bg-purple-900/50 text-purple-400 border-purple-500/30 shadow-[0_0_10px_rgba(147,51,234,0.2)]';
        case 'FAITH': return 'bg-amber-900/50 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
        case 'LOYALTY': return 'bg-blue-900/50 text-blue-400 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]';
        case 'SKEPTICISM': return 'bg-red-900/50 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]';
        case 'UNITY': return 'bg-pink-900/50 text-pink-400 border-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.2)]';
        default: return 'bg-slate-800 text-slate-400 border-slate-600';
    }
}
