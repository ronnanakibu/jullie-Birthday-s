"use client";

import { useMemo } from "react";

export type Particle = {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    drift: number;
};

/** Deterministic pseudo-random particle field (stable across re-renders). */
export function useParticles(count: number, seed = 1): Particle[] {
    return useMemo(() => {
        let s = seed;
        const rand = () => {
            s = (s * 9301 + 49297) % 233280;
            return s / 233280;
        };
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: rand() * 100,
            y: rand() * 100,
            size: 1.5 + rand() * 2.5,
            duration: 18 + rand() * 22,
            delay: rand() * -20,
            drift: (rand() - 0.5) * 40,
        }));
    }, [count, seed]);
}
