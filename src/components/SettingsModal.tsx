import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const store = useGameStore();
    const [confirmReset, setConfirmReset] = useState(false);

    if (!isOpen) return null;

    const handleReset = () => {
        if (confirmReset) {
            store.resetGame();
            window.location.reload(); // Hard reload to ensure clean state
        } else {
            setConfirmReset(true);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '400px', textAlign: 'center' }}>
                <h2>Settings</h2>

                <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div className="setting-item">
                        <label>Game Version</label>
                        <span style={{ color: '#666' }}>v2.0 (Daddy G.O. Edition)</span>
                    </div>

                    <div className="setting-item">
                        <label>Developer</label>
                        <span style={{ color: '#666' }}>Harper Kollins AI</span>
                    </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />

                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ color: '#ef4444', marginBottom: '10px' }}>Danger Zone</h3>

                    {!confirmReset ? (
                        <button
                            onClick={handleReset}
                            className="btn-danger"
                            style={{ width: '100%', padding: '12px' }}
                        >
                            Start New Game
                        </button>
                    ) : (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                onClick={handleReset}
                                className="btn-danger"
                                style={{ flex: 1, padding: '12px', background: '#dc2626' }}
                            >
                                Confirm Reset?
                            </button>
                            <button
                                onClick={() => setConfirmReset(false)}
                                className="btn-secondary"
                                style={{ flex: 1, padding: '12px' }}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                    <p style={{ fontSize: '11px', color: '#666', marginTop: '8px' }}>
                        This will wipe all progress and save data.
                    </p>
                </div>

                <button onClick={onClose} className="btn-secondary" style={{ width: '100%' }}>
                    Close
                </button>
            </div>
        </div>
    );
}
