import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import Chatbot from "@/components/Chatbot/Chatbot";

// Cyber font for headings (commented out)
// import { Orbitron } from "next/font/google";
// const orbitron = Orbitron({
//   variable: "--font-orbitron",
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800", "900"],
//   display: "swap",
// });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://www.cypentra.com'),
  title: {
    default: 'Cypentra - Secure the Center',
    template: '%s | Cypentra',
  },
  description:
    'Cypentra - Secure the Center. Your SOC 2, vCISO & Cloud Security Partner. Secure. Comply. Grow.',
  applicationName: 'Cypentra',
  generator: 'Next.js',
  keywords: [
    'cypentra',
    'SOC 2 compliance',
    'vCISO',
    'cybersecurity',
    'cloud security',
    'security consulting',
    'SOC 2 readiness',
    'cybersecurity services',
    'compliance consulting',
    'security assessments',
  ],
  authors: [{ name: 'Cypentra Team' }],
  creator: 'Cypentra',
  publisher: 'Cypentra',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: 'Cypentra - Secure the Center',
    description:
      'Cypentra - Secure the Center. Your SOC 2, vCISO & Cloud Security Partner. Secure. Comply. Grow.',
    images: ['/og.png'],
    url: 'https://cypentra.com',
    siteName: 'Cypentra',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cypentra',
    creator: '@cypentra',
    title: 'Cypentra - Secure the Center',
    description:
      'Cypentra - Secure the Center. Your SOC 2, vCISO & Cloud Security Partner. Secure. Comply. Grow.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.cypentra.com',
  },
  category: 'Cybersecurity',
  classification: 'Business',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=quicksand@300,400,500,600,700,1&f[]=general-sans@200,201,300,301,400,401,500,501,600,601,700,701,1,2&display=swap" rel="stylesheet" />

        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WWQ92T84');
            `,
          }}
        />

        {/* Structured Data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Cypentra",
              "url": "https://www.cypentra.com",
              "logo": "https://www.cypentra.com/icon.png",
              "description": "Cypentra provides comprehensive cybersecurity solutions including SOC 2 compliance, vCISO services, and cloud security consulting.",
              "foundingDate": "2024",
              "sameAs": [
                "https://x.com/cypentra",
                "https://linkedin.com/company/cypentra"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "url": "https://www.cypentra.com/contact"
              }
            })
          }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WWQ92T84"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <CartProvider>
          {children}
          <Chatbot />
        </CartProvider>
      </body>
    </html>
  );
}
