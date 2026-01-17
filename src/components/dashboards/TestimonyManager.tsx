'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { createAudioManager } from '@/engine/audioManager';
import { generateTestimony, shareTestimony } from '@/engine/testimonyEngine';
import type { Testimony, TestimonyType } from '@/types/game';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface TestimonyManagerProps {
    onClose: () => void;
}

export default function TestimonyManager({ onClose }: TestimonyManagerProps) {
    const { engine, stats, church, week, modifyStat } = useGameStore();
    const [audioManager] = useState(() => createAudioManager());
    const [filter, setFilter] = useState<'all' | 'real' | 'fake'>('all');
    const [isFabricating, setIsFabricating] = useState(false);

    // Access state safely with fallbacks
    const inventory = engine.testimony?.inventory || {
        collected: [],
        fabricated: [],
        shared: [],
        totalCredibility: 50,
        exposedCount: 0
    };

    const allTestimonies = [...inventory.collected, ...inventory.fabricated];
    const filteredTestimonies = allTestimonies.filter(t => {
        const isReal = t.truthPercentage >= 90;
        if (filter === 'real') return isReal;
        if (filter === 'fake') return !isReal;
        return true;
    });

    const handleFabricate = (type: TestimonyType) => {
        audioManager.playEffect('UI_CLICK');

        const cost = 50000;
        if (stats.personalCash < cost) {
            audioManager.playEffect('UI_ERROR');
            return;
        }

        modifyStat('personalCash', -cost);

        // Generate fake testimony
        const fakeT = generateTestimony(type, 10, week || 1, stats.fame, []);
        console.log('Fabricated:', fakeT);

        audioManager.playEffect('UI_SUCCESS');
        setIsFabricating(false);
    };

    const handleShare = (testimony: Testimony) => {
        const result = shareTestimony(testimony, 'church_service', church.members || 100);

        audioManager.playVoice('VOICE_HALLELUJAH');
        audioManager.playEffect('EVENT_CROWD_CHEER');

        modifyStat('churchCash', result.fameGain * 100);
        modifyStat('fame', result.fameGain);
        modifyStat('anointing', Math.floor(result.fameGain * 0.1));

        if (result.scandalRisk > 40 && Math.random() < 0.1) {
            modifyStat('scandal', result.scandalRisk * 10);
            audioManager.playEffect('EVENT_SCANDAL');
        }

        onClose();
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Testimony Department">
            <div className="space-y-4">
                {/* Header Stats */}
                <Card className="bg-brand/10 border-brand/20 p-4 flex justify-between items-center">
                    <div>
                        <div className="text-xs uppercase tracking-widest text-text-secondary font-bold">Credibility Score</div>
                        <div className="text-2xl font-black text-brand">{inventory.totalCredibility}%</div>
                    </div>
                    <Badge variant="outline" className="border-brand/30 text-brand">
                        {allTestimonies.length} Records
                    </Badge>
                </Card>

                {/* Tabs */}
                <div className="flex bg-surface rounded-lg p-1 border border-border-subtle">
                    <button
                        onClick={() => { setFilter('all'); setIsFabricating(false); }}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${filter === 'all' && !isFabricating
                                ? 'bg-border-prominent text-white shadow-sm'
                                : 'text-text-secondary hover:text-text-primary'
                            }`}
                    >
                        Archive
                    </button>
                    <button
                        onClick={() => setIsFabricating(true)}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${isFabricating
                                ? 'bg-purple-600 text-white shadow-sm'
                                : 'text-purple-400 hover:text-purple-300'
                            }`}
                    >
                        ⚡ Fabricate
                    </button>
                </div>

                {/* Content */}
                <div className="min-h-[300px]">
                    {isFabricating ? (
                        <div className="space-y-3 animate-in slide-in-from-right-4">
                            <h3 className="text-sm font-bold text-text-primary mb-2">Select Template (Cost: ₦50,000)</h3>
                            {[
                                { type: 'healing', label: 'Miraculous Healing', icon: '🤕', desc: 'Cured from incurable disease' },
                                { type: 'financial', label: 'Financial Breakthrough', icon: '💰', desc: 'Unexpected bank alert' },
                                { type: 'visa', label: 'Visa Approval', icon: '✈️', desc: 'Embassy called me back' },
                                { type: 'protection', label: 'Divine Protection', icon: '🛡️', desc: 'Saved from accident' },
                                { type: 'childbirth', label: 'Fruit of the Womb', icon: '👶', desc: 'Triplets after 10 years' },
                            ].map((opt) => (
                                <Card
                                    key={opt.type}
                                    onClick={() => handleFabricate(opt.type as TestimonyType)}
                                    className="p-3 flex items-center gap-4 cursor-pointer hover:bg-surface-hover hover:border-purple-500/50 transition-all border-border-subtle group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                        {opt.icon}
                                    </div>
                                    <div>
                                        <div className="font-bold text-text-primary group-hover:text-purple-400">{opt.label}</div>
                                        <div className="text-xs text-text-secondary">{opt.desc}</div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredTestimonies.length === 0 ? (
                                <div className="text-center py-10 text-text-muted">
                                    <div className="text-4xl mb-2 grayscale opacity-50">😶</div>
                                    <p>No testimonies available yet.</p>
                                </div>
                            ) : (
                                filteredTestimonies.map(t => (
                                    <Card key={t.id} className="p-4 border-border-subtle relative overflow-hidden group">
                                        {t.truthPercentage < 60 && (
                                            <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-400 text-[10px] px-2 py-0.5 rounded-bl font-bold border-l border-b border-purple-500/20">
                                                FABRICATED ({t.truthPercentage}% TRUTH)
                                            </div>
                                        )}
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-text-primary text-sm">{t.title}</h4>
                                            <Badge variant="secondary" className="text-[10px] uppercase">{t.type}</Badge>
                                        </div>
                                        <p className="text-xs text-text-secondary leading-relaxed italic mb-3">"{t.description}"</p>

                                        <div className="flex items-center justify-between pt-2 border-t border-border-subtle/50">
                                            <div className="text-[10px] text-text-muted">Witness: {t.witnesses[0] || 'Anonymous'}</div>
                                            <Button
                                                size="sm"
                                                onClick={() => handleShare(t)}
                                                className="h-7 text-[10px] font-bold"
                                            >
                                                Share on Sunday
                                            </Button>
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}
