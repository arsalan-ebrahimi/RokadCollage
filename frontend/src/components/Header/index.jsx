import { useState, useEffect, useRef, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../Logo.jsx";
import { getPanelStore } from "../../data/panelStore.js";
import { getUnreadNotificationsCount, getUserProfile } from "../../data/selectors.js";
import { matchItem } from "./searchData.jsx";
import SearchOverlay from "./components/SearchOverlay.jsx";
import MobileDrawer from "./components/MobileDrawer.jsx";
import HeaderAuthButtons from "./components/HeaderAuthButtons.jsx";
import LogoutConfirmModal from "./components/LogoutConfirmModal.jsx";
import { getAllCourses } from "@/services/courseService.js";
import { getBlogs } from "@/services/blogService.js";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [store, setStore] = useState(getPanelStore);
  const [liveItems, setLiveItems] = useState([]);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    async function fetchSearchItems() {
      try {
        const [courses, blogs] = await Promise.all([
          getAllCourses().catch(() => []),
          getBlogs().catch(() => []),
        ]);
        const courseHits = (Array.isArray(courses) ? courses : []).map((c) => ({
          section: "دوره‌ها",
          title: c.title,
          text: c.description || c.category || "دوره تخصصی کالج رکاد",
          link: `/courses/${c.slug || c._id || c.id}`,
          slug: c.slug || c._id || c.id,
          tags: `${c.title} ${c.category || ""} ${(c.tags || []).join(" ")}`,
          image: c.img || "/assets/StatCard/blue.png",
        }));
        const blogHits = (Array.isArray(blogs) ? blogs : []).map((b) => ({
          section: "وبلاگ",
          title: b.title,
          text: b.description || "مقاله آموزشی کالج رکاد",
          link: `/blog/${b.slug || b._id || b.id}`,
          slug: b.slug || b._id || b.id,
          tags: `${b.title} ${b.category || ""}`,
          image: b.img || "/assets/StatCard/green.png",
        }));
        const depts = [
          { section: "دپارتمان‌ها", title: "دپارتمان فناوری اطلاعات (IT)", text: "مسیرهای تخصصی وب، برنامه‌نویسی و سئو", link: "/dept/it", tags: "دپارتمان it وب برنامه‌نویسی", image: "/assets/StatCard/blue.png" },
          { section: "دپارتمان‌ها", title: "دپارتمان کسب و کار", text: "مهارت‌های نوین کسب‌وکار و مدیریت", link: "/dept/business", tags: "دپارتمان کسب و کار مارکتینگ مدیریت", image: "/assets/StatCard/yellow.png" },
          { section: "دپارتمان‌ها", title: "دپارتمان زبان‌های خارجی", text: "انگلیسی، آیلتس و مکالمه", link: "/dept/languages", tags: "دپارتمان زبان خارجی آیلتس انگلیسی", image: "/assets/StatCard/green.png" },
          { section: "دپارتمان‌ها", title: "دپارتمان مشاوره", text: "هدایت تحصیلی، شغلی و توسعه فردی", link: "/dept/counseling", tags: "دپارتمان مشاوره هدایت شغلی تحصیلی استعدادیابی", image: "/assets/StatCard/pink.png" },
        ];
        setLiveItems([...courseHits, ...blogHits, ...depts]);
      } catch (err) {
        console.error("Failed to load search data:", err);
      }
    }
    fetchSearchItems();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 160);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const onStoreChange = (e) => setStore(e.detail || getPanelStore());
    window.addEventListener("rokad_panel_store_changed", onStoreChange);
    return () => window.removeEventListener("rokad_panel_store_changed", onStoreChange);
  }, []);

  const user = getUserProfile(store);
  const unreadCount = getUnreadNotificationsCount(store);

  useEffect(() => {
    const apply = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", apply, { passive: true });
    apply();
    return () => window.removeEventListener("scroll", apply);
  }, []);

  const activeIndex = useMemo(() => {
    if (!pathname) return 0;
    if (pathname.startsWith("/courses") || pathname.startsWith("/dept")) return 1;
    if (pathname.startsWith("/blog")) return 2;
    return 0;
  }, [pathname]);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return liveItems.filter((item) => matchItem(item, debouncedQuery));
  }, [debouncedQuery, liveItems]);

  const grouped = useMemo(() => {
    const map = {};
    results.forEach((item) => {
      if (!map[item.section]) map[item.section] = [];
      map[item.section].push(item);
    });
    return map;
  }, [results]);

  const handleResultClick = (link) => {
    setSearchOpen(false);
    setQuery("");
    if (link) {
      if (link.startsWith("/")) {
        router.push(link);
      } else if (link.startsWith("#")) {
        window.location.hash = link.slice(1);
      } else {
        router.push(link);
      }
    }
  };

  useEffect(() => {
    const onGlobal = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onGlobal);
    return () => document.removeEventListener("keydown", onGlobal);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setSearchOpen(false); };
    const onClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    document.body.style.overflow = "hidden";
    if (searchInputRef.current) searchInputRef.current.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const links = [
    { t: "صفحهٔ اصلی", href: "/" },
    { t: "دوره‌ها", href: "/courses" },
    { t: "مجله", href: "/blog" },
  ];


  return (
    <>
      <header className={"site-header" + (scrolled ? " scrolled" : "")} id="top">
        <div className="v1-header">
          <div className="pill">
            <Logo />
            <nav className="nav-links">
              {links.map((l, i) => (
                <Link
                  key={i}
                  href={l.href}
                  className={"nav-link" + (activeIndex === i ? " active" : "")}
                >
                  {l.t}
                </Link>
              ))}
            </nav>

            <div className="actions">
              <button
                className="ibtn"
                aria-label="جستجو"
                onClick={() => setSearchOpen(true)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>

              <HeaderAuthButtons
                user={user}
                store={store}
                unreadCount={unreadCount}
                onRequestLogout={() => setLogoutModalOpen(true)}
              />

              <button
                className="mobile-menu-btn"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="منو"
                aria-expanded={mobileOpen}
              >
                <span className={`hb1-bars ${mobileOpen ? "hb1-bars--open" : ""}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <SearchOverlay
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        query={query}
        setQuery={setQuery}
        results={results}
        grouped={grouped}
        searchRef={searchRef}
        searchInputRef={searchInputRef}
        handleResultClick={handleResultClick}
        store={store}
        liveItems={liveItems}
      />

      <MobileDrawer
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        links={links}
        setActive={setActive}
        store={store}
        user={user}
        onRequestLogout={() => setLogoutModalOpen(true)}
      />

      <LogoutConfirmModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
      />
    </>
  );
}