import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ToastProvider from "@/components/Providers/Toaster";
import CategoryBar from "@/components/Category/CategoryBar";
import CartSheet from "@/components/Models/CartSheet";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "P-Commerce ",
  description: "This is created by NextJs 14 with tailwind and typescript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ToastProvider />
          <CartSheet />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
