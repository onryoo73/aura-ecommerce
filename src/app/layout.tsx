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
          <footer className="border-t border-border/30 py-10 px-6 md:px-10">
            <div className="mx-auto grid gap-10 md:grid-cols-[1.2fr_1.4fr_1fr] max-w-7xl">
              <div className="space-y-3">
                <p className="text-2xl md:text-3xl font-black tracking-tight">++ hellohello</p>
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  All rights reserved © {new Date().getFullYear()}
                </p>
              </div>

              <div className="space-y-6 text-sm text-muted-foreground">
                <p className="text-[11px] uppercase tracking-[0.35em] text-foreground font-bold">
                  Made to be worn.
                </p>
                <p>
                  Created by the ++hellohello team, this store and signature collection celebrates our collective creativity and passion for apparel. Carefully designed.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <p className="uppercase tracking-[0.35em] text-[10px] text-muted-foreground">Location</p>
                    <p>Libertad 2529<br />Office 102<br />Montevideo, Uruguay</p>
                  </div>
                  <div className="space-y-1">
                    <p className="uppercase tracking-[0.35em] text-[10px] text-muted-foreground">Legal</p>
                    <a href="/privacy" className="text-sm text-foreground hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 text-sm text-muted-foreground">
                <ul className="space-y-3">
                  <li className="font-semibold uppercase tracking-[0.35em] text-[10px] text-foreground">Discover</li>
                  <li>Dribbble</li>
                  <li>Instagram</li>
                  <li>LinkedIn</li>
                  <li>Twitter (X)</li>
                </ul>
                <ul className="space-y-3">
                  <li className="font-semibold uppercase tracking-[0.35em] text-[10px] text-foreground">Company</li>
                  <li>Work</li>
                  <li>Services</li>
                  <li>About</li>
                  <li>Careers</li>
                </ul>
                <ul className="space-y-3">
                  <li className="font-semibold uppercase tracking-[0.35em] text-[10px] text-foreground">Contact</li>
                  <li>Let's talk</li>
                  <li className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Email</li>
                  <li>hello@hellohello.com</li>
                </ul>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
