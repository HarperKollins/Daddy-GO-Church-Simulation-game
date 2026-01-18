import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatNumber } from '@/utils/formatters';

export default function YearlyReportModal() {
    // Select only what we need - don't spread entire state!
    const stats = useGameStore(state => state.stats);
    const age = useGameStore(state => state.age);
    const week = useGameStore(state => state.week);
    const uniYear = useGameStore(state => state.uniYear);
    const occupation = useGameStore(state => state.occupation);
    const relationshipStatus = useGameStore(state => state.relationshipStatus);
    const church = useGameStore(state => state.church);
    const assets = useGameStore(state => state.assets);
    const currentYearEvents = useGameStore(state => state.currentYearEvents);

    // Stats to highlight
    const netWorth = stats.personalCash + stats.churchCash;
    const year = 2026 + Math.floor(week / 52);

    const handleContinue = () => {
        useGameStore.setState({ gamePhase: 'SIMULATION', currentYearEvents: [] });
    };

    const handleEventSelect = (event: any) => {
        useGameStore.setState({ currentEvent: event, gamePhase: 'EVENT', currentYearEvents: [] });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto border-brand shadow-2xl shadow-brand/20 bg-surface-raised flex flex-col">

                {/* Header */}
                <div className="p-6 border-b border-white/10 bg-gradient-to-br from-brand/20 to-transparent">
                    <h2 className="text-2xl font-black text-white mb-1 uppercase tracking-tighter">
                        Yearly Report <span className="text-brand">{year}</span>
                    </h2>
                    <p className="text-text-secondary text-sm font-mono">
                        AGE: {age} | {occupation.toUpperCase()}
                    </p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 flex-1 overflow-y-auto">

                    {/* Status Update */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-surface border border-white/5">
                            <span className="text-xs text-text-muted uppercase">Net Worth</span>
                            <div className="text-xl font-bold text-success">
                                {formatCurrency(netWorth)}
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-surface border border-white/5">
                            <span className="text-xs text-text-muted uppercase">Congregation</span>
                            <div className="text-xl font-bold text-info">
                                {formatNumber(church.members)}
                            </div>
                        </div>
                    </div>

                    {/* Milestones / Changes */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wide opacity-80">
                            Status Update
                        </h3>

                        <div className="flex justify-between items-center p-3 rounded bg-white/5">
                            <span className="text-sm text-gray-300">Education</span>
                            <Badge variant={uniYear === 'Graduate' ? 'success' : 'default'}>
                                {uniYear}
                            </Badge>
                        </div>

                        <div className="flex justify-between items-center p-3 rounded bg-white/5">
                            <span className="text-sm text-gray-300">Relationship</span>
                            <Badge variant="outline" className="border-pink-500 text-pink-500">
                                {relationshipStatus}
                            </Badge>
                        </div>

                        <div className="flex justify-between items-center p-3 rounded bg-white/5">
                            <span className="text-sm text-gray-300">Assets Owned</span>
                            <Badge variant="secondary">
                                {assets.length}
                            </Badge>
                        </div>
                    </div>

                    {/* EVENT SELECTION - The "Infinity Engine" Hook */}
                    {currentYearEvents && currentYearEvents.length > 0 ? (
                        <div className="space-y-3 pt-4 border-t border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="animate-pulse text-xl">🔮</span>
                                <h3 className="text-lg font-black text-brand-gold uppercase tracking-tighter">
                                    Prophetic Direction
                                </h3>
                            </div>
                            <p className="text-xs text-gray-400 mb-4">
                                The spirit realm is shifting. Choose your focus for the coming year:
                            </p>

                            <div className="space-y-3">
                                {currentYearEvents.map((event: any) => (
                                    <button
                                        key={event.id}
                                        onClick={() => handleEventSelect(event)}
                                        className="w-full text-left p-4 rounded-xl bg-surface hover:bg-surface-highlight border border-white/5 hover:border-brand transition-all group relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative z-10 flex gap-3">
                                            <div className="text-2xl mt-1">
                                                {event.category === 'money' ? '💸' :
                                                    event.category === 'scandal' ? '🔥' :
                                                        event.category === 'opportunity' ? '✨' : '📅'}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white group-hover:text-brand-gold transition-colors">
                                                    {event.title}
                                                </h4>
                                                <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                                                    {event.description.split('\n')[0]}...
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 rounded-lg bg-surface border border-white/10">
                            <p className="text-xs text-gray-400 italic text-center">
                                "The year passed peacefully. The Lord is good."
                            </p>
                        </div>
                    )}

                </div>

                {/* Footer - Only show Continue if NO events are pending selection */}
                {(!currentYearEvents || currentYearEvents.length === 0) && (
                    <div className="p-6 border-t border-white/10 bg-surface">
                        <Button
                            size="lg"
                            className="w-full font-bold text-lg bg-brand hover:bg-brand-hover text-white py-6"
                            onClick={handleContinue}
                        >
                            ENTER {year + 1}
                        </Button>
                    </div>
                )}

            </Card>
        </div>
    );
}
