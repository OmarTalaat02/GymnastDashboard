// App.js
// Main component: Combines all features of the application.

import React from "react";
import GymnastsTable from "./components/GymnastsTable"; // Import the GymnastsTable component
import "./App.css"; // Import global styles for the App

const App = () => {
  return (
      <div className="app-container">
        <header className="app-header">
          <h1>Gymnast Dashboard</h1>
        </header>
        <main className="app-main">
          <GymnastsTable /> {/* Render the GymnastsTable component */}
        </main>
      </div>
  );
};

export default App;
