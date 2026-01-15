/**
 * ActionMenu Component - Reference Design Match
 * Action cards with icons, descriptions, and energy costs.
 */

'use client';

import { useGameStore } from '@/store/useGameStore';
import { useState } from 'react';

interface ActionMenuProps {
    onAction: (action: any) => void;
}

export default function ActionMenu({ onAction }: ActionMenuProps) {
    const { stats, church } = useGameStore();
    const [activeTab, setActiveTab] = useState<'ministry' | 'lifestyle'>('ministry');

    // Ministry Actions
    const ministryActions = [
        {
            id: 'preach',
            title: 'Preach the Word',
            description: 'Gain members & offering',
            icon: '📈',
            iconBg: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            energyCost: 20,
            effects: { members: 5, churchCash: 1000, anointing: 50 }
        },
        {
            id: 'sunday_service',
            title: 'Sunday Service',
            description: 'Major boost to growth',
            icon: '🌅',
            iconBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
            energyCost: 50,
            effects: { members: 15, churchCash: 5000, anointing: 100 }
        },
        {
            id: 'upgrade_venue',
            title: 'Upgrade Venue',
            description: `To: ${getNextVenue(church.venue)}`,
            icon: '📈',
            iconBg: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
            energyCost: 0,
            effects: {}
        },
        {
            id: 'pray',
            title: 'Mountain Prayer',
            description: 'Increase anointing',
            icon: '🙏',
            iconBg: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
            energyCost: 15,
            effects: { anointing: 100, health: 5 }
        },
        {
            id: 'bible_study',
            title: 'Bible Study',
            description: 'Learn & grow spiritually',
            icon: '📖',
            iconBg: 'linear-gradient(135deg, #22c55e, #16a34a)',
            energyCost: 10,
            effects: { anointing: 30, fame: 10 }
        },
        {
            id: 'crusade',
            title: 'Street Crusade',
            description: 'Evangelize for souls',
            icon: '🎤',
            iconBg: 'linear-gradient(135deg, #ec4899, #be185d)',
            energyCost: 30,
            effects: { members: 25, fame: 20 }
        },
    ];

    // Lifestyle Actions
    const lifestyleActions = [
        {
            id: 'rest',
            title: 'Rest & Refresh',
            description: 'Restore health & energy',
            icon: '😴',
            iconBg: 'linear-gradient(135deg, #2dd4bf, #14b8a6)',
            energyCost: 0,
            effects: { health: 15, energy: 200 }
        },
        {
            id: 'date',
            title: 'Go on a Date',
            description: 'Find love or strengthen bond',
            icon: '❤️',
            iconBg: 'linear-gradient(135deg, #f43f5e, #e11d48)',
            energyCost: 15,
            effects: { stress: -20 }
        },
        {
            id: 'gym',
            title: 'Hit the Gym',
            description: 'Improve health',
            icon: '💪',
            iconBg: 'linear-gradient(135deg, #ef4444, #dc2626)',
            energyCost: 20,
            effects: { health: 10 }
        },
        {
            id: 'invest',
            title: 'Invest Money',
            description: 'Grow your wealth',
            icon: '📊',
            iconBg: 'linear-gradient(135deg, #22c55e, #15803d)',
            energyCost: 5,
            effects: {}
        },
    ];

    const currentActions = activeTab === 'ministry' ? ministryActions : lifestyleActions;

    function getNextVenue(current: string) {
        const venues = ['Canopy', 'Classroom', 'Hall', 'Auditorium', 'Stadium', 'Camp Ground'];
        const idx = venues.indexOf(current);
        return idx < venues.length - 1 ? venues[idx + 1] : 'Mega Complex';
    }

    const handleAction = (action: any) => {
        if (stats.energy < action.energyCost && action.energyCost > 0) {
            return; // Can't afford
        }
        onAction(action);
    };

    return (
        <div style={{
            padding: '0 16px',
            paddingBottom: '100px',
        }}>
            {/* Tab Pills */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '16px',
                paddingTop: '8px',
            }}>
                <button
                    onClick={() => setActiveTab('ministry')}
                    style={{
                        background: activeTab === 'ministry' ? '#1e293b' : 'transparent',
                        color: activeTab === 'ministry' ? '#e0e0e0' : '#64748b',
                        border: '1px solid',
                        borderColor: activeTab === 'ministry' ? '#334155' : '#1e293b',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    Values & Ministry
                </button>
                <button
                    onClick={() => setActiveTab('lifestyle')}
                    style={{
                        background: activeTab === 'lifestyle' ? '#1e293b' : 'transparent',
                        color: activeTab === 'lifestyle' ? '#e0e0e0' : '#64748b',
                        border: '1px solid',
                        borderColor: activeTab === 'lifestyle' ? '#334155' : '#1e293b',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    Lifestyle & Assets
                </button>
            </div>

            {/* Action Cards */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
            }}>
                {currentActions.map((action) => {
                    const canAfford = stats.energy >= action.energyCost || action.energyCost === 0;
                    return (
                        <button
                            key={action.id}
                            onClick={() => handleAction(action)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '14px 16px',
                                background: '#111118',
                                border: 'none',
                                borderRadius: '12px',
                                cursor: canAfford ? 'pointer' : 'not-allowed',
                                opacity: canAfford ? 1 : 0.5,
                                transition: 'transform 0.1s, background 0.2s',
                                textAlign: 'left',
                            }}
                        >
                            {/* Icon */}
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '10px',
                                background: action.iconBg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '22px',
                                flexShrink: 0,
                            }}>
                                {action.icon}
                            </div>

                            {/* Text */}
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    color: '#e0e0e0',
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    marginBottom: '2px',
                                }}>
                                    {action.title}
                                </div>
                                <div style={{
                                    color: '#6b7280',
                                    fontSize: '12px',
                                }}>
                                    {action.description}
                                </div>
                            </div>

                            {/* Energy Cost */}
                            {action.energyCost > 0 && (
                                <div style={{
                                    color: canAfford ? '#22c55e' : '#ef4444',
                                    fontSize: '13px',
                                    fontWeight: 700,
                                    whiteSpace: 'nowrap',
                                }}>
                                    {action.energyCost} NRG
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Start Next Week Button */}
            <button
                onClick={() => onAction({ id: 'advance_week', energyCost: 0, effects: {} })}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    marginTop: '24px',
                    padding: '14px 24px',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                }}
            >
                Start Next Week 📈
            </button>
        </div>
    );
}
