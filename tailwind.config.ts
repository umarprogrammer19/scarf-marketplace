import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#121212", // Deep Onyx main background
                surface: "#1E1E1E",    // Rich Charcoal for product cards
                gold: {
                    DEFAULT: "#C5A059",  // Your logo's premium gold
                    hover: "#D4B371",    // Slightly lighter for button hovers
                },
                text: {
                    main: "#F3F4F6",     // Off-white for headings
                    muted: "#9CA3AF",    // Gray for descriptions
                }
            },
        },
    },
    plugins: [],
};
export default config;