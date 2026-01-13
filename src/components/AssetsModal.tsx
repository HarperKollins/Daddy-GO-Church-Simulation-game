/**
 * Assets Marketplace Modal - Clean BitLife Style
 * 
 * Allows player to buy vehicles, properties, and investments using Personal Cash.
 * Uses text-based icons instead of emojis.
 */

'use client';

import { useState } from 'react';
import { assets } from '@/data/assets';
import type { Asset } from '@/types/game';

interface AssetsModalProps {
    personalCash: number;
    ownedAssets: Asset[];
    onBuy: (asset: Asset) => void;
    onSell: (asset: Asset) => void;
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

type Category = 'vehicle' | 'property' | 'investment';

// Category icons (text-based)
const categoryIcons: Record<Category, { icon: string; color: string }> = {
    vehicle: { icon: 'CAR', color: '#3b82f6' },
    property: { icon: 'HOM', color: '#10b981' },
    investment: { icon: 'INV', color: '#a855f7' },
};

export default function AssetsModal({
    personalCash,
    ownedAssets,
    onBuy,
    onSell,
    onClose,
}: AssetsModalProps) {
    const [activeTab, setActiveTab] = useState<Category>('vehicle');

    const filteredAssets = assets.filter(a => a.category === activeTab);

    const isOwned = (assetId: string) => ownedAssets.some(a => a.id === assetId);

    const getSellPrice = (asset: Asset) => {
        if (asset.category === 'investment') return asset.cost;
        return Math.floor(asset.cost * 0.7);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '460px' }}>
                <div className="modal-header">
                    <h2>Assets Market</h2>
                    <div style={{ fontSize: '13px', color: 'var(--stat-cash)', fontWeight: '600' }}>
                        {formatCash(personalCash)}
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="tab-container" style={{ margin: '0 16px 16px' }}>
                    {(['vehicle', 'property', 'investment'] as Category[]).map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`tab-button ${activeTab === cat ? 'active' : ''}`}
                            style={{ textTransform: 'capitalize' }}
                        >
                            {cat}s
                        </button>
                    ))}
                </div>

                <div className="modal-body">
                    {filteredAssets.map(asset => {
                        const owned = isOwned(asset.id);
                        const catInfo = categoryIcons[asset.category as Category];

                        return (
                            <div
                                key={asset.id}
                                className="list-item"
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'stretch',
                                    gap: '12px',
                                    background: owned && asset.category !== 'investment'
                                        ? 'rgba(16, 185, 129, 0.1)'
                                        : 'var(--bg-input)',
                                    border: owned && asset.category !== 'investment'
                                        ? '1px solid rgba(16, 185, 129, 0.3)'
                                        : 'none'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div className="list-item-icon" style={{
                                            background: `${catInfo.color}20`,
                                            color: catInfo.color,
                                            fontSize: '10px'
                                        }}>
                                            {catInfo.icon}
                                        </div>
                                        <div>
                                            <div className="list-item-title">{asset.name}</div>
                                            <div className="list-item-subtitle">
                                                {asset.category === 'investment'
                                                    ? `Volatility: ${asset.volatility}%`
                                                    : `Maint: ${formatCash(asset.weeklyMaintenance)}/wk`}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: '700', color: 'var(--stat-cash)' }}>
                                            {formatCash(asset.cost)}
                                        </div>
                                        {asset.fameBonus > 0 && (
                                            <div style={{ fontSize: '11px', color: 'var(--stat-fame)' }}>+{asset.fameBonus} Fame</div>
                                        )}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {owned && asset.category !== 'investment' ? (
                                        <button
                                            onClick={() => onSell(ownedAssets.find(a => a.id === asset.id)!)}
                                            style={{
                                                flex: 1,
                                                padding: '10px',
                                                background: 'rgba(239, 68, 68, 0.1)',
                                                color: 'var(--accent-danger)',
                                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontWeight: '500',
                                                fontSize: '13px'
                                            }}
                                        >
                                            Sell for {formatCash(getSellPrice(asset))}
                                        </button>
                                    ) : (
                                        <button
                                            disabled={personalCash < asset.cost}
                                            onClick={() => onBuy(asset)}
                                            className="btn-primary"
                                            style={{
                                                flex: 1,
                                                padding: '10px',
                                                opacity: personalCash >= asset.cost ? 1 : 0.5
                                            }}
                                        >
                                            Buy Now
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Portfolio Section for Investments */}
                    {activeTab === 'investment' && ownedAssets.filter(a => a.category === 'investment').length > 0 && (
                        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-muted)' }}>
                                YOUR PORTFOLIO
                            </h3>
                            {ownedAssets.filter(a => a.category === 'investment').map((inv, idx) => (
                                <div key={`${inv.id}-${idx}`} className="list-item" style={{ padding: '12px' }}>
                                    <div className="list-item-content">
                                        <div className="list-item-title">{inv.name}</div>
                                        <div className="list-item-subtitle">Value: {formatCash(inv.cost)}</div>
                                    </div>
                                    <button
                                        onClick={() => onSell(inv)}
                                        style={{
                                            padding: '6px 14px',
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            color: 'var(--accent-danger)',
                                            border: '1px solid rgba(239, 68, 68, 0.2)',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            fontWeight: '500'
                                        }}
                                    >
                                        Sell
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button className="btn-cancel" style={{ width: '100%' }} onClick={onClose}>
                        Close Market
                    </button>
                </div>
            </div>
        </div>
    );
}
