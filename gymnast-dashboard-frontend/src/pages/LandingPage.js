import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../styles/LandingPage.css";

const LandingPage = ({ navigateTo }) => {
    const [totalGymnasts, setTotalGymnasts] = useState(0);
    const [nationalities, setNationalities] = useState([]);

    useEffect(() => {
        // Fetch total number of gymnasts
        axios.get("http://localhost:8081/api/gymnasts")
            .then((response) => {
                setTotalGymnasts(response.data.length);
            })
            .catch((error) => {
                console.error("Error fetching total gymnasts:", error);
            });

        // Fetch nationality statistics
        axios.get("http://localhost:8081/api/gymnasts/stats/gymnasts-by-nationality")
            .then((response) => {
                setNationalities(response.data);
            })
            .catch((error) => {
                console.error("Error fetching nationality stats:", error);
            });
    }, []);

    return (
        <div className="landing-page">
            <header className="landing-header">
                <h1>Welcome to the Gymnast Dashboard</h1>
            </header>
            <main className="landing-main">
                <section className="statistics">
                    <h2>Statistics</h2>
                    <p>Total Gymnasts: {totalGymnasts}</p>
                    <div>
                        <h3>Gymnasts by Nationality:</h3>
                        <ul>
                            {nationalities.map((entry, index) => (
                                <li key={index}>
                                    {entry.nationality}: {entry.count}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                <section className="navigation">
                    <h2>Navigation</h2>
                    <button onClick={() => navigateTo("dataset")}>Go to Dataset</button>
                </section>
            </main>
        </div>
    );
};

export default LandingPage;
