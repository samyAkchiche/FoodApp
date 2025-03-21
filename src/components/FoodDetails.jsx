import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";
import IngredientsList from "./IngredientsList";

export default function FoodDetails({ foodId, darkMode, setApiError }) {
    const [food, setFood] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
    const API_KEY = "59232dbb62804c6d8a4a6c068fc03a8a";

    useEffect(() => {
        async function fetchFood() {
            try {
                const res = await fetch(`${URL}?apiKey=${API_KEY}`);
                if (!res.ok) {
                    throw new Error(
                        `API Error: ${res.status} ${res.statusText}`
                    );
                }
                const data = await res.json();
                console.log(data);
                setFood(data);
            } catch (err) {
                console.log("Error fetching food details:", err);
                setApiError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchFood();
    }, [foodId]);

    return (
        <div
            className={styles.recipeCard}
            style={{
                color: !darkMode ? "#fff" : "",
                backgroundColor: !darkMode ? "#282828" : "",
            }}
        >
            <div>
                <h1 className={styles.recipeName}>{food.title}</h1>
                <img
                    className={styles.recipeImage}
                    src={food.image}
                    alt="food image"
                />
                <div className={styles.recipeDetails}>
                    <span>
                        <strong> 🕐 {food.readyInMinutes} Minutes</strong>
                    </span>
                    <span>
                        <strong>👨‍👩‍👦‍👦 Serves {food.servings}</strong>
                    </span>
                    <span>
                        <strong>
                            {food.vegetarian
                                ? "🥕 Vegetarian"
                                : "🍖 Non-Vegetarian"}
                        </strong>
                    </span>
                    <span>
                        <strong>{food.vegan ? "🐮 Vegan" : "Non-Vegan"}</strong>
                    </span>
                </div>
                <div>
                    <span>💲{food.pricePerServing / 100} per Serving</span>
                </div>
            </div>
            <h2>Ingredients</h2>
            <div className={styles.ingredientsList}>
                <IngredientsList food={food} isLoading={isLoading} />
            </div>
            <h2>Instructions</h2>
            <div className={styles.recipeInstructions}>
                <ol>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : food.analyzedInstructions?.[0]?.steps?.length ? (
                        food.analyzedInstructions[0].steps.map((step) => (
                            <li key={step.number}>{step.step}</li>
                        ))
                    ) : (
                        <p>No instructions available.</p>
                    )}
                </ol>
            </div>
        </div>
    );
    console.log(food);
}
