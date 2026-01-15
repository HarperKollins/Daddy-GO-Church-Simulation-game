'use client';

/**
 * Onboarding Flow Component
 * 
 * First-time player experience with:
 * - Cinematic intro
 * - Character creation
 * - Tutorial walkthrough
 */

import React, { useState } from 'react';

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
        emoji: '⛪',
        title: 'Welcome to Nigeria',
        text: 'A land of faith, hustle, and unlimited possibilities...',
    },
    {
        emoji: '🙏',
        title: 'The Year is 2026',
        text: 'You are a 200-level university student with a burning desire to preach...',
    },
    {
        emoji: '💭',
        title: 'Your Journey Begins',
        text: 'Will you become a true man of God? Or will power corrupt you?',
    },
    {
        emoji: '⚠️',
        title: 'Every Choice Matters',
        text: 'Your decisions will echo through generations. Choose wisely.',
    },
];

const ORIGINS = [
    {
        id: 'Lagos' as const,
        emoji: '🏙️',
        name: 'Lagos Boy/Girl',
        description: 'Street-smart, hustler mentality. You know how the city works.',
        effects: '+Charisma, +Hustle, -Anointing',
    },
    {
        id: 'Village' as const,
        emoji: '🏘️',
        name: 'Village Champion',
        description: 'Humble beginnings. Your ancestors\' prayers follow you.',
        effects: '+Anointing, +Family Support, -Cash',
    },
    {
        id: 'Abroad' as const,
        emoji: '✈️',
        name: 'Returnee (Japa & Come Back)',
        description: 'You studied abroad and returned. Different perspective.',
        effects: '+Education, +Connections, -Cultural Understanding',
    },
];

const BACKGROUNDS = [
    {
        id: 'Born_Again' as const,
        emoji: '✝️',
        name: 'Born Again Since Childhood',
        description: 'Grew up in the church. You know all the hymns and politics.',
        effects: 'Starts with higher Anointing, knows church culture',
    },
    {
        id: 'Lukewarm' as const,
        emoji: '😐',
        name: 'Sunday-Sunday Christian',
        description: 'You went to church... sometimes. Now you want more.',
        effects: 'Balanced start, can go either way',
    },
    {
        id: 'Hustler' as const,
        emoji: '💪',
        name: 'Former Street Hustler',
        description: 'You\'ve seen things. Now you want a new life... or new opportunities.',
        effects: 'Higher risk tolerance, knows how to make money',
    },
    {
        id: 'Genuine' as const,
        emoji: '🙏',
        name: 'Genuine Seeker',
        description: 'You had a real encounter. Your faith is pure.',
        effects: 'High Anointing, but naive about church politics',
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

    const TUTORIAL_STEPS = [
        {
            title: 'Your Stats',
            content: 'Health, Cash, Anointing, Fame, Scandal - keep them balanced or face consequences!',
        },
        {
            title: 'Energy System',
            content: 'Every action costs energy. It resets each week when you Hold Service.',
        },
        {
            title: 'Make Choices Wisely',
            content: 'Every decision has consequences - some immediate, some weeks later...',
        },
        {
            title: 'Build Your Ministry',
            content: 'Grow members, upgrade venues, become the Daddy G.O. you were meant to be!',
        },
        {
            title: 'Ready?',
            content: 'Your story begins now. May God - or luck - be on your side.',
        },
    ];

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom right, #581c87, #312e81, #000)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            zIndex: 9999,
        }}>
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '32px',
                maxWidth: '448px',
                width: '100%',
                textAlign: 'center' as const,
                color: 'white',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}>

                {/* INTRO SLIDES */}
                {step === 'intro' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="text-6xl mb-4">{INTRO_SLIDES[introIndex].emoji}</div>
                        <h2 className="text-2xl font-bold">{INTRO_SLIDES[introIndex].title}</h2>
                        <p className="text-white/80">{INTRO_SLIDES[introIndex].text}</p>
                        <div className="flex justify-center gap-2 my-4">
                            {INTRO_SLIDES.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${i === introIndex ? 'bg-yellow-400' : 'bg-white/30'}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleIntroNext}
                            className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition"
                        >
                            {introIndex < INTRO_SLIDES.length - 1 ? 'Continue' : 'Begin Journey'}
                        </button>
                    </div>
                )}

                {/* NAME INPUT */}
                {step === 'name' && (
                    <form onSubmit={handleNameSubmit} className="space-y-6">
                        <div className="text-5xl">✍️</div>
                        <h2 className="text-2xl font-bold">What is your name?</h2>
                        <input
                            name="playerName"
                            type="text"
                            placeholder="Enter your name..."
                            className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            maxLength={20}
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition"
                        >
                            Continue
                        </button>
                    </form>
                )}

                {/* ORIGIN SELECTION */}
                {step === 'origin' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-6">Where are you from?</h2>
                        {ORIGINS.map(origin => (
                            <button
                                key={origin.id}
                                onClick={() => handleOriginSelect(origin.id)}
                                className="w-full p-4 bg-white/10 rounded-xl text-left hover:bg-white/20 transition border border-white/20"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{origin.emoji}</span>
                                    <div>
                                        <div className="font-bold">{origin.name}</div>
                                        <div className="text-sm text-white/70">{origin.description}</div>
                                        <div className="text-xs text-yellow-400 mt-1">{origin.effects}</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* BACKGROUND SELECTION */}
                {step === 'background' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-6">Your spiritual background?</h2>
                        {BACKGROUNDS.map(bg => (
                            <button
                                key={bg.id}
                                onClick={() => handleBackgroundSelect(bg.id)}
                                className="w-full p-4 bg-white/10 rounded-xl text-left hover:bg-white/20 transition border border-white/20"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{bg.emoji}</span>
                                    <div>
                                        <div className="font-bold">{bg.name}</div>
                                        <div className="text-sm text-white/70">{bg.description}</div>
                                        <div className="text-xs text-yellow-400 mt-1">{bg.effects}</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* STARTING PATH */}
                {step === 'path' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">How will you begin?</h2>
                        <div className="space-y-4">
                            <button
                                onClick={() => handlePathSelect('University')}
                                className="w-full p-6 bg-gradient-to-r from-blue-600/50 to-purple-600/50 rounded-xl text-left hover:from-blue-600/70 hover:to-purple-600/70 transition border border-white/20"
                            >
                                <div className="text-3xl mb-2">🎓</div>
                                <div className="font-bold text-lg">University Path</div>
                                <div className="text-sm text-white/70">
                                    Start as a 200L student. Balance studies with ministry.
                                    Slower start, but educational credentials.
                                </div>
                            </button>
                            <button
                                onClick={() => handlePathSelect('Direct_Ministry')}
                                className="w-full p-6 bg-gradient-to-r from-orange-600/50 to-red-600/50 rounded-xl text-left hover:from-orange-600/70 hover:to-red-600/70 transition border border-white/20"
                            >
                                <div className="text-3xl mb-2">⛪</div>
                                <div className="font-bold text-lg">Direct Ministry</div>
                                <div className="text-sm text-white/70">
                                    Skip university. Full focus on ministry from day one.
                                    Faster rise, but no degree to fall back on.
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {/* TUTORIAL */}
                {step === 'tutorial' && (
                    <div className="space-y-6">
                        <div className="text-5xl">📖</div>
                        <h2 className="text-2xl font-bold">{TUTORIAL_STEPS[tutorialStep].title}</h2>
                        <p className="text-white/80">{TUTORIAL_STEPS[tutorialStep].content}</p>
                        <div className="flex justify-center gap-2 my-4">
                            {TUTORIAL_STEPS.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${i === tutorialStep ? 'bg-yellow-400' : 'bg-white/30'}`}
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
                            className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition"
                        >
                            {tutorialStep < TUTORIAL_STEPS.length - 1 ? 'Next' : '🙏 Start Your Journey'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
