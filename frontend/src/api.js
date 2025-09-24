import axios from "axios";

// Point Axios to your backend server
const API = axios.create({ baseURL: "http://localhost:5000" });

export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);