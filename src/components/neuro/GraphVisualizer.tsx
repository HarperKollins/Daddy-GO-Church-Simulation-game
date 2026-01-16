"use client";

import React, { useRef, useEffect } from 'react';
import { useMLEngine } from '@/context/MLEngineContext';
import { GraphNode, GraphEdge } from '@/engine/neuro/graph/GraphTypes';

export default function GraphVisualizer() {
    const { graph } = useMLEngine();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!graph || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Mock Data for Visualization if graph empty (since we haven't connected game engine yet)
        const mockNodes = Array.from({ length: 20 }).map((_, i) => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            color: i === 0 ? '#ef4444' : '#3b82f6' // Pastor is Red, others Blue
        }));

        let animationFrameId: number;

        const render = () => {
            // Clear
            ctx.fillStyle = '#0a0a0f';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Edges (Mock connections for vibe)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            mockNodes.forEach((node, i) => {
                const neighbor = mockNodes[(i + 1) % mockNodes.length];
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(neighbor.x, neighbor.y);
            });
            ctx.stroke();

            // Draw Nodes
            mockNodes.forEach(node => {
                // Glow effect
                const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 20);
                gradient.addColorStop(0, node.color);
                gradient.addColorStop(1, 'transparent');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
                ctx.fill();

                // Core
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });

            // Mock Signal Pulse (The "Virus")
            const time = Date.now() / 1000;
            mockNodes.forEach(node => {
                if (Math.sin(time + node.x) > 0.8) {
                    ctx.strokeStyle = '#ef4444';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, 30 * (Math.sin(time * 5) + 1), 0, Math.PI * 2);
                    ctx.stroke();
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, [graph]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 w-[90vw] max-w-4xl shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-purple-400">Hub</span>
                        Spiritual Vision (GNN Debug)
                    </h3>
                    <button className="text-slate-400 hover:text-white">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="relative aspect-video bg-black rounded border border-slate-800 overflow-hidden">
                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={450}
                        className="w-full h-full"
                    />

                    {/* HUD Overlay */}
                    <div className="absolute top-2 left-2 text-xs text-green-400 font-mono">
                        <div>TensorFlow.js: ACTIVE (WebGL)</div>
                        <div>Nodes: 20 (Simulated)</div>
                        <div>Signal Decay: 0.85</div>
                    </div>
                </div>

                <div className="mt-4 flex gap-2">
                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm font-bold">
                        Inject Scandal Signal
                    </button>
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm">
                        Reset Graph
                    </button>
                </div>
            </div>
        </div>
    );
}
