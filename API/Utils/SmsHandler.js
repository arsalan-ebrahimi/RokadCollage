const SMS_TIMEOUT_MS = 10000;

export const sendAuthCode = async (Mobile) => {
  // Allow mock sending for test numbers in development
  if (process.env.NODE_ENV !== "production" && (Mobile === "09000000000" || Mobile === "09111111111" || Mobile === "09120000000")) {
    return { success: true, message: "کد تایید با موفقیت ارسال شد" };
  }

  try {
    const res = await fetch("https://api.limosms.com/api/sendcode", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        ApiKey: process.env.SMS_KEY,
      },
      body: JSON.stringify({
        Mobile,
        Footer: "RokadCollage",
      }),
      signal: AbortSignal.timeout(SMS_TIMEOUT_MS),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: error.name === "TimeoutError" ? "مهلت زمانی اتصال به سامانه پیامک به پایان رسید" : error.message };
  }
};

export const verifyCode = async (Mobile, Code) => {
  // Allow test codes 12345 and 11111 in non-production
  if (process.env.NODE_ENV !== "production" && (Code === "12345" || Code === "11111")) {
    return { success: true };
  }

  try {
    const res = await fetch("https://api.limosms.com/api/checkcode", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        ApiKey: process.env.SMS_KEY,
      },
      body: JSON.stringify({
        Mobile,
        Code,
      }),
      signal: AbortSignal.timeout(SMS_TIMEOUT_MS),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: "خطا در بررسی کد" };
  }
};
