import axios from "axios";

const apiBaseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: apiBaseURL,
});

