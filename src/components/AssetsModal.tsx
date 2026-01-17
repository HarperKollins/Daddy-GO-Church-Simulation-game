/**
 * AssetsModal Component - Nano Banana Gallery View
 * High-saturation Unsplash photos in dark cards.
 */

'use client';

import { useGameStore } from '@/store/useGameStore';
import { getAssetsByCategory } from '@/data/assets';
import type { Asset } from '@/types/game';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

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
        <div className="px-4 pb-24">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pt-2">
                <h2 className="text-xl font-black text-text-primary uppercase tracking-tight">Luxury Assets</h2>
                <div className="text-right">
                    <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Liquid Cash</div>
                    <div className="text-lg font-black text-success">
                        {formatCash(personalCash)}
                    </div>
                </div>
            </div>

            {/* Assets List */}
            <div className="space-y-4">
                {allDisplayAssets.map((asset) => {
                    const isOwned = assets.some((a: Asset) => a.id === asset.id);
                    const canAfford = personalCash >= asset.cost;
                    const imageUrl = ASSET_IMAGES[asset.name] || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80';

                    return (
                        <Card key={asset.id} className="overflow-hidden border-border-subtle p-0 group">
                            {/* Image Header */}
                            <div className="h-36 relative bg-gray-900">
                                <img
                                    src={imageUrl}
                                    alt={asset.name}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                                <div className="absolute bottom-3 left-4 right-4">
                                    <h3 className="text-lg font-bold text-white mb-0.5">{asset.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="backdrop-blur-md bg-white/10 border-white/10 text-white text-[10px] h-5">
                                            {formatCash(asset.weeklyMaintenance)}/wk
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Action Footer */}
                            <div className="p-4 flex justify-between items-center bg-surface">
                                <div className="text-base font-bold text-text-primary">
                                    {formatCash(asset.cost)}
                                </div>

                                <Button
                                    onClick={() => {
                                        if (!isOwned && canAfford) {
                                            modifyStat('personalCash', -asset.cost);
                                            addAsset(asset);
                                        }
                                    }}
                                    disabled={isOwned || !canAfford}
                                    variant={isOwned ? "secondary" : canAfford ? "default" : "secondary"}
                                    size="sm"
                                    className={`font-bold min-w-[100px] ${!isOwned && !canAfford ? 'opacity-50' : ''
                                        }`}
                                >
                                    {isOwned ? 'OWNED' : 'BUY NOW'}
                                </Button>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
