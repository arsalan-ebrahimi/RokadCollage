import "./about.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PatternLayer from "@/components/PatternLayer";

const steps = [
  {
    num: "۰۱",
    title: "یاد بگیر",
    text: "سرفصل‌های ساخت‌یافته از سطح صفر تا حرفه‌ای، در ۴ دپارتمان تخصصی.",
    cls: "n1",
  },
  {
    num: "۰۲",
    title: "تجربه کن",
    text: "هر دوره با پروژه‌ی واقعی پایان می‌گیره؛ یعنی نمونه‌کار قابل ارائه.",
    cls: "n2",
  },
  {
    num: "۰۳",
    title: "مهارت بساز",
    text: "منتور اختصاصی، پشتیبانی زیر ۲۴ ساعت، جلسات آنلاین.",
    cls: "n3",
  },
  {
    num: "۰۴",
    title: "وارد بازار کار شو",
    text: "رزومه‌سازی، آماده‌سازی مصاحبه و معرفی به شرکت‌های همکار.",
    cls: "n4",
  },
];

export default function About() {
  return (
    <section className="abt-section" id="about">
      {/* Background pattern (mask fade) */}
      <PatternLayer rotate={0} />

      <div className="abt-inner">
        {/* Left side: text (right column in RTL) */}
        <div className="abt-side">
          <div className="abt-head-row">
            <h2 className="abt-title">
              از <span className="hl">صفر</span> تا
              <br />
              ورود به بازار کار.
            </h2>
            <div className="abt-foot-mobile">
              <Link href="/courses" className="abt-btn" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span>مشاهده دوره‌ها</span>
                <ArrowLeft size={14} />
              </Link>
            </div>
          </div>
          <p className="abt-body">
            <strong>رکاد فقط دوره برگزار نمی‌کنه</strong>؛ یه مسیر کامل ۴
            مرحله‌ای طراحی کرده. از انتخاب رشته، تا یادگیری، تجربه و
            آماده‌شدن برای اولین شغلت.
          </p>
          <div className="abt-foot">
            <Link href="/courses" className="abt-btn" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span>مشاهده دوره‌ها</span>
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>

        {/* Right side: vertical timeline (left column in RTL) */}
        <div className="abt-timeline">
          {steps.map((s) => (
            <div key={s.num} className={`abt-step ${s.cls}`}>
              {/* colored card face: sits ABOVE the dark back layer */}
              <div className="abt-card">
                <span className="node">{s.num}</span>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}