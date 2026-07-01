"use client";

import React from "react";
import { motion } from "framer-motion";
import { COLORS } from "@/lib/constants";
import { StarIcon } from "@/components/animations/Icons";

export function LoadingScreen() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: COLORS.bg,
                zIndex: 100,
            }}
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
                <StarIcon size={22} />
            </motion.div>
        </motion.div>
    );
}
