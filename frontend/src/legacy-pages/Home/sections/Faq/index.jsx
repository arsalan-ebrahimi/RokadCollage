import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import PatternLayer from "@/components/PatternLayer";

/* ---------- Data (FAQ-5 chat content, from the V5 design) ---------- */
const faqChat = [
  {
    q: "آیا برای شرکت در دوره‌های رکاد به پیش‌نیاز نیاز دارم؟",
    a: (
      <>
        خیر <span className="faq5-typing" style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><CheckCircle2 size={12} /> کارشناس رکاد</span>
        <br />
        دوره‌های کالج رکاد از سطح صفر تا حرفه‌ای طراحی شده‌اند. سرفصل‌ها
        مرحله‌به‌مرحله چیده شده‌اند؛ حتی اگر هیچ آشنایی قبلی نداری، به‌راحتی
        می‌تونی جلو بری.
      </>
    ),
  },
  {
    q: "آیا دوره‌ها برای نوجوانان و دانش‌آموزان هم مناسب هستند؟",
    a: (
      <>
        بله! رکاد اولین <strong>هنرستان استارتاپی</strong> ایرانه و دوره‌های
        اختصاصی برای نوجوانان و دانش‌آموزان داره. زبان و سبک تدریس متناسب با
        گروه سنی انتخاب می‌شه.
      </>
    ),
  },
  {
    q: "آیا بعد از پایان دوره مدرک دریافت می‌کنم؟",
    a: (
      <>
        بله. پس از اتمام موفق دوره و ارائه‌ی پروژه‌ی پایانی، مدرک معتبر
        رکاد‌کالج با <strong>کد QR قابل استعلام</strong> دریافت می‌کنی که
        کاملاً مناسب برای رزومه و لینکدین است.
      </>
    ),
  },
  {
    q: "آیا آموزش‌ها پروژه‌محور هستند؟",
    a: (
      <>
        کاملاً. هنرجو در طول دوره چند <strong>پروژه‌ی واقعی</strong> انجام
        می‌ده و در پایان یک پروژه‌ی جامع تحویل می‌ده که به‌عنوان نمونه‌کار
        قابل ارائه‌ست.
      </>
    ),
  },
  {
    q: "آیا در طول دوره پشتیبانی آموزشی دارم؟",
    a: (
      <>
        بله، ۱۰۰٪. منتور اختصاصی و گروه تلگرام با پاسخ‌گویی در
        کمتر از <strong>۲۴ ساعت</strong>.
      </>
    ),
  },
  {
    q: "آیا رکاد برای ورود به بازار کار هم کمک می‌کند؟",
    a: (
      <>
        بله. تیم کاریابی رکاد از رزومه‌سازی تا آماده‌سازی مصاحبه و معرفی به
        شرکت‌های همکار کنارت هست. هنرجویان برتر مستقیم به کارفرمایان معرفی
        می‌شن.
      </>
    ),
  },
  {
    q: "اگر ندانم کدام دوره برای من مناسب است، چه کار کنم؟",
    a: (
      <>
        کافیه <strong>مشاوره‌ی رایگان</strong> درخواست بدی. کارشناس ما با
        توجه به علاقه، شرایط و هدف شغلی‌ات، بهترین مسیر یادگیری رو بهت پیشنهاد
        می‌ده.
        <div className="faq5-suggestions">
          <a className="faq5-chip" href="#consult">درخواست مشاوره</a>
          <a className="faq5-chip" href="#courses-index">دیدن دپارتمان‌ها</a>
          <a className="faq5-chip" href="#consult">تماس با تیم</a>
        </div>
      </>
    ),
  },
];

/* ---------- Component ---------- */
export default function Faq() {
  // تمام بخش‌ها در ابتدا بسته باشند؛ با باز شدن هر مورد، بقیه بسته می‌شوند (Accordion).
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="section" id="faq" style={{ background: "var(--white)" }}>
      {/* Background pattern (mask fade) */}
      <PatternLayer rotate={180} />
      <div className="container section-inner">
        {/* Section heading */}
        <div className="faq5-head">
          <h2 className="faq5-title">
            یه گفت‌وگوی <span className="hl">کوتاه</span> با ما.
          </h2>
        </div>

        {/* Chat thread */}
        <div className="faq5">
          <div className="faq5-thread">
            {faqChat.map((item, i) => (
              <div key={item.q} className={`faq5-item${openIndex === i ? " open" : ""}`}>
                {/* User question */}
                <button
                  type="button"
                  className="faq5-user"
                  onClick={() => toggleItem(i)}
                  aria-expanded={openIndex === i}
                  style={{
                    background: "none",
                    border: "none",
                    width: "100%",
                    fontFamily: "inherit",
                    padding: 0,
                    margin: 0,
                    textAlign: "right",
                  }}
                >
                  <div className="faq5-bubble-user">
                    {item.q}
                    <span className="faq5-chevron">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                    </span>
                  </div>
                  <span className="avatar">شما</span>
                </button>

                {/* Bot answer */}
                <div className="faq5-bot-wrap">
                  <div className="faq5-bot-clip">
                    <div className="faq5-bot">
                      <span className="avatar">رُ</span>
                      <div className="faq5-bubble-bot">{item.a}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
