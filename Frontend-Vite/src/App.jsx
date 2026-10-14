import { useEffect, useState } from "react";
import Header from "./components/Header/index.jsx";
import Hero from "./pages/Home/sections/Hero/index.jsx";
import PromoBenefits from "./pages/Home/sections/PromoBenefits/index.jsx";
import Departments from "./pages/Home/sections/Departments/index.jsx";
import About from "./pages/Home/sections/About/index.jsx";
import StatsTicker from "./pages/Home/sections/StatsTicker/index.jsx";
import Courses from "./pages/Home/sections/Courses/index.jsx";
import CourseCta from "./pages/Home/sections/CourseCta/index.jsx";
import Faq from "./pages/Home/sections/Faq/index.jsx";
import Comments from "./pages/Home/sections/Comments/index.jsx";
import Blogs from "./pages/Home/sections/Blogs/index.jsx";
import Footer from "./components/Footer/index.jsx";
import BlogArticle from "./pages/BlogArticle/index.jsx";
import BlogIndex from "./pages/BlogIndex/index.jsx";
import CoursesPage from "./pages/CoursesPage/index.jsx";
import DepartmentPage from "./pages/DepartmentPage/index.jsx";
import CourseSingle from "./pages/CourseSingle/index.jsx";
import Auth from "./pages/Auth/index.jsx";
import Dashboard from "./pages/Panel/Dashboard.jsx";
import Profile from "./pages/Panel/Profile.jsx";
import Assignments from "./pages/Panel/Assignments.jsx";
import PanelCourses from "./pages/Panel/Courses.jsx";
import Certificates from "./pages/Panel/Certificates.jsx";
import Mentor from "./pages/Panel/Mentor.jsx";
import StudyGroup from "./pages/Panel/StudyGroup.jsx";
import Events from "./pages/Panel/Events.jsx";
import Support from "./pages/Panel/Support.jsx";
import ConsultationModal from "./components/ConsultationModal/index.jsx";
import AuthPromptToast from "./components/AuthPromptToast/index.jsx";
import PaymentCallback from "./pages/PaymentCallback/index.jsx";

import { isUserLoggedIn } from "./data/panelStore.js";

/* صفحات پنل: key = صفحه، value = کامپوننت */
const PANEL_PAGES = {
  dashboard: Dashboard,
  profile: Profile,
  assignments: Assignments,
  courses: PanelCourses,
  certs: Certificates,
  mentor: Mentor,
  group: StudyGroup,
  events: Events,
  support: Support,
};
const PANEL_HASH = { dashboard: "panel", profile: "panel/profile", assignments: "panel/assignments", courses: "panel/courses", certs: "panel/certs", mentor: "panel/mentor", group: "panel/group", events: "panel/events", support: "panel/support" };

export default function App() {
  /* روت‌گذاری ساده با هش:
     #panel/<page> → پنل هنرجو
     #article/<slug> → تک‌صفحهٔ بلاگ
     #blog-index / #courses-index → صفحات مستقل
     بقیهٔ هش‌ها (مثل #courses / #blog) → صفحهٔ اصلی + اسکرول به سکشن */
  const [hash, setHash] = useState(() => window.location.hash || "");
  const [authStatus, setAuthStatus] = useState(() => isUserLoggedIn());

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "");
    const onStoreChange = () => setAuthStatus(isUserLoggedIn());

    window.addEventListener("hashchange", onHash);
    window.addEventListener("rokad_panel_store_changed", onStoreChange);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("rokad_panel_store_changed", onStoreChange);
    };
  }, []);

  /* پنل هنرجو: حفاظت از روت پنل در برابر دسترسی بدون لاگین */
  let panelPage = null;
  const isPanelHash = hash === "#panel" || hash.startsWith("#panel/");
  const authenticated = authStatus;

  if (isPanelHash) {
    if (!authenticated) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("rokad_auth_redirect", hash.replace(/^#/, ""));
        window.location.hash = "auth";
      }
    } else {
      const sub = hash.replace(/^#panel\/?/, "");
      panelPage = PANEL_PAGES[sub] ? sub : "dashboard";
    }
  }

  const PanelComp = panelPage ? PANEL_PAGES[panelPage] : null;

  const m = panelPage ? null : hash.match(/^#article\/(.+)$/);
  const articleSlug = m ? decodeURIComponent(m[1]) : null;
  const mc = panelPage ? null : hash.match(/^#(?:course|bootcamp)\/(.+)$/);
  const courseSlug = mc ? decodeURIComponent(mc[1]) : null;
  const paymentCallbackPage = !panelPage && hash.startsWith("#payment-callback");
  const authPage = !panelPage && !articleSlug && !courseSlug && !paymentCallbackPage && (hash === "#auth" || hash === "#auth/register");
  const blogIndex = !panelPage && !articleSlug && !courseSlug && !authPage && !paymentCallbackPage && hash === "#blog-index";
  /* #dept/<id> → صفحهٔ تک‌صفحه‌ای دپارتمان */
  const mDept = !panelPage && !articleSlug && !courseSlug && !authPage && !blogIndex && !paymentCallbackPage ? hash.match(/^#dept(?:\/([a-zA-Z0-9_-]+))?\/?$/) : null;
  const deptPage = mDept ? (mDept[1] ? mDept[1].toLowerCase() : "languages") : null;
  /* #courses-index یا #courses-index/<dept> → صفحهٔ دوره‌ها (با فیلتر دپارتمان) */
  const mcp = !panelPage && !articleSlug && !courseSlug && !authPage && !blogIndex && !deptPage && !paymentCallbackPage ? hash.match(/^#courses-index(?:\/(.+))?$/) : null;
  const coursesDept = mcp && mcp[1] ? decodeURIComponent(mcp[1]) : null;
  const coursesPage = !!mcp;
  const anchor = !panelPage && !articleSlug && !courseSlug && !authPage && !blogIndex && !coursesPage && !paymentCallbackPage && hash.startsWith("#") ? decodeURIComponent(hash.slice(1)) : null;

  /* ورود به مقاله / تک‌دوره / auth / صفحهٔ بلاگ / دوره‌ها / پنل / کال‌بک پرداخت → شروع از بالا */
  const pageMode = blogIndex || coursesPage || !!articleSlug || !!courseSlug || !!panelPage || authPage || !!deptPage || paymentCallbackPage;
  useEffect(() => {
    if (pageMode) window.scrollTo({ top: 0, behavior: "auto" });
  }, [pageMode, articleSlug, courseSlug, panelPage, coursesDept, deptPage, paymentCallbackPage]);

  /* بازگشت به صفحهٔ اصلی با anchor → بعد از mount شدن سکشن‌ها اسکرول کن */
  useEffect(() => {
    if (anchor) {
      const t = setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 140);
      return () => clearTimeout(t);
    }
  }, [anchor, articleSlug]);

  /* ناوبری داخل پنل */
  const goPanel = (p) => {
    window.location.hash = PANEL_HASH[p] || "panel";
  };

  const consultOpen = hash === "#consult";
  const closeConsult = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = "";
    }
  };

  return (
    <>
      <ConsultationModal isOpen={consultOpen} onClose={closeConsult} />
      <AuthPromptToast />
      {panelPage ? (
        <PanelComp key={panelPage} onNavigate={goPanel} />
      ) : authPage ? (
        <Auth />
      ) : (
        <>
          <Header />
          <main>
            {paymentCallbackPage ? (
              <PaymentCallback />
            ) : coursesPage ? (
              <CoursesPage key={coursesDept || "all"} initialDept={coursesDept} />
            ) : deptPage ? (
              <DepartmentPage key={deptPage} deptId={deptPage} />
            ) : blogIndex ? (
              <BlogIndex />
            ) : articleSlug ? (
              <BlogArticle key={articleSlug} slug={articleSlug} />
            ) : courseSlug ? (
              <CourseSingle key={courseSlug} slug={courseSlug} />
            ) : (
              <>
                <Hero />
                <PromoBenefits />
                <Departments layout="row3" />
                <StatsTicker />
                <About />
                <Courses />
                <CourseCta />
                <Faq />
                <Comments />
                <Blogs />
              </>
            )}
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
