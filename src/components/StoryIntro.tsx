'use client';

/**
 * Story Introduction Component - Premium Fullscreen Cinematic
 * 
 * Shows BEFORE onboarding to:
 * 1. Explain what the game is about
 * 2. Explain what a simulation game is
 * 3. Teach how to play
 */

import React, { useState } from 'react';
import ThreeDEmoji from './ThreeDEmoji';

interface StoryIntroProps {
    onComplete: () => void;
}

// Slide data with story + tutorial content
const STORY_SLIDES = [
    // WHAT IS THIS GAME? (Slides 1-3)
    {
        emoji: 'pray',
        fallback: '⛪',
        title: 'Welcome to Daddy G.O. Simulator',
        subtitle: 'A Life Simulation Game',
        text: 'This is a SIMULATION GAME - like The Sims or BitLife. You make choices, and the game simulates the consequences of those choices on your life.',
        gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6, #1e1b4b)',
        highlight: '#a78bfa',
    },
    {
        emoji: 'bible',
        fallback: '📖',
        title: 'What is a Simulation Game?',
        subtitle: 'Your Choices, Your Story',
        text: 'In a simulation, YOU control the character. Every decision you make - good or bad - shapes your story. There is no "winning" or "losing", only the journey YOU create.',
        gradient: 'linear-gradient(135deg, #0ea5e9, #3b82f6, #1e3a5f)',
        highlight: '#60a5fa',
    },
    {
        emoji: 'crusade',
        fallback: '🎤',
        title: 'Your Mission',
        subtitle: 'Rise from Nothing to Everything',
        text: 'You play as a young Nigerian aspiring to build a church empire. Start small - preaching at bus stops. Dream big - become a Daddy G.O. with a mega-church!',
        gradient: 'linear-gradient(135deg, #10b981, #059669, #064e3b)',
        highlight: '#34d399',
    },

    // THE SETTING (Slides 4-5)
    {
        emoji: 'money',
        fallback: '💰',
        title: 'Welcome to Nigeria',
        subtitle: 'Land of Faith & Hustle',
        text: 'Where mega-churches rise overnight, pastors drive luxury cars, and "men of God" are celebrities. This is your playground. Will you stay genuine or embrace the hustle?',
        gradient: 'linear-gradient(135deg, #f59e0b, #d97706, #78350f)',
        highlight: '#fbbf24',
    },
    {
        emoji: 'controversy',
        fallback: '⚖️',
        title: 'Every Choice Has Consequences',
        subtitle: 'The Path is Yours',
        text: 'Preach truth or prophecy-for-profit? Stay faithful or have side chicks? Build genuine ministry or siphon funds? Your choices echo through your entire journey.',
        gradient: 'linear-gradient(135deg, #ef4444, #dc2626, #7f1d1d)',
        highlight: '#f87171',
    },

    // HOW TO PLAY (Slides 6-10)
    {
        emoji: 'gym',
        fallback: '📊',
        title: 'Your Stats',
        subtitle: 'Keep Everything Balanced',
        text: '❤️ HEALTH - Your physical wellbeing\n💵 CASH - Personal & Church money\n✨ ANOINTING - Your spiritual power\n⭐ FAME - How well-known you are\n🔥 SCANDAL - Your reputation risk',
        gradient: 'linear-gradient(135deg, #ec4899, #d946ef, #581c87)',
        highlight: '#f472b6',
    },
    {
        emoji: 'hold_service',
        fallback: '⚡',
        title: 'Energy System',
        subtitle: 'Every Action Costs Energy',
        text: 'You have LIMITED ENERGY each week. Preaching, praying, hustling - everything costs energy. Rest wisely. Your energy resets when you "Hold Sunday Service" to advance the week.',
        gradient: 'linear-gradient(135deg, #eab308, #ca8a04, #713f12)',
        highlight: '#facc15',
    },
    {
        emoji: 'warfare',
        fallback: '🎲',
        title: 'Random Events',
        subtitle: 'Life is Unpredictable',
        text: 'Random events will pop up - opportunities, scandals, blessings, and tests. Read carefully and choose wisely. Some consequences are immediate, others hit you weeks later...',
        gradient: 'linear-gradient(135deg, #14b8a6, #0d9488, #134e4a)',
        highlight: '#2dd4bf',
    },
    {
        emoji: 'land',
        fallback: '🏛️',
        title: 'Build Your Empire',
        subtitle: 'From Bus Stop to Stadium',
        text: 'Grow your church members → Collect tithes → Upgrade your venue → Attract more members. Buy assets, invest in crypto, train your skills, find a wife. Build your LEGACY!',
        gradient: 'linear-gradient(135deg, #6366f1, #4f46e5, #312e81)',
        highlight: '#818cf8',
    },
    {
        emoji: 'dove',
        fallback: '🙏',
        title: 'Are You Ready?',
        subtitle: 'Your Destiny Awaits',
        text: 'Remember: This is YOUR story. There is no right or wrong way to play. Be a saint or a sinner. Build genuine ministry or chase wealth. The choice... is YOURS.',
        gradient: 'linear-gradient(135deg, #22c55e, #16a34a, #14532d)',
        highlight: '#4ade80',
    },
];

export default function StoryIntro({ onComplete }: StoryIntroProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    const handleNext = () => {
        if (currentSlide < STORY_SLIDES.length - 1) {
            setCurrentSlide(prev => prev + 1);
        } else {
            handleComplete();
        }
    };

    const handleSkip = () => {
        handleComplete();
    };

    const handleComplete = () => {
        setIsExiting(true);
        setTimeout(() => {
            onComplete();
        }, 500);
    };

    const slide = STORY_SLIDES[currentSlide];
    const isLastSlide = currentSlide === STORY_SLIDES.length - 1;
    const isFirstSection = currentSlide < 3;
    const isMidSection = currentSlide >= 3 && currentSlide < 5;
    const isTutorialSection = currentSlide >= 5;

    // Section indicator
    const getSectionLabel = () => {
        if (isFirstSection) return 'ABOUT THE GAME';
        if (isMidSection) return 'THE SETTING';
        return 'HOW TO PLAY';
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: slide.gradient,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 20px',
            zIndex: 10000,
            transition: 'all 0.5s ease',
            opacity: isExiting ? 0 : 1,
            transform: isExiting ? 'scale(1.1)' : 'scale(1)',
        }}>
            {/* Skip Button */}
            <button
                onClick={handleSkip}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'rgba(255,255,255,0.15)',
                    border: 'none',
                    color: 'rgba(255,255,255,0.8)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                }}
            >
                Skip →
            </button>

            {/* Section Label */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: slide.highlight,
                color: '#000',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.5px',
            }}>
                {getSectionLabel()}
            </div>

            {/* Main Content Card */}
            <div
                key={currentSlide}
                className="tab-content-enter"
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '28px',
                    padding: '40px 28px',
                    maxWidth: '420px',
                    width: '100%',
                    textAlign: 'center',
                    color: 'white',
                    boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
            >
                {/* Emoji */}
                <div className="float-animation" style={{ marginBottom: '24px' }}>
                    <ThreeDEmoji
                        icon={slide.emoji}
                        fallback={slide.fallback}
                        size={90}
                        animate
                    />
                </div>

                {/* Title */}
                <h1 style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    marginBottom: '8px',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                }}>
                    {slide.title}
                </h1>

                {/* Subtitle */}
                <div style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: slide.highlight,
                    marginBottom: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                }}>
                    {slide.subtitle}
                </div>

                {/* Text */}
                <p style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-line',
                    marginBottom: '28px',
                }}>
                    {slide.text}
                </p>

                {/* Progress Dots */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '6px',
                    marginBottom: '28px',
                    flexWrap: 'wrap',
                }}>
                    {STORY_SLIDES.map((_, i) => (
                        <div
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            style={{
                                width: i === currentSlide ? '24px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                background: i === currentSlide ? slide.highlight : 'rgba(255,255,255,0.3)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                            }}
                        />
                    ))}
                </div>

                {/* Progress Counter */}
                <div style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.5)',
                    marginBottom: '20px',
                }}>
                    {currentSlide + 1} of {STORY_SLIDES.length}
                </div>

                {/* Action Button */}
                <button
                    onClick={handleNext}
                    style={{
                        width: '100%',
                        padding: '16px 24px',
                        background: isLastSlide
                            ? `linear-gradient(135deg, ${slide.highlight}, #fff)`
                            : `linear-gradient(135deg, ${slide.highlight}dd, ${slide.highlight})`,
                        border: 'none',
                        borderRadius: '16px',
                        color: isLastSlide ? '#000' : '#000',
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        transform: 'scale(1)',
                        transition: 'transform 0.2s ease',
                        boxShadow: `0 8px 24px -4px ${slide.highlight}66`,
                    }}
                    onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
                    onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                    {isLastSlide ? '🙏 Begin My Journey' : 'Continue →'}
                </button>
            </div>

            {/* Tap hint */}
            <div style={{
                position: 'absolute',
                bottom: '30px',
                color: 'rgba(255,255,255,0.4)',
                fontSize: '0.75rem',
            }}>
                Tap anywhere or use the button to continue
            </div>

            {/* Click anywhere to advance (except on buttons) */}
            <div
                onClick={(e) => {
                    // Only advance if clicking outside buttons
                    if ((e.target as HTMLElement).tagName !== 'BUTTON') {
                        handleNext();
                    }
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                }}
            />
        </div>
    );
}
