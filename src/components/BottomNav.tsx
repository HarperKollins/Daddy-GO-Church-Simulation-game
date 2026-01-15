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

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '70px',
            background: '#0a0a0f',
            borderTop: '1px solid #1e1e2e',
            paddingBottom: 'env(safe-area-inset-bottom)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
        }}>
            <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-evenly',
            }}>
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px',
                                cursor: 'pointer',
                                padding: '8px 16px',
                                transition: 'opacity 0.2s',
                                opacity: isActive ? 1 : 0.5,
                            }}
                        >
                            {/* Icon */}
                            <span style={{
                                fontSize: '22px',
                                filter: isActive ? 'none' : 'grayscale(50%)',
                            }}>
                                {item.icon}
                            </span>

                            {/* Label */}
                            <span style={{
                                fontSize: '10px',
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? '#fff' : '#6b7280',
                                letterSpacing: '0.02em',
                            }}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
