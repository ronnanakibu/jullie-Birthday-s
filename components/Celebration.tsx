"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS, EASE_APPLE, EASE_SOFT, CelebrationPhase } from "@/lib/constants";
import { FINAL_MESSAGE, VERSE_TEXT, VERSE_REF, AFTER_HEART, AFTER_HEART_2, RECIPIENT_FULL } from "@/lib/content";
import { FloatingParticles, GrainOverlay } from "@/components/animations/AnimatedBackground";
import { Petals } from "@/components/animations/Petals";
import { CloudShape, MoonIcon, FlowerIcon } from "@/components/animations/Icons";
import { ButterflyRelease } from "@/components/animations/Butterflies";
import { CakeDrawing } from "@/components/animations/CakeDrawing";
import { HandwrittenHeading } from "@/components/animations/HandwrittenHeading";
import { HeartButton } from "@/components/HeartButton";
import { playHeartbeat, playChime, playTypewriterSound } from "@/lib/audioEngine";

// Sub-component for typing animation with tick plucks
function TypewrittenText({ text, speed = 50, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                const char = text.charAt(i);
                setDisplayedText((prev) => prev + char);
                if (char !== " ") {
                    playTypewriterSound();
                }
                i++;
            } else {
                clearInterval(interval);
                if (onComplete) onComplete();
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    return <span>{displayedText}</span>;
}

export function Celebration({ reduced, onReset }: { reduced: boolean; onReset?: () => void }) {
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
        // Extend the verse display time to 13 seconds (starts at 2600ms, typing takes ~6.2s, leaves ~4.2s to read)
        timers.push(setTimeout(() => setPhase("transform"), reduced ? 1600 : 13000));
        timers.push(setTimeout(() => setPhase("cake"), reduced ? 2200 : 15000));
        timers.push(setTimeout(() => setPhase("greeting"), reduced ? 3000 : 19000));
        timers.push(setTimeout(() => setPhase("wish"), reduced ? 3800 : 22000));
        timers.push(setTimeout(() => setPhase("heart"), reduced ? 4600 : 25200));
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
                                style={{
                                    fontFamily: "var(--font-cormorant)",
                                    fontStyle: "italic",
                                    fontSize: 20,
                                    lineHeight: 1.75,
                                    color: COLORS.inkSoft,
                                    maxWidth: 300,
                                    minHeight: 140, // prevents layout shift while typing
                                }}
                            >
                                &ldquo;
                                <TypewrittenText text={VERSE_TEXT} speed={reduced ? 15 : 55} />
                                &rdquo;
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

                            <div style={{ display: "flex", gap: 12, marginTop: 32, justifyContent: "center", flexWrap: "wrap" }}>
                                <button
                                    onClick={() => downloadBirthdayCard(RECIPIENT_FULL)}
                                    style={{
                                        padding: "10px 22px",
                                        borderRadius: 999,
                                        border: `1px solid ${COLORS.line}`,
                                        background: COLORS.white,
                                        color: COLORS.ink,
                                        fontFamily: "var(--font-inter), sans-serif",
                                        fontSize: 13,
                                        fontWeight: 500,
                                        letterSpacing: "0.02em",
                                        cursor: "pointer",
                                        boxShadow: "0 6px 20px rgba(130,180,230,0.15)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6
                                    }}
                                >
                                    📥 Download Card
                                </button>
                                {onReset && (
                                    <button
                                        onClick={onReset}
                                        style={{
                                            padding: "10px 22px",
                                            borderRadius: 999,
                                            border: `1px solid ${COLORS.lineFaint}`,
                                            background: "rgba(255,255,255,0.4)",
                                            color: COLORS.inkSoft,
                                            fontFamily: "var(--font-inter), sans-serif",
                                            fontSize: 13,
                                            fontWeight: 500,
                                            letterSpacing: "0.02em",
                                            cursor: "pointer",
                                        }}
                                    >
                                        🔄 Read Again
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

// Function to generate and download a beautiful image card of the birthday card
function downloadBirthdayCard(recipientName: string) {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Background gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 1200);
    grad.addColorStop(0, "#FAFCFF");
    grad.addColorStop(0.5, "#DCEEFF");
    grad.addColorStop(1, "#CFE6FA");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 1200);

    // 2. Borders
    ctx.strokeStyle = "#9FC4E8";
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 740, 1140);
    
    ctx.strokeStyle = "#C9DFF2";
    ctx.lineWidth = 1;
    ctx.strokeRect(42, 42, 716, 1116);

    // 3. Top stars
    ctx.fillStyle = "#A7D8FF";
    ctx.font = "italic 32px serif";
    ctx.textAlign = "center";
    ctx.fillText("✦   ✦   ✦", 400, 110);

    // 4. Header Text
    ctx.fillStyle = "#2E4A63"; // ink
    ctx.font = "bold 44px Georgia, serif";
    ctx.fillText("Happy Birthday,", 400, 190);
    
    ctx.font = "italic 40px Georgia, serif";
    ctx.fillText(recipientName, 400, 250);

    // 5. Divider
    ctx.beginPath();
    ctx.moveTo(250, 310);
    ctx.lineTo(550, 310);
    ctx.strokeStyle = "#9FC4E8";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(400, 310, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#A7D8FF";
    ctx.fill();

    // 6. Styled outline of a birthday cake
    ctx.strokeStyle = "#2E4A63";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    
    // Cake base plate
    ctx.beginPath();
    ctx.ellipse(400, 540, 120, 16, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    // Bottom tier
    ctx.beginPath();
    ctx.moveTo(310, 530);
    ctx.lineTo(310, 460);
    ctx.quadraticCurveTo(310, 440, 330, 440);
    ctx.lineTo(470, 440);
    ctx.quadraticCurveTo(490, 440, 490, 460);
    ctx.lineTo(490, 530);
    ctx.stroke();
    
    // Waves decoration
    ctx.beginPath();
    ctx.moveTo(310, 460);
    for (let x = 310; x <= 490; x += 30) {
        ctx.quadraticCurveTo(x + 15, 470, x + 30, 460);
    }
    ctx.stroke();
    
    // Top tier
    ctx.beginPath();
    ctx.moveTo(340, 440);
    ctx.lineTo(340, 380);
    ctx.quadraticCurveTo(340, 370, 355, 370);
    ctx.lineTo(445, 370);
    ctx.quadraticCurveTo(460, 370, 460, 380);
    ctx.lineTo(460, 440);
    ctx.stroke();
    
    // Candles
    ctx.fillStyle = "#E8C989";
    [375, 400, 425].forEach((cx) => {
        ctx.beginPath();
        ctx.moveTo(cx, 370);
        ctx.lineTo(cx, 340);
        ctx.strokeStyle = "#2E4A63";
        ctx.stroke();
        
        // flame
        ctx.beginPath();
        ctx.moveTo(cx, 340);
        ctx.quadraticCurveTo(cx - 5, 325, cx, 315);
        ctx.quadraticCurveTo(cx + 5, 325, cx, 340);
        ctx.fillStyle = "#E8C989";
        ctx.fill();
    });

    // 7. Bible Verse (Matius 6:34)
    ctx.fillStyle = "#5B7A93"; // inkSoft
    ctx.font = "italic 26px Georgia, serif";
    
    const verseText = `"${VERSE_TEXT}"`;
    const words = verseText.split(" ");
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + " " + word).width;
        if (width < 600) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);

    let startY = 670;
    lines.forEach((line) => {
        ctx.fillText(line, 400, startY);
        startY += 38;
    });

    ctx.fillStyle = "#8FA9BE"; // inkFaint
    ctx.font = "16px sans-serif";
    ctx.fillText(VERSE_REF.toUpperCase(), 400, startY + 12);

    // 8. Bottom wishes
    ctx.fillStyle = "#2E4A63";
    ctx.font = "26px Georgia, serif";
    ctx.fillText("I hope today becomes one of the memories you never forget.", 400, 920);
    ctx.font = "italic 26px Georgia, serif";
    ctx.fillText("Enjoy the best day of your life.", 400, 970);

    // 9. Flower decoration
    ctx.fillStyle = "#A7D8FF";
    ctx.font = "italic 32px serif";
    ctx.fillText("❀", 400, 1050);

    // 10. Trigger simulated browser download
    const link = document.createElement("a");
    link.download = `${recipientName.replace(/\s+/g, "_")}_Birthday_Card.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
}
