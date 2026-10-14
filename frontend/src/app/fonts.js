import localFont from "next/font/local";

export const iransans = localFont({
  src: [
    {
      path: "../../public/fonts/IRANSansX-RegularD4.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-MediumD4.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-DemiBoldD4.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-BoldD4.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-ExtraBoldD4.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-BlackD4.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-iransans",
  preload: true,
});
