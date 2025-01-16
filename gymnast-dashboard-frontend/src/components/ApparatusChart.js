import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import "../styles/ChartsStyle.css";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ApparatusChart = () => {
    const [chartData, setChartData] = useState({});
    const [selectedApparatus, setSelectedApparatus] = useState("All");
    const [apparatusList, setApparatusList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12); // Number of gymnasts per page
    const [rankData, setRankData] = useState({});

    useEffect(() => {
        axios
            .get("http://localhost:8081/api/gymnasts/visualization/apparatus-performance")
            .then((response) => {
                const data = response.data;

                // Extract unique apparatuses
                const apparatuses = ["All", ...new Set(data.map((item) => item.apparatus))];
                setApparatusList(apparatuses);

                // Default: Show data for all apparatuses
                setChartData({
                    allData: data,
                    currentData: data,
                });

                // Calculate ranks per apparatus
                const ranks = {};
                apparatuses.slice(1).forEach((apparatus) => {
                    ranks[apparatus] = data
                        .filter((item) => item.apparatus === apparatus)
                        .sort((a, b) => b.score - a.score)
                        .map((item, index) => ({ ...item, rank: index + 1 }));
                });
                setRankData(ranks);
            })
            .catch((error) => console.error("Error fetching chart data:", error));
    }, []);

    // Cleanup to prevent "Canvas is already in use" errors
    useEffect(() => {
        return () => {
            Object.keys(ChartJS.instances).forEach((key) => {
                const chart = ChartJS.instances[key];
                if (chart) {
                    chart.destroy();
                }
            });
        };
    }, []);

    const handleApparatusChange = (apparatus) => {
        setSelectedApparatus(apparatus);

        setChartData((prev) => ({
            ...prev,
            currentData:
                apparatus === "All"
                    ? prev.allData
                    : prev.allData.filter((item) => item.apparatus === apparatus),
        }));

        setCurrentPage(1); // Reset to first page on apparatus change
    };

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedData = chartData.currentData?.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(
        (chartData.currentData?.length || 0) / itemsPerPage
    );

    return (
        <div>
            <h2>Apparatus Performance</h2>
            <div className="chart-container">
                <div className="dropdown-container">
                    <label htmlFor="apparatus-select">Select Apparatus:</label>
                    <select
                        id="apparatus-select"
                        value={selectedApparatus}
                        onChange={(e) => handleApparatusChange(e.target.value)}
                        className="apparatus-dropdown"
                    >
                        {apparatusList.map((apparatus) => (
                            <option key={apparatus} value={apparatus}>
                                {apparatus}
                            </option>
                        ))}
                    </select>
                </div>
                <Bar
                    data={{
                        labels: paginatedData?.map((item) => item.gymnast),
                        datasets: [
                            {
                                label: "Score",
                                data: paginatedData?.map((item) => item.score),
                                backgroundColor: "rgba(54, 162, 235, 0.8)", // Blue
                            },
                            {
                                label: "Execution Score",
                                data: paginatedData?.map((item) => item.executionScore),
                                backgroundColor: "rgba(75, 192, 192, 0.8)", // Teal
                            },
                            {
                                label: "Difficulty Score", // Updated label
                                data: paginatedData?.map((item) => item.difficultyScore), // Corrected property
                                backgroundColor: "rgba(255, 159, 64, 0.8)", // Orange
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            legend: {
                                display: true,
                                position: "top",
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const gymnast = context.label; // The gymnast's name
                                        const value = context.raw; // The value being hovered (e.g., score, executionScore, etc.)
                                        const datasetLabel = context.dataset.label; // Dataset name (e.g., "Score", "Execution Score")

                                        // Match the corresponding key in the data
                                        let dataKey = "score"; // Default key for "Score"
                                        if (datasetLabel === "Execution Score") {
                                            dataKey = "executionScore";
                                        } else if (datasetLabel === "Difficulty Score") {
                                            dataKey = "difficultyScore";
                                        }

                                        // Find the exact entry matching the gymnast and the dataset value
                                        const entry = chartData.currentData.find(
                                            (item) =>
                                                item.gymnast === gymnast &&
                                                item[dataKey] === value
                                        );

                                        // Extract apparatus and rank
                                        const apparatus = entry?.apparatus || "Unknown";
                                        const rank = rankData[apparatus]?.find(
                                            (item) => item.gymnast === gymnast
                                        )?.rank || "N/A";

                                        // Return the formatted tooltip
                                        return `${datasetLabel}: ${value} (Event: ${apparatus}, Rank: ${rank})`;
                                    },
                                },
                            },
                        },
                        scales: {
                            x: {
                                ticks: {
                                    font: {
                                        size: 14,
                                    },
                                },
                            },
                            y: {
                                ticks: {
                                    font: {
                                        size: 14,
                                    },
                                },
                                title: {
                                    display: true,
                                    text: "Score",
                                    font: {
                                        size: 16,
                                    },
                                },
                            },
                        },
                    }}
                />
                <div className="pagination-container">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`pagination-button ${
                                currentPage === index + 1 ? "active" : ""
                            }`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ApparatusChart;
