// src/theme.ts
'use client';

import { createTheme } from '@mui/material/styles';

// Brand-first theme tuned for a bright corporate landing page.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e86a1f',
      light: '#f1995f',
      dark: '#bf4f11',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2b5fb4',
    },
    background: {
      default: '#f7f8fb',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
});

export default theme;
