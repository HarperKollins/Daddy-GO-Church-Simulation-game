/**
 * StatusCard Component
 * 
 * Displays current player status - age, venue, and act.
 */

'use client';

import { useGameStore } from '@/store/useGameStore';
import type { VenueTier } from '@/types/game';

const venueLabels: Record<VenueTier, string> = {
    'BUS_STOP': '🚏 Bus Stop Preacher',
    'CLASSROOM': '📚 Classroom Fellowship',
    'TENT': '⛺ Crusade Tent',
    'WAREHOUSE': '🏭 Warehouse Church',
    'DOME': '⛪ The Dome',
    'STADIUM': '🏟️ Stadium Ministry',
    'CITY_STATE': '🏛️ City State',
};

export default function StatusCard() {
    const { age, church, currentAct } = useGameStore();

    return (
        <div className="status-card">
            <div className="age">{age}</div>
            <div className="label">Years Old</div>
            <div className="venue">
                {venueLabels[church.venue]}
            </div>
        </div>
    );
}
