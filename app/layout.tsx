import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    style: ["normal", "italic"],
    variable: "--font-cormorant",
    display: "swap",
});

export const metadata: Metadata = {
    title: "A Special Letter for Julie 💙",
    description: "Happy Birthday Cipittt! A digital letter made just for you.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
            <body style={{ margin: 0, padding: 0, overflow: "hidden", background: "#fafcff" }}>
                {children}
            </body>
        </html>
    );
}
