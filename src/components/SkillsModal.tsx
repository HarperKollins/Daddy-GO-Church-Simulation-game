/**
 * SkillsModal Component - Nano Banana Skill Tree
 * Music Inc style colorful progress bars.
 */

'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import ThreeDEmoji from './ThreeDEmoji';

// Skill Configuration with Colors
const SKILLS_CONFIG = [
    { id: 'preaching', label: 'Preaching', color: '#a78bfa', icon: 'preaching' }, // Purple
    { id: 'healing', label: 'Healing', color: '#4ade80', icon: 'health' },       // Green
    { id: 'prophecy', label: 'Prophecy', color: '#fbbf24', icon: 'vision' },     // Gold
    { id: 'administration', label: 'Admin', color: '#38bdf8', icon: 'chart' },   // Blue
    { id: 'music', label: 'Music', color: '#f472b6', icon: 'music' },            // Pink
    { id: 'politics', label: 'Politics', color: '#94a3b8', icon: 'politics' },   // Slate
];

export default function SkillsModal() {
    const { skills, trainSkill, stats } = useGameStore(state => ({
        skills: state.skills,
        trainSkill: state.trainSkill,
        stats: state.stats
    }));
    const [message, setMessage] = useState<{ text: string; color: string } | null>(null);

    const handleTrain = (skillId: string, skillLabel: string) => {
        const result = trainSkill(skillId as any);

        if (result.success) {
            setMessage({
                text: `✅ ${skillLabel} improved! (+${result.skillGain.toFixed(1)}) Cost: ${result.energyCost} NRG`,
                color: '#22c55e'
            });
        } else if (result.skillGain === 0 && result.energyCost === 0) {
            setMessage({ text: `🏆 ${skillLabel} is maxed out!`, color: '#fbbf24' });
        } else {
            setMessage({ text: `❌ Not enough energy! Need ${result.energyCost} NRG`, color: '#ef4444' });
        }

        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div style={{ padding: '16px', paddingBottom: '100px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#e0e0e0', marginBottom: '8px' }}>Anointing Level</h2>
            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '24px' }}>
                Energy: {stats.energy} NRG
            </p>

            {/* Feedback Message */}
            {message && (
                <div style={{
                    padding: '12px 16px',
                    marginBottom: '16px',
                    borderRadius: '12px',
                    background: `${message.color}15`,
                    border: `1px solid ${message.color}40`,
                    color: message.color,
                    fontSize: '13px',
                    fontWeight: 600,
                    textAlign: 'center'
                }}>
                    {message.text}
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {SKILLS_CONFIG.map((skill) => {
                    const currentLevel = (skills as any)[skill.id] || 0;
                    const progress = (currentLevel / 10) * 100; // Max level is 10

                    return (
                        <div key={skill.id} className="nano-card" style={{ padding: '16px' }}>
                            {/* Header */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '12px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                        width: '32px', height: '32px',
                                        background: `${skill.color}20`,
                                        borderRadius: '8px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <ThreeDEmoji icon={skill.icon} fallback="✨" size={20} />
                                    </div>
                                    <span style={{ fontWeight: 700, fontSize: '15px', color: '#e0e0e0' }}>{skill.label}</span>
                                </div>
                                <div style={{
                                    color: skill.color,
                                    fontSize: '18px',
                                    fontWeight: 700,
                                    fontFamily: 'monospace'
                                }}>
                                    {currentLevel.toFixed(1)}
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="bar-track" style={{ height: '12px', background: 'rgba(255,255,255,0.05)' }}>
                                <div
                                    className="bar-fill"
                                    style={{
                                        width: `${Math.min(progress, 100)}%`,
                                        background: skill.color,
                                        boxShadow: `0 0 10px ${skill.color}60`
                                    }}
                                />
                            </div>

                            {/* Train Button */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                                <button
                                    onClick={() => handleTrain(skill.id, skill.label)}
                                    disabled={currentLevel >= 10}
                                    style={{
                                        background: currentLevel >= 10 ? 'rgba(100,100,100,0.2)' : 'transparent',
                                        border: `1px solid ${skill.color}40`,
                                        color: currentLevel >= 10 ? '#6b7280' : skill.color,
                                        padding: '6px 16px',
                                        borderRadius: '99px',
                                        fontSize: '11px',
                                        fontWeight: 700,
                                        cursor: currentLevel >= 10 ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}
                                >
                                    <span>{currentLevel >= 10 ? 'MAXED' : 'TRAIN'}</span>
                                    {currentLevel < 10 && <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>bolt</span>}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

