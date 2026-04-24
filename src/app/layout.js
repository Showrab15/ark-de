import { Geist, Geist_Mono, Montserrat, Noto_Serif_Bengali, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from './../components/Footer';
import Script from "next/script";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-playfair'
});

const notoBengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600'],
  variable: '--font-bengali'
});
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat'
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
    description: "For The Few",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${notoBengali.variable} ${montserrat.variable} antialiased`}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-9YQBS729BW');
      `}
        </Script>

        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
