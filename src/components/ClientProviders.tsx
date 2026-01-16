/**
 * Client Layout Wrapper
 * Provides client-side contexts like SoundProvider to the app
 */

'use client';

import { MLEngineProvider } from '@/context/MLEngineContext';
import NeuroBridge from '@/engine/neuro/NeuroBridge';
import NeuroFeedInjector from '@/components/neuro/NeuroFeedInjector';
import { SoundProvider } from '@/hooks/useSoundManager';
import AudioControls from '@/components/AudioControls';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <MLEngineProvider>
            <SoundProvider>
                {children}
                <AudioControls />
                <VisualizerWrapper />
                <NeuroBridge />
                <NeuroFeedInjector />
            </SoundProvider>
        </MLEngineProvider>
    );
}

function VisualizerWrapper() {
    const { showVisualizer } = require('@/context/MLEngineContext').useMLEngine();
    const GraphVisualizer = require('@/components/neuro/GraphVisualizer').default;

    if (!showVisualizer) return null;
    return <GraphVisualizer />;
}
