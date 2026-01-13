import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Icons } from './Icons';

interface FarbesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FarbesModal({ isOpen, onClose }: FarbesModalProps) {
    const store = useGameStore();
    const { name, occupation, age, stats, assets, church, week } = store;

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
        <div className="modal-overlay">
            <div className="modal-content" style={{
                background: '#fff',
                color: '#000',
                padding: 0,
                maxWidth: '400px',
                borderRadius: '0px',
                fontFamily: 'serif'
            }}>

                {/* Header Black Bar */}
                <div style={{ background: '#000', color: '#fff', padding: '15px', textAlign: 'center' }}>
                    <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', fontFamily: 'Times New Roman, serif' }}>Farbes</h1>
                </div>

                {/* Profile Header */}
                <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ background: '#000', color: '#fff', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>F</div>
                            <span style={{ fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>PROFILE</span>
                        </div>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
                    </div>

                    <h2 style={{ fontSize: '42px', margin: '0 0 5px 0', fontFamily: 'Times New Roman, serif', fontWeight: '400' }}>{name}</h2>
                    <div style={{ fontSize: '16px', color: '#666', fontFamily: 'sans-serif', marginBottom: '20px' }}>{occupation}</div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '32px', fontWeight: 'bold' }}>₦{(netWorth / 1000000).toFixed(1)}M</span>
                        <div style={{ fontSize: '10px', color: '#666', marginTop: '5px', fontFamily: 'sans-serif' }}>
                            <div>Real Time Net Worth</div>
                            <div>as of {dateString}</div>
                        </div>
                    </div>

                    <div style={{ fontSize: '12px', color: '#666', fontFamily: 'sans-serif', marginBottom: '20px' }}>
                        #{Math.max(1, 10000 - Math.floor(netWorth / 100000))} in the world today
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '20px 0' }} />

                    <h3 style={{ fontSize: '18px', margin: '0 0 20px 0', fontFamily: 'sans-serif', fontWeight: 'bold' }}>Personal Stats</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontFamily: 'sans-serif', fontSize: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold' }}>Age</span>
                            <span>{age}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold' }}>Source of Wealth</span>
                            <span>{occupation.includes('Pastor') || occupation === 'Student' ? 'Ministry' : occupation}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold' }}>Self-Made Score</span>
                            <span>{selfMadeScore}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold' }}>Philanthropy Score</span>
                            <span>{philanthropyScore}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold' }}>Church Members</span>
                            <span>{church.members.toLocaleString()}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold' }}>Pulpit Fame</span>
                            <span>{stats.fame}/100</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
