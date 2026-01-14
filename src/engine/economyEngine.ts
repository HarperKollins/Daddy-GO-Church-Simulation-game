/**
 * 2026 Economy System
 * 
 * Modern financial mechanics including:
 * - Cryptocurrency trading (Bitcoin, Ethereum, meme coins)
 * - Real Nigerian 2026 economic conditions
 * - Inflation simulation
 * - Forex black market
 * - Modern investment options
 */

// ============================================================================
// CRYPTOCURRENCY SYSTEM
// ============================================================================

export interface CryptoAsset {
    id: string;
    name: string;
    symbol: string;
    priceNGN: number;       // Current price in Naira
    volatility: number;      // 0-100, how much it swings
    category: 'major' | 'altcoin' | 'memecoin' | 'scam';
    description: string;
    riskLevel: number;       // 1-10
}

export interface CryptoHolding {
    assetId: string;
    amount: number;
    buyPrice: number;
    buyWeek: number;
}

export interface CryptoPortfolio {
    holdings: CryptoHolding[];
    totalInvested: number;
    realizedGains: number;
    unrealizedGains: number;
}

// 2026 Crypto prices (realistic projection)
export const CRYPTO_ASSETS: CryptoAsset[] = [
    {
        id: 'BTC',
        name: 'Bitcoin',
        symbol: 'BTC',
        priceNGN: 150000000, // ₦150M per BTC
        volatility: 30,
        category: 'major',
        description: 'The king of crypto. Digital gold.',
        riskLevel: 4
    },
    {
        id: 'ETH',
        name: 'Ethereum',
        symbol: 'ETH',
        priceNGN: 8500000, // ₦8.5M per ETH
        volatility: 40,
        category: 'major',
        description: 'Smart contract platform. Web3 foundation.',
        riskLevel: 5
    },
    {
        id: 'SOL',
        name: 'Solana',
        symbol: 'SOL',
        priceNGN: 750000, // ₦750K per SOL
        volatility: 55,
        category: 'altcoin',
        description: 'Fast blockchain. Popular with traders.',
        riskLevel: 6
    },
    {
        id: 'DOGE',
        name: 'Dogecoin',
        symbol: 'DOGE',
        priceNGN: 1500, // ₦1.5K per DOGE
        volatility: 70,
        category: 'memecoin',
        description: 'The original meme coin. To the moon?',
        riskLevel: 8
    },
    {
        id: 'PEPE',
        name: 'Pepe Coin',
        symbol: 'PEPE',
        priceNGN: 0.05, // Fraction of naira
        volatility: 90,
        category: 'memecoin',
        description: 'Frog meme energy. Extremely volatile.',
        riskLevel: 9
    },
    {
        id: 'NAIJACOIN',
        name: 'NaijaCoin',
        symbol: 'NAIJA',
        priceNGN: 50,
        volatility: 80,
        category: 'altcoin',
        description: 'Nigerian crypto project. Very risky.',
        riskLevel: 8
    },
    {
        id: 'JESUSCOIN',
        name: 'JesusCoin',
        symbol: 'JESUS',
        priceNGN: 10,
        volatility: 95,
        category: 'scam',
        description: '"Pray and hold!" Probably a scam.',
        riskLevel: 10
    },
    {
        id: 'PASTORCOIN',
        name: 'PastorCoin',
        symbol: 'PASTOR',
        priceNGN: 100,
        volatility: 85,
        category: 'scam',
        description: '"Endorsed by Daddy G.O." Red flags everywhere.',
        riskLevel: 10
    }
];

/**
 * Simulate crypto price movement for one week
 */
export function simulateCryptoPrices(
    assets: CryptoAsset[],
    marketSentiment: 'bullish' | 'bearish' | 'neutral'
): CryptoAsset[] {
    const sentimentMultiplier = {
        bullish: 1.02,
        bearish: 0.98,
        neutral: 1.0
    };

    return assets.map(asset => {
        // Random walk with volatility
        const volatilityFactor = asset.volatility / 100;
        const randomChange = (Math.random() - 0.5) * 2 * volatilityFactor;
        const sentimentEffect = sentimentMultiplier[marketSentiment];

        // Scam coins have crash risk
        const crashRisk = asset.category === 'scam' ? 0.02 : 0;
        const crashed = Math.random() < crashRisk;

        let newPrice = asset.priceNGN * (1 + randomChange) * sentimentEffect;
        if (crashed) newPrice = asset.priceNGN * 0.1; // 90% crash

        return {
            ...asset,
            priceNGN: Math.max(0.001, newPrice)
        };
    });
}

/**
 * Buy crypto
 */
export function buyCrypto(
    portfolio: CryptoPortfolio,
    assetId: string,
    amountNGN: number,
    currentPrice: number,
    currentWeek: number
): { success: boolean; portfolio: CryptoPortfolio; message: string } {
    const units = amountNGN / currentPrice;

    const newHolding: CryptoHolding = {
        assetId,
        amount: units,
        buyPrice: currentPrice,
        buyWeek: currentWeek
    };

    return {
        success: true,
        portfolio: {
            ...portfolio,
            holdings: [...portfolio.holdings, newHolding],
            totalInvested: portfolio.totalInvested + amountNGN
        },
        message: `Bought ${units.toFixed(6)} ${assetId} for ₦${amountNGN.toLocaleString()}`
    };
}

/**
 * Calculate portfolio value
 */
export function calculatePortfolioValue(
    portfolio: CryptoPortfolio,
    currentPrices: Record<string, number>
): { totalValue: number; unrealizedGains: number; breakdown: Record<string, number> } {
    const breakdown: Record<string, number> = {};
    let totalValue = 0;

    for (const holding of portfolio.holdings) {
        const currentPrice = currentPrices[holding.assetId] || holding.buyPrice;
        const value = holding.amount * currentPrice;
        breakdown[holding.assetId] = (breakdown[holding.assetId] || 0) + value;
        totalValue += value;
    }

    return {
        totalValue,
        unrealizedGains: totalValue - portfolio.totalInvested,
        breakdown
    };
}

// ============================================================================
// 2026 NIGERIAN ECONOMY
// ============================================================================

export interface EconomicState {
    nairaToUSD: number;        // Exchange rate
    inflationRate: number;      // Annual %
    fuelPrice: number;          // Per liter
    electricityTariff: number;  // Per kWh
    minimumWage: number;
    unemploymentRate: number;
    cryptoBan: boolean;         // CBN ban status
}

// 2026 Nigerian economy (projected)
export const ECONOMY_2026: EconomicState = {
    nairaToUSD: 1800,           // ₦1800/$1
    inflationRate: 28,          // 28% annually
    fuelPrice: 950,             // ₦950/L
    electricityTariff: 225,     // ₦225/kWh
    minimumWage: 70000,         // ₦70,000/month
    unemploymentRate: 35,       // 35%
    cryptoBan: false            // Lifted in 2024
};

/**
 * Apply inflation to prices
 */
export function applyInflation(
    basePrice: number,
    weeksSinceStart: number,
    annualRate: number
): number {
    const weeklyRate = annualRate / 100 / 52;
    return Math.floor(basePrice * Math.pow(1 + weeklyRate, weeksSinceStart));
}

// ============================================================================
// INVESTMENT OPTIONS
// ============================================================================

export interface Investment {
    id: string;
    name: string;
    category: 'stocks' | 'real_estate' | 'bonds' | 'business' | 'crypto' | 'ponzi';
    minimumAmount: number;
    expectedReturn: number;     // Annual %
    risk: number;               // 1-10
    lockupWeeks: number;
    description: string;
}

export const INVESTMENTS: Investment[] = [
    // Safe investments
    {
        id: 'FGN_BONDS',
        name: 'FGN Savings Bond',
        category: 'bonds',
        minimumAmount: 100000,
        expectedReturn: 12,
        risk: 1,
        lockupWeeks: 52,
        description: 'Government-backed. Safe but low returns.'
    },
    {
        id: 'FIXED_DEPOSIT',
        name: 'Bank Fixed Deposit',
        category: 'bonds',
        minimumAmount: 500000,
        expectedReturn: 8,
        risk: 1,
        lockupWeeks: 26,
        description: 'NDIC insured up to ₦5M.'
    },

    // Medium risk
    {
        id: 'DANGOTE_SHARES',
        name: 'Dangote Group Shares',
        category: 'stocks',
        minimumAmount: 200000,
        expectedReturn: 18,
        risk: 4,
        lockupWeeks: 0,
        description: 'Blue chip Nigerian stock.'
    },
    {
        id: 'LAND_LAGOS',
        name: 'Land in Lagos',
        category: 'real_estate',
        minimumAmount: 15000000,
        expectedReturn: 25,
        risk: 5,
        lockupWeeks: 104,
        description: 'Lagos land appreciates but has risks.'
    },

    // High risk
    {
        id: 'TECH_STARTUP',
        name: 'Nigerian Tech Startup',
        category: 'business',
        minimumAmount: 5000000,
        expectedReturn: 50,
        risk: 8,
        lockupWeeks: 156,
        description: 'Could 10x or go to zero.'
    },

    // Danger zone
    {
        id: 'MMM_2026',
        name: 'MMM Nigeria 2026',
        category: 'ponzi',
        minimumAmount: 50000,
        expectedReturn: 100,
        risk: 10,
        lockupWeeks: 4,
        description: '"30% monthly returns!" We all know how this ends.'
    },
    {
        id: 'FOREX_SIGNAL',
        name: 'Pastor John Forex Academy',
        category: 'ponzi',
        minimumAmount: 100000,
        expectedReturn: 200,
        risk: 10,
        lockupWeeks: 0,
        description: '"I turned ₦10K to ₦10M in 3 months!" Sure.'
    }
];

/**
 * Calculate investment return
 */
export function calculateInvestmentReturn(
    investment: Investment,
    amount: number,
    weeksHeld: number
): { value: number; crashed: boolean } {
    // Ponzi crash probability increases with time
    if (investment.category === 'ponzi') {
        const crashProb = weeksHeld * 0.05;
        if (Math.random() < crashProb) {
            return { value: 0, crashed: true };
        }
    }

    // Normal return with variance
    const weeklyReturn = investment.expectedReturn / 100 / 52;
    const variance = (Math.random() - 0.5) * investment.risk * 0.02;
    const actualReturn = weeklyReturn + variance;

    const value = amount * Math.pow(1 + actualReturn, weeksHeld);
    return { value: Math.floor(value), crashed: false };
}

// ============================================================================
// FOREX BLACK MARKET
// ============================================================================

export interface ForexTransaction {
    type: 'buy' | 'sell';
    amount: number;
    rate: number;
    week: number;
}

/**
 * Get black market rate (always worse than official)
 */
export function getBlackMarketRate(
    officialRate: number,
    demand: 'high' | 'normal' | 'low'
): number {
    const premiums = { high: 1.3, normal: 1.15, low: 1.05 };
    return Math.floor(officialRate * premiums[demand]);
}

/**
 * Buy dollars from aboki
 */
export function buyDollarsBlackMarket(
    nairaAmount: number,
    blackMarketRate: number
): { dollars: number; risk: string } {
    const dollars = nairaAmount / blackMarketRate;

    // Risk of fake notes or EFCC
    const risks = [
        'Transaction successful. No issues.',
        'The aboki gave you some fake notes.',
        'EFCC agents spotted you. Pay ₦50,000 "settlement."',
        'Got a great rate! Wait, those are photocopies...'
    ];

    return {
        dollars,
        risk: risks[Math.floor(Math.random() * risks.length)]
    };
}

// ============================================================================
// EXPORTS
// ============================================================================

export function createEmptyPortfolio(): CryptoPortfolio {
    return {
        holdings: [],
        totalInvested: 0,
        realizedGains: 0,
        unrealizedGains: 0
    };
}
