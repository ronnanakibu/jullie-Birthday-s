export const RECIPIENT = "Cipittt";
export const RECIPIENT_FULL = "Ester Jullieta Dinanti Silalahi";

export type StorySection = {
    id: string;
    kind: "text" | "final-invite";
    lines: string[];
};

export const STORY_SECTIONS: StorySection[] = [
    {
        id: "curiosity",
        kind: "text",
        lines: ["Sebelum kamu lanjut baca...", "tarik napas dulu.", "Ini bukan ucapan biasa.", "(Maybe)"],
    },
    {
        id: "appreciation",
        kind: "text",
        lines: ["Hari ini, 2 Juli,", "adalah hari yang spesial", "buat kamu."],
    },
    {
        id: "humor",
        kind: "text",
        lines: [
            "Aku sempat mikir mau beliin kamu bulan...",
            "...ternyata nggak dijual.",
            "Jadi kamu dapat sesuatu yang lebih langka (Mungkin),",
            "yaitu ucapan virtual ini.",
        ],
    },
    {
        id: "warm",
        kind: "text",
        lines: [
            "Banyak yang berubah,",
            "tapi satu yang enggak:",
            "aku masih notice usaha kamu,",
            "masih respect perjalanan kamu.",
            "Kamu udah jauh lebih kuat",
            "dari yang kamu sadari.",
        ],
    },
    {
        id: "wishes",
        kind: "text",
        lines: [
            "Semoga tahun ini kamu dikasih ruang",
            "buat jadi dirimu sendiri sepenuhnya.",
            "Semoga hal-hal kecil yang kamu perjuangkan diam-diam,",
            "akhirnya kelihatan hasilnya.",
            "Semangat untuk itu, GO FOR IT.",
        ],
    },
    {
        id: "closing-1",
        kind: "text",
        lines: [
            "Banyak struggle atau tantangan yang kamu hadapi,",
            "tapi berbahagialah —",
            "kamu bisa sampai di hari ini,",
            "di hari kamu lahir ke dunia ini,",
            "di hari kedua orang tuamu",
            "mendengar tangisan anak pertama mereka.",
        ],
    },
    {
        id: "closing-2",
        kind: "text",
        lines: [
            "Jangan khawatir ke depannya gimana.",
            "Ada Tuhan yang menyertai kamu —",
            "tetap minta penyertaan-Nya,",
            "tetap minta arahan tangan pengasihan-Nya.",
        ],
    },
    {
        id: "closing-3",
        kind: "text",
        lines: ["Ada teman-temanmu.", "Ada orang-orang terdekatmu.", "Ada abang, kakakmu.", "You have it."],
    },
    {
        id: "closing-4",
        kind: "text",
        lines: [
            "So, don't be scared about what comes next.",
            "Just enjoy it.",
            "Enjoy dalam berproses —",
            "di tahun-tahun, di bulan-bulan,",
            "di hari-hari, di setiap jam dan detik",
            "yang akan datang.",
        ],
    },
    {
        id: "closing-5",
        kind: "final-invite",
        lines: ["Sebagai penutup,", "silakan buka pesan berikut."],
    },
];

export const VERSE_TEXT =
    "Sebab itu janganlah kamu kuatir akan hari besok, karena hari besok mempunyai kesusahannya sendiri. Kesusahan sehari cukuplah untuk sehari.";
export const VERSE_REF = "Matius 6:34";
export const FINAL_MESSAGE = "Aku harap hari ini jadi salah satu memori yang nggak akan pernah kamu lupa.";
export const AFTER_HEART = "Terima kasih sudah bertahan,";
export const AFTER_HEART_2 = "and enjoy the best day of your life.";
export const EASTER_EGG_TEXT = "You found the secret";
