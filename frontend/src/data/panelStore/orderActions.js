import { getPanelStore, savePanelStore } from "./storeCore.js";
import { enrollInCourse } from "./courseActions.js";

export function validateCoupon(code, basePrice = 0) {
  if (!code) return { valid: false, error: "لطفاً کد تخفیف را وارد کنید." };
  const clean = code.trim().toUpperCase();
  const COUPONS = {
    ROKAD20: { percent: 20, desc: "۲۰٪ تخفیف ویژه دانشجویان رکاد" },
    ROKAD50: { percent: 50, desc: "۵۰٪ تخفیف شگفت‌انگیز افتتاحیه" },
    NOWRUZ: { percent: 30, desc: "۳۰٪ تخفیف جشنواره پاییز" },
    FREE100: { percent: 100, desc: "۱۰۰٪ تخفیف بورسیه آموزشی" },
  };

  if (COUPONS[clean]) {
    const { percent, desc } = COUPONS[clean];
    const discountAmount = Math.round((basePrice * percent) / 100);
    const finalPrice = Math.max(0, basePrice - discountAmount);
    return {
      valid: true,
      percent,
      discountAmount,
      finalPrice,
      desc,
      code: clean,
    };
  }

  return {
    valid: false,
    error: "کد تخفیف وارد شده معتبر نیست یا مهلت آن به پایان رسیده است.",
  };
}

export function createOrder({
  courseSlug,
  courseTitle,
  price,
  discountPrice,
  couponCode,
  teacher,
  sessions,
}) {
  const state = getPanelStore();
  const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const finalAmount =
    discountPrice !== undefined && discountPrice !== null
      ? discountPrice
      : price;

  const newOrder = {
    id: orderId,
    courseSlug,
    courseTitle,
    teacher: teacher || "اساتید کالج رکاد",
    sessions: sessions || "۱۲ فصل · ۳۲ ساعت",
    price: price || 0,
    paidAmount: finalAmount || 0,
    discountCode: couponCode || null,
    status: "pending_payment",
    gateway: "درگاه پرداخت شاپرک / زرین‌پال",
    trackingCode: null,
    createdAt: new Date().toLocaleDateString("fa-IR"),
    paidAt: null,
  };

  const updatedOrders = [newOrder, ...(state.orders || [])];
  const updatedState = { ...state, orders: updatedOrders };
  savePanelStore(updatedState);
  return newOrder;
}

export function verifyAndCompleteOrder(orderId) {
  const state = getPanelStore();
  const order = (state.orders || []).find((o) => o.id === orderId);
  if (!order) {
    return { success: false, error: "سفارش مورد نظر در سیستم یافت نشد." };
  }

  if (order.status === "paid") {
    return { success: true, order, alreadyPaid: true };
  }

  const trackingCode = "TRK-" + Math.floor(100000 + Math.random() * 900000);
  const nowFa =
    new Date().toLocaleDateString("fa-IR") +
    " - " +
    new Date().toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const updatedOrders = state.orders.map((o) => {
    if (o.id !== orderId) return o;
    return {
      ...o,
      status: "paid",
      trackingCode,
      paidAt: nowFa,
    };
  });

  const { isNew, course } = enrollInCourse({
    slug: order.courseSlug,
    title: order.courseTitle,
    teacher: order.teacher,
    sessions: order.sessions,
  });

  const updatedState = {
    ...getPanelStore(),
    orders: updatedOrders,
    user: {
      ...state.user,
      level: {
        ...state.user.level,
        points: (state.user.level?.points || 2480) + 200,
      },
    },
  };
  savePanelStore(updatedState);

  const completedOrder = updatedOrders.find((o) => o.id === orderId);
  return { success: true, order: completedOrder, course, isNew };
}

export function getOrderById(orderId) {
  const state = getPanelStore();
  return (state.orders || []).find((o) => o.id === orderId) || null;
}
