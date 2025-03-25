import axios from "axios";

// Centralized axios configuration
const api = axios.create({
    baseURL: "http://localhost:8000/api/food",  // Your backend API
    withCredentials: true,  // Include credentials if needed
});

export default api;
