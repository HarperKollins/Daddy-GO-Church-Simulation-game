/**
 * LifeFeedCard - Nano Banana Stream Style
 * Dark mode, high contrast, icon-heavy event cards.
 */

'use client';

import ThreeDEmoji from './ThreeDEmoji';

interface LifeFeedCardProps {
    event: {
        id: string;
        title: string;
        description: string;
        timestamp: number;
        type: string;
        icon?: string;
    }
}

const getEventTheme = (type: string) => {
    switch (type) {
        case 'financial': return { color: 'var(--lime-glow)', bg: 'rgba(74, 222, 128, 0.1)', icon: 'money' };
        case 'scandal': return { color: 'var(--red-hellfire)', bg: 'rgba(239, 68, 68, 0.1)', icon: 'scandal' };
        case 'spiritual': return { color: 'var(--purple-prophecy)', bg: 'rgba(167, 139, 250, 0.1)', icon: 'pray' };
        case 'growth': return { color: 'var(--blue-revelation)', bg: 'rgba(56, 189, 248, 0.1)', icon: 'chart' };
        default: return { color: 'var(--text-muted)', bg: 'rgba(255, 255, 255, 0.05)', icon: 'default' };
    }
}

export default function LifeFeedCard({ event }: LifeFeedCardProps) {
    const theme = getEventTheme(event.type);
    const emojiIcon = event.icon || theme.icon;

    return (
        <div className="nano-card" style={{
            display: 'flex',
            padding: '16px',
            gap: '16px',
            marginBottom: '12px',
            alignItems: 'center'
        }}>
            {/* Icon Box */}
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: theme.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
            }}>
                <ThreeDEmoji icon={emojiIcon} fallback="📌" size={28} />
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '4px'
                }}>
                    <h4 style={{
                        margin: 0,
                        fontSize: '14px',
                        fontWeight: 700,
                        color: theme.color
                    }}>
                        {event.title}
                    </h4>
                    <span style={{
                        fontSize: '10px',
                        color: 'var(--text-muted)',
                        fontWeight: 500
                    }}>
                        2h ago
                    </span>
                </div>
                <p style={{
                    margin: 0,
                    fontSize: '13px',
                    color: 'var(--text-muted)',
                    lineHeight: '1.4'
                }}>
                    {event.description}
                </p>
            </div>
        </div>
    );
}
