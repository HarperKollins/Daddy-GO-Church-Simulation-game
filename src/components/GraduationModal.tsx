/**
 * GraduationModal Component
 * 
 * Triggered at graduation (week 208 / end of 400L)
 * Player chooses between Village ministry (hard mode) or City ministry (expensive mode)
 */

'use client';

import { Icons } from '@/components/Icons';

interface GraduationModalProps {
    isOpen: boolean;
    onChoosePath: (location: 'Village' | 'City') => void;
}

export default function GraduationModal({ isOpen, onChoosePath }: GraduationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" style={{ zIndex: 1000 }}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                <div className="modal-header" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#000' }}>
                    <h2>🎓 GRADUATION DAY!</h2>
                </div>

                <div style={{ padding: '24px' }}>
                    <p style={{ fontSize: '15px', marginBottom: '20px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                        After 4 years of juggling studies and ministry, you've finally graduated!
                        You're now a <strong>certified Man of God</strong> with a degree to prove it.
                    </p>

                    <p style={{ fontSize: '15px', marginBottom: '24px', fontWeight: 700, color: '#FFD700' }}>
                        ✨ Where will you take your ministry?
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Village Path */}
                        <button onClick={() => onChoosePath('Village')} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            padding: '20px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            border: '2px solid #10b981',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🌾 THE VILLAGE</div>
                            <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>
                                "Return to the roots"
                            </div>
                            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.5' }}>
                                <strong>HARD MODE:</strong> Poor community, skeptical elders, slow growth.<br />
                                <strong>Benefits:</strong> Cheap venues, forgiving community, authentic ministry.<br />
                                <strong>Goal:</strong> Build from nothing, prove yourself.
                            </div>
                        </button>

                        {/* City Path */}
                        <button onClick={() => onChoosePath('City')} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            padding: '20px',
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            border: '2px solid #f59e0b',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏙️ THE CITY</div>
                            <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>
                                "Where the money flows"
                            </div>
                            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.5' }}>
                                <strong>EXPENSIVE MODE:</strong> High rent, fierce competition, media scrutiny.<br />
                                <strong>Benefits:</strong> Wealthy donors, fast growth, viral potential.<br />
                                <strong>Goal:</strong> Outshine rivals, build an empire.
                            </div>
                        </button>
                    </div>

                    <p style={{ marginTop: '20px', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>
                        ⚠️ This choice is permanent and will shape your entire ministry!
                    </p>
                </div>
            </div>
        </div>
    );
}
