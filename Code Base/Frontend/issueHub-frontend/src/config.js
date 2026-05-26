// API Configuration
// Priority: Environment variable > localStorage config > default
// NOTE: All paths in api/index.js already include the /api prefix,
// so the base must be just the origin (e.g. "http://localhost:5164")
// or empty string to use the Vite dev-server proxy.
const API_BASE_URL = (() => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) return envUrl;

  const storedUrl = localStorage.getItem("api_url");
  if (storedUrl) return storedUrl;

  // Empty string → paths like /api/auth/login are proxied by Vite dev server
  return "";
})();

export { API_BASE_URL };
