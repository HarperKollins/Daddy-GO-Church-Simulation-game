'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { createAudioManager } from '@/engine/audioManager';
import { fightDemon } from '@/engine/spiritualWarfareEngine';
import type { DemonEntity } from '@/types/game';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';

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
            const result = fightDemon(demon, spiritualState, stats, ['fasting', 'midnight_prayer']); // Hardcoded tactics for now

            if (result.victory) {
                audioManager.playVoice('VOICE_FIRE');
                audioManager.playEffect('MUSIC_VICTORY');
                setBattleLog(prev => [`✅ VICTORY! ${result.narrative}`, ...prev]);
                modifyStat('anointing', 100);
                modifyStat('fame', 50);
            } else {
                audioManager.playEffect('UI_ERROR');
                setBattleLog(prev => [`❌ DEFEAT... ${result.narrative}`, ...prev]);
                modifyStat('health', -result.playerDamage);
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
        <Modal isOpen={true} onClose={onClose} title="Warfare Room" className="max-w-4xl h-[80vh]">
            <div className="flex flex-col md:flex-row gap-6 h-full text-text-primary">

                {/* Left Panel: Status */}
                <div className="w-full md:w-1/3 flex flex-col gap-4">
                    <Card className="bg-red-500/5 border-red-500/20 p-4">
                        <h3 className="font-bold text-red-500 mb-4 flex items-center gap-2">
                            <span className="text-xl">🛡️</span> Spiritual State
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1 uppercase tracking-wider text-text-secondary">Protection</div>
                                <ProgressBar value={spiritualState.protectionLevel} max={100} variant="danger" className="h-2" />
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1 uppercase tracking-wider text-text-secondary">Anointing</div>
                                <div className="text-xl font-black text-amber-500">{stats.anointing.toLocaleString()}</div>
                            </div>
                        </div>
                    </Card>

                    {spiritualState.activeCurse && (
                        <Card className="bg-purple-500/10 border-purple-500/30 p-4 animate-pulse">
                            <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">Active Curse</div>
                            <div className="text-lg font-bold text-purple-300">{spiritualState.activeCurse.name}</div>
                            <p className="text-xs text-purple-400/70 mt-1">Source: {spiritualState.activeCurse.source}</p>
                        </Card>
                    )}

                    <div className="mt-auto space-y-3">
                        <Button
                            onClick={handlePray}
                            variant="default"
                            className="w-full bg-gradient-to-r from-amber-600 to-red-600 border-none hover:scale-105 transition-transform shadow-lg shadow-red-500/20"
                        >
                            🔥 NOON PRAYERS
                        </Button>
                    </div>
                </div>

                {/* Right Panel: Demons & Battle */}
                <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                    {/* Log */}
                    <Card className="flex-[0.4] bg-black/40 border-border-subtle p-3 overflow-y-auto font-mono text-xs">
                        {battleLog.length === 0 && <span className="text-text-muted italic">Waiting for command...</span>}
                        {battleLog.map((log, i) => (
                            <div key={i} className={`mb-1 ${log.includes('VICTORY') ? 'text-success' : log.includes('DEFEAT') ? 'text-danger' : 'text-text-secondary'}`}>
                                {log}
                            </div>
                        ))}
                    </Card>

                    {/* Demons */}
                    <div className="flex-1 overflow-y-auto">
                        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Principalities in Region</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {KNOWN_DEMONS.map(demon => (
                                <Card key={demon.id} className="p-3 border-border-subtle hover:border-red-500/50 transition-colors group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="text-2xl opacity-80 group-hover:scale-110 transition-transform">👿</div>
                                        <Badge variant="outline" className="text-[10px] border-text-muted text-text-muted uppercase">{demon.tier}</Badge>
                                    </div>
                                    <h4 className="font-bold text-text-primary mb-1">{demon.name}</h4>
                                    <div className="text-xs text-text-secondary mb-3">Domain: {demon.domain}</div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-[10px] text-text-muted">PWR: <span className="text-danger font-bold">{demon.strength}</span></div>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleFight(demon)}
                                            disabled={isBattling}
                                            className="h-7 text-[10px] font-bold"
                                        >
                                            {isBattling ? '...' : 'BIND'}
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
