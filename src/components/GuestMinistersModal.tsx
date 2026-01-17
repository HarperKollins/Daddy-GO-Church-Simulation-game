/**
 * GuestMinistersModal Component
 */

'use client';

import { useState } from 'react';
import type { GuestMinister, VenueTier } from '@/types/game';
import { getAvailableMinisters, rollMinisterScandal } from '@/data/guestMinisters';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface GuestMinistersModalProps {
    isOpen: boolean; // Added isOpen prop
    currentVenue: VenueTier;
    churchCash: number;
    onBook: (minister: GuestMinister, scandalEvent: string | null) => void;
    onClose: () => void;
}

const formatCash = (amount: number): string => {
    if (amount >= 1000000) {
        return `₦${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
        return `₦${(amount / 1000).toFixed(0)}K`;
    }
    return `₦${amount.toLocaleString()}`;
};

// Archetype badges with colors
const archetypeBadges: Record<GuestMinister['archetype'], { label: string; color: string }> = {
    'FIRE_BRAND': { label: 'Fire Brand', color: 'bg-red-500/20 text-red-500 border-red-500/30' },
    'PROSPERITY': { label: 'Prosperity', color: 'bg-green-500/20 text-green-500 border-green-500/30' },
    'DELIVERANCE': { label: 'Deliverance', color: 'bg-purple-500/20 text-purple-500 border-purple-500/30' },
    'MOTIVATIONAL': { label: 'Motivational', color: 'bg-blue-500/20 text-blue-500 border-blue-500/30' },
    'CONTROVERSIAL': { label: 'Controversial', color: 'bg-orange-500/20 text-orange-500 border-orange-500/30' },
};

export default function GuestMinistersModal({
    isOpen,
    currentVenue,
    churchCash,
    onBook,
    onClose,
}: GuestMinistersModalProps) {
    const [selectedMinister, setSelectedMinister] = useState<GuestMinister | null>(null);
    const availableMinisters = getAvailableMinisters(currentVenue);

    const handleBook = (minister: GuestMinister) => {
        const scandalEvent = rollMinisterScandal(minister);
        onBook(minister, scandalEvent);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={selectedMinister ? 'Minister Details' : 'Guest Ministers'}>
            {selectedMinister ? (
                // Minister detail view
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 bg-surface-hover rounded-full flex items-center justify-center text-3xl font-bold text-text-primary shadow-inner">
                            {selectedMinister.name.substring(0, 2).toUpperCase()}
                        </div>
                        <h3 className="text-xl font-bold text-text-primary mb-2">
                            {selectedMinister.name}
                        </h3>
                        <Badge variant="outline" className={`${archetypeBadges[selectedMinister.archetype].color} border`}>
                            {archetypeBadges[selectedMinister.archetype].label}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-surface p-3 rounded-lg text-center border border-border-subtle">
                            <div className="text-[10px] text-text-muted uppercase font-bold mb-1">Fee</div>
                            <div className="font-bold text-text-primary">{formatCash(selectedMinister.costToBook)}</div>
                        </div>
                        <div className="bg-surface p-3 rounded-lg text-center border border-border-subtle">
                            <div className="text-[10px] text-text-muted uppercase font-bold mb-1">Fame Boost</div>
                            <div className="font-bold text-brand">+{selectedMinister.fameBoost}%</div>
                        </div>
                        <div className="bg-surface p-3 rounded-lg text-center border border-border-subtle">
                            <div className="text-[10px] text-text-muted uppercase font-bold mb-1">Members</div>
                            <div className="font-bold text-success">
                                +{selectedMinister.effects.find(e => e.type === 'members')?.value || 0}
                            </div>
                        </div>
                        <div className={`p-3 rounded-lg text-center border ${selectedMinister.scandalRisk > 15 ? 'bg-danger/10 border-danger/30' : 'bg-surface border-border-subtle'}`}>
                            <div className="text-[10px] text-text-muted uppercase font-bold mb-1">Risk</div>
                            <div className={`font-bold ${selectedMinister.scandalRisk > 15 ? 'text-danger' : 'text-text-secondary'}`}>
                                {selectedMinister.scandalRisk}%
                            </div>
                        </div>
                    </div>

                    {selectedMinister.scandalRisk >= 20 && (
                        <div className="bg-danger/10 text-danger text-sm font-bold text-center p-3 rounded-lg border border-danger/20">
                            ⚠️ High risk of viral scandal!
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Button variant="secondary" onClick={() => setSelectedMinister(null)} className="flex-1">
                            Back
                        </Button>
                        <Button
                            variant="default"
                            className="flex-[2] font-bold"
                            onClick={() => handleBook(selectedMinister)}
                            disabled={churchCash < selectedMinister.costToBook}
                        >
                            {churchCash >= selectedMinister.costToBook
                                ? `Book (${formatCash(selectedMinister.costToBook)})`
                                : 'Not enough funds'
                            }
                        </Button>
                    </div>
                </div>
            ) : (
                // Minister list view
                <div className="space-y-3">
                    {availableMinisters.length === 0 ? (
                        <div className="text-center text-text-muted py-8">
                            <p className="mb-2">No ministers available for your current venue.</p>
                            <Badge variant="outline">Upgrade Venue Required</Badge>
                        </div>
                    ) : (
                        availableMinisters.map((minister) => (
                            <Card
                                key={minister.id}
                                onClick={() => setSelectedMinister(minister)}
                                className="p-3 flex items-center gap-4 cursor-pointer hover:bg-surface-hover hover:border-brand/30 transition-all border-border-subtle"
                            >
                                <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-sm font-bold text-text-secondary">
                                    {minister.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-text-primary truncate">{minister.name}</div>
                                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                                        <span className={archetypeBadges[minister.archetype].color.split(' ')[1]}>
                                            {archetypeBadges[minister.archetype].label}
                                        </span>
                                        <span className="text-text-muted">•</span>
                                        <span>{formatCash(minister.costToBook)}</span>
                                    </div>
                                </div>
                                <span className="text-text-muted">›</span>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </Modal>
    );
}
