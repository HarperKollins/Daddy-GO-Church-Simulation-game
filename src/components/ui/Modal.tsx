'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function Modal({ isOpen, onClose, title, children, className = '' }: ModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="absolute inset-0" onClick={onClose} />
            <Card className={`relative w-full max-w-lg max-h-[85vh] flex flex-col bg-app border-t border-x border-border-prominent sm:border shadow-2xl animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-300 rounded-t-2xl rounded-b-none sm:rounded-xl ${className}`}>
                <div className="flex items-center justify-between p-4 border-b border-border-subtle bg-surface/50 backdrop-blur-md sticky top-0 z-10">
                    <h2 className="text-lg font-bold text-text-primary capitalize">{title}</h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-8 w-8 rounded-full hover:bg-surface-hover"
                    >
                        ✕
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {children}
                </div>
            </Card>
        </div>,
        document.body
    );
}
