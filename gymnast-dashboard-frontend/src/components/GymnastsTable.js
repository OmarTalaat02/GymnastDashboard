// GymnastsTable.js
// Component: Displays gymnast data in a table format.
// Purpose: Fetches data from the backend and renders it in an organized table.
// Location: src/components/GymnastsTable.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../styles/GymnastsTable.css"; // Import CSS for styling the table

const GymnastsTable = () => {
    // State to hold the gymnast data
    const [gymnasts, setGymnasts] = useState([]);
    // State to manage loading status
    const [loading, setLoading] = useState(true);

    // Fetch gymnast data from the backend API when the component mounts
    useEffect(() => {
        axios
            .get("http://localhost:8081/api/gymnasts") // Backend endpoint
            .then((response) => {
                setGymnasts(response.data); // Update state with fetched data
                setLoading(false); // Set loading to false
            })
            .catch((error) => {
                console.error("Error fetching data:", error); // Log any errors
                setLoading(false);
            });
    }, []); // Empty dependency array ensures this runs only once

    // If data is still loading, display a loading message
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Nationality</th>
                <th>Overall Rank</th>
            </tr>
            </thead>
            <tbody>
            {gymnasts.map((gymnast) => (
                <tr key={gymnast.id}>
                    <td>{gymnast.name}</td>
                    <td>{gymnast.nationality}</td>
                    <td>{gymnast.overallRank}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default GymnastsTable;
