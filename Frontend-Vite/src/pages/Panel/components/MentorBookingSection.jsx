import React from "react";
import MentorBookingForm from "./MentorBookingForm.jsx";
import MentorBookedList from "./MentorBookedList.jsx";

export const AVAILABLE_SLOTS = [
  { day: "دوشنبه ۱۸ شهریور", time: "۱۶:۳۰", id: "s1" },
  { day: "چهارشنبه ۲۰ شهریور", time: "۱۱:۰۰", id: "s2" },
  { day: "پنج‌شنبه ۲۱ شهریور", time: "۱۸:۰۰", id: "s3" },
  { day: "شنبه ۲۳ شهریور", time: "۱۴:۰۰", id: "s4" },
];

export default function MentorBookingSection({
  mentorChats,
  selectedMentorId,
  setSelectedMentorId,
  selectedSlot,
  setSelectedSlot,
  bookingTopic,
  setBookingTopic,
  bookingSuccessToast,
  handleBookingSubmit,
  bookings,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 24,
        marginTop: 12,
      }}
    >
      <MentorBookingForm
        mentorChats={mentorChats}
        selectedMentorId={selectedMentorId}
        setSelectedMentorId={setSelectedMentorId}
        availableSlots={AVAILABLE_SLOTS}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
        bookingTopic={bookingTopic}
        setBookingTopic={setBookingTopic}
        bookingSuccessToast={bookingSuccessToast}
        handleBookingSubmit={handleBookingSubmit}
      />
      <MentorBookedList bookings={bookings} />
    </div>
  );
}
