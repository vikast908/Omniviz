/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${variableName}) / ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background & Surface colors
        'omniviz-bg': withOpacity('--omniviz-bg'),
        'omniviz-surface': withOpacity('--omniviz-surface'),
        'omniviz-surface-high': withOpacity('--omniviz-surface-high'),

        // Border colors
        'omniviz-border': withOpacity('--omniviz-border'),
        'omniviz-border-strong': withOpacity('--omniviz-border-strong'),

        // Accent colors - use accent-text for AAA-compliant text
        'omniviz-accent': withOpacity('--omniviz-accent'),
        'omniviz-accent-light': withOpacity('--omniviz-accent-light'),
        'omniviz-accent-text': withOpacity('--omniviz-accent-text'),

        // Text colors - all AAA compliant (7:1+)
        'omniviz-text': withOpacity('--omniviz-text'),
        'omniviz-text-muted': withOpacity('--omniviz-text-muted'),
        'omniviz-text-subtle': withOpacity('--omniviz-text-subtle'),

        // Semantic colors - AAA compliant for text (7:1+)
        'omniviz-success': withOpacity('--omniviz-success'),
        'omniviz-warning': withOpacity('--omniviz-warning'),
        'omniviz-error': withOpacity('--omniviz-error'),
        'omniviz-info': withOpacity('--omniviz-info'),

        // Semantic background colors - use with white text for buttons
        'omniviz-success-bg': withOpacity('--omniviz-success-bg'),
        'omniviz-warning-bg': withOpacity('--omniviz-warning-bg'),
        'omniviz-error-bg': withOpacity('--omniviz-error-bg'),
        'omniviz-info-bg': withOpacity('--omniviz-info-bg'),
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      }
    },
  },
  plugins: [],
}
