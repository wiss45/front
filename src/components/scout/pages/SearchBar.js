import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

function SearchBar({ setResults }) {
    const [input, setInput] = useState("");

    const fetchData = (sport) => {
        fetch(`http://localhost:5000/cherchertalent/${sport}`)
            .then((response) => response.json())
            .then((json) => {
                const results = json.map((user) => ({
                    firstname: user.firstname,
                    lastname: user.lastname
                }));
                setResults(results);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données :', error);
                setResults([]); 
            });
    }

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
                placeholder="Chercher des talents par sport ..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    )
}

export default SearchBar;
