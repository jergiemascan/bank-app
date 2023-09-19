import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL
export const apiUrl = axios.create({
  baseURL: API_URL,
})
