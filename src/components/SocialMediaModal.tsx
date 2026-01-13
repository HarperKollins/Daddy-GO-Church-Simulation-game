/**
 * SocialMediaModal Component
 * 
 * Manages YouTube channel and Spotify/Podcast presence.
 * Allows uploading sermons and tracking subscribers/listeners.
 */

'use client';

import { useGameStore } from '@/store/useGameStore';
import { Icons } from '@/components/Icons';

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
    const youtubeIncome = Math.floor((socialMedia.youtubeSubscribers / 1000) * 500); // ₦500 per 1000 subs
    const spotifyIncome = Math.floor((socialMedia.spotifyListeners / 100) * 200); // ₦200 per 100 listeners

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px' }}>
                <div className="modal-header">
                    <h2>📱 Social Media Ministry</h2>
                    <button onClick={onClose} className="modal-close">×</button>
                </div>

                <div style={{ padding: '16px' }}>
                    {/* YouTube Section */}
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '12px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                background: '#ef4444',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px'
                            }}>▶️</div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '16px' }}>YouTube Channel</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                                    {formatNumber(socialMedia.youtubeSubscribers)} subscribers
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '18px', fontWeight: 700 }}>{socialMedia.sermonsUploaded}</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Sermons</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '18px', fontWeight: 700 }}>{formatNumber(socialMedia.weeklyViews)}</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Weekly Views</div>
                            </div>
                        </div>

                        <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 600 }}>
                            💰 Weekly ad revenue: ₦{youtubeIncome.toLocaleString()}
                        </div>
                    </div>

                    {/* Spotify Section */}
                    <div style={{
                        background: 'rgba(30, 215, 96, 0.1)',
                        border: '1px solid rgba(30, 215, 96, 0.2)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '16px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                background: '#1ed760',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px'
                            }}>🎧</div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '16px' }}>Spotify Podcast</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                                    {formatNumber(socialMedia.spotifyListeners)} monthly listeners
                                </div>
                            </div>
                        </div>

                        <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 600 }}>
                            💰 Weekly streams revenue: ₦{spotifyIncome.toLocaleString()}
                        </div>
                    </div>

                    {/* Upload Action */}
                    <button
                        onClick={() => {
                            onUploadSermon();
                            onClose();
                        }}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                            border: 'none',
                            borderRadius: '10px',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        📤 Upload Sermon (40 NRG)
                    </button>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '8px' }}>
                        Grows subs based on Fame. Higher anointing = more engagement.
                    </p>
                </div>
            </div>
        </div>
    );
}
