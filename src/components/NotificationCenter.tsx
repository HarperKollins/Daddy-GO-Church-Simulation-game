'use client';

import React, { useEffect, useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { createAudioManager } from '@/engine/audioManager';
import ThreeDEmoji from './ThreeDEmoji';
import type { OwambeEvent } from '@/types/game';

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

    // Effect: Listen for new Owambe invitations
    useEffect(() => {
        const upcoming = engine.realism?.upcomingOwambes || [];

        upcoming.forEach(event => {
            if (!seenOwambes.has(event.id)) {
                // New Owambe!
                addNotification({
                    id: event.id,
                    type: 'owambe',
                    title: `✉️ Invitation: ${event.type}`,
                    message: `${event.host} is inviting you to their ${event.type} in ${event.venue}.`,
                    icon: 'party', // we need to add this to 3D map or use fallback
                    fallbackIcon: '🎉',
                    action: {
                        label: 'Attend (₦50k)',
                        onClick: () => handleAttendOwambe(event)
                    },
                    secondaryAction: {
                        label: 'Decline',
                        onClick: () => dismissNotification(event.id)
                    }
                });
                setSeenOwambes(prev => new Set(prev).add(event.id));
                audioManager.playEffect('UI_NOTIFICATION');
            }
        });
    }, [engine.realism?.upcomingOwambes, seenOwambes, audioManager]);

    // Handlers
    const addNotification = (note: Notification) => {
        setNotifications(prev => [note, ...prev]);
        // Auto dismiss simple alerts
        if (note.type === 'alert' || note.type === 'success') {
            setTimeout(() => {
                dismissNotification(note.id);
            }, 5000);
        }
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
        <div className="fixed top-4 right-4 w-96 z-50 flex flex-col gap-3 pointer-events-none">
            {notifications.map(note => (
                <div
                    key={note.id}
                    className="bg-white/95 backdrop-blur-md shadow-2xl rounded-xl p-4 border border-white/20 pointer-events-auto transform transition-all animate-slide-in hover:scale-[1.02]"
                >
                    <div className="flex gap-4 items-start">
                        <ThreeDEmoji icon={note.icon} fallback={note.fallbackIcon} size={40} animate={true} />
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-sm mb-1">{note.title}</h4>
                            <p className="text-gray-600 text-xs leading-relaxed mb-3">{note.message}</p>

                            {(note.action || note.secondaryAction) && (
                                <div className="flex gap-2">
                                    {note.action && (
                                        <button
                                            onClick={note.action.onClick}
                                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition shadow-sm"
                                        >
                                            {note.action.label}
                                        </button>
                                    )}
                                    {note.secondaryAction && (
                                        <button
                                            onClick={note.secondaryAction.onClick}
                                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded-lg transition"
                                        >
                                            {note.secondaryAction.label}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => dismissNotification(note.id)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
