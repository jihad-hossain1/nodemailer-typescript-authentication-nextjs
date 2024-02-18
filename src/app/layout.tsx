import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User Auth with databse",
  description:
    "Generated a authentication based on database user login system, create user ,forgate password , verify user, and much more..",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-zinc-800 min-h-screen text-white">
          <Navbar />
          <section className="min-h-screen max-w-screen-xl p-3">
            {children}
          </section>
          <Footer />
        </main>
      </body>
    </html>
  );
}
