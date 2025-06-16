import axios from "axios";

export const axiosInstence = axios.create({
  // baseURL: "http://localhost:4000/api/v1",
  baseURL: " https://prepinterview-with-ai.onrender.com",

  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

