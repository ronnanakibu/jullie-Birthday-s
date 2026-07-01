import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                pastelBlue: "#DCEEFF",
                babyBlue: "#A7D8FF",
                silver: "#E6F0FF",
                softGray: "#BFD3E6",
                ink: "#2E4A63",
                inkSoft: "#5B7A93",
                inkFaint: "#8FA9BE",
                line: "#9FC4E8",
                lineFaint: "#C9DFF2",
                gold: "#E8C989",
            },
            fontFamily: {
                display: ["var(--font-playfair)", "serif"],
                serif: ["var(--font-cormorant)", "serif"],
                sans: ["var(--font-inter)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;