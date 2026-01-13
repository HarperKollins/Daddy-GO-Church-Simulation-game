/**
 * GameOver Component - Clean BitLife Style
 * 
 * Displayed when the player dies (health = 0) or is arrested (scandal = 100).
 */

'use client';

import { useGameStore } from '@/store/useGameStore';

export default function GameOver() {
    const { age, week, stats, church, resetGame } = useGameStore();

    // Determine cause of death
    const causeOfDeath = stats.scandal >= 100
        ? 'You were arrested. EFCC finally caught up with your "creative accounting."'
        : 'You collapsed from exhaustion and hunger. The ministry consumed you.';

    return (
        <div className="game-over">
            <h1>GAME OVER</h1>
            <p style={{ marginBottom: '32px' }}>{causeOfDeath}</p>

            <div style={{
                background: 'var(--bg-card)',
                borderRadius: '12px',
                padding: '20px',
                width: '100%',
                maxWidth: '280px',
                marginBottom: '24px'
            }}>
                <div style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    marginBottom: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    Final Stats
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    textAlign: 'left',
                    fontSize: '14px'
                }}>
                    <div>
                        <span style={{ color: 'var(--text-muted)' }}>Age:</span>{' '}
                        <strong>{age}</strong>
                    </div>
                    <div>
                        <span style={{ color: 'var(--text-muted)' }}>Weeks:</span>{' '}
                        <strong>{week}</strong>
                    </div>
                    <div>
                        <span style={{ color: 'var(--text-muted)' }}>Members:</span>{' '}
                        <strong>{church.members.toLocaleString()}</strong>
                    </div>
                    <div>
                        <span style={{ color: 'var(--text-muted)' }}>Net Worth:</span>{' '}
                        <strong>₦{(stats.personalCash + stats.churchCash).toLocaleString()}</strong>
                    </div>
                </div>
            </div>

            <button className="btn-primary" onClick={resetGame}>
                Try Again
            </button>
        </div>
    );
}
