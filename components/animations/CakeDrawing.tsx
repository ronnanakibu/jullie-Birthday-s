"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS, EASE_SOFT } from "@/lib/constants";

export function CakeDrawing({
    stage,
    reduced,
    candlesLit,
    onLongPressCandles,
}: {
    stage: number;
    reduced?: boolean;
    candlesLit?: boolean;
    onLongPressCandles?: () => void;
}) {
    return (
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: stage >= 1 ? 1 : 0 }} transition={{ duration: 0.4 }}>
                <motion.ellipse
                    cx="70" cy="118" rx="46" ry="7"
                    stroke={COLORS.ink} strokeWidth="1.3" fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: stage >= 1 ? 1 : 0 }}
                    transition={{ duration: reduced ? 0.3 : 1, ease: EASE_SOFT }}
                />
                <motion.path
                    d="M32 112 L32 90 Q32 84 38 84 L102 84 Q108 84 108 90 L108 112"
                    stroke={COLORS.ink} strokeWidth="1.3" fill="none" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: stage >= 1 ? 1 : 0 }}
                    transition={{ duration: reduced ? 0.3 : 1.1, delay: reduced ? 0 : 0.3, ease: EASE_SOFT }}
                />
                <motion.path
                    d="M32 84 Q40 78 48 84 Q56 90 64 84 Q72 78 80 84 Q88 90 96 84 Q102 80 108 84"
                    stroke={COLORS.ink} strokeWidth="1.3" fill="none" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: stage >= 1 ? 1 : 0 }}
                    transition={{ duration: reduced ? 0.3 : 0.9, delay: reduced ? 0 : 0.9, ease: EASE_SOFT }}
                />
                <motion.path
                    d="M46 84 L46 64 Q46 58 52 58 L88 58 Q94 58 94 64 L94 84"
                    stroke={COLORS.ink} strokeWidth="1.3" fill="none" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: stage >= 1 ? 1 : 0 }}
                    transition={{ duration: reduced ? 0.3 : 0.9, delay: reduced ? 0 : 1.3, ease: EASE_SOFT }}
                />
                <motion.path
                    d="M46 58 Q52 52 58 58 Q64 64 70 58 Q76 52 82 58 Q88 64 94 58"
                    stroke={COLORS.ink} strokeWidth="1.3" fill="none" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: stage >= 1 ? 1 : 0 }}
                    transition={{ duration: reduced ? 0.3 : 0.7, delay: reduced ? 0 : 1.8, ease: EASE_SOFT }}
                />
            </motion.g>

            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: stage >= 2 ? 1 : 0 }}
                transition={{ duration: 0.5, delay: reduced ? 0 : 0.2 }}
                style={{ cursor: "pointer" }}
                onPointerDown={onLongPressCandles}
            >
                {[58, 70, 82].map((x, i) => (
                    <motion.line
                        key={x}
                        x1={x} y1="58" x2={x} y2="42"
                        stroke={COLORS.ink} strokeWidth="1.3" strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: stage >= 2 ? 1 : 0 }}
                        transition={{ duration: 0.4, delay: reduced ? 0 : 2.2 + i * 0.15, ease: EASE_SOFT }}
                    />
                ))}
            </motion.g>

            {[58, 70, 82].map((x, i) => (
                <AnimatePresence key={x}>
                    {(stage >= 3 || candlesLit) && (
                        <motion.path
                            d={`M${x} 42 Q${x - 3} 36 ${x} 32 Q${x + 3} 36 ${x} 42`}
                            fill={COLORS.gold}
                            initial={{ opacity: 0, scale: 0.3, y: 4 }}
                            animate={{
                                opacity: 1,
                                scale: reduced ? 1 : [1, 1.15, 0.95, 1.08, 1],
                                y: 0,
                            }}
                            exit={{ opacity: 0, scale: 0.3 }}
                            transition={{
                                opacity: { duration: 0.4, delay: reduced ? 0 : i * 0.15 },
                                scale: reduced
                                    ? { duration: 0.3 }
                                    : { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
                            }}
                            style={{ transformOrigin: `${x}px 42px` }}
                        />
                    )}
                </AnimatePresence>
            ))}
        </svg>
    );
}
