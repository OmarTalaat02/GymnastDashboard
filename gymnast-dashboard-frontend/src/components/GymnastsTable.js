import axios from "axios";
import React, { useState, useEffect } from "react";
import "./../styles/GymnastsTable.css";

const GymnastsTable = ({ navigateTo }) => {
    const [gymnasts, setGymnasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [size] = useState(24);
    const [totalPages, setTotalPages] = useState(0);
    const [sortBy, setSortBy] = useState("default");
    const [order, setOrder] = useState("asc");
    const [apparatus, setApparatus] = useState(""); // Apparatus filter

    const [apparatusOptions, setApparatusOptions] = useState([]);

    // Fetch apparatus options from the backend
    useEffect(() => {
        axios
            .get("http://localhost:8081/api/gymnasts/unique-apparatus")
            .then((response) => setApparatusOptions(response.data))
            .catch((error) => console.error("Error fetching apparatus options:", error));
    }, []);

    // Fetch gymnasts when filters change
    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:8081/api/gymnasts/sorted", {
                params: { page, size, sortBy, order, apparatus },
            })
            .then((response) => {
                setGymnasts(response.data.content);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [page, sortBy, order, apparatus]);

    // Pagination controls
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dataset-container">
            {/* Filter Options */}
            <div className="filter-container">
                <label>Sort By:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="default">Default</option>
                    <option value="name">Name</option>
                    <option value="nationality">Nationality</option>
                    <option value="total">Total Score</option>
                    <option value="exec">Execution Score</option>
                    <option value="diff">Difficulty Score</option>
                    <option value="rank">Rank</option>
                </select>

                <label>Order:</label>
                <select value={order} onChange={(e) => setOrder(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>

                <label>Apparatus:</label>
                <select value={apparatus} onChange={(e) => setApparatus(e.target.value)}>
                    <option value="">All</option>
                    {apparatusOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            {/* Dataset Table */}
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

            {/* Pagination */}
            <div className="pagination">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
                    Previous
                </button>
                <span>
                Page {page + 1} of {totalPages}
            </span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>
                    Next
                </button>
            </div>

            {/* Back to Home */}
            <div className="backToLanding">
                <button onClick={() => navigateTo("landing")}>Back to Home</button>
            </div>
        </div>
    );

};

export default GymnastsTable;
