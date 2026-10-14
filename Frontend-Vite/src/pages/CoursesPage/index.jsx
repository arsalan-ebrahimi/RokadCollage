import React, { useState, useEffect } from "react";
import "./courses-hub.css";
import { getPanelStore } from "@/data/panelStore.js";
import { SUGGESTED_BY_DEPT, FLAGSHIP_COURSES, TOP_INSTRUCTORS } from "./data/coursesHubData.js";
import { useHorizontalDragScroll } from "./hooks/useHorizontalDragScroll.js";
import CoursesHubHero from "./components/CoursesHubHero.jsx";
import FlagshipSection from "./components/FlagshipSection.jsx";
import SuggestedGroupSection from "./components/SuggestedGroupSection.jsx";
import InstructorsSection from "./components/InstructorsSection.jsx";

export default function CoursesPage() {
  const [store, setStore] = useState(getPanelStore);
  const instScroll = useHorizontalDragScroll();

  useEffect(() => {
    const handleStoreChange = (e) => {
      setStore(e.detail || getPanelStore());
    };
    window.addEventListener("rokad_panel_store_changed", handleStoreChange);
    return () => window.removeEventListener("rokad_panel_store_changed", handleStoreChange);
  }, []);

  const displayedSuggestedGroups = Object.values(SUGGESTED_BY_DEPT);

  return (
    <div className="ch-page">
      <CoursesHubHero />

      <div className="ch-container">
        <FlagshipSection flagshipCourses={FLAGSHIP_COURSES} store={store} />
        <SuggestedGroupSection suggestedGroups={displayedSuggestedGroups} store={store} />
        <InstructorsSection topInstructors={TOP_INSTRUCTORS} instScroll={instScroll} />
      </div>
    </div>
  );
}