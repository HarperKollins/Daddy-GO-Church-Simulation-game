/**
 * EventModal Component - Clean BitLife Style
 * 
 * Full-screen overlay modal for displaying game events.
 * Shows event description and choice buttons.
 */

'use client';

import { useState } from 'react';
import type { GameEvent, EventChoice } from '@/types/game';

interface EventModalProps {
    event: GameEvent;
    availableChoices: EventChoice[];
    onChoiceSelect: (choice: EventChoice) => void;
}

export default function EventModal({
    event,
    availableChoices,
    onChoiceSelect
}: EventModalProps) {
    const [selectedChoice, setSelectedChoice] = useState<EventChoice | null>(null);
    const [showResult, setShowResult] = useState(false);

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
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '400px' }}>
                {!showResult ? (
                    <>
                        <div className="modal-header">
                            <h2>{event.title}</h2>
                        </div>
                        <div className="modal-body">
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '15px',
                                lineHeight: '1.6',
                                marginBottom: '24px'
                            }}>
                                {event.description}
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {availableChoices.map((choice) => (
                                    <button
                                        key={choice.id}
                                        className="btn-secondary"
                                        style={{ width: '100%', textAlign: 'left', padding: '14px 16px' }}
                                        onClick={() => handleChoiceClick(choice)}
                                    >
                                        {choice.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="modal-header">
                            <h2>{selectedChoice?.label}</h2>
                        </div>
                        <div className="modal-body">
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '15px',
                                lineHeight: '1.6',
                                marginBottom: '24px'
                            }}>
                                {selectedChoice?.resultText}
                            </p>
                            <button
                                className="btn-primary"
                                style={{ width: '100%' }}
                                onClick={handleContinue}
                            >
                                Continue
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
