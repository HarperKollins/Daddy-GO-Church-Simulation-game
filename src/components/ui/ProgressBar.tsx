import * as React from "react"
import { cn } from "@/components/ui/Button"

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number
    max?: number
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'gradient'
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
    ({ className, value, max = 100, variant = "default", ...props }, ref) => {
        const percentage = Math.min(100, Math.max(0, (value / max) * 100))

        const colors = {
            default: "bg-brand",
            success: "bg-success",
            warning: "bg-warning",
            danger: "bg-danger",
            gradient: "bg-gradient-to-r from-warning to-danger",
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "h-2 w-full overflow-hidden rounded-full bg-surface-active/50",
                    className
                )}
                {...props}
            >
                <div
                    className={cn("h-full w-full flex-1 transition-all", colors[variant])}
                    style={{ transform: `translateX(-${100 - percentage}%)` }}
                />
            </div>
        )
    }
)
ProgressBar.displayName = "ProgressBar"

export { ProgressBar }
