'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { createAudioManager } from '@/engine/audioManager';
import { generateTestimony, shareTestimony } from '@/engine/testimonyEngine';
import type { Testimony, TestimonyType } from '@/types/game';

interface TestimonyManagerProps {
    onClose: () => void;
}

export default function TestimonyManager({ onClose }: TestimonyManagerProps) {
    const { engine, stats, church, week, modifyStat } = useGameStore(); // week is at root
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

        // Cost to fabricate
        const cost = 50000;
        if (stats.personalCash < cost) {
            audioManager.playEffect('UI_ERROR');
            return;
        }

        modifyStat('personalCash', -cost);

        // Generate fake testimony
        // Args: type, truthPercentage, week, fame, witnesses
        const fakeT = generateTestimony(type, 10, week || 1, stats.fame, []);

        // In real implementation, we'd add to store
        // engine.testimony.inventory.fabricated.push(fakeT);
        console.log('Fabricated:', fakeT);

        audioManager.playEffect('UI_SUCCESS');
        setIsFabricating(false);
    };

    const handleShare = (testimony: Testimony) => {
        // shareTestimony(testimony, platform, audienceSize)
        const result = shareTestimony(testimony, 'church_service', church.members || 100);

        audioManager.playVoice('VOICE_HALLELUJAH');
        audioManager.playEffect('EVENT_CROWD_CHEER');

        // Apply effects
        // shareTestimony returns { fameGain, scandalRisk, viralChance }
        modifyStat('churchCash', result.fameGain * 100);
        modifyStat('fame', result.fameGain);
        modifyStat('anointing', Math.floor(result.fameGain * 0.1));

        if (result.scandalRisk > 40 && Math.random() < 0.1) {
            modifyStat('scandal', result.scandalRisk * 10);
            audioManager.playEffect('EVENT_SCANDAL');
        }

        // Close modal after sharing
        onClose();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
        }}>
            <div style={{
                backgroundColor: 'white',
                color: 'black',
                width: '100%',
                maxWidth: '672px',
                height: '80vh',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column' as const,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}>

                {/* Header */}
                <div className="bg-blue-600 p-6 flex justify-between items-center text-white">
                    <div>
                        <h2 className="text-2xl font-bold">📢 Testimony Department</h2>
                        <p className="text-blue-100 text-sm opacity-80">"Overcoming by the blood of the lamb..."</p>
                    </div>
                    <div className="text-right">
                        <div className="text-xs uppercase tracking-widest opacity-70">Inventory Credibility</div>
                        <div className="text-xl font-bold">{inventory.totalCredibility}%</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => { setFilter('all'); setIsFabricating(false); }}
                        className={`flex-1 py-3 font-medium text-sm border-b-2 transition ${filter === 'all' && !isFabricating ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
                    >
                        Archive ({allTestimonies.length})
                    </button>
                    <button
                        onClick={() => setIsFabricating(true)}
                        className={`flex-1 py-3 font-medium text-sm border-b-2 transition ${isFabricating ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500'}`}
                    >
                        ⚡ Fabricate New
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
                    {isFabricating ? (
                        <div className="space-y-4">
                            <h3 className="font-bold text-gray-700 mb-2">Select Testimony Template (Cost: ₦50,000)</h3>
                            {[
                                { type: 'healing', label: 'Miraculous Healing', icon: '🤕', desc: 'Cured from incurable disease' },
                                { type: 'financial', label: 'Financial Breakthrough', icon: '💰', desc: 'Unexpected bank alert' },
                                { type: 'visa', label: 'Visa Approval', icon: '✈️', desc: 'Embassy called me back' },
                                { type: 'protection', label: 'Divine Protection', icon: '🛡️', desc: 'Saved from accident' },
                                { type: 'childbirth', label: 'Fruit of the Womb', icon: '👶', desc: 'Triplets after 10 years' },
                            ].map((opt) => (
                                <button
                                    key={opt.type}
                                    onClick={() => handleFabricate(opt.type as TestimonyType)}
                                    className="w-full bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-purple-300 transition flex items-center gap-4 text-left group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-2xl group-hover:bg-purple-100 transition">
                                        {opt.icon}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-800 group-hover:text-purple-700">{opt.label}</div>
                                        <div className="text-sm text-gray-500">{opt.desc}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredTestimonies.length === 0 ? (
                                <div className="text-center py-10 text-gray-400">
                                    <div className="text-4xl mb-2">😶</div>
                                    No testimonies available yet.
                                </div>
                            ) : (
                                filteredTestimonies.map(t => (
                                    <div key={t.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-2 relative overflow-hidden">
                                        {t.truthPercentage < 60 && (
                                            <div className="absolute top-0 right-0 bg-purple-100 text-purple-700 text-[10px] px-2 py-0.5 rounded-bl font-bold">
                                                FABRICATED ({t.truthPercentage}% TRUTH)
                                            </div>
                                        )}
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-gray-800">{t.title}</h4>
                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 uppercase">{t.type}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">"{t.description}"</p>
                                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                                            <div className="text-xs text-gray-400">Giver: {t.witnesses[0] || 'Anonymous'}</div>
                                            <button
                                                onClick={() => handleShare(t)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm transition"
                                            >
                                                Share on Sunday
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-100 p-4 border-t border-gray-200 flex justify-between items-center">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-sm font-medium px-4">Close Department</button>
                    <div className="text-xs text-gray-400 italic">"Go and tell what the Lord has done" - Mark 5:19</div>
                </div>
            </div>
        </div>
    );
}
