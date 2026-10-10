/**
 * Tailwind CSS Custom Configuration
 * File: js/tailwind-config.js
 */
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                navy: {
                    950: '#060a12',
                    900: '#0b1326',
                    800: '#121f3d',
                    700: '#1a2c54',
                    600: '#253e75',
                },
                cyanAccent: {
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        }
    }
};
