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

export const modelService = {
  predict: async (features) => {
    const response = await axios.post(
      "http://localhost:5000/predict",
      features
    );
    return response.data;
  }
};

export default api;