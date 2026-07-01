"use client";

import { useEffect, useState } from "react";

/**
 * Combines the OS-level `prefers-reduced-motion` setting with an
 * optional manual override the user can toggle in the UI.
 */
export function useReducedMotionPref() {
    const [systemPref, setSystemPref] = useState(false);
    const [override, setOverride] = useState<boolean | null>(null);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setSystemPref(mq.matches);
        const handler = (e: MediaQueryListEvent) => setSystemPref(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const reduced = override !== null ? override : systemPref;
    const toggle = () => setOverride(!reduced);

    return { reduced, toggle, isManualOverride: override !== null };
}
