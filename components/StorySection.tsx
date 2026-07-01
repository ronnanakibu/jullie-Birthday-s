"use client";

import React from "react";
import { motion } from "framer-motion";
import { COLORS, EASE_APPLE } from "@/lib/constants";
import type { StorySection as StorySectionType } from "@/lib/content";

export function StorySection({
    section,
    active,
    reduced,
}: {
    section: StorySectionType;
    active: boolean;
    reduced: boolean;
}) {
    return (
        <div
            style={{
                minHeight: "70vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "0 28px",
            }}
        >
            {section.lines.map((line, i) => (
                <motion.p
                    key={i}
                    initial={{ opacity: 0, y: reduced ? 0 : 22, filter: reduced ? "none" : "blur(6px)" }}
                    animate={
                        active
                            ? { opacity: 1, y: 0, filter: "blur(0px)" }
                            : { opacity: 0, y: reduced ? 0 : 22, filter: reduced ? "none" : "blur(6px)" }
                    }
                    transition={{
                        duration: reduced ? 0.3 : 0.9,
                        delay: active ? i * (reduced ? 0.05 : 0.22) : 0,
                        ease: EASE_APPLE,
                    }}
                    style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: section.kind === "final-invite" ? 21 : 22,
                        lineHeight: 1.5,
                        color: COLORS.ink,
                        fontStyle: section.kind === "final-invite" ? "italic" : "normal",
                        margin: "4px 0",
                        fontWeight: 500,
                    }}
                >
                    {line}
                </motion.p>
            ))}
        </div>
    );
}
