import type { Metadata } from "next";
import "./layout.css";
import { NextUIProvider } from "@nextui-org/react";
import { PageFooter } from "./components/PageFooter";
import { FilterProvider } from "../app/components/FilterContext";
import SideBar2 from "./components/SideBar";
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
    <html
      id="home"
      lang="en"
      className="dark bg-background text-foreground sm:ml-20 sm:mr-20 sm:mb-20"
    >
      <body className="relative bg-background">
        <FilterProvider>
          <NextUIProvider className="min-h-full ">
            {/* <PageHeader /> */}
            <SideBar2></SideBar2>
            <div className="flex justify-end">{children}</div>
            <div className="w-full flex justify-end">
              <div className="sm:w-[65%] lg:w-[75%]">
                <PageFooter />
              </div>
            </div>
          </NextUIProvider>
        </FilterProvider>
      </body>
    </html>
  );
}
