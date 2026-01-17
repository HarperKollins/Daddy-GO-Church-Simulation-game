/**
 * DropoutModal Component
 * 
 * Allows students to drop out early and unlock all venues immediately
 * But with permanent penalties: scandal spike, lower max anointing
 */

'use client';

import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface DropoutModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function DropoutModal({ isOpen, onConfirm, onCancel }: DropoutModalProps) {
    if (!isOpen) return null;

    return (
        <Modal isOpen={true} onClose={onCancel} title="⚠️ Drop Out of University?">
            <div className="space-y-6">
                <p className="text-text-secondary leading-relaxed">
                    You're thinking about quitting school to focus 100% on ministry...
                </p>

                <Card className="bg-danger/10 border-danger/30 p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">⚠️</span>
                        <h4 className="font-bold text-danger text-sm">PERMANENT CONSEQUENCES:</h4>
                    </div>
                    <ul className="text-sm space-y-2 text-text-secondary list-disc pl-5">
                        <li><span className="text-danger font-bold">+30 Scandal</span> (family disappointment)</li>
                        <li><span className="text-danger font-bold">-20 Max Anointing</span> (forever)</li>
                        <li>"Dropout" tag (stigma in City)</li>
                        <li>No graduation ceremony</li>
                    </ul>
                </Card>

                <Card className="bg-success/10 border-success/30 p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">✅</span>
                        <h4 className="font-bold text-success text-sm">BENEFITS:</h4>
                    </div>
                    <ul className="text-sm space-y-2 text-text-secondary list-disc pl-5">
                        <li>Unlock ALL venues immediately</li>
                        <li>100 energy/week (no school stress)</li>
                        <li>Start in Village (cheap rent)</li>
                        <li>Focus full-time on ministry</li>
                    </ul>
                </Card>

                <div className="flex gap-3 pt-2">
                    <Button
                        variant="secondary"
                        size="lg"
                        className="flex-1"
                        onClick={onCancel}
                    >
                        Stay in School
                    </Button>
                    <Button
                        variant="destructive"
                        size="lg"
                        className="flex-1 font-bold shadow-lg shadow-danger/20"
                        onClick={onConfirm}
                    >
                        Drop Out
                    </Button>
                </div>

                <p className="text-[10px] text-text-muted text-center italic">
                    "My parents didn't suffer for this..." - Your mom, probably
                </p>
            </div>
        </Modal>
    );
}
