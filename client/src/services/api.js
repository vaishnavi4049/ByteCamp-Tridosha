import axios from 'axios';

// Ensure the backend runs on port 5000 as configured in app.py
const API_URL = 'http://127.0.0.1:5000';

export const modelService = {
  // Existing prediction endpoint
  predict: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/predict`, data);
      return response.data;
    } catch (error) {
      console.error('Error fetching prediction:', error);
      throw error;
    }
  },

  // Schedules (Doctor Settings)
  getSchedules: async () => {
    try {
      const response = await axios.get(`${API_URL}/schedules`);
      return response.data;
    } catch (error) {
      console.error('Error fetching schedules:', error);
      throw error;
    }
  },

  updateSchedule: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/schedules`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating schedule:', error);
      throw error;
    }
  },

  // Doctor Requests
  doctorRequest: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/doctor-request`, data);
      return response.data;
    } catch (error) {
      console.error('Error sending doctor request:', error);
      throw error;
    }
  },

  getDoctorRequests: async () => {
    try {
      const response = await axios.get(`${API_URL}/doctor-requests`);
      return response.data;
    } catch (error) {
      console.error('Error fetching doctor requests:', error);
      throw error;
    }
  },

  respondToRequest: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/doctor-response`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating doctor request status:', error);
      throw error;
    }
  },

  // Patient Status Polling
  getPatientStatus: async (patientId) => {
    try {
      const response = await axios.get(`${API_URL}/patient-request-status/${patientId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching patient status:', error);
      throw error;
    }
  },

  // History & Analytics
  saveHistory: async (data) => {
    try {
      // Points to Node backend (port 5001)
      const response = await axios.post(`http://127.0.0.1:5001/api/history`, data);
      return response.data;
    } catch (error) {
      console.error('Error saving history:', error);
      throw error;
    }
  },

  getHistory: async (email) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5001/api/history/${email}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching history:', error);
      throw error;
    }
  },

  getAnalytics: async (email) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5001/api/history/analytics/${email}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }
};
