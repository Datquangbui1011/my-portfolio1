// Import necessary types and modules
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Load and configure the Geist Sans font with custom CSS variable
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Load and configure the Geist Mono font with custom CSS variable
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define metadata for the application
// This metadata is used by Next.js for SEO and other purposes
export const metadata: Metadata = {
  metadataBase: new URL("https://datbui.dev"),
  title: {
    default: "Dat Bui — Full-Stack Software Engineer",
    template: "%s · Dat Bui",
  },
  description:
    "Dat Bui is a full-stack software engineer building fast, modern applications. Computer Science @ University of Nebraska–Lincoln. Available for work.",
  keywords: [
    "Dat Bui",
    "Software Engineer",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "University of Nebraska-Lincoln",
  ],
  authors: [{ name: "Dat Bui" }],
  openGraph: {
    title: "Dat Bui — Full-Stack Software Engineer",
    description:
      "Building fast, modern applications that help businesses grow. Available for work worldwide.",
    type: "website",
    locale: "en_US",
    siteName: "Dat Bui",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dat Bui — Full-Stack Software Engineer",
    description:
      "Building fast, modern applications that help businesses grow.",
  },
  icons: { icon: "/favicon.ico" },
};

// RootLayout component
// This component wraps the entire application and provides the base HTML structure
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // Apply the configured fonts and additional styles to the body element
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
