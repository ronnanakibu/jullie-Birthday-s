"use client";

import React from "react";
import { motion } from "framer-motion";
import { useParticles } from "@/hooks/useParticles";
import { COLORS, EASE_APPLE } from "@/lib/constants";

export function Petals({ active, burst, reduced }: { active?: boolean; burst?: boolean; reduced?: boolean }) {
    const petals = useParticles(burst ? 30 : 12, burst ? 99 : 3);
    if (reduced) return null;
    return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 5 }} aria-hidden="true">
            {(active || burst) &&
                petals.map((p) => (
                    <motion.div
                        key={p.id + (burst ? "b" : "a")}
                        initial={{
                            top: burst ? "50%" : "-5%",
                            left: burst ? "50%" : `${p.x}%`,
                            opacity: 0,
                            rotate: 0,
                        }}
                        animate={{
                            top: burst ? `${p.y}%` : "105%",
                            left: burst ? `${p.x}%` : `${p.x + Math.sin(p.id) * 10}%`,
                            opacity: [0, 0.85, 0],
                            rotate: 360,
                        }}
                        transition={{
                            duration: burst ? 1.6 + p.duration / 20 : p.duration / 2.2,
                            delay: burst ? p.delay * -0.02 : Math.abs(p.delay) / 3,
                            repeat: burst ? 0 : Infinity,
                            ease: burst ? EASE_APPLE : "linear",
                        }}
                        style={{ position: "absolute" }}
                    >
                        <svg width={burst ? 10 : 8} height={burst ? 10 : 8} viewBox="0 0 10 10">
                            <ellipse cx="5" cy="5" rx="5" ry="3" fill={COLORS.babyBlue} opacity="0.8" />
                        </svg>
                    </motion.div>
                ))}
        </div>
    );
}
