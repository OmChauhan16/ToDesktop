/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                'primary': '#3238f2'
            },
            fontFamily: {
                newfont: ['Inter']
            }
        },
    },
    plugins: [],
}
