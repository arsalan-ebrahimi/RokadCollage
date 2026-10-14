import {
  initialUser,
  initialStreak,
  initialMyCourses,
  initialWishlist,
  initialAssignments,
} from "./initialStatePart1.js";

import {
  initialCertificates,
  initialStudyGroups,
  initialEvents,
} from "./initialStatePart2.js";

import {
  initialSupportTickets,
  initialOrders,
  initialAuth,
  initialConsultations,
  initialMentorBookings,
  initialMentorChats,
} from "./initialStatePart3.js";

export const STORAGE_KEY = "rokad_student_panel_state_v2";

export const DEFAULT_STATE = {
  user: initialUser,
  streak: initialStreak,
  myCourses: initialMyCourses,
  wishlist: initialWishlist,
  assignments: initialAssignments,
  certificates: initialCertificates,
  studyGroups: initialStudyGroups,
  events: initialEvents,
  supportTickets: initialSupportTickets,
  orders: initialOrders,
  auth: initialAuth,
  consultations: initialConsultations,
  mentorBookings: initialMentorBookings,
  mentorChats: initialMentorChats,
};
