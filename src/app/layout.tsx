import type { Metadata } from "next";
import { Syncopate, Poppins } from "next/font/google";
import "./globals.css";
import Layout from "@/frontend/components/business/layout";
import Script from 'next/script'

const syncopate = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-syncopate",
});

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Bitcoin Manifest",
  description: "",
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <head>
      <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VYTM6HFXCL"
        />

        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VYTM6HFXCL');
          `}
        </Script>
      </head>
      <body
        className={`${poppins.className} ${poppins.variable} ${syncopate.variable} min-h-screen`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
