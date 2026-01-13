/**
 * Toast Notification Component - Clean BitLife Style
 * 
 * Shows brief feedback messages when actions are performed.
 * Auto-dismisses after a few seconds.
 */

'use client';

import { useEffect } from 'react';

export interface ToastMessage {
    id: string;
    text: string;
    type: 'success' | 'warning' | 'info' | 'danger';
}

interface ToastProps {
    messages: ToastMessage[];
    onDismiss: (id: string) => void;
}

export default function Toast({ messages, onDismiss }: ToastProps) {
    // Auto-dismiss after 2.5 seconds
    useEffect(() => {
        messages.forEach((msg) => {
            const timer = setTimeout(() => {
                onDismiss(msg.id);
            }, 2500);
            return () => clearTimeout(timer);
        });
    }, [messages, onDismiss]);

    if (messages.length === 0) return null;

    return (
        <div className="toast-container">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`toast toast-${msg.type}`}
                    onClick={() => onDismiss(msg.id)}
                >
                    {msg.text}
                </div>
            ))}
        </div>
    );
}
