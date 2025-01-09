import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/gymnasts";

// Fetch all gymnasts
export const fetchGymnasts = () => axios.get(API_BASE_URL);

// Fetch gymnast by ID
export const fetchGymnastById = (id) => axios.get(`${API_BASE_URL}/${id}`);
