'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { createAudioManager } from '@/engine/audioManager';
import { CRYPTO_ASSETS } from '@/engine/economyEngine';
import type { CryptoAsset } from '@/types/game';

interface CryptoDashboardProps {
    onClose: () => void;
}

export default function CryptoDashboard({ onClose }: CryptoDashboardProps) {
    const { engine, stats, modifyStat } = useGameStore();
    const [audioManager] = useState(() => createAudioManager());
    const [selectedAsset, setSelectedAsset] = useState<CryptoAsset | null>(null);
    const [transactionAmount, setTransactionAmount] = useState<string>('');

    // Access state safely
    const portfolio = engine.economy?.portfolio || { holdings: [], totalInvested: 0, realizedGains: 0, unrealizedGains: 0 };
    const marketAssets = engine.economy?.cryptoAssets || CRYPTO_ASSETS;
    const cash = stats.personalCash;

    const getHolding = (assetId: string) => {
        return portfolio.holdings.find(h => h.assetId === assetId);
    };

    const handleBuy = () => {
        if (!selectedAsset) return;
        const amount = parseFloat(transactionAmount);
        if (isNaN(amount) || amount <= 0) return;

        const cost = amount * selectedAsset.priceNGN;
        if (cost > cash) {
            audioManager.playEffect('UI_ERROR');
            return;
        }

        // Deduct cash
        modifyStat('personalCash', -cost);

        // Add to holding (Note: Real store logic should handle this, simplified here for UI proto)
        // In a real implementation, we'd call a specific store action 'buyCrypto(assetId, amount)'
        // For now, we simulate success sound
        audioManager.playEffect('UI_COIN');
        setTransactionAmount('');

        // TODO: Create store action for this
        console.log(`Bought ${amount} of ${selectedAsset.symbol}`);
    };

    const handleSell = () => {
        if (!selectedAsset) return;
        const amount = parseFloat(transactionAmount);
        if (isNaN(amount) || amount <= 0) return;

        const holding = getHolding(selectedAsset.id);
        if (!holding || holding.amount < amount) {
            audioManager.playEffect('UI_ERROR');
            return;
        }

        const value = amount * selectedAsset.priceNGN;

        // Add cash
        modifyStat('personalCash', value);
        audioManager.playEffect('UI_COIN');
        setTransactionAmount('');

        // TODO: Create store action for this
        console.log(`Sold ${amount} of ${selectedAsset.symbol}`);
    };

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col">
                {/* Header */}
                <div className="bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700">
                    <div>
                        <h2 className="text-xl font-bold text-yellow-500 flex items-center gap-2">
                            🚀 Heavenly Finance Crypto Exchange
                        </h2>
                        <p className="text-gray-400 text-sm">"The wealth of the wicked is laid up for the just"</p>
                    </div>
                    <button
                        onClick={() => {
                            audioManager.playEffect('UI_CLICK');
                            onClose();
                        }}
                        className="p-2 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar - Asset List */}
                    <div className="w-1/3 bg-gray-800/50 border-r border-gray-700 overflow-y-auto p-2">
                        {marketAssets.map(asset => {
                            const holding = getHolding(asset.id);
                            const percentChange = (Math.random() * 20) - 10; // Simulated 24h change
                            const isPositive = percentChange >= 0;

                            return (
                                <div
                                    key={asset.id}
                                    onClick={() => {
                                        audioManager.playEffect('UI_CLICK');
                                        setSelectedAsset(asset);
                                    }}
                                    className={`p-3 rounded-xl cursor-pointer mb-2 transition border ${selectedAsset?.id === asset.id
                                            ? 'bg-yellow-500/10 border-yellow-500'
                                            : 'bg-gray-800 border-transparent hover:bg-gray-700'
                                        }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="font-bold text-white">{asset.symbol}</span>
                                            <div className="text-xs text-gray-400">{asset.name}</div>
                                        </div>
                                        <div className={`text-right ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                            <div className="font-mono">₦{asset.priceNGN.toLocaleString()}</div>
                                            <div className="text-xs">
                                                {isPositive ? '▲' : '▼'} {Math.abs(percentChange).toFixed(2)}%
                                            </div>
                                        </div>
                                    </div>
                                    {holding && holding.amount > 0 && (
                                        <div className="mt-2 text-xs bg-gray-900/50 p-1 rounded text-gray-300">
                                            Owned: {holding.amount.toFixed(4)} {asset.symbol}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Main Content - Trading View */}
                    <div className="flex-1 p-6 flex flex-col overflow-y-auto bg-gray-900">
                        {selectedAsset ? (
                            <div className="space-y-6">
                                {/* Asset Header */}
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold 
                                        ${selectedAsset.category === 'memecoin' ? 'bg-pink-500' : 'bg-blue-600'}`}>
                                        {selectedAsset.symbol[0]}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{selectedAsset.name}</h3>
                                        <div className="flex gap-2 text-sm">
                                            <span className="px-2 py-0.5 rounded bg-gray-700 text-gray-300 uppercase">{selectedAsset.category}</span>
                                            <span className="px-2 py-0.5 rounded bg-red-900/50 text-red-300 border border-red-800">
                                                Risk: {selectedAsset.riskLevel}/10
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-800 rounded-xl p-4">
                                    <p className="text-gray-300 italic">"{selectedAsset.description}"</p>
                                </div>

                                {/* Trading Interface */}
                                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                                    <h4 className="text-gray-400 text-sm font-semibold uppercase mb-4">Trade {selectedAsset.symbol}</h4>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="text-xs text-gray-500 mb-1 block">Amount</label>
                                            <input
                                                type="number"
                                                value={transactionAmount}
                                                onChange={(e) => setTransactionAmount(e.target.value)}
                                                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-yellow-500 outline-none font-mono"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-xs text-gray-500 mb-1 block">Estimated Cost (₦)</label>
                                            <div className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-400 font-mono">
                                                {transactionAmount
                                                    ? (parseFloat(transactionAmount) * selectedAsset.priceNGN).toLocaleString()
                                                    : '0.00'
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mt-6">
                                        <button
                                            onClick={handleBuy}
                                            disabled={!transactionAmount || parseFloat(transactionAmount) <= 0}
                                            className="flex-1 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition"
                                        >
                                            BUY
                                        </button>
                                        <button
                                            onClick={handleSell}
                                            disabled={!transactionAmount || parseFloat(transactionAmount) <= 0}
                                            className="flex-1 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition"
                                        >
                                            SELL
                                        </button>
                                    </div>

                                    <div className="mt-4 text-center text-sm text-gray-400">
                                        Wallet Balance: <span className="text-white font-mono">₦{cash.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500">
                                <span className="text-6xl mb-4">📉</span>
                                <p>Select an asset to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
