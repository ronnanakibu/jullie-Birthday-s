export const COLORS = {
    bg: "#FAFCFF",
    pastelBlue: "#DCEEFF",
    babyBlue: "#A7D8FF",
    white: "#FFFFFF",
    silver: "#E6F0FF",
    softGray: "#BFD3E6",
    ink: "#2E4A63",
    inkSoft: "#5B7A93",
    inkFaint: "#8FA9BE",
    line: "#9FC4E8",
    lineFaint: "#C9DFF2",
    gold: "#E8C989",
} as const;

export const EASE_APPLE = [0.22, 1, 0.36, 1] as const;
export const EASE_SOFT = [0.16, 1, 0.3, 1] as const;

export type Stage = "envelope" | "unfold" | "story" | "celebration";
export type CelebrationPhase =
    | "final-message"
    | "verse"
    | "transform"
    | "cake"
    | "greeting"
    | "wish"
    | "heart"
    | "surprise";
