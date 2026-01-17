import * as React from "react"
// import { type VariantProps, cva } from "class-variance-authority" // Removed unused
// I didn't install cva. Let's strict code it for now without cva to save installs, or add cva.
// User wants minimal clutter. I can just use a helper function or map.

import { cn } from "@/components/ui/Button"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning'
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const variants = {
        default: "border-transparent bg-brand text-brand-foreground hover:bg-brand/80",
        secondary: "border-transparent bg-surface-active text-text-secondary",
        outline: "text-text-primary",
        destructive: "border-transparent bg-danger/15 text-danger border-danger/20",
        success: "border-transparent bg-success/15 text-success border-success/20",
        warning: "border-transparent bg-warning/15 text-warning border-warning/20",
    }

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                variants[variant],
                className
            )}
            {...props}
        />
    )
}

export { Badge }
