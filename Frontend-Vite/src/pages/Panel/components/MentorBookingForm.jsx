import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function MentorBookingForm({
  mentorChats,
  selectedMentorId,
  setSelectedMentorId,
  availableSlots,
  selectedSlot,
  setSelectedSlot,
  bookingTopic,
  setBookingTopic,
  bookingSuccessToast,
  handleBookingSubmit,
}) {
  return (
    <div className="pnl-panel" style={{ padding: 24 }}>
      <h3
        style={{
          margin: "0 0 16px",
          fontSize: "17.5px",
          fontWeight: 950,
          color: "var(--navy)",
        }}
      >
        رزرو نوبت جلسه ۱ به ۱
      </h3>

      {bookingSuccessToast && (
        <div
          style={{
            background: "var(--teal-light)",
            border: "1.5px solid var(--ink)",
            padding: "10px 14px",
            borderRadius: "8px 0 8px 0",
            fontSize: "13px",
            fontWeight: 800,
            color: "var(--teal-dark)",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <CheckCircle2 size={16} />
          <span>
            نوبت جلسه با موفقیت رزرو شد و به تقویم رویدادهای شما افزوده گردید.
          </span>
        </div>
      )}

      <form
        onSubmit={handleBookingSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: "12.5px",
              fontWeight: 800,
              color: "var(--navy)",
              marginBottom: 6,
            }}
          >
            انتخاب منتور:
          </label>
          <select
            value={selectedMentorId}
            onChange={(e) => setSelectedMentorId(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "2px solid var(--ink)",
              borderRadius: "8px 0 8px 0",
              fontFamily: "inherit",
              fontSize: "13.5px",
              background: "#fff",
            }}
          >
            {mentorChats.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.role})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontSize: "12.5px",
              fontWeight: 800,
              color: "var(--navy)",
              marginBottom: 6,
            }}
          >
            انتخاب زمان آزاد منتور:
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            {availableSlots.map((s) => (
              <button
                type="button"
                key={s.id}
                onClick={() => setSelectedSlot(s)}
                style={{
                  padding: "8px 10px",
                  border: "2px solid var(--ink)",
                  borderRadius: "6px 0 6px 0",
                  background:
                    selectedSlot.id === s.id ? "var(--college)" : "#fff",
                  fontWeight: selectedSlot.id === s.id ? 900 : 700,
                  fontSize: "12.5px",
                  cursor: "pointer",
                  textAlign: "center",
                  boxShadow:
                    selectedSlot.id === s.id ? "2px 2px 0 var(--ink)" : "none",
                }}
              >
                {s.day} · {s.time}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontSize: "12.5px",
              fontWeight: 800,
              color: "var(--navy)",
              marginBottom: 6,
            }}
          >
            موضوع و موارد مورد بحث در جلسه:
          </label>
          <textarea
            rows={3}
            placeholder="مثلاً: بررسی معماری کدهای پروژه پایانی، رفع اشکال الگوریتم‌ها یا مشاوره برای مصاحبه شغلی…"
            value={bookingTopic}
            onChange={(e) => setBookingTopic(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "2px solid var(--ink)",
              borderRadius: "8px 0 8px 0",
              fontFamily: "inherit",
              fontSize: "13px",
            }}
          />
        </div>

        <button
          type="submit"
          className="pnl-cbtn"
          style={{ padding: "11px", marginTop: 6 }}
        >
          تأیید و رزرو قطعی جلسه
        </button>
      </form>
    </div>
  );
}
