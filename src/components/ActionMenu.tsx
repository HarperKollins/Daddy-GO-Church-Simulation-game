'use client';

/**
 * Expanded Action Menu Component
 * 
 * Categories:
 * - Ministry: Hold service, pray, fast, crusade
 * - Social: Visit family, network, date
 * - Finance: Invest, loan, gamble
 * - Health: Hospital, gym, rest
 * - Media: YouTube, Instagram, controversy
 * - Secret: Unlockable dark actions
 */

import React, { useState } from 'react';
import CryptoDashboard from './dashboards/CryptoDashboard';
import TestimonyManager from './dashboards/TestimonyManager';
import SpiritualWarfareModal from './dashboards/SpiritualWarfareModal';
import ThreeDEmoji from './ThreeDEmoji';

interface ActionMenuProps {
    energy: number;
    stats: {
        personalCash: number;
        churchCash: number;
        fame: number;
        anointing: number;
        influence: number;
    };
    unlockedPaths: {
        yahoo: boolean;
        politics: boolean;
        embezzlement: boolean;
    };
    onAction: (action: ActionData) => void;
    onClose: () => void;
}

interface ActionData {
    id: string;
    category: string;
    energyCost: number;
    effects: Record<string, number>;
}

interface ActionItem {
    id: string;
    name: string;
    icon: string; // 3D icon keyword
    fallback: string; // 2D backup
    description: string;
    energyCost: number;
    effects: Record<string, number>;
    requirements?: {
        stat?: string;
        value?: number;
        unlocked?: string;
    };
}

const ACTION_CATEGORIES: Record<string, ActionItem[]> = {
    '⛪ Ministry': [
        {
            id: 'hold_service',
            name: 'Hold Service',
            icon: 'hold_service',
            fallback: '🙏',
            description: 'Weekly service. +Members, +Offerings',
            energyCost: 300,
            effects: { members: 10, churchCash: 50000, anointing: -50 },
        },
        {
            id: 'pray_hours',
            name: 'Prayer Marathon',
            icon: 'pray',
            fallback: '⚡',
            description: '3 hours of intense prayer',
            energyCost: 400,
            effects: { anointing: 300, health: -100 },
        },
        {
            id: 'fast_3days',
            name: 'Fast for 3 Days',
            icon: 'fast',
            fallback: '🍽️',
            description: 'Deny flesh, gain spirit',
            energyCost: 500,
            effects: { anointing: 500, health: -300, stress: -200 },
        },
        {
            id: 'night_vigil',
            name: 'Night Vigil',
            icon: 'vigil',
            fallback: '🌙',
            description: 'All-night prayer session',
            energyCost: 600,
            effects: { anointing: 400, fame: 100, health: -200 },
        },
        {
            id: 'crusade',
            name: 'Hold Crusade',
            icon: 'crusade',
            fallback: '🔥',
            description: 'Major evangelism event',
            energyCost: 700,
            effects: { members: 100, fame: 500, churchCash: -500000 },
            requirements: { stat: 'churchCash', value: 500000 },
        },
        {
            id: 'deliverance',
            name: 'Deliverance Session',
            icon: 'deliverance',
            fallback: '👹',
            description: 'Cast out demons (or try to)',
            energyCost: 400,
            effects: { anointing: 200, fame: 300, scandal: 100 },
            requirements: { stat: 'anointing', value: 3000 },
        },
        {
            id: 'manage_testimonies',
            name: 'Testimony Dept',
            icon: 'testimony',
            fallback: '📢',
            description: 'Manage church testimonies',
            energyCost: 0,
            effects: {},
        },
        {
            id: 'spiritual_warfare',
            name: 'Warfare Room',
            icon: 'warfare',
            fallback: '⚔️',
            description: 'Fight principalities & powers',
            energyCost: 0,
            effects: {},
        },
    ],
    '👥 Social': [
        {
            id: 'visit_family',
            name: 'Visit Family',
            icon: 'family',
            fallback: '🏠',
            description: 'Check on relatives',
            energyCost: 200,
            effects: { stress: -300, health: 200 },
        },
        {
            id: 'network_pastors',
            name: 'Network with Pastors',
            icon: 'network',
            fallback: '🤝',
            description: 'Build ministry connections',
            energyCost: 300,
            effects: { influence: 200, fame: 100 },
        },
        {
            id: 'media_interview',
            name: 'Media Interview',
            icon: 'media',
            fallback: '🎤',
            description: 'Speak to press',
            energyCost: 250,
            effects: { fame: 400, scandal: 50 },
            requirements: { stat: 'fame', value: 2000 },
        },
        {
            id: 'hookup',
            name: 'Secret Meeting',
            icon: 'hookup',
            fallback: '🌹',
            description: '...no comment',
            energyCost: 200,
            effects: { health: -100, stress: -400, scandal: 300 },
        },
    ],
    '💰 Finance': [
        {
            id: 'manage_crypto',
            name: 'Crypto Exchange',
            icon: 'crypto',
            fallback: '🚀',
            description: 'Trade heavenly tokens',
            energyCost: 0,
            effects: {},
        },
        {
            id: 'sow_seed',
            name: 'Sow Seed',
            icon: 'seed',
            fallback: '🌱',
            description: 'Give to receive (supposedly)',
            energyCost: 100,
            effects: { personalCash: -100000, anointing: 100 },
        },
        {
            id: 'invest_stocks',
            name: 'Invest in Stocks',
            icon: 'invest',
            fallback: '📈',
            description: 'Try the market',
            energyCost: 100,
            effects: { personalCash: 50000 }, // Random outcomes handled separately
            requirements: { stat: 'personalCash', value: 500000 },
        },
        {
            id: 'buy_land',
            name: 'Buy Land',
            icon: 'land',
            fallback: '🏗️',
            description: 'Real estate investment',
            energyCost: 150,
            effects: { personalCash: -5000000, fame: 200 },
            requirements: { stat: 'personalCash', value: 5000000 },
        },
        {
            id: 'take_loan',
            name: 'Take Bank Loan',
            icon: 'bank',
            fallback: '🏦',
            description: 'Borrow for ministry',
            energyCost: 100,
            effects: { churchCash: 5000000, stress: 300 },
        },
    ],
    '❤️ Health': [
        {
            id: 'hospital',
            name: 'Visit Hospital',
            icon: 'hospital',
            fallback: '🏥',
            description: 'Get a checkup',
            energyCost: 150,
            effects: { personalCash: -50000, health: 500 },
        },
        {
            id: 'gym',
            name: 'Hit the Gym',
            icon: 'gym',
            fallback: '💪',
            description: 'Stay fit for ministry',
            energyCost: 200,
            effects: { health: 300, stress: -200 },
        },
        {
            id: 'rest',
            name: 'Take a Rest Day',
            icon: 'rest',
            fallback: '😴',
            description: 'Your body needs it',
            energyCost: 0,
            effects: { health: 200, stress: -400, energy: 300 },
        },
        {
            id: 'eat_mama',
            name: "Eat Mama's Food",
            icon: 'food',
            fallback: '🍲',
            description: 'Nothing like home cooking',
            energyCost: 100,
            effects: { health: 800, stress: -500 },
        },
    ],
    '📱 Media': [
        {
            id: 'youtube_upload',
            name: 'Upload to YouTube',
            icon: 'youtube',
            fallback: '▶️',
            description: 'Share sermon online',
            energyCost: 200,
            effects: { fame: 200 },
        },
        {
            id: 'go_live',
            name: 'Instagram Live',
            icon: 'live',
            fallback: '📺',
            description: 'Direct to audience',
            energyCost: 250,
            effects: { fame: 300, scandal: 50 },
        },
        {
            id: 'controversy',
            name: 'Say Something Controversial',
            icon: 'controversy',
            fallback: '🔥',
            description: 'Any publicity is good publicity?',
            energyCost: 100,
            effects: { fame: 500, scandal: 300, stress: 200 },
        },
        {
            id: 'collab',
            name: 'Collaborate with Influencer',
            icon: 'collab',
            fallback: '🤳',
            description: 'Cross-promotion',
            energyCost: 300,
            effects: { fame: 600, personalCash: -200000 },
            requirements: { stat: 'fame', value: 3000 },
        },
    ],
    '🔒 Secret': [
        {
            id: 'siphon',
            name: 'Siphon Church Funds',
            icon: 'siphon',
            fallback: '💸',
            description: 'Take from the offering...',
            energyCost: 50,
            effects: { churchCash: -500000, personalCash: 500000, scandal: 200 },
            requirements: { unlocked: 'embezzlement' },
        },
        {
            id: 'politician_deal',
            name: 'Political Deal',
            icon: 'politics',
            fallback: '🏛️',
            description: 'Make a deal with power',
            energyCost: 200,
            effects: { influence: 1000, scandal: 300, personalCash: 10000000 },
            requirements: { unlocked: 'politics' },
        },
        {
            id: 'yahoo_bless',
            name: 'Bless Yahoo Boys',
            icon: 'yahoo',
            fallback: '💻',
            description: 'Pray for their success...',
            energyCost: 100,
            effects: { personalCash: 2000000, anointing: -500, scandal: 400 },
            requirements: { unlocked: 'yahoo' },
        },
    ],
};

export default function ActionMenu({
    energy,
    stats,
    unlockedPaths,
    onAction,
    onClose,
}: ActionMenuProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('⛪ Ministry');

    // UI States for Sub-Modals
    const [showCrypto, setShowCrypto] = useState(false);
    const [showTestimony, setShowTestimony] = useState(false);
    const [showWarfare, setShowWarfare] = useState(false);

    const canAfford = (action: ActionItem): boolean => {
        if (action.energyCost > energy) return false;
        if (action.requirements) {
            if (action.requirements.stat) {
                const statValue = stats[action.requirements.stat as keyof typeof stats] || 0;
                if (statValue < (action.requirements.value || 0)) return false;
            }
            if (action.requirements.unlocked) {
                if (!unlockedPaths[action.requirements.unlocked as keyof typeof unlockedPaths]) {
                    return false;
                }
            }
        }
        return true;
    };

    const handleAction = (action: ActionItem) => {
        if (!canAfford(action)) return;

        // Custom UI Handlers
        if (action.id === 'manage_crypto') {
            setShowCrypto(true);
            return;
        }
        if (action.id === 'manage_testimonies') {
            setShowTestimony(true);
            return;
        }
        if (action.id === 'spiritual_warfare') {
            setShowWarfare(true);
            return;
        }

        onAction({
            id: action.id,
            category: selectedCategory,
            energyCost: action.energyCost,
            effects: action.effects,
        });
    };

    if (showCrypto) return <CryptoDashboard onClose={() => setShowCrypto(false)} />;
    if (showTestimony) return <TestimonyManager onClose={() => setShowTestimony(false)} />;
    if (showWarfare) return <SpiritualWarfareModal onClose={() => setShowWarfare(false)} />;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-end justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-t-3xl w-full max-w-lg max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">Actions</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-400">⚡ {energy}/1000</span>
                        <button
                            onClick={onClose}
                            className="text-white/60 hover:text-white text-2xl"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex overflow-x-auto p-2 gap-2 border-b border-white/10">
                    {Object.keys(ACTION_CATEGORIES).map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition ${selectedCategory === category
                                ? 'bg-yellow-500 text-black'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Actions List */}
                <div className="p-4 space-y-3 overflow-y-auto max-h-[50vh]">
                    {ACTION_CATEGORIES[selectedCategory]?.map(action => {
                        const affordable = canAfford(action);
                        return (
                            <button
                                key={action.id}
                                onClick={() => handleAction(action)}
                                disabled={!affordable}
                                className={`w-full p-4 rounded-xl text-left transition ${affordable
                                    ? 'bg-white/10 hover:bg-white/20'
                                    : 'bg-white/5 opacity-50 cursor-not-allowed'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <ThreeDEmoji icon={action.icon} fallback={action.fallback} size={40} animate={affordable} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-white">{action.name}</span>
                                            <span className="text-yellow-400 text-sm">
                                                ⚡{action.energyCost}
                                            </span>
                                        </div>
                                        <div className="text-sm text-white/60 mt-1">
                                            {action.description}
                                        </div>
                                        {action.requirements && !affordable && (
                                            <div className="text-xs text-red-400 mt-1">
                                                {action.requirements.stat &&
                                                    `Requires ${action.requirements.value?.toLocaleString()} ${action.requirements.stat}`}
                                                {action.requirements.unlocked &&
                                                    `Requires unlocking ${action.requirements.unlocked} path`}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
