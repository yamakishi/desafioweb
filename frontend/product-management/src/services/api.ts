import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`📥 ${response.status} - ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("❌ Erro:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;
