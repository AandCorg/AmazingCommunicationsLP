// src/theme.ts
'use client';
import{createTheme}from'@mui/material/styles';

// 例としてフォントをカスタマイズ（GoogleFontsのRobotoを利用）
const theme = createTheme({
  typography:{
    fontFamily:'var(--font-roboto)',
  },
});

export default theme;
