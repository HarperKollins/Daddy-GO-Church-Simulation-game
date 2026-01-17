/**
 * SiphonModal Component
 * Church-to-personal fund transfer with scandal risk meter
 */

'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

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
        if (scandalRisk >= 15) return 'text-danger';
        if (scandalRisk >= 8) return 'text-warning';
        return 'text-success';
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Church Finances">
            <div className="space-y-6">
                <p className="text-xs text-text-secondary text-center">
                    Transfer funds to your personal wallet
                </p>

                {/* Wallet Display */}
                <div className="flex gap-4 items-center justify-center">
                    <Card className="flex-1 text-center p-3 bg-surface border-border-subtle">
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Church</p>
                        <p className="text-lg font-black text-brand">{formatCash(churchCash)}</p>
                    </Card>
                    <div className="flex items-center text-text-muted">
                        →
                    </div>
                    <Card className="flex-1 text-center p-3 bg-surface border-border-subtle">
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Personal</p>
                        <p className="text-lg font-black text-success">{formatCash(personalCash)}</p>
                    </Card>
                </div>

                {/* Siphon Amount */}
                {churchCash > 0 ? (
                    <>
                        <div className="space-y-3">
                            <label className="text-xs text-text-secondary block font-bold">
                                Amount to transfer:
                            </label>
                            <input
                                type="range"
                                min={0}
                                max={maxSiphon}
                                step={Math.max(100, Math.floor(maxSiphon / 100))}
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-brand"
                            />
                        </div>

                        <div className="text-center p-4 bg-surface rounded-xl border border-border-subtle">
                            <p className="text-3xl font-black text-white">{formatCash(amount)}</p>
                        </div>

                        {/* Scandal Risk Meter */}
                        {amount > 0 && (
                            <div className={`flex items-center justify-center gap-2 p-3 rounded-lg border bg-surface ${scandalRisk >= 15 ? 'border-danger/30 bg-danger/5' :
                                    scandalRisk >= 8 ? 'border-warning/30 bg-warning/5' :
                                        'border-success/30 bg-success/5'
                                }`}>
                                <span className="text-lg">⚠️</span>
                                <span className={`text-sm font-bold ${getRiskColor()}`}>
                                    Risk: +{scandalRisk}%
                                    {scandalRisk >= 15 && ' (DANGEROUS)'}
                                    {scandalRisk >= 8 && scandalRisk < 15 && ' (Risky)'}
                                </span>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button variant="secondary" onClick={onClose} className="flex-1">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSiphon}
                                disabled={amount <= 0}
                                className="flex-[2] font-bold"
                                variant={scandalRisk >= 15 ? 'destructive' : 'default'}
                            >
                                {amount > 0 ? `Take ${formatCash(amount)}` : 'Select Amount'}
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="text-4xl grayscale opacity-30 mb-2">💸</div>
                        <p className="text-text-muted">No church funds available.</p>
                    </div>
                )}
            </div>
        </Modal>
    );
}
