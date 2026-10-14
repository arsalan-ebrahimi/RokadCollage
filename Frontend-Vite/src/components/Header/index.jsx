import { useState, useEffect, useRef, useMemo } from "react";
import Logo from "../Logo.jsx";
import { getPanelStore } from "../../data/panelStore.js";
import { getUnreadNotificationsCount, getUserProfile } from "../../data/selectors.js";
import { searchableData, matchItem } from "./searchData.jsx";
import SearchOverlay from "./components/SearchOverlay.jsx";
import MobileDrawer from "./components/MobileDrawer.jsx";
import HeaderAuthButtons from "./components/HeaderAuthButtons.jsx";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [store, setStore] = useState(getPanelStore);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

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
      const h = window.location.hash || "";
      setActive(
        h.startsWith("#courses-index") || h.startsWith("#dept/") || h.startsWith("#course/") ? 1
          : h.startsWith("#blog-index") || h.startsWith("#article/") ? 2
          : 0
      );

    };
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("hashchange", apply);
    apply();
    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("hashchange", apply);
    };
  }, []);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return searchableData.filter((item) => matchItem(item, debouncedQuery));
  }, [debouncedQuery]);

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
    if (link.startsWith("#")) {
      window.location.hash = link.slice(1);
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
    { t: "صفحهٔ اصلی", href: "#top" },
    { t: "دوره‌ها", href: "#courses-index" },
    { t: "مجله", href: "#blog-index" },
  ];


  return (
    <>
      <header className={"site-header" + (scrolled ? " scrolled" : "")} id="top">
        <div className="v1-header">
          <div className="pill">
            <Logo />
            <nav className="nav-links">
              {links.map((l, i) => (
                <a
                  key={i}
                  href={l.href}
                  className={"nav-link" + (active === i ? " active" : "")}
                  onClick={() => setActive(i)}
                >
                  {l.t}
                </a>
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

              <HeaderAuthButtons user={user} store={store} unreadCount={unreadCount} />

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
      />

      <MobileDrawer
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        links={links}
        setActive={setActive}
        store={store}
        user={user}
      />
    </>
  );
}