// API Configuration
// Priority: Environment variable > localStorage config > default
const API_BASE_URL = (() => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) return envUrl;

  const storedUrl = localStorage.getItem("api_url");
  if (storedUrl) return storedUrl;

  // Default fallback - use /api which will be proxied by vite in dev
  return "/api";
})();

export { API_BASE_URL };
