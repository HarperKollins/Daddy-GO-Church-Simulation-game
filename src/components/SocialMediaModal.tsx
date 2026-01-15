/**
 * SocialMediaModal Component - Premium BitLife Style
 * 
 * YouTube and Spotify presence with premium platform cards
 */

'use client';

import { useGameStore } from '@/store/useGameStore';
import ThreeDEmoji from './ThreeDEmoji';

interface SocialMediaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUploadSermon: () => void;
}

export default function SocialMediaModal({ isOpen, onClose, onUploadSermon }: SocialMediaModalProps) {
    const { socialMedia, stats } = useGameStore();

    if (!isOpen) return null;

    const formatNumber = (n: number): string => {
        if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
        if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
        return n.toLocaleString();
    };

    // Calculate weekly income from social media
    const youtubeIncome = Math.floor((socialMedia.youtubeSubscribers / 1000) * 500);
    const spotifyIncome = Math.floor((socialMedia.spotifyListeners / 100) * 200);

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
                        <h2 className="top-nav-title">Social Media Ministry</h2>
                        <div className="w-10" />
                    </div>
                </div>

                <div className="px-4 pb-8 space-y-4">
                    {/* YouTube Section */}
                    <div className="asset-photo-card" style={{ border: '2px solid rgba(239, 68, 68, 0.2)' }}>
                        <div style={{
                            height: '80px',
                            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), transparent)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: '#ef4444',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <ThreeDEmoji icon="youtube" fallback="▶️" size={28} />
                            </div>
                            <div>
                                <div className="text-lg font-bold text-gray-900">YouTube Channel</div>
                                <div className="text-sm text-gray-500">{formatNumber(socialMedia.youtubeSubscribers)} subscribers</div>
                            </div>
                        </div>
                        <div className="asset-photo-info">
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <div className="text-xl font-black text-gray-900">{socialMedia.sermonsUploaded}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wide">Sermons</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <div className="text-xl font-black text-gray-900">{formatNumber(socialMedia.weeklyViews)}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wide">Weekly Views</div>
                                </div>
                            </div>
                            <div className="alert-banner success">
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>payments</span>
                                Weekly ad revenue: ₦{youtubeIncome.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    {/* Spotify Section */}
                    <div className="asset-photo-card" style={{ border: '2px solid rgba(30, 215, 96, 0.2)' }}>
                        <div style={{
                            height: '80px',
                            background: 'linear-gradient(135deg, rgba(30, 215, 96, 0.2), transparent)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: '#1ed760',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <ThreeDEmoji icon="media" fallback="🎧" size={28} />
                            </div>
                            <div>
                                <div className="text-lg font-bold text-gray-900">Spotify Podcast</div>
                                <div className="text-sm text-gray-500">{formatNumber(socialMedia.spotifyListeners)} monthly listeners</div>
                            </div>
                        </div>
                        <div className="asset-photo-info">
                            <div className="alert-banner success">
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>payments</span>
                                Weekly streams revenue: ₦{spotifyIncome.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    {/* Upload Action */}
                    <button
                        onClick={() => {
                            onUploadSermon();
                            onClose();
                        }}
                        className="action-btn-primary"
                        style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
                    >
                        <span className="material-symbols-outlined">upload</span>
                        Upload Sermon (40 Energy)
                    </button>
                    <p className="text-[11px] text-gray-500 text-center">
                        Grows subs based on Fame. Higher anointing = more engagement.
                    </p>
                </div>
            </div>
        </div>
    );
}
