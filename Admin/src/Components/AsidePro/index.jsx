import React from "react";
import { AsideMenuPro } from "./AsideMenuPro";

export default function AsidePro() {
  return (
    <aside
      dir="rtl"
      className="shrink-0 w-[260px] md:w-[270px] h-screen sticky top-0 bg-surface border-l border-border/80 p-4 flex flex-col shadow-xs z-50 overflow-y-auto hide-scrollbar"
    >
      {/* Brand Header */}
      <div className="w-full flex items-center gap-3 mb-6 border-b border-border-light pb-4 px-2">
        <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/25 shrink-0 p-1.5">
          <img
            src="/Logo-Type-white.png"
            alt="لوگو کالج رکاد"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-secondary text-base leading-tight">کالج رکاد</span>
          <span className="text-[11px] text-text-muted font-medium">پنل مدیریت آموزشگاه</span>
        </div>
      </div>

      {/* Menus Section */}
      <div className="w-full flex flex-col gap-2">
        <AsideMenuPro titleMenu="مدیریت کالج" />
      </div>
    </aside>
  );
}
