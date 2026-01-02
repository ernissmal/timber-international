import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: '--font-dm-sans',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: "Timber International - Industrial Wood Products",
  description: "Premium solid oak products for B2B partners - Bulk orders, furniture components, and custom manufacturing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Material Symbols for icons */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="font-sans antialiased bg-moooi-cream text-moooi-charcoal">
        {children}
      </body>
    </html>
  );
}
