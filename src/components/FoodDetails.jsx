import { useEffect, useState } from "react";
import { getRecipeInformation, isAbortError } from "../api/spoonacular";
import styles from "./fooddetails.module.css";
import IngredientsList from "./IngredientsList";

export default function FoodDetails({ foodId, setApiError }) {
    const [food, setFood] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        setIsLoading(true);

        getRecipeInformation(foodId, controller.signal)
            .then((data) => {
                setFood(data);
                setIsLoading(false);
            })
            .catch((error) => {
                if (isAbortError(error)) {
                    return;
                }
                console.log("Error fetching food details:", error);
                setApiError(true);
                setIsLoading(false);
            });

        return () => controller.abort();
    }, [foodId, setApiError]);

    return (
        <div className={styles.recipeCard}>
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
}
