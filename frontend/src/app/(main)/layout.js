"use client";

import Header from "@/components/Header/index.jsx";
import Footer from "@/components/Footer/index.jsx";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamic import for off-screen modals & toasts to shave bundle size
const ConsultationModal = dynamic(() => import("@/components/ConsultationModal/index.jsx"), {
  ssr: false,
});
const AuthPromptToast = dynamic(() => import("@/components/AuthPromptToast/index.jsx"), {
  ssr: false,
});

export default function MainLayout({ children }) {
  const [consultOpen, setConsultOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      setConsultOpen(window.location.hash === "#consult");
    };
    window.addEventListener("hashchange", handleHash);
    handleHash();
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const closeConsult = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = "";
    }
  };

  return (
    <>
      {consultOpen && <ConsultationModal isOpen={consultOpen} onClose={closeConsult} />}
      <AuthPromptToast />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
