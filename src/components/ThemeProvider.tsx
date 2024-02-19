import { CssBaseline, CssVarsProvider } from "@mui/joy";
import React from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  breakpoints: {
    values: {
      xs: 300, // Для очень маленьких устройств (Extra Small)
      sm: 600, // Для маленьких устройств (Small)
      md: 900, // Для средних устройств (Medium)
      lg: 1200, // Для больших устройств (Large)
      xl: 1536, // Для очень больших устройств (Extra Large)
    },
  },

  colorSchemes: {
    light: {
      palette: {
        neutral: {
          "50": "#eceff1",
          "100": "#cfd8dc",
          "200": "#b0bec5",
          "300": "#90a4ae",
          "400": "#78909c",
          "500": "#607d8b",
          "600": "#546e7a",
          "700": "#455a64",
          "800": "#37474f",
          "900": "#263238",
        },
        primary: {
          "50": "#f5f3ff",
          "100": "#ede9fe",
          "200": "#ddd6fe",
          "300": "#c4b5fd",
          "400": "#a78bfa",
          "500": "#8b5cf6",
          "600": "#7c3aed",
          "700": "#6d28d9",
          "800": "#5b21b6",
          "900": "#4c1d95",
        },
      },
    },
    dark: {
      palette: {
        neutral: {
          "50": "#f9fafb",
          "100": "#f3f4f6",
          "200": "#e5e7eb",
          "300": "#d1d5db",
          "400": "#9ca3af",
          "500": "#6b7280",
          "600": "#4b5563",
          "700": "#374151",
          "800": "#1f2937",
          "900": "#111827",
        },
        primary: {
          "50": "#f5f3ff",
          "100": "#ede9fe",
          "200": "#ddd6fe",
          "300": "#c4b5fd",
          "400": "#a78bfa",
          "500": "#8b5cf6",
          "600": "#7c3aed",
          "700": "#6d28d9",
          "800": "#5b21b6",
          "900": "#4c1d95",
        },
      },
    },
  },
});

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <CssVarsProvider theme={theme} defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
};

export default ThemeProvider;
