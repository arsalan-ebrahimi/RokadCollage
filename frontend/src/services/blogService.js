import { apiRequest } from "@/lib/api";

/**
 * دریافت لیست مقالات وبلاگ (صفحه‌بندی، دسته‌بندی و جستجو)
 */
export async function getBlogs(params = {}) {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page);
  if (params.limit) query.append("limit", params.limit);
  if (params.category && params.category !== "all") query.append("category", params.category);
  if (params.search) {
    query.append("search", params.search);
    query.append("q", params.search);
  }
  if (params.sort) query.append("sort", params.sort);

  const qs = query.toString();
  const endpoint = `/blogs${qs ? `?${qs}` : ""}`;
  const res = await apiRequest(endpoint);
  return res?.data || res || [];
}

/**
 * دریافت یک مقاله بر اساس شناسه یا اسلاگ
 */
export async function getBlogById(id) {
  const res = await apiRequest(`/blogs/${id}`);
  return res?.data || res;
}

/**
 * دریافت مقاله با اسلاگ یا شناسه با جستجو در مقالات
 */
export async function getBlogBySlugOrId(identifier) {
  if (!identifier) return null;
  // If it's a valid 24-character MongoDB ObjectId, fetch directly
  if (/^[0-9a-fA-F]{24}$/.test(identifier)) {
    const direct = await getBlogById(identifier).catch(() => null);
    if (direct) return direct;
  }

  // Otherwise search in blog collection
  const all = await getBlogs({ limit: 50 }).catch(() => []);
  const list = Array.isArray(all) ? all : all.data || [];
  const clean = String(identifier).trim().toLowerCase();
  const match = list.find(
    (b) =>
      b.slug === clean ||
      b.id === clean ||
      b._id === clean ||
      (b.title && b.title.toLowerCase().includes(clean))
  );

  if (match) {
    const full = await getBlogById(match._id || match.id).catch(() => null);
    return full || match;
  }

  // If not found in top 50, query backend with search keyword
  try {
    const searchRes = await getBlogs({ search: identifier, limit: 5 });
    const sList = Array.isArray(searchRes) ? searchRes : searchRes.data || [];
    if (sList.length > 0) {
      const full = await getBlogById(sList[0]._id || sList[0].id).catch(() => null);
      return full || sList[0];
    }
  } catch (e) {
    // Ignore fallback failure
  }

  return null;
}
