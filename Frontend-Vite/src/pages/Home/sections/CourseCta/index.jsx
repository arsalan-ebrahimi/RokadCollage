/* CTA-5: Ticket / Coupon style (V5) */
import { ArrowLeft } from "lucide-react";
import PatternLayer from "@/components/PatternLayer";

const ctaMeta = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" aria-hidden="true">
        <path d="M3 7h18M3 12h18M3 17h18" />
      </svg>
    ),
    text: (
      <>
        <strong>۴ دپارتمان</strong> تخصصی
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" aria-hidden="true">
        <path d="M12 2v6M12 22v-6M2 12h6M22 12h-6" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    text: (
      <>
        <strong>+۵۰</strong> دوره پروژه‌محور
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" aria-hidden="true">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
    text: (
      <>
        پشتیبانی <strong>تا بازار کار</strong>
      </>
    ),
  },
];

export default function CourseCta() {
  return (
    <section
      className="section"
      id="path"
      style={{ background: "#faf8f2", position: "relative", overflow: "hidden" }}
    >
      {/* Background pattern (mask fade) */}
      <PatternLayer rotate={0} />
      <div className="container section-inner">
        <div className="cta5-wrap">
          {/* Ticket card */}
          <div className="cta5">
            {/* Main part */}
            <div className="cta5-main">
              <h3 className="cta5-title">
                نمی‌دونی از کجا
                <br />
                <span className="hl">شروع</span> کنی؟
              </h3>
              <p className="cta5-desc">
                یک گفت‌وگوی ۱۵ دقیقه‌ای و رایگان با کارشناس رکاد کافی است؛
                هدفت را می‌سنجیم و مناسب‌ترین دوره را به تو پیشنهاد می‌دهیم.
              </p>
              <div className="cta5-meta">
                {ctaMeta.map((m, i) => (
                  <div className="item" key={i}>
                    <span className="ic">{m.icon}</span>
                    <div>{m.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stub */}
            <div className="cta5-stub">
              <span className="pin">۱۰۰٪ رایگان</span>
              <span className="tag">CONSULTATION</span>
              <div className="big">
                مشاوره‌ی
                <br />
                رایگان
              </div>
              <a href="#consult" className="btn" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <span>درخواست بده</span>
                <ArrowLeft size={16} />
              </a>
              <div className="code">ROKAD · COLLEGE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
