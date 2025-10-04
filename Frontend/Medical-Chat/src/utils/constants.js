export const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://127.0.0.1:5000"
    : import.meta.env.VITE_SERVER_URL