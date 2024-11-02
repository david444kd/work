"use client";
import Link from "next/link";
import { useEffect } from "react";

const EmptyPage = () => {
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

  return (
    <div className="flex w-full bg-black z-50 h-screen items-center justify-center">
      <Link href="/form-page">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Открыть форму
        </button>
      </Link>
    </div>
  );
};

export default EmptyPage;
