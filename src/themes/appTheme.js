/**
 * Main App Theme - Modern SaaS Gradient UI
 * Used for the application interface (not invoice templates)
 */

export const appTheme = {
  colors: {
    // Primary - Purple Gradient
    primary: {
      start: "#6C3BFF",
      mid: "#8B5CF6",
      end: "#A855F7",
      gradient:
        "linear-gradient(135deg, #6C3BFF 0%, #8B5CF6 50%, #A855F7 100%)",
    },

    // Secondary - Blue Accent
    secondary: {
      main: "#4F8CFF",
      light: "#3B82F6",
      gradient: "linear-gradient(135deg, #4F8CFF 0%, #3B82F6 100%)",
    },

    // Background
    background: {
      main: "#F8FAFC",
      light: "#EEF2FF",
      gradient: "linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)",
    },

    // Success/Highlight
    success: "#22C55E",

    // Text
    text: {
      primary: "#111827",
      secondary: "#6B7280",
      light: "#9CA3AF",
    },

    // UI Elements
    white: "#FFFFFF",
    border: "#E5E7EB",
  },

  // Shadows
  shadows: {
    sm: "0 2px 4px rgba(108, 59, 255, 0.08)",
    md: "0 4px 12px rgba(108, 59, 255, 0.12)",
    lg: "0 8px 24px rgba(108, 59, 255, 0.15)",
    xl: "0 16px 48px rgba(108, 59, 255, 0.18)",
    glow: "0 0 20px rgba(108, 59, 255, 0.3)",
  },

  // Border Radius
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    full: "9999px",
  },

  // Typography
  fonts: {
    primary: '"Inter", "Roboto", sans-serif',
  },

  // Spacing
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
};

export default appTheme;
