"use client";

import React from "react";
import { COLORS } from "@/lib/constants";

export function EnvelopeSVG() {
    return (
        <svg width="220" height="160" viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="160" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#EAF4FF" />
                </linearGradient>
            </defs>
            <rect x="6" y="6" width="208" height="148" rx="14" fill="url(#envBody)" stroke={COLORS.line} strokeWidth="1.2" />
            <path d="M10 14 L110 92 L210 14" stroke={COLORS.line} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 148 L82 78" stroke={COLORS.lineFaint} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M214 148 L138 78" stroke={COLORS.lineFaint} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
        </svg>
    );
}

export function WaxSeal({ cracked, size = 46 }: { cracked?: boolean; size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="26" fill={COLORS.babyBlue} opacity="0.9" />
            <circle cx="30" cy="30" r="26" stroke="#7BB8ED" strokeWidth="1" fill="none" />
            <path
                d="M30 20 C25 15, 17 18, 17 26 C17 33, 24 38, 30 43 C36 38, 43 33, 43 26 C43 18, 35 15, 30 20 Z"
                fill="#EAF6FF"
                opacity="0.85"
            />
            {cracked && (
                <>
                    <path d="M30 12 L27 24 L33 30 L26 40" stroke="#5B93C4" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                    <path d="M42 20 L33 30 L44 38" stroke="#5B93C4" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                </>
            )}
        </svg>
    );
}

export function StarIcon({ size = 10, opacity = 1 }: { size?: number; opacity?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <path
                d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z"
                fill={COLORS.babyBlue}
                opacity={opacity}
            />
        </svg>
    );
}

export function ButterflyIcon({ size = 24, color = COLORS.line }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 32" fill="none">
            <path d="M20 8 C16 2, 6 2, 4 8 C2 13, 8 17, 20 12" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M20 8 C24 2, 34 2, 36 8 C38 13, 32 17, 20 12" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M20 12 C15 16, 8 20, 6 24 C4 27, 10 29, 20 22" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M20 12 C25 16, 32 20, 34 24 C36 27, 30 29, 20 22" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" />
            <line x1="20" y1="6" x2="20" y2="24" stroke={color} strokeWidth="1" strokeLinecap="round" />
        </svg>
    );
}

export function MoonIcon({ size = 48, smiling }: { size?: number; smiling?: boolean }) {
    return (
        <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
            <path
                d="M38 8 A22 22 0 1 0 38 52 A17 17 0 1 1 38 8 Z"
                fill={COLORS.silver}
                stroke={COLORS.line}
                strokeWidth="1"
            />
            {smiling && (
                <>
                    <circle cx="24" cy="24" r="1.3" fill={COLORS.ink} />
                    <circle cx="30" cy="20" r="1" fill={COLORS.ink} />
                    <path d="M20 30 Q25 34 30 30" stroke={COLORS.ink} strokeWidth="1.2" fill="none" strokeLinecap="round" />
                </>
            )}
        </svg>
    );
}

export function FlowerIcon({ size = 60, color = COLORS.line }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
            <path d="M40 40 C40 40, 20 60, 8 72" stroke={color} strokeWidth="0.9" fill="none" strokeLinecap="round" />
            <path d="M28 55 C25 52, 24 48, 27 46" stroke={color} strokeWidth="0.8" fill="none" strokeLinecap="round" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
                <ellipse
                    key={deg}
                    cx="40"
                    cy="26"
                    rx="7"
                    ry="12"
                    fill="none"
                    stroke={color}
                    strokeWidth="0.8"
                    transform={`rotate(${deg} 40 40)`}
                />
            ))}
            <circle cx="40" cy="40" r="4" fill="none" stroke={color} strokeWidth="0.8" />
        </svg>
    );
}

export function RibbonDivider({ width = 160 }: { width?: number }) {
    return (
        <svg width={width} height="14" viewBox={`0 0 ${width} 14`} fill="none">
            <line x1="0" y1="7" x2={width * 0.42} y2="7" stroke={COLORS.lineFaint} strokeWidth="0.8" />
            <circle cx={width / 2} cy="7" r="2.2" fill={COLORS.babyBlue} />
            <line x1={width * 0.58} y1="7" x2={width} y2="7" stroke={COLORS.lineFaint} strokeWidth="0.8" />
        </svg>
    );
}

export function BalloonIcon({ size = 50, color = COLORS.line }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size * 1.6} viewBox="0 0 50 80" fill="none">
            <ellipse cx="25" cy="26" rx="22" ry="26" stroke={color} strokeWidth="1" fill="none" />
            <path d="M25 52 L22 58 L28 62 L24 68" stroke={color} strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M20 12 Q25 8 30 12" stroke={color} strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.6" />
        </svg>
    );
}

export function GiftIcon({ size = 60, color = COLORS.line }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
            <rect x="10" y="24" width="40" height="30" rx="2" stroke={color} strokeWidth="1" fill="none" />
            <line x1="10" y1="36" x2="50" y2="36" stroke={color} strokeWidth="1" />
            <line x1="30" y1="24" x2="30" y2="54" stroke={color} strokeWidth="1" />
            <path
                d="M30 24 C24 24, 20 18, 24 14 C28 10, 30 18, 30 24 C30 18, 32 10, 36 14 C40 18, 36 24, 30 24 Z"
                stroke={color}
                strokeWidth="1"
                fill="none"
            />
        </svg>
    );
}

export function CloudShape({ opacity = 0.6 }: { opacity?: number }) {
    return (
        <svg width="120" height="50" viewBox="0 0 120 50">
            <ellipse cx="30" cy="30" rx="26" ry="16" fill="#FFFFFF" opacity={opacity} />
            <ellipse cx="60" cy="24" rx="30" ry="18" fill="#FFFFFF" opacity={opacity} />
            <ellipse cx="90" cy="30" rx="22" ry="14" fill="#FFFFFF" opacity={opacity} />
        </svg>
    );
}
