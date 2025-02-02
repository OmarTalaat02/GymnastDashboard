import ApparatusChart from "../components/ApparatusChart";
import OverallRankChart from "../components/OverallRankChart";
import "./../styles/VisualizationPage.css";

const VisualizationPage = ({ navigateTo }) => {

    return (
        <div className="visualization-page">
            <header className="visualization-header">
                <h1>Welcome to the visualization page</h1>
            </header>
            <main className="visualization-main">
                <ApparatusChart />
                <OverallRankChart />
                <div className="home-button">
                    <button onClick={() => navigateTo("landing")}>Back to Home</button>
                </div>
            </main>
        </div>
    );
};

export default VisualizationPage;
