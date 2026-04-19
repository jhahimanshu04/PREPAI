// import axios from "axios";

// const api = axios.create({
//   baseURL:  import.meta.env.VITE_API_URL ||"http://localhost:3000",
//   withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const register = async ({ name, email, password }) => {
//   const response = await api.post("/api/auth/register", { name, email, password });
//   return response.data;
// };

// export const login = async ({ email, password }) => {
//   const response = await api.post("/api/auth/login", { email, password });
//   if (response.data.token) {
//     localStorage.setItem("token", response.data.token);
//   }
//   return response.data;
// };

// export const logout = async () => {
//   localStorage.removeItem("token");
//   const response = await api.get("/api/auth/logout");
//   return response.data;
// };

// export const getMe = async () => {
//   const response = await api.get("/api/auth/me");
//   return response.data;
// };

import axios from "axios";

const api = axios.create({
  baseURL: "https://prepai-hliu.onrender.com",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async ({ name, email, password }) => {
  const response = await api.post("/api/auth/register", { name, email, password });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token); // ✅ Save karo
  }
  return response.data;
};

export const login = async ({ email, password }) => {
  const response = await api.post("/api/auth/login", { email, password });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token); //
  }
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem("token"); // 
  const response = await api.get("/api/auth/logout");
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};