import { useEffect, useState } from "react";
import styles from "./search.module.css";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "59232dbb62804c6d8a4a6c068fc03a8a";

export default function Search({ foodData, setFoodData }) {
    const [query, setQuery] = useState("pizza");

    useEffect(() => {
        async function fetchFood() {
            try {
                setFoodData([]);

                const res = await fetch(
                    `${URL}?query=${query}&apiKey=${API_KEY}`
                );
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }
                const data = await res.json();
                console.log(data.results);
                setFoodData(data.results);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setFoodData([]);
            }
        }

        fetchFood();
    }, [query, setFoodData]);

    return (
        <div className={styles.searchContainer}>
            <input
                className={styles.input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search for food..."
            />
        </div>
    );
}
