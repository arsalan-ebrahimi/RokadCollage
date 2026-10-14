import { getPanelStore, savePanelStore } from "./storeCore.js";

export function toggleStudyGroup(groupId) {
  const state = getPanelStore();
  const updatedGroups = state.studyGroups.map((g) => {
    if (g.id !== groupId) return g;
    const newJoined = !g.joined;
    const newMembers = newJoined ? g.members + 1 : Math.max(1, g.members - 1);
    const myParticipant = {
      name: "پارسا محمدی (شما)",
      role: "عضو فعال",
      online: true,
      isMe: true,
    };
    const participants = newJoined
      ? [myParticipant, ...g.participants.filter((p) => !p.isMe)]
      : g.participants.filter((p) => !p.isMe);

    return {
      ...g,
      joined: newJoined,
      members: newMembers,
      participants,
    };
  });

  const updatedState = { ...state, studyGroups: updatedGroups };
  savePanelStore(updatedState);
  return updatedGroups;
}

export function sendGroupMessage(groupId, text) {
  const state = getPanelStore();
  const updatedGroups = state.studyGroups.map((g) => {
    if (g.id !== groupId) return g;
    const newMsg = {
      sender: "پارسا محمدی",
      text,
      time: "همین حالا",
    };
    return {
      ...g,
      chatLogs: [...g.chatLogs, newMsg],
    };
  });

  const updatedState = { ...state, studyGroups: updatedGroups };
  savePanelStore(updatedState);
  return updatedGroups;
}

export function toggleEventRegistration(eventId) {
  const state = getPanelStore();
  const updatedEvents = state.events.map((e) => {
    if (e.id !== eventId) return e;
    return {
      ...e,
      registered: !e.registered,
      reminderSet: !e.registered,
    };
  });

  const updatedState = { ...state, events: updatedEvents };
  savePanelStore(updatedState);
  return updatedEvents;
}

export function createSupportTicket(subject, dept, message) {
  const state = getPanelStore();
  const newTicket = {
    id: Date.now(),
    subject,
    dept: dept || "پشتیبانی عمومی",
    status: "open",
    updated: "لحظاتی پیش",
    messages: [{ sender: "user", text: message, date: "امروز - همین حالا" }],
  };

  const updatedTickets = [newTicket, ...state.supportTickets];
  const updatedState = { ...state, supportTickets: updatedTickets };
  savePanelStore(updatedState);
  return updatedTickets;
}

export function replySupportTicket(ticketId, message) {
  const state = getPanelStore();
  const updatedTickets = state.supportTickets.map((t) => {
    if (t.id !== ticketId) return t;
    return {
      ...t,
      updated: "لحظاتی پیش",
      messages: [
        ...t.messages,
        { sender: "user", text: message, date: "همین حالا" },
      ],
    };
  });

  const updatedState = { ...state, supportTickets: updatedTickets };
  savePanelStore(updatedState);
  return updatedTickets;
}

export function addConsultationRequest({ phone, name, note, dept }) {
  const state = getPanelStore();
  const consultationItem = {
    id: "CNS-" + Date.now(),
    phone,
    name: name || "کاربر مهمان",
    note: note || "درخواست مشاوره مسیر یادگیری و انتخاب دوره",
    dept: dept || "مشاوره آموزشی",
    date: new Date().toLocaleDateString("fa-IR"),
    status: "pending",
  };

  const newTicket = {
    id: Date.now(),
    subject: `درخواست مشاوره تلفنی (${phone})`,
    dept: dept || "مشاوره و ثبت‌نام",
    status: "open",
    updated: "لحظاتی پیش",
    messages: [
      {
        sender: "user",
        text: `درخواست مشاوره ثبت شد. شماره تماس: ${phone} ${
          note ? `· یادداشت: ${note}` : ""
        }`,
        date: "امروز - همین حالا",
      },
      {
        sender: "support",
        text: "درخواست مشاوره شما در صف تماس کارشناسان قرار گرفت. به زودی با شما تماس خواهیم گرفت.",
        date: "همین حالا",
      },
    ],
  };

  const updatedConsultations = [
    consultationItem,
    ...(state.consultations || []),
  ];
  const updatedTickets = [newTicket, ...(state.supportTickets || [])];
  const updatedState = {
    ...state,
    consultations: updatedConsultations,
    supportTickets: updatedTickets,
  };
  savePanelStore(updatedState);
  return consultationItem;
}

export function addMentorBooking({
  mentorId,
  mentorName,
  mentorRole,
  date,
  time,
  topic,
}) {
  const state = getPanelStore();
  const newBooking = {
    id: "MB-" + Math.floor(100 + Math.random() * 900),
    mentorId: mentorId || 1,
    mentorName: mentorName || "مهندس سهراب علیزاده",
    mentorRole: mentorRole || "منتور ارشد هوش مصنوعی و داده",
    date: date || "پنج‌شنبه آینده",
    time: time || "۱۶:۰۰",
    topic: topic || "جلسه رفع اشکال و منتورینگ تخصصی",
    status: "confirmed",
    meetLink: "https://meet.google.com/rokad-mentor-room",
    createdAt: new Date().toLocaleDateString("fa-IR"),
  };

  const updatedBookings = [newBooking, ...(state.mentorBookings || [])];

  const newEvent = {
    id: Date.now(),
    day: date?.split(" ")?.[1] || "۱۸",
    month: "شهریور",
    title: `جلسه ۱ به ۱ با ${mentorName}: ${topic}`,
    time: time || "۱۶:۰۰",
    host: mentorName,
    kind: "جلسه منتورینگ",
    place: "اتاق گفتگوی آنلاین رکاد",
    registered: true,
    featured: true,
    reminderSet: true,
  };

  const updatedEvents = [newEvent, ...(state.events || [])];
  const updatedState = {
    ...state,
    mentorBookings: updatedBookings,
    events: updatedEvents,
  };
  savePanelStore(updatedState);
  return newBooking;
}

export function sendMentorMessage(mentorId, messageObj) {
  const state = getPanelStore();
  const currentChats = state.mentorChats || {};
  const mentorList = currentChats[mentorId] || [];
  const updatedMentorList = [...mentorList, messageObj];

  const updatedChats = {
    ...currentChats,
    [mentorId]: updatedMentorList,
  };

  const updatedState = { ...state, mentorChats: updatedChats };
  savePanelStore(updatedState);
  return updatedChats;
}
