import React from "react";
import "./../styles/Nationalities.css";

const Nationalities = ({ nationalities }) => {
    const getFlagUrl = (nationality) => {
        // Mapping nationality to ISO country codes (if needed)
        const countryCodes = {
            CHN: "cn",
            JPN: "jp",
            USA: "us",
            GBR: "gb",
            RUS: "ru",
            CUB: "cu",
            SUI: "ch",
            LTU: "lt",
            SP: "es",
            ARM: "am",
            GER: "de",
            UKR: "ua",
            COL: "co",
            TUR: "tr",
            CYP: "cy",
            CAN: "ca",
            BRA: "br",
            KOR: "kr",
            MEX: "mx"
        };

        // Get the flag URL using the country code
        const countryCode = countryCodes[nationality] || nationality.toLowerCase();
        return `https://flagcdn.com/w40/${countryCode}.png`;
    };

    return (
        <div className="nationalities">
            <h3>Gymnasts by Nationality:</h3>
            <div className="nationality-grid">
                {nationalities.map((entry, index) => (
                    <div className="nationality-item" key={index}>
                        <div className="flag-and-name">
                            <img
                                src={getFlagUrl(entry.nationality)}
                                alt={`${entry.nationality} flag`}
                                className="nationality-flag"
                            />
                            <span className="nationality-name">{entry.nationality}</span>
                        </div>
                        <span className="nationality-count">{entry.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Nationalities;
