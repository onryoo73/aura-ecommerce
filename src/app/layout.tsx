import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shop/Navbar";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aura | Minimal E-commerce",
  description: "Experience the aura of minimalist shopping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen antialiased flex flex-col")}>
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aura Minimalist Shop. All rights reserved.
          </footer>
        </Providers>
      </body>
    </html>
  );
}
