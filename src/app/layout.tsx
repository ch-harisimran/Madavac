import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import MotionProvider from "@/components/providers/MotionProvider";
import ScrollToTop from "@/components/providers/ScrollToTop";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  icons: { icon: "/favicon.svg" },
  title: "Madavac | AI, Web & Mobile Software Development Company",
  description:
    "Madavac is a modern software development company specializing in custom software, web & mobile apps, AI solutions, cloud engineering, and enterprise digital transformation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="antialiased">
        <ScrollToTop />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
