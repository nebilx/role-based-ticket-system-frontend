import { LoginPayload, TicketPayload, TicketUpdatePayload } from "@/types";
import axios from "axios";

//  axios instance
const API = axios.create({
  baseURL: "https://role-based-ticket-system-backend.onrender.com/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor to add the JWT token to all requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor to handle token expiration
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        handleLogout();
      }
    }
    return Promise.reject(error);
  }
);

// Logout function to prevent infinite redirects
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

// Auth API calls
export const authAPI = {
  login: (credentials: LoginPayload) => API.post("/auth/signin", credentials),

  register: (userData: { name: string; email: string; password: string }) =>
    API.post("/auth/signup", userData),
};

// Tickets API calls
export const ticketsAPI = {
  getAllTickets: () => API.get("/tickets"),

  createTicket: (ticketData: TicketPayload) => API.post("/tickets", ticketData),

  updateTicketStatus: (ticketData: TicketUpdatePayload) =>
    API.put(`/tickets/${ticketData.id}`, { status: ticketData.status }),
};

export default API;
