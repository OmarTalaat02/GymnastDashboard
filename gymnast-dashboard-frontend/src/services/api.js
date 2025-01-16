import axios from "axios";

export const fetchSortedGymnasts = (page, size, sortBy, order, apparatus) => {
    const params = {
        page,
        size,
        sortBy,
        order,
    };

    // Include apparatus in the query parameters if it's specified and not "All"
    if (apparatus && apparatus !== "All") {
        params.apparatus = apparatus;
    }

    return axios.get("http://localhost:8081/api/gymnasts/sorted", { params });
};
