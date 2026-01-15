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
        <div style={{
            position: 'fixed',
            top: '16px',
            right: '16px',
            width: '320px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            pointerEvents: 'none'
        }}>
            {/* Dismiss All button */}
            {notifications.length > 1 && (
                <button
                    onClick={dismissAll}
                    style={{
                        pointerEvents: 'auto',
                        alignSelf: 'flex-end',
                        background: 'rgba(0,0,0,0.8)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    Dismiss All ({notifications.length})
                </button>
            )}
            {notifications.map(note => (
                <div
                    key={note.id}
                    style={{
                        pointerEvents: 'auto',
                        background: 'rgba(17, 17, 24, 0.95)',
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                        borderRadius: '12px',
                        padding: '16px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <ThreeDEmoji icon={note.icon} fallback={note.fallbackIcon} size={40} animate={true} />
                        <div style={{ flex: 1 }}>
                            <h4 style={{ fontWeight: 700, color: '#f8fafc', fontSize: '13px', marginBottom: '4px' }}>{note.title}</h4>
                            <p style={{ color: '#94a3b8', fontSize: '12px', lineHeight: 1.4, marginBottom: '12px' }}>{note.message}</p>

                            {(note.action || note.secondaryAction) && (
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {note.action && (
                                        <button
                                            onClick={note.action.onClick}
                                            style={{
                                                padding: '6px 12px',
                                                background: '#3b82f6',
                                                color: '#fff',
                                                fontSize: '11px',
                                                fontWeight: 700,
                                                borderRadius: '6px',
                                                border: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {note.action.label}
                                        </button>
                                    )}
                                    {note.secondaryAction && (
                                        <button
                                            onClick={note.secondaryAction.onClick}
                                            style={{
                                                padding: '6px 12px',
                                                background: 'rgba(255,255,255,0.1)',
                                                color: '#94a3b8',
                                                fontSize: '11px',
                                                fontWeight: 700,
                                                borderRadius: '6px',
                                                border: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {note.secondaryAction.label}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => dismissNotification(note.id)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#64748b',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
