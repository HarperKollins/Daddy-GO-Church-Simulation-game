/**
 * ActionCard Component
 * 
 * Individual action item in the action list.
 * BitLife-style with icon, title, subtitle, and chevron.
 */

'use client';

interface ActionCardProps {
    icon: string;
    title: string;
    subtitle?: string;
    onClick: () => void;
    disabled?: boolean;
}

export default function ActionCard({
    icon,
    title,
    subtitle,
    onClick,
    disabled = false
}: ActionCardProps) {
    return (
        <button
            className="action-card"
            onClick={onClick}
            disabled={disabled}
            style={{ opacity: disabled ? 0.5 : 1 }}
        >
            <div className="icon">{icon}</div>
            <div className="content">
                <div className="title">{title}</div>
                {subtitle && <div className="subtitle">{subtitle}</div>}
            </div>
            <span className="chevron">›</span>
        </button>
    );
}
