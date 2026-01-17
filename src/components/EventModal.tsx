// ... imports
import { useState } from 'react';
import type { GameEvent, EventChoice } from '@/types/game';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface EventModalProps {
    event: GameEvent;
    availableChoices: EventChoice[];
    onChoiceSelect: (choice: EventChoice) => void;
}

// Scandal-related image queries for Unsplash
const scandalImages = [
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=200&fit=crop', // Business meeting
    'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=400&h=200&fit=crop', // Newspaper
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop', // Documents
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop', // Money
];

export default function EventModal({
    event,
    availableChoices,
    onChoiceSelect
}: EventModalProps) {
    const [selectedChoice, setSelectedChoice] = useState<EventChoice | null>(null);
    const [showResult, setShowResult] = useState(false);

    // Determine if this is a crisis/scandal event
    const isCrisis = (event as any).tags?.includes('scandal') ||
        (event as any).tags?.includes('crisis') ||
        (event as any).category === 'scandal';

    const eventImage = (event as any).imageUrl ||
        (isCrisis ? scandalImages[Math.floor(Math.random() * scandalImages.length)] : null);

    const handleChoiceClick = (choice: EventChoice) => {
        setSelectedChoice(choice);
        setShowResult(true);
    };

    const handleContinue = () => {
        if (selectedChoice) {
            onChoiceSelect(selectedChoice);
            setSelectedChoice(null);
            setShowResult(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <Card className="w-full max-w-md animate-in slide-in-from-bottom-4 zoom-in-95 bg-app border-border-prominent shadow-2xl rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
                {/* Header Strip */}
                <div className={`h-1.5 w-full ${isCrisis ? 'bg-danger' : 'bg-brand'}`} />

                {/* Drag Handle (Visual only since we aren't using a real drawer lib yet) */}
                <div className="w-full flex justify-center pt-3 pb-1">
                    <div className="w-12 h-1 bg-border-subtle rounded-full" />
                </div>

                <div className="p-5 overflow-y-auto flex-1">
                    {!showResult ? (
                        <>
                            {/* Tag */}
                            <div className="flex justify-center mb-4">
                                <Badge variant={isCrisis ? 'destructive' : 'default'} className="uppercase tracking-widest text-[10px] font-bold px-3 py-1 shadow-lg shadow-black/20">
                                    {event.category?.toUpperCase() || 'EVENT'}
                                </Badge>
                            </div>

                            {/* Image */}
                            {eventImage && (
                                <div className={`relative w-full h-40 rounded-xl overflow-hidden mb-6 border-2 shadow-inner ${isCrisis ? 'border-danger/20' : 'border-brand/20'}`}>
                                    <img
                                        src={eventImage}
                                        alt="Event"
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-app/90 via-app/20 to-transparent" />
                                </div>
                            )}

                            {/* Content */}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-black text-text-primary mb-3 leading-tight tracking-tight">
                                    {event.title}
                                </h3>
                                <p className="text-text-secondary text-[15px] leading-relaxed">
                                    {event.description}
                                </p>
                            </div>

                            {/* Choices */}
                            <div className="space-y-3">
                                {availableChoices.map((choice, index) => (
                                    <Button
                                        key={choice.id}
                                        onClick={() => handleChoiceClick(choice)}
                                        variant={index === 0 ? (isCrisis ? 'destructive' : 'default') : 'secondary'}
                                        size="lg"
                                        className={`w-full h-auto py-4 flex flex-col items-center gap-1 group relative overflow-hidden transition-all duration-300 ${index === 0 ? 'shadow-lg shadow-brand/10 hover:shadow-brand/30' : 'hover:bg-surface-hover'
                                            }`}
                                    >
                                        <span className="text-base font-bold relative z-10">{choice.label}</span>
                                        {(choice as any).cost && (
                                            <span className="text-[10px] font-mono opacity-80 uppercase tracking-wider relative z-10">
                                                {(choice as any).cost.energy > 0 && `${(choice as any).cost.energy} NRG`}
                                                {(choice as any).cost.personalCash > 0 && ` • ₦${(choice as any).cost.personalCash.toLocaleString()}`}
                                            </span>
                                        )}
                                    </Button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="py-8 flex flex-col items-center text-center animate-in fade-in zoom-in-95">
                            {/* Success Icon */}
                            <div className="w-24 h-24 rounded-full bg-success/10 text-success flex items-center justify-center mb-6 ring-1 ring-success/20 shadow-[0_0_30px_-10px_rgba(34,197,94,0.3)]">
                                <span className="text-5xl animate-bounce">✅</span>
                            </div>

                            <div className="space-y-2 mb-8">
                                <h3 className="text-xl font-bold text-text-primary">Decision Recorded</h3>
                                <h4 className="text-lg font-medium text-brand">{selectedChoice?.label}</h4>
                            </div>

                            <p className="text-text-secondary leading-relaxed mb-8 max-w-[280px]">
                                {selectedChoice?.resultText || "Your decision has been noted and will affect the church's future."}
                            </p>

                            <Button onClick={handleContinue} size="lg" className="w-full font-bold shadow-lg shadow-brand/20">
                                Continue
                            </Button>
                        </div>
                    )}
                </div>

                {/* Footer Meta */}
                {!showResult && (
                    <div className="p-4 border-t border-border-subtle bg-surface/30 backdrop-blur-md">
                        <div className="flex items-center justify-center gap-2 text-text-muted text-[10px] font-bold uppercase tracking-widest">
                            <span className="text-base">⚖️</span>
                            {isCrisis ? 'Reputation System Active' : 'Ministry Decision'}
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
