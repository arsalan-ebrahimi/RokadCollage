import { apiRequest } from "@/lib/api";

/**
 * دریافت اطلاعات کیف پول کاربر جاری
 */
export async function getMyWallet() {
  const res = await apiRequest("/wallet/my");
  return res?.data || res;
}

/**
 * درخواست شارژ کیف پول از طریق درگاه زرین‌پال
 * @param {number} amount مبلغ به تومان
 */
export async function requestWalletCharge(amount) {
  const res = await apiRequest("/wallet/charge/request", {
    method: "POST",
    body: JSON.stringify({ amount }),
  });
  return res?.data || res;
}

/**
 * تایید تراکنش زرین‌پال پس از بازگشت از درگاه
 * @param {string} authority توکن شناسه پرداخت زرین‌پال
 * @param {string} status وضعیت پرداخت (OK یا NOK)
 */
export async function verifyWalletCharge(authority, status) {
  const res = await apiRequest(`/wallet/charge/verify?Authority=${authority}&Status=${status}`);
  return res?.data || res;
}
