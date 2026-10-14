import { ArrowIcon, ChevronLeftIcon } from "@/common/Icons";
import PatternLayer from "@/components/PatternLayer";

/* ---- Course list items ---- */
const courses = [
  { title: "طراحی سایت با وردپرس", sub: "۱۲ هفته • IT", cls: "" },
  { title: "برنامه‌نویسی فرانت‌اند", sub: "۱۶ هفته • IT", cls: "" },
  { title: "سئو و بهینه‌سازی سایت", sub: "۸ هفته • IT", cls: "s" },
  { title: "فتوشاپ و طراحی گرافیک", sub: "۱۰ هفته • گرافیک", cls: "g" },
  { title: "مسیر زبان و MBA", sub: "۴ ماه • بین‌المللی", cls: "l" },
];

/* ---- SVG icons per course ---- */
const courseIcons = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 2v10l7-7"/></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 22a10 10 0 1 1 10-10c0 2-1.5 3-3 3h-3a3 3 0 0 0-3 3c0 1.5 1 2 1 3a2 2 0 0 1-2 1z"/></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M3 5h12M9 3v2m1 9.5A18 18 0 0 1 6.4 9M12.75 5C11.8 10.8 8 15.6 3 18.1"/><path d="M11 21l5-10 5 10M13 17h6"/></svg>,
];

/* ---- Icon colors per course ---- */
const iconColors = ["", "", "var(--navy)", "var(--female)", "var(--ecosystem)"];

export default function Hero() {
  return (
    <section className="hero-v5" id="hero" style={{ background: "var(--bg-college-tint)" }}>
      {/* Background pattern (mask fade) */}
      <PatternLayer rotate={0} />

      <div className="container hero-v5-grid">
        {/* Left: Content */}
        <div className="hero-v5-content">
          <h1>
            <span>مهارت</span>{" "}
            <span style={{ color: "var(--college)" }}>امروزت،</span>
            <br />
            <span>آینده</span>{" "}
            <span className="mk">شغلی</span>{" "}
            <span>فردات</span>
            <br />
            <span>را می‌سازد.</span>
          </h1>

          <p className="hero-v5-lead">
            در کالج رکاد از یادگیری شروع کن، برای آینده آماده شو. با یک کلیک، ببین کدام دوره برای مسیر تو مناسب است.
          </p>

          <div className="hero-v5-actions">
            <a href="#courses-index" className="hero-v5-btn-primary">
              مشاهده دوره‌ها
              <ArrowIcon width={16} height={16} />
            </a>
            <a href="#consult" className="hero-v5-btn-ghost">
              مشاورهٔ رایگان
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width={16} height={16}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </a>
          </div>

          <span className="hero-v5-sub">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" width={16} height={16}><polyline points="20 6 9 17 4 12"/></svg>
            از یادگیری شروع کن، برای آینده آماده شو.
          </span>
        </div>

        {/* Right: Course catalog panel */}
        <div className="hero-v5-panel-wrap">
          <div className="hero-v5-panel">
            <div className="hero-v5-panel-head">
              <h4>دوره‌های پیشنهادی</h4>
              <span className="hero-v5-cnt">۶ دوره فعال</span>
            </div>

            {courses.map((c, i) => (
              <a key={c.title} href="#course/ui-ux" className={`hero-v5-course ${c.cls}`}>
                <div className="hero-v5-course-ic" style={iconColors[i] ? { background: iconColors[i] } : {}}>
                  {courseIcons[i]}
                </div>
                <div className="hero-v5-course-info">
                  <div className="hero-v5-course-t">{c.title}</div>
                  <div className="hero-v5-course-s">{c.sub}</div>
                </div>
                <div className="hero-v5-course-arr">
                  <ChevronLeftIcon width={12} height={12} />
                </div>
              </a>
            ))}

            <a href="#courses-index" className="hero-v5-all">
              مشاهدهٔ همه دوره‌ها
              <ArrowIcon width={14} height={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
