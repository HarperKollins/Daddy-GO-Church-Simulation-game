'use client';

/**
 * How To Play Modal - Re-usable Tutorial Component
 * 
 * Can be opened from Settings at any time for players
 * who want to review the game mechanics.
 */

import React, { useState } from 'react';
import ThreeDEmoji from './ThreeDEmoji';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

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
        color: 'from-purple-500 to-indigo-600',
    },
    {
        emoji: 'gym',
        fallback: '📊',
        title: 'Your Stats',
        text: '❤️ HEALTH - Your physical wellbeing (don\'t let it reach 0!)\n💵 CASH - Personal & Church money\n✨ ANOINTING - Your spiritual power\n⭐ FAME - How well-known you are\n🔥 SCANDAL - Your reputation risk (keep it low!)',
        color: 'from-pink-500 to-rose-600',
    },
    {
        emoji: 'hold_service',
        fallback: '⚡',
        title: 'Energy System',
        text: 'Every action costs ENERGY. You have limited energy each week. Tap "Hold Sunday Service" or "Next Week" to advance time and reset your energy. Plan your actions wisely!',
        color: 'from-amber-400 to-yellow-600',
    },
    {
        emoji: 'warfare',
        fallback: '🎲',
        title: 'Events & Choices',
        text: 'Random events will appear - opportunities, scandals, blessings, and tests. Read the options carefully! Some consequences are immediate, others may come back weeks later...',
        color: 'from-teal-400 to-emerald-600',
    },
    {
        emoji: 'land',
        fallback: '🏛️',
        title: 'Building Your Empire',
        text: 'Grow members → Collect tithes → Upgrade venue → Attract more members! Buy cars, houses, land. Train your skills. Find a wife. Build your LEGACY from bus stop to mega-church!',
        color: 'from-indigo-400 to-blue-600',
    },
    {
        emoji: 'dove',
        fallback: '🙏',
        title: 'Tips for Success',
        text: '• Hold Sunday Service regularly for tithes\n• Keep Health and Anointing high\n• Watch your Scandal level\n• Train skills to unlock opportunities\n• Make choices that fit YOUR story!',
        color: 'from-green-400 to-emerald-600',
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
        <Modal isOpen={true} onClose={handleClose} title={`HOW TO PLAY (${currentSlide + 1}/${TUTORIAL_SLIDES.length})`}>
            <div className="flex flex-col items-center text-center space-y-6 animate-in slide-in-from-right-4 duration-300 key={currentSlide}">

                {/* Visual */}
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${slide.color} flex items-center justify-center shadow-xl shadow-white/5`}>
                    <ThreeDEmoji
                        icon={slide.emoji}
                        fallback={slide.fallback}
                        size={48}
                        animate
                    />
                </div>

                {/* Content */}
                <div>
                    <h2 className="text-xl font-black text-text-primary mb-3 uppercase tracking-wide">
                        {slide.title}
                    </h2>
                    <Card className="bg-surface/50 border-border-subtle p-4">
                        <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line text-left">
                            {slide.text}
                        </p>
                    </Card>
                </div>

                {/* Progress Dots */}
                <div className="flex gap-2">
                    {TUTORIAL_SLIDES.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? `w-6 bg-gradient-to-r ${slide.color}` : 'w-1.5 bg-border-subtle'
                                }`}
                        />
                    ))}
                </div>

                {/* Action */}
                <Button
                    size="lg"
                    className={`w-full font-bold bg-gradient-to-r ${slide.color} border-none shadow-lg`}
                    onClick={handleNext}
                >
                    {isLastSlide ? 'Let\'s Go!' : 'Next'}
                </Button>
            </div>
        </Modal>
    );
}
