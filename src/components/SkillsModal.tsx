/**
 * SkillsModal Component
 * 
 * Shows pastor skill levels and XP progression.
 * Skills: Preaching, Healing, Charisma, Business, Politics
 */

'use client';

import { useGameStore } from '@/store/useGameStore';
import { Icons } from '@/components/Icons';

interface SkillsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTrain: (skill: string) => void;
}

const skillInfo = {
    preaching: { name: 'Preaching', icon: '🎤', color: '#3b82f6', desc: 'Cash from sermons' },
    healing: { name: 'Healing', icon: '✨', color: '#a855f7', desc: 'Miracle success rate' },
    charisma: { name: 'Charisma', icon: '💫', color: '#f59e0b', desc: 'Member recruitment' },
    business: { name: 'Business', icon: '💼', color: '#10b981', desc: 'Investment returns' },
    politics: { name: 'Politics', icon: '🏛️', color: '#6366f1', desc: 'Scandal resistance' },
};

export default function SkillsModal({ isOpen, onClose, onTrain }: SkillsModalProps) {
    const { skills, stats } = useGameStore();

    if (!isOpen) return null;

    const getSkillLevel = (value: number) => {
        if (value >= 10) return { level: 'MAX', color: '#FFD700' };
        if (value >= 8) return { level: 'Expert', color: '#10b981' };
        if (value >= 6) return { level: 'Skilled', color: '#3b82f6' };
        if (value >= 4) return { level: 'Trained', color: '#a855f7' };
        if (value >= 2) return { level: 'Basic', color: '#f59e0b' };
        return { level: 'Novice', color: '#6b7280' };
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
                <div className="modal-header">
                    <h2>🎯 Pastor Skills</h2>
                    <button onClick={onClose} className="modal-close">×</button>
                </div>

                <div style={{ padding: '16px' }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '13px' }}>
                        Skills improve as you perform actions. Higher skills = better results!
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {Object.entries(skills).map(([key, value]) => {
                            const info = skillInfo[key as keyof typeof skillInfo];
                            const levelInfo = getSkillLevel(value);

                            return (
                                <div key={key} style={{
                                    background: 'var(--bg-input)',
                                    borderRadius: '10px',
                                    padding: '12px 16px',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ fontSize: '20px' }}>{info.icon}</span>
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: '14px' }}>{info.name}</div>
                                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{info.desc}</div>
                                            </div>
                                        </div>
                                        <div style={{
                                            background: `${levelInfo.color}20`,
                                            color: levelInfo.color,
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: 700
                                        }}>
                                            {levelInfo.level}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{
                                            flex: 1,
                                            height: '8px',
                                            background: 'rgba(255,255,255,0.1)',
                                            borderRadius: '4px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${(value / 10) * 100}%`,
                                                height: '100%',
                                                background: `linear-gradient(90deg, ${info.color}, ${info.color}99)`,
                                                borderRadius: '4px',
                                                transition: 'width 0.3s ease'
                                            }} />
                                        </div>
                                        <span style={{ fontWeight: 700, fontSize: '14px', minWidth: '30px', textAlign: 'right' }}>
                                            {value.toFixed(1)}/10
                                        </span>
                                    </div>

                                    {/* Train Button */}
                                    {value < 10 && (
                                        <button
                                            onClick={() => onTrain(key)}
                                            disabled={stats.energy < (value >= 7 ? 50 : value >= 4 ? 40 : 30)}
                                            style={{
                                                marginTop: '8px',
                                                width: '100%',
                                                padding: '8px',
                                                background: stats.energy >= (value >= 7 ? 50 : value >= 4 ? 40 : 30)
                                                    ? `${info.color}30`
                                                    : 'rgba(255,255,255,0.05)',
                                                color: stats.energy >= (value >= 7 ? 50 : value >= 4 ? 40 : 30)
                                                    ? info.color
                                                    : 'var(--text-muted)',
                                                border: `1px solid ${info.color}50`,
                                                borderRadius: '6px',
                                                fontSize: '12px',
                                                fontWeight: 700,
                                                cursor: stats.energy >= (value >= 7 ? 50 : value >= 4 ? 40 : 30) ? 'pointer' : 'not-allowed',
                                                opacity: stats.energy >= (value >= 7 ? 50 : value >= 4 ? 40 : 30) ? 1 : 0.5,
                                            }}
                                        >
                                            🏋️ Train ({value >= 7 ? 50 : value >= 4 ? 40 : 30} Energy)
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
