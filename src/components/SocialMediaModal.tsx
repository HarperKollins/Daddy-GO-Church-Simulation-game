/**
 * SocialMediaModal Component
 * YouTube and Spotify presence with premium platform cards
 */

'use client';

import { useGameStore } from '@/store/useGameStore';
import ThreeDEmoji from './ThreeDEmoji';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface SocialMediaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUploadSermon: () => void;
}

export default function SocialMediaModal({ isOpen, onClose, onUploadSermon }: SocialMediaModalProps) {
    const { socialMedia, stats } = useGameStore();

    if (!isOpen) return null;

    const formatNumber = (n: number): string => {
        if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
        if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
        return n.toLocaleString();
    };

    // Calculate weekly income from social media
    const youtubeIncome = Math.floor((socialMedia.youtubeSubscribers / 1000) * 500);
    const spotifyIncome = Math.floor((socialMedia.spotifyListeners / 100) * 200);

    return (
        <Modal isOpen={true} onClose={onClose} title="Social Media Ministry">
            <div className="space-y-4 text-text-primary">
                {/* YouTube Section */}
                <Card className="overflow-hidden border-danger/30 bg-surface">
                    <div className="h-20 bg-gradient-to-r from-danger/20 to-transparent flex items-center px-4 gap-4">
                        <div className="w-12 h-12 bg-danger rounded-xl flex items-center justify-center shadow-lg shadow-danger/20">
                            <ThreeDEmoji icon="youtube" fallback="▶️" size={28} />
                        </div>
                        <div>
                            <div className="text-lg font-bold">YouTube Channel</div>
                            <div className="text-sm text-text-secondary">{formatNumber(socialMedia.youtubeSubscribers)} subscribers</div>
                        </div>
                    </div>

                    <div className="p-4 bg-surface/50">
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="text-center p-3 bg-app rounded-lg border border-border-subtle">
                                <div className="text-xl font-black">{socialMedia.sermonsUploaded}</div>
                                <div className="text-[10px] text-text-muted uppercase tracking-wide">Sermons</div>
                            </div>
                            <div className="text-center p-3 bg-app rounded-lg border border-border-subtle">
                                <div className="text-xl font-black">{formatNumber(socialMedia.weeklyViews)}</div>
                                <div className="text-[10px] text-text-muted uppercase tracking-wide">Weekly Views</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-success bg-success/10 p-2 rounded-lg text-sm border border-success/20">
                            <span className="material-symbols-outlined text-base">payments</span>
                            <span className="font-bold">Weekly Ad Revenue: ₦{youtubeIncome.toLocaleString()}</span>
                        </div>
                    </div>
                </Card>

                {/* Spotify Section */}
                <Card className="overflow-hidden border-[#1ed760]/30 bg-surface">
                    <div className="h-20 bg-gradient-to-r from-[#1ed760]/20 to-transparent flex items-center px-4 gap-4">
                        <div className="w-12 h-12 bg-[#1ed760] rounded-xl flex items-center justify-center shadow-lg shadow-[#1ed760]/20">
                            <ThreeDEmoji icon="media" fallback="🎧" size={28} />
                        </div>
                        <div>
                            <div className="text-lg font-bold">Spotify Podcast</div>
                            <div className="text-sm text-text-secondary">{formatNumber(socialMedia.spotifyListeners)} monthly listeners</div>
                        </div>
                    </div>

                    <div className="p-4 bg-surface/50">
                        <div className="flex items-center gap-2 text-success bg-success/10 p-2 rounded-lg text-sm border border-success/20">
                            <span className="material-symbols-outlined text-base">payments</span>
                            <span className="font-bold">Weekly Stream Revenue: ₦{spotifyIncome.toLocaleString()}</span>
                        </div>
                    </div>
                </Card>

                {/* Upload Action */}
                <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 border-none shadow-lg shadow-blue-500/20 text-white font-bold"
                    onClick={() => {
                        onUploadSermon();
                        onClose();
                    }}
                >
                    <span className="material-symbols-outlined mr-2">upload</span>
                    Upload Sermon (40 Energy)
                </Button>
                <p className="text-[10px] text-text-muted text-center italic">
                    Grows subs based on Fame. Higher anointing = more engagement.
                </p>
            </div>
        </Modal>
    );
}
