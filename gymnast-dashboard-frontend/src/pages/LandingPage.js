import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../styles/LandingPage.css";
import Statistics from "../components/Statistics";
import Nationalities from "../components/Nationalities";

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
                <h2>Welcome to the Gymnastics 2017 Men's World Championship Dashboard</h2>
            </header>
            <main className="landing-main">
                <section className="statistics">
                    <h2>Statistics</h2>
                    <Statistics totalGymnasts={totalGymnasts / 6} />
                    <Nationalities nationalities={nationalities} />
                </section>
                <section className="navigation">
                    <h2>Navigation</h2>
                    <button onClick={() => navigateTo("dataset")}>Go to Dataset</button>
                    <button onClick={() => navigateTo("visualization")}>Go to Charts</button>
                </section>
            </main>
        </div>
    );
};

export default LandingPage;
