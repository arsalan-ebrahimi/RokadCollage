import React from "react";
import { BookOpen, ChevronDown, Check } from "lucide-react";
import { toFa } from "./InPersonHero.jsx";

export default function InPersonSprints({ sprints, schedule, openSprint, setOpenSprint }) {
  return (
    <section className="cs-ip-section-card" id="sprints-curriculum">
      <div className="cs-ip-sec-header">
        <div className="cs-ip-sec-header-right">
          <span className="cs-ip-sec-num">۰۲</span>
          <div className="cs-ip-sec-icon-box">
            <BookOpen size={18} />
          </div>
          <div className="cs-ip-sec-titles">
            <h2 className="cs-ip-sec-title">سرفصل‌ها و اسپرینت‌های کارگاهی</h2>
            <span className="cs-ip-sec-sub">{toFa(sprints.length)} اسپرینت عملیاتی · {schedule.totalHours}</span>
          </div>
        </div>
        <span className="cs-ip-sec-badge highlight">مسیر یادگیری</span>
      </div>

      <div className="cs-ip-sec-body">
        <div className="cs-curriculum">
          <div className="cs-progress">
            <b>{toFa(sprints.length)} اسپرینت کارگاهی · {schedule.totalHours}</b>
            <div className="bar"><span style={{ width: "100%" }} /></div>
          </div>

          <div className="cs-chapters">
            {sprints.map((sp, idx) => {
              const isOpen = openSprint === idx;
              return (
                <div key={sp.n} className={`cs-ch ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    className="cs-ch-head"
                    onClick={() => setOpenSprint(isOpen ? -1 : idx)}
                  >
                    <span className="num">{toFa(sp.n)}</span>
                    <div className="info">
                      <b>{sp.title}</b>
                      <small>{sp.weeks}</small>
                    </div>
                    <span className="dur">{sp.output}</span>
                    <span className="chev">
                      <ChevronDown
                        size={16}
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "none",
                          transition: "transform .2s ease",
                        }}
                      />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="cs-inperson-sprint-detail">
                      <p>{sp.desc}</p>
                      <div className="cs-inperson-sprint-badge">
                        <Check size={13} strokeWidth={3} />
                        <span>خروجی مورد انتظار: {sp.output}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
