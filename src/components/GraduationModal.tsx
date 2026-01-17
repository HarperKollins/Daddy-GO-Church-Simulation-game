/**
 * GraduationModal Component
 * 
 * Triggered at graduation (week 208 / end of 400L)
 * Player chooses between Village ministry (hard mode) or City ministry (expensive mode)
 */

'use client';

import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface GraduationModalProps {
    isOpen: boolean;
    onChoosePath: (location: 'Village' | 'City') => void;
}

export default function GraduationModal({ isOpen, onChoosePath }: GraduationModalProps) {
    if (!isOpen) return null;

    return (
        <Modal isOpen={true} onClose={() => { }} title="🎓 Graduation Day!">
            <div className="space-y-6">
                <p className="text-text-secondary leading-relaxed">
                    After 4 years of juggling studies and ministry, you've finally graduated!
                    You're now a <strong className="text-text-primary">certified Man of God</strong> with a degree to prove it.
                </p>

                <p className="font-bold text-amber-400 text-sm">
                    ✨ Where will you take your ministry?
                </p>

                <div className="space-y-4">
                    {/* Village Path */}
                    <Card
                        className="group relative overflow-hidden cursor-pointer hover:border-emerald-500 transition-all duration-300"
                        onClick={() => onChoosePath('Village')}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent group-hover:from-emerald-500/20 transition-all" />
                        <div className="p-4 relative flex flex-col items-start gap-2">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">🌾</span>
                                <div>
                                    <h3 className="font-bold text-lg text-text-primary">THE VILLAGE</h3>
                                    <span className="text-xs text-emerald-500 font-bold uppercase tracking-wider">"Return to the roots"</span>
                                </div>
                            </div>
                            <div className="text-sm text-text-secondary leading-relaxed mt-1">
                                <strong className="text-emerald-400">HARD MODE:</strong> Poor community, skeptical elders, slow growth.<br />
                                <span className="opacity-80">Benefits: Cheap venues, forgiving community, authentic ministry.</span>
                            </div>
                        </div>
                    </Card>

                    {/* City Path */}
                    <Card
                        className="group relative overflow-hidden cursor-pointer hover:border-amber-500 transition-all duration-300"
                        onClick={() => onChoosePath('City')}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent group-hover:from-amber-500/20 transition-all" />
                        <div className="p-4 relative flex flex-col items-start gap-2">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">🏙️</span>
                                <div>
                                    <h3 className="font-bold text-lg text-text-primary">THE CITY</h3>
                                    <span className="text-xs text-amber-500 font-bold uppercase tracking-wider">"Where the money flows"</span>
                                </div>
                            </div>
                            <div className="text-sm text-text-secondary leading-relaxed mt-1">
                                <strong className="text-amber-400">EXPENSIVE MODE:</strong> High rent, fierce competition, media scrutiny.<br />
                                <span className="opacity-80">Benefits: Wealthy donors, fast growth, viral potential.</span>
                            </div>
                        </div>
                    </Card>
                </div>

                <p className="text-xs text-text-muted text-center">
                    ⚠️ This choice is permanent and will shape your entire ministry!
                </p>
            </div>
        </Modal>
    );
}
