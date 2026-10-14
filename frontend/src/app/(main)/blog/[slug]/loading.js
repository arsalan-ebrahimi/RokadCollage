import React from "react";

export default function BlogArticleLoading() {
  return (
    <section className="rbs-page">
      <div className="container">
        {/* نوار ناوبری بالا */}
        <div className="rbs-bar animate-pulse">
          <div className="h-4 w-28 bg-stone-200 rounded" />
          <div className="h-4 w-36 bg-amber-200 rounded" />
        </div>

        {/* گرید اصلی: مقاله + سایدبار */}
        <div className="rbs-layout animate-pulse">
          {/* مقاله */}
          <article className="rbs-article">
            <div className="rbs-tags">
              <span className="rbs-tag filled-amber" style={{ opacity: 0.7 }}>دسته بندی</span>
              <span className="rbs-tag ghost" style={{ opacity: 0.5 }}>موضوع مقاله</span>
            </div>

            <div className="my-5 space-y-3">
              <div className="h-10 w-full bg-stone-300 rounded-xl" />
              <div className="h-10 w-2/3 bg-stone-300 rounded-xl" />
            </div>

            <div className="rbs-meta">
              <div className="h-3.5 w-24 bg-stone-200 rounded" />
              <span className="dot">●</span>
              <div className="h-3.5 w-20 bg-stone-200 rounded" />
              <span className="dot">●</span>
              <div className="h-3.5 w-24 bg-stone-200 rounded" />
            </div>

            {/* کاور مقاله با گرادیان دقیق کهربایی */}
            <div className="rbs-cover">
              <div
                className="rbs-cover-card"
                style={{
                  background: "linear-gradient(135deg, #ffd44d 0%, var(--college) 55%, var(--college-dark) 100%)",
                  minHeight: 320,
                  display: "grid",
                  placeItems: "center"
                }}
              >
                <div className="w-16 h-16 bg-white/40 rounded-2xl border-2 border-[#292827]" />
              </div>
            </div>

            {/* بدنه و متن‌ها */}
            <div className="rbs-prose space-y-4 pt-6">
              <div className="h-4 w-full bg-stone-200 rounded" />
              <div className="h-4 w-11/12 bg-stone-200 rounded" />
              <div className="h-4 w-4/5 bg-stone-200 rounded" />
              <div className="h-8 w-1/2 bg-amber-200/70 border border-[#292827] rounded-lg my-6" />
              <div className="h-4 w-full bg-stone-200 rounded" />
              <div className="h-4 w-5/6 bg-stone-200 rounded" />
            </div>
          </article>

          {/* سایدبار استیکی */}
          <aside className="rbs-side">
            <div className="rbs-side-card rbs-side-author">
              <div className="row">
                <span className="avatar bg-stone-200" />
                <div style={{ flex: 1 }}>
                  <div className="h-4 w-28 bg-stone-300 rounded mb-1" />
                  <div className="h-3 w-20 bg-stone-200 rounded" />
                </div>
              </div>
              <div className="h-3.5 w-full bg-stone-200 rounded mt-3" />
            </div>

            <div className="rbs-side-card">
              <div className="head">فهرست مطالب</div>
              <div className="space-y-3 pt-2">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-amber-100 border border-[#292827] rounded text-xs flex items-center justify-center font-bold">
                      {n}
                    </span>
                    <div className="h-3.5 w-3/4 bg-stone-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
