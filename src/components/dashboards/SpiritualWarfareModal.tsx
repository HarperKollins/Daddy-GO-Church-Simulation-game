'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { createAudioManager } from '@/engine/audioManager';
import { fightDemon } from '@/engine/spiritualWarfareEngine';
import type { DemonEntity } from '@/types/game';

interface SpiritualWarfareModalProps {
    onClose: () => void;
}

// Mock demons if none loaded yet (fallback)
const KNOWN_DEMONS: DemonEntity[] = [
    { id: 'MARINE_SPIRIT', name: 'Marine Spirit', tier: 'major', domain: 'lust', strength: 5000, weakness: ['fasting', 'midnight_prayer'], unlockCondition: 'scandal > 5000' },
    { id: 'VILLAGE_WITCH', name: 'Village People', tier: 'minor', domain: 'poverty', strength: 2000, weakness: ['seed_sowing'], unlockCondition: 'poverty' },
    { id: 'MONITORING_SPIRIT', name: 'Monitoring Spirit', tier: 'minor', domain: 'gossip', strength: 1500, weakness: ['silence'], unlockCondition: 'fame > 2000' }
];

export default function SpiritualWarfareModal({ onClose }: SpiritualWarfareModalProps) {
    const { engine, stats, modifyStat } = useGameStore();
    const [audioManager] = useState(() => createAudioManager());
    const [battleLog, setBattleLog] = useState<string[]>([]);
    const [isBattling, setIsBattling] = useState(false);

    const spiritualState = engine.spiritual?.state || {
        protectionLevel: 50,
        activeBlessing: null,
        activeCurse: null,
        demonsFought: [],
        demonsDefeated: []
    };

    const handleFight = (demon: DemonEntity) => {
        setIsBattling(true);
        audioManager.playEffect('UI_CLICK');
        setBattleLog(prev => [`⚔️ Engaging ${demon.name}...`, ...prev]);

        // Simulate battle delay
        setTimeout(() => {
            // Fix arguments: demon, spiritualState, stats, tactics
            const result = fightDemon(demon, spiritualState, stats, ['fasting', 'midnight_prayer']); // Hardcoded tactics for now

            if (result.victory) { // Was result.won
                audioManager.playVoice('VOICE_FIRE');
                audioManager.playEffect('MUSIC_VICTORY');
                setBattleLog(prev => [`✅ VICTORY! ${result.narrative}`, ...prev]);
                modifyStat('anointing', 100);
                modifyStat('fame', 50);
            } else {
                audioManager.playEffect('UI_ERROR');
                setBattleLog(prev => [`❌ DEFEAT... ${result.narrative}`, ...prev]);
                modifyStat('health', -result.playerDamage); // Was result.damageTaken
                modifyStat('anointing', -50);
            }

            setIsBattling(false);
        }, 1500);
    };

    const handlePray = () => {
        audioManager.playEffect('MUSIC_PRAYER');
        setBattleLog(prev => ["🙏 Sending prayers to the heavens...", ...prev]);
        setTimeout(() => {
            modifyStat('anointing', 50);
            setBattleLog(prev => ["✨ Anointing increased by 50!", ...prev]);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            style={{ backgroundImage: 'url(/assets/patterns/noise.png)' }}>
            <div className="bg-red-950/30 w-full max-w-5xl h-[85vh] rounded-3xl border-2 border-red-500/30 flex overflow-hidden shadow-[0_0_50px_rgba(255,0,0,0.2)] backdrop-blur-md">

                {/* Left Panel: Status */}
                <div className="w-1/3 bg-black/40 p-6 border-r border-red-500/20 flex flex-col gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-red-500 font-serif mb-2">WARFARE ROOM</h2>
                        <p className="text-red-200/60 text-sm">"For we wrestle not against flesh and blood..."</p>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-red-900/20 p-4 rounded-xl border border-red-500/30">
                            <label className="text-red-400 text-xs uppercase tracking-widest">Spiritual Protection</label>
                            <div className="text-2xl font-bold text-white mt-1">{spiritualState.protectionLevel}%</div>
                            <div className="w-full bg-black h-2 rounded-full mt-2 overflow-hidden">
                                <div className="bg-red-500 h-full transition-all duration-500" style={{ width: `${spiritualState.protectionLevel}%` }} />
                            </div>
                        </div>

                        <div className="bg-amber-900/20 p-4 rounded-xl border border-amber-500/30">
                            <label className="text-amber-400 text-xs uppercase tracking-widest">Current Anointing</label>
                            <div className="text-2xl font-bold text-white mt-1">{stats.anointing.toLocaleString()}</div>
                        </div>

                        {spiritualState.activeCurse && (
                            <div className="bg-purple-900/40 p-4 rounded-xl border border-purple-500/50 animate-pulse">
                                <label className="text-purple-400 text-xs uppercase tracking-widest">Active Curse</label>
                                <div className="text-lg font-bold text-white mt-1">{spiritualState.activeCurse.name}</div>
                                <p className="text-xs text-purple-300 mt-1">Source: {spiritualState.activeCurse.source}</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-auto space-y-3">
                        <button
                            onClick={handlePray}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-red-600 text-white font-bold hover:scale-105 transition shadow-lg shadow-red-900/20"
                        >
                            🔥 NOON PRAYERS
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-3 rounded-xl border border-white/10 text-white/50 hover:bg-white/5 hover:text-white transition"
                        >
                            Return to Safety
                        </button>
                    </div>
                </div>

                {/* Right Panel: Demons & Battle */}
                <div className="flex-1 flex flex-col bg-gradient-to-b from-black/60 to-red-950/20">
                    {/* Battle Log */}
                    <div className="h-48 bg-black/40 p-4 overflow-y-auto border-b border-red-500/20 font-mono text-sm">
                        {battleLog.length === 0 && <span className="text-white/20 italic">Waiting for command...</span>}
                        {battleLog.map((log, i) => (
                            <div key={i} className={`mb-1 ${log.includes('VICTORY') ? 'text-green-400' : log.includes('DEFEAT') ? 'text-red-400' : 'text-gray-300'}`}>
                                {log}
                            </div>
                        ))}
                    </div>

                    {/* Demon Grid */}
                    <div className="flex-1 p-6 overflow-y-auto">
                        <h3 className="text-red-400 font-bold mb-4 uppercase tracking-wider text-sm">Identified Principalities</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {KNOWN_DEMONS.map(demon => (
                                <div key={demon.id} className="group relative bg-black/40 border border-red-900/50 hover:border-red-500 rounded-xl p-4 transition-all hover:-translate-y-1">
                                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-red-950 text-red-400 text-[10px] border border-red-900 uppercase">
                                        {demon.tier}
                                    </div>
                                    <div className="text-2xl mb-2">👿</div>
                                    <h4 className="font-bold text-white mb-1">{demon.name}</h4>
                                    <p className="text-xs text-red-200/50 mb-4">Domain: {demon.domain}</p>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="text-xs text-gray-400">Power: <span className="text-red-400">{demon.strength}</span></div>
                                        <button
                                            onClick={() => handleFight(demon)}
                                            disabled={isBattling}
                                            className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                                        >
                                            {isBattling ? 'FIGHTING...' : 'BIND & CAST'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
