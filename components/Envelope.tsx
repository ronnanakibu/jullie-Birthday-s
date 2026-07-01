"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { COLORS, EASE_APPLE } from "@/lib/constants";
import { FloatingParticles, GrainOverlay } from "@/components/animations/AnimatedBackground";
import { EnvelopeSVG, WaxSeal } from "@/components/animations/Icons";
import { playSealCrack, playPaperRustle, startAmbient } from "@/lib/audioEngine";

export function Envelope({ onOpen, reduced }: { onOpen: () => void; reduced: boolean }) {
    const [pressed, setPressed] = useState(false);
    const [sealCracked, setSealCracked] = useState(false);

    const handleOpen = () => {
        if (pressed) return;
        setPressed(true);
        setSealCracked(true);
        
        // Interactive audio feedback
        playSealCrack();
        playPaperRustle();
        startAmbient(0.14); // starts ambient pad automatically on first user click
        
        setTimeout(() => {
            onOpen();
        }, reduced ? 200 : 1400);
    };

    return (
        <motion.div
            key="act1"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE_APPLE } }}
            style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.pastelBlue} 100%)`,
                overflow: "hidden",
            }}
        >
            <GrainOverlay />
            <FloatingParticles count={16} reduced={reduced} seed={7} />

            <motion.div
                animate={
                    pressed
                        ? { scale: reduced ? 1 : 1.15, filter: "brightness(0.9)" }
                        : { scale: 1, filter: "brightness(1)" }
                }
                transition={{ duration: reduced ? 0.2 : 1.2, ease: EASE_APPLE }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2 }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{
                        opacity: 1,
                        y: reduced ? 0 : [0, -6, 0],
                    }}
                    transition={{
                        opacity: { duration: 0.9, delay: 0.6, ease: EASE_APPLE },
                        y: reduced
                            ? { duration: 0 }
                            : { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
                    }}
                    style={{
                        position: "relative",
                        filter: "drop-shadow(0 18px 40px rgba(120,170,220,0.35))",
                    }}
                >
                    <EnvelopeSVG />
                    <motion.div
                        animate={
                            pressed
                                ? { scale: [1, 1.3, 0], opacity: [1, 1, 0], rotate: [0, 8, 15] }
                                : {}
                        }
                        transition={{ duration: reduced ? 0.3 : 0.9, ease: EASE_APPLE }}
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                        }}
                    >
                        <WaxSeal cracked={sealCracked} />
                    </motion.div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: pressed ? 0 : 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1, ease: EASE_APPLE }}
                    style={{
                        marginTop: 28,
                        fontFamily: "var(--font-cormorant)",
                        fontSize: 17,
                        letterSpacing: "0.02em",
                        color: COLORS.inkSoft,
                        textAlign: "center",
                    }}
                >
                    A special letter,
                    <br />
                    just for you 💙
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: pressed ? 0 : 1, y: 0 }}
                    whileHover={reduced ? {} : { scale: 1.04, boxShadow: "0 10px 30px rgba(130,180,230,0.4)" }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.8, delay: 1.4, ease: EASE_APPLE }}
                    onClick={handleOpen}
                    aria-label="Open letter"
                    style={{
                        marginTop: 26,
                        padding: "14px 38px",
                        borderRadius: 999,
                        border: "none",
                        background: `linear-gradient(135deg, ${COLORS.babyBlue}, #8FC9F5)`,
                        color: "#0C447C",
                        fontFamily: "var(--font-inter)",
                        fontSize: 15,
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                        cursor: "pointer",
                        boxShadow: "0 6px 20px rgba(130,180,230,0.3)",
                        pointerEvents: pressed ? "none" : "auto",
                    }}
                >
                    Open Letter
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
