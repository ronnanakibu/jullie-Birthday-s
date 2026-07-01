"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_SOFT } from "@/lib/constants";
import { ButterflyIcon } from "@/components/animations/Icons";

export function DriftingButterfly({ delay = 0 }: { delay?: number }) {
    return (
        <motion.div
            style={{ position: "absolute", top: "22%", left: "10%", zIndex: 1 }}
            animate={{ x: [0, 240, 260], y: [0, -20, 10], opacity: [0, 0.6, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay }}
            aria-hidden="true"
        >
            <ButterflyIcon size={20} />
        </motion.div>
    );
}

export function ButterflyRelease({ active }: { active: boolean }) {
    return (
        <AnimatePresence>
            {active &&
                Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: "50%", y: "70%" }}
                        animate={{
                            opacity: [0, 0.8, 0],
                            x: `${20 + i * 12}%`,
                            y: [`70%`, `${20 + i * 5}%`],
                        }}
                        transition={{ duration: 3, delay: i * 0.1, ease: EASE_SOFT }}
                        style={{ position: "absolute", zIndex: 6 }}
                        aria-hidden="true"
                    >
                        <ButterflyIcon size={22} />
                    </motion.div>
                ))}
        </AnimatePresence>
    );
}
