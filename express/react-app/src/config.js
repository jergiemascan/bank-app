import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";
export const apiUrl = axios.create({
  baseURL:  API_URL,
})
