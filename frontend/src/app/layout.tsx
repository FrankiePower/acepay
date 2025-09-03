import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";
import { Providers } from "./providers";
import NextDynamic from "next/dynamic";

const Header = NextDynamic(() => import("@/components/header").then(m => m.Header), {
  ssr: false
});

export const metadata: Metadata = {
  title: "AcePay - Your Crypto, Any Service",
  description: "AI agents that turn your crypto into real-world services. Food delivery, flights, shopping — all automated, all secure.",
};

// Disable prerendering to avoid SSR execution of wallet hooks/libs
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
