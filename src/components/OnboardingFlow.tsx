'use client';

/**
 * Onboarding Flow Component - Premium BitLife Style
 * 
 * Features:
 * - Cinematic intro slides with 3D emojis
 * - Glassmorphism cards
 * - Premium selection cards with hover effects
 */

import React, { useState } from 'react';
import ThreeDEmoji from './ThreeDEmoji';

interface OnboardingProps {
    onComplete: (playerData: PlayerSetupData) => void;
}

interface PlayerSetupData {
    name: string;
    origin: 'Lagos' | 'Village' | 'Abroad';
    background: 'Born_Again' | 'Lukewarm' | 'Hustler' | 'Genuine';
    startingPath: 'University' | 'Direct_Ministry';
}

type OnboardingStep = 'intro' | 'name' | 'origin' | 'background' | 'path' | 'tutorial';

const INTRO_SLIDES = [
    {
        emoji: 'pray',
        fallback: '⛪',
        title: 'Welcome to Nigeria',
        text: 'A land of faith, hustle, and unlimited possibilities...',
        gradient: 'from-purple-900 via-indigo-900 to-black',
    },
    {
        emoji: 'dove',
        fallback: '🙏',
        title: 'The Year is 2026',
        text: 'You are a 200-level university student with a burning desire to preach...',
        gradient: 'from-blue-900 via-purple-900 to-black',
    },
    {
        emoji: 'bible',
        fallback: '💭',
        title: 'Your Journey Begins',
        text: 'Will you become a true man of God? Or will power corrupt you?',
        gradient: 'from-green-900 via-emerald-900 to-black',
    },
    {
        emoji: 'controversy',
        fallback: '⚠️',
        title: 'Every Choice Matters',
        text: 'Your decisions will echo through generations. Choose wisely.',
        gradient: 'from-red-900 via-orange-900 to-black',
    },
];

const ORIGINS = [
    {
        id: 'Lagos' as const,
        emoji: 'bank',
        fallback: '🏙️',
        name: 'Lagos Boy/Girl',
        description: 'Street-smart, hustler mentality. You know how the city works.',
        effects: '+Charisma, +Hustle, -Anointing',
        color: '#3b82f6',
    },
    {
        id: 'Village' as const,
        emoji: 'family',
        fallback: '🏘️',
        name: 'Village Champion',
        description: "Humble beginnings. Your ancestors' prayers follow you.",
        effects: '+Anointing, +Family Support, -Cash',
        color: '#22c55e',
    },
    {
        id: 'Abroad' as const,
        emoji: 'youtube',
        fallback: '✈️',
        name: 'Returnee (Japa & Come Back)',
        description: 'You studied abroad and returned. Different perspective.',
        effects: '+Education, +Connections, -Cultural Understanding',
        color: '#a855f7',
    },
];

const BACKGROUNDS = [
    {
        id: 'Born_Again' as const,
        emoji: 'pray',
        fallback: '✝️',
        name: 'Born Again Since Childhood',
        description: 'Grew up in the church. You know all the hymns and politics.',
        effects: 'Starts with higher Anointing, knows church culture',
    },
    {
        id: 'Lukewarm' as const,
        emoji: 'rest',
        fallback: '😐',
        name: 'Sunday-Sunday Christian',
        description: 'You went to church... sometimes. Now you want more.',
        effects: 'Balanced start, can go either way',
    },
    {
        id: 'Hustler' as const,
        emoji: 'money',
        fallback: '💪',
        name: 'Former Street Hustler',
        description: "You've seen things. Now you want a new life... or new opportunities.",
        effects: 'Higher risk tolerance, knows how to make money',
    },
    {
        id: 'Genuine' as const,
        emoji: 'dove',
        fallback: '🙏',
        name: 'Genuine Seeker',
        description: 'You had a real encounter. Your faith is pure.',
        effects: 'High Anointing, but naive about church politics',
    },
];

const TUTORIAL_STEPS = [
    {
        emoji: 'gym',
        title: 'Your Stats',
        content: 'Health, Cash, Anointing, Fame, Scandal - keep them balanced!',
    },
    {
        emoji: 'crusade',
        title: 'Energy System',
        content: 'Every action costs energy. It resets each week when you Hold Service.',
    },
    {
        emoji: 'warfare',
        title: 'Make Choices Wisely',
        content: 'Every decision has consequences - some immediate, some weeks later...',
    },
    {
        emoji: 'land',
        title: 'Build Your Ministry',
        content: 'Grow members, upgrade venues, become the Daddy G.O.!',
    },
    {
        emoji: 'dove',
        title: 'Ready?',
        content: 'Your story begins now. May God be on your side.',
    },
];

export default function OnboardingFlow({ onComplete }: OnboardingProps) {
    const [step, setStep] = useState<OnboardingStep>('intro');
    const [introIndex, setIntroIndex] = useState(0);
    const [playerData, setPlayerData] = useState<Partial<PlayerSetupData>>({});
    const [tutorialStep, setTutorialStep] = useState(0);

    const handleIntroNext = () => {
        if (introIndex < INTRO_SLIDES.length - 1) {
            setIntroIndex(prev => prev + 1);
        } else {
            setStep('name');
        }
    };

    const handleNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = (form.elements.namedItem('playerName') as HTMLInputElement).value;
        if (name.trim()) {
            setPlayerData(prev => ({ ...prev, name: name.trim() }));
            setStep('origin');
        }
    };

    const handleOriginSelect = (origin: 'Lagos' | 'Village' | 'Abroad') => {
        setPlayerData(prev => ({ ...prev, origin }));
        setStep('background');
    };

    const handleBackgroundSelect = (background: 'Born_Again' | 'Lukewarm' | 'Hustler' | 'Genuine') => {
        setPlayerData(prev => ({ ...prev, background }));
        setStep('path');
    };

    const handlePathSelect = (startingPath: 'University' | 'Direct_Ministry') => {
        setPlayerData(prev => ({ ...prev, startingPath }));
        setStep('tutorial');
    };

    const handleTutorialComplete = () => {
        onComplete(playerData as PlayerSetupData);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${step === 'intro' ? '#581c87, #312e81' : '#166434, #22c55e'}, #000)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            zIndex: 9999,
            transition: 'background 0.5s ease',
        }}>
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '32px 24px',
                maxWidth: '420px',
                width: '100%',
                textAlign: 'center',
                color: 'white',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>

                {/* INTRO SLIDES */}
                {step === 'intro' && (
                    <div className="tab-content-enter" key={introIndex}>
                        <div className="float-animation" style={{ marginBottom: '20px' }}>
                            <ThreeDEmoji
                                icon={INTRO_SLIDES[introIndex].emoji}
                                fallback={INTRO_SLIDES[introIndex].fallback}
                                size={80}
                                animate
                            />
                        </div>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.02em' }}>
                            {INTRO_SLIDES[introIndex].title}
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '24px', lineHeight: 1.6 }}>
                            {INTRO_SLIDES[introIndex].text}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
                            {INTRO_SLIDES.map((_, i) => (
                                <div
                                    key={i}
                                    style={{
                                        width: i === introIndex ? '24px' : '8px',
                                        height: '8px',
                                        borderRadius: '4px',
                                        background: i === introIndex ? '#fbbf24' : 'rgba(255,255,255,0.3)',
                                        transition: 'all 0.3s ease',
                                    }}
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleIntroNext}
                            className="action-btn-primary"
                            style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}
                        >
                            {introIndex < INTRO_SLIDES.length - 1 ? 'Continue' : '🙏 Begin Journey'}
                        </button>
                    </div>
                )}

                {/* NAME INPUT */}
                {step === 'name' && (
                    <form onSubmit={handleNameSubmit} className="tab-content-enter">
                        <div className="float-animation" style={{ marginBottom: '20px' }}>
                            <ThreeDEmoji icon="testimony" fallback="✍️" size={64} animate />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px' }}>What is your name?</h2>
                        <input
                            name="playerName"
                            type="text"
                            placeholder="Enter your name..."
                            style={{
                                width: '100%',
                                padding: '16px 20px',
                                borderRadius: '14px',
                                background: 'rgba(255,255,255,0.15)',
                                border: '2px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: 600,
                                marginBottom: '20px',
                                outline: 'none',
                            }}
                            maxLength={20}
                            autoFocus
                        />
                        <button type="submit" className="action-btn-primary">
                            Continue
                        </button>
                    </form>
                )}

                {/* ORIGIN SELECTION */}
                {step === 'origin' && (
                    <div className="tab-content-enter">
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px' }}>Where are you from?</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {ORIGINS.map(origin => (
                                <button
                                    key={origin.id}
                                    onClick={() => handleOriginSelect(origin.id)}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        background: 'rgba(255,255,255,0.08)',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        color: 'white',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '14px',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <ThreeDEmoji icon={origin.emoji} fallback={origin.fallback} size={40} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '2px' }}>{origin.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>{origin.description}</div>
                                        <div style={{ fontSize: '0.6875rem', color: origin.color, marginTop: '4px', fontWeight: 600 }}>{origin.effects}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* BACKGROUND SELECTION */}
                {step === 'background' && (
                    <div className="tab-content-enter">
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px' }}>Your spiritual background?</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {BACKGROUNDS.map(bg => (
                                <button
                                    key={bg.id}
                                    onClick={() => handleBackgroundSelect(bg.id)}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        background: 'rgba(255,255,255,0.08)',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        color: 'white',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '14px',
                                    }}
                                >
                                    <ThreeDEmoji icon={bg.emoji} fallback={bg.fallback} size={36} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{bg.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>{bg.description}</div>
                                        <div style={{ fontSize: '0.6875rem', color: '#fbbf24', marginTop: '4px' }}>{bg.effects}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* STARTING PATH */}
                {step === 'path' && (
                    <div className="tab-content-enter">
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px' }}>How will you begin?</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <button
                                onClick={() => handlePathSelect('University')}
                                style={{
                                    width: '100%',
                                    padding: '24px',
                                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
                                    borderRadius: '20px',
                                    border: '2px solid rgba(59, 130, 246, 0.4)',
                                    color: 'white',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                }}
                            >
                                <ThreeDEmoji icon="bible" fallback="🎓" size={48} />
                                <div style={{ fontWeight: 800, fontSize: '1.125rem', marginTop: '12px' }}>University Path</div>
                                <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.8)', marginTop: '8px', lineHeight: 1.5 }}>
                                    Start as a 200L student. Balance studies with ministry. Slower start, but educational credentials.
                                </div>
                            </button>
                            <button
                                onClick={() => handlePathSelect('Direct_Ministry')}
                                style={{
                                    width: '100%',
                                    padding: '24px',
                                    background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.3), rgba(220, 38, 38, 0.3))',
                                    borderRadius: '20px',
                                    border: '2px solid rgba(234, 88, 12, 0.4)',
                                    color: 'white',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                }}
                            >
                                <ThreeDEmoji icon="hold_service" fallback="⛪" size={48} />
                                <div style={{ fontWeight: 800, fontSize: '1.125rem', marginTop: '12px' }}>Direct Ministry</div>
                                <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.8)', marginTop: '8px', lineHeight: 1.5 }}>
                                    Skip university. Full focus on ministry from day one. Faster rise, but no degree to fall back on.
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {/* TUTORIAL */}
                {step === 'tutorial' && (
                    <div className="tab-content-enter" key={tutorialStep}>
                        <div className="float-animation" style={{ marginBottom: '20px' }}>
                            <ThreeDEmoji
                                icon={TUTORIAL_STEPS[tutorialStep].emoji}
                                fallback="📖"
                                size={64}
                                animate
                            />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>
                            {TUTORIAL_STEPS[tutorialStep].title}
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '24px', lineHeight: 1.6 }}>
                            {TUTORIAL_STEPS[tutorialStep].content}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
                            {TUTORIAL_STEPS.map((_, i) => (
                                <div
                                    key={i}
                                    style={{
                                        width: i === tutorialStep ? '24px' : '8px',
                                        height: '8px',
                                        borderRadius: '4px',
                                        background: i === tutorialStep ? '#22c55e' : 'rgba(255,255,255,0.3)',
                                        transition: 'all 0.3s ease',
                                    }}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => {
                                if (tutorialStep < TUTORIAL_STEPS.length - 1) {
                                    setTutorialStep(prev => prev + 1);
                                } else {
                                    handleTutorialComplete();
                                }
                            }}
                            className="action-btn-primary"
                        >
                            {tutorialStep < TUTORIAL_STEPS.length - 1 ? 'Next' : '🙏 Start Your Journey'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
