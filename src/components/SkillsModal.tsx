/**
 * SkillsModal Component - Design System Refactor
 */

'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import ThreeDEmoji from './ThreeDEmoji';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface SkillsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Skill Configuration with Colors - Mapped to Tailwind-ish colors
const SKILLS_CONFIG = [
    { id: 'preaching', label: 'Preaching', color: 'text-purple-400', barVariant: 'default', icon: 'preaching' },
    { id: 'healing', label: 'Healing', color: 'text-green-400', barVariant: 'success', icon: 'health' },
    { id: 'prophecy', label: 'Prophecy', color: 'text-amber-400', barVariant: 'warning', icon: 'vision' },
    { id: 'administration', label: 'Admin', color: 'text-blue-400', barVariant: 'default', icon: 'chart' },
    { id: 'music', label: 'Music', color: 'text-pink-400', barVariant: 'default', icon: 'music' },
    { id: 'politics', label: 'Politics', color: 'text-slate-400', barVariant: 'secondary', icon: 'politics' },
];

export default function SkillsModal({ isOpen, onClose }: SkillsModalProps) {
    const skills = useGameStore(state => state.skills || {});
    const trainSkill = useGameStore(state => state.trainSkill);
    const stats = useGameStore(state => state.stats || { energy: 0 });
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'warning' | 'error' } | null>(null);

    const handleTrain = (skillId: string, skillLabel: string) => {
        const result = trainSkill(skillId as any);

        if (result.success) {
            setMessage({
                text: `✅ ${skillLabel} improved! (+${result.skillGain.toFixed(1)}) Cost: ${result.energyCost} NRG`,
                type: 'success'
            });
        } else if (result.skillGain === 0 && result.energyCost === 0) {
            setMessage({ text: `🏆 ${skillLabel} is maxed out!`, type: 'warning' });
        } else {
            setMessage({ text: `❌ Not enough energy! Need ${result.energyCost} NRG`, type: 'error' });
        }

        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Train Skills">
            <div className="space-y-6">

                {/* Header Status */}
                <div className="flex justify-between items-center bg-surface p-3 rounded-lg border border-border-subtle">
                    <span className="text-text-secondary text-xs uppercase font-bold tracking-wider">Available Energy</span>
                    <span className="text-warning font-mono font-bold">{stats.energy} NRG</span>
                </div>

                {/* Feedback Message */}
                {message && (
                    <div className={`p-3 rounded-lg text-xs font-bold text-center animate-in slide-in-from-top-2 border ${message.type === 'success' ? 'bg-success/10 text-success border-success/20' :
                            message.type === 'warning' ? 'bg-warning/10 text-warning border-warning/20' :
                                'bg-danger/10 text-danger border-danger/20'
                        }`}>
                        {message.text}
                    </div>
                )}

                {/* Skills Grid */}
                <div className="space-y-4">
                    {SKILLS_CONFIG.map((skill) => {
                        const currentLevel = (skills as any)[skill.id] || 0;
                        const progress = (currentLevel / 10) * 100; // Max level is 10
                        const isMaxed = currentLevel >= 10;

                        return (
                            <div key={skill.id} className="bg-surface/50 p-4 rounded-xl border border-border-subtle hover:border-border-prominent transition-colors">
                                {/* Header */}
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-black/30 flex items-center justify-center">
                                            <ThreeDEmoji icon={skill.icon} fallback="✨" size={20} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-text-primary">{skill.label}</div>
                                            <div className={`text-[10px] font-bold ${skill.color} uppercase opacity-80`}>
                                                Lvl {currentLevel.toFixed(1)}
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        size="sm"
                                        variant={isMaxed ? 'secondary' : 'default'}
                                        onClick={() => handleTrain(skill.id, skill.label)}
                                        disabled={isMaxed}
                                        className="h-8 text-[10px] font-bold"
                                    >
                                        {isMaxed ? 'MAX' : 'TRAIN'}
                                    </Button>
                                </div>

                                {/* Padded Bar */}
                                <div className="px-1">
                                    <ProgressBar
                                        value={progress}
                                        max={100}
                                        variant={skill.barVariant as any}
                                        className="h-2"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Modal>
    );
}

