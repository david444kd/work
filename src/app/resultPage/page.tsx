"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
const Page = () => {
  const searchParams = useSearchParams();
  const [iframeError, setIframeError] = useState(false);

  const ensureProtocol = (url: string): string => {
    if (!url) {
      return "https://book.greatleads.ru/";
    }

    url = url.trim();

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  const [iframeSrc, setIframeSrc] = useState(() => {
    const initialSrc = searchParams.get("src") || "https://book.greatleads.ru/";
    return ensureProtocol(initialSrc);
  });

  const validateURL = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      return (
        ["http:", "https:"].includes(parsedUrl.protocol) &&
        parsedUrl.hostname.includes(".")
      );
    } catch {
      return false;
    }
  };

  const processURL = async (url: string): Promise<string> => {
    url = ensureProtocol(url);

    if (!validateURL(url)) {
      console.warn("Некорректный URL. Используется URL по умолчанию.");
      // toast.error("URL validation failed.");
      setIframeError(true);
      return "https://book.greatleads.ru/";
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 секунды тайм-аут

      const response = await fetch(url, {
        method: "HEAD",
        signal: controller.signal,
        mode: "no-cors",
      });

      clearTimeout(timeoutId);

      if (response.type === "opaque" || response.ok) {
        return url;
      } else {
        console.warn(`Ошибка доступа к URL: ${response.status}`);
        // toast.error("Could not access the URL.");
        setIframeError(true);
        return "https://book.greatleads.ru/";
      }
    } catch (err: any) {
      // toast.error("URL check failed.");
      console.warn(`Ошибка проверки URL: ${err.message}`);
      setIframeError(true);
      return url;
    }
  };

  useEffect(() => {
    const validateAndUpdateURL = async () => {
      const currentSrc = searchParams.get("src");
      if (currentSrc) {
        const validatedSrc = await processURL(currentSrc);
        setIframeSrc(validatedSrc);
      }
    };

    validateAndUpdateURL();

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
  }, [searchParams]);

  return (
    <div className="grid grid-cols-1 gap-5 md:gap-10 p-5 md:p-10 md:grid-cols-2 w-full h-screen m-auto">
      <div className="w-full h-[50vh] md:h-screen flex">
        {/* <iframe
          src={iframeSrc}
          className="w-full h-full"
          style={{ border: "none" }}
        ></iframe> */}
        {!iframeError ? (
          <iframe
            src={iframeSrc}
            className="w-full h-full"
            style={{ border: "none" }}
            onError={() => setIframeError(true)}
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 p-10 text-center">
            <div>
              <h2 className="text-3xl font-bold text-red-600 mb-4">
                Ошибка загрузки
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                К сожалению, не удалось загрузить страницу. Вероятно ошибка в
                введеном вами адресе, пожалуйста, замените адрес сайта или
                попробуйте позже.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                  Перезагрузить страницу
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col items-center justify-center md:h-screen h-[40vh]">
        <Card className="w-full h-full">
          <CardHeader className="px-5">UX Annotations</CardHeader>
          <div className="px-5">
            <Separator />
          </div>
          <CardBody className="overflow-auto px-5">
            <div className="mb-5 text-2xl font-semibold">HomePage</div>

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
