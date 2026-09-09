// ==========================================
// Utility: Image URL Resolver
// Normalizes image paths for uploaded files, default avatars, and fallback assets
// ==========================================

/**
 * Resolves a full accessible URL for an image filename or fallback path.
 * @param {string|null|undefined} imageName - Image path, default avatar filename, or backend upload filename
 * @returns {string} Fully resolved image URL
 */
export const getImageUrl = (imageName) => {
  if (!imageName) return "/default-avatars/default-BoyStudent.png";

  if (
    imageName.startsWith("http://") ||
    imageName.startsWith("https://") ||
    imageName.startsWith("blob:") ||
    imageName.startsWith("data:")
  ) {
    return imageName;
  }

  // Predefined default avatar stored in public folder
  if (imageName.startsWith("default-") || imageName.startsWith("default")) {
    return `/default-avatars/${imageName}`;
  }

  const baseUrl = import.meta.env.VITE_FILE_URL || "http://localhost:5000";

  // Clean duplicate slashes while preserving protocol scheme (http:// or https://)
  const cleanUrl = `${baseUrl}/${imageName}`.replace(/([^:]\/)\/+/g, "$1");
  return cleanUrl;
};

export default getImageUrl;
