import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "../styles/ChartsStyle.css"; // Import the CSS file

const OverallRankChart = () => {
    const [chartData, setChartData] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 12;

    useEffect(() => {
        axios
            .get("http://localhost:8081/api/gymnasts/visualization/overall-ranks")
            .then((response) => {
                const data = response.data;

                // Deduplicate entries
                const uniqueGymnasts = Array.from(
                    new Map(data.map((item) => [item.gymnast, item])).values()
                );

                setChartData({
                    allData: uniqueGymnasts, // Store all data for pagination
                    currentData: uniqueGymnasts.slice(0, itemsPerPage), // First page data
                });
            })
            .catch((error) => console.error("Error fetching chart data:", error));
    }, []);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
        setChartData((prev) => ({
            ...prev,
            currentData: prev.allData.slice(
                pageIndex * itemsPerPage,
                (pageIndex + 1) * itemsPerPage
            ),
        }));
    };

    const totalPages = Math.ceil(
        chartData.allData ? chartData.allData.length / itemsPerPage : 0
    );

    return (
        <div>
            <h2>Overall Ranks</h2>
            <div className="chart-container">
                <Bar
                    data={{
                        labels: chartData.currentData?.map((item) => item.gymnast),
                        datasets: [
                            {
                                label: "Overall Rank",
                                data: chartData.currentData?.map((item) => item.overallRank),
                                backgroundColor: "rgba(54, 162, 235, 0.8)", // Default blue color
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            legend: {
                                display: true,
                                position: "top",
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
                                    text: "Rank",
                                    font: {
                                        size: 16,
                                    },
                                },
                            },
                        },
                    }}
                />
            </div>
            <div className="pagination-container">
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                    <button
                        key={pageIndex}
                        onClick={() => handlePageChange(pageIndex)}
                        className={`pagination-button ${
                            pageIndex === currentPage ? "active" : ""
                        }`}
                    >
                        {pageIndex + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OverallRankChart;
