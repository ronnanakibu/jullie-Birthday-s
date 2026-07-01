"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "@/lib/constants";
import { EASTER_EGG_TEXT } from "@/lib/content";
import { playChime } from "@/lib/audioEngine";

export function HeartButton({ onTap, reduced }: { onTap: () => void; reduced: boolean }) {
    const [pressing, setPressing] = useState(false);
    const [secretFound, setSecretFound] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const firedRef = useRef(false);

    const startPress = () => {
        firedRef.current = false;
        setPressing(true);
        timerRef.current = setTimeout(() => {
            firedRef.current = true;
            setSecretFound(true);
            playChime(660);
            setTimeout(() => setSecretFound(false), 2400);
        }, 3000);
    };

    const endPress = () => {
        setPressing(false);
        if (timerRef.current) clearTimeout(timerRef.current);
        if (!firedRef.current) {
            playChime(880);
            onTap();
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, position: "relative" }}>
            <motion.button
                aria-label="Tap the heart"
                onPointerDown={startPress}
                onPointerUp={endPress}
                onPointerLeave={() => {
                    if (timerRef.current) clearTimeout(timerRef.current);
                    setPressing(false);
                }}
                animate={reduced ? {} : { scale: [1, 1.08, 1] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                whileTap={{ scale: 0.85 }}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 8, position: "relative" }}
            >
                <motion.div animate={pressing ? { scale: 1.4 } : { scale: 1 }} transition={{ duration: 2.8, ease: "linear" }}>
                    <svg width="44" height="44" viewBox="0 0 44 44">
                        <path
                            d="M22 38 C10 29, 4 21, 4 14 C4 7, 10 3, 15 3 C19 3, 22 6, 22 10 C22 6, 25 3, 29 3 C34 3, 40 7, 40 14 C40 21, 34 29, 22 38 Z"
                            fill={COLORS.babyBlue}
                            stroke="#5B93C4"
                            strokeWidth="0.8"
                        />
                    </svg>
                </motion.div>
            </motion.button>
            <span style={{ fontSize: 12, color: COLORS.inkFaint, fontFamily: "var(--font-inter)", letterSpacing: "0.03em" }}>
                Tap the heart
            </span>
            <AnimatePresence>
                {secretFound && (
                    <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "absolute",
                            top: "100%",
                            marginTop: 8,
                            fontFamily: "var(--font-cormorant)",
                            fontStyle: "italic",
                            fontSize: 15,
                            color: COLORS.ink,
                            background: COLORS.white,
                            padding: "8px 16px",
                            borderRadius: 999,
                            border: `1px solid ${COLORS.line}`,
                            whiteSpace: "nowrap",
                            zIndex: 10,
                        }}
                    >
                        {EASTER_EGG_TEXT} 💙
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
