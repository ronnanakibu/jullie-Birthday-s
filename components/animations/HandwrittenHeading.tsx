"use client";

import React from "react";
import { motion } from "framer-motion";
import { COLORS, EASE_SOFT } from "@/lib/constants";

export function HandwrittenHeading({ show, reduced }: { show: boolean; reduced: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={show ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            transition={{ duration: reduced ? 0.4 : 2.2, ease: EASE_SOFT }}
        >
            <motion.h2
                animate={reduced ? {} : { scale: [1, 1.015, 1] }}
                transition={{ duration: 1.4, repeat: show ? Infinity : 0, ease: "easeInOut" }}
                style={{
                    fontFamily: "var(--font-playfair)",
                    fontStyle: "italic",
                    fontSize: 34,
                    color: COLORS.ink,
                    margin: 0,
                    fontWeight: 600,
                }}
            >
                Happy Birthday
            </motion.h2>
        </motion.div>
    );
}
