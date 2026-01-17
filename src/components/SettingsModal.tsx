import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onHowToPlay?: () => void;
}

export default function SettingsModal({ isOpen, onClose, onHowToPlay }: SettingsModalProps) {
    const store = useGameStore();
    const [confirmReset, setConfirmReset] = useState(false);

    if (!isOpen) return null;

    const handleReset = () => {
        if (confirmReset) {
            store.resetGame();
            window.location.reload(); // Hard reload to ensure clean state
        } else {
            setConfirmReset(true);
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Settings" className="max-w-sm">
            <div className="space-y-6">
                <Card className="p-4 bg-surface space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-text-secondary font-medium">Game Version</span>
                        <span className="text-text-primary font-bold">v2.0 (Daddy G.O.)</span>
                    </div>
                    <div className="w-full h-px bg-border-subtle" />
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-text-secondary font-medium">Developer</span>
                        <span className="text-text-primary font-bold">Harper Kollins AI</span>
                    </div>
                </Card>

                {onHowToPlay && (
                    <Button
                        variant="secondary"
                        className="w-full justify-center gap-2"
                        onClick={() => {
                            onHowToPlay();
                            onClose();
                        }}
                    >
                        <span>❓</span> How to Play
                    </Button>
                )}

                <div className="pt-4 border-t border-border-subtle">
                    <h3 className="text-danger font-bold text-sm mb-3 flex items-center gap-2">
                        <span>☠️</span> Danger Zone
                    </h3>

                    {!confirmReset ? (
                        <Button
                            variant="destructive"
                            className="w-full"
                            onClick={handleReset}
                        >
                            Start New Game
                        </Button>
                    ) : (
                        <div className="flex gap-2 animate-in fade-in slide-in-from-bottom-2">
                            <Button
                                variant="destructive"
                                className="flex-1 font-bold"
                                onClick={handleReset}
                            >
                                Confirm Reset?
                            </Button>
                            <Button
                                variant="secondary"
                                className="flex-1"
                                onClick={() => setConfirmReset(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    )}
                    <p className="text-[10px] text-text-muted mt-2 text-center">
                        This will permanently wipe all progress.
                    </p>
                </div>
            </div>
        </Modal>
    );
}
