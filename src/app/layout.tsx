import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shop/Navbar";
import Providers from "@/components/Providers";
import LenisScroll from "@/components/LenisScroll";
import LoadingIntro from "@/components/LoadingIntro";
import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "AURA | Premium Fashion",
  description: "Hyper-premium dark minimalist fashion e-commerce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, outfit.variable, "font-sans min-h-screen antialiased flex flex-col overflow-x-hidden bg-background text-foreground transition-colors duration-300 selection:bg-accent selection:text-background")}>
        <LoadingIntro />
        <LenisScroll />
        <Providers>
          <Navbar />
          <PageTransition>
            <main className="flex-grow">{children}</main>
          </PageTransition>
          <footer className="py-6 px-6 md:px-10">
            <div className="flex items-center justify-between text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground">
              <span>© {new Date().getFullYear()} AURA</span>
              <span>All rights reserved</span>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
