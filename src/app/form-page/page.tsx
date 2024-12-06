"use client";
import { useEffect, useState } from "react";
import { Formity, Value } from "formity";

import components from "./component";
import schema from "./schema";

import { useUser, UserButton } from "@stackframe/stack";
import { useRouter } from "next/navigation";

type FormData = {
  website: string;
  targetAudience: string;
  productDescription: string;
  price: string;
  market: string;
  companyDescription: string;
};

export default function Home() {
  let user = useUser();
  const [userEmail, setUserEmail] = useState<any>();
  const router = useRouter();
  const [result, setResult] = useState<FormData | null>(null);

  const sendData = async () => {
    // const data = {
    //   website: localStorage.getItem("website"),
    //   targetAudience: localStorage.getItem("targetAudience"),
    //   productDescription: localStorage.getItem("productDescription"),
    //   price: localStorage.getItem("price"),
    //   market: localStorage.getItem("market"),
    //   companyDescription: localStorage.getItem("companyDescription"),
    // };
    const data = {
      websiteUrl: localStorage.getItem("website"),
      companyName: localStorage.getItem("companyDescription"),
      productDescription: localStorage.getItem("productDescription"),
      targetMarket: localStorage.getItem("market"),
      targetAudienceDescription: localStorage.getItem("targetAudience"),
      primaryObjective: "increase conversions",
      costStructure: localStorage.getItem("price"),
      marketSpecificInsights:
        "Localized case studies are important for this market.",
    };

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("jghfjkghfj", result.analysis);
      res(result.analysis);
    } catch (err) {
      console.error("ChatNeRabotaet", err);
    }
  };

  useEffect(() => {
    setUserEmail(user?.primaryEmail);
    console.log("userEmail:", user?.primaryEmail);

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

  function handleReturn(data: unknown) {
    const result = data as FormData;
    console.log("Полученные данные:", result);

    setResult(result);

    sendData();

    // res(result);
    const iframeSrc = encodeURIComponent(result.website);
    router.push("/");
  }

  const res = async (response: any) => {
    const rows = [
      [
        userEmail,
        localStorage.getItem("website"),
        localStorage.getItem("targetAudience"),
        localStorage.getItem("productDescription"),
        localStorage.getItem("price"),
        localStorage.getItem("market"),
        localStorage.getItem("companyDescription"),
        response,
      ],
    ];

    console.log("Проверяем формат данных перед отправкой:", rows);

    try {
      const response = await fetch(
        "https://v1.nocodeapi.com/pumba44/google_sheets/rKIhtpAtNmyDuJDY?tabId=Лист1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rows),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Ошибка при запросе:", response.status, errorText);
      } else {
        console.log("Данные успешно отправлены:", await response.json());
        localStorage.removeItem("website");
        localStorage.removeItem("targetAudience");
        localStorage.removeItem("productDescription");
        localStorage.removeItem("price");
        localStorage.removeItem("market");
        localStorage.removeItem("companyDescription");
      }
    } catch (err) {
      console.error("Ошибка при выполнении fetch:", err);
    }
  };

  return (
    <div className="flex w-full bg-black z-50 h-screen items-center justify-center">
      <Formity
        components={components}
        schema={schema}
        onReturn={handleReturn}
      />
    </div>
  );
}
