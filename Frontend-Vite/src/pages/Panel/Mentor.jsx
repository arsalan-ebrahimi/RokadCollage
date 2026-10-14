import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import PanelLayout from "./PanelLayout.jsx";
import { mentorChats } from "./panelData.js";
import { getPanelStore, sendMentorMessage, addMentorBooking } from "../../data/panelStore.js";
import MentorChatSection from "./components/MentorChatSection.jsx";
import MentorBookingSection, { AVAILABLE_SLOTS } from "./components/MentorBookingSection.jsx";

export default function Mentor({ onNavigate }) {
  const [store, setStore] = useState(getPanelStore);
  const [activeTab, setActiveTab] = useState("chat");
  const [activeId, setActiveId] = useState(mentorChats[0].id);
  const [inputVal, setInputVal] = useState("");

  const [selectedMentorId, setSelectedMentorId] = useState(mentorChats[0].id);
  const [selectedSlot, setSelectedSlot] = useState(AVAILABLE_SLOTS[0]);
  const [bookingTopic, setBookingTopic] = useState("");
  const [bookingSuccessToast, setBookingSuccessToast] = useState(false);

  useEffect(() => {
    const handleStoreChange = (e) => {
      setStore(e.detail || getPanelStore());
    };
    window.addEventListener("rokad_panel_store_changed", handleStoreChange);
    return () => window.removeEventListener("rokad_panel_store_changed", handleStoreChange);
  }, []);

  const active = mentorChats.find((m) => m.id === activeId) || mentorChats[0];
  const allChats = store.mentorChats || {};
  const currentMessages = allChats[activeId] || [
    { from: "them", text: `سلام پارسا جان! من ${active.name} هستم. چطور می‌تونم در این دوره کمکت کنم؟` }
  ];

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputVal.trim()) return;
    const text = inputVal.trim();
    setInputVal("");

    sendMentorMessage(activeId, { from: "me", text });

    setTimeout(() => {
      sendMentorMessage(activeId, {
        from: "them",
        text: "پیامت رو بررسی کردم! کدها و نکات لازم رو برات ارسال می‌کنم.",
      });
    }, 1200);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const mentorObj = mentorChats.find((m) => m.id === Number(selectedMentorId)) || mentorChats[0];
    addMentorBooking({
      mentorId: mentorObj.id,
      mentorName: mentorObj.name,
      mentorRole: mentorObj.role,
      date: selectedSlot.day,
      time: selectedSlot.time,
      topic: bookingTopic.trim() || "بررسی تمرین‌ها و مسیر پیشرفت شغلی",
    });

    setBookingSuccessToast(true);
    setBookingTopic("");
    setTimeout(() => setBookingSuccessToast(false), 4000);
  };

  const bookings = store.mentorBookings || [];

  return (
    <section id="panel">
      <PanelLayout page="mentor" onNavigate={onNavigate}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 className="pnl-h1">
              <span className="w" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>منتورینگ و</span>{" "}
              <span className="w accent" style={{ transform: "rotate(1.5deg)", display: "inline-block" }}>پشتیبانی</span>
            </h1>
            <p className="pnl-sub">پاسخگویی آنلاین متنی و جلسات خصوصی ۱ به ۱ با منتورهای متخصص رکاد.</p>
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <button
              type="button"
              className={`pnl-cbtn ${activeTab === "chat" ? "" : "ghost"}`}
              onClick={() => setActiveTab("chat")}
            >
              گفتگوی متنی
            </button>
            <button
              type="button"
              className={`pnl-cbtn ${activeTab === "booking" ? "" : "ghost"}`}
              onClick={() => setActiveTab("booking")}
            >
              <Calendar size={16} strokeWidth={2.2} />
              رزرو جلسه ۱ به ۱
            </button>
          </div>
        </div>

        {activeTab === "chat" ? (
          <MentorChatSection
            mentorChats={mentorChats}
            activeId={activeId}
            setActiveId={setActiveId}
            active={active}
            currentMessages={currentMessages}
            inputVal={inputVal}
            setInputVal={setInputVal}
            handleSend={handleSend}
          />
        ) : (
          <MentorBookingSection
            mentorChats={mentorChats}
            selectedMentorId={selectedMentorId}
            setSelectedMentorId={setSelectedMentorId}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            bookingTopic={bookingTopic}
            setBookingTopic={setBookingTopic}
            bookingSuccessToast={bookingSuccessToast}
            handleBookingSubmit={handleBookingSubmit}
            bookings={bookings}
          />
        )}
      </PanelLayout>
    </section>
  );
}
