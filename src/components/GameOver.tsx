/**
 * GameOver Component - Clean BitLife Style
 * 
 * Displayed when the player dies (health = 0) or is arrested (scandal = 100).
 */

'use client';

import { useGameStore } from '@/store/useGameStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function GameOver() {
    const { age, week, stats, church, resetGame } = useGameStore();

    // Determine cause of death
    const causeOfDeath = stats.scandal >= 100
        ? 'You were arrested. EFCC finally caught up with your "creative accounting."'
        : 'You collapsed from exhaustion and hunger. The ministry consumed you.';

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-500">
            <div className="w-full max-w-md space-y-8 text-center">
                <div className="space-y-4">
                    <h1 className="text-5xl font-black text-danger uppercase tracking-wider animate-pulse">
                        Game Over
                    </h1>
                    <p className="text-text-secondary text-lg leading-relaxed max-w-sm mx-auto">
                        {causeOfDeath}
                    </p>
                </div>

                <Card className="bg-surface border-border-prominent p-6 shadow-2xl shadow-black">
                    <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">
                        Final Stats
                    </div>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-left">
                        <div className="flex flex-col">
                            <span className="text-xs text-text-muted">Age</span>
                            <span className="font-bold text-lg text-text-primary">{age}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-text-muted">Weeks</span>
                            <span className="font-bold text-lg text-text-primary">{week}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-text-muted">Members</span>
                            <span className="font-bold text-lg text-text-primary">{church.members.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-text-muted">Net Worth</span>
                            <span className="font-bold text-lg text-emerald-500">₦{(stats.personalCash + stats.churchCash).toLocaleString()}</span>
                        </div>
                    </div>
                </Card>

                <Button
                    variant="default"
                    size="lg"
                    className="w-full text-lg font-bold py-6 bg-white text-black hover:bg-white/90"
                    onClick={resetGame}
                >
                    Try Again
                </Button>
            </div>
        </div>
    );
}
