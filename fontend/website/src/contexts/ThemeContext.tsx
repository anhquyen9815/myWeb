import React, { createContext, useMemo, useState, type ReactNode } from 'react';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// ==============================
// 1️⃣ Context
// ==============================
interface ThemeContextType {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}
export const ColorModeContext = createContext<ThemeContextType>({} as ThemeContextType);

interface ThemeProviderProps {
  children: ReactNode;
}

// ==============================
// 2️⃣ Provider
// ==============================
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleTheme: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
      mode,
    }),
    [mode],
  );

  // ==============================
  // 3️⃣ Base theme
  // ==============================
  let baseTheme = createTheme({
    palette: {
      mode,
      primary: { main: '#d00' },
      secondary: { main: '#9C27B0' },
    },
    breakpoints: {
      values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      // ==============================
      //  Typography Responsive Styles
      // ==============================
      MuiTypography: {
        styleOverrides: {
          h1: {
            fontWeight: 700,
            '@media (max-width:600px)': { fontSize: '1.8rem' },
          },
          h2: {
            fontWeight: 700,
            '@media (max-width:600px)': { fontSize: '1.6rem' },
          },
          h3: {
            fontWeight: 700,
            '@media (max-width:600px)': { fontSize: '1.4rem' },
          },
          h4: {
            fontWeight: 600,
            '@media (max-width:600px)': { fontSize: '1.2rem' },
          },
          h5: {
            fontWeight: 600,
            '@media (max-width:600px)': { fontSize: '1rem' },
          },
          h6: {
            fontWeight: 600,
            '@media (max-width:600px)': { fontSize: '0.9rem' },
          },
          subtitle1: {
            '@media (max-width:600px)': { fontSize: '0.85rem' },
          },
          subtitle2: {
            '@media (max-width:600px)': { fontSize: '0.8rem' },
          },
          body1: {
            '@media (max-width:600px)': { fontSize: '0.85rem' },
          },
          body2: {
            '@media (max-width:600px)': { fontSize: '0.8rem' },
          },
          caption: {
            '@media (max-width:600px)': { fontSize: '0.7rem' },
          },
          button: {
            textTransform: 'none',
            fontWeight: 500,
            '@media (max-width:600px)': { fontSize: '0.75rem' },
          },
          overline: {
            '@media (max-width:600px)': { fontSize: '0.65rem' },
          },
        },
      },

      // ==============================
      //  Responsive Components
      // ==============================
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            '@media (max-width:600px)': {
              fontSize: '0.7rem',
              padding: '4px 10px',
              minWidth: 0,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            '@media (max-width:600px)': {
              minWidth: 140,
              maxWidth: 140,
            },
          },
        },
      },
      MuiCardMedia: {
        styleOverrides: {
          root: {
            '@media (max-width:600px)': {
              height: 100,
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            '@media (max-width:600px)': {
              paddingLeft: '8px',
              paddingRight: '8px',
            },
          },
        },
      },
    },
  });

  // ==============================
  // 4️⃣ Responsive font scaling
  // ==============================
  const theme = responsiveFontSizes(baseTheme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};
