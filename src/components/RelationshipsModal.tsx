/**
 * RelationshipsModal Component
 * Complete dating flow with modern UI
 */

'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { generatePartnerPool } from '@/data/relationships';
import type { Partner } from '@/types/game';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface RelationshipsModalProps {
    onStartDating: (partner: Partner) => void;
    onPropose: () => void;
    onMarry: () => void;
    onBreakup: () => void;
    onHookup: (type: 'church' | 'random' | 'uni') => void;
    onClose: () => void;
}

const archetypeBadges: Record<Partner['archetype'], { label: string; variant: 'default' | 'secondary' | 'accent' | 'outline' }> = {
    'FAITHFUL_SISTER': { label: 'Faithful Sister', variant: 'default' },
    'SLAY_QUEEN': { label: 'Slay Queen', variant: 'accent' },
    'PASTOR_DAUGHTER': { label: "Pastor's Daughter", variant: 'secondary' },
    'CHOIR_MISTRESS': { label: 'Choir Mistress', variant: 'outline' },
};

export default function RelationshipsModal({
    onStartDating,
    onPropose,
    onMarry,
    onBreakup,
    onHookup,
    onClose,
}: RelationshipsModalProps) {
    const { partner, relationshipStatus, relationshipWeeks, stats, church } = useGameStore();
    const [datingPool, setDatingPool] = useState<Partner[]>(() => generatePartnerPool(3));

    const canPropose = relationshipWeeks >= 12 && stats.fame >= 20;
    const canMarry = relationshipWeeks >= 20 && church.members >= 30;

    const handleRefreshPool = () => {
        setDatingPool(generatePartnerPool(3));
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Relationships">
            <div className="space-y-4">
                {/* Single - Can Date or Hook Up */}
                {relationshipStatus === 'Single' && (
                    <div className="space-y-6">
                        <Card className="p-4 bg-pink-500/10 border-pink-500/20 text-center animate-pulse">
                            <span className="text-3xl grayscale mb-2 inline-block">💔</span>
                            <p className="text-sm font-bold text-pink-500">
                                You are currently single. Find a good woman... or have some fun.
                            </p>
                        </Card>

                        {/* Dating Pool */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest">
                                Available Women
                            </h3>
                            {datingPool.map(p => (
                                <Card key={p.id} className="p-3 flex items-center gap-3 hover:border-brand/40 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center font-bold text-pink-500 text-lg">
                                        {p.name.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-text-primary">{p.name}</span>
                                            <Badge variant={archetypeBadges[p.archetype].variant as any} className="text-[10px]">
                                                {archetypeBadges[p.archetype].label}
                                            </Badge>
                                        </div>
                                        <div className="text-xs text-text-secondary">Looks: {p.looks}%</div>
                                    </div>
                                    <Button size="sm" onClick={() => onStartDating(p)}>
                                        Date
                                    </Button>
                                </Card>
                            ))}
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full text-xs"
                                onClick={handleRefreshPool}
                            >
                                🔄 Look for Others
                            </Button>
                        </div>

                        {/* Hookup Options */}
                        <div className="pt-4 border-t border-border-subtle">
                            <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">
                                🔥 Hookup Options (Risky!)
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                <Button
                                    variant="outline"
                                    className="h-auto py-3 flex flex-col gap-1 border-danger/30 hover:bg-danger/10 hover:text-danger"
                                    onClick={() => onHookup('church')}
                                >
                                    <span>Church Sis</span>
                                    <span className="text-[10px] bg-danger/10 px-1.5 rounded text-danger">High Risk</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-auto py-3 flex flex-col gap-1 border-warning/30 hover:bg-warning/10 hover:text-warning"
                                    onClick={() => onHookup('random')}
                                >
                                    <span>Random</span>
                                    <span className="text-[10px] bg-warning/10 px-1.5 rounded text-warning">Med Risk</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-auto py-3 flex flex-col gap-1 border-success/30 hover:bg-success/10 hover:text-success"
                                    onClick={() => onHookup('uni')}
                                >
                                    <span>Uni Babe</span>
                                    <span className="text-[10px] bg-success/10 px-1.5 rounded text-success">Low Risk</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Dating - Can Progress or Break Up */}
                {relationshipStatus === 'Dating' && partner && (
                    <div className="text-center space-y-6">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-3xl font-bold text-pink-500 mb-4 ring-4 ring-pink-500/10">
                                {partner.name.substring(0, 2).toUpperCase()}
                            </div>
                            <h3 className="text-xl font-bold text-text-primary mb-1">{partner.name}</h3>
                            <Badge variant={archetypeBadges[partner.archetype].variant as any} className="mb-2">
                                {archetypeBadges[partner.archetype].label}
                            </Badge>
                            <p className="text-xs text-text-muted">
                                Dating for {relationshipWeeks} weeks
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Button
                                size="lg"
                                className="w-full font-bold"
                                onClick={onPropose}
                                disabled={!canPropose}
                            >
                                💍 Propose {canPropose ? '(Ready!)' : ''}
                            </Button>
                            {!canPropose && (
                                <p className="text-[10px] text-text-muted">
                                    Need 12+ weeks & 20+ fame to propose
                                </p>
                            )}

                            <Button
                                variant="destructive"
                                className="w-full bg-danger/10 text-danger hover:bg-danger/20 border-danger/20"
                                onClick={onBreakup}
                            >
                                Break Up
                            </Button>
                        </div>
                    </div>
                )}

                {/* Engaged - Can Marry */}
                {relationshipStatus === 'Engaged' && partner && (
                    <div className="text-center space-y-6">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-brand/10 text-brand flex items-center justify-center text-3xl mb-4 ring-4 ring-brand/10">
                                💍
                            </div>
                            <h3 className="text-xl font-bold text-text-primary mb-1">Engaged to {partner.name}</h3>
                            <p className="text-xs text-text-muted">
                                {relationshipWeeks} weeks together
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Button
                                size="lg"
                                className="w-full font-bold bg-gradient-to-r from-brand to-purple-600"
                                onClick={onMarry}
                                disabled={!canMarry}
                            >
                                👰 Get Married {canMarry ? '(Ready!)' : ''}
                            </Button>
                            {!canMarry && (
                                <p className="text-[10px] text-text-muted">
                                    Need 20+ weeks & 30+ members to marry
                                </p>
                            )}

                            <Button
                                variant="destructive"
                                className="w-full bg-danger/10 text-danger hover:bg-danger/20 border-danger/20"
                                onClick={onBreakup}
                            >
                                Call Off Engagement
                            </Button>
                        </div>
                    </div>
                )}

                {/* Married */}
                {relationshipStatus === 'Married' && partner && (
                    <div className="text-center space-y-6">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-success/10 text-success flex items-center justify-center text-4xl mb-4 ring-4 ring-success/10">
                                💒
                            </div>
                            <h3 className="text-xl font-bold text-text-primary mb-1">Married to {partner.name}</h3>
                            <p className="text-xs text-text-muted">
                                {relationshipWeeks} weeks of marriage
                            </p>
                        </div>

                        <Card className="bg-surface p-4">
                            <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Weekly Maintenance</div>
                            <div className="text-2xl font-black text-danger">-₦{partner.maintenanceCost.toLocaleString()}</div>
                        </Card>

                        <Button
                            variant="destructive"
                            className="w-full font-bold"
                            onClick={onBreakup}
                        >
                            💔 Divorce (HUGE Scandal)
                        </Button>
                    </div>
                )}
            </div>
        </Modal>
    );
}
