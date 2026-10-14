import React from "react";
import { CheckCircle2 } from "lucide-react";
import { SectionHead, StarIcon } from "./DepartmentIcons.jsx";

export default function DepartmentTestimonialsSection({ dept }) {
  return (
    <section className="dp-block" id="dp-testimonials">
      <SectionHead pre="تجربهٔ" accent="هنرجویان" />
      <div className="dp-tests">
        {dept.testimonials.map((t, idx) => (
          <article
            className="dp-test-card"
            key={t.name}
            style={{ "--rot": `rotate(${[-0.7, 0.7, -0.5][idx % 3]}deg)` }}
          >
            <div className="dp-test-quote-mark" aria-hidden="true">“</div>
            <div className="dp-test-top">
              <span className="dp-test-badge">
                <CheckCircle2 size={12} strokeWidth={2.6} />
                {t.role}
              </span>
              <div className="dp-test-stars" aria-label="امتیاز ۵ از ۵">
                {Array.from({ length: 5 }, (_, s) => (
                  <StarIcon key={s} />
                ))}
              </div>
            </div>
            <p className="dp-test-quote">{t.text}</p>
            <div className="dp-test-foot">
              <div className="dp-test-av">{t.name.charAt(0)}</div>
              <div className="dp-test-meta">
                <strong className="dp-test-name">{t.name}</strong>
                <span className="dp-test-role">هنرجوی کالج رکاد</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
