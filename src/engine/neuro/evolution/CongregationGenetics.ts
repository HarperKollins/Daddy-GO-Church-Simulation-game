import { cosineSimilarity } from '@/lib/ml/VectorMath';
import { EmotionalState } from '../EmotionalState';

/**
 * 🧬 CONGREGATION GENETICS ENGINE
 * 
 * Instead of a single "Member Count", the church is a population of "Genotypes".
 * E.g., Some members are "Genetically Greedy", others are "Genetically Skeptical".
 * 
 * - **Selection**: Sermons that align with a Genotype strengthen it. Sermons that oppose it cause "Death" (Leaving).
 * - **Mutation**: New members arrive with random variations.
 * - **Evolution**: Over time, you breed a specific type of cult.
 */

export interface Genotype {
    id: string;
    name: string;        // E.g., "The Pious", "The Seekers", "The Opportunists"
    dna: number[];       // The 6D Vibe Vector acting as their "Ideal State"
    population: number;  // How many members belong to this tribe
    resilience: number;  // 0-1. How hard it is to drive them away.
}

// The 6 Archetypal Genotypes (Starting Seeds)
export const GENOTYPE_ARCHETYPES: Omit<Genotype, 'population'>[] = [
    {
        id: 'GEN_SHEEP',
        name: 'The Loyal Sheep',
        dna: [0.8, 0.1, 0.1, 1.0, 0.0, 0.9], // High Faith, High Loyalty, High Unity
        resilience: 0.8 // Hard to kill
    },
    {
        id: 'GEN_TRADER',
        name: 'The Transactional',
        dna: [0.2, 0.9, 0.4, 0.3, 0.5, 0.2], // High Greed, Moderate Fear/Skepticism
        resilience: 0.4 // Leaves if not profitable
    },
    {
        id: 'GEN_SKEPTIC',
        name: 'The Critical Thinkers',
        dna: [0.1, 0.1, 0.2, 0.1, 0.9, 0.1], // High Skepticism
        resilience: 0.9 // Stays just to criticize
    },
    {
        id: 'GEN_DESPERATE',
        name: 'The Desperate',
        dna: [0.5, 0.2, 0.9, 0.4, 0.1, 0.3], // High Fear
        resilience: 0.6 // Volatile
    },
    {
        id: 'GEN_PURIST',
        name: 'The Foundational',
        dna: [0.9, 0.0, 0.0, 0.5, 0.2, 0.8], // Pure Faith, Low Greed
        resilience: 0.5 // Leaves if church gets too corrupt
    }
];

export class CongregationGenetics {
    private genotypes: Genotype[];

    constructor() {
        this.genotypes = [];
        this.initializePopulation(100); // Start with 100 seeds for simulation
    }

    /**
     * Create the initial "Primordial Soup" of the church
     */
    public initializePopulation(initialSize: number) {
        // Distribute initial members roughly equally among archetypes
        const perArchetype = Math.floor(initialSize / GENOTYPE_ARCHETYPES.length);

        this.genotypes = GENOTYPE_ARCHETYPES.map(arch => ({
            ...arch,
            population: perArchetype
        }));

        this.normalizePopulation();
        console.log("🧬 GENETICS: Population Initialized", this.genotypes);
    }

    /**
     * Get the current breakdown
     */
    public getPopulationSnapshot() {
        return this.genotypes.map(g => ({ name: g.name, count: g.population }));
    }

    /**
     * NATURAL SELECTION (The Sermon Effect)
     * 
     * When the player preaches (or just ends a week with a specific Global Vibe),
     * we apply "Selection Pressure".
     * 
     * - Genotypes that align with the Vibe -> GROW
     * - Genotypes that oppose the Vibe -> DIE / LEAVE
     */
    public evolve(environmentVibe: number[], totalMemberCount: number): string[] {
        const events: string[] = [];

        // 1. Calculate Fitness for each Genotype
        // Fitness = CosineSimilarity(DNA, Environment)
        const fitnessMap = this.genotypes.map(g => {
            const fitness = cosineSimilarity(g.dna, environmentVibe);
            return { id: g.id, fitness };
        });

        // 2. Apply Selection
        this.genotypes.forEach(g => {
            const fit = fitnessMap.find(f => f.id === g.id)?.fitness || 0;

            // Growth or Decay Rate
            // If fitness > 0.7, they thrive.
            // If fitness < 0.3, they leave (unless high resilience saves them)

            let changeRate = 0;

            if (fit > 0.8) {
                changeRate = 0.15; // Boom
                if (Math.random() > 0.7) events.push(`${g.name} are thriving in this atmosphere!`);
            } else if (fit > 0.6) {
                changeRate = 0.05; // Growth
            } else if (fit < 0.3) {
                // Determine if resilience saves them
                if (Math.random() > g.resilience) {
                    changeRate = -0.10; // Die off
                    if (g.population > 10 && Math.random() > 0.8) events.push(`${g.name} are leaving quietly.`);
                }
            } else if (fit < 0.1) {
                changeRate = -0.25; // Mass exodus
                events.push(`${g.name} are offended by the atmosphere!`);
            }

            // Apply change (Simulating percentage of Total Church Count to keep numbers relative)
            // We scale the population cluster count
            g.population = Math.floor(g.population * (1 + changeRate));
            if (g.population < 0) g.population = 0;
        });

        // 3. MUTATION (New Blood)
        // Every week, new random members join who might not fit the mold
        // This prevents the population from becoming too homogenous too fast (stagnation)
        if (Math.random() > 0.5) {
            const mutantCount = Math.floor(Math.random() * 5); // Small trickle
            const randomArchetype = GENOTYPE_ARCHETYPES[Math.floor(Math.random() * GENOTYPE_ARCHETYPES.length)];

            const targetGenotype = this.genotypes.find(g => g.id === randomArchetype.id);
            if (targetGenotype) {
                targetGenotype.population += mutantCount;
            }
        }

        // 4. Update the "Dominant Genotype" Logic
        // (Just sorting for internal tracking if needed)
        this.genotypes.sort((a, b) => b.population - a.population);

        return events;
    }

    /**
     * Get the "Collective DNA" (Aggregate Vibe)
     * This allows the Genetics to influence the Global Vibe in return (Feedback Loop)
     */
    public getCollectiveDNA(): number[] {
        let totalPop = 0;
        const weightedSum = [0, 0, 0, 0, 0, 0];

        this.genotypes.forEach(g => {
            totalPop += g.population;
            for (let i = 0; i < 6; i++) {
                weightedSum[i] += g.dna[i] * g.population;
            }
        });

        if (totalPop === 0) return [0, 0, 0, 0, 0, 0];

        // Average
        return weightedSum.map(val => val / totalPop);
    }

    private normalizePopulation() {
        // Ensure minimal viable population
        this.genotypes.forEach(g => {
            if (g.population < 0) g.population = 0;
        });
    }
}
