/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['Cinzel', 'serif'],
                script: ['Great Vibes', 'cursive'],
            },
        },
    },
    plugins: [],
}