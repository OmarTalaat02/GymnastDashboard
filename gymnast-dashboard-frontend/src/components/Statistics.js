import React from "react";
import "./../styles/Statistics.css";

const Statistics = ({ totalGymnasts }) => {
    return (
        <div className="statistics-card">
            <h3>Total Gymnasts</h3>
            <p className="statistics-count">{totalGymnasts}</p>
        </div>
    );
};

export default Statistics;
