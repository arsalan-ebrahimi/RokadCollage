import "./globals.css";
import { iransans } from "./fonts.js";
import HashRouterListener from "@/components/HashRouterListener.jsx";

export const metadata = {
  title: "کالج رکاد | آکادمی تخصصی برنامه‌نویسی و طراحی",
  description: "دوره‌های حضوری و آنلاین با تمرکز بر ورود به بازار کار و پشتیبانی منتورها",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={iransans.variable}>
      <body className={`antialiased bg-[#fdfbf7] text-[#292827] font-sans selection:bg-[#f8a41d]/20 selection:text-[#21295a]`}>
        <HashRouterListener />
        {children}
      </body>
    </html>
  );
}
