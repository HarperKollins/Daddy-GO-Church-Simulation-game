'use client';

/**
 * How To Play Modal - Re-usable Tutorial Component
 * 
 * Can be opened from Settings at any time for players
 * who want to review the game mechanics.
 */

import React, { useState } from 'react';
import ThreeDEmoji from './ThreeDEmoji';

interface HowToPlayModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TUTORIAL_SLIDES = [
    {
        emoji: 'pray',
        fallback: '⛪',
        title: 'What is This Game?',
        text: 'Daddy G.O. Simulator is a LIFE SIMULATION game. You play as a young Nigerian building a church empire. Every choice you make shapes your story - there is no right or wrong way to play!',
        color: '#a78bfa',
    },
    {
        emoji: 'gym',
        fallback: '📊',
        title: 'Your Stats',
        text: '❤️ HEALTH - Your physical wellbeing (don\'t let it reach 0!)\n💵 CASH - Personal & Church money\n✨ ANOINTING - Your spiritual power\n⭐ FAME - How well-known you are\n🔥 SCANDAL - Your reputation risk (keep it low!)',
        color: '#f472b6',
    },
    {
        emoji: 'hold_service',
        fallback: '⚡',
        title: 'Energy System',
        text: 'Every action costs ENERGY. You have limited energy each week. Tap "Hold Sunday Service" or "Next Week" to advance time and reset your energy. Plan your actions wisely!',
        color: '#facc15',
    },
    {
        emoji: 'warfare',
        fallback: '🎲',
        title: 'Events & Choices',
        text: 'Random events will appear - opportunities, scandals, blessings, and tests. Read the options carefully! Some consequences are immediate, others may come back weeks later...',
        color: '#2dd4bf',
    },
    {
        emoji: 'land',
        fallback: '🏛️',
        title: 'Building Your Empire',
        text: 'Grow members → Collect tithes → Upgrade venue → Attract more members! Buy cars, houses, land. Train your skills. Find a wife. Build your LEGACY from bus stop to mega-church!',
        color: '#818cf8',
    },
    {
        emoji: 'dove',
        fallback: '🙏',
        title: 'Tips for Success',
        text: '• Hold Sunday Service regularly for tithes\n• Keep Health and Anointing high\n• Watch your Scandal level\n• Train skills to unlock opportunities\n• Make choices that fit YOUR story!',
        color: '#4ade80',
    },
];

export default function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    if (!isOpen) return null;

    const slide = TUTORIAL_SLIDES[currentSlide];
    const isLastSlide = currentSlide === TUTORIAL_SLIDES.length - 1;

    const handleNext = () => {
        if (currentSlide < TUTORIAL_SLIDES.length - 1) {
            setCurrentSlide(prev => prev + 1);
        } else {
            handleClose();
        }
    };

    const handleClose = () => {
        setCurrentSlide(0); // Reset for next open
        onClose();
    };

    return (
        <div
            className="modal-overlay"
            style={{
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(10px)',
            }}
            onClick={handleClose}
        >
            <div
                className="modal-sheet tab-content-enter"
                key={currentSlide}
                style={{
                    maxWidth: '420px',
                    margin: '0 auto',
                    background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)',
                    borderRadius: '24px 24px 0 0',
                    maxHeight: '85vh',
                    overflow: 'auto',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 20px 0',
                }}>
                    <div style={{
                        background: slide.color,
                        color: '#000',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                    }}>
                        HOW TO PLAY
                    </div>
                    <button
                        onClick={handleClose}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            color: '#fff',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            fontSize: '18px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '32px 24px', textAlign: 'center' }}>
                    {/* Emoji */}
                    <div className="float-animation" style={{ marginBottom: '20px' }}>
                        <ThreeDEmoji
                            icon={slide.emoji}
                            fallback={slide.fallback}
                            size={72}
                            animate
                        />
                    </div>

                    {/* Title */}
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: '#fff',
                        marginBottom: '16px',
                    }}>
                        {slide.title}
                    </h2>

                    {/* Text */}
                    <p style={{
                        color: 'rgba(255,255,255,0.85)',
                        fontSize: '0.9rem',
                        lineHeight: 1.7,
                        whiteSpace: 'pre-line',
                        textAlign: 'left',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '16px',
                        borderRadius: '12px',
                        marginBottom: '24px',
                    }}>
                        {slide.text}
                    </p>

                    {/* Progress Dots */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px',
                        marginBottom: '24px',
                    }}>
                        {TUTORIAL_SLIDES.map((_, i) => (
                            <div
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                style={{
                                    width: i === currentSlide ? '24px' : '8px',
                                    height: '8px',
                                    borderRadius: '4px',
                                    background: i === currentSlide ? slide.color : 'rgba(255,255,255,0.3)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                }}
                            />
                        ))}
                    </div>

                    {/* Counter */}
                    <div style={{
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.4)',
                        marginBottom: '20px',
                    }}>
                        {currentSlide + 1} of {TUTORIAL_SLIDES.length}
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={handleNext}
                            style={{
                                flex: 1,
                                padding: '14px 20px',
                                background: `linear-gradient(135deg, ${slide.color}, ${slide.color}cc)`,
                                border: 'none',
                                borderRadius: '12px',
                                color: '#000',
                                fontSize: '1rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                            }}
                        >
                            {isLastSlide ? '✓ Got It!' : 'Next →'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
