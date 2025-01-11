import React, { useState, useEffect } from "react";
import { fetchPaginatedGymnasts } from "../services/api";
import "./../styles/GymnastsTable.css";

const GymnastsTable = () => {
    const [gymnasts, setGymnasts] = useState([]); // Data for the current page
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0); // Current page number
    const [size] = useState(24); // Number of items per page
    const [totalPages, setTotalPages] = useState(0); // Total number of pages

    // Fetch paginated data whenever `page` changes
    useEffect(() => {
        setLoading(true);
        fetchPaginatedGymnasts(page, size)
            .then((response) => {
                setGymnasts(response.data.content); // Set current page data
                setTotalPages(response.data.totalPages); // Set total pages
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [page, size]);

    // Handler for changing pages
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Overall Rank</th>
                    <th>Nationality</th>
                    <th>Apparatus</th>
                    <th>Difference Score</th>
                    <th>Execution Score</th>
                    <th>Total Score</th>
                    <th>Rank</th>
                </tr>
                </thead>
                <tbody>
                {gymnasts.map((gymnast) => (
                    <tr key={gymnast.id}>
                        <td>{gymnast.name}</td>
                        <td>{gymnast.overallRank}</td>
                        <td>{gymnast.nationality}</td>
                        <td>{gymnast.apparatus}</td>
                        <td>{gymnast.diff}</td>
                        <td>{gymnast.exec}</td>
                        <td>{gymnast.total}</td>
                        <td>{gymnast.rank}</td>


                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 0}
                >
                    Previous
                </button>
                <span>
                    Page {page + 1} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default GymnastsTable;