/**
 * AssetsModal Component - Nano Banana Gallery View
 * High-saturation Unsplash photos in dark cards.
 */

'use client';

import { useGameStore } from '@/store/useGameStore';
import { getAssetsByCategory } from '@/data/assets';
import type { Asset } from '@/types/game';

// Unsplash keywords mapped to asset types
const ASSET_IMAGES: Record<string, string> = {
    'Toyota Corolla': 'https://images.unsplash.com/photo-1623869675785-654b415b8291?w=800&q=80',
    'Toyota Camry': 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?w=800&q=80',
    'Toyota Highlander': 'https://images.unsplash.com/photo-1518987048-93e29699e79a?w=800&q=80',
    'Lexus RX 350': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    'Toyota Land Cruiser': 'https://images.unsplash.com/photo-1594233466450-d416959a8f75?w=800&q=80',
    'Mercedes S-Class': 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80',
    'Mercedes G-Wagon': 'https://images.unsplash.com/photo-1520031441872-ddb157228d8d?w=800&q=80',
    'Rolls Royce Phantom': 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80',
    'Private Jet (Gulfstream G650)': 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',

    // Properties
    '3-Bedroom Flat (Lagos)': 'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=800&q=80',
    'Duplex in Lekki': 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    'Mansion in Banana Island': 'https://images.unsplash.com/photo-1600596542815-2a4d9f0152ba?w=800&q=80',
    'Estate in Maitama, Abuja': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
};

const formatCash = (n: number) => `₦${n.toLocaleString()}`;

export default function AssetsModal() {
    const assets = useGameStore(state => state.assets);
    const personalCash = useGameStore(state => state.stats.personalCash);
    const addAsset = useGameStore(state => state.addAsset);
    const modifyStat = useGameStore(state => state.modifyStat);

    const vehicles = getAssetsByCategory('vehicle');
    const properties = getAssetsByCategory('property');
    const allDisplayAssets = [...vehicles, ...properties];

    return (
        <div style={{ padding: '16px', paddingBottom: '100px' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <h2 className="text-h1">Luxury Assets</h2>
                <div style={{ textAlign: 'right' }}>
                    <div className="text-label">Liquid Cash</div>
                    <div className="text-value" style={{ color: 'var(--lime-glow)' }}>
                        {formatCash(personalCash)}
                    </div>
                </div>
            </div>

            {/* Assets List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {allDisplayAssets.map((asset) => {
                    // Corrected ownership check for flat Asset[] array
                    const isOwned = assets.some((a: Asset) => a.id === asset.id);
                    const canAfford = personalCash >= asset.cost;
                    const imageUrl = ASSET_IMAGES[asset.name] || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80';

                    return (
                        <div key={asset.id} className="nano-card" style={{ overflow: 'hidden', padding: 0 }}>
                            {/* Image Header */}
                            <div style={{
                                height: '140px',
                                background: `url(${imageUrl}) center/cover no-repeat`,
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(15,23,42,1))'
                                }} />

                                <div style={{
                                    position: 'absolute',
                                    bottom: '12px',
                                    left: '16px'
                                }}>
                                    <div className="text-h2">{asset.name}</div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                                        Maintenance: {formatCash(asset.weeklyMaintenance)}/wk
                                    </div>
                                </div>
                            </div>

                            {/* Action Footer */}
                            <div style={{
                                padding: '12px 16px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div className="text-value" style={{ fontSize: '16px' }}>
                                    {formatCash(asset.cost)}
                                </div>

                                <button
                                    onClick={() => {
                                        if (!isOwned && canAfford) {
                                            modifyStat('personalCash', -asset.cost);
                                            addAsset(asset);
                                        }
                                    }}
                                    disabled={isOwned || !canAfford}
                                    style={{
                                        background: isOwned ? 'rgba(255,255,255,0.1)' : (canAfford ? 'var(--lime-glow)' : 'rgba(255,255,255,0.05)'),
                                        color: isOwned ? 'var(--text-muted)' : (canAfford ? '#000' : 'var(--text-muted)'),
                                        padding: '8px 16px',
                                        borderRadius: '999px',
                                        border: 'none',
                                        fontWeight: 700,
                                        fontSize: '12px',
                                        cursor: isOwned || !canAfford ? 'default' : 'pointer',
                                    }}
                                >
                                    {isOwned ? 'OWNED' : 'BUY NOW'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
