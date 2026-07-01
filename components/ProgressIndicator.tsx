"use client";

import React from "react";
import { motion } from "framer-motion";
import { COLORS } from "@/lib/constants";

export function ProgressIndicator({ total, active }: { total: number; active: number }) {
    return (
        <div
            style={{
                position: "fixed",
                right: 24,
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                zIndex: 40,
            }}
            aria-label="Progress Indicator"
        >
            {Array.from({ length: total }).map((_, i) => {
                const isActive = i === active;
                return (
                    <motion.div
                        key={i}
                        animate={{
                            scale: isActive ? 1.25 : 1,
                            backgroundColor: isActive ? COLORS.ink : COLORS.line,
                            opacity: isActive ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                        }}
                        title={`Slide ${i + 1}`}
                    />
                );
            })}
        </div>
    );
}
