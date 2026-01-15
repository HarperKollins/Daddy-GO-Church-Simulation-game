/**
 * StatsBar Component - Complete Overhaul
 * 
 * Shows ALL game stats clearly:
 * - Fame (Grade: F-S)
 * - Scandal (Bar)
 * - Anointing (Bar)
 * - Health & Energy (Bars)
 * - Cash (Personal & Church)
 * - Members
 * - Uni Year
 * - Relationship Status
 */

'use client';

import { useGameStore } from '@/store/useGameStore';
import { Icons } from '@/components/Icons';

// Convert fame number to letter grade (scale 0-10000)
const getFameGrade = (fame: number): { grade: string; color: string } => {
    if (fame >= 8600) return { grade: 'S', color: '#FFD700' }; // Gold
    if (fame >= 7100) return { grade: 'A', color: '#10b981' }; // Green
    if (fame >= 5600) return { grade: 'B', color: '#3b82f6' }; // Blue
    if (fame >= 4100) return { grade: 'C', color: '#8b5cf6' }; // Purple
    if (fame >= 2600) return { grade: 'D', color: '#f59e0b' }; // Orange
    if (fame >= 1100) return { grade: 'E', color: '#ef4444' }; // Red
    return { grade: 'F', color: '#6b7280' }; // Gray
};

const formatCash = (amount: number): string => {
    if (amount >= 1e9) return `₦${(amount / 1e9).toFixed(1)}B`;
    if (amount >= 1e6) return `₦${(amount / 1e6).toFixed(1)}M`;
    if (amount >= 1e3) return `₦${(amount / 1e3).toFixed(0)}K`;
    return `₦${amount.toLocaleString()}`;
};

interface StatsBarProps {
    onDropoutClick?: () => void;
    onSettingsClick?: () => void;
}

export default function StatsBar({ onDropoutClick, onSettingsClick }: StatsBarProps) {
    const store = useGameStore();
    const { week, age, stats, church, uniYear, relationshipStatus, skills, occupation } = store;
    const fameInfo = getFameGrade(stats.fame);

    return (
        <div className="stats-header">
            {/* Row 1: Date, Uni Level, Relationship */}
            <div className="stats-row primary-row">
                <div className="stat-group left">
                    <div className="week-badge">{store.getDate()}</div>
                    <div className="week-badge age-badge" title="Pastor's Age">
                        <Icons.User size={10} style={{ marginRight: '4px' }} />
                        Age {age}
                    </div>
                    {occupation === 'Student' && (
                        <div
                            className="week-badge uni-badge clickable"
                            onClick={onDropoutClick}
                            style={{ cursor: 'pointer', border: '1px dashed rgba(255,255,255,0.3)' }}
                            title="Click to Consider Dropping Out"
                        >
                            <Icons.BookOpen size={10} style={{ marginRight: '4px' }} />
                            {uniYear}
                        </div>
                    )}
                    <div className="week-badge relationship-badge">
                        <Icons.Heart size={10} style={{ marginRight: '4px' }} />
                        {relationshipStatus}
                    </div>
                </div>

                <div className="stat-group right" style={{ gap: '8px' }}>
                    <div className="resource-pill cash" title="Personal Cash">
                        <Icons.Wallet size={14} />
                        <span>{formatCash(stats.personalCash)}</span>
                    </div>
                    <div
                        className="week-badge"
                        onClick={onSettingsClick}
                        style={{ cursor: 'pointer', padding: '6px', background: 'rgba(255,255,255,0.1)' }}
                        title="Settings"
                    >
                        <Icons.Settings size={14} />
                    </div>
                </div>
            </div>

            {/* Row 2: Core Stats Bars */}
            <div className="stats-grid-full">
                {/* Health */}
                <div className="stat-bar-item">
                    <div className="stat-bar-label">
                        <Icons.Heart size={12} className="icon-health" />
                        <span>HP</span>
                    </div>
                    <div className="stat-bar-container">
                        <div className="stat-bar-fill health" style={{ width: `${Math.min(100, stats.health / 100)}%` }} />
                    </div>
                    <span className="stat-bar-value">{Math.round(stats.health / 100)}%</span>
                </div>

                {/* Energy */}
                <div className="stat-bar-item">
                    <div className="stat-bar-label">
                        <Icons.Zap size={12} className="icon-energy" />
                        <span>NRG</span>
                    </div>
                    <div className="stat-bar-container">
                        <div className="stat-bar-fill energy" style={{ width: `${Math.min(100, stats.energy / 10)}%` }} />
                    </div>
                    <span className="stat-bar-value">{Math.round(stats.energy / 10)}</span>
                </div>

                {/* Anointing */}
                <div className="stat-bar-item">
                    <div className="stat-bar-label">
                        <Icons.Cross size={12} className="icon-anointing" />
                        <span>SPIRIT</span>
                    </div>
                    <div className="stat-bar-container">
                        <div className="stat-bar-fill anointing" style={{ width: `${Math.min(100, stats.anointing / 100)}%` }} />
                    </div>
                    <span className="stat-bar-value">{Math.round(stats.anointing / 100)}</span>
                </div>

                {/* Scandal */}
                <div className="stat-bar-item">
                    <div className="stat-bar-label">
                        <span style={{ fontSize: '12px' }}>⚠️</span>
                        <span>SCANDAL</span>
                    </div>
                    <div className="stat-bar-container danger">
                        <div className="stat-bar-fill scandal" style={{ width: `${Math.min(100, stats.scandal / 100)}%` }} />
                    </div>
                    <span className="stat-bar-value" style={{ color: stats.scandal > 5000 ? '#ef4444' : 'inherit' }}>
                        {Math.round(stats.scandal / 100)}%
                    </span>
                </div>
            </div>

            {/* Row 3: Fame Grade, Church Cash, Members */}
            <div className="stats-row info-row">
                <div className="fame-grade-badge" style={{ background: `${fameInfo.color}20`, color: fameInfo.color }}>
                    <Icons.Star size={14} />
                    <span className="fame-grade">{fameInfo.grade}</span>
                    <span className="fame-label">FAME</span>
                </div>

                <div className="church-stats">
                    <div className="church-stat">
                        <Icons.Church size={14} className="icon-church" />
                        <span>{formatCash(stats.churchCash)}</span>
                    </div>
                    <div className="church-stat">
                        <Icons.Users size={14} className="icon-members" />
                        <span>{church.members}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
