// App.js
// Main component: Combines all features of the application.
import React from "react";
import { useState } from "react"; // Import the useState hook
import GymnastsTable from "./components/GymnastsTable"; // Import the GymnastsTable component
import LandingPage from "./pages/LandingPage";
import "./App.css"; // Import global styles for the App

const App = () => {

    const[currentPage, setCurrentPage] = useState("landing");

    const navigateTo = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Gymnast Dashboard</h1>
            </header>
            <main className="app-main">
                {currentPage === "landing" && <LandingPage navigateTo={navigateTo} />}
                {currentPage === "dataset" && <GymnastsTable navigateTo={navigateTo} />}
            </main>
        </div>
    );
};

export default App;