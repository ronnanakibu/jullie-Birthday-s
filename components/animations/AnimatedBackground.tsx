"use client";

import React from "react";
import { motion } from "framer-motion";
import { useParticles } from "@/hooks/useParticles";
import { COLORS } from "@/lib/constants";

export function FloatingParticles({ count = 14, reduced, seed = 7 }: { count?: number; reduced?: boolean; seed?: number }) {
    const particles = useParticles(count, seed);
    if (reduced) return null;
    return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }} aria-hidden="true">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    style={{
                        position: "absolute",
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        borderRadius: "50%",
                        background: COLORS.babyBlue,
                        opacity: 0.35,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, p.drift, 0],
                        opacity: [0.15, 0.4, 0.15],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

export function GrainOverlay() {
    return (
        <svg
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0.025,
                pointerEvents: "none",
                mixBlendMode: "multiply",
            }}
            aria-hidden="true"
        >
            <filter id="grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
    );
}
