'use client';

import { useEffect, useState } from 'react';

// Critical 3D Emojis to preload immediately
const CRITICAL_EMOJIS = [
    'Red heart', 'High voltage', 'Dove', 'Star', 'Money bag',
    'Folded hands_Light', 'Sparkles', 'Megaphone', 'Church'
];

// Helper to get CDN URL (Matching ThreeDEmoji logic)
const getCdnUrl = (filename: string) =>
    `https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/${filename}/3D/${filename.replace(/ /g, '_')}_3d.png`;

export default function AssetPreloader() {
    const [loadedCount, setLoadedCount] = useState(0);

    useEffect(() => {
        // We only run this once on mount
        let count = 0;

        CRITICAL_EMOJIS.forEach(filename => {
            const img = new Image();
            img.src = getCdnUrl(filename);
            img.onload = () => setLoadedCount(c => c + 1);
        });

        console.log(`🚀 Asset Preloader: Started fetching ${CRITICAL_EMOJIS.length} critical assets.`);
    }, []);

    // This component is invisible
    return null;
}
