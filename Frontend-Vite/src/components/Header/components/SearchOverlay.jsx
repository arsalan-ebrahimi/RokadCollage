import React from "react";
import { sectionBadge, searchableData } from "../searchData.jsx";
import SearchHitCard from "./SearchHitCard.jsx";

export default function SearchOverlay({
  searchOpen,
  setSearchOpen,
  query,
  setQuery,
  results,
  grouped,
  searchRef,
  searchInputRef,
  handleResultClick,
  store,
}) {
  return (
    <>
      <div
        className={`search-backdrop${searchOpen ? " search-backdrop--open" : ""}`}
        onClick={() => {
          setSearchOpen(false);
          setQuery("");
        }}
      />

      <div
        className={`search-panel${searchOpen ? " search-panel--open" : ""}`}
        ref={searchRef}
      >
        <div className="search-panel-inner">
          <div className="search-panel-field">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="دوره، مقاله، سوال، نظر... تایپ کنید"
              className="search-panel-input"
              value={query}
              dir="rtl"
              autoFocus
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results.length > 0)
                  handleResultClick(results[0].link);
              }}
            />
          </div>
          <button
            className="search-panel-close"
            onClick={() => {
              setSearchOpen(false);
              setQuery("");
            }}
            aria-label="بستن"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {query.trim() && (
          <div className="search-panel-results">
            {results.length === 0 && (
              <div className="search-panel-empty">
                <p>چیزی پیدا نشد؛ کلمه دیگری را امتحان کنید</p>
                <div className="search-panel-tags">
                  {["وردپرس", "فرانت‌اند", "سئو", "گرافیک", "زبان"].map((tag) => (
                    <button
                      key={tag}
                      className="search-panel-tag"
                      onClick={() => setQuery(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {Object.keys(grouped).map((section) => {
              const items = grouped[section];
              const sc = sectionBadge[section] || {
                bg: "var(--bg-neutral)",
                fg: "var(--ink)",
              };
              return (
                <div key={section} className="search-group">
                  <div
                    className="search-group-title"
                    style={{ background: sc.bg, color: sc.fg }}
                  >
                    {section}
                    <span className="search-group-cnt">{items.length}</span>
                  </div>
                  {items.map((item) => (
                    <SearchHitCard
                      key={item.title}
                      item={item}
                      store={store}
                      onClick={() => handleResultClick(item.link)}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {!query.trim() && searchOpen && (
          <div className="search-panel-results">
            <div className="search-panel-empty">
              <p>دوره‌ها، مقالات، سوالات، نظرات...</p>
              <div className="search-panel-tags">
                {["وردپرس", "فرانت‌اند", "سئو", "گرافیک", "زبان", "MBA"].map((tag) => (
                  <button
                    key={tag}
                    className="search-panel-tag"
                    onClick={() => setQuery(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="search-group">
              <div
                className="search-group-title"
                style={{
                  background: "var(--college-light)",
                  color: "var(--college-darker)",
                }}
              >
                پیشنهادهای برتر کالج رکاد
              </div>
              {searchableData.slice(0, 4).map((item) => (
                <SearchHitCard
                  key={item.title}
                  item={item}
                  store={store}
                  onClick={() => handleResultClick(item.link)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
