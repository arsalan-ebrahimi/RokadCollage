import React, { useState, useEffect } from "react";
import { getBlogs } from "@/services/blogService.js";
import BlogHero from "./components/BlogHero.jsx";
import BlogFeatured from "./components/BlogFeatured.jsx";
import BlogCategories from "./components/BlogCategories.jsx";
import BlogGrid from "./components/BlogGrid.jsx";
import BlogTrending from "./components/BlogTrending.jsx";

export default function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    getBlogs({ limit: 1 })
      .then((res) => {
        const list = Array.isArray(res) ? res : res?.data || [];
        if (list.length > 0) {
          const item = list[0];
          setFeatured({
            title: item.title,
            slug: item.slug || item._id,
            excerpt: item.description,
            cat: item.category,
            date: "به‌تازگی",
            readTime: item.readTime || "۵ دقیقه",
            author: "تحریریه کالج رکاد",
          });
        }
      })
      .catch((err) => console.error("Failed to load featured blog:", err));
  }, []);

  const goResults = () => {
    document.getElementById("bi-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <BlogHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setActiveCategory={setActiveCategory}
        onGoResults={goResults}
      />
      <BlogFeatured featured={featured} />
      <BlogCategories active={activeCategory} setActive={setActiveCategory} />
      <BlogGrid activeCategory={activeCategory} searchQuery={searchQuery} />
      <BlogTrending />
    </>
  );
}