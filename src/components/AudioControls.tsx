/**
 * Audio Controls Component
 * Floating button to toggle sound on/off with optional volume slider
 */

'use client';

import { useState } from 'react';
import { useSound } from '@/hooks/useSoundManager';

export default function AudioControls() {
    const { isMuted, toggleMute, sfxVolume, musicVolume, setSfxVolume, setMusicVolume, playSound } = useSound();
    const [showPanel, setShowPanel] = useState(false);

    const handleToggleMute = () => {
        toggleMute();
        if (!isMuted) {
            // Was unmuted, now muting - no sound
        } else {
            // Was muted, now unmuting - play a click to confirm
            setTimeout(() => playSound('click'), 100);
        }
    };

    return (
        <>
            {/* Floating Audio Button */}
            <button
                onClick={() => setShowPanel(!showPanel)}
                style={{
                    position: 'fixed',
                    bottom: '90px',
                    right: '16px',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: isMuted ? 'rgba(239, 68, 68, 0.9)' : 'rgba(34, 197, 94, 0.9)',
                    border: 'none',
                    color: 'white',
                    fontSize: '20px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                {isMuted ? '🔇' : '🔊'}
            </button>

            {/* Audio Panel */}
            {showPanel && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '150px',
                        right: '16px',
                        background: 'rgba(15, 23, 42, 0.95)',
                        borderRadius: '16px',
                        padding: '16px',
                        width: '200px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                        zIndex: 1001,
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <span style={{ color: '#e0e0e0', fontWeight: 700, fontSize: '14px' }}>🎵 Audio</span>
                        <button
                            onClick={() => setShowPanel(false)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#6b7280',
                                fontSize: '18px',
                                cursor: 'pointer',
                            }}
                        >×</button>
                    </div>

                    {/* Mute Toggle */}
                    <button
                        onClick={handleToggleMute}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: 'none',
                            background: isMuted ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                            color: isMuted ? '#ef4444' : '#22c55e',
                            fontWeight: 600,
                            cursor: 'pointer',
                            marginBottom: '12px',
                            fontSize: '13px',
                        }}
                    >
                        {isMuted ? '🔇 Sound OFF' : '🔊 Sound ON'}
                    </button>

                    {/* SFX Volume */}
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                            Sound Effects: {Math.round(sfxVolume * 100)}%
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={sfxVolume * 100}
                            onChange={(e) => setSfxVolume(parseInt(e.target.value) / 100)}
                            style={{ width: '100%', accentColor: '#a78bfa' }}
                        />
                    </div>

                    {/* Music Volume */}
                    <div>
                        <label style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                            Music: {Math.round(musicVolume * 100)}%
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={musicVolume * 100}
                            onChange={(e) => setMusicVolume(parseInt(e.target.value) / 100)}
                            style={{ width: '100%', accentColor: '#22c55e' }}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
