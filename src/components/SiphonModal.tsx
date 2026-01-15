/**
 * SiphonModal Component - Premium BitLife Style
 * 
 * Church-to-personal fund transfer with scandal risk meter
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
        if (value >= 1e9) return `₦${(value / 1e9).toFixed(1)}B`;
        if (value >= 1e6) return `₦${(value / 1e6).toFixed(1)}M`;
        if (value >= 1e3) return `₦${(value / 1e3).toFixed(0)}K`;
        return `₦${value.toLocaleString()}`;
    };

    const handleSiphon = () => {
        if (amount > 0) {
            onSiphon(amount, scandalRisk);
        }
    };

    // Determine risk level color
    const getRiskColor = () => {
        if (scandalRisk >= 15) return '#dc2626';
        if (scandalRisk >= 8) return '#f59e0b';
        return '#22c55e';
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-sheet animate-slide-up"
                onClick={e => e.stopPropagation()}
                style={{ maxHeight: '90vh', overflowY: 'auto' }}
            >
                {/* Handle */}
                <div className="modal-handle">
                    <div className="modal-handle-bar" />
                </div>

                {/* Header */}
                <div className="top-nav border-none">
                    <div className="top-nav-inner">
                        <button className="top-nav-btn" onClick={onClose}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        <h2 className="top-nav-title">Church Finances</h2>
                        <div className="w-10" />
                    </div>
                </div>

                <div className="px-4 pb-8">
                    <p className="text-sm text-gray-500 text-center mb-6">
                        Transfer funds to your personal wallet
                    </p>

                    {/* Wallet Display */}
                    <div className="flex gap-3 mb-6">
                        <div className="dashboard-card flex-1 text-center">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Church</p>
                            <p className="text-lg font-black text-purple-600">{formatCash(churchCash)}</p>
                        </div>
                        <div className="flex items-center">
                            <span className="material-symbols-outlined text-gray-300">arrow_forward</span>
                        </div>
                        <div className="dashboard-card flex-1 text-center">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Personal</p>
                            <p className="text-lg font-black text-green-600">{formatCash(personalCash)}</p>
                        </div>
                    </div>

                    {/* Siphon Amount */}
                    {churchCash > 0 ? (
                        <>
                            <div className="mb-6">
                                <label className="text-xs text-gray-500 block mb-3">
                                    Amount to transfer:
                                </label>
                                <input
                                    type="range"
                                    min={0}
                                    max={maxSiphon}
                                    step={Math.max(100, Math.floor(maxSiphon / 100))}
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    style={{
                                        width: '100%',
                                        height: '8px',
                                        borderRadius: '4px',
                                        appearance: 'none',
                                        background: `linear-gradient(to right, var(--primary) ${(amount / maxSiphon) * 100}%, #e5e7eb ${(amount / maxSiphon) * 100}%)`,
                                    }}
                                />
                            </div>

                            <div className="text-center mb-6">
                                <p className="text-3xl font-black text-green-600">{formatCash(amount)}</p>
                            </div>

                            {/* Scandal Risk Meter */}
                            {amount > 0 && (
                                <div
                                    className="alert-banner"
                                    style={{
                                        background: `${getRiskColor()}15`,
                                        borderColor: `${getRiskColor()}30`,
                                        color: getRiskColor(),
                                        marginBottom: '20px',
                                    }}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>warning</span>
                                    <span>
                                        Scandal Risk: +{scandalRisk}%
                                        {scandalRisk >= 15 && ' (VERY DANGEROUS!)'}
                                        {scandalRisk >= 8 && scandalRisk < 15 && ' (Risky!)'}
                                    </span>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSiphon}
                                    disabled={amount <= 0}
                                    className="asset-buy-btn flex-2"
                                    style={{
                                        opacity: amount > 0 ? 1 : 0.5,
                                        flex: 2,
                                    }}
                                >
                                    {amount > 0 ? `Take ${formatCash(amount)}` : 'Select Amount'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <span className="material-symbols-outlined text-4xl text-gray-300 mb-3">account_balance_wallet</span>
                            <p className="text-gray-500">No church funds available to transfer.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
