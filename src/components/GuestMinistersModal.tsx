/**
 * Guest Ministers Modal - Clean BitLife Style
 * 
 * Allows player to browse and book guest ministers.
 * Uses text badges instead of emoji archetypes.
 */

'use client';

import { useState } from 'react';
import type { GuestMinister, VenueTier } from '@/types/game';
import { getAvailableMinisters, rollMinisterScandal } from '@/data/guestMinisters';

interface GuestMinistersModalProps {
    currentVenue: VenueTier;
    churchCash: number;
    onBook: (minister: GuestMinister, scandalEvent: string | null) => void;
    onClose: () => void;
}

const formatCash = (amount: number): string => {
    if (amount >= 1000000) {
        return `₦${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
        return `₦${(amount / 1000).toFixed(0)}K`;
    }
    return `₦${amount.toLocaleString()}`;
};

// Archetype badges with colors
const archetypeBadges: Record<GuestMinister['archetype'], { label: string; class: string }> = {
    'FIRE_BRAND': { label: 'Fire Brand', class: 'badge-fire' },
    'PROSPERITY': { label: 'Prosperity', class: 'badge-prosperity' },
    'DELIVERANCE': { label: 'Deliverance', class: 'badge-deliverance' },
    'MOTIVATIONAL': { label: 'Motivational', class: 'badge-motivational' },
    'CONTROVERSIAL': { label: 'Controversial', class: 'badge-controversial' },
};

export default function GuestMinistersModal({
    currentVenue,
    churchCash,
    onBook,
    onClose,
}: GuestMinistersModalProps) {
    const [selectedMinister, setSelectedMinister] = useState<GuestMinister | null>(null);

    const availableMinisters = getAvailableMinisters(currentVenue);

    const handleBook = (minister: GuestMinister) => {
        const scandalEvent = rollMinisterScandal(minister);
        onBook(minister, scandalEvent);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Guest Ministers</h2>
                </div>

                <div className="modal-body">
                    {selectedMinister ? (
                        // Minister detail view
                        <div>
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    margin: '0 auto 12px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '18px',
                                    fontWeight: '700'
                                }}>
                                    {selectedMinister.name.substring(0, 2).toUpperCase()}
                                </div>
                                <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '600' }}>
                                    {selectedMinister.name}
                                </h3>
                                <span className={`badge ${archetypeBadges[selectedMinister.archetype].class}`}>
                                    {archetypeBadges[selectedMinister.archetype].label}
                                </span>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '10px',
                                marginBottom: '20px'
                            }}>
                                <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Fee</div>
                                    <div style={{ fontWeight: '700', color: 'var(--stat-cash)' }}>{formatCash(selectedMinister.costToBook)}</div>
                                </div>
                                <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Fame</div>
                                    <div style={{ fontWeight: '700', color: 'var(--stat-fame)' }}>+{selectedMinister.fameBoost}%</div>
                                </div>
                                <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Members</div>
                                    <div style={{ fontWeight: '700', color: 'var(--accent-success)' }}>
                                        +{selectedMinister.effects.find(e => e.type === 'members')?.value || 0}
                                    </div>
                                </div>
                                <div style={{
                                    background: selectedMinister.scandalRisk > 15 ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-input)',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Risk</div>
                                    <div style={{ fontWeight: '700', color: selectedMinister.scandalRisk > 15 ? 'var(--accent-danger)' : 'var(--text-secondary)' }}>
                                        {selectedMinister.scandalRisk}%
                                    </div>
                                </div>
                            </div>

                            {selectedMinister.scandalRisk >= 20 && (
                                <div className="scandal-warning" style={{ marginBottom: '20px' }}>
                                    High risk of viral scandal!
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className="btn-cancel" style={{ flex: 1 }} onClick={() => setSelectedMinister(null)}>
                                    Back
                                </button>
                                <button
                                    className="btn-primary"
                                    style={{ flex: 2, opacity: churchCash >= selectedMinister.costToBook ? 1 : 0.5 }}
                                    onClick={() => handleBook(selectedMinister)}
                                    disabled={churchCash < selectedMinister.costToBook}
                                >
                                    {churchCash >= selectedMinister.costToBook
                                        ? `Book for ${formatCash(selectedMinister.costToBook)}`
                                        : 'Not enough funds'
                                    }
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Minister list view
                        <div>
                            {availableMinisters.length === 0 ? (
                                <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
                                    Upgrade your venue to attract guest ministers.
                                </p>
                            ) : (
                                availableMinisters.map((minister) => (
                                    <div
                                        key={minister.id}
                                        className="list-item"
                                        onClick={() => setSelectedMinister(minister)}
                                    >
                                        <div className="list-item-icon">
                                            {minister.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className="list-item-content">
                                            <div className="list-item-title">{minister.name}</div>
                                            <div className="list-item-subtitle">
                                                {archetypeBadges[minister.archetype].label} • {formatCash(minister.costToBook)}
                                            </div>
                                        </div>
                                        <span className="list-item-arrow">›</span>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {!selectedMinister && (
                    <div className="modal-footer">
                        <button className="btn-cancel" style={{ width: '100%' }} onClick={onClose}>
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
