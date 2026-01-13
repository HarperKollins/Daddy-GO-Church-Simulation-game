/**
 * SiphonModal Component - Clean BitLife Style
 * 
 * Allows player to transfer money between Church and Personal wallets.
 * Core mechanic: Higher siphon amounts = higher scandal risk.
 */

'use client';

import { useState } from 'react';

interface SiphonModalProps {
    churchCash: number;
    personalCash: number;
    onSiphon: (amount: number, scandalRisk: number) => void;
    onClose: () => void;
}

export default function SiphonModal({
    churchCash,
    personalCash,
    onSiphon,
    onClose
}: SiphonModalProps) {
    const [amount, setAmount] = useState(0);

    // Calculate scandal risk based on percentage of church funds taken
    const maxSiphon = Math.min(churchCash, churchCash * 0.5);
    const siphonPercentage = churchCash > 0 ? (amount / churchCash) * 100 : 0;

    let scandalRisk = 0;
    if (siphonPercentage <= 10) {
        scandalRisk = Math.ceil(siphonPercentage * 0.3);
    } else if (siphonPercentage <= 20) {
        scandalRisk = Math.ceil(3 + (siphonPercentage - 10) * 0.7);
    } else {
        scandalRisk = Math.ceil(10 + (siphonPercentage - 20) * 0.5);
    }

    const formatCash = (value: number): string => {
        if (value >= 1000000) {
            return `₦${(value / 1000000).toFixed(1)}M`;
        }
        if (value >= 1000) {
            return `₦${(value / 1000).toFixed(1)}K`;
        }
        return `₦${value.toLocaleString()}`;
    };

    const handleSiphon = () => {
        if (amount > 0) {
            onSiphon(amount, scandalRisk);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Church Finances</h2>
                </div>

                <div className="modal-body">
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>
                        Transfer funds to your personal wallet
                    </p>

                    {/* Wallet Display */}
                    <div className="wallet-grid">
                        <div className="wallet-card">
                            <div className="wallet-label">Church</div>
                            <div className="wallet-amount" style={{ color: 'var(--stat-spirit)' }}>{formatCash(churchCash)}</div>
                        </div>
                        <div className="wallet-card">
                            <div className="wallet-label">Personal</div>
                            <div className="wallet-amount" style={{ color: 'var(--stat-cash)' }}>{formatCash(personalCash)}</div>
                        </div>
                    </div>

                    {/* Siphon Slider */}
                    {churchCash > 0 ? (
                        <>
                            <div style={{ marginBottom: '12px' }}>
                                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                                    Amount to transfer:
                                </label>
                                <input
                                    type="range"
                                    min={0}
                                    max={maxSiphon}
                                    step={Math.max(100, Math.floor(maxSiphon / 100))}
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                />
                            </div>

                            <div style={{
                                fontSize: '24px',
                                fontWeight: '700',
                                textAlign: 'center',
                                marginBottom: '16px',
                                color: 'var(--primary)'
                            }}>
                                {formatCash(amount)}
                            </div>

                            {/* Scandal Warning */}
                            {scandalRisk > 0 && (
                                <div className="scandal-warning" style={{ marginBottom: '20px' }}>
                                    <span>Scandal Risk: +{scandalRisk}%</span>
                                    {scandalRisk >= 10 && <span> (Risky!)</span>}
                                    {scandalRisk >= 20 && <span> (Very Dangerous!)</span>}
                                </div>
                            )}
                        </>
                    ) : (
                        <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
                            No church funds available to transfer.
                        </p>
                    )}
                </div>

                <div className="modal-footer">
                    <button className="btn-cancel" style={{ flex: 1 }} onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="btn-primary"
                        style={{ flex: 2, opacity: amount <= 0 ? 0.5 : 1 }}
                        onClick={handleSiphon}
                        disabled={amount <= 0}
                    >
                        {amount > 0 ? `Take ${formatCash(amount)}` : 'Select Amount'}
                    </button>
                </div>
            </div>
        </div>
    );
}
