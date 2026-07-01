"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { COLORS, EASE_APPLE } from "@/lib/constants";
import { RECIPIENT, STORY_SECTIONS } from "@/lib/content";
import { FloatingParticles, GrainOverlay } from "@/components/animations/AnimatedBackground";
import {
    StarIcon,
    FlowerIcon,
    RibbonDivider,
    MoonIcon,
    GiftIcon,
    BalloonIcon,
    CloudShape
} from "@/components/animations/Icons";
import { DriftingButterfly } from "@/components/animations/Butterflies";
import { StorySection } from "@/components/StorySection";
import { ProgressIndicator } from "@/components/ProgressIndicator";

export function Letter({ onComplete, reduced }: { onComplete: () => void; reduced: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [showContinue, setShowContinue] = useState(false);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const { scrollYProgress } = useScroll({ container: containerRef });
    const bgHue = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const bgSmooth = useSpring(bgHue, { stiffness: 40, damping: 20 });
    const bgColor = useTransform(
        bgSmooth,
        [0, 0.5, 1],
        ["rgba(220,238,255,0.4)", "rgba(200,225,250,0.55)", "rgba(175,205,235,0.7)"]
    );

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const idx = Number((entry.target as HTMLElement).dataset.idx);
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        setActiveIndex(idx);
                        if (idx === STORY_SECTIONS.length - 1) {
                            setTimeout(() => setShowContinue(true), 900);
                        }
                    }
                });
            },
            { root: el, threshold: [0.5] }
        );
        sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
        return () => observer.disconnect();
    }, []);

    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const px = useSpring(mx, { stiffness: 50, damping: 20 });
    const py = useSpring(my, { stiffness: 50, damping: 20 });

    const handleMouse = useCallback(
        (e: React.MouseEvent) => {
            if (reduced) return;
            const { innerWidth, innerHeight } = window;
            mx.set((e.clientX / innerWidth - 0.5) * 10);
            my.set((e.clientY / innerHeight - 0.5) * 10);
        },
        [mx, my, reduced]
    );

    return (
        <motion.div
            key="act2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.7, ease: EASE_APPLE } }}
            transition={{ duration: 0.7, ease: EASE_APPLE }}
            onMouseMove={handleMouse}
            style={{ position: "fixed", inset: 0, overflow: "hidden" }}
        >
            <motion.div style={{ position: "absolute", inset: 0, background: bgColor, zIndex: 0 }} />
            <GrainOverlay />
            <FloatingParticles count={10} reduced={reduced} seed={11} />

            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
                <AnimatePresence mode="wait">
                    {(activeIndex === -1 || activeIndex === 3 || activeIndex === 4) && (
                        <motion.div
                            key="flower-bottom"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.45, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            style={{ position: "absolute", bottom: -10, left: -10, x: px, y: py }}
                            aria-hidden="true"
                        >
                            <FlowerIcon size={110} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {(activeIndex === 0 || activeIndex === 1) && (
                        <motion.div
                            key="moon"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 0.5, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            style={{ position: "absolute", top: "12%", left: "10%", x: px, y: py }}
                            aria-hidden="true"
                        >
                            <MoonIcon size={56} smiling={true} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {activeIndex === 2 && (
                        <motion.div
                            key="gift"
                            initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
                            animate={{ opacity: 0.5, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.7, rotate: 15 }}
                            style={{ position: "absolute", bottom: "15%", right: "12%", x: px, y: py }}
                            aria-hidden="true"
                        >
                            <GiftIcon size={70} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {(activeIndex === 4 || activeIndex === 6) && (
                        <motion.div
                            key="balloons"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 0.45, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            style={{ position: "absolute", top: "15%", right: "10%", x: px, y: py }}
                            aria-hidden="true"
                        >
                            <BalloonIcon size={64} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {(activeIndex === 5 || activeIndex === 8) && (
                        <motion.div
                            key="cloud-bg"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 0.5, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            style={{ position: "absolute", top: "25%", left: "-2%", x: px, y: py }}
                            aria-hidden="true"
                        >
                            <CloudShape opacity={0.6} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div style={{ position: "absolute", top: 40, right: 30, x: px, y: py, opacity: 0.4 }} aria-hidden="true">
                    <StarIcon size={14} />
                </motion.div>
                <motion.div style={{ position: "absolute", bottom: 100, right: 40, x: px, y: py, opacity: 0.3 }} aria-hidden="true">
                    <StarIcon size={10} />
                </motion.div>
            </div>

            {!reduced && (activeIndex === -1 || activeIndex === 0 || activeIndex === 3 || activeIndex === 7 || activeIndex === 8) && (
                <DriftingButterfly delay={activeIndex === -1 ? 2 : 0} />
            )}

            <ProgressIndicator total={STORY_SECTIONS.length} active={activeIndex} />

            <div
                ref={containerRef}
                style={{
                    position: "relative",
                    zIndex: 2,
                    height: "100%",
                    overflowY: "auto",
                    overflowX: "hidden",
                    scrollSnapType: reduced ? "none" : "y proximity",
                    WebkitOverflowScrolling: "touch",
                }}
            >
                <div style={{ height: "8vh" }} />

                <div
                    data-idx={-1}
                    ref={(el) => { sectionRefs.current[-1] = el; }}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "84vh",
                        scrollSnapAlign: "center",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: EASE_APPLE }}
                        style={{ position: "relative", textAlign: "center" }}
                    >
                        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 6 }} aria-hidden="true">
                            <motion.div animate={reduced ? {} : { opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity }}>
                                <StarIcon size={10} />
                            </motion.div>
                            <motion.div animate={reduced ? {} : { opacity: [1, 0.3, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}>
                                <StarIcon size={13} />
                            </motion.div>
                            <motion.div animate={reduced ? {} : { opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}>
                                <StarIcon size={10} />
                            </motion.div>
                        </div>
                        <h1
                            style={{
                                fontFamily: "var(--font-playfair), serif",
                                fontSize: 40,
                                color: COLORS.ink,
                                margin: 0,
                                fontWeight: 600,
                                letterSpacing: "-0.01em",
                                lineHeight: 1.2
                            }}
                        >
                            Happy Birthday,
                            <br />
                            {RECIPIENT}
                        </h1>
                        <div style={{ marginTop: 18, display: "flex", justifyContent: "center" }}>
                            <RibbonDivider width={120} />
                        </div>
                    </motion.div>
                </div>

                {STORY_SECTIONS.map((section, idx) => (
                    <div key={section.id} data-idx={idx} ref={(el) => { sectionRefs.current[idx] = el; }} style={{ scrollSnapAlign: "center" }}>
                        <StorySection section={section} active={activeIndex >= idx} reduced={reduced} />
                    </div>
                ))}

                <div style={{ height: "6vh" }} />

                <AnimatePresence>
                    {showContinue && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.9, ease: EASE_APPLE }}
                            style={{ display: "flex", justifyContent: "center", paddingBottom: "10vh" }}
                        >
                            <motion.button
                                whileHover={reduced ? {} : { scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={onComplete}
                                style={{
                                    padding: "14px 34px",
                                    borderRadius: 999,
                                    border: `1px solid ${COLORS.line}`,
                                    background: COLORS.white,
                                    color: COLORS.ink,
                                    fontFamily: "var(--font-inter), sans-serif",
                                    fontSize: 14,
                                    fontWeight: 500,
                                    letterSpacing: "0.02em",
                                    cursor: "pointer",
                                    boxShadow: "0 6px 20px rgba(130,180,230,0.2)",
                                }}
                            >
                                Continue →
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {!reduced && activeIndex < STORY_SECTIONS.length - 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 3 }}
                    style={{
                        position: "absolute",
                        bottom: 18,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: 11,
                        color: COLORS.inkFaint,
                        fontFamily: "var(--font-inter), sans-serif",
                        letterSpacing: "0.04em",
                        zIndex: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                    }}
                    aria-hidden="true"
                >
                    <span>Scroll to read</span>
                    <span style={{ fontSize: 14 }}>↓</span>
                </motion.div>
            )}
        </motion.div>
    );
}
