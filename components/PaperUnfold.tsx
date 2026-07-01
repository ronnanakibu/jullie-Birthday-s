"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { COLORS, EASE_APPLE } from "@/lib/constants";
import { playPaperRustle } from "@/lib/audioEngine";

export function PaperUnfold({ onDone, reduced }: { onDone: () => void; reduced: boolean }) {
    useEffect(() => {
        // Play soft paper rustling audio as the paper unfolds
        playPaperRustle();
        const t = setTimeout(onDone, reduced ? 300 : 2200);
        return () => clearTimeout(t);
    }, [onDone, reduced]);

    return (
        <motion.div
            key="unfold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: COLORS.pastelBlue,
            }}
        >
            <motion.div
                initial={{ scaleY: 0.15, y: 40, opacity: 0.4, borderRadius: 18 }}
                animate={{ scaleY: 1, y: 0, opacity: 1, borderRadius: 10 }}
                transition={{ duration: reduced ? 0.3 : 1.8, ease: EASE_APPLE }}
                style={{
                    width: 240,
                    height: 320,
                    background: "linear-gradient(180deg, #FFFFFF, #F4FAFF)",
                    transformOrigin: "bottom center",
                    boxShadow: "0 30px 60px rgba(120,170,220,0.4)",
                    border: `1px solid ${COLORS.lineFaint}`,
                }}
            />
        </motion.div>
    );
}
