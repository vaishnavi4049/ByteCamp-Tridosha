import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true // VERY IMPORTANT for cookies
});

export const authService = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getMe: () => api.get("/auth/me"),
  logout: () => api.post("/auth/logout")
};

export const chatbotService = {
  chat: (message) => api.post("/chatbot/chat", { message })
};

export const modelService = {
  predict: async (features) => {
    const response = await axios.post("http://localhost:5001/predict", features);
    return response.data;
  },
  getPatientStatus: async (patientId) => {
    const response = await axios.get(`http://localhost:5001/patient-request-status/${patientId}`);
    return response.data;
  },
  doctorRequest: async (requestData) => {
    const response = await axios.post("http://localhost:5001/doctor-request", requestData);
    return response.data;
  },
  saveHistory: async (historyData) => {
    const response = await api.post("/history", historyData);
    return response.data;
  },
  getHistory: async (userId) => {
    const response = await api.get(`/history/${userId}`);
    return response.data;
  },
  getAnalytics: async (userId) => {
    const response = await api.get(`/history/analytics/${userId}`);
    return response.data;
  },
  getDoctorRequests: async () => {
    const response = await axios.get("http://localhost:5001/doctor-requests");
    return response.data;
  },
  respondToDoctorRequest: async (responseData) => {
    const response = await axios.post("http://localhost:5001/doctor-response", responseData);
    return response.data;
  }
};

export default api;
