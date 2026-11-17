import { useEffect, useState } from "react";
import { isAbortError, searchRecipes } from "../api/spoonacular";
import styles from "./search.module.css";

const DEBOUNCE_MS = 400;

export default function Search({ setApiError, setFoodData }) {
    const [query, setQuery] = useState("pizza");

    useEffect(() => {
        const controller = new AbortController();

        const timer = setTimeout(async () => {
            setFoodData([]);

            if (!query.trim()) {
                return;
            }

            try {
                const data = await searchRecipes(query, controller.signal);
                setFoodData(data.results ?? []);
            } catch (error) {
                if (isAbortError(error)) {
                    return;
                }
                console.error("Failed to fetch data:", error);
                setApiError(true);
            }
        }, DEBOUNCE_MS);

        // Typing again (or unmounting) cancels the pending request.
        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [query, setFoodData, setApiError]);

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
