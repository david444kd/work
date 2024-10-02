import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { PageHeader } from "./components/PageHeader";
import { PageFooter } from "./components/PageFooter";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-background text-foreground">
      <body className="relative bg-background">
        <NextUIProvider className="min-h-full py-8 px-10">
          <PageHeader />
          {children}
          <PageFooter />
        </NextUIProvider>
      </body>
    </html>
  );
}
