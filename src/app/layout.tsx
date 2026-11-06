import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { MotionProvider } from "@/components/motion/motion-provider";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Guaranteed Rent & Property Management Reading | Rent Wise",
    template: "%s | Rent Wise",
  },
  description:
    "Rent Wise provides guaranteed-rent and professional property-management services for suitable residential properties across Reading and Berkshire. Request an initial rent proposal.",
  applicationName: "Rent Wise Lettings & Management",
  keywords: [
    "guaranteed rent Reading",
    "property management Reading",
    "landlord services Reading",
    "rent-to-rent management Reading",
    "property management Berkshire",
  ],
  icons: {
    icon: {
      url: "/branding/fav.png",
      type: "image/png",
      sizes: "261x261",
    },
    shortcut: "/branding/fav.png",
    apple: [
      {
        url: "/branding/fav.png",
        type: "image/png",
        sizes: "261x261",
      },
    ],
  },
  openGraph: {
    type: "website",
    title: "Guaranteed Rent & Property Management Reading | Rent Wise",
    description:
      "Guaranteed-rent and professional property-management services for suitable residential properties across Reading and Berkshire.",
    siteName: "Rent Wise Lettings & Management",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <noscript>
          <style>{`
            [data-motion] {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
