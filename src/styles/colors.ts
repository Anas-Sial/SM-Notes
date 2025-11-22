// App colors
export const commonColors = {
    // Brand Colors
    primary: '#5f6368',
    secondary: '#8a8d91',
    bgColor: '#202124',
    gray: '#525356',

    // Status Colors
    success: '#00A13A',
    error: '#FF0000',
    warning: '#FFA500',
    info: '#0077FF',

    // Grayscale
    black: '#000000',
    white: '#FFFFFF',
    gray100: '#E5E5E5',
    gray200: '#CCCCCC',
    gray400: '#999999',

    // Opacity
    blackOpacity70: 'rgba(0, 0, 0, 0.7)',
    whiteOpacity60: 'rgba(255, 255, 255, 0.6)',

    // Transparent
    transparent: 'transparent',
} as const;

// Type for colors
export type CommonColors = typeof commonColors;
