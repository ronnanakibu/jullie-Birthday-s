"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS, EASE_APPLE, EASE_SOFT, CelebrationPhase } from "@/lib/constants";
import { FINAL_MESSAGE, VERSE_TEXT, VERSE_REF, AFTER_HEART, AFTER_HEART_2 } from "@/lib/content";
import { FloatingParticles, GrainOverlay } from "@/components/animations/AnimatedBackground";
import { Petals } from "@/components/animations/Petals";
import { CloudShape, MoonIcon, FlowerIcon } from "@/components/animations/Icons";
import { ButterflyRelease } from "@/components/animations/Butterflies";
import { CakeDrawing } from "@/components/animations/CakeDrawing";
import { HandwrittenHeading } from "@/components/animations/HandwrittenHeading";
import { HeartButton } from "@/components/HeartButton";
import { playHeartbeat, playChime } from "@/lib/audioEngine";

export function Celebration({ reduced }: { reduced: boolean }) {
    const [phase, setPhase] = useState<CelebrationPhase>("final-message");
    const [candlesLit, setCandlesLit] = useState(false);
    const [smilingMoon, setSmilingMoon] = useState(false);
    const [burstPetals, setBurstPetals] = useState(false);
    const [butterflyRelease, setButterflyRelease] = useState(false);
    const tapCountRef = useRef(0);
    const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const heartbeatFired = useRef(false);

    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];
        timers.push(setTimeout(() => setPhase("verse"), reduced ? 800 : 2600));
        timers.push(setTimeout(() => setPhase("transform"), reduced ? 1600 : 6200));
        timers.push(setTimeout(() => setPhase("cake"), reduced ? 2200 : 8200));
        timers.push(setTimeout(() => setPhase("greeting"), reduced ? 3000 : 12200));
        timers.push(setTimeout(() => setPhase("wish"), reduced ? 3800 : 15200));
        timers.push(setTimeout(() => setPhase("heart"), reduced ? 4600 : 18400));
        return () => timers.forEach(clearTimeout);
    }, [reduced]);

    useEffect(() => {
        if (phase === "greeting" && !heartbeatFired.current) {
            heartbeatFired.current = true;
            playHeartbeat();
        }
    }, [phase]);

    const handleHeartTap = () => {
        setBurstPetals(true);
        setTimeout(() => setPhase("surprise"), reduced ? 300 : 1600);
    };

    const handleBgTripleTap = () => {
        tapCountRef.current += 1;
        if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
        tapTimerRef.current = setTimeout(() => (tapCountRef.current = 0), 600);
        if (tapCountRef.current >= 3) {
            tapCountRef.current = 0;
            setButterflyRelease(true);
            playChime(990);
            setTimeout(() => setButterflyRelease(false), 4000);
        }
    };

    const showWorld = phase !== "final-message" && phase !== "verse";

    return (
        <motion.div
            key="act3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE_APPLE }}
            onClick={handleBgTripleTap}
            style={{
                position: "fixed",
                inset: 0,
                overflow: "hidden",
                background: showWorld
                    ? `linear-gradient(180deg, #EAF4FF 0%, ${COLORS.pastelBlue} 55%, #CFE6FA 100%)`
                    : COLORS.bg,
                transition: "background 2s ease",
            }}
        >
            <GrainOverlay />
            <FloatingParticles count={12} reduced={reduced} seed={23} />
            <Petals active={showWorld && phase !== "surprise"} burst={burstPetals} reduced={reduced} />

            {showWorld && !reduced && (
                <>
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 0.5, x: [0, 20, 0] }}
                        transition={{ opacity: { duration: 2 }, x: { duration: 26, repeat: Infinity, ease: "easeInOut" } }}
                        style={{ position: "absolute", top: "12%", left: "-4%" }}
                        aria-hidden="true"
                    >
                        <CloudShape opacity={0.7} />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 0.4, x: [0, -16, 0] }}
                        transition={{ opacity: { duration: 2, delay: 0.4 }, x: { duration: 30, repeat: Infinity, ease: "easeInOut" } }}
                        style={{ position: "absolute", top: "22%", right: "-6%" }}
                        aria-hidden="true"
                    >
                        <CloudShape opacity={0.6} />
                    </motion.div>
                </>
            )}

            {showWorld && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.85 }}
                    transition={{ duration: 1.5 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSmilingMoon((v) => !v);
                    }}
                    style={{ position: "absolute", top: "8%", left: "8%", cursor: "pointer" }}
                    aria-label="Tap the moon"
                    role="button"
                >
                    <MoonIcon size={44} smiling={smilingMoon} />
                </motion.div>
            )}

            <ButterflyRelease active={butterflyRelease} />

            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 30px",
                    textAlign: "center",
                }}
            >
                <AnimatePresence mode="wait">
                    {phase === "final-message" && (
                        <motion.p
                            key="fm"
                            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, filter: "blur(6px)" }}
                            transition={{ duration: 1.2, ease: EASE_APPLE }}
                            style={{
                                fontFamily: "var(--font-cormorant)",
                                fontSize: 23,
                                lineHeight: 1.6,
                                color: COLORS.ink,
                                fontWeight: 500,
                            }}
                        >
                            {FINAL_MESSAGE}
                        </motion.p>
                    )}

                    {phase === "verse" && (
                        <motion.div
                            key="verse"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 1 } }}
                            transition={{ duration: 1.4, ease: EASE_SOFT }}
                            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}
                        >
                            <motion.div
                                animate={reduced ? {} : { opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                style={{
                                    fontFamily: "var(--font-cormorant)",
                                    fontStyle: "italic",
                                    fontSize: 20,
                                    lineHeight: 1.75,
                                    color: COLORS.inkSoft,
                                    maxWidth: 300,
                                }}
                            >
                                &ldquo;{VERSE_TEXT}&rdquo;
                            </motion.div>
                            <span
                                style={{
                                    fontFamily: "var(--font-inter)",
                                    fontSize: 12,
                                    letterSpacing: "0.08em",
                                    color: COLORS.inkFaint,
                                    textTransform: "uppercase",
                                }}
                            >
                                {VERSE_REF}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {(phase === "cake" || phase === "greeting" || phase === "wish" || phase === "heart" || phase === "surprise") && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: EASE_APPLE }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                        <CakeDrawing
                            stage={phase === "cake" ? 2.5 : 3}
                            candlesLit={candlesLit}
                            reduced={reduced}
                            onLongPressCandles={() => {
                                setCandlesLit(true);
                                playChime(770);
                            }}
                        />
                    </motion.div>
                )}

                {(phase === "greeting" || phase === "wish" || phase === "heart" || phase === "surprise") && (
                    <div style={{ marginTop: 8 }}>
                        <HandwrittenHeading show={true} reduced={reduced} />
                    </div>
                )}

                <AnimatePresence>
                    {(phase === "wish" || phase === "heart") && (
                        <motion.p
                            key="wish"
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: EASE_APPLE }}
                            style={{
                                marginTop: 18,
                                fontFamily: "var(--font-cormorant)",
                                fontSize: 18,
                                lineHeight: 1.6,
                                color: COLORS.ink,
                                maxWidth: 300,
                            }}
                        >
                            I hope today becomes one of the memories
                            <br />
                            you never forget.
                        </motion.p>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {phase === "heart" && (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.6, ease: EASE_APPLE }}
                            style={{ marginTop: 26, position: "relative" }}
                        >
                            <HeartButton onTap={handleHeartTap} reduced={reduced} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {phase === "surprise" && (
                        <motion.div
                            key="surprise"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.6, delay: 0.3, ease: EASE_SOFT }}
                            style={{
                                position: "fixed",
                                inset: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "rgba(250,252,255,0.96)",
                                zIndex: 10,
                                padding: "0 30px",
                                textAlign: "center",
                            }}
                        >
                            <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 21, color: COLORS.ink, marginBottom: 6 }}>
                                {AFTER_HEART}
                            </p>
                            <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 21, color: COLORS.ink, marginBottom: 24 }}>
                                {AFTER_HEART_2}
                            </p>
                            <FlowerIcon size={50} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
