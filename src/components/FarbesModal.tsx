import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Modal } from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface FarbesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FarbesModal({ isOpen, onClose }: FarbesModalProps) {
    const store = useGameStore();
    const { name, occupation, age, stats, assets, church } = store;

    if (!isOpen) return null;

    // Calculate Net Worth: Personal Cash + Asset Value (using cost as value proxy)
    const assetValue = assets.reduce((total, asset) => total + asset.cost, 0);
    const netWorth = stats.personalCash + assetValue;

    // Calculate Scores (Flavor)
    const selfMadeScore = Math.min(10, Math.floor(stats.fame / 10) + 1);
    const philanthropyScore = Math.min(10, Math.floor(stats.health / 10)); // Placeholder logic

    // Date String (Simulated)
    const currentDate = new Date();
    const dateString = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    return (
        <Modal isOpen={true} onClose={onClose} title="Farbes Magazine" className="max-w-md bg-white text-black p-0 border border-gray-200">
            {/* Override standard modal styles for "Magazine" look */}
            <div className="font-serif bg-white text-black -m-4">
                {/* Header Black Bar */}
                <div className="bg-black text-white p-4 text-center">
                    <h1 className="text-3xl font-bold tracking-tight font-serif uppercase">Farbes</h1>
                </div>

                {/* Profile Header */}
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <div className="bg-black text-white w-6 h-6 flex items-center justify-center font-bold text-xs">F</div>
                            <span className="text-[10px] tracking-widest uppercase font-sans font-bold">PROFILE</span>
                        </div>
                    </div>

                    <h2 className="text-4xl leading-tight font-serif mb-1">{name}</h2>
                    <div className="text-sm text-gray-600 font-sans mb-6 uppercase tracking-wide">{occupation}</div>

                    <div className="flex items-start gap-4 mb-3">
                        <span className="text-3xl font-bold font-sans">₦{(netWorth / 1000000).toFixed(1)}M</span>
                        <div className="text-[10px] text-gray-500 font-sans mt-2 leading-tight">
                            <div>Real Time Net Worth</div>
                            <div>as of {dateString}</div>
                        </div>
                    </div>

                    <div className="text-xs text-gray-500 font-sans mb-6">
                        #{Math.max(1, 10000 - Math.floor(netWorth / 100000)).toLocaleString()} in the world today
                    </div>

                    <hr className="border-black mb-6" />

                    <h3 className="text-lg font-bold font-sans mb-4 uppercase">Personal Stats</h3>

                    <div className="flex flex-col gap-3 font-sans text-sm">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="font-bold">Age</span>
                            <span>{age}</span>
                        </div>

                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="font-bold">Source of Wealth</span>
                            <span>{occupation.includes('Pastor') || occupation === 'Student' ? 'Ministry' : occupation}</span>
                        </div>

                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="font-bold">Self-Made Score</span>
                            <div className="flex gap-0.5">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className={`w-1 h-3 ${i < selfMadeScore ? 'bg-black' : 'bg-gray-200'}`} />
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="font-bold">Philanthropy Score</span>
                            <div className="flex gap-0.5">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className={`w-1 h-3 ${i < philanthropyScore ? 'bg-black' : 'bg-gray-200'}`} />
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="font-bold">Church Members</span>
                            <span>{church.members.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-bold">Pulpit Fame</span>
                            <span>{stats.fame}/100</span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
