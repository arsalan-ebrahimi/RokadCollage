import { getPanelStore, savePanelStore } from "./storeCore.js";

/** ثبت‌نام در دوره */
export function enrollInCourse(courseInfo) {
  if (!courseInfo) return { enrolled: false };
  const state = getPanelStore();
  const existing = (state.myCourses || []).find(
    (c) =>
      (courseInfo.slug && c.slug === courseInfo.slug) ||
      (courseInfo.id && (c.id === courseInfo.id || c._id === courseInfo.id)) ||
      (courseInfo._id && (c.id === courseInfo._id || c._id === courseInfo._id))
  );
  if (existing) {
    if (courseInfo._id && !existing._id) existing._id = courseInfo._id;
    if (courseInfo.slug && !existing.slug) existing.slug = courseInfo.slug;
    savePanelStore(state);
    return { enrolled: true, isNew: false, course: existing };
  }

  const newCourse = {
    id: courseInfo._id || courseInfo.id || Date.now(),
    _id: courseInfo._id || courseInfo.id,
    slug: courseInfo.slug || "new-course-" + Date.now(),
    title: courseInfo.title || "دوره آموزشی جدید",
    teacher:
      courseInfo.teacher?.name || courseInfo.teacher || "اساتید کالج رکاد",
    sessions: courseInfo.sessions || "۱۰ جلسه · ۲۰ ساعت",
    progress: 0,
    chapter: "فصل ۱ از ۶",
    next: "شروع جلسه اول: مقدمه و نصب ابزارها",
    status: "new",
    pattern: "/assets/StatCard/blue.png",
    lessons: [
      {
        id: Date.now() + 1,
        n: 1,
        title: "مقدمه، معرفی سرفصل‌ها و نقشه راه",
        time: "۲۰ دقیقه",
        done: false,
        now: true,
      },
      {
        id: Date.now() + 2,
        n: 2,
        title: "راه‌اندازی محیط توسعه و مفاهیم پایه",
        time: "۳۵ دقیقه",
        done: false,
        locked: false,
      },
      {
        id: Date.now() + 3,
        n: 3,
        title: "ورود به مفاهیم تخصصی و پیاده‌سازی گام‌به‌گام",
        time: "۴۰ دقیقه",
        done: false,
        locked: false,
      },
      {
        id: Date.now() + 4,
        n: 4,
        title: "کار روی پروژه اول و تحلیل نمونه کدها",
        time: "۴۵ دقیقه",
        done: false,
        locked: false,
      },
      {
        id: Date.now() + 5,
        n: 5,
        title: "حل چالش‌ها، آزمون فصلی و تکلیف عملی",
        time: "۵۰ دقیقه",
        done: false,
        locked: false,
      },
      {
        id: Date.now() + 6,
        n: 6,
        title: "پروژه نهایی و آمادگی آزمون پایانی",
        time: "۶۰ دقیقه",
        done: false,
        locked: false,
      },
    ],
  };

  const updatedCourses = [newCourse, ...state.myCourses];
  const updatedState = {
    ...state,
    myCourses: updatedCourses,
    user: {
      ...state.user,
      stats: state.user.stats.map((s, idx) =>
        idx === 0 ? { ...s, num: String(updatedCourses.length) } : s
      ),
    },
  };
  savePanelStore(updatedState);
  return { enrolled: true, isNew: true, course: newCourse };
}

/** تیک زدن / تکمیل یک درس و محاسبه پیشرفت */
export function toggleLessonDone(courseId, lessonId) {
  const state = getPanelStore();
  let generatedCert = null;

  const updatedCourses = state.myCourses.map((c) => {
    if (c.id !== courseId) return c;
    const updatedLessons = c.lessons.map((l) =>
      l.id === lessonId ? { ...l, done: !l.done } : l
    );
    const doneCount = updatedLessons.filter((l) => l.done).length;
    const progress = Math.round((doneCount / updatedLessons.length) * 100);
    const isDone = progress === 100;

    let foundNow = false;
    const finalLessons = updatedLessons.map((l) => {
      if (!l.done && !foundNow) {
        foundNow = true;
        return { ...l, now: true };
      }
      return { ...l, now: false };
    });

    const status = isDone ? "done" : progress > 0 ? "active" : "new";
    const nextText = isDone
      ? "همه درس‌ها تکمیل شد؛ گواهی صادر شد"
      : `جلسه بعدی: درس ${doneCount + 1} (${
          finalLessons.find((l) => l.now)?.title || "ادامه"
        })`;

    return {
      ...c,
      lessons: finalLessons,
      progress,
      status,
      next: nextText,
    };
  });

  const finishedCourse = updatedCourses.find(
    (c) => c.id === courseId && c.progress === 100
  );
  let updatedCerts = [...state.certificates];

  if (finishedCourse) {
    const hasCert = updatedCerts.some(
      (cert) =>
        cert.title.includes(finishedCourse.title) ||
        cert.courseSlug === finishedCourse.slug
    );
    if (!hasCert) {
      generatedCert = {
        id: Date.now(),
        title: finishedCourse.title,
        courseSlug: finishedCourse.slug,
        date: "شهریور ۱۴۰۴",
        hours: finishedCourse.sessions.split("·")[1]?.trim() || "۲۴ ساعت",
        grade: "۲۰",
        serial: "RK-" + Math.floor(1000 + Math.random() * 9000) + "-CERT",
        instructor: finishedCourse.teacher,
        desc: `تکمیل موفقیت‌آمیز تمامی جلسات دوره و کسب نمره عالی.`,
      };
      updatedCerts = [generatedCert, ...updatedCerts];
    }
  }

  const totalCompletedLessons = updatedCourses.reduce(
    (acc, c) => acc + c.lessons.filter((l) => l.done).length,
    0
  );
  const newPoints = 2000 + totalCompletedLessons * 50;

  const updatedState = {
    ...state,
    myCourses: updatedCourses,
    certificates: updatedCerts,
    user: {
      ...state.user,
      level: {
        ...state.user.level,
        points: newPoints,
        pct: Math.min(100, Math.floor((newPoints % 1000) / 10)),
      },
      stats: state.user.stats.map((s, idx) =>
        idx === 1
          ? { ...s, num: String(updatedCerts.length) }
          : idx === 2
          ? { ...s, num: newPoints.toLocaleString("fa-IR") }
          : s
      ),
    },
  };

  savePanelStore(updatedState);
  return { updatedCourses, generatedCert };
}

/** ثبت مطالعه امروز (افزایش استریک) */
export function recordDailyStreak() {
  const state = getPanelStore();
  if (state.streak.todayRecorded) return state.streak;

  const newDays = state.streak.days + 1;
  const updatedWeek = state.streak.week.map((w, idx) =>
    idx === 5 ? { ...w, on: true } : w
  );
  const newStreak = {
    ...state.streak,
    days: newDays,
    todayRecorded: true,
    hint: "عالیه! مطالعهٔ امروزت ثبت شد. استریکت یک روز بیشتر شد.",
    week: updatedWeek,
  };

  const updatedState = {
    ...state,
    streak: newStreak,
    user: {
      ...state.user,
      level: {
        ...state.user.level,
        points: state.user.level.points + 100,
      },
    },
  };
  savePanelStore(updatedState);
  return newStreak;
}
