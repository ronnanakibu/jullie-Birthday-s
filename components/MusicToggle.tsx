"use client";

import React from "react";
import { motion } from "framer-motion";
import { COLORS } from "@/lib/constants";

export function MusicToggle({ enabled, onToggle, supported }: { enabled: boolean; onToggle: () => void; supported: boolean }) {
    if (!supported) return null;
    return (
        <motion.button
            onClick={onToggle}
            aria-label={enabled ? "Mute ambient sound" : "Play ambient sound"}
            aria-pressed={enabled}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            whileTap={{ scale: 0.9 }}
            style={{
                position: "absolute",
                top: 14,
                left: 14,
                zIndex: 50,
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: `1px solid ${COLORS.lineFaint}`,
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(6px)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                {enabled ? (
                    <>
                        <path d="M4 10v4h4l5 5V5L8 10H4z" fill={COLORS.inkSoft} />
                        <path d="M16 9a3 3 0 010 6" stroke={COLORS.inkSoft} strokeWidth="1.4" strokeLinecap="round" />
                        <path d="M18.5 6.5a7 7 0 010 11" stroke={COLORS.inkSoft} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                    </>
                ) : (
                    <>
                        <path d="M4 10v4h4l5 5V5L8 10H4z" fill={COLORS.inkFaint} />
                        <line x1="16" y1="9" x2="21" y2="15" stroke={COLORS.inkFaint} strokeWidth="1.4" strokeLinecap="round" />
                        <line x1="21" y1="9" x2="16" y2="15" stroke={COLORS.inkFaint} strokeWidth="1.4" strokeLinecap="round" />
                    </>
                )}
            </svg>
        </motion.button>
    );
}
