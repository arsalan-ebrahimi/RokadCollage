import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/UI";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center"
    >
      <span className="text-7xl font-black text-primary mb-4">۴۰۴</span>
      <h2 className="text-2xl font-bold text-secondary mb-2">صفحه مورد نظر یافت نشد</h2>
      <p className="text-text-secondary text-sm mb-6">
        صفحه‌ای که به دنبال آن بودید وجود ندارد یا منتقل شده است.
      </p>
      <Button variant="primary" onClick={() => navigate("/")}>
        بازگشت به داشبورد اصلی
      </Button>
    </div>
  );
}
