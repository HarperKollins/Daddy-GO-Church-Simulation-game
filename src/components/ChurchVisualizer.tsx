'use client';

import React, { useEffect, useState } from 'react';
import { VenueTier } from '@/types/game';
import ThreeDEmoji from './ThreeDEmoji';

interface ChurchVisualizerProps {
    venue: VenueTier;
    members: number;
    timeOfDay?: 'day' | 'night';
}

/**
 * Visualizes the church growth using CSS art and 3D emojis.
 * A poor man's Sims city, but for Lagos churches.
 */
export default function ChurchVisualizer({ venue, members, timeOfDay = 'day' }: ChurchVisualizerProps) {
    const [animate, setAnimate] = useState(false);

    // Trigger animations on mount
    useEffect(() => {
        setAnimate(true);
    }, []);

    // Configuration for each venue tier
    const getSceneConfig = (tier: VenueTier) => {
        switch (tier) {
            case 'BUS_STOP':
                return {
                    bg: 'bg-gradient-to-b from-sky-400 to-amber-100', // Dusty street
                    ground: 'bg-stone-400', // Asphalt
                    mainIcon: 'megaphone',
                    mainSize: 60,
                    mainLabel: 'Bus Stop Ministry',
                    crowdDensity: 3, // Low
                    decor: ['🌴', '🚕', '🚌']
                };
            case 'CLASSROOM':
                return {
                    bg: 'bg-gradient-to-b from-blue-300 to-white', // Bright indoor/school
                    ground: 'bg-orange-100', // Tiled floor
                    mainIcon: 'school',
                    mainSize: 80,
                    mainLabel: 'Rented Classroom',
                    crowdDensity: 8,
                    decor: ['🪑', '📚', '✏️']
                };
            case 'TENT':
                return {
                    bg: 'bg-gradient-to-b from-cyan-400 to-green-100', // Open field
                    ground: 'bg-green-600', // Grass
                    mainIcon: 'tent',
                    mainSize: 100,
                    mainLabel: 'Crusade Tent',
                    crowdDensity: 15,
                    decor: ['🌲', '🔊', '⛺']
                };
            case 'WAREHOUSE':
                return {
                    bg: 'bg-gradient-to-b from-slate-700 to-slate-900', // Industrial
                    ground: 'bg-gray-700', // Concrete
                    mainIcon: 'building',
                    mainSize: 120,
                    mainLabel: 'Converted Warehouse',
                    crowdDensity: 30, // Packed
                    decor: ['🏭', '🚗', '💡']
                };
            case 'DOME':
                return {
                    bg: 'bg-gradient-to-b from-indigo-900 to-purple-800', // Premium
                    ground: 'bg-gray-900', // Paved
                    mainIcon: 'church',
                    mainSize: 140,
                    mainLabel: 'The Glory Dome',
                    crowdDensity: 60,
                    decor: ['🏛️', '🏎️', '🚐']
                };
            case 'STADIUM':
                return {
                    bg: 'bg-gradient-to-b from-blue-900 to-black', // Night lights
                    ground: 'bg-emerald-800', // Turf
                    mainIcon: 'stadium',
                    mainSize: 160,
                    mainLabel: 'National Stadium',
                    crowdDensity: 100, // Massive
                    decor: ['🏟️', '🎆', '🚁']
                };
            case 'CITY_STATE':
                return {
                    bg: 'bg-gradient-to-r from-yellow-600 via-orange-500 to-red-600', // Golden hour
                    ground: 'bg-yellow-900', // Gold streets?
                    mainIcon: 'city',
                    mainSize: 200,
                    mainLabel: 'Redemption City',
                    crowdDensity: 200,
                    decor: ['🏙️', '✈️', '🚓']
                };
            default:
                return {
                    bg: 'bg-gray-200',
                    ground: 'bg-gray-400',
                    mainIcon: 'alert',
                    mainSize: 50,
                    mainLabel: 'Unknown',
                    crowdDensity: 0,
                    decor: []
                };
        }
    };

    const config = getSceneConfig(venue);

    // Render crowd dots based on density
    // We limit max dots to avoid DOM overload
    const renderCrowd = () => {
        const dots = [];
        const count = Math.min(config.crowdDensity, 50); // Cap at 50 visual elements

        for (let i = 0; i < count; i++) {
            const left = Math.random() * 90 + 5; // 5% to 95%
            const top = Math.random() * 40 + 50; // Bottom half
            const delay = Math.random() * 2;

            dots.push(
                <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-white/80 shadow-sm animate-bounce-custom"
                    style={{
                        left: `${left}%`,
                        top: `${top}%`,
                        animationDelay: `${delay}s`,
                        animationDuration: `${1 + Math.random()}s`
                    }}
                />
            );
        }
        return dots;
    };

    return (
        <div className={`relative w-full h-48 rounded-xl overflow-hidden shadow-inner border-4 border-white/20 mb-6 transition-all duration-1000 ${config.bg}`}>

            {/* Sky Elements */}
            <div className="absolute top-4 right-8 opacity-50 animate-pulse">
                {timeOfDay === 'day' ? '☀️' : '🌙'}
            </div>
            {venue === 'STADIUM' || venue === 'CITY_STATE' ? (
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            ) : null}

            {/* Ground */}
            <div className={`absolute bottom-0 w-full h-1/3 transform skew-x-12 scale-150 ${config.ground} opacity-90`} />

            {/* Crowd */}
            <div className="absolute inset-0 pointer-events-none">
                {renderCrowd()}
            </div>

            {/* Decor Elements */}
            <div className="absolute bottom-4 left-4 text-2xl animate-bounce" style={{ animationDuration: '3s' }}>
                {config.decor[0]}
            </div>
            <div className="absolute bottom-8 right-8 text-xl animate-pulse" style={{ animationDuration: '4s' }}>
                {config.decor[1]}
            </div>

            {/* Main Structure (Center Stage) */}
            <div className="absolute inset-x-0 bottom-4 flex flex-col items-center justify-end transition-all duration-700 transform hover:scale-105">
                <div className={`drop-shadow-2xl filter ${animate ? 'animate-float' : ''}`}>
                    <ThreeDEmoji
                        icon={config.mainIcon}
                        fallback="⛪"
                        size={config.mainSize}
                        animate={true}
                    />
                </div>
                <div className="mt-2 text-center">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20">
                        {config.mainLabel}
                    </span>
                    {members > 0 && (
                        <div className="text-[10px] text-white/90 font-mono mt-0.5 bg-black/40 rounded px-1 inline-block">
                            Pop: {members.toLocaleString()}
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
