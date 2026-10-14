import "./departments.css";
import PatternLayer from "@/components/PatternLayer";

/* ---- سه دپارتمان کالج رکاد ----
   layout:
     "stack" (پیش‌فرض) → ۲ کارت بالا + ۱ کارت عریض پایین
     "row3"           → ۳ کارت کنار هم (ستون یکسان)
   پترن هدر از کارت‌های وعده‌های کالج رکاد، هرکدام همرنگ خودش
*/
const departments = [
  {
    id: "it",
    title: ["فناوری", "اطلاعات"],
    desc: "از طراحی وب و برنامه‌نویسی تا امنیت و شبکه؛ همهٔ مهارت‌های دنیای دیجیتال در یک مسیر.",
    chips: ["طراحی سایت", "برنامه‌نویسی", "سئو", "امنیت", "شبکه"],
    stat: "+۸۰۰",
    statLabel: "هنرجو",
    pattern: "/assets/StatCard/blue.png",
    dept: "var(--navy-alt)",
    deptLight: "var(--male-light)",
    deptDark: "var(--navy)",
  },
  {
    id: "business",
    title: ["کسب", "و کار"],
    desc: "مهارت‌های مدیریت، بازاریابی و کارآفرینی؛ برای شروع و رشد مسیر حرفه‌ات در بازار.",
    chips: ["مدیریت", "بازاریابی", "کارآفرینی", "حسابداری", "رهبری"],
    stat: "+۵۰۰",
    statLabel: "هنرجو",
    pattern: "/assets/StatCard/yellow.png",
    dept: "var(--college)",
    deptLight: "var(--college-light)",
    deptDark: "var(--college-darker)",
  },
  {
    id: "languages",
    wide: true,
    title: ["زبان‌های", "خارجی"],
    desc: "انگلیسی، آیلتس و زبان‌های بین‌المللی برای تحصیل، کار و ارتباطات جهانی؛ از مکالمه روزمره تا Business English و آمادگی آزمون‌های معتبر.",
    chips: ["IELTS", "Business English", "مکالمه", "تافل", "زبان دوم", "ترجمه"],
    stat: "+۶۰۰",
    statLabel: "هنرجو",
    pattern: "/assets/StatCard/green.png",
    dept: "var(--teal-alt)",
    deptLight: "var(--teal-light)",
    deptDark: "var(--teal-dark)",
  },
];

/* ---- آیکونها (متناسب با دپارتمان) ---- */
const deptIcons = {
  it: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  business: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12.01" />
    </svg>
  ),
  languages: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

export default function Departments({ layout = "stack" }) {
  const row3 = layout === "row3";
  return (
    <section className="dept5-section" id="departments">
      {/* Background pattern (mask fade) */}
      <PatternLayer rotate={0} />

      <div className="dept5-inner">
        {/* Head */}
        <div className="dept5-head">
          <h2>
            <span className="w w1">سه</span>
            <span className="w w2">دپارتمان،</span>
            <span className="w w3">سه جهان</span>
          </h2>
        </div>

        {/* Grid: پیش‌فرض ۲ بالا + ۱ عریض | layout="row3" → ۳ ستونه کنار هم */}
        <div className={`dept5-grid${row3 ? " row3" : ""}`}>
          {departments.map((d) => (
            <div
              key={d.id}
              className={`dept5-stack ${d.id}${d.wide && !row3 ? " wide" : ""}`}
              role="link"
              tabIndex={0}
              onClick={() => { window.location.hash = `dept/${d.id}`; }}
              onKeyDown={(e) => { if (e.key === "Enter") window.location.hash = `dept/${d.id}`; }}
              style={{
                "--dept": d.dept,
                "--dept-light": d.deptLight,
                "--dept-dark": d.deptDark,
                cursor: "pointer",
              }}
            >
              <article className="dept5-card">
                {/* Colored header + pattern PNG (مثل وعده‌های کالج رکاد) */}
                <div className="dept5-header">
                  <img
                    src={d.pattern}
                    alt=""
                    aria-hidden="true"
                    className="dept5-pattern"
                  />
                  <div className="dept5-icon-box">{deptIcons[d.id]}</div>
                </div>

                {/* Body */}
                <div className="dept5-body">
                  <h3>
                    <span className="w w1">{d.title[0]}</span>
                    <span className="w w2">{d.title[1]}</span>
                  </h3>
                  <p className="dept5-desc">{d.desc}</p>
                  <div className="dept5-chips">
                    {d.chips.map((c) => (
                      <span key={c} className="dept5-chip">{c}</span>
                    ))}
                  </div>
                  <div className="dept5-foot">
                    <div className="dept5-stat">
                      <strong>{d.stat}</strong>
                      <span>{d.statLabel}</span>
                    </div>
                    <a href={`#dept/${d.id}`} className="dept5-cta">
                      ورود به دپارتمان
                      <ArrowIcon />
                    </a>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
