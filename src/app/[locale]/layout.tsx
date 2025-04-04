import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import {
  Be_Vietnam_Pro,
  Inter,
  Noto_Sans_Lao,
  Noto_Sans_SC,
  Sarabun,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Locale, routing } from "@/i18n/routing";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import ClientBody from "./ClientBody";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { LoadScript } from "@react-google-maps/api";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansLao = Noto_Sans_Lao({
  weight: ["400", "700"],
  subsets: ["lao"],
  variable: "--font-noto-sans-lao",
});
const notoSansSC = Noto_Sans_SC({
  weight: ["400", "700"],
  subsets: ["latin", "chinese"],
  variable: "--font-noto-sans-sc",
});
const sarabun = Sarabun({
  weight: ["400", "700"],
  subsets: ["thai"],
  variable: "--font-sarabun",
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "700"],
  subsets: ["vietnamese"],
  variable: "--font-be-vietnam-pro",
});
export const metadata: Metadata = {
  title: "Anousith Logistics",
  description: "Logistics and shipping",
  icons: {
    icon: "/ans-logo.png",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`antialiased ${
          locale === "Lao"
            ? "font-lao"
            : locale === "Thai"
            ? "font-thai"
            : locale === "China"
            ? "font-chinese"
            : locale === "VietNam"
            ? "font-vietnamese"
            : "font-inter"
        }`}
      >
        <NextIntlClientProvider messages={messages}>
          <ClientBody>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 font-lao">{children}</main>
              <Footer />
            </div>
          </ClientBody>
        </NextIntlClientProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
