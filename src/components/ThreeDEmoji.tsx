'use client';

import React, { useState } from 'react';

// Using Microsoft Fluent Emojis via a reliable CDN (jsdelivr/github)
// Base URL: https://raw.githubusercontent.com/TarikUL/fluent-emojis/master/assets

interface ThreeDEmojiProps {
    icon: string;         // Keyword identifier (e.g. "prayer", "money")
    fallback: string;     // The original 2D emoji (e.g. "🙏")
    size?: number;        // Pixel size (default 24)
    className?: string;
    animate?: boolean;    // Whether to float/bounce
}

// Map keywords to specific 3D emoji assets
// We use a predefined map to ensure quality matches
const EMOJI_MAP: Record<string, string> = {
    // Ministry
    'hold_service': 'hands/folding_hands_3d.png',
    'pray': 'hands/folding_hands_3d.png',
    'fast': 'food/plate_with_cutlery_3d.png',
    'vigil': 'objects/crescent_moon_3d.png',
    'crusade': 'fire/fire_3d.png',
    'deliverance': 'smileys/angry_face_with_horns_3d.png',
    'bible': 'objects/open_book_3d.png',
    'dove': 'animals/dove_3d.png',

    // Social
    'family': 'people/house_3d.png',
    'network': 'hands/handshake_3d.png',
    'media': 'objects/microphone_3d.png',
    'love': 'hearts/red_heart_3d.png',
    'hookup': 'objects/rose_3d.png',

    // Finance
    'money': 'objects/money_bag_3d.png',
    'give': 'objects/money_with_wings_3d.png',
    'invest': 'objects/chart_increasing_with_yen_3d.png', // closest generic chart
    'land': 'objects/building_construction_3d.png',
    'bank': 'objects/bank_3d.png',
    'crypto': 'objects/rocket_3d.png',
    'poo': 'smileys/pile_of_poo_3d.png', // for bad investments
    'seed': 'plants/seedling_3d.png',

    // Health
    'hospital': 'objects/hospital_3d.png',
    'gym': 'people/flexed_biceps_3d.png',
    'rest': 'smileys/sleeping_face_3d.png',
    'food': 'food/pot_of_food_3d.png',

    // Media
    'youtube': 'objects/television_3d.png', // generic video
    'live': 'objects/movie_camera_3d.png',
    'controversy': 'fire/fire_3d.png',
    'collab': 'objects/mobile_phone_with_arrow_3d.png',

    // Secret
    'siphon': 'objects/money_with_wings_3d.png',
    'politics': 'objects/classical_building_3d.png',
    'yahoo': 'objects/laptop_3d.png',
    'juju': 'objects/skull_3d.png',
    'testimony': 'objects/megaphone_3d.png',
    'warfare': 'objects/crossed_swords_3d.png',
};

const BASE_URL = 'https://raw.githubusercontent.com/TarikUL/fluent-emojis/master/assets';

export default function ThreeDEmoji({
    icon,
    fallback,
    size = 24,
    className = "",
    animate = false
}: ThreeDEmojiProps) {
    const [error, setError] = useState(false);

    // If we don't have a 3D mapping or image failed to load, show 2D fallback
    if (error || !EMOJI_MAP[icon]) {
        return <span className={`text-[${size}px] ${className}`}>{fallback}</span>;
    }

    const path = EMOJI_MAP[icon];
    const fullUrl = `${BASE_URL}/${path}`;

    return (
        <div
            className={`inline-block relative ${animate ? 'hover:animate-bounce-short' : ''} ${className}`}
            style={{ width: size, height: size }}
        >
            <img
                src={fullUrl}
                alt={icon}
                className="w-full h-full object-contain filter drop-shadow-md"
                onError={() => setError(true)}
                loading="lazy"
            />
        </div>
    );
}
