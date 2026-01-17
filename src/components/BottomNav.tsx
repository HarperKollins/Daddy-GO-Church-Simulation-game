/**
 * BottomNav Component - Minimal Dark Theme
 * Simple bottom navigation matching reference design
 */

'use client';

interface BottomNavProps {
    activeTab: 'home' | 'office' | 'altar' | 'store' | 'scandal';
    onTabChange: (tab: 'home' | 'office' | 'altar' | 'store' | 'scandal') => void;
}

const navItems = [
    { id: 'home' as const, label: 'Home', icon: '🏠' },
    { id: 'altar' as const, label: 'Church', icon: '⛪' },
    { id: 'office' as const, label: 'Assets', icon: '💼' },
    { id: 'scandal' as const, label: 'Social', icon: '📱' },
];

// ... props
export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 h-[70px] bg-surface/80 backdrop-blur-md border-t border-border-subtle flex justify-center items-center z-50 pb-[env(safe-area-inset-bottom)]">
            <div className="flex w-full justify-evenly max-w-md">
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`flex flex-col items-center gap-1 p-2 transition-all hover:bg-surface-hover/50 rounded-lg ${isActive ? 'opacity-100 text-brand scale-105' : 'opacity-60 text-text-secondary'}`}
                        >
                            <span className="text-2xl filter drop-shadow-sm">
                                {item.icon}
                            </span>
                            <span className={`text-[10px] uppercase font-bold tracking-widest ${isActive ? 'text-brand' : 'text-text-muted'}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
