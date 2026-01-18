/**
 * Enoch Watcher - Anti-Cheat System
 */

const ENOCH_MESSAGES = [
    "I see what you are doing.",
    "The simulation cannot handle this much greed.",
    "Do you think God is blind?",
    "Every coin you steal is recorded.",
    "The Architect is watching.",
    "SYSTEM WARNING: ANOMALY DETECTED IN SECTOR 7G."
];

export const checkEnochIntervention = (
    currentCash: number,
    lastCash: number,
    addToast: (msg: string, type: 'info' | 'success' | 'warning' | 'danger') => void
) => {
    // 1. Wealth Spike Detection ( Gaining > 1 Billion in one go)
    if (currentCash - lastCash > 1_000_000_000) {
        // Trigger generic warning
        setTimeout(() => {
            addToast("👁️ ENOCH IS WATCHING 👁️", "danger");
        }, 1000);

        setTimeout(() => {
            const msg = ENOCH_MESSAGES[Math.floor(Math.random() * ENOCH_MESSAGES.length)];
            addToast(msg, "danger");
        }, 4000);

        return true;
    }

    // 2. Console Command / Cheat Detection could go here if we tracked it
    return false;
};
