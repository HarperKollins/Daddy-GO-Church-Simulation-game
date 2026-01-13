/**
 * DropoutModal Component
 * 
 * Allows students to drop out early and unlock all venues immediately
 * But with permanent penalties: scandal spike, lower max anointing
 */

'use client';

import { Icons } from '@/components/Icons';

interface DropoutModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function DropoutModal({ isOpen, onConfirm, onCancel }: DropoutModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" style={{ zIndex: 1000 }}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
                <div className="modal-header" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: '#fff' }}>
                    <h2>⚠️ DROP OUT OF UNIVERSITY?</h2>
                </div>

                <div style={{ padding: '24px' }}>
                    <p style={{ fontSize: '15px', marginBottom: '16px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                        You're thinking about quitting school to focus 100% on ministry...
                    </p>

                    <div style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        borderLeft: '4px solid #ef4444',
                        padding: '16px',
                        marginBottom: '20px',
                        borderRadius: '6px'
                    }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', color: '#ef4444' }}>
                            ⚠️ PERMANENT CONSEQUENCES:
                        </div>
                        <ul style={{ fontSize: '13px', lineHeight: '1.8', color: 'var(--text-secondary)', marginLeft: '20px' }}>
                            <li>+30 Scandal (family disappointment)</li>
                            <li>-20 Max Anointing (forever)</li>
                            <li>"Dropout" tag (stigma in City)</li>
                            <li>No graduation ceremony</li>
                        </ul>
                    </div>

                    <div style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        borderLeft: '4px solid #10b981',
                        padding: '16px',
                        marginBottom: '24px',
                        borderRadius: '6px'
                    }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', color: '#10b981' }}>
                            ✅ BENEFITS:
                        </div>
                        <ul style={{ fontSize: '13px', lineHeight: '1.8', color: 'var(--text-secondary)', marginLeft: '20px' }}>
                            <li>Unlock ALL venues immediately</li>
                            <li>100 energy/week (no school stress)</li>
                            <li>Start in Village (cheap rent)</li>
                            <li>Focus full-time on ministry</li>
                        </ul>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={onCancel} style={{
                            flex: 1,
                            padding: '12px',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: 700,
                            cursor: 'pointer',
                        }}>
                            Stay in School
                        </button>
                        <button onClick={onConfirm} style={{
                            flex: 1,
                            padding: '12px',
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: 700,
                            cursor: 'pointer',
                        }}>
                            Drop Out
                        </button>
                    </div>

                    <p style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic' }}>
                        "My parents didn't suffer for this..." - Your mom, probably
                    </p>
                </div>
            </div>
        </div>
    );
}
