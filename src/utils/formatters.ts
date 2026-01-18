/**
 * Formats a number into a short currency string (e.g., 1.5k, 2M, 5B, 10T)
 * @param value The amount to format
 * @param currencySymbol Optional symbol to prefix (default: ₦)
 * @returns Formatted string
 */
export const formatCurrency = (value: number, currencySymbol: string = '₦'): string => {
    if (value === 0) return `${currencySymbol}0`;

    // Absolute value for magnitude check
    const absValue = Math.abs(value);

    // Trillions (T)
    if (absValue >= 1_000_000_000_000) {
        return `${currencySymbol}${(value / 1_000_000_000_000).toFixed(2)}T`;
    }

    // Billions (B)
    if (absValue >= 1_000_000_000) {
        return `${currencySymbol}${(value / 1_000_000_000).toFixed(2)}B`;
    }

    // Millions (M)
    if (absValue >= 1_000_000) {
        return `${currencySymbol}${(value / 1_000_000).toFixed(2)}M`;
    }

    // Thousands (k) - optional, maybe only for > 10k? 
    // Let's do > 1000 for consistency if requested, but typically for ₦, we might want full numbers below 1M.
    // User requested "Trillions", so high scale is priority.
    // Let's stick to full numbers for < 1M for now to feel the "weight" of small money, 
    // OR format k for space. Let's do k for > 10,000.
    if (absValue >= 10_000) {
        return `${currencySymbol}${(value / 1_000).toFixed(1)}k`;
    }

    return `${currencySymbol}${value.toLocaleString()}`;
};

/**
 * Formats a large number count (e.g. Members)
 */
export const formatNumber = (value: number): string => {
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`;
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 10_000) return `${(value / 1_000).toFixed(1)}k`;
    return value.toLocaleString();
};
