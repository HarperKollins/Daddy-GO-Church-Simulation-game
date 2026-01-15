/**
 * StatsBar Component - Matching Reference Design
 * Dark theme with date/age header, status badges, and progress bars.
 */

'use client';

import { useGameStore } from '@/store/useGameStore';

const formatCash = (amount: number): string => {
    if (amount >= 1e9) return `₦${(amount / 1e9).toFixed(1)}B`;
    if (amount >= 1e6) return `₦${(amount / 1e6).toFixed(1)}M`;
    if (amount >= 1e3) return `₦${(amount / 1e3).toFixed(0)}K`;
    return `₦${amount.toLocaleString()}`;
};

interface StatsBarProps {
    onSettingsClick?: () => void;
}

export default function StatsBar({ onSettingsClick }: StatsBarProps) {
    const { stats, week, church, partner, age, relationshipStatus } = useGameStore();

    // Calculate date from weeks
    const startDate = new Date(2026, 0, 1); // Jan 1, 2026
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + (week * 7));
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const dateString = `${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    // Fame Level
    const getFameLevel = () => {
        if (stats.fame >= 10000) return 'S';
        if (stats.fame >= 5000) return 'A';
        if (stats.fame >= 2000) return 'B';
        if (stats.fame >= 500) return 'C';
        if (stats.fame >= 100) return 'D';
        return 'F';
    };

    // Relationship status
    const getRelationshipStatus = () => {
        return relationshipStatus.toUpperCase();
    };

    // University level (simplified)
    const getUniversityLevel = () => {
        const yearInUni = Math.floor(week / 52);
        if (yearInUni >= 4) return 'GRAD';
        if (yearInUni >= 3) return '400L';
        if (yearInUni >= 2) return '300L';
        if (yearInUni >= 1) return '200L';
        return '100L';
    };

    return (
        <div style={{
            background: '#0a0a0f',
            padding: '12px 16px',
            paddingTop: '16px',
        }}>
            {/* Row 1: Date | Age | Money | Settings */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
            }}>
                {/* Date Badge */}
                <div style={{
                    background: '#1a1a2e',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#e0e0e0',
                }}>
                    {dateString}
                </div>

                {/* Age Badge */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#a0a0a0',
                    fontSize: '13px',
                }}>
                    <span style={{ fontSize: '16px' }}>👤</span>
                    <span style={{ fontWeight: 600 }}>AGE {age || 20}</span>
                </div>

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* Money Badge */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(34, 197, 94, 0.15)',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(34, 197, 94, 0.4)',
                    marginRight: '8px',
                }}>
                    <span style={{ color: '#22c55e' }}>💵</span>
                    <span style={{ color: '#22c55e', fontWeight: 700, fontSize: '13px' }}>
                        {formatCash(stats.personalCash + stats.churchCash)}
                    </span>
                </div>

                {/* Settings */}
                <button
                    onClick={onSettingsClick}
                    style={{
                        background: '#1a1a2e',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px',
                        cursor: 'pointer',
                        color: '#a0a0a0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    ⚙️
                </button>
            </div>

            {/* Row 2: University Level | Relationship Status */}
            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '12px',
            }}>
                {/* University Badge */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(139, 92, 246, 0.15)',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    border: '1px solid rgba(139, 92, 246, 0.4)',
                }}>
                    <span style={{ fontSize: '14px' }}>📚</span>
                    <span style={{ color: '#a78bfa', fontWeight: 700, fontSize: '12px' }}>
                        {getUniversityLevel()}
                    </span>
                </div>

                {/* Relationship Badge */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(236, 72, 153, 0.15)',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    border: '1px solid rgba(236, 72, 153, 0.4)',
                }}>
                    <span style={{ color: '#ec4899', fontSize: '14px' }}>❤️</span>
                    <span style={{ color: '#ec4899', fontWeight: 700, fontSize: '12px' }}>
                        {getRelationshipStatus()}
                    </span>
                </div>
            </div>

            {/* Row 3: Stat Bars */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                marginBottom: '8px',
            }}>
                {/* HP Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#ef4444', fontSize: '12px' }}>❤️</span>
                    <span style={{ color: '#ef4444', fontSize: '11px', fontWeight: 700, width: '22px' }}>HP</span>
                    <div style={{
                        flex: 1,
                        height: '6px',
                        background: '#1a1a2e',
                        borderRadius: '3px',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            width: `${Math.min(100, stats.health / 100)}%`,
                            height: '100%',
                            background: '#ef4444',
                            borderRadius: '3px',
                        }} />
                    </div>
                    <span style={{ color: '#6b7280', fontSize: '11px', width: '30px', textAlign: 'right' }}>
                        {Math.round(stats.health / 100)}%
                    </span>
                </div>

                {/* NRG Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#fbbf24', fontSize: '12px' }}>⚡</span>
                    <span style={{ color: '#fbbf24', fontSize: '11px', fontWeight: 700, width: '24px' }}>NRG</span>
                    <div style={{
                        flex: 1,
                        height: '6px',
                        background: '#1a1a2e',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        position: 'relative',
                    }}>
                        <div style={{
                            position: 'absolute',
                            right: '4px',
                            top: '-2px',
                            width: '6px',
                            height: '6px',
                            background: '#fbbf24',
                            borderRadius: '50%',
                        }} />
                    </div>
                    <span style={{ color: '#fbbf24', fontSize: '11px', width: '30px', textAlign: 'right' }}>
                        {Math.round(stats.energy / 10)}
                    </span>
                </div>

                {/* SPIRIT Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#a78bfa', fontSize: '12px' }}>✝️</span>
                    <span style={{ color: '#a78bfa', fontSize: '11px', fontWeight: 700, width: '38px' }}>SPIRIT</span>
                    <div style={{
                        flex: 1,
                        height: '6px',
                        background: '#1a1a2e',
                        borderRadius: '3px',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            width: `${Math.min(100, stats.anointing / 100)}%`,
                            height: '100%',
                            background: '#a78bfa',
                            borderRadius: '3px',
                        }} />
                    </div>
                    <span style={{ color: '#6b7280', fontSize: '11px', width: '30px', textAlign: 'right' }}>
                        {Math.round(stats.anointing / 100)}
                    </span>
                </div>

                {/* SCANDAL Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#f97316', fontSize: '12px' }}>⚠️</span>
                    <span style={{ color: '#f97316', fontSize: '11px', fontWeight: 700, width: '50px' }}>SCANDAL</span>
                    <div style={{
                        flex: 1,
                        height: '6px',
                        background: '#1a1a2e',
                        borderRadius: '3px',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            width: `${Math.min(100, stats.scandal / 100)}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #f97316, #ef4444)',
                            borderRadius: '3px',
                        }} />
                    </div>
                    <span style={{ color: '#f97316', fontSize: '11px', width: '35px', textAlign: 'right' }}>
                        {Math.round(stats.scandal / 100)}%
                    </span>
                </div>
            </div>

            {/* Row 4: Fame | Net Worth | Members */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '10px',
            }}>
                {/* Fame Badge */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#1a1a2e',
                    padding: '6px 12px',
                    borderRadius: '6px',
                }}>
                    <span style={{ color: '#fbbf24', fontSize: '14px' }}>⭐</span>
                    <span style={{ color: '#a0a0a0', fontSize: '12px', fontWeight: 700 }}>
                        {getFameLevel()}
                    </span>
                    <span style={{ color: '#6b7280', fontSize: '11px' }}>FAME</span>
                </div>

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* Net Worth */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginRight: '16px',
                }}>
                    <span style={{ color: '#22c55e', fontSize: '14px' }}>💰</span>
                    <span style={{ color: '#e0e0e0', fontSize: '13px', fontWeight: 700 }}>
                        {formatCash(stats.personalCash + stats.churchCash)}
                    </span>
                </div>

                {/* Members */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                }}>
                    <span style={{ color: '#38bdf8', fontSize: '14px' }}>👥</span>
                    <span style={{ color: '#e0e0e0', fontSize: '13px', fontWeight: 700 }}>
                        {church.members}
                    </span>
                </div>
            </div>
        </div>
    );
}
