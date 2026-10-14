import React, { useState } from "react";
import { articles } from "@/data/blogArticles";
import BlogHero from "./components/BlogHero.jsx";
import BlogFeatured from "./components/BlogFeatured.jsx";
import BlogCategories from "./components/BlogCategories.jsx";
import BlogGrid from "./components/BlogGrid.jsx";
import BlogTrending from "./components/BlogTrending.jsx";
import BlogAuthors from "./components/BlogAuthors.jsx";

export default function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const featured = articles[0];

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
      <BlogAuthors />
    </>
  );
}