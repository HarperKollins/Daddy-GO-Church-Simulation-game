/**
 * Client Layout Wrapper
 * Provides client-side contexts like SoundProvider to the app
 */

'use client';

import { SoundProvider } from '@/hooks/useSoundManager';
import AudioControls from '@/components/AudioControls';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <SoundProvider>
            {children}
            <AudioControls />
        </SoundProvider>
    );
}
