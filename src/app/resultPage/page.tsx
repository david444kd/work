"use client";

import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { useSearchParams } from "next/navigation";
const Page = () => {
  const searchParams = useSearchParams();
  const iframeSrc = searchParams.get("src") || "https://book.greatleads.ru/";

  useEffect(() => {
    const hideSidebar = () => {
      const sidebar = document.getElementById("sidebar");
      const footer = document.getElementById("footer");
      if (sidebar) sidebar.style.display = "none";
      if (footer) footer.style.display = "none";
    };

    hideSidebar();

    const observer = new MutationObserver(hideSidebar);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      const sidebar = document.getElementById("sidebar");
      const footer = document.getElementById("footer");
      if (sidebar) sidebar.style.display = "";
      if (footer) footer.style.display = "";
    };
  }, []);
  return (
    <div className="grid grid-cols-1 gap-5 md:gap-10 p-5 md:p-10 md:grid-cols-2 w-full h-screen m-auto">
      {/* Контейнер для iframe */}
      <div className="w-full h-[50vh] md:h-screen flex">
        <iframe
          src={iframeSrc}
          className="w-full h-full"
          style={{ border: "none" }}
        ></iframe>
      </div>

      {/* Контейнер для карточки */}
      <div className="w-full flex flex-col items-center justify-center md:h-screen h-[40vh]">
        <Card className="w-full h-full">
          <CardHeader className="px-5">UX Annotations</CardHeader>
          <div className="px-5">
            <Separator />
          </div>
          <CardBody className="overflow-auto px-5">
            <div className="mb-5 text-2xl font-semibold">HomePage</div>

            {/* Секции описаний */}
            <section className="mb-6">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-8 h-8 bg-red-500 text-white flex justify-center items-center rounded-full">
                  1
                </div>
                <h2 className="text-xl font-semibold">Navigation</h2>
              </div>
              <p className="text-gray-700">
                Logo and main navigation containing links to all the main
                sections of the website (Switch; Eat; Thrive; Impact; Community;
                Blog). Search functionality and language switcher.
              </p>
            </section>

            <section className="mb-6">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-8 h-8 bg-red-500 text-white flex justify-center items-center rounded-full">
                  2
                </div>
                <h2 className="text-xl font-semibold">Featured Articles</h2>
              </div>
              <p className="text-gray-700">
                Latest articles from the blog or featured ones.
              </p>
            </section>

            <section className="mb-6">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-8 h-8 bg-red-500 text-white flex justify-center items-center rounded-full">
                  3
                </div>
                <h2 className="text-xl font-semibold">
                  Links to Other Sections
                </h2>
              </div>
              <p className="text-gray-700">
                Links that navigate users through to the main sections of the
                site: Switch, Eat, & Thrive.
              </p>
            </section>

            <section className="mb-6">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-8 h-8 bg-red-500 text-white flex justify-center items-center rounded-full">
                  4
                </div>
                <h2 className="text-xl font-semibold">Recipes</h2>
              </div>
              <p className="text-gray-700">
                Pulls in the latest recipes that have been posted to the site
                and links to their respective articles.
              </p>
            </section>

            <section className="mb-6">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-8 h-8 bg-red-500 text-white flex justify-center items-center rounded-full">
                  5
                </div>
                <h2 className="text-xl font-semibold">Video</h2>
              </div>
              <p className="text-gray-700">Pulls in the latest recipe video.</p>
            </section>

            <section className="mb-6">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-8 h-8 bg-red-500 text-white flex justify-center items-center rounded-full">
                  6
                </div>
                <h2 className="text-xl font-semibold">
                  Link to Impact Section
                </h2>
              </div>
              <p className="text-gray-700">
                Link that navigates users to the Impact section of the site.
              </p>
            </section>

            <section className="mb-6">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-8 h-8 bg-red-500 text-white flex justify-center items-center rounded-full">
                  7
                </div>
                <h2 className="text-xl font-semibold">Newsletter</h2>
              </div>
              <p className="text-gray-700">
                Encourages users to sign up to the ChooseVeg newsletter by
                entering their name and email address.
              </p>
            </section>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Page;
