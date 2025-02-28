import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "./components/landing/Navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GasHub",
  description: "Discovered affordable gas prices near you with GasHub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
