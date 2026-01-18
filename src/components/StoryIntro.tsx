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
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

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
        section: 'ABOUT THE GAME'
    },
    {
        emoji: 'bible',
        fallback: '📖',
        title: 'What is a Simulation Game?',
        subtitle: 'Your Choices, Your Story',
        text: 'In a simulation, YOU control the character. Every decision you make - good or bad - shapes your story. There is no "winning" or "losing", only the journey YOU create.',
        gradient: 'linear-gradient(135deg, #0ea5e9, #3b82f6, #1e3a5f)',
        highlight: '#60a5fa',
        section: 'ABOUT THE GAME'
    },
    {
        emoji: 'crusade',
        fallback: '🎤',
        title: 'Your Mission',
        subtitle: 'Rise from Nothing to Everything',
        text: 'You play as a young Nigerian aspiring to build a church empire. Start small - preaching at bus stops. Dream big - become a Daddy G.O. with a mega-church!',
        gradient: 'linear-gradient(135deg, #10b981, #059669, #064e3b)',
        highlight: '#34d399',
        section: 'ABOUT THE GAME'
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
        section: 'THE SETTING'
    },
    {
        emoji: 'controversy',
        fallback: '⚖️',
        title: 'Every Choice Has Consequences',
        subtitle: 'The Path is Yours',
        text: 'Preach truth or prophecy-for-profit? Stay faithful or have side chicks? Build genuine ministry or siphon funds? Your choices echo through your entire journey.',
        gradient: 'linear-gradient(135deg, #ef4444, #dc2626, #7f1d1d)',
        highlight: '#f87171',
        section: 'THE SETTING'
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
        section: 'HOW TO PLAY'
    },
    {
        emoji: 'brain',
        fallback: '😫',
        title: 'Stress & Health',
        subtitle: 'Don\'t Burn Out!',
        text: 'Managing your church empire is stressful. High stress damages your health. If your HEALTH drops to zero, you die. Use rest and relaxation to keep your stress low.',
        gradient: 'linear-gradient(135deg, #ef4444, #b91c1c, #991b1b)',
        highlight: '#f87171',
        section: 'HOW TO PLAY'
    },
    {
        emoji: 'warfare',
        fallback: '🎲',
        title: 'Random Events',
        subtitle: 'Life is Unpredictable',
        text: 'Random events will pop up - opportunities, scandals, blessings, and tests. Read carefully and choose wisely. Some consequences are immediate, others hit you weeks later...',
        gradient: 'linear-gradient(135deg, #14b8a6, #0d9488, #134e4a)',
        highlight: '#2dd4bf',
        section: 'HOW TO PLAY'
    },
    {
        emoji: 'land',
        fallback: '🏛️',
        title: 'Build Your Empire',
        subtitle: 'From Bus Stop to Stadium',
        text: 'Grow your church members → Collect tithes → Upgrade your venue → Attract more members. Buy assets, invest in crypto, train your skills, find a wife. Build your LEGACY!',
        gradient: 'linear-gradient(135deg, #6366f1, #4f46e5, #312e81)',
        highlight: '#818cf8',
        section: 'HOW TO PLAY'
    },
    {
        emoji: 'dove',
        fallback: '🙏',
        title: 'Are You Ready?',
        subtitle: 'Your Destiny Awaits',
        text: 'Remember: This is YOUR story. There is no right or wrong way to play. Be a saint or a sinner. Build genuine ministry or chase wealth. The choice... is YOURS.',
        gradient: 'linear-gradient(135deg, #22c55e, #16a34a, #14532d)',
        highlight: '#4ade80',
        section: 'HOW TO PLAY'
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

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 transition-all duration-500 ease-in-out ${isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
            style={{ background: slide.gradient }}
        >
            {/* Skip Button */}
            <Button
                variant="ghost"
                onClick={(e) => { e.stopPropagation(); handleSkip(); }}
                className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 text-white border-none rounded-full backdrop-blur-md"
                size="sm"
            >
                Skip →
            </Button>

            {/* Section Badge */}
            <div className="absolute top-5 left-5">
                <Badge
                    variant="default"
                    className="bg-white/90 text-black shadow-lg font-bold tracking-widest text-[10px]"
                    style={{ backgroundColor: slide.highlight }}
                >
                    {slide.section}
                </Badge>
            </div>

            {/* Main Content Card */}
            <Card
                key={currentSlide}
                className="w-full max-w-md bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl p-8 flex flex-col items-center text-center text-white animate-in zoom-in-95 duration-300"
            >
                {/* Emoji */}
                <div className="mb-6 float-animation">
                    <ThreeDEmoji
                        icon={slide.emoji}
                        fallback={slide.fallback}
                        size={80}
                        animate
                    />
                </div>

                {/* Title */}
                <h1 className="text-2xl font-black mb-2 leading-tight tracking-tight">
                    {slide.title}
                </h1>

                {/* Subtitle */}
                <div
                    className="text-sm font-bold uppercase tracking-widest mb-6"
                    style={{ color: slide.highlight }}
                >
                    {slide.subtitle}
                </div>

                {/* Text */}
                <p className="text-white/90 text-sm leading-relaxed whitespace-pre-line mb-8">
                    {slide.text}
                </p>

                {/* Progress Indicators */}
                <div className="flex gap-2 mb-8 flex-wrap justify-center">
                    {STORY_SLIDES.map((_, i) => (
                        <div
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setCurrentSlide(i); }}
                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === currentSlide ? 'w-6' : 'w-2 bg-white/30'
                                }`}
                            style={{ backgroundColor: i === currentSlide ? slide.highlight : undefined }}
                        />
                    ))}
                </div>

                {/* Count */}
                <div className="text-xs text-white/50 mb-6 font-mono">
                    {currentSlide + 1} / {STORY_SLIDES.length}
                </div>

                {/* Action Button */}
                <Button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="w-full h-14 text-lg font-black rounded-2xl shadow-xl transition-transform active:scale-95"
                    style={{
                        background: isLastSlide
                            ? `linear-gradient(135deg, ${slide.highlight}, #fff)`
                            : `linear-gradient(135deg, ${slide.highlight}dd, ${slide.highlight})`,
                        color: '#000'
                    }}
                >
                    {isLastSlide ? '🙏 Begin My Journey' : 'Continue →'}
                </Button>
            </Card>

            {/* Tap hint */}
            <div className="absolute bottom-8 text-white/40 text-xs font-medium animate-pulse">
                Tap anywhere to continue
            </div>

            {/* Click overlay */}
            <div
                className="absolute inset-0 z-[-1]"
                onClick={() => handleNext()}
            />
        </div>
    );
}
