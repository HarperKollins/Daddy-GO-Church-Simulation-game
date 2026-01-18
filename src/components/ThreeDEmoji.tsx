'use client';

import React, { useState, useEffect } from 'react';

interface ThreeDEmojiProps {
    icon: string;     // The keyword/name of the emoji
    fallback: string; // The 2D unicode fallback
    size?: number;
    className?: string;
    animate?: boolean;
}

/**
 * PROJECT NANO BANANA: Reliable 3D Emojis
 * Uses jsdelivr CDN for high-availability fluent emojis.
 */
function ThreeDEmoji({
    icon,
    fallback,
    size = 40,
    className = "",
    animate = false
}: ThreeDEmojiProps) {
    const [hasError, setHasError] = useState(false);

    // Map keywords to specific emoji names for CDN
    const getEmojiFilename = (keyword: string): string => {
        const map: Record<string, string> = {
            // Stats
            'health': 'Red heart',
            'energy': 'High voltage',
            'spirit': 'Dove',
            'fame': 'Star',
            'scandal': 'Warning',
            'money': 'Money bag',

            // Actions
            'pray': 'Folded hands_Light',
            'preaching': 'Megaphone',
            'miracle': 'Sparkles',
            'crusade': 'World map',
            'donate': 'Coin',

            // Concepts
            'bible': 'Open book',
            'church': 'Church',
            'music': 'Musical note',
            'youtube': 'Play button',
            'politics': 'Classical building',
            'family': 'Family',
            'love': 'Love letter',
            'demon': 'Ogre',
            'angel': 'Baby angel_Light',
            'ghost': 'Ghost',
            'fire': 'Fire',
            'water': 'Droplet',
            'food': 'Poultry leg',
            'car': 'Automobile',
            'house': 'House',
            'book': 'Notebook',
            'edit': 'Pencil',
            'chart': 'Chart increasing',
            'volcano': 'Volcano',
            'flood': 'Cloud with rain',
            'sickness': 'Microbe',
            'party': 'Party popper',

            // People
            'man': 'Man_Light',
            'woman': 'Woman_Light',
            'baby': 'Baby_Light',
            'police': 'Police officer_Light',
            'doctor': 'Health worker_Light',
            'pastor': 'Man in tuxedo_Light',

            // Default
            'default': 'Sparkles'
        };

        const key = keyword.toLowerCase();
        return map[key] || (key.charAt(0).toUpperCase() + key.slice(1));
    };

    // Calculate URL synchronously to avoid empty src flash
    const filename = getEmojiFilename(icon);
    const imgSrc = `https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/${filename}/3D/${filename.replace(/ /g, '_')}_3d.png`;

    // Always show fallback on error
    if (hasError) {
        return (
            <span
                style={{ fontSize: `${size * 0.8}px`, lineHeight: 1 }}
                className={className}
                role="img"
                aria-label={icon}
            >
                {fallback}
            </span>
        );
    }

    return (
        <img
            src={imgSrc}
            alt={icon}
            width={size}
            height={size}
            className={className}
            onError={() => setHasError(true)}
            style={{
                display: 'inline-block',
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                animation: animate ? 'float 3s ease-in-out infinite' : 'none',
                transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
        />
    );
}

// Add global style for float animation if not exists
const style = typeof document !== 'undefined' ? document.createElement('style') : null;
if (style) {
    style.innerHTML = `
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
            100% { transform: translateY(0px); }
        }
    `;
    document.head.appendChild(style);
}

// Memoize to prevent re-renders in lists
export default React.memo(ThreeDEmoji);
