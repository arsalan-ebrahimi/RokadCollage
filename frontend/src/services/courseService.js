import { apiRequest } from "@/lib/api";

/**
 * دریافت لیست دوره‌های حضوری
 */
export async function getInPersonCourses() {
  const res = await apiRequest("/in-person-courses");
  return res?.data || res || [];
}

/**
 * دریافت جزئیات یک دوره حضوری بر اساس شناسه
 */
export async function getInPersonCourseById(id) {
  const res = await apiRequest(`/in-person-courses/${id}`);
  return res?.data || res;
}

/**
 * دریافت لیست دوره‌های آنلاین و مجازی
 */
export async function getVirtualCourses() {
  const res = await apiRequest("/virtual-courses");
  return res?.data || res || [];
}

/**
 * دریافت جزئیات یک دوره آنلاین بر اساس شناسه
 */
export async function getVirtualCourseById(id) {
  const res = await apiRequest(`/virtual-courses/${id}`);
  return res?.data || res;
}

/**
 * دریافت همه دوره‌ها (ترکیب حضوری و مجازی)
 */
export async function getAllCourses() {
  try {
    const [inPerson, virtual] = await Promise.all([
      getInPersonCourses().catch(() => []),
      getVirtualCourses().catch(() => []),
    ]);

    const formattedInPerson = (Array.isArray(inPerson) ? inPerson : []).map((c) => ({
      ...c,
      isVirtual: false,
      mode: "in-person",
      typeLabel: "حضوری",
    }));

    const formattedVirtual = (Array.isArray(virtual) ? virtual : []).map((c) => ({
      ...c,
      isVirtual: true,
      mode: "online",
      typeLabel: "مجازی",
    }));

    return [...formattedInPerson, ...formattedVirtual];
  } catch (err) {
    console.error("Error loading all courses:", err);
    return [];
  }
}

/**
 * دریافت یک دوره با شناسه یا اسلاگ
 */
export async function getCourseBySlugOrId(identifier) {
  if (!identifier) return null;
  const all = await getAllCourses();
  const clean = String(identifier).trim().toLowerCase();
  let found = all.find(
    (c) =>
      c.slug === clean ||
      c.id === clean ||
      c._id === clean ||
      (c.title && c.title.toLowerCase().includes(clean))
  );

  if (!found) {
    if (clean.includes("react") || clean.includes("front")) {
      found = all.find((c) => (c.slug && c.slug.includes("react")) || (c.title && c.title.includes("React")));
    } else if (clean.includes("ux") || clean.includes("ui") || clean.includes("figma")) {
      found = all.find((c) => (c.slug && (c.slug.includes("ux") || c.slug.includes("ui"))) || (c.title && c.title.includes("UI/UX")));
    } else if (clean.includes("seo") || clean.includes("سئو")) {
      found = all.find((c) => (c.slug && c.slug.includes("seo")) || (c.title && c.title.includes("سئو")));
    } else if (clean.includes("word") || clean.includes("وردپرس")) {
      found = all.find((c) => (c.slug && c.slug.includes("word")) || (c.title && c.title.includes("وردپرس")));
    }
  }
  if (found) {
    if (found.isVirtual) {
      const details = await getVirtualCourseById(found._id || found.id).catch(() => null);
      return { ...found, ...(details || {}) };
    } else {
      const details = await getInPersonCourseById(found._id || found.id).catch(() => null);
      return { ...found, ...(details || {}) };
    }
  }

  // Fallback if identifier is a direct MongoDB ObjectId
  if (/^[0-9a-fA-F]{24}$/.test(clean)) {
    const [inP, virt] = await Promise.all([
      getInPersonCourseById(clean).catch(() => null),
      getVirtualCourseById(clean).catch(() => null),
    ]);
    if (inP) return { ...inP, isVirtual: false, mode: "in-person" };
    if (virt) return { ...virt, isVirtual: true, mode: "online" };
  }

  return null;
}
