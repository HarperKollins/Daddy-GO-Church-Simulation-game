/**
 * Name Input Modal - Clean BitLife-Style Design
 * 
 * Appears at the start of the game to let the player choose their name.
 * Professional, minimal design without emojis.
 */

'use client';

import { useState } from 'react';

interface NameInputModalProps {
    onConfirm: (name: string) => void;
}

export default function NameInputModal({ onConfirm }: NameInputModalProps) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Please enter a name, Pastor!');
            return;
        }
        if (name.length > 20) {
            setError('Name is too long (max 20 chars).');
            return;
        }
        onConfirm(name.trim());
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '380px' }}>
                <div style={{ padding: '32px 24px', textAlign: 'center' }}>
                    {/* Title Icon - Clean Text */}
                    <div style={{
                        width: '60px',
                        height: '60px',
                        margin: '0 auto 20px',
                        background: 'var(--primary)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        fontWeight: '700',
                        color: 'white'
                    }}>
                        DG
                    </div>

                    <h2 style={{
                        fontSize: '22px',
                        fontWeight: '700',
                        marginBottom: '8px',
                        color: 'var(--text-primary)'
                    }}>
                        Welcome, Man of God
                    </h2>
                    <p style={{
                        color: 'var(--text-secondary)',
                        marginBottom: '28px',
                        fontSize: '14px',
                        lineHeight: '1.5'
                    }}>
                        What should the congregation call you?
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setError('');
                                }}
                                placeholder="e.g. Pastor David"
                                autoFocus
                                style={{ textAlign: 'center' }}
                            />
                            {error && (
                                <div style={{
                                    color: 'var(--accent-danger)',
                                    fontSize: '13px',
                                    marginTop: '10px'
                                }}>
                                    {error}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ width: '100%' }}
                        >
                            Start Ministry
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
