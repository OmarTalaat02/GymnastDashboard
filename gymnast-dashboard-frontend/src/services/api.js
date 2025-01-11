import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/gymnasts"

const api = axios.create({
    baseURL: API_BASE_URL, // Base URL for API requests
});

// Function to fetch paginated data
export const fetchPaginatedGymnasts = (page, size) =>
    api.get(`/paged?page=${page}&size=${size}`);
