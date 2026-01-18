import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatNumber } from '@/utils/formatters';

export default function GameOverModal() {
    const {
        stats,
        age,
        church,
        currentEra,
        assets,
        gamePhase
    } = useGameStore();

    // Only show if actually game over
    if (gamePhase !== 'GAME_OVER') return null;

    const netWorth = stats.personalCash + stats.churchCash;

    // Calculate Dynasty Score
    const dynScore = Math.floor(
        (church.members * 10) +
        (netWorth / 1000000) +
        (stats.fame * 5) +
        (stats.influence * 20) +
        (currentEra === 'Ultimate' ? 50000 : currentEra === 'Empire' ? 10000 : 1000)
    );

    const handleRestart = () => {
        // Simple reload for now
        window.location.reload();
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-1000">
            <Card className="w-full max-w-lg border-red-900/50 shadow-2xl shadow-red-900/20 bg-black flex flex-col text-center">

                {/* Header */}
                <div className="p-8 border-b border-white/10">
                    <div className="text-6xl mb-4 animate-bounce">💀</div>
                    <h1 className="text-4xl font-black text-red-600 mb-2 uppercase tracking-tighter">
                        GLORY DEPARTED
                    </h1>
                    <p className="text-gray-400 font-mono text-sm uppercase">
                        Pastor Died at Age {age}
                    </p>
                </div>

                {/* Legacy Report */}
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded bg-white/5 border border-white/5">
                            <div className="text-xs text-gray-500 uppercase mb-1">Final Net Worth</div>
                            <div className="text-xl font-bold text-white">{formatCurrency(netWorth)}</div>
                        </div>
                        <div className="p-4 rounded bg-white/5 border border-white/5">
                            <div className="text-xs text-gray-500 uppercase mb-1">Congregation</div>
                            <div className="text-xl font-bold text-white">{formatNumber(church.members)}</div>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-brand/10 to-transparent border border-brand/20">
                        <div className="text-sm text-brand mb-2 uppercase tracking-wide">Dynasty Score</div>
                        <div className="text-5xl font-black text-white tracking-tight">
                            {formatNumber(dynScore)}
                        </div>
                        <div className="mt-2">
                            <Badge variant="outline" className="border-brand/50 text-brand">
                                {currentEra} LEGACY
                            </Badge>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 italic">
                        "Naked came I out of my mother's womb, and naked shall I return thither."
                        <br />- Job 1:21
                    </p>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10">
                    <Button
                        size="lg"
                        className="w-full bg-white text-black hover:bg-gray-200 font-bold py-6"
                        onClick={handleRestart}
                    >
                        START NEW LIFE
                    </Button>
                </div>

            </Card>
        </div>
    );
}
