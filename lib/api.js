// frontend/lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const apiConfig = {
  baseUrl: API_BASE_URL,
  endpoints: {
    auth: {
      login: `${API_BASE_URL}/auth/login/`,
      logout: `${API_BASE_URL}/auth/logout/`,
      signup: `${API_BASE_URL}/auth/signup/`,
      me: `${API_BASE_URL}/auth/me/`,
      csrf: `${API_BASE_URL}/auth/csrf/`,
    },
    googleLogin: `${API_BASE_URL}/accounts/login/google-oauth2/?next=${process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"}`,
    contact: `${API_BASE_URL}/contact/`,
  },
};

export default apiConfig;