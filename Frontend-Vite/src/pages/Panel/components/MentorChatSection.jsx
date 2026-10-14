import React from "react";
import { Send } from "lucide-react";

export default function MentorChatSection({
  mentorChats,
  activeId,
  setActiveId,
  active,
  currentMessages,
  inputVal,
  setInputVal,
  handleSend,
}) {
  return (
    <div className="pnl-mentor-grid">
      {/* لیست منتورها */}
      <div className="pnl-panel">
        <h4>
          منتورهای من
          <span className="pnl-pill">{mentorChats.length} منتور</span>
        </h4>
        <div className="pnl-mentor-list">
          {mentorChats.map((m) => (
            <button
              key={m.id}
              className={`pnl-mentor${m.id === activeId ? " on" : ""}`}
              onClick={() => setActiveId(m.id)}
            >
              <span className="ava">
                {m.initial}
                {m.online && <i className="online" aria-label="آنلاین" />}
              </span>
              <span className="info">
                <b>{m.name}</b>
                <span className="last">{m.last}</span>
              </span>
              <span className="meta">
                <small>{m.time}</small>
                {m.unread > 0 && <i className="unread">{m.unread}</i>}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* چت */}
      <div className="pnl-panel pnl-chat-panel">
        <h4>
          {active.name}
          <span className="pnl-pill">{active.role}</span>
        </h4>

        <div className="pnl-chat">
          {currentMessages.map((msg, i) => (
            <div key={i} className={`pnl-msg ${msg.from}`}>
              <span className="ava">
                {msg.from === "me" ? "پ" : active.initial}
              </span>
              <span className="bubble">{msg.text}</span>
            </div>
          ))}
        </div>

        <form className="pnl-chat-input" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="پیامت رو بنویس…"
            dir="rtl"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button type="submit" className="pnl-cbtn send" aria-label="ارسال">
            <Send size={16} strokeWidth={2.4} />
            ارسال
          </button>
        </form>
      </div>
    </div>
  );
}
