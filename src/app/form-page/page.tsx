"use client";

import { useEffect, useState } from "react";
import { Formity, Value } from "formity";

import components from "./component";
import schema from "./schema";

import Data from "./data";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const hideSidebar = () => {
      const sidebar = document.getElementById("sidebar");
      const footer = document.getElementById("footer");
      if (sidebar) {
        sidebar.style.display = "none";
      }
      if (footer) {
        footer.style.display = "none";
      }
    };

    hideSidebar();

    const observer = new MutationObserver((mutations) => {
      hideSidebar();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      const sidebar = document.getElementById("sidebar");
      const footer = document.getElementById("footer");
      if (sidebar) {
        sidebar.style.display = "";
      }
      if (footer) {
        footer.style.display = "";
      }
    };
  }, []);
  const [result, setResult] = useState<Value | null>(null);

  function handleReturn(result: Value) {
    setResult(result);

    router.push("/");
  }

  if (result) {
    // return <Data data={result} onStart={() => setResult(null)} />;
  }

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
