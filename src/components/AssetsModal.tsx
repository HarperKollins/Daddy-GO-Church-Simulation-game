/**
 * AssetsModal Component - Nano Banana Gallery View
 * High-saturation Unsplash photos in dark cards.
 */

'use client';

import { useGameStore } from '@/store/useGameStore';
import { getAssetsByCategory } from '@/data/assets';
import type { Asset, GameEra } from '@/types/game';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/formatters';

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
    'Private Jet (Challenger)': 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',

    // Properties
    '3-Bedroom Flat (Lagos)': 'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=800&q=80',
    'Duplex in Lekki': 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    'Mansion in Banana Island': 'https://images.unsplash.com/photo-1600596542815-2a4d9f0152ba?w=800&q=80',
    'Estate in Maitama, Abuja': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    'Half Plot in Lekki': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    'Mansion in Asokoro': 'https://images.unsplash.com/photo-1600596542815-2a4d9f0152ba?w=800&q=80',

    // Ultimate
    'The Space Ark': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    'Atmospheric Controller': 'https://images.unsplash.com/photo-1590907047706-ee9c08cf3189?w=800&q=80',
    'Sovereign Island Nation': 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80',
    'Spirit Realm Gateway': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80',

    // University
    'Used Dell Laptop': 'https://images.unsplash.com/photo-1531297461136-82lw4241?w=800&q=80',
    'Small Hostel Fridge': 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80',
    'Theology Textbooks': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80',
};

const ERA_ORDER: GameEra[] = ['University', 'City', 'Empire', 'Ultimate'];

const checkEraRequirement = (current: GameEra, required?: GameEra): boolean => {
    if (!required) return true;
    const currentIdx = ERA_ORDER.indexOf(current);
    const requiredIdx = ERA_ORDER.indexOf(required);
    return currentIdx >= requiredIdx;
};

export default function AssetsModal() {
    const assets = useGameStore(state => state.assets);
    const personalCash = useGameStore(state => state.stats.personalCash);
    const addAsset = useGameStore(state => state.addAsset);
    const modifyStat = useGameStore(state => state.modifyStat);
    const currentEra = useGameStore(state => state.currentEra);

    const vehicles = getAssetsByCategory('vehicle');
    const properties = getAssetsByCategory('property');
    const investments = getAssetsByCategory('investment');
    const allDisplayAssets = [...vehicles, ...properties, ...investments];

    return (
        <div className="px-4 pb-24">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pt-2">
                <h2 className="text-xl font-black text-text-primary uppercase tracking-tight">Luxury Assets</h2>
                <div className="text-right">
                    <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Liquid Cash</div>
                    <div className="text-lg font-black text-success">
                        {formatCurrency(personalCash)}
                    </div>
                </div>
            </div>

            {/* Assets List */}
            <div className="space-y-4">
                {allDisplayAssets.map((asset) => {
                    const isOwned = assets.some((a: Asset) => a.id === asset.id);
                    const isEraUnlocked = checkEraRequirement(currentEra, asset.unlockEra);
                    const canAfford = personalCash >= asset.cost;
                    const imageUrl = ASSET_IMAGES[asset.name] || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80';

                    return (
                        <Card key={asset.id} className={`overflow-hidden border-border-subtle p-0 group ${!isEraUnlocked ? 'opacity-60 grayscale' : ''}`}>
                            {/* Image Header */}
                            <div className="h-36 relative bg-gray-900">
                                <img
                                    src={imageUrl}
                                    alt={asset.name}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                                {!isEraUnlocked && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                                        <Badge variant="outline" className="border-white/20 text-white bg-black/50 px-3 py-1 uppercase tracking-widest font-bold">
                                            LOCKED: {asset.unlockEra?.toUpperCase()} ERA
                                        </Badge>
                                    </div>
                                )}

                                <div className="absolute bottom-3 left-4 right-4">
                                    <h3 className="text-lg font-bold text-white mb-0.5">{asset.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="backdrop-blur-md bg-white/10 border-white/10 text-white text-[10px] h-5">
                                            {formatCurrency(asset.weeklyMaintenance)}/wk
                                        </Badge>
                                        {asset.fameBonus > 0 && (
                                            <Badge variant="secondary" className="backdrop-blur-md bg-brand/20 border-brand/20 text-brand-foreground text-[10px] h-5">
                                                +{asset.fameBonus} Fame
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Action Footer */}
                            <div className="p-4 flex justify-between items-center bg-surface">
                                <div className="text-base font-bold text-text-primary">
                                    {formatCurrency(asset.cost)}
                                </div>

                                <Button
                                    onClick={() => {
                                        if (!isOwned && canAfford && isEraUnlocked) {
                                            modifyStat('personalCash', -asset.cost);
                                            addAsset(asset);
                                        }
                                    }}
                                    disabled={isOwned || !canAfford || !isEraUnlocked}
                                    variant={isOwned ? "secondary" : canAfford && isEraUnlocked ? "default" : "secondary"}
                                    size="sm"
                                    className={`font-bold min-w-[100px] ${(!isOwned && (!canAfford || !isEraUnlocked)) ? 'opacity-50' : ''}`}
                                >
                                    {isOwned ? 'OWNED' : isEraUnlocked ? 'BUY NOW' : 'LOCKED'}
                                </Button>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
