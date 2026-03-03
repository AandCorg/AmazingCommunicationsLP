import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import theme from "../theme";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Amazing Communications",
  description: "ボードゲームを中心とした商品紹介サイト",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className={roboto.variable}>
      <body>
        {/* App Router環境でMUIのスタイル順序を安定させるためのProvider */}
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
