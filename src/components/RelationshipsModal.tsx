/**
 * Relationships Modal - Complete Dating Flow
 * 
 * Flow: Single → Dating → Engaged → Married
 * Options for hookups, dating progression, marriage requirements
 */

'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { generatePartnerPool, getArchetypeDescription } from '@/data/relationships';
import type { Partner } from '@/types/game';

interface RelationshipsModalProps {
    onStartDating: (partner: Partner) => void;
    onPropose: () => void;
    onMarry: () => void;
    onBreakup: () => void;
    onHookup: (type: 'church' | 'random' | 'uni') => void;
    onClose: () => void;
}

const archetypeBadges: Record<Partner['archetype'], { label: string; class: string }> = {
    'FAITHFUL_SISTER': { label: 'Faithful Sister', class: 'badge-motivational' },
    'SLAY_QUEEN': { label: 'Slay Queen', class: 'badge-controversial' },
    'PASTOR_DAUGHTER': { label: "Pastor's Daughter", class: 'badge-deliverance' },
    'CHOIR_MISTRESS': { label: 'Choir Mistress', class: 'badge-prosperity' },
};

export default function RelationshipsModal({
    onStartDating,
    onPropose,
    onMarry,
    onBreakup,
    onHookup,
    onClose,
}: RelationshipsModalProps) {
    const { partner, relationshipStatus, relationshipWeeks, stats, church } = useGameStore();
    const [datingPool, setDatingPool] = useState<Partner[]>(() => generatePartnerPool(3));

    const canPropose = relationshipWeeks >= 12 && stats.fame >= 20;
    const canMarry = relationshipWeeks >= 20 && church.members >= 30;

    const handleRefreshPool = () => {
        setDatingPool(generatePartnerPool(3));
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>❤️ Relationships</h2>
                    <button onClick={onClose} className="modal-close">×</button>
                </div>

                <div className="modal-body" style={{ padding: '16px' }}>
                    {/* Single - Can Date or Hook Up */}
                    {relationshipStatus === 'Single' && (
                        <>
                            <div style={{
                                background: 'rgba(236, 72, 153, 0.1)',
                                padding: '12px',
                                borderRadius: '10px',
                                marginBottom: '16px',
                                textAlign: 'center'
                            }}>
                                <span style={{ fontSize: '24px' }}>💔</span>
                                <p style={{ margin: '8px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                    You are currently single. Find a good woman... or have some fun.
                                </p>
                            </div>

                            {/* Dating Pool */}
                            <h3 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--text-muted)' }}>
                                AVAILABLE WOMEN
                            </h3>
                            {datingPool.map(p => (
                                <div key={p.id} className="list-item" style={{ flexDirection: 'column', gap: '10px', marginBottom: '10px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: '40px', height: '40px',
                                                background: 'rgba(236, 72, 153, 0.15)',
                                                borderRadius: '50%',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontWeight: 700, color: '#ec4899'
                                            }}>
                                                {p.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 700 }}>{p.name}</div>
                                                <span className={`badge ${archetypeBadges[p.archetype].class}`} style={{ fontSize: '10px' }}>
                                                    {archetypeBadges[p.archetype].label}
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                            Looks: {p.looks}%
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => onStartDating(p)}
                                        className="btn-primary"
                                        style={{ width: '100%', padding: '10px' }}
                                    >
                                        Start Dating
                                    </button>
                                </div>
                            ))}

                            <button onClick={handleRefreshPool} className="btn-secondary" style={{ width: '100%', marginTop: '8px' }}>
                                Look for Others
                            </button>

                            {/* Hookup Options */}
                            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <h3 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--text-muted)' }}>
                                    🔥 HOOKUP OPTIONS (Risky!)
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                                    <button
                                        onClick={() => onHookup('church')}
                                        style={{
                                            padding: '10px',
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            border: '1px solid rgba(239, 68, 68, 0.2)',
                                            borderRadius: '8px',
                                            color: '#f87171',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            fontSize: '11px',
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'
                                        }}
                                    >
                                        <span>Church Sis</span>
                                        <span style={{ fontSize: '9px', opacity: 0.7 }}>⚠️ HIGH risk</span>
                                    </button>
                                    <button
                                        onClick={() => onHookup('random')}
                                        style={{
                                            padding: '10px',
                                            background: 'rgba(245, 158, 11, 0.1)',
                                            border: '1px solid rgba(245, 158, 11, 0.2)',
                                            borderRadius: '8px',
                                            color: '#fbbf24',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            fontSize: '11px',
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'
                                        }}
                                    >
                                        <span>Random</span>
                                        <span style={{ fontSize: '9px', opacity: 0.7 }}>⚠️ MED risk</span>
                                    </button>
                                    <button
                                        onClick={() => onHookup('uni')}
                                        style={{
                                            padding: '10px',
                                            background: 'rgba(16, 185, 129, 0.1)',
                                            border: '1px solid rgba(16, 185, 129, 0.2)',
                                            borderRadius: '8px',
                                            color: '#34d399',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            fontSize: '11px',
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'
                                        }}
                                    >
                                        <span>Uni Babe</span>
                                        <span style={{ fontSize: '9px', opacity: 0.7 }}>⚠️ LOW risk</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Dating - Can Progress or Break Up */}
                    {relationshipStatus === 'Dating' && partner && (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                                <div style={{
                                    width: '60px', height: '60px',
                                    margin: '0 auto 12px',
                                    background: 'rgba(236, 72, 153, 0.15)',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '18px', fontWeight: 700, color: '#ec4899'
                                }}>
                                    {partner.name.substring(0, 2).toUpperCase()}
                                </div>
                                <h3 style={{ margin: 0, fontSize: '18px' }}>{partner.name}</h3>
                                <span className={`badge ${archetypeBadges[partner.archetype].class}`}>
                                    {archetypeBadges[partner.archetype].label}
                                </span>
                                <p style={{ marginTop: '8px', color: 'var(--text-muted)', fontSize: '12px' }}>
                                    Dating for {relationshipWeeks} weeks
                                </p>
                            </div>

                            <button
                                onClick={onPropose}
                                disabled={!canPropose}
                                className="btn-primary"
                                style={{ width: '100%', marginBottom: '10px', opacity: canPropose ? 1 : 0.5 }}
                            >
                                💍 Propose ({canPropose ? 'Ready!' : 'Need 12+ weeks & 20+ fame'})
                            </button>

                            <button
                                onClick={onBreakup}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    color: '#ef4444',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                            >
                                Break Up
                            </button>
                        </>
                    )}

                    {/* Engaged - Can Marry */}
                    {relationshipStatus === 'Engaged' && partner && (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                                <span style={{ fontSize: '40px' }}>💍</span>
                                <h3 style={{ margin: '8px 0', fontSize: '18px' }}>Engaged to {partner.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                                    {relationshipWeeks} weeks together
                                </p>
                            </div>

                            <button
                                onClick={onMarry}
                                disabled={!canMarry}
                                className="btn-primary"
                                style={{ width: '100%', marginBottom: '10px', opacity: canMarry ? 1 : 0.5 }}
                            >
                                👰 Get Married ({canMarry ? 'Ready!' : 'Need 20+ weeks & 30+ members'})
                            </button>

                            <button onClick={onBreakup} style={{
                                width: '100%', padding: '12px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: '8px', cursor: 'pointer', fontWeight: 600
                            }}>
                                Call Off Engagement
                            </button>
                        </>
                    )}

                    {/* Married */}
                    {relationshipStatus === 'Married' && partner && (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                                <span style={{ fontSize: '40px' }}>💒</span>
                                <h3 style={{ margin: '8px 0', fontSize: '18px' }}>Married to {partner.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                                    {relationshipWeeks} weeks of marriage
                                </p>
                                <div style={{ marginTop: '12px', color: 'var(--stat-energy)' }}>
                                    Weekly maintenance: ₦{partner.maintenanceCost.toLocaleString()}
                                </div>
                            </div>

                            <button onClick={onBreakup} style={{
                                width: '100%', padding: '12px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: '8px', cursor: 'pointer', fontWeight: 600
                            }}>
                                💔 Divorce (HUGE Scandal)
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
