import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from './../components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://weararkade.com/"),

  title: {
    default: "Arkade",
    template: "%s | Arkade",
  },

  description: "For The Few",

  keywords: [
    "Arkade",
    "fashion",
    "premium clothing",
    "streetwear",
    "luxury brand",
    "old-money",
    "clothing"
  ],

  authors: [{ name: "Arkade" }],
  creator: "Arkade",
  publisher: "Arkade",

  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://weararkade.com/",
  },
  openGraph: {
    title: "Arkade",
    description: "For The Few",
    url: "https://weararkade.com/",
    siteName: "Arkade",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arkade",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Arkade",
    description: "Premium fashion for the few.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
