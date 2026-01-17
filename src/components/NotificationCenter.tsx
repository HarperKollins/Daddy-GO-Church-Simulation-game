'use client';

import React, { useEffect, useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { createAudioManager } from '@/engine/audioManager';
import ThreeDEmoji from './ThreeDEmoji';
import type { OwambeEvent } from '@/types/game';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Notification Types
interface Notification {
    id: string;
    type: 'owambe' | 'message' | 'alert' | 'success';
    title: string;
    message: string;
    icon: string;
    fallbackIcon: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    secondaryAction?: {
        label: string;
        onClick: () => void;
    };
    duration?: number; // Auto dismiss
}

export default function NotificationCenter() {
    const { engine, stats, modifyStat, week } = useGameStore();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [audioManager] = useState(() => createAudioManager());

    // Track seen events to avoid duplicates
    const [seenOwambes, setSeenOwambes] = useState<Set<string>>(new Set());

    // Effect: Listen for new Owambe invitations - LIMITED to prevent spam
    useEffect(() => {
        const upcoming = engine.realism?.upcomingOwambes || [];

        // Only show the most recent invitation if not already seen
        const latestEvent = upcoming[upcoming.length - 1];

        if (latestEvent && !seenOwambes.has(latestEvent.id) && notifications.length < 3) {
            // New Owambe!
            addNotification({
                id: latestEvent.id,
                type: 'owambe',
                title: `✉️ Invitation: ${latestEvent.type}`,
                message: `${latestEvent.host} is inviting you to their ${latestEvent.type} in ${latestEvent.venue}.`,
                icon: 'party',
                fallbackIcon: '🎉',
                action: {
                    label: 'Attend (₦50k)',
                    onClick: () => handleAttendOwambe(latestEvent)
                },
                secondaryAction: {
                    label: 'Decline',
                    onClick: () => dismissNotification(latestEvent.id)
                }
            });
            setSeenOwambes(prev => new Set(prev).add(latestEvent.id));
            audioManager.playEffect('UI_NOTIFICATION');
        }
    }, [engine.realism?.upcomingOwambes?.length, seenOwambes, audioManager, notifications.length]);

    // Handlers
    const addNotification = (note: Notification) => {
        setNotifications(prev => {
            // Limit to 3 notifications max
            const updated = [note, ...prev].slice(0, 3);
            return updated;
        });
        // Auto dismiss ALL notifications after some time
        const dismissTime = note.type === 'owambe' ? 15000 : 5000;
        setTimeout(() => {
            dismissNotification(note.id);
        }, dismissTime);
    };

    const dismissAll = () => {
        setNotifications([]);
    };

    const dismissNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleAttendOwambe = (event: OwambeEvent) => {
        const cost = 50000; // Gift + Outfit
        if (stats.personalCash < cost) {
            addNotification({
                id: `err_${Date.now()}`,
                type: 'alert',
                title: 'Too Broke!',
                message: "You cannot afford the aso-ebi for this event.",
                icon: 'money',
                fallbackIcon: '💸'
            });
            audioManager.playEffect('UI_ERROR');
            return;
        }

        modifyStat('personalCash', -cost);
        const fameGain = event.networkingPotential * 10;
        modifyStat('fame', fameGain);
        modifyStat('stress', -100);
        modifyStat('health', -50); // Party hard

        // Remove from store (in real logic we'd dispatch an action)
        // For now just UI feedback
        audioManager.playEffect('UI_SUCCESS');
        audioManager.playVoice('VOICE_SOMEBODY');
        dismissNotification(event.id);

        addNotification({
            id: `success_${Date.now()}`,
            type: 'success',
            title: 'Party Scatter!',
            message: `You attended the ${event.type}. The jollof was top notch! (+${event.networkingPotential * 10} Fame)`,
            icon: 'party',
            fallbackIcon: '🕺'
        });
    };

    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 w-80 z-[9999] flex flex-col gap-3 pointer-events-none">
            {/* Dismiss All button */}
            {notifications.length > 1 && (
                <Button
                    onClick={dismissAll}
                    variant="ghost"
                    size="sm"
                    className="pointer-events-auto self-end bg-black/80 text-white hover:bg-black/60 h-7 text-[10px] font-bold"
                >
                    Dismiss All ({notifications.length})
                </Button>
            )}
            {notifications.map(note => (
                <Card
                    key={note.id}
                    className="pointer-events-auto bg-surface/95 backdrop-blur-md shadow-2xl border-border-prominent p-4 animate-in slide-in-from-right-full fade-in duration-300"
                >
                    <div className="flex gap-3 items-start">
                        <ThreeDEmoji icon={note.icon} fallback={note.fallbackIcon} size={40} animate={true} />
                        <div className="flex-1">
                            <h4 className="font-bold text-text-primary text-[13px] mb-1">{note.title}</h4>
                            <p className="text-text-secondary text-xs leading-relaxed mb-3">{note.message}</p>

                            {(note.action || note.secondaryAction) && (
                                <div className="flex gap-2">
                                    {note.action && (
                                        <Button
                                            onClick={note.action.onClick}
                                            size="sm"
                                            className="h-7 text-[11px] font-bold"
                                        >
                                            {note.action.label}
                                        </Button>
                                    )}
                                    {note.secondaryAction && (
                                        <Button
                                            onClick={note.secondaryAction.onClick}
                                            variant="secondary"
                                            size="sm"
                                            className="h-7 text-[11px] font-bold"
                                        >
                                            {note.secondaryAction.label}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => dismissNotification(note.id)}
                            className="h-6 w-6 text-text-muted hover:text-text-primary rounded-full -mt-2 -mr-2"
                        >
                            ✕
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
}
