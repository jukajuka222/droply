import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://droply.digital"),
  title: { default: "Droply — Track what's dropping.", template: "%s — Droply" },
  description: "Discover upcoming crypto airdrops, snapshots, TGE and token claims in one place.",
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body><Header/>{children}</body></html>;
}