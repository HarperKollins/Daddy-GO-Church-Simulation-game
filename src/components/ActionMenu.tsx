// ... imports
import { useGameStore } from '@/store/useGameStore';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface ActionMenuProps {
    onAction: (action: any) => void;
}

export default function ActionMenu({ onAction }: ActionMenuProps) {
    const { stats, church } = useGameStore();
    const [activeTab, setActiveTab] = useState<'ministry' | 'lifestyle'>('ministry');

    // Ministry Actions
    const ministryActions = [
        {
            id: 'preach',
            title: 'Preach',
            description: 'Gain members',
            icon: '📈',
            iconBg: 'bg-blue-600',
            energyCost: 20,
            effects: { members: 5, churchCash: 1000, anointing: 50 },
            tag: 'Growth'
        },
        {
            id: 'sunday_service',
            title: 'Sunday Service',
            description: 'Weekly boost',
            icon: '🌅',
            iconBg: 'bg-amber-500',
            energyCost: 50,
            effects: { members: 15, churchCash: 5000, anointing: 100 },
            tag: 'Essential'
        },
        {
            id: 'upgrade_venue',
            title: 'Upgrade Venue',
            description: getNextVenue(church.venue),
            icon: '🏗️',
            iconBg: 'bg-violet-600',
            energyCost: 0,
            effects: {},
            tag: 'Scale'
        },
        {
            id: 'pray',
            title: 'Intense Prayer',
            description: 'Boost Spirit',
            icon: '🙏',
            iconBg: 'bg-purple-600',
            energyCost: 15,
            effects: { anointing: 100, health: 5 },
            tag: 'Spirit'
        },
        {
            id: 'bible_study',
            title: 'Bible Study',
            description: 'Gain Wisdom',
            icon: '📖',
            iconBg: 'bg-green-600',
            energyCost: 10,
            effects: { anointing: 30, fame: 10 },
            tag: 'Wisdom'
        },
        {
            id: 'crusade',
            title: 'City Crusade',
            description: 'Mass Evangelism',
            icon: '🎤',
            iconBg: 'bg-pink-600',
            energyCost: 30,
            effects: { members: 25, fame: 20 },
            tag: 'Outreach'
        },
    ];

    // Lifestyle Actions
    const lifestyleActions = [
        {
            id: 'rest',
            title: 'Deep Rest',
            description: 'Restore energy',
            icon: '😴',
            iconBg: 'bg-teal-500',
            energyCost: 0,
            effects: { health: 15, energy: 200 },
            tag: 'Health'
        },
        {
            id: 'date',
            title: 'Go on Date',
            description: 'Find love',
            icon: '❤️',
            iconBg: 'bg-rose-500',
            energyCost: 15,
            effects: { stress: -20 },
            tag: 'Social'
        },
        {
            id: 'gym',
            title: 'Hit the Gym',
            description: 'Stay fit',
            icon: '💪',
            iconBg: 'bg-red-600',
            energyCost: 20,
            effects: { health: 10 },
            tag: 'Health'
        },
        {
            id: 'invest',
            title: 'Invest Flow',
            description: 'Grow wealth',
            icon: '📊',
            iconBg: 'bg-green-700',
            energyCost: 5,
            effects: {},
            tag: 'Finance'
        },
    ];

    const currentActions = activeTab === 'ministry' ? ministryActions : lifestyleActions;

    function getNextVenue(current: string) {
        const venues = ['Canopy', 'Classroom', 'Hall', 'Auditorium', 'Stadium', 'Camp Ground'];
        const idx = venues.indexOf(current);
        return idx < venues.length - 1 ? venues[idx + 1] : 'Mega Complex';
    }

    const handleAction = (action: any) => {
        if (stats.energy < action.energyCost && action.energyCost > 0) {
            return; // Can't afford
        }
        onAction(action);
    };

    return (
        <div className="px-4 pb-32">
            {/* Tab Switcher */}
            <div className="flex p-1 bg-surface rounded-xl mb-6 border border-border-subtle shadow-inner">
                <Button
                    onClick={() => setActiveTab('ministry')}
                    variant={activeTab === 'ministry' ? 'default' : 'ghost'}
                    size="sm"
                    className={`flex-1 font-bold rounded-lg transition-all ${activeTab === 'ministry'
                        ? 'shadow-md'
                        : 'text-text-secondary hover:bg-surface-hover'
                        }`}
                >
                    Values & Ministry
                </Button>
                <Button
                    onClick={() => setActiveTab('lifestyle')}
                    variant={activeTab === 'lifestyle' ? 'default' : 'ghost'}
                    size="sm"
                    className={`flex-1 font-bold rounded-lg transition-all ${activeTab === 'lifestyle'
                        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md'
                        : 'text-text-secondary hover:bg-surface-hover'
                        }`}
                >
                    Lifestyle & Assets
                </Button>
            </div>

            {/* Action Grid */}
            <div className="grid grid-cols-2 gap-3">
                {currentActions.map((action) => {
                    const canAfford = stats.energy >= action.energyCost || action.energyCost === 0;

                    return (
                        <button
                            key={action.id}
                            onClick={() => handleAction(action)}
                            disabled={!canAfford}
                            className={`text-left transition-all duration-200 group outline-none ${canAfford
                                ? 'cursor-pointer'
                                : 'opacity-50 cursor-not-allowed grayscale'
                                }`}
                        >
                            <Card className={`p-4 h-full border transition-all duration-200 ${canAfford
                                    ? 'bg-surface border-border-subtle group-hover:border-brand/50 group-hover:-translate-y-1 group-hover:shadow-lg group-active:scale-95'
                                    : 'bg-surface/50 border-transparent'
                                }`}>
                                <div className="flex flex-col gap-3">
                                    {/* Header */}
                                    <div className="flex justify-between items-start">
                                        <div className={`w-10 h-10 rounded-xl ${action.iconBg} bg-opacity-20 flex items-center justify-center text-xl shadow-inner ring-1 ring-white/5`}>
                                            {action.icon}
                                        </div>
                                        <Badge variant="outline" className="text-[10px] px-2 h-5 bg-black/20 font-mono tracking-wide border-0">
                                            {action.tag}
                                        </Badge>
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className="text-sm font-bold text-text-primary mb-1 leading-tight group-hover:text-brand transition-colors">
                                            {action.title}
                                        </h3>
                                        <p className="text-[11px] text-text-secondary leading-tight line-clamp-2">
                                            {action.description}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="pt-3 mt-auto border-t border-dashed border-border-subtle/50 flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Cost</span>
                                        <span className={`text-xs font-black ${action.energyCost === 0 ? 'text-success' : canAfford ? 'text-text-primary' : 'text-danger'
                                            }`}>
                                            {action.energyCost === 0 ? 'FREE' : `${action.energyCost} NRG`}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </button>
                    );
                })}
            </div>

            {/* Next Week Button */}
            <div className="mt-8 mb-4">
                <Button
                    variant="secondary"
                    size="lg"
                    className="w-full h-14 text-lg font-black bg-gradient-to-r from-brand to-violet-600 text-white border-0 shadow-lg shadow-brand/20 hover:shadow-brand/40 hover:scale-[1.02] transition-all"
                    onClick={() => onAction({ id: 'advance_week', energyCost: 0, effects: {} })}
                >
                    Start Next Week 📅
                </Button>
                <p className="text-center text-[10px] text-text-muted mt-3 font-mono uppercase tracking-widest opacity-60">
                    Advance time & Reset Energy
                </p>
            </div>
        </div>
    );
}
