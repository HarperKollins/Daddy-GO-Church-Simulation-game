/**
 * Toast Notification Component - Clean BitLife Style
 * 
 * Shows brief feedback messages when actions are performed.
 * Auto-dismisses after a few seconds.
 */

'use client';

import { useEffect } from 'react';
import { Badge } from '@/components/ui/Badge';

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
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center w-full max-w-[300px] pointer-events-none">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    onClick={() => onDismiss(msg.id)}
                    className="pointer-events-auto animate-in slide-in-from-bottom-2 fade-in"
                >
                    <Badge
                        variant={msg.type === 'danger' ? 'destructive' : msg.type === 'info' ? 'secondary' : msg.type === 'warning' ? 'warning' : 'success'}
                        className="py-2 px-4 shadow-lg text-sm bg-opacity-95 backdrop-blur font-bold border-border-prominent cursor-pointer"
                    >
                        {msg.text}
                    </Badge>
                </div>
            ))}
        </div>
    );
}
