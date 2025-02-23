import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nawa Fuku | Dessert Jar & Lebaran Cookies in Jakarta",
  description:
    "Nawa Fuku offers delicious dessert jars and Lebaran cookies (kue kering) in Jakarta, Indonesia. Real pictures! Contact via WhatsApp.",
  keywords: [
    "Nawa Fuku",
    "dessert jar",
    "Lebaran cookies",
    "kue kering",
    "Jakarta sweets",
    "buy cookies Jakarta",
    "WA order desserts",
  ],
  openGraph: {
    title: "Nawa Fuku | Dessert Jar & Lebaran Cookies",
    description:
      "Selling sweets in Jakarta! Try our dessert jars and Lebaran cookies. Contact us via WhatsApp.",
    type: "website",
    locale: "en_US",
    url: "https://nawafuku.vercel.app/",
    images: [
      {
        url: "https://nawafuku.vercel.app/profile-pic.jpg", // Replace with actual image URL
        width: 800,
        height: 600,
        alt: "Nawa Fuku Dessert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nawa Fuku | Dessert Jar & Lebaran Cookies",
    description:
      "Selling delicious sweets in Jakarta! Try our dessert jars and Lebaran cookies. Order via WhatsApp.",
    images: ["profile.jpg"], // Replace with actual image URL
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
