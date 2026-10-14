import { Fragment } from "react";
import { ArrowIcon } from "@/common/Icons";
import PatternLayer from "@/components/PatternLayer";

/* ---- Ticker items ---- */
const tickerItems = [
  { num: "+۲.۵k", label: "هنرجوی فعال" },
  { num: "+۵۰", label: "دورهٔ فعال" },
  { num: "۹۸٪", label: "رضایت" },
  { num: "+۱۰۰", label: "استاد" },
  { num: "+۸۰۰", label: "پروژه‌ی تحویل‌شده" },
  { num: "۲۴/۷", label: "پشتیبانی" },
];

/* ---- Board tiles ---- */
const tiles = [
  { num: "۰۴", label: "دپارتمان تخصصی", cls: "t1" },
  { num: "+۸۰۰", label: "پروژه‌ی تحویل‌شده", cls: "t2" },
  { num: "+۱۰۰", label: "استاد متخصص", cls: "t3" },
  { num: "+۲۰", label: "شرکت همکار", cls: "t4" },
];

export default function StatsTicker() {
  return (
    <section className="section p5-section" id="features" style={{ background: "var(--white)" }}>
      {/* Background pattern (mask fade) */}
      <PatternLayer rotate={180} />

      <div className="container p5-inner">
        {/* Head */}
        <div className="p5-head">
          <h2 className="t-section">
            <span style={{ display: "inline-block", transform: "rotate(-1.5deg)" }}>اینجا</span>{" "}
            <span style={{ display: "inline-block", transform: "rotate(1.5deg)", color: "var(--college)" }}>فقط</span>{" "}
            <span className="strike" style={{ display: "inline-block", transform: "rotate(-1deg)", position: "relative" }}>آموزش</span>{" "}
            <span style={{ display: "inline-block", transform: "rotate(2deg)", color: "var(--ink)" }}>نمی‌بینی</span>
            <br />
            <span>برای </span>
            <span className="mk">آینده</span>
            <span> آماده می‌شوی.</span>
          </h2>
        </div>

        {/* Ticker */}
        <div className="p5-ticker"> 
          <div className="p5-track">
            {/* 4 identical copies: guaranteed to fill the box at every instant */}
            {[0, 1, 2, 3].map((copy) => (
              <div className="p5-set" key={copy} aria-hidden={copy !== 0}>
                {tickerItems.map((item, i) => (
                  <Fragment key={`${copy}-${i}`}>
                    <span className="p5-k">
                      <span className="p5-n">{item.num}</span>
                      <span style={{ color: "#fff" }}>{item.label}</span>
                    </span>
                    <span className="p5-sep" />
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bulletin Board */}
        <div className="p5-board">
          {tiles.map((tile) => (
            <div key={tile.num} className={`p5-tile ${tile.cls}`}>
              <span className="p5-pin" />
              <div className="p5-tile-num">{tile.num}</div>
              <div className="p5-tile-lbl">{tile.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
