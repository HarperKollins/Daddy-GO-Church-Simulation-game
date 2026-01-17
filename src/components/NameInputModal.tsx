/**
 * Name Input Modal - Clean BitLife-Style Design
 * 
 * Appears at the start of the game to let the player choose their name.
 * Professional, minimal design without emojis.
 */

'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface NameInputModalProps {
    onConfirm: (name: string) => void;
}

export default function NameInputModal({ onConfirm }: NameInputModalProps) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Please enter a name, Pastor!');
            return;
        }
        if (name.length > 20) {
            setError('Name is too long (max 20 chars).');
            return;
        }
        onConfirm(name.trim());
    };

    return (
        <Modal isOpen={true} onClose={() => { }} title="Welcome, Man of God">
            <div className="flex flex-col items-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-brand/20">
                    DG
                </div>

                <div className="text-center space-y-2">
                    <p className="text-text-secondary text-sm">
                        What should the congregation call you?
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="text"
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setName(e.target.value);
                                setError('');
                            }}
                            placeholder="e.g. Pastor David"
                            autoFocus
                            className="bg-surface text-center font-bold text-lg h-12 text-text-primary border-border-prominent focus:border-brand"
                        />
                        {error && (
                            <p className="text-danger text-xs text-center font-bold animate-in fade-in slide-in-from-top-1">
                                {error}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full font-bold"
                    >
                        Start Ministry
                    </Button>
                </form>
            </div>
        </Modal>
    );
}
