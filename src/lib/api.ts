import axios from "axios";

export const api = axios.create({
  baseURL: "https://task-api-v2.onrender.com",
});
