"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useReducedMotionPref } from "@/hooks/useReducedMotionPref";
import { startAmbient, stopAmbient, isAudioSupported } from "@/lib/audioEngine";
import { COLORS, Stage } from "@/lib/constants";
import { Envelope } from "@/components/Envelope";
import { PaperUnfold } from "@/components/PaperUnfold";
import { Letter } from "@/components/Letter";
import { Celebration } from "@/components/Celebration";
import { MusicToggle } from "@/components/MusicToggle";

export default function BirthdayLetterPage() {
    const [stage, setStage] = useState<Stage>("envelope");
    const { reduced, toggle: toggleReduced } = useReducedMotionPref();
    const [musicEnabled, setMusicEnabled] = useState(false);

    const handleMusicToggle = () => {
        if (musicEnabled) {
            stopAmbient();
            setMusicEnabled(false);
        } else {
            startAmbient(0.14);
            setMusicEnabled(true);
        }
    };

    const handleEnvelopeOpen = () => {
        setStage("unfold");
        setMusicEnabled(true); // Automatically starts music when opened
    };

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100dvh",
                minHeight: 480,
                maxHeight: 900,
                overflow: "hidden",
                fontFamily: "var(--font-inter), sans-serif",
                background: COLORS.bg,
            }}
        >
            <button
                onClick={toggleReduced}
                aria-label="Toggle reduced motion"
                style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    zIndex: 50,
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    border: `1px solid ${COLORS.lineFaint}`,
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(6px)",
                    cursor: "pointer",
                    fontSize: 13,
                    color: COLORS.inkSoft,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                title={reduced ? "Enable animations" : "Reduce motion"}
            >
                {reduced ? "▶" : "❚❚"}
            </button>

            {stage !== "envelope" && stage !== "unfold" && (
                <MusicToggle
                    enabled={musicEnabled}
                    onToggle={handleMusicToggle}
                    supported={isAudioSupported()}
                />
            )}

            <AnimatePresence mode="wait">
                {stage === "envelope" && (
                    <Envelope key="envelope" onOpen={handleEnvelopeOpen} reduced={reduced} />
                )}
                {stage === "unfold" && (
                    <PaperUnfold key="unfold" onDone={() => setStage("story")} reduced={reduced} />
                )}
                {stage === "story" && (
                    <Letter key="story" onComplete={() => setStage("celebration")} reduced={reduced} />
                )}
                {stage === "celebration" && (
                    <Celebration key="celebration" reduced={reduced} />
                )}
            </AnimatePresence>
        </div>
    );
}
