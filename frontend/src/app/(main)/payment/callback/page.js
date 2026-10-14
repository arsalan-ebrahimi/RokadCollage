import { Suspense } from "react";
import PaymentCallbackClient from "./PaymentCallbackClient";

export const metadata = {
  title: "نتیجه پرداخت | کالج رکاد",
  description: "رسید پرداخت و صدور لایسنس اسپات‌پلیر در کالج رکاد",
};

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-[60vh] flex items-center justify-center text-stone-600 font-bold"
          style={{ fontFamily: "var(--font-iransans), 'IRANSansX', system-ui, -apple-system, sans-serif" }}
        >
          در حال بررسی وضعیت تراکنش...
        </div>
      }
    >
      <PaymentCallbackClient />
    </Suspense>
  );
}
