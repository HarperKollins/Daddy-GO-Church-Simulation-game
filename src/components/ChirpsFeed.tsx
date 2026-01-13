/**
 * Chirps Feed - Social Media Reaction System
 * 
 * A Twitter-like feed showing public reactions to player actions.
 * Generates "tweets" based on Fame, Scandal, and recent actions.
 */

'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';

interface Chirp {
    id: string;
    author: string;
    handle: string;
    content: string;
    likes: number;
    retweets: number;
    type: 'positive' | 'negative' | 'neutral' | 'viral';
    timestamp: string;
}

// Nigerian Twitter handles for flavor
const POSITIVE_AUTHORS = [
    { name: 'Blessed Sister', handle: '@anointed_sis' },
    { name: 'Deacon Joseph', handle: '@deacon_joe_og' },
    { name: 'Prayer Warrior', handle: '@midnight_prayer' },
    { name: 'Faithful Mama', handle: '@mama_church' },
    { name: 'Testimony King', handle: '@testimony_szn' },
];

const NEGATIVE_AUTHORS = [
    { name: 'Slay Mama Blog', handle: '@slaymamablog' },
    { name: 'Expose Pastor', handle: '@expose_pastor' },
    { name: 'Woke Lagosian', handle: '@woke_lagos' },
    { name: 'Linda Ikeji Clone', handle: '@gistville247' },
    { name: 'Church Hurt', handle: '@church_hurt_ng' },
];

const NEUTRAL_AUTHORS = [
    { name: 'Punch News', handle: '@paborttttch_ng' },
    { name: 'Daily Trust', handle: '@daily_trust' },
    { name: 'Random Tweep', handle: '@random_tweep' },
];

// Generate chirps based on game state
const generateChirps = (fame: number, scandal: number, members: number, playerName: string, week: number): Chirp[] => {
    const chirps: Chirp[] = [];
    const now = new Date('2026-01-01');
    now.setDate(now.getDate() + (week - 1) * 7);

    // Positive chirps (based on fame)
    if (fame > 10) {
        const author = POSITIVE_AUTHORS[Math.floor(Math.random() * POSITIVE_AUTHORS.length)];
        chirps.push({
            id: `pos_${week}_${Math.random()}`,
            author: author.name,
            handle: author.handle,
            content: getPositiveChirp(playerName, fame, members),
            likes: Math.floor(fame * 10 + Math.random() * 100),
            retweets: Math.floor(fame * 2 + Math.random() * 20),
            type: 'positive',
            timestamp: `${Math.floor(Math.random() * 12) + 1}h`,
        });
    }

    // Negative chirps (based on scandal)
    if (scandal > 15) {
        const author = NEGATIVE_AUTHORS[Math.floor(Math.random() * NEGATIVE_AUTHORS.length)];
        chirps.push({
            id: `neg_${week}_${Math.random()}`,
            author: author.name,
            handle: author.handle,
            content: getNegativeChirp(playerName, scandal),
            likes: Math.floor(scandal * 15 + Math.random() * 200),
            retweets: Math.floor(scandal * 5 + Math.random() * 50),
            type: 'negative',
            timestamp: `${Math.floor(Math.random() * 24) + 1}h`,
        });
    }

    // Viral chirp (high fame OR high scandal)
    if (fame > 50 || scandal > 50) {
        chirps.push({
            id: `viral_${week}_${Math.random()}`,
            author: 'Trending Topic',
            handle: '@trending_ng',
            content: fame > scandal
                ? `🔥 ${playerName} is taking over Lagos! ${members} members strong!`
                : `⚠️ BREAKING: Allegations against ${playerName}. The streets are TALKING!`,
            likes: 5000 + Math.floor(Math.random() * 10000),
            retweets: 1000 + Math.floor(Math.random() * 5000),
            type: 'viral',
            timestamp: '2h',
        });
    }

    // Random neutral news
    if (Math.random() > 0.7) {
        const author = NEUTRAL_AUTHORS[Math.floor(Math.random() * NEUTRAL_AUTHORS.length)];
        chirps.push({
            id: `neutral_${week}_${Math.random()}`,
            author: author.name,
            handle: author.handle,
            content: getNeutralChirp(),
            likes: Math.floor(Math.random() * 500),
            retweets: Math.floor(Math.random() * 100),
            type: 'neutral',
            timestamp: `${Math.floor(Math.random() * 48) + 1}h`,
        });
    }

    return chirps.slice(0, 5); // Max 5 chirps
};

const getPositiveChirp = (name: string, fame: number, members: number): string => {
    const templates = [
        `Just attended ${name}'s service. THIS MAN CARRIES FIRE! 🔥🔥🔥`,
        `If you haven't heard ${name} preach, you're missing. Real anointing, no packaging.`,
        `${name} prayed for my neighbor and she got a job THE NEXT DAY. Glory!`,
        `Sunday service was PACKED. ${members} of us worshipping. God is moving! 🙏`,
        `Say what you want, but ${name} is different. The prophecies are accurate.`,
        `My destiny helper is ${name}! Sowed a seed and doors opened. Grateful! 💰`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
};

const getNegativeChirp = (name: string, scandal: number): string => {
    const templates = [
        `Something is off about ${name}. I can't put my finger on it, but... 🤔`,
        `The way ${name} collects offerings is giving SCAM. We need answers!`,
        `Thread 🧵: Why I left ${name}'s church after 6 months...`,
        `${name}'s lifestyle doesn't match the "suffering for Christ" message. Just saying.`,
        `My friend worked for ${name}. The things she told me... I can't even type it.`,
        `Why does ${name} need THAT car for ministry? Explain it like I'm 5.`,
        `Bloggers are saying ${name} was seen at a VERY ungodly location. Stay woke! 👀`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
};

const getNeutralChirp = (): string => {
    const templates = [
        'Lagos traffic is the real enemy of progress. 3 hours to Ikeja. 😭',
        'Fuel scarcity is back again. Nigeria, we tire for you.',
        'Jollof rice supremacy remains undefeated. Don\'t @ me.',
        'Power just came back after 2 days. NEPA, thank you for your service. 🙄',
        'Wedding owambe season is here. My asoebi budget is crying.',
    ];
    return templates[Math.floor(Math.random() * templates.length)];
};

interface ChirpsFeedProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ChirpsFeed({ isOpen, onClose }: ChirpsFeedProps) {
    const { stats, church, name, week } = useGameStore();
    const [chirps, setChirps] = useState<Chirp[]>([]);

    useEffect(() => {
        if (isOpen) {
            setChirps(generateChirps(stats.fame, stats.scandal, church.members, name, week));
        }
    }, [isOpen, stats.fame, stats.scandal, church.members, name, week]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content chirps-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#1DA1F2' }}>𝕏</span> Chirps
                    </h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <div className="chirps-feed">
                    {chirps.length === 0 ? (
                        <div className="chirp-empty">
                            <p>No one is talking about you yet. Build your fame!</p>
                        </div>
                    ) : (
                        chirps.map(chirp => (
                            <div key={chirp.id} className={`chirp-card chirp-${chirp.type}`}>
                                <div className="chirp-header">
                                    <div className="chirp-avatar">
                                        {chirp.author.charAt(0)}
                                    </div>
                                    <div className="chirp-author">
                                        <span className="chirp-name">{chirp.author}</span>
                                        <span className="chirp-handle">{chirp.handle}</span>
                                    </div>
                                    <span className="chirp-time">{chirp.timestamp}</span>
                                </div>
                                <p className="chirp-content">{chirp.content}</p>
                                <div className="chirp-stats">
                                    <span>❤️ {chirp.likes.toLocaleString()}</span>
                                    <span>🔁 {chirp.retweets.toLocaleString()}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
