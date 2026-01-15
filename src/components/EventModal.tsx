/**
 * EventModal Component - Premium Crisis Decision Style
 * Bottom sheet modal with scandal/crisis visual treatment
 */

'use client';

import { useState } from 'react';
import type { GameEvent, EventChoice } from '@/types/game';

interface EventModalProps {
    event: GameEvent;
    availableChoices: EventChoice[];
    onChoiceSelect: (choice: EventChoice) => void;
}

// Scandal-related image queries for Unsplash
const scandalImages = [
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=200&fit=crop', // Business meeting
    'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=400&h=200&fit=crop', // Newspaper
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop', // Documents
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop', // Money
];

// Event category images
const categoryImages: Record<string, string> = {
    'scandal': scandalImages[Math.floor(Math.random() * scandalImages.length)],
    'crisis': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop',
    'opportunity': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
    'story': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop',
};

export default function EventModal({
    event,
    availableChoices,
    onChoiceSelect
}: EventModalProps) {
    const [selectedChoice, setSelectedChoice] = useState<EventChoice | null>(null);
    const [showResult, setShowResult] = useState(false);

    // Determine if this is a crisis/scandal event
    const isCrisis = (event as any).tags?.includes('scandal') ||
        (event as any).tags?.includes('crisis') ||
        (event as any).category === 'scandal';

    const eventImage = (event as any).imageUrl ||
        (isCrisis ? scandalImages[Math.floor(Math.random() * scandalImages.length)] : null);

    const handleChoiceClick = (choice: EventChoice) => {
        setSelectedChoice(choice);
        setShowResult(true);
    };

    const handleContinue = () => {
        if (selectedChoice) {
            onChoiceSelect(selectedChoice);
            setSelectedChoice(null);
            setShowResult(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-sheet animate-slide-up" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                {/* Bottom Sheet Handle */}
                <div className="modal-handle">
                    <div className="modal-handle-bar" />
                </div>

                {/* Crisis Header - Red for scandals */}
                {isCrisis ? (
                    <div className="crisis-header">
                        <h4 className="crisis-header-title">SCANDAL</h4>
                    </div>
                ) : (
                    <div style={{
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '12px 20px',
                        textAlign: 'center',
                    }}>
                        <h4 style={{
                            fontSize: '11px',
                            fontWeight: 800,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                        }}>
                            {event.category?.toUpperCase() || 'EVENT'}
                        </h4>
                    </div>
                )}

                {!showResult ? (
                    <>
                        {/* Content Section */}
                        <div className="modal-body text-center">
                            {/* Event Image */}
                            {eventImage && (
                                <div style={{
                                    width: '100%',
                                    maxWidth: '280px',
                                    margin: '0 auto 20px',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    border: isCrisis ? '3px solid rgba(220, 38, 38, 0.3)' : '3px solid rgba(34, 197, 94, 0.3)',
                                }}>
                                    <img
                                        src={eventImage}
                                        alt="Event"
                                        className="crisis-image"
                                        style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}

                            {/* Headline */}
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 800,
                                color: '#f8fafc',
                                letterSpacing: '-0.02em',
                                marginBottom: '12px',
                                lineHeight: 1.2,
                            }}>
                                {event.title}
                            </h3>

                            {/* Body Text */}
                            <p style={{
                                fontSize: '0.9375rem',
                                color: '#cbd5e1',
                                lineHeight: 1.6,
                                marginBottom: '20px',
                            }}>
                                {event.description}
                            </p>

                            {/* Risk Badge (for crisis events) */}
                            {isCrisis && (
                                <div className="crisis-risk-badge">
                                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>trending_down</span>
                                    REPUTATION AT RISK
                                </div>
                            )}
                        </div>

                        {/* Choice Buttons */}
                        <div style={{ padding: '0 20px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {availableChoices.map((choice, index) => (
                                <button
                                    key={choice.id}
                                    onClick={() => handleChoiceClick(choice)}
                                    style={{
                                        width: '100%',
                                        padding: '14px 20px',
                                        background: index === 0
                                            ? (isCrisis ? '#dc2626' : 'var(--primary)')
                                            : 'transparent',
                                        color: index === 0 ? 'white' : '#e0e0e0',
                                        border: index === 0 ? 'none' : '2px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        fontSize: '0.9375rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                    }}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span>{choice.label}</span>
                                        {(choice as any).cost && (
                                            <span style={{
                                                fontSize: '10px',
                                                opacity: 0.8,
                                                fontWeight: 500,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                marginTop: '4px',
                                            }}>
                                                {(choice as any).cost.energy && `${(choice as any).cost.energy} Energy`}
                                                {(choice as any).cost.personalCash && ` • ₦${(choice as any).cost.personalCash.toLocaleString()}`}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Footer Meta */}
                        <div style={{
                            padding: '0 20px 20px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '6px',
                            color: 'var(--text-muted)',
                        }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>balance</span>
                            <span style={{
                                fontSize: '9px',
                                fontWeight: 700,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                            }}>
                                {isCrisis ? 'Legal & Morality System' : 'Ministry Decision'}
                            </span>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Result Screen */}
                        <div className="modal-body text-center" style={{ padding: '32px 20px' }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                margin: '0 auto 16px',
                                borderRadius: '50%',
                                background: 'rgba(34, 197, 94, 0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#22c55e' }}>check</span>
                            </div>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 800,
                                color: 'var(--text-primary)',
                                marginBottom: '12px',
                            }}>
                                {selectedChoice?.label}
                            </h3>
                            <p style={{
                                fontSize: '0.9375rem',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.6,
                            }}>
                                {selectedChoice?.resultText || "Your decision has been made."}
                            </p>
                        </div>

                        <div style={{ padding: '0 20px 24px' }}>
                            <button
                                className="action-btn-primary"
                                onClick={handleContinue}
                            >
                                <span className="material-symbols-outlined">arrow_forward</span>
                                Continue
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
